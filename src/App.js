import './App.css';
import Navbar from './components/Layout/Navbar';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import "font-awesome/css/font-awesome.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
      <div className="App">
         <Navbar />
      </div>
  );
}

export default App;
