import './App.css'
import Login from './usuario/login'
import Registro from './usuario/registro'
import Home from './usuario/home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
  
}

export default App
