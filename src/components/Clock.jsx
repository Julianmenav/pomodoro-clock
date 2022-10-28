import { useEffect } from "react";
import { formatUnixToMinutes } from "../utils/formatTimer";

export const Clock = ({ started, inBreak, timeCounter }) => {
  const formattedTime = formatUnixToMinutes(timeCounter);
  
  useEffect(() => {
    document.title = started ? `${formattedTime} Pomodoro` : "Pomodoro Timer";
    console.count("cambiando titulo")
  }, [formattedTime]);

  return (
    <div className="container">
      <div id="timer-label" className="timer-label">
        {inBreak ? <>BREAK</> : <>SESSION</>}
        <div id="time-left" className="display">
          {formatUnixToMinutes(timeCounter)}
        </div>
      </div>
      <br></br>
    </div>
  );
};
