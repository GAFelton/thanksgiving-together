import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useHistory, withRouter } from "react-router-dom";
import { useAuth } from "../AuthContext";
import UserSettingsComponent from "../UserSettingsComponent";

function Header() {
  // The history hook gives this component access to the full history object w/out relying on props.
  const history = useHistory();
  const { user, handleLogout } = useAuth();

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

  // To Do: update links and make sure they route to pages
  return (
    <div>
      {user
        ? (
          <Navbar collapseOnSelect fixed="sticky" expand="lg" bg="warning" variant="light">
            <Navbar.Brand href="/">Thanksgiving Together</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href="/how-to">How-to</Nav.Link>
                <Nav.Link href="/games">Games</Nav.Link>
                <Nav.Link href="/recipes">Recipes</Nav.Link>
                <UserSettingsComponent />
              </Nav>
            </Navbar.Collapse>
            {renderLogout()}
          </Navbar>
        ) : (
          <Navbar collapseOnSelect fixed="sticky" expand="lg" bg="warning" variant="light">
            <Navbar.Brand href="/about">Thanksgiving Together</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href="/how-to">How-to</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        )}
    </div>
  );
}

export default withRouter(Header);
