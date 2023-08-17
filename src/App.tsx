import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
// import Home from "./pages/Home";
// import Dashboard from "./pages/About";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import "./styles/index.css";


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;