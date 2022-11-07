import { useState } from "react"
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai"


//Componente para controlar un timer y su state.
export const Timer = ({type, timer, changeTimer}) => {
  const [currentValue, setCurrentValue] = useState(timer);


  return (
    <div>
      <p><span>{type}</span><span>{currentValue}</span></p>
      <input value={currentValue} onChange={(e) => setCurrentValue(e.target.value)} onMouseUp={(e) => changeTimer(e.target.value)} type="range" min="1" max="60" step="1" />
    </div>
  )
}

