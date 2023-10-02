import logo from './logo.svg';
import './App.css';
import HelloWorld from "./HelloWorld"

function App() {
  return (
    <div className="App">
      <HelloWorld/>
      <img style={{ width: 200, height: 200 }} src={logo} alt="Logo"></img>
      <HelloWorld name="Abed">
      </HelloWorld>
    </div>
  );
}

export default App;
