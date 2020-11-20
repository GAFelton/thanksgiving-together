import React, { useState } from "react";
import "./LoginForm.css";
import { withRouter } from "react-router-dom";
import { useAuth } from "../AuthContext";
import API from "../../utils/API";

// The Login Form is for users who already have an account.
function LoginForm(props) {
  // Define error handler fn for reference
  const { showError } = props;
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

  // If a user wants to register a new account, this function redirects them.
  const redirectToRegister = () => {
    props.history.push("/register");
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
    <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
      <form>
        <div className="form-group text-left">
          <label htmlFor="email">
            Email address
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={state.email}
              onChange={handleChange}
            />
          </label>
          <small id="emailHelp" className="form-text text-muted">We will never share your email with anyone else.</small>
        </div>
        <div className="form-group text-left">
          <label htmlFor="password">
            Password
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={state.password}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-check" />
        <button
          type="submit"
          className="btn btn-dark"
          onClick={handleSubmitClick}
        >
          Submit
        </button>
      </form>
      <div className="alert alert-success mt-2" style={{ display: state.successMessage ? "block" : "none" }} role="alert">
        {state.successMessage}
      </div>
      <div className="registerMessage">
        {/* eslint-disable-next-line  */}
        <span className="loginText" role="button" onClick={() => redirectToRegister()}>Register</span>
      </div>
    </div>
  );
}

export default withRouter(LoginForm);
