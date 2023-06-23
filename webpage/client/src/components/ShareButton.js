import React from "react";
import { useState } from "react";
import { Button, Modal, Input, message } from "antd";
import localAxios from '../api/Axios';

export default function ShareButton({documentId}) {
    const [visible, setVisible] = useState(false);
    const [username, setUsername] = useState("");

    const handleShare = async () => {
        try {
            await localAxios.post("/api/fileRouter//shareFile", {documentId, userToShareWith: username});
            setUsername("");
            setVisible(false);
        } catch (error) {
            message.error("Failed to share document");
        }
    }

    return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Share
      </Button>
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