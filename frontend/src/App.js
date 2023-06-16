import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navBar";
import Login from './components/login';
import SignUp from './components/signup';
import Home from './components/home';
import UserProfile from './components/userProfile';
import SellProduct from './components/sellProduct';
import ProductDetails from './components/productDetails';
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route element={<Login/>} path='/login'></Route>
            <Route element={<SignUp/>} path='/signup'></Route>
            <Route element={<Home/>} path='/'></Route>
            <Route element={<UserProfile/>} path='/up'></Route>
            <Route element={<SellProduct/>} path='/sell'></Route>
            <Route element={<ProductDetails/>} path='/productDetails'></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
