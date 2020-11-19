import React from "react";
import { withRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Header from "../components/Header/Header";

// AUTHENTICATION NOTES
// Wrap providers around MAIN app.
// Logic for determining "is user logged in?" should all be in the auth context provider.
// React Router ((user) ? Logged-in Routes : Logged-out Routes)
function Games() {
  return (
    <Container>
      <Row>
        <Header />
      </Row>
    </Container>
  );
}

export default withRouter(Games);
