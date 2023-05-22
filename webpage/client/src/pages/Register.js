import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import localAxios from "../api/Axios";

export default function Register() {
    const [username, setuserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const registerURL = "/api/authRouter/register/";

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const {data: response} = await localAxios.post(registerURL, {username, email, password});
      localStorage.setItem("token", response.data);
      console.log(response.data);
      navigate("/LoginHome");
    } catch(error) {
      setError(error.response.data.message);
      console.log(error.message);
    }
  }

  return (
    <form className="Register" onSubmit = {handleRegister}>
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