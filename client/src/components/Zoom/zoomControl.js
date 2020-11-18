import React from "react";
import { Button } from "react-bootstrap";
// Get code could/ maybe should be moved to utils/api, but doing here for now
// to avoid confusion/conflicts
import axios from "axios";

// Use state to track-joining, joined, default(as in, unclicked)
//  Gets required information from app db and sends to Zoom client
const sendJoinRequest = () => {
  // Button fn test
  console.log("test");

  // Prep data to send - values should come from db, const should likely be let
  const data = JSON.stringify({ id: 7791079090, pwd: "Fyr5Xk", name: "Big Test" });

  const config = {
    method: "post",
    url: "https://ttzoomclient.herokuapp.com/create",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };

  axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
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
