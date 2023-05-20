import React from "react";
import {useState} from "react";
import Axios from "axios";
export default function CreateAccount() {
    const [username, setuserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const createUser = () => {
    Axios.post("http://localhost:3002/createUser", {username, email, password}).then((response) => {});
  }

  return (
    <div className="CreateAccount">
        <input type = "text" placeholder = "Username..." 
          onChange={(event) => {setuserName(event.target.value)}}/>
        <input type = "text" placeholder = "Email..."
          onChange={(event) => {setEmail(event.target.value)}} />
        <input type = "text" placeholder = "Password..."
          onChange={(event) => {setPassword(event.target.value)}} />
        <button onClick={createUser}> Create Account </button>
      <div>
        
      </div>  

    </div>
  );
}