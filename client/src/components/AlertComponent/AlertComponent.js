import React, { useState, useEffect } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import "./AlertComponent.css";

function AlertComponent(props) {
  // Define error message and update state function passed in for easy access
  const { errorMessage, hideError } = props;
  // const [modalDisplay, toggleDisplay] = useState("none");
  const [show, setShow] = useState(false);
  const openModal = () => {
    setShow(true);
  };
  const closeModal = () => {
    setShow(false);
    hideError(null);
  };
  // const openModal = () => {
  //   toggleDisplay("block");
  // };
  // const closeModal = () => {
  //   toggleDisplay("none");
  //   hideError(null);
  // };
  useEffect(() => {
    if (errorMessage !== null) {
      openModal();
    } else {
      closeModal();
    }
  });
  return (
    <Modal size="sm" show={show} onHide={closeModal} centered dialogClassName="error-message-modal">
      <Alert
        variant="danger"
        className="alert-dismissable mt-4"
        role="alert"
        id="alertPopUp"
        style={{ display: show }}
      >
        <div className="d-flex alertMessage">
          <span>{errorMessage}</span>
          <Button type="button" className="close" aria-label="Close Error Message" onClick={() => closeModal()}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </div>
      </Alert>
    </Modal>
  );
}
export default AlertComponent;
