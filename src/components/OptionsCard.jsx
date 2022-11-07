import React from "react";
import { Timer } from "./Timer";

const OptionsCard = ({
  longBreak,
  session,
  breakTimer,
  handleSession,
  handleBreak,
  handleLongBreak
}) => {
  return (
    <div>
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
