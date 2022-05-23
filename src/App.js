import { useState, useEffect } from 'react';
import moment from "moment";
import { getTimer } from './utils'
import { useGetTimers } from './hooks';
import { Timer } from './components/Timer';
import { Guide } from './components/Guide'
import './App.css';


//Esta vez con Functional Components y hooks.
const App = (props) => {
  const [running, setRunning] = useState(false);
  const [inBreak, setInBreak] = useState(false);
  const { time,
    breakTime,
    timeLeft,
    setTimeLeft,
    resetTimers,
    incrementSession,
    decrementSession,
    incrementBreak,
    decrementBreak } = useGetTimers(25, 5);

  //LIFECYCLE
  //Se encarga de reducir el contador de tiempo y de cambiar entre modos cuando se llega a 0.
  useEffect(() => {
    if (timeLeft.toDate().getTime() <= 0) {
      if (inBreak) {
        setTimeLeft(moment(new Date(0)).add(time, "m"))
        setInBreak(false);
      } else {
        let sound = document.getElementById("beep")
        sound.play()
        setTimeLeft(moment(new Date(0)).add(breakTime, "m"))
        setInBreak(true);
      }
    }
    if (running) {
      const interval = setInterval(() => {
        setTimeLeft(moment(timeLeft).subtract(0.5, "s"))
      }, 500);
      return () => clearInterval(interval);
    }
  }, [timeLeft, running, inBreak, time, breakTime]);


  const start = () => {
    running ? (setRunning(false)) : (setRunning(true));
  }
  const reset = () => {
    setInBreak(false);
    setRunning(false);
    resetTimers();
    let sound = document.getElementById("beep")
    sound.pause()
  }

  return (
    <div>
      <Guide />
      <div className="container">
        <div id="timer-label" className="timer-label">
          {inBreak ? (<>BREAK</>) : (<>SESSION</>)}
          <div id="time-left" className="display">
            {getTimer(timeLeft)}
          </div>
        </div>
        <br></br>
        <div className="timers">
          <div id="session-label" className="session-label">
            Session Length
            <Timer type="session"
              incrementCallback={incrementSession}
              decrementCallback={decrementSession}
              timer={time}
            />
          </div>
          <br></br>
          <div id="break-label" className="break-label">
            Break Length
            <Timer type="break"
              incrementCallback={incrementBreak}
              decrementCallback={decrementBreak}
              timer={breakTime}
            />
          </div>
        </div>
        <br></br>
        <div className="start-and-reset">
          <button id="start_stop"
            onClick={start}
            className={running ? ("bi bi-pause big") : ("bi bi-play big")}
          ></button>
          <button className={"bi bi-bootstrap-reboot big"} id="reset" onClick={reset}></button>
        </div>
        <div className="author">
          {' '}
          Designed and Coded by <br />
          <a href="https://github.com/Julianmenav/" target="_blank">
            Julian Mena
          </a>
        </div>
        <audio
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          id="beep"
          preload="auto"
        />
      </div>
    </div>
  )
}

export default App;
