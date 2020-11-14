import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";
import { withRouter } from "react-router-dom";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from "../../constants/apiConstants";

function LoginForm(props) {
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

  const redirectToHome = () => {
    props.updateTitle("Home");
    props.history.push("/home");
  };
  const redirectToRegister = () => {
    props.history.push("/register");
    props.updateTitle("Register");
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload = {
      email: state.email,
      password: state.password,
    };
    axios.post(`${API_BASE_URL}/user/login`, payload)
      .then((response) => {
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            successMessage: "Login successful. Redirecting to home page..",
          }));
          localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
          redirectToHome();
          props.showError(null);
        } else if (response.code === 204) {
          props.showError("Username and password do not match");
        } else {
          props.showError("Username does not exists");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
