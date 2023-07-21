import React from "react";
import { useState } from "react";
import { Button, Modal, Input, message } from "antd";
import localAxios from '../api/Axios';
import IosShareIcon from '@mui/icons-material/IosShare';
import IconButton from '@mui/material/IconButton';

export default function ShareLatexButton({documentId}) {
    const [visible, setVisible] = useState(false);
    const [username, setUsername] = useState("");

    const handleShare = async () => {
        try {
            await localAxios.post("/api/LaTexRouter/shareLatex", {documentId, userToShareWith: username}).then(
            setUsername(""),
            setVisible(false),
            )
        } catch (error) {
            message.error("Failed to share document");
        }
    }

    return (
    <>
      <IconButton type="primary" onClick={() => setVisible(true)}>
        <IosShareIcon />
      </IconButton>
      <Modal
        title="Share Document"
        visible={visible}
        onOk={handleShare}
        onCancel={() => setVisible(false)}
      >
        <Input
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Modal>
    </>
    )

}