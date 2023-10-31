import logo from './logo.svg';
import './App.css';
import Card from './components/Card';
function App() {
  return (
    <div className="App">
		<Card/>
    <img style={{ width: 200, height: 200 }} src={logo} alt="Logo"></img>
    </div>
  );
}

export default App;
