import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LoginHome from "./pages/LoginHome";
import MarkDown from "./pages/MarkDown";
import AuthProvider from "./context/AuthContext";
//import RTE from "./pages/RTE.html";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route path="LoginHome" element = {<LoginHome />} />
          <Route path="MarkDown" element = {<MarkDown />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);


