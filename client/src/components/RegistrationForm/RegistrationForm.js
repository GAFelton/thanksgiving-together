import React, { useState } from "react";
import "./RegistrationForm.css";
import { withRouter } from "react-router-dom";
import API from "../../utils/API";
import { useAuth } from "../AuthContext";

// The registration form allows users to sign up for a new account.
// It has functions for both creating a new family and for joining an existing one.
function RegistrationForm(props) {
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
          } else {
            props.showError("Error occurred during family creation.");
          }
          return familyID;
        })
        .catch((error) => {
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
              props.showError(null);
            } else {
              props.showError("Some error ocurred");
            }
          })
          .catch((error) => {
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
          props.showError("No Family Found with that Code.");
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
              props.showError(null);
            } else {
              props.showError("Some error occurred");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        props.showError("No Family Found with that Code.");
      }
    } catch (err) {
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
  // redirectToLogin handles the Login button at the end of the form.
  const redirectToLogin = () => {
    props.updateTitle("Login");
    props.history.push("/login");
  };
  // When the user submits the registration form, this function checks for password match.
  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (state.password === state.confirmPassword) {
      sendDetailsToServer();
    } else {
      props.showError("Passwords do not match");
    }
  };
  // Rendering the Registration form.
  // TODO: This kind of heavy copy-paste could use some conditional logic to render it.
  return (
    <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
      <form>
        <div className="form-group text-left">
          <label htmlFor="newFamily">
            Create New Family?
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
