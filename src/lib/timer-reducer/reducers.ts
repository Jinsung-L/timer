import { ADD_TIMER, REMOVE_TIMER, TimerActionTypes, TimerState } from './types'

export function timerReducer(
  state: TimerState,
  action: TimerActionTypes
): TimerState {
  switch (action.type) {
    case ADD_TIMER:
      return {
        timers: [
          ...state.timers,
          {
            ...action.payload,
            id: (state.timers.slice(-1)[0]?.id ?? 0) + 1,
          },
        ],
      }
    case REMOVE_TIMER:
      return {
        timers: state.timers.filter((timer) => timer.id !== action.meta.id),
      }
    default:
      return state
  }
}
