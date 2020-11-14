// import ZoomWindow from "./zoomWindow";
// import ZoomControl from "./zoomControl";
import React from "react";

// Defining functional style code here for now-
// Messages from zoom client display correctly at at least this size
const frameStyle = {
  minWidth: "500px",
  minHeight: "250px",
};

// Export embedded link to our zoom client
// Next step is to move iframe to zoomWindow as components,
// rewrite zoomControl to include button sending request to client
// from our db
function Zoom() {
  return (
    <>
      <iframe
        src="https://ttzoomclient.herokuapp.com/"
        title="Zoom Client"
        style={frameStyle}
      />
    </>
  );
}

export default Zoom;
