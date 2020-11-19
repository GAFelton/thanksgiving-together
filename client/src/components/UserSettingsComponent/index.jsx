import React, { useState } from "react";
import {
  Button, Modal, Form, Row, Col,
} from "react-bootstrap";
import { ACCESS_TOKEN_NAME } from "../../constants/apiConstants";
import API from "../../utils/API";
import { useAuth } from "../AuthContext";

function UserSettingsComponent() {
  const { user, handleLogin } = useAuth();
  const [show, setShow] = useState(false);
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    id: "",
    pwd: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = () => {
    const {
      id,
      family,
    } = user;
    const storedJWT = localStorage.getItem(ACCESS_TOKEN_NAME);
    // TODO: update user & family in DB.
    if (state.firstName.length && state.lastName.length) {
      API.users.update(
        { headers: { token: storedJWT } },
        { firtName: state.firstName.trim(), lastName: state.lastName.trim() },
        id,
      ).then(
        (response) => { console.log(response); },
      );
    }
    if (state.id.length && state.pwd.length) {
      API.family.update(
        { headers: { token: storedJWT } },
        { zoomInfo: { id: state.id.trim(), pwd: state.pwd.trim() } },
        family,
      ).then(
        (response) => { console.log(response); },
      );
    }
    handleLogin(storedJWT);
    handleClose();
  };

  return (

    <>
      <Button variant="primary" onClick={handleShow}>
        User Settings
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adjust User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form>
              <Row>
                <Col>
                  <Form.Group controlId="formGroupfirstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="input" onChange={handleChange} value={state.firstName} placeholder="Enter First name" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formGrouplastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="input" onChange={handleChange} value={state.lastName} placeholder="Enter Last Name" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formZoomID">
                    <Form.Label>Zoom Meeting ID</Form.Label>
                    <Form.Control type="input" onChange={handleChange} value={state.id} placeholder="Enter Zoom Meeting Id" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formZoomPWD">
                    <Form.Label>Zoom Meeting Passcode</Form.Label>
                    <Form.Control type="input" onChange={handleChange} value={state.pwd} placeholder="Enter Zoom Meeting Passcode" />
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
