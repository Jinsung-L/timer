import { useReducer } from 'react'
import { AddRounded } from '@material-ui/icons'
import Timer from './components/Timer'
import {
  addTimer,
  removeTimer,
  timerReducer,
  TimerState,
} from './lib/timer-reducer'

const initialState: TimerState = { timers: [] }

function App() {
  const [state, dispatch] = useReducer(timerReducer, initialState)

  return (
    <div className="flex flex-col items-center min-h-screen py-20 antialiased text-white min-w-screen bg-blueGray-700">
      <div>
        <button onClick={() => dispatch(addTimer({ time: 10 }))}>
          {<AddRounded style={{ fontSize: 40 }} />}
        </button>
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
