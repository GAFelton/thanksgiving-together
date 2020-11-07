import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Nav from "./components/Nav";
import Zoom from "./pages/Zoom";
import DiscussTopicBtn from "./components/DiscussTopicBtn";

// AUTHENTICATION NOTES
// Wrap providers around MAIN app.
// Logic for determining "is user logged in?" should all be in the auth context provider.
// React Router ((user) ? Logged-in Routes : Logged-out Routes)
function App() {
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
    </Container>
  );
}

export default App;
