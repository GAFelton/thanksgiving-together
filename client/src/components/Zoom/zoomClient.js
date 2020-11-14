import React from "react";

// Defining functional style code here for now-
// Messages from zoom client display correctly at at least this size
const frameStyle = {
  minWidth: "1000px",
  minHeight: "500px",
  transform: "scale(.5,.5)",
};

// Export embedded link to our zoom client
function ZoomClient() {
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

export default ZoomClient;
