import React from "react";
import Col from "react-bootstrap/Col";

function Spotify() {
  return (
    <Col>
      <iframe
        title="playlist"
        src="https://open.spotify.com/embed/playlist/6RcWR9lYF4wQ3cMFjjcQeD"
        width="300"
        height="380"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
      />
    </Col>
  );
}

export default Spotify;
