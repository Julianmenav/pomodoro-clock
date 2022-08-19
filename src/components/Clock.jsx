import React, {useState, useEffect} from 'react';
import {containerStyle} from '../style'
import {Timer} from './Timer'
import {formatUnixToMinutes} from '../utils'

const INTERVAL_MS = 100;

export const Clock = (props) => {
  const [started, setStarted] = useState(false);
  const [running, setRunning] = useState(false);
  const [inBreak, setInBreak] = useState(false);
  const [sessionTime, setSessionTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [timeCounter, setTimeCounter] = useState(25 * 60 * 1000);
  const [internalClock, setInternalClock] = useState({
    remaining: 0,
    date: new Date(),
  });

  //LIFECYCLE
  //Se encarga de reducir el contador de tiempo (when running) y de cambiar entre modos cuando se llega a 0.
  useEffect(() => {

    if (running) {
      const interval = setInterval(() => {
        const now = new Date();
        //Diferencia en milisegundos desde que se presionó el bótón hasta ahora.
        const deltaMS = (now - internalClock.date);

        // DEBUG
        // console.log("From: ", `${from.date.getMinutes()}:${from.date.getSeconds()}`)
        // console.log("Now: ", `${now.getMinutes()}:${now.getSeconds()}`)
        // console.log("Diferencia en segundos: " ,deltaMS / 1000)

        //El nuevo estado del cronómetro será el tiempo que quedaba cuando se le dió al botón de Start menos el tiempo que haya pasado desde ese mismo momento.
        setTimeCounter(internalClock.remaining - deltaMS);

        //Phase change when timer runs out.
        if (internalClock.remaining - deltaMS <= 0) {
          changePhase();
        }
      }, INTERVAL_MS);

      return () => {
        clearInterval(interval);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, internalClock]);

  const changePhase = () => {
    //Cuando se cambia de fase, se reinicia el contador interno (Como si pulsasemos star/stop). Lo cual reinicia useEffect y por tanto un nuevo intervalo.
    setInBreak(!inBreak);
    setTimeCounter(inBreak ? sessionTime * 60 * 1000 : breakTime * 60 * 1000);
    setInternalClock({
      remaining: inBreak ? sessionTime * 60 * 1000 : breakTime * 60 * 1000,
      date: new Date(),
    });
    let sound = document.getElementById("beep");
    sound.play();
  };

  //Start/Stop and reset functions
  const start = () => {
    //En caso de start, guarda la fecha actual para que el tiempo se reste correctamente dentro del intervalo.
    if (!running) {
      setInternalClock({
        remaining: timeCounter,
        date: new Date(),
      });
    }
    setStarted(true);
    setRunning(!running);
  };

  const reset = () => {
    setInBreak(false);
    setRunning(false);
    setStarted(false);
    setSessionTime(25);
    setBreakTime(5);
    setTimeCounter(25 * 1000 * 60);
    let sound = document.getElementById("beep");
    sound.pause();
  };

  //Increment and Decrement session/break time functions
  const incrementSession = () => {
    if (sessionTime < 60 && !started) {
      setSessionTime((prev) => prev + 1);
      setTimeCounter((prev) => prev + 1 * 60 * 1000);
    }
  };

  const incrementBreak = () => {
    if (breakTime < 60 && !started) {
      setBreakTime((prev) => prev + 1);
    }
  };

  const decrementSession = () => {
    if (sessionTime > 1 && !started) {
      setSessionTime((prev) => prev - 1);
      setTimeCounter((prev) => prev - 1 * 60 * 1000);
    }
  };

  const decrementBreak = () => {
    if (breakTime > 1 && !started) {
      setBreakTime((prev) => prev - 1);
    }
  };


  return (
    <div className="container" style={containerStyle}>
        <div id="timer-label" className="timer-label">
          {inBreak ? <>BREAK</> : <>SESSION</>}
          <div id="time-left" className="display">
            {formatUnixToMinutes(timeCounter)}
          </div>
        </div>
        <div className="timers">
          <div id="session-label" className="session-label">
            Session Length
            <Timer
              type="session"
              incrementCallback={incrementSession}
              decrementCallback={decrementSession}
              timer={sessionTime}
              style={started ? { opacity: 0.5 } : { opacity: 1 }}
            />
          </div>
          <br></br>
          <div id="break-label" className="break-label">
            Break Length
            <Timer
              type="break"
              incrementCallback={incrementBreak}
              decrementCallback={decrementBreak}
              timer={breakTime}
              style={started ? { opacity: 0.5 } : { opacity: 1 }}
            />
          </div>
        </div>
        <br></br>
        <div className="start-and-reset">
          <button
            id="start_stop"
            onClick={start}
            className={running ? "bi bi-pause big" : "bi bi-play big"}
          ></button>
          <button
            className={"bi bi-bootstrap-reboot big"}
            id="reset"
            onClick={reset}
          ></button>
        </div>
        <div className="author">
          Designed and Coded by <br />
          <a
            href="https://github.com/Julianmenav/"
            target="_blank"
            rel="noreferrer"
          >
            Julian Mena
          </a>
        </div>
        <audio
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          id="beep"
          preload="auto"
        />
      </div>
  );
}
