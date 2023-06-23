import React from "react";
import { useRef } from "react";
import localAxios from '../api/Axios';
import {useNavigate} from "react-router-dom";

export default function UploadButton() {
    const inputRef = useRef();
    const navigate = useNavigate();
    const handleUpload = async () => {
        const file = inputRef.current.files[0];
        if (!file) {
            return;
        }
        const request = new FormData();
        request.append('file', file);
        const response = await localAxios.post("/api/fileRouter/uploadword", request);
        const text = response.data.data;
        const title = response.data.title;
        const token = localStorage.getItem("jsontoken");
        await localAxios.post("/api/fileRouter/createFile", {token, title, text});
    }
    return (
        <div>
            <input type = "file" ref = {inputRef} />
            <button onClick = {handleUpload}> Upload </button>
        </div>
    )
}