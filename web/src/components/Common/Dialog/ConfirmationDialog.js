import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ConfirmationDialog = ({ show, onConfirm, onCancel, title, message }) => {
  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        { 
            onCancel ?
            <Button variant="secondary" onClick={onCancel}>
                Cancel
            </Button> : <></>
        }
        <Button variant="primary" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationDialog;
