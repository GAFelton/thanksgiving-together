import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Nav from "../components/Nav";
import Zoom from "./Zoom";
import DiscussTopicBtn from "../components/DiscussTopicBtn";
import Spotify from "../components/Spotify";

// AUTHENTICATION NOTES
// Wrap providers around MAIN app.
// Logic for determining "is user logged in?" should all be in the auth context provider.
// React Router ((user) ? Logged-in Routes : Logged-out Routes)
function Main() {
  return (
    <Container>
      <Row>
        <Nav />
      </Row>
      <Row>
        <Zoom />
      </Row>
      <Row>
        <DiscussTopicBtn />
      </Row>
      <Row>
        <Spotify />
      </Row>
    </Container>
  );
}

export default Main;
