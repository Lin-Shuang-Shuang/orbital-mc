import React from "react";
import {useState} from "react";
import Axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const [input, setInput] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const login = (e) => {
        Axios.post("http://localhost:3002/api/authRouter/login", {input, password}).then((response) => {
            if (response.status === 200) {
                navigate("/LoginHome");
            }
        });
        e.preventDefault();
    }

    return (
        <form className = "Login" onSubmit = {login}>
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