import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Landing from "./components/Landing/Landing";
import Menu from "./components/Menu/Menu";
import Signup from "./components/Signup/Signup";
import Empdashboard from "./components/Emp_Dashboard/Empdashboard";

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Empdashboard" element={<Empdashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;