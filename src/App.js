import './App.css';
import { Provider } from 'react-redux'
import store from './Redux/store'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import "font-awesome/css/font-awesome.css";
import Dashboard from './components/Layout/Dashboard';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Dashboard />
      </div>
      </Provider>
  );
}

export default App;
