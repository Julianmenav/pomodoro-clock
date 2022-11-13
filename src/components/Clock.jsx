import { useEffect } from "react";
import { formatUnixToMinutes } from "../utils/formatTimer";

export const Clock = ({ started, showMenu, timeCounter }) => {
  const formattedTime = formatUnixToMinutes(timeCounter);
  
  useEffect(() => {
    document.title = started ? `${formattedTime} Pomodoro` : "Pomodoro Timer";
  }, [formattedTime]);

  return (
    <div className="noHideMenu w-fit m-auto cursor-pointer bg-gray-100/[0.1] hover:bg-gray-100/[0.2] active:bg-white/[0.1] transition-colors rounded-3xl px-3 -translate-y-1/2" onClick={showMenu}>
        <div id="time-left" className=" pb-2">
          <span className="text-8xl md:text-9xl font-bold font-mono">{formatUnixToMinutes(timeCounter)}</span>
      </div>
    </div>
  );
};
