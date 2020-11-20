import React, { useState, useEffect } from "react";
import { Alert, Button } from "react-bootstrap";
import "./AlertComponent.css";

function AlertComponent(props) {
  // Define error message and update state function passed in for easy access
  const { errorMessage, hideError } = props;
  const [modalDisplay, toggleDisplay] = useState("none");
  const openModal = () => {
    toggleDisplay("block");
  };
  const closeModal = () => {
    toggleDisplay("none");
    hideError(null);
  };
  useEffect(() => {
    if (errorMessage !== null) {
      openModal();
    } else {
      closeModal();
    }
  });
  return (
    <Alert
      variant="danger"
      className="alert-dismissable mt-4"
      role="alert"
      id="alertPopUp"
      style={{ display: modalDisplay }}
    >
      <div className="d-flex alertMessage">
        <span>{errorMessage}</span>
        <Button type="button" className="close" aria-label="Close" onClick={() => closeModal()}>
          <span aria-hidden="true">&times;</span>
        </Button>
      </div>
    </Alert>
  );
}
export default AlertComponent;
