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
    zoomId: "",
    pwd: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleClose = () => {
    setShow(false);
    setState({
      firstName: "",
      lastName: "",
      zoomId: "",
      pwd: "",
    });
  };
  const handleShow = () => setShow(true);

  const isEmpty = (obj) => { // eslint-disable-line consistent-return
    if (Object.getOwnPropertyNames(obj).length === 0) return true;
  };

  const handleSave = () => {
    const {
      id,
      family,
    } = user;
    const storedJWT = localStorage.getItem(ACCESS_TOKEN_NAME);
    const userInfo = {};
    const familyInfo = { zoomInfo: {} };
    if (state.firstName.length) {
      userInfo.firstName = state.firstName.trim();
    }
    if (state.lastName.length) {
      userInfo.lastName = state.lastName.trim();
    }
    if (state.zoomId.length) {
      familyInfo.zoomInfo.id = parseInt(state.zoomId.trim(), 10);
    }
    if (state.pwd.length) {
      familyInfo.zoomInfo.pwd = state.pwd.trim();
    }
    // TODO: update user & family in DB.
    if (!isEmpty(userInfo)) {
      API.users.update(
        { headers: { token: storedJWT } },
        userInfo,
        id,
      )
        .catch((err) => console.log(err));
    }
    if (!isEmpty(familyInfo.zoomInfo)) {
      API.family.update(
        { headers: { token: storedJWT } },
        familyInfo,
        family,
      )
        .catch((err) => console.log(err));
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
                  <Form.Group controlId="firstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="input" onChange={handleChange} value={state.firstName} placeholder="Enter First name" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="lastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="input" onChange={handleChange} value={state.lastName} placeholder="Enter Last Name" />
                  </Form.Group>
                </Col>
              </Row>
              <Modal.Header>
                <Modal.Title>Adjust Family Details</Modal.Title>
              </Modal.Header>
              <Row>
                <Col>
                  <Form.Group controlId="zoomId">
                    <Form.Label>Zoom Meeting ID</Form.Label>
                    <Form.Control type="input" onChange={handleChange} value={state.zoomId} placeholder="Enter Zoom Meeting Id" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="pwd">
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
