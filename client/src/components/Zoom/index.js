import React from "react";
import ZoomClient from "./zoomClient";
// import ZoomControl from "./zoomControl";

// next step: rewrite zoomControl as button sending request to client
// from our db, to follow zoom frame- maybe better done as entirely
// separate component

// Exports a div containing our zoom client-these could be merged into a single component,
// but this structure might make styling easier-
function Zoom() {
  return (
    <>
      <ZoomClient />
    </>
  );
}

export default Zoom;
