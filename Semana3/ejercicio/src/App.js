import logo from './logo.svg';
import './App.css';
import CicloVida from './components/CicloVida/CicloVida';
import CicloVidaFuncional from './components/CicloVidaFuncional/CicloVidaFuncional';
import Car from './components/Car/Car';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <CicloVida propiedad="Propiedad pasada desde el padre" />
      <CicloVidaFuncional propiedad="Propiedad pasada desde el padre" />
      <Car />
    </div>
  );
}

export default App;
