import React from "react";
import FileSaver from "file-saver";
import localAxios from '../api/Axios';
import { Button } from "antd";
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';

export default function DownloadButton({documentId, title}) {
    const handleDownload = async () => {
        try {
            const response = await localAxios({
                url: `/api/fileRouter/downloadword/${documentId}`,
                method: 'GET',
                responseType: "blob",
            })
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
            FileSaver.saveAs(blob, `${title}.docx`);
        } catch (error) {
            alert('File download error');
        }
    }
        
    return (
        <div>
            <IconButton type="primary" onClick = {handleDownload}> <DownloadIcon /> </IconButton>
        </div>
    )
}