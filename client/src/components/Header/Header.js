import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Header({ location, title }) {
  // The history hook gives this component access to the full history object w/out relying on props.
  const history = useHistory();
  const { user, handleLogout } = useAuth();

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  let appTitle = capitalize(location.pathname.substring(1, location.pathname.length));
  if (user) {
    appTitle = "Thanksgiving Together";
  }

  function onLogout() {
    handleLogout();
    history.push("/login");
  }

  function renderLogout() { // eslint-disable-line consistent-return
    if (user) {
      return (
        <div className="ml-auto">
          <button className="btn btn-danger" type="button" onClick={() => onLogout()}>Logout</button>
        </div>
      );
    }
  }

  return (
    <nav className="navbar navbar- bg-dark">
      <div className="row col-12 d-flex justify-content-center text-white">
        <span className="h3">{title || appTitle}</span>
        {renderLogout()}
      </div>
    </nav>
  );
}
export default withRouter(Header);
