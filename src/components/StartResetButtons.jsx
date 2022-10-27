import React from "react";
import { FaPause, FaPlay, FaUndoAlt} from "react-icons/fa";

const StartResetButtons = ({ handleStart, handleReset, running }) => {
  return (
    <div>
      <button className="text-3xl" onClick={handleStart}>
        {running ? <FaPause /> : <FaPlay />}
      </button>
      <button className={"text-3xl"} onClick={handleReset}>
        <FaUndoAlt />
      </button>
    </div>
  );
};

export default StartResetButtons;
