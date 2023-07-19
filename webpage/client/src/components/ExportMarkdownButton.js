import React from "react";
import FileSaver from "file-saver";
import localAxios from '../api/Axios';
import { Button } from "antd";
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';
import PrintIcon from '@mui/icons-material/Print';

export default function ExportMarkdownButton({documentId, title}) {
    const handleExport = async () => {
        try {
            window.open(`http://localhost:3002/api/fileRouter/exportMarkdown/${documentId}`, "_blank");
        } catch (error) {
            alert('File download error');
        }
    }
        
    return (
        <div>
            <IconButton type="primary" onClick = {handleExport}> <PrintIcon /> </IconButton>
        </div>
    )
}