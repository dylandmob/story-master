import React from 'react';
import { Button, Modal, ModalBody, ModalHeader } from 'shards-react';

const ConfirmModal = ({ open, onClose, onConfirm, header, body }) => {
  return (
    <Modal open={open} hideModal={onClose}>
      <ModalHeader>{header}</ModalHeader>
      <ModalBody>{body}</ModalBody>
      <div
        style={{
          display: 'flex',
          width: '100%',
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
