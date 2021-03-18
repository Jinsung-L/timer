import { TimerProps } from '../../components/Timer'

export interface Timer extends TimerProps {
  id: number
}

export interface TimerState {
  timers: Timer[]
}

export const ADD_TIMER = 'ADD_TIMER'
export const REMOVE_TIMER = 'REMOVE_TIMER'

interface AddTimerAction {
  type: typeof ADD_TIMER
  payload: TimerProps
}

interface RemoveTimerAction {
  type: typeof REMOVE_TIMER
  meta: {
    id: number
  }
}

export type TimerActionTypes = AddTimerAction | RemoveTimerAction
