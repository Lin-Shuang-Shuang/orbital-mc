import React from "react";
import {useState} from "react";
import Axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Register() {
    const [username, setuserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  const Register = (e) => {
    Axios.post("http://localhost:3002/api/authRouter/register/", {username, email, password}).then((response) => {
      if (response.status === 200) {
        navigate("/LoginHome");
      }
    });
    e.preventDefault();
  }

  return (
    <form className="Register" onSubmit = {Register}>
        <input type = "username" placeholder = "Username..." 
          onChange={(event) => {setuserName(event.target.value)}}
          value = {username}
        />
        <input type = "email" placeholder = "Email..."
          onChange={(event) => {setEmail(event.target.value)}}
          value = {email} 
        />
        <input type = "password" placeholder = "Password..."
          onChange={(event) => {setPassword(event.target.value)}} 
          value = {password}
        />
        <button> Register </button> 
    </form>
  );
}