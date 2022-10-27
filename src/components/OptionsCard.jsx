import React from "react";
import { Timer } from "./Timer";

const OptionsCard = ({
  incrementBreak,
  incrementSession,
  decrementBreak,
  decrementSession,
  sessionTime,
  breakTime,
}) => {
  return (
    <div>
      <Timer
        type="session"
        incrementCallback={incrementSession}
        decrementCallback={decrementSession}
        timer={sessionTime}
      />
      <Timer
        type="break"
        incrementCallback={incrementBreak}
        decrementCallback={decrementBreak}
        timer={breakTime}
      />
    </div>
  );
};

export default OptionsCard;
