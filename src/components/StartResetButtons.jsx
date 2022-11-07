import React from "react";
import { FaPause, FaPlay, FaUndoAlt } from "react-icons/fa";

const StartResetButtons = ({ handleStart, handleReset, running, started }) => {
  const playButton = (
    <button className="text-3xl" onClick={handleStart}>
      <FaPlay />
    </button>
  );

  const pauseButton = (
    <button className="text-3xl" onClick={handleStart}>
      <FaPause />
    </button>
  );

  const resetButton = (
    <button className="text-3xl" onClick={handleReset}>
      <FaUndoAlt className="m-auto"/>
    </button>
  );

  return (
    <div className="">
      {started ? (
        <div>
          {running ? pauseButton : playButton}
          {resetButton}
        </div>
      ) : (
        playButton
      )}
    </div>
  );
};

export default StartResetButtons;
