import { TimerProps } from '../../components/Timer'
import { ADD_TIMER, REMOVE_TIMER, TimerActionTypes } from './types'

export function addTimer(props: TimerProps): TimerActionTypes {
  return {
    type: ADD_TIMER,
    payload: props,
  }
}

export function removeTimer(id: number): TimerActionTypes {
  return {
    type: REMOVE_TIMER,
    meta: { id },
  }
}
