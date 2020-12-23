import React, { useState } from "react";
import {
  Button, Modal, Form, Row, Col,
} from "react-bootstrap";
import { ACCESS_TOKEN_NAME } from "../../constants/apiConstants";
import API from "../../utils/API";
import { useAuth } from "../../contexts/AuthContext";
import InviteButton from "../InviteButton";

// This component shows a button where it is placed. When clicked, it opens a modal.
// The modal should contain user settings fields, meant to update db records.
// This is also primarily where the familyAdmin inputs their Zoom details.
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

  // handleClose resets the input fields and closes the modal.
  const handleClose = () => {
    setShow(false);
    setState({
      firstName: "",
      lastName: "",
      zoomId: "",
      pwd: "",
    });
  };
  // handleShow opens the modal.
  const handleShow = () => setShow(true);

  // isEmpty is a helper function to determine if an object has no elements.
  const isEmpty = (obj) => { // eslint-disable-line consistent-return
    if (Object.getOwnPropertyNames(obj).length === 0) return true;
  };

  // handleSave is the main function of the component:
  // It updates user info or family info depending on what is entered.
  const handleSave = () => {
    // Get userID and familyID values from the user object from Auth Context.
    const {
      id,
      family,
    } = user;
    const storedJWT = localStorage.getItem(ACCESS_TOKEN_NAME);
    // Setting up empty objects to accept user input.
    const userInfo = {};
    const familyInfo = { zoomInfo: {} };
    // User input is only added to objects if it exists.
    // This stops empty values from being saved to the database.
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
    // If the userInfo object is not empty, we update the database user document.
    // Update is a protected route, so we need to send our JWT to validate the user.
    if (!isEmpty(userInfo)) {
      API.users.update(
        { headers: { token: storedJWT } },
        userInfo,
        id,
      )
        .catch((err) => console.log(err));
    }
    // If the familyInfo.zoomInfo object is not empty, we update the database family document.
    // Update is a protected route, so we need to send our JWT to validate the user.
    if (!isEmpty(familyInfo.zoomInfo)) {
      API.family.update(
        { headers: { token: storedJWT } },
        familyInfo,
        family,
      )
        .catch((err) => console.log(err));
    }
    // handleLogin is an auth Context function that pulls up-to-date info from the database.
    handleLogin(storedJWT);
    handleClose();
  };

  return (

    <>
      {/* This is the button used to open the modal. */}
      <Button variant="primary" onClick={handleShow}>
        User Settings
      </Button>

      {/* This is the User settings form on the modal. */}
      <Modal className="pageModal" show={show} onHide={handleClose}>
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
            </Form>
          </div>
          <Modal.Header>
            <Modal.Title>Invite Family Members</Modal.Title>
          </Modal.Header>
          <Row>
            <Col className="text-center">
              <InviteButton />
            </Col>
          </Row>
        </Modal.Body>
        {/* The handleSave function only runs when "Save Changes" is clicked. */}
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
