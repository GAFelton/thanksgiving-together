import React, { useState } from "react";
import {
  Button, Modal, Nav,
} from "react-bootstrap";

// This component shows a button where it is placed. When clicked, it opens a modal.

function ModalComponent({ title, children }) {
  const [show, setShow] = useState(false);

  // handleClose closes the modal.
  const handleClose = () => setShow(false);
  // handleShow opens the modal.
  const handleShow = () => setShow(true);

  return (
    <>
      {/* This is the button used to open the modal. */}
      <Nav.Link onClick={handleShow}>
        {title}
      </Nav.Link>

      <Modal show={show} onHide={handleClose} className="pageModal" dialogClassName="appModal">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default ModalComponent;
