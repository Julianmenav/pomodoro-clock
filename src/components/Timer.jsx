
//Componente para controlar un timer y su state.
export const Timer = (props) => {
  return (
    <div id={props.type + "-length"} className="timer" style={props.style}>
      <button id={props.type + "-decrement"} onClick={props.decrementCallback}>
        <i className="bi bi-arrow-left"></i>
      </button>
      <div>
        <p>{props.timer}</p>
      </div>
      <button id={props.type + "-increment"} onClick={props.incrementCallback}>
        <i className="bi bi-arrow-right"></i>
      </button>
    </div>
  )
}