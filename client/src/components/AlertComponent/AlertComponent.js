// PROBLEM! THIS FILE WAS OVERWRITTEN WITH HEADER.JS

// That means there is no AlertComponent.

// TODO: Recover AlertComponent, or remake.

import React from "react";
import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from "../../constants/apiConstants";

function AlertComponent({ location, title }, props) {
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  let appTitle = capitalize(location.pathname.substring(1, location.pathname.length));
  if (location.pathname === "/") {
    appTitle = "Welcome";
  }
  function handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN_NAME);
    props.history.push("/login");
  }
  function renderLogout() { // eslint-disable-line consistent-return
    if (location.pathname === "/home") {
      return (
        <div className="ml-auto">
          <button className="btn btn-danger" type="button" onClick={() => handleLogout()}>Logout</button>
        </div>
      );
    }
  }

  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="row col-12 d-flex justify-content-center text-white">
        <span className="h3">{title || appTitle}</span>
        {renderLogout()}
      </div>
    </nav>
  );
}
export default withRouter(AlertComponent);
