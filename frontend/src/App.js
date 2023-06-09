import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navBar";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
