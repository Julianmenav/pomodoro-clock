import { useState } from 'react';
import moment from "moment";

export const useGetTimers = (session, breakT) => {
  const [time, setTime] = useState(session);
  const [breakTime, setBreakTime] = useState(breakT);
  const [timeLeft, setTimeLeft] = useState(moment(new Date(0)).add(time, "m"))

  const incrementSession = () => {
    if (time < 60) {
      setTimeLeft(moment(new Date(0)).add(time + 1, "m"));
      setTime(time + 1);
    }
  }
  const decrementSession = () => {
    if (time > 1) {
      setTimeLeft(moment(new Date(0)).add(time - 1, "m"));
      setTime(time - 1);
    }
  }
  const incrementBreak = () => {
    if (breakTime < 60) {
      setBreakTime(breakTime + 1);
    }
  }
  const decrementBreak = () => {
    if (breakTime > 1) {
      setBreakTime(breakTime - 1);
    }
  }
  const resetTimers = () => {
    setTime(session);
    setBreakTime(breakT);
    setTimeLeft(moment(new Date(0)).add(session, "m"))
  }

  return {
    time,
    breakTime,
    timeLeft,
    setTimeLeft,
    resetTimers,
    incrementSession,
    decrementSession,
    incrementBreak,
    decrementBreak
  }

}