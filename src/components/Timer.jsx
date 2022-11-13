import { useState, useEffect } from "react";

//Componente para controlar un timer y su state.
export const Timer = ({ type, timer, changeTimer, running }) => {
  const [currentValue, setCurrentValue] = useState(timer);

  useEffect(() => {setCurrentValue(timer)}, [timer])

  return (
    <div className="noHideMenu my-6">
      <p className="flex flex-col justify-between">
        <span className="font-bold text-teal-100 text-3xl">{type}</span>
        <span className="text-md">{currentValue} Minutes</span>
      </p>
      <input
        className={`${running ? "cursor-not-allowed" : ""} w-full rounded-full appearance-none cursor-pointer bg-gray-700`}
        disabled={running}
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        onMouseUp={(e) => changeTimer(e.target.value)}
        onTouchEnd={(e) => changeTimer(e.target.value)}
        type="range"
        min="1"
        max="60"
        step="1"
      />
    </div>
  );
};
