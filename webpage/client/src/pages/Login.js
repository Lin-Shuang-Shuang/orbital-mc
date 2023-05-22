import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import localAxios from '../api/Axios';

export default function Login() {
    const [input, setInput] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const loginURL = "/api/authRouter/login";
    const handleLogin = async (e) => {
        e.preventDefault();
        try { 
            const {data: response} = await localAxios.post(loginURL, {input, password});
            localStorage.setItem("token", response.data);
            console.log(response.data);
            navigate("/LoginHome");
        } catch(error) {
            setError(error.response.data.message);
            console.log(error.message);
        }
    }

    return (
        <form className = "Login" onSubmit = {handleLogin}>
            <input type = "input" placeholder = "Username or email..." 
            onChange={(event) => {setInput(event.target.value)}}
            value = {input}
            />
            <input type = "password" placeholder = "Password..." 
            onChange={(event) => {setPassword(event.target.value)}}
            value = {password}
            />
            <button> Login </button> 
        </form>
    );
}