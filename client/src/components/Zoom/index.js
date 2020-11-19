import React from "react";
import ZoomClient from "./zoomClient";
import ZoomControl from "./zoomControl";
import { useAuth } from "../AuthContext";

// next step: rewrite zoomControl as button sending request to client
// from our db, to follow zoom frame- maybe better done as entirely
// separate component

// Exports a div containing our zoom client-these could be merged into a single component,
// but this structure might make styling easier-
function Zoom() {
  // Get user info used in creating meeting to pass to zoom client router/app's zoomControl button
  const { id, firstName, lastName } = useAuth().user;
  console.log(id);
  return (
    <>
      <ZoomClient
        userId={id}
      />
      <ZoomControl
        firstName={firstName}
        lastName={lastName}
      />
    </>
  );
}

export default Zoom;
