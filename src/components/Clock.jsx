import { useEffect } from "react";
import { formatUnixToMinutes } from "../utils/formatTimer";

export const Clock = ({ started, timeCounter }) => {
  const formattedTime = formatUnixToMinutes(timeCounter);
  
  useEffect(() => {
    document.title = started ? `${formattedTime} Pomodoro` : "Pomodoro Timer";
  }, [formattedTime]);

  return (
    <div>
        <div id="time-left" className="pb-2">
          <span className="text-8xl md:text-9xl font-bold">{formatUnixToMinutes(timeCounter)}</span>
      </div>
    </div>
  );
};
