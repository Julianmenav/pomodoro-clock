import "./App.css";
import { Clock } from "./components/Clock";
import StartResetButtons from "./components/StartResetButtons";
import OptionsCard from "./components/OptionsCard";
import { useEffect, useState } from "react";
import { timersReducer } from "./reducers/timersReducer";
import { useReducer } from "react";

import { useHiddenMenu } from "./hooks/useHiddenMenu";
import OpenMenu from "./components/OpenMenu";

const INTERVAL_MS = 250;
const defaultSession = 20;
const defaultBreak = 5;
const defaultLongBreak = 15;

const initialState = {
  session: defaultSession,
  breakTimer: defaultBreak,
  longBreak: defaultLongBreak,
  counter: defaultSession * 60 * 1000,
  cycle: 1,
  internalClock: { remaining: 0, date: new Date() },
};

function App() {
  const [timerState, dispatch] = useReducer(timersReducer, initialState);
  const [started, setStarted] = useState(false);
  const [running, setRunning] = useState(false);
  const [inBreak, setInBreak] = useState(false);

  const [isMenuHidden, setIsMenuHidden] = useHiddenMenu();

  //LIFECYCLE
  //Se encarga de reducir el contador de tiempo (when running) y de cambiar entre modos cuando se llega a 0.
  useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        const now = new Date();
        //Diferencia en milisegundos desde que se presionó el bótón hasta ahora.
        const deltaMS = now - timerState.internalClock.date;

        //El nuevo estado del cronómetro será el tiempo que quedaba cuando se le dió al botón de Start menos el tiempo que haya pasado desde ese mismo momento.
        dispatch({
          type: "SUBSTRACT_MILLISECONDS",
          milliseconds: deltaMS,
        });

        //Phase change when timer runs out.
        if (timerState.internalClock.remaining - deltaMS <= 0) {
          changePhase();
        }
      }, INTERVAL_MS);

      return () => {
        clearInterval(interval);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, timerState.internalClock]);

  //Update Timer cuando el usuario cambia la duración de la sesión.
  useEffect(() => {
    if (running) return;
    dispatch({ type: "CHANGE_COUNTER", minutes: timerState.session });
  }, [timerState.session]);

  const changePhase = () => {
    //Cuando se cambia de fase, se reinicia el contador interno (Como si pulsasemos star/stop). Lo cual reinicia useEffect y por tanto un nuevo intervalo.
    setInBreak(!inBreak);

    let sound = document.getElementById("beep");
    sound.play();

    const nextCycle = timerState.cycle + 1;
    //Change to session when nextCycle is odd
    if(nextCycle% 2 != 0) return dispatch({ type: "CHANGE_PHASE", minutes: timerState.session });
    
    //Change to LongBreak in multiples of 8.
    if(nextCycle % 8 == 0) return dispatch({ type: "CHANGE_PHASE", minutes: timerState.longBreak });

    //Break
    return dispatch({ type: "CHANGE_PHASE", minutes: timerState.breakTimer });
  };

  //Start/Stop and reset functions
  const start = () => {
    //En caso de start, guarda la fecha actual para que el tiempo se reste correctamente dentro del intervalo.
    if (!running) {
      dispatch({ type: "START", milliseconds: timerState.counter });
    }
    setStarted(true);
    setRunning(!running);
  };

  const reset = () => {
    dispatch({ type: "RESET", timers: initialState });

    setInBreak(false);
    setRunning(false);
    setStarted(false);

    let sound = document.getElementById("beep");
    sound.pause();
  };

  //Increment and Decrement session/break/longbreak
  const handleSession = (minutes) =>
    dispatch({ type: "CHANGE_SESSION", minutes: minutes });
  const handleBreak = (minutes) =>
    dispatch({ type: "CHANGE_BREAK", minutes: minutes });
  const handleLongBreak = (minutes) =>
    dispatch({ type: "CHANGE_LONGBREAK", minutes: minutes });

  return (
    <>
      <div className="fixed cover-size inset-0 flex flex-col  overflow-hidden text-white antialiased duration-300 px-2 select-none">
        <OpenMenu
          hidden={!isMenuHidden}
          showMenu={() => setIsMenuHidden(false)}
        />
        <div className="flex flex-col justify-center items-center w-full max-w-lg lg:max-w-xl bg-zinc-800 m-auto pb-10 pt-14 lg:pb-12 lg:pt-20 rounded-xl border-2 border-zinc-700 gap-4 lg:gap-10">
          <Clock
            showMenu={() => setIsMenuHidden(false)}
            started={started}
            inBreak={inBreak}
            timeCounter={timerState.counter}
          />
          <StartResetButtons
            handleStart={start}
            handleReset={reset}
            running={running}
            started={started}
          />
        </div>
        <OptionsCard
          running={running}
          hidden={isMenuHidden}
          handleSession={handleSession}
          handleBreak={handleBreak}
          handleLongBreak={handleLongBreak}
          longBreak={timerState.longBreak}
          session={timerState.session}
          breakTimer={timerState.breakTimer}
        />
      </div>
      <audio
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        id="beep"
        preload="auto"
      />
      <div
        className={`fixed -z-10 h-full w-full brightness-75 ${
          running ? "brightness-50" : ""
        } duration-500`}
      >
      </div>  
    </>
  );
}

export default App;
