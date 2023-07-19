import React from "react";
import FileSaver from "file-saver";
import localAxios from '../api/Axios';
import { Button } from "antd";
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';

export default function DownloadMarkdownButton({documentId, title}) {
    const handleDownload = async () => {
        try {
            const response = await localAxios.get(`/api/fileRouter/downloadMarkdown/${documentId}`, { responseType: 'blob' });
            const blob = new Blob([response.data], { type: 'text/markdown' });
            FileSaver.saveAs(blob, `${title}.md`);
        } catch (error) {
            alert(error);
        }
    }
        
    return (
        <div>
            <IconButton type="primary" onClick = {handleDownload}> <DownloadIcon /> </IconButton>
        </div>
    )
}