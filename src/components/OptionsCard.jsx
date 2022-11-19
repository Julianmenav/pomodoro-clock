import React from "react";
import { Timer } from "./Timer";

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
    <div className={`absolute h-full overflow-y-auto right-0 pl-5 pr-3 md:pr-16 lg:pr-32 pt-12 bg-black/80 duration-700 ${hidden ? "translate-x-full" : ""}`}>
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
    </div>
  );
};

export default OptionsCard;
