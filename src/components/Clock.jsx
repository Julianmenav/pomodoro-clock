import { formatUnixToMinutes } from "../utils/formatTimer";


export const Clock = ({inBreak, timeCounter}) => {

  return (
    <div className="container">
      <div id="timer-label" className="timer-label">
        {inBreak ? <>BREAK</> : <>SESSION</>}
        <div id="time-left" className="display">
          {formatUnixToMinutes(timeCounter)}
        </div>
      </div>
      <br></br>
    </div>
  );
};
