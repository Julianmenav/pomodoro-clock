import { useState, useEffect } from 'react';
import moment from "moment";
import { getTimer } from './utils'
import './App.css';


//Esta vez con Functional Components y hooks.
const App = (props) => {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [timeLeft, setTimeLeft] = useState(moment(new Date(0)).add(time, "m"))
  const [inBreak, setInBreak] = useState(false);

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
    setTime(25)
    setBreakTime(5);
    setTimeLeft(moment(new Date(0)).add(25, "m"))
    let sound = document.getElementById("beep")
    sound.pause()
  }

  const incrementSession = () => {
    if (time < 60) {
      setTimeLeft(moment(new Date(0)).add(time + 1, "m"));
      setTime(time + 1);
    }
  }
  const decrementSession = () => {
    if (time > 1) {
      setTimeLeft(moment(new Date(0)).add(time - 1, "m"));
      setTime(time - 1);
    }
  }
  const incrementBreak = () => {
    if (breakTime < 60) {
      setBreakTime(breakTime + 1);
    }
  }
  const decrementBreak = () => {
    if (breakTime > 1) {
      setBreakTime(breakTime - 1);
    }
  }

  return (
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
  )
}

//Componente para controlar un timer y su state.
const Timer = (props) => {
  return (
    <div id={props.type + "-length"} className="timer">
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

export default App;
