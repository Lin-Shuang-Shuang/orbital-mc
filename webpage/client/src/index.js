import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import 'katex/dist/katex.min.css';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MathJaxContext } from 'better-react-mathjax';
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LoginHome from "./pages/LoginHome";
import MarkDown from "./pages/MarkDown";
import Dashboard from "./pages/Dashboard";
import PostIt from "./pages/PostIt";
import LaTex from "./pages/LaTex";
import { v4 as uuidV4} from 'uuid';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') disableReactDevTools()

export default function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />

          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="LoginHome/:id" element={ <LoginHome />}/>
          <Route path="MarkDown/:id" element = {<MarkDown />} />
          <Route path="PostIt" element = {<PostIt />} />
          <Route path="LaTex/:id" element = {<LaTex />} />

      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


