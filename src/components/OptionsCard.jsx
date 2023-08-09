import React from "react";
import { Timer } from "./Timer";
import CloseMenu from "./CloseMenu";

const OptionsCard = ({
  running,
  hidden,
  longBreak,
  session,
  breakTimer,
  handleSession,
  handleBreak,
  handleLongBreak
}) => {
  return (
    <div className={`absolute h-full max-w-md overflow-y-auto right-0 pl-5 pr-3 md:pr-16 lg:pr-32 pt-8 bg-black/80 duration-700 noHideMenu ${hidden ? "translate-x-full" : ""}`}>
      <CloseMenu />
      <Timer
        running={running}
        type="Session"
        changeTimer={handleSession}
        timer={session}
      />
      <Timer
        running={running}
        type="Break"
        changeTimer={handleBreak}
        timer={breakTimer}
      />
      <Timer
        running={running}
        type="Long Break"
        changeTimer={handleLongBreak}
        timer={longBreak}
      />
      <div className="text-sm">
        <p className="pb-2">The <b>Pomodoro Technique</b> is a popular method for studying or working effectively.</p>
        <p className="pb-1 ">It involves using three timers:</p>
        <p className="pb-1.5 "><b className="text-teal-200">Session</b>: Dedicated work time where you focus on a task.</p>
        <p className="pb-1.5 "><b className="text-teal-200">Break</b>: Short time to rest between sessions.</p>
        <p className="pb-1.5 "><b className="text-teal-200">Long break</b>: Each 4 sessions, you will have a bigger break, and you will have completed an entire Pomodoro.</p>
      </div>
    </div>
  );
};

export default OptionsCard;
