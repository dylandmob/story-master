import React from 'react';
import { Button, Modal, ModalBody, ModalHeader } from 'shards-react';

const ConfirmModal = ({ open, onClose, onConfirm, header, body, children }) => {
  return (
    <Modal open={open} hideModal={onClose}>
      <ModalHeader>{header}</ModalHeader>
      <ModalBody>{body}</ModalBody>
      {children}
      <div
        style={{
          display: 'flex',
          width: '100%',
          paddingBottom: '20px',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          theme="danger"
          onClick={onClose}
          style={{ marginRight: '20px' }}
        >
          No
        </Button>
        <Button
          theme="success"
          onClick={onConfirm}
          style={{ marginRight: '20px' }}
        >
          Yes
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
