import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DemoComponent from './components/DemoComponent';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  document.title = "nobody reactJs first app";
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>This is my ReactJs app</p>
        <Login />
      </header> */}
      {/* <Login /> */}
      <SignUp />
    </div>
  );
}

export default App;
