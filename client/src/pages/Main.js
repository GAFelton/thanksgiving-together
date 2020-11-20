import React from "react";
import { withRouter } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Zoom from "../components/Zoom";
import DiscussTopicBtn from "../components/DiscussTopicBtn";
import Spotify from "../components/Spotify";

// AUTHENTICATION NOTES
// Wrap providers around MAIN app.
// Logic for determining "is user logged in?" should all be in the auth context provider.
// React Router ((user) ? Logged-in Routes : Logged-out Routes)
function Main() {
  return (
    <Row>
      <DiscussTopicBtn />
      <Zoom />
      <Spotify />
    </Row>
  );
}

export default withRouter(Main);
