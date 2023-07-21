import React, { useState } from "react";
import { Button, Modal, message } from "antd";
import localAxios from '../api/Axios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


export default function DeleteLatexButton({ documentId }) {
  const [visible, setVisible] = useState(false);

  const handleDelete = async () => {
    try {

      localAxios.post(`/api/LaTexRouter/deleteLatex/${documentId}`).then(
      setVisible(false),
      console.log("hey"),
      message.success("Document deleted successfully"),
      window.location.reload(),
      );

    } catch (error) {
      message.error("Failed to delete document");
    }
  };

  return (
    <>
      <IconButton type="primary" danger onClick={() => setVisible(true)}>
        <DeleteIcon />
      </IconButton>
      <Modal
        title="Delete Document"
        visible={visible}
        onOk={handleDelete}
        onCancel={() => setVisible(false)}
      >
        <p>Are you sure you want to delete this document?</p>
      </Modal>
    </>
  );
}