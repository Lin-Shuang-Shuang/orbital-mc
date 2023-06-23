import React from "react";
import FileSaver from "file-saver";
import localAxios from '../api/Axios';

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
            <button onClick = {handleDownload}> Download </button>
        </div>
    )
}