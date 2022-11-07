import { useEffect } from "react";
import { formatUnixToMinutes } from "../utils/formatTimer";

export const Clock = ({ started, inBreak, timeCounter }) => {
  const formattedTime = formatUnixToMinutes(timeCounter);
  
  useEffect(() => {
    document.title = started ? `${formattedTime} Pomodoro` : "Pomodoro Timer";
  }, [formattedTime]);

  return (
    <div className="container">
        <div id="time-left" className="text-6xl font-bold">
          {formatUnixToMinutes(timeCounter)}
      </div>
      <br></br>
    </div>
  );
};
