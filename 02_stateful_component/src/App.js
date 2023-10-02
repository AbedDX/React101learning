import logo from './logo.svg';
import './App.css';
import StatefulComponent from "./StatefulComponent";

function App() {
  return (
    <div className="App">  
      <StatefulComponent/>
      <img style={{ width: 200, height: 200 }} src={logo} alt="Logo"></img>
    </div>
  );
}

export default App;
