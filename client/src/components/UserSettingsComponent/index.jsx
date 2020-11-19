import React, { useState } from "react";
import {
  Button, Modal, Form, Row, Col,
} from "react-bootstrap";
import { useAuth } from "../AuthContext";

function UserSettingsComponent() {
  const { user } = useAuth();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = () => {
    // TODO: update user & family in DB.
    // TODO: Overwrite userContext.
    handleClose();
  };

  return (

    <>
      <Button variant="primary" onClick={handleShow}>
        User Settings
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adjust Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group controlId="formZoomID">
                    <Form.Label>Zoom Meeting ID</Form.Label>
                    <Form.Control type="input" placeholder="Enter Zoom Meeting Id" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formZoomPWD">
                    <Form.Label>Zoom Meeting Passcode</Form.Label>
                    <Form.Control type="input" placeholder="Enter Zoom Meeting Passcode" />
                  </Form.Group>
                </Col>
              </Row>
              {/* <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group> */}
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  );
}

export default UserSettingsComponent;
