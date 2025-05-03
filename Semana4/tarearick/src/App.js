import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home/Home';
import AppRouter from './routes/AppRouter';
import Nav from './Components/Nav/Nav';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      {/* <Nav /> */}
      <AppRouter/>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
