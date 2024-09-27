import {Toaster} from 'react-hot-toast'
import './App.css';
import Display from './Components/Display';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Footer from './Components/Layout/Footer';
import Header from './Components/Layout/Header';
import ProductDesc from './Components/Product/ProductDesc';
import Login from './Components/AUthenticate/Login';
import Register from './Components/AUthenticate/Register';
import UserDetails from './Components/User/UserDetails';
import UpdateDetails from './Components/User/UpdateDetails';
import SecureRoute from './Components/User/SecureRoute';

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
          <Route path="/me/profile" element={
            <SecureRoute><UserDetails/></SecureRoute>
            }/>
          <Route path="/me/update" element={<SecureRoute><UpdateDetails/></SecureRoute>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
    </Router>
    
  );
}

export default App;
