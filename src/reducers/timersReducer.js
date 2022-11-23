export const timersReducer = (state, action) => {
  switch (action.type) {
    case "START":
      return {
        ...state,
        internalClock: { remaining: action.milliseconds, date: new Date() },
      };
    case "RESET":
      return { ...action.timers };
    case "SUBSTRACT_MILLISECONDS":
      return { ...state, counter: state.internalClock.remaining - action.milliseconds };
    case "CHANGE_PHASE":
      return {
        ...state,
        counter: action.minutes * 60 * 1000,
        cycle: state.cycle + 1,
        internalClock: {
          remaining: action.minutes * 60 * 1000,
          date: new Date(),
        },
      };
    case 'CHANGE_SESSION':
      return {...state, session: action.minutes}
    case 'CHANGE_BREAK':
      return {...state, breakTimer: action.minutes}
    case 'CHANGE_LONGBREAK':
      return {...state, longBreak: action.minutes}
    case 'CHANGE_COUNTER':
      return {...state, counter: action.minutes * 60 * 1000 }
    default:
      return { ...state};
  }
};
