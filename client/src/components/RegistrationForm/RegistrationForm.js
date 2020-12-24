import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Alert, Button, Card, Col, Form, Row,
} from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import API from "../../utils/API";

// The registration form allows users to sign up for a new account.
// It has functions for both creating a new family and for joining an existing one.
function RegistrationForm({ match, showError }) {
  // These state parameters are mostly straightforward.
  // familyDetail refers to either a room code or a family Name, depending on the newFamily boolean.
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    newFamily: false,
    familyDetail: "",
    successMessage: null,
  });

  // useEffect extracts invite code as soon as the page is loaded.
  React.useEffect(() => {
    if (match.params.invitecode) {
      setState((prevState) => ({
        ...prevState,
        newFamily: false,
        familyDetail: match.params.invitecode,
      }));
    }
  }, []);

  const { handleLogin } = useAuth();
  // Handles state updates, accounts for either text input or the checkbox.
  const handleChange = (e) => {
    const { id } = e.target;
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // createNewFamily handles first-time family and user creation.
  const createNewFamily = async () => {
    try {
      const familyName = state.familyDetail.trim();
      let familyID;
      // First the family is created, which will give us back the family _id so we can add members.
      await API.family.create({ title: familyName })
        .then((response) => {
          if (response.status === 200) {
            familyID = response.data._id; // eslint-disable-line no-underscore-dangle
          }
          return familyID;
        })
        .catch((error) => {
          showError("Error occurred during family creation.");
          console.log(error);
        });
      if (familyID) {
        console.log(`New Family Created with id: ${familyID}`);
        // The payload for user creation also sets this family creator as the familyAdmin.
        const payload = {
          firstName: state.firstName.trim(),
          lastName: state.lastName.trim(),
          email: state.email.trim(),
          password: state.password,
          family: familyID,
          familyAdmin: true,
        };
        // Next, a new user is created.
        API.users.create(payload)
          .then((response) => {
            if (response.status === 200) {
              setState((prevState) => ({
                ...prevState,
                successMessage: "Registration successful. Redirecting to main page..",
              }));
              // After successful user creation, new user is logged-in via a JWT, and redirected.
              handleLogin(response.data.token);
              showError(null);
            } else if (response.status === 400) {
              showError(`User already exists, Family Created, join with ID ${familyID}.`);
            }
          })
          .catch((error) => {
            showError("Some error ocurred");
            console.log(error);
          });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // joinExistingFamily handles new user creation, where a family already exists.
  const joinExistingFamily = async () => {
    try {
      const code = state.familyDetail.trim();
      const data = {
        roomCode: code,
      };
      let familyID;
      // First, we find the family ID via a length 8 "room code."
      // This UUID room code makes it easier for family members to be invited.
      await API.family.findIdByCode(data)
        .then((response) => {
          console.log(response);
          if ((response.status === 200) && (response.data !== null)) {
            familyID = response.data._id; // eslint-disable-line no-underscore-dangle
          }
        })
        .catch((error) => {
          console.log(error);
          showError("No Family Found with that Code.");
        });
      if (familyID) {
        // The payload does not include familyAdmin, which defaults to false.
        const payload = {
          firstName: state.firstName.trim(),
          lastName: state.lastName.trim(),
          email: state.email.trim(),
          password: state.password,
          family: familyID,
        };

        // After the id has been gathered and the payload sanitized, the new user is created.
        await API.users.create(payload)
          .then((response) => {
            if (response.status === 200) {
              setState((prevState) => ({
                ...prevState,
                successMessage: "Registration successful. Redirecting to main page..",
              }));
              // After successful user creation, new user is logged-in via a JWT, and redirected.
              handleLogin(response.data.token);
              showError(null);
            } else if (response.status === 400) {
              showError("User already exists.");
            }
          })
          .catch((error) => {
            showError("Some error occurred");
            console.log(error);
          });
      } else {
        showError("No Family Found with that Code.");
      }
    } catch (err) {
      showError("Some error occurred");
      console.error(err);
    }
  };

  // This function makes sure that all form fields have been filled out before submission
  // via the correct function (createNewFamily or joinExistingFamily).
  const sendDetailsToServer = () => {
    if (
      state.firstName.length
      && state.lastName.length
      && state.email.length
      && state.password.length
      && state.familyDetail.length) {
      showError(null);
      if (state.newFamily === true) {
        createNewFamily();
      } else if (state.newFamily === false) {
        joinExistingFamily();
      }
    } else {
      showError("Please fill out all form fields");
    }
  };

  // When the user submits the registration form, this function checks for password match.
  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (state.password === state.confirmPassword && state.password.length >= 6) {
      sendDetailsToServer();
    } else if (state.password !== state.confirmPassword) {
      showError("Passwords do not match");
    } else if (state.password.length < 6) {
      showError("Password is not long enough (minimum 6 characters)");
    }
  };
  // Rendering the Registration form.
  // TODO: This kind of heavy copy-paste could use some conditional logic to render it.
  return (
    <Row>
      <Col> </Col>
      <Col xs={12} sm={6} lg={4}>
        <Card className="login-card mt-2 p-2 hv-center">
          <Form>
            <Form.Group controlId="firstName" className="text-left">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                value={state.firstName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="lastName" className="text-left">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                value={state.lastName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="email" className="text-left">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={state.email}
                onChange={handleChange}
              />
              <Form.Text id="emailHelp" className="text-muted">We&apos;ll never share your email with anyone else.</Form.Text>
            </Form.Group>
            <Form.Group controlId="password" className="text-left">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={state.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword" className="text-left">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={state.confirmPassword}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="newFamily" className="text-left">
              <Form.Check
                type="checkbox"
                checked={state.newFamily}
                onChange={handleChange}
                label="Create New Family?"
              />
            </Form.Group>
            <Form.Group controlId="familyDetail" className="text-left">
              <Form.Label>{state.newFamily ? "Family Name" : "Family Code"}</Form.Label>
              <Form.Control
                type="text"
                placeholder={state.newFamily ? "Family Name" : "Family Code"}
                value={state.familyDetail}
                onChange={handleChange}
              />
            </Form.Group>
            <Button
              type="submit"
              className="btn"
              onClick={handleSubmitClick}
            >
              Register
            </Button>
          </Form>
          <Alert variant="success" className="mt-2" style={{ display: state.successMessage ? "block" : "none" }} role="alert">
            {state.successMessage}
          </Alert>
          <div className="mt-2">
            <span>Already have an account? </span>
            <Link className="loginText" to="/login">Login Here</Link>
          </div>
        </Card>
      </Col>
      <Col> </Col>
    </Row>
  );
}

export default withRouter(RegistrationForm);
