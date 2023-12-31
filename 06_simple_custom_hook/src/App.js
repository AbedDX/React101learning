import logo from './logo.svg';
import './App.css';
import useCount from './hooks/useCount';


function App() {
  const [value,add,subtract] = useCount(10);

  return (
    <div className="App">
      <h2>Count:{value}</h2>
      <button onClick={add}>+</button>
      <button onClick={subtract}>-</button>
      <br/>
      <img style={{ width: 200, height: 200 }} src={logo} alt="Logo"></img>
      <br/>
      <p>"I had the opportunity to learn something new about React hooks today."</p>
    </div>
  );
}

export default App;
