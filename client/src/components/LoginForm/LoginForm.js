import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Alert, Button, Card, Col, Form, Row,
} from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import API from "../../utils/API";

// The Login Form is for users who already have an account.
function LoginForm({ showError }) {
  const { handleLogin } = useAuth();

  const [state, setState] = useState({
    email: "",
    password: "",
    successMessage: null,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const loginUser = () => {
    const payload = {
      email: state.email,
      password: state.password,
    };
    // This route compares the password against its hash stored in the database.
    API.users.comparePassword(payload)
      .then((response) => {
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            successMessage: "Login successful. Redirecting to main page..",
          }));
          handleLogin(response.data.token);
          showError(null);
        }
      })
      .catch((error) => {
        showError("Login Unsuccessful.");
        console.log(error);
      });
  };

  // The click handler directly invokes our API call - to verify the user's password.
  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (state.email.length && state.password.length) {
      loginUser();
    } else {
      showError("Please enter both email and password.");
    }
  };

  // Rendering the Login Form.
  return (
    <Row>
      <Col> </Col>
      <Col xs={12} sm={6} lg={4}>
        <Card className="login-card mt-2 p-2 hv-center">
          <Form>
            <Form.Group controlId="email" className="text-left">
              <Form.Label>Email Address</Form.Label>
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
            <Button
              type="submit"
              className="btn btn-dark"
              onClick={handleSubmitClick}
            >
              Submit
            </Button>
          </Form>
          <Alert variant="success" className="mt-2" style={{ display: state.successMessage ? "block" : "none" }} role="alert">
            {state.successMessage}
          </Alert>
          <div className="mt-2">
            <span>Need an account? </span>
            <Link className="registerText" to="/register">Register</Link>
          </div>
        </Card>
      </Col>
      <Col> </Col>
    </Row>
  );
}

export default withRouter(LoginForm);
