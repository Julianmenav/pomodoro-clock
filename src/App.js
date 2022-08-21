import "./App.css";
import { Guide } from "./components/Guide";
import { Clock } from "./components/Clock";

//No se usarán librerías de terceros para controlar el tiempo. Se usarán milliseconds y una función que lo formatee en mm:ss
const App = () => {
  return (
    <>
      <Guide />
      <Clock />
    </>
  );
};

export default App;
