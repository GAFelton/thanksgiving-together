import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

const ZoomControl = ({ userId, name, roomSettings }) => {
  // Create state to track button submission status, for UX
  const [isLoading, setLoading] = useState(false);

  // Onclick function for zoomControl button
  const sendJoinRequest = () => {
    // Set loading to true while this function runs
    setLoading(true);

    // Destructure two key meeting Room settings from prop
    const { pwd, id } = roomSettings;

    // Create data object to send based on above vals/props
    const data = JSON.stringify({ id, pwd, name });

    // Configuration object for axios request to Zoom client
    // userId is used to sync unique route w/ Zoom client page/component
    const config = {
      method: "post",
      url: `https://ttzoomclient.herokuapp.com/create/${userId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };

    // Send required data to external Zoom client, which will attempt to start meeting
    axios(config)
      .then((response) => {
        console.log("Server Response: ", response.status);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <>
      <Button
        variant="success"
        disabled={isLoading}
        onClick={!isLoading ? sendJoinRequest : null}
      >
        { isLoading ? "Connecting..." : "Join Meeting"}
      </Button>
    </>
  );
};

export default ZoomControl;
