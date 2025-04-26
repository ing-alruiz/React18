import logo from './logo.svg';
import './App.css';
import CicloVida from './components/CicloVida/CicloVida';
import CicloVidaFuncional from './components/CicloVidaFuncional/CicloVidaFuncional';
import Car from './components/Car/Car';
import Contador from './components/Contador/Contador';
import LazyLoader from './components/LazyLoader/LazyLoader';

function App() {
  return (
    <div className="App">
      {/* <CicloVida propiedad="Propiedad pasada desde el padre" />
      <CicloVidaFuncional propiedad="Propiedad pasada desde el padre" />
      <Car /> */}
      <Contador />
      <LazyLoader />
    </div>
  );
}

export default App;
