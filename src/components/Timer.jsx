import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai"


//Componente para controlar un timer y su state.
export const Timer = ({incrementCallback, decrementCallback, timer}) => {
  return (
    <div>
      <button onClick={decrementCallback}>
        <AiOutlineLeft />
      </button>
      <div>
        <p>{timer}</p>
      </div>
      <button  onClick={incrementCallback}>
        <AiOutlineRight />
      </button>
    </div>
  )
}