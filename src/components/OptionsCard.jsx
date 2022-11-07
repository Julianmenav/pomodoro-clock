import React from "react";
import { Timer } from "./Timer";

const OptionsCard = ({
  hidden,
  longBreak,
  session,
  breakTimer,
  handleSession,
  handleBreak,
  handleLongBreak
}) => {
  return (
    <div className={`noHideMenu absolute top-0 right-0 ${hidden ? "hidden" : ""}`}>
      <Timer
        type="Session"
        changeTimer={handleSession}
        timer={session}
      />
      <Timer
        type="Break"
        changeTimer={handleBreak}
        timer={breakTimer}
      />
      <Timer
        type="Long Break"
        changeTimer={handleLongBreak}
        timer={longBreak}
      />
    </div>
  );
};

export default OptionsCard;
