import React from "react";
import { useRef } from "react";
import localAxios from '../api/Axios';
import {useNavigate} from "react-router-dom";
import { Button } from '@mui/material';
export default function UploadMarkdownButton() {
    const inputRef = useRef();
    const handleUpload = async () => {
        const file = inputRef.current.files[0];
        if (!file) {
            return;
        }
        const token = localStorage.getItem("jsontoken");
        const request = new FormData();
        request.append('file', file);
        await localAxios.post("/api/fileRouter/uploadMarkdown", request, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization' : `Bearer ${token}`
            },
          }).then(window.location.reload());
    }
    return (
        <div className="upload-container">
            <input type = "file" ref = {inputRef} />
            <button  onClick = {handleUpload}> Upload </button>
        </div>
    )
}