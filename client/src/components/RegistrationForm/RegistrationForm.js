import React, { useState } from "react";
import "./RegistrationForm.css";
import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from "../../constants/apiConstants";
import API from "../../utils/API";

function RegistrationForm(props) {
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
  const handleChange = (e) => {
    const { id } = e.target;
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const redirectToHome = () => {
    props.updateTitle("Home");
    props.history.push("/home");
  };

  const createNewFamily = () => {
    const familyName = state.familyDetail;
    let familyID;
    API.family.create(familyName)
      .then((response) => {
        if (response.status === 200) {
          familyID = response._id; // eslint-disable-line no-underscore-dangle
        } else {
          props.showError("Error occurred during family creation.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    const payload = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      password: state.password,
    };
    // TODO: Must get family id first - then create user at POST "/api/v1/user/family/:(family)id"
    API.users.create(payload, { params: familyID })
      .then((response) => {
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            successMessage: "Registration successful. Redirecting to home page..",
          }));
          // TODO: is localStorage the best place to store the JWT? Maybe for now.
          localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
          redirectToHome();
          props.showError(null);
        } else {
          props.showError("Some error ocurred");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const joinExistingFamily = () => {
    const roomCode = state.familyDetail;
    let familyID;
    API.family.findIdByCode(roomCode)
      .then((response) => {
        if (response.status === 200) {
          familyID = response._id; // eslint-disable-line no-underscore-dangle
        } else {
          props.showError("No Family Found with that Code.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    const payload = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      password: state.password,
      family: familyID,
    };
    API.users.create(payload, { params: familyID })
      .then((response) => {
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            successMessage: "Registration successful. Redirecting to home page..",
          }));
          // TODO: is localStorage the best place to store the JWT? Maybe for now.
          localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
          redirectToHome();
          props.showError(null);
        } else {
          props.showError("Some error ocurred");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const sendDetailsToServer = () => {
    if (
      state.firstName.length
      && state.lastName.length
      && state.email.length
      && state.password.length
      && state.familyDetail.length) {
      props.showError(null);
      if (state.newFamily === true) {
        createNewFamily();
      } else if (state.newFamily === false) {
        joinExistingFamily();
      } else {
        props.showError("Please fill out all form fields");
      }
    }
  };
  const redirectToLogin = () => {
    props.updateTitle("Login");
    props.history.push("/login");
  };
  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (state.password === state.confirmPassword) {
      sendDetailsToServer();
    } else {
      props.showError("Passwords do not match");
    }
  };
  return (
    <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
      <form>
        <div className="form-group text-left">
          <label htmlFor="newFamily">
            First Name
            <input
              type="checkbox"
              className="form-control"
              id="newFamily"
              checked={state.newFamily}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group text-left">
          <label htmlFor="firstName">
            First Name
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="First Name"
              value={state.firstName}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group text-left">
          <label htmlFor="lastName">
            Last Name
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Last Name"
              value={state.lastName}
              onChange={handleChange}
            />
          </label>
        </div>
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
          <small id="emailHelp" className="form-text text-muted">We&apos;ll never share your email with anyone else.</small>
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
        <div className="form-group text-left">
          <label htmlFor="confirmPassword">
            Confirm Password
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={state.confirmPassword}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group text-left">
          <label htmlFor="familyDetail">
            {state.newFamily ? "Family Name" : "Family Code"}
            <input
              type="text"
              className="form-control"
              id="familyDetail"
              placeholder={state.newFamily ? "Family Name" : "Family Code"}
              value={state.familyDetail}
              onChange={handleChange}
            />
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-dark"
          onClick={handleSubmitClick}
        >
          Register
        </button>
      </form>
      <div className="alert alert-success mt-2" style={{ display: state.successMessage ? "block" : "none" }} role="alert">
        {state.successMessage}
      </div>
      <div className="mt-2">
        <span>Already have an account? </span>
        <span className="loginText" onClick={() => redirectToLogin()}>Login here</span> {/* eslint-disable-line */}
      </div>

    </div>
  );
}

export default withRouter(RegistrationForm);
