import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useHistory, withRouter } from "react-router-dom";
import RecipesPage from "../../pages/Recipes";
import { useAuth } from "../../contexts/AuthContext";
import Games from "../Games";
import About from "../About";
import How from "../How";
import ModalComponent from "../ModalComponent";
import UserSettingsComponent from "../UserSettingsComponent";

function Header({ showError }) {
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
          <button className="btn btn-secondary" type="button" onClick={() => onLogout()}>Logout</button>
        </div>
      );
    }
  }

  return (
    <div className="mb-4">
      {user
        ? (
          // This is the PrivateRoute Navbar - It displays only for logged-in users.
          <Navbar collapseOnSelect fixed="sticky" expand="lg" className="headerBackground headerText">
            <Navbar.Brand href="/">Thanksgiving Together</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                {/* Private Nav components are modals so Zoom call is never navigated away from. */}
                <ModalComponent title="About">
                  <About />
                </ModalComponent>
                <ModalComponent title="How-to">
                  <How />
                </ModalComponent>
                <ModalComponent title="Games">
                  <Games />
                </ModalComponent>
                <ModalComponent title="Recipes">
                  <RecipesPage showError={showError} />
                </ModalComponent>
                <UserSettingsComponent />
              </Nav>
            </Navbar.Collapse>
            {renderLogout()}
          </Navbar>
        ) : (
          // This is the PublicRoute Navbar - It displays only for non-logged users
          <Navbar collapseOnSelect fixed="sticky" expand="lg" className="headerBackground headerText">
            <Navbar.Brand href="/">Thanksgiving Together</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <ModalComponent title="About">
                  <About />
                </ModalComponent>
                <ModalComponent title="How-to">
                  <How />
                </ModalComponent>
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
