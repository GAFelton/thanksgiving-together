import React from "react";
import "./zoomControlStyle.css";

// All credit for this react refactoring of Zoom's testing bar goes to https://github.com/shawnscoding
// My only contributions are comments and several additional fields.
// In non mvp, my hope is to reduce/rework this to a single button that pulls information from db:
// name (and email?) from the joining user, and zoom id/password from the family admin
//   -assuming smoother integration can't be found

// This fn defines the modal; takes fns and the meetingConfig object as props from parent Zoom.js
const ZoomControl = ({ handleSubmit, config, handleChange }) => {
  // Accesses the relevant properties of the meeting configuration through a template literal
  const { userName, userEmail } = config;
  return (
    <>
      <div className="custom-zn__container">
        <div className="custom-zm__modal">
          <div className="custom-zm__title__box">
            <h1 className="custom-zm__title">Welcome to Zoom</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <label className="custom-zm__modal__label" htmlFor="userName">
              User Name (required*)
              <input
                type="text"
                value={userName}
                className="custom-zm__modal__input"
                onChange={handleChange}
                id="userName"
                placeholder="User Name"
              />
            </label>
            <label className="custom-zm__modal__label" htmlFor="userEmail">
              Email (optional)
              <input
                type="email"
                value={userEmail}
                className="custom-zm__modal__input"
                onChange={handleChange}
                id="userEmail"
                placeholder="Email"
              />
            </label>
            <div className="custom-zm__btn__box">
              <button className="custom-zm__btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default ZoomControl;
