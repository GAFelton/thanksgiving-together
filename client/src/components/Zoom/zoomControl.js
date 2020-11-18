import React from "react";
import { Button } from "react-bootstrap";

// Use state to track-joining, joined, default(unclicked)
//  Gets required information from app db and sends to Zoom client
const sendJoinRequest = () => {
  console.log("test");
};

const ZoomControl = () => (
  <>
    <Button
      variant="success"
      onClick={sendJoinRequest}
    >
      Join Meeting
    </Button>
  </>
);

export default ZoomControl;
