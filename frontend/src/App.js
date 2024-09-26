import {Toaster} from 'react-hot-toast'
import './App.css';
import Display from './Components/Display';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Footer from './Components/Layout/Footer';
import Header from './Components/Layout/Header';
import ProductDesc from './Components/Product/ProductDesc';
import Login from './Components/AUthenticate/Login';
import Register from './Components/AUthenticate/Register';

function App() {
  return (
    <Router>    
    <div className="App">
      <Toaster position='top-center'/>
      <Header/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Display/>}/>
          <Route path="/product/:id" element={<ProductDesc/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
    </Router>
    
  );
}

export default App;
