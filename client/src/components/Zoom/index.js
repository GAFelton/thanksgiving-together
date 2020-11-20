import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import ZoomClient from "./zoomClient";
import ZoomControl from "./zoomControl";
import { useAuth } from "../AuthContext";

// Exports a div containing our zoom client and join meeting button
function Zoom() {
  // Create state to receive results of api call
  const [zoomRoomSettings, setZoomRoomSettings] = useState();

  // Get user info used in creating meeting to pass to zoom client router/app's zoomControl button
  const {
    id,
    fullName,
    family,
  } = useAuth().user;

  // Once component renders, get family Zoom information from db and update zoomRoomSettings state
  useEffect(() => {
    API.family.get(family)
      .then((response) => {
        setZoomRoomSettings(response.data.zoomInfo);
      });
  }, []);

  // Pass all the required info from above into Zoom components as props
  return (
    <>
      <div>
        <ZoomClient
          userId={id}
        />
      </div>
      <ZoomControl
        userId={id}
        name={fullName}
        roomSettings={zoomRoomSettings}
      />
    </>
  );
}

export default Zoom;
