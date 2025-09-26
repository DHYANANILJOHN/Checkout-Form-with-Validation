import logo from './logo.svg';
import './App.css';
import{BrowserRouter,Routes,Route,} from"react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Test from './Test';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/test' element={<><Test/></>}></Route>
          </Routes></BrowserRouter>
    </div>
  );
}

export default App;
