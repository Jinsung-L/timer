import { FC, useState } from 'react'
import useInterval from '../lib/useInterval'
import ms from 'pretty-ms'
import {
  PlayArrowRounded,
  PauseRounded,
  RestoreRounded,
  CloseRounded,
} from '@material-ui/icons'

export interface TimerProps {
  time: number
  onClickRemove?: () => void
}

const Timer: FC<TimerProps> = ({ time, onClickRemove }) => {
  const [count, setCount] = useState(0)
  const [isStop, setIsStop] = useState(false)
  const isEnd = count >= time

  useInterval(() => setCount(count + 1), isEnd || isStop ? null : 1000)

  return (
    <div
      className={[
        'p-2 w-full h-full flex flex-row items-center justify-center font-sans cursor-default select-none',
        isEnd && 'bg-red-500 text-white animate-pulse duration-1000',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="text-6xl font-thin lining-nums tabular-nums">
        {ms((time - count) * 1000, { colonNotation: true })}
      </span>
      <div className="px-2">
        <button
          className={['p-2', isEnd && 'opacity-25 cursor-not-allowed']
            .filter(Boolean)
            .join(' ')}
          onClick={() => !isEnd && setIsStop(!isStop)}
        >
          {isStop ? (
            <PlayArrowRounded style={{ fontSize: 40 }} />
          ) : (
            <PauseRounded style={{ fontSize: 40 }} />
          )}
        </button>
        <button
          className={[
            'p-2',
            !((isStop || isEnd) && count > 0) &&
              'opacity-25 cursor-not-allowed',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => {
            if ((isStop || isEnd) && count > 0) {
              setCount(0)
              setIsStop(true)
            }
          }}
        >
          <RestoreRounded style={{ fontSize: 28 }} />
        </button>
        {onClickRemove && (
          <button
            className={[
              'p-2',
              !(isStop || isEnd) && 'opacity-25 cursor-not-allowed',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => (isStop || isEnd) && onClickRemove()}
          >
            <CloseRounded style={{ fontSize: 32 }} />
          </button>
        )}
      </div>
    </div>
  )
}

export default Timer
