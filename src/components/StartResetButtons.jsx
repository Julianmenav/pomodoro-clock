import React from "react";

const StartResetButtons = ({ handleStart, handleReset, running, started }) => {
  const playButton = (
    <button className="py-1 px-3 border-2 border-zinc-600 bg-zinc-800 hover:bg-zinc-700 text-gray-300 rounded-md w-24 lg:text-xl lg:w-44 lg:py-1.5" onClick={handleStart}>
      Play
    </button>
  );

  const pauseButton = (
    <button className="py-1 px-3 border-2 border-zinc-600 bg-zinc-800 hover:bg-zinc-700 text-gray-300 rounded-md w-24 lg:text-xl lg:w-44 lg:py-1.5" onClick={handleStart}>
      Pause
    </button>
  );

  const resetButton = (
    <button className={`py-1 px-3 border-2 border-zinc-600 bg-zinc-800 text-gray-300 rounded-md w-24 lg:text-xl lg:w-44 lg:py-1.5 ${started ? 'hover:bg-zinc-700' : 'opacity-60 cursor-auto'}`} onClick={handleReset}>
      Reset
    </button>
  );

  return (
    <div className="noHideMenu ">
        <div className="flex flex-row gap-2 lg:gap-4">
          {running ? pauseButton : playButton}
          {resetButton}
        </div>
    </div>
  );
};

export default StartResetButtons;
