import { useReducer, useState } from 'react'
import { AddRounded } from '@material-ui/icons'
import useSound from 'use-sound'
import Timer from './components/Timer'
import DurationPicker from './components/DurationPicker'
import {
  addTimer,
  removeTimer,
  timerReducer,
  TimerState,
} from './lib/timer-reducer'

const alarmSfx = require('./assets/alarm.mp3').default

const params = new URL(window.location.href).searchParams
const initialState: TimerState = {
  timers:
    params
      .get('times')
      ?.split(',')
      .map(Number)
      .filter(Boolean)
      .map((time, id) => ({ id, time })) ?? [],
}

function App() {
  const [state, dispatch] = useReducer(timerReducer, initialState)
  const [duration, setDuration] = useState(5 * 60)

  // Preload sound assets
  useSound(alarmSfx)

  return (
    <div className="flex flex-col items-center min-h-screen py-20 antialiased text-white min-w-screen bg-blueGray-700">
      <div className="flex flex-col items-center my-16">
        <div>
          <button className="p-2" onClick={() => setDuration(5 * 60)}>
            5m
          </button>
          <button className="p-2" onClick={() => setDuration(10 * 60)}>
            10m
          </button>
          <button className="p-2" onClick={() => setDuration(30 * 60)}>
            30m
          </button>
          <button className="p-2" onClick={() => setDuration(60 * 60)}>
            1h
          </button>
        </div>
        <div className="flex flex-row items-center justify-center">
          <DurationPicker
            value={duration}
            onChange={(duration) => setDuration(duration)}
          />
          <button
            className={[
              'px-4 py-2',
              0 >= duration && 'opacity-25 cursor-not-allowed',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() =>
              duration > 0 && dispatch(addTimer({ time: duration }))
            }
          >
            <AddRounded style={{ fontSize: 56 }} />
          </button>
        </div>
      </div>
      {state.timers.map((timer) => (
        <Timer
          key={timer.id}
          time={timer.time}
          onClickRemove={() => dispatch(removeTimer(timer.id))}
        />
      ))}
    </div>
  )
}

export default App
