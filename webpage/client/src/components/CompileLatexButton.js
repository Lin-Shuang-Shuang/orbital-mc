import React from "react";
import FileSaver from "file-saver";
import localAxios from '../api/Axios';
import { saveAs } from 'file-saver';
import { Button } from "antd";
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';
import PrintIcon from '@mui/icons-material/Print';

export default function CompileLatexButton({documentId, title}) {
    const handleCompile = async () => {
        try {
            const response = await localAxios.get(`/api/LaTexRouter/compileToPDF/${documentId}`, { responseType: 'blob' });
            saveAs(response.data, `${title}.pdf`);
        } catch (error) {
            alert('File download error');
        }
    }
        
    return (
        <div>
            <IconButton type="primary" onClick = {handleCompile}> <PrintIcon /> </IconButton>
        </div>
    )
}