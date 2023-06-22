import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LoginHome from "./pages/LoginHome";
import MarkDown from "./pages/MarkDown";
import AuthProvider from "./context/AuthContext";
import { v4 as uuidV4} from 'uuid';

export default function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
          //once we render the loginhome route, we will redirect them to a brand new random doc
          <Route path="LoginHome" element={<a href={`/documents/${uuidV4()}`}>create document</a>} />

            <Route path='/documents/:id' element={ <LoginHome />}/>

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


