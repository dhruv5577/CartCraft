
import './App.css';
import Display from './Components/Display';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Footer from './Components/Layout/Footer';
import Header from './Components/Layout/Header';

function App() {
  return (
    <Router>    
    <div className="App">
      <Header/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Display/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
    </Router>
    
  );
}

export default App;
