import {Toaster} from 'react-hot-toast'
import './App.css';
import Display from './Components/Display';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Footer from './Components/Layout/Footer';
import Header from './Components/Layout/Header';
import ProductDesc from './Components/Product/ProductDesc';

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
        </Routes>
      </div>
      <Footer/>
    </div>
    </Router>
    
  );
}

export default App;
