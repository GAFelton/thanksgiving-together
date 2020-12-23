import React from "react";
import { withRouter } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Zoom from "../components/Zoom";
import DiscussTopicBtn from "../components/DiscussTopicBtn";
import Spotify from "../components/Spotify";

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
