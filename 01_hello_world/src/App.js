import logo from './logo.svg';
import './App.css';
import HelloWorld from "./HelloWorld"

function App() {
  return (
    <div className="App">
      <HelloWorld/>
      <img style={{ width: 250, height: 250 }} src={logo} alt="Logo"></img>
      <HelloWorld name="Abed">
      </HelloWorld>
    </div>
  );
}

export default App;
