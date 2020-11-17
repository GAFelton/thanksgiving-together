import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from "../../constants/apiConstants";

function Header({ location, title }) {
  const history = useHistory();
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  let appTitle = capitalize(location.pathname.substring(1, location.pathname.length));
  if (location.pathname === "/") {
    appTitle = "Thanksgiving Together";
  }
  function handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN_NAME);
    history.push("/login");
  }
  // TODO: location.pathname will likely be more things than /home for protected routes.
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
    <nav className="navbar navbar- bg-dark">
      <div className="row col-12 d-flex justify-content-center text-white">
        <span className="h3">{title || appTitle}</span>
        {renderLogout()}
      </div>
    </nav>
  );
}
export default withRouter(Header);
