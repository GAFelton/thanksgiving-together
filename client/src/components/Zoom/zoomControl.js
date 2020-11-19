import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

// Use state to track-joining, joined, default(as in, unclicked)

const ZoomControl = ({ userId, name, roomSettings }) => {
  // Onclick function for zoomControl button
  const sendJoinRequest = () => {
    // Destructure two key meeting Room settings from prop
    const { pwd, id } = roomSettings;

    // Create data object to send based on above vals/props
    const data = JSON.stringify({ id, pwd, name });

    // Configuration object for axios request to Zoom client
    // userId is used to sync unique route w/ zoommClient page/component
    const config = {
      method: "post",
      url: `https://ttzoomclient.herokuapp.com/create/${userId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };

    // Send required data to start meeting
    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Button
        variant="success"
        onClick={sendJoinRequest}
      >
        Join Meeting
      </Button>
    </>
  );
};

export default ZoomControl;
