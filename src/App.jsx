import "./App.css";
import { Clock } from "./components/Clock";
import StartResetButtons from "./components/StartResetButtons";
import OptionsCard from "./components/OptionsCard";
import { useEffect, useState } from "react";
const INTERVAL_MS = 250;
const defaultSessionTime = 20;
const defaultBreakTime = 5;


function App() {
  const [started, setStarted] = useState(false);
  const [running, setRunning] = useState(false);
  const [inBreak, setInBreak] = useState(false);
  const [sessionTime, setSessionTime] = useState(defaultSessionTime);
  const [breakTime, setBreakTime] = useState(defaultBreakTime);
  const [timeCounter, setTimeCounter] = useState(defaultSessionTime * 60 * 1000);
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
        const deltaMS = now - internalClock.date;

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
    setSessionTime(defaultSessionTime);
    setBreakTime(defaultBreakTime);
    setTimeCounter(defaultSessionTime * 1000 * 60);
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
    <>
      <div className=" cover-size absolute inset-0 flex flex-col pt-4 text-black antialiased duration-300 sm:pt-6 md:pt-10">
        <Clock started={started} inBreak={inBreak} timeCounter={timeCounter}/>
        <StartResetButtons
          handleStart={start}
          handleReset={reset}
          running={running}
        />
        <OptionsCard 
          incrementBreak={incrementBreak}
          decrementBreak={decrementBreak}
          incrementSession={incrementSession}
          decrementSession={decrementSession}
          sessionTime={sessionTime}
          breakTime={breakTime}
        />
      </div>
      <audio
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        id="beep"
        preload="auto"
      />
    </>
  );
}

export default App;
