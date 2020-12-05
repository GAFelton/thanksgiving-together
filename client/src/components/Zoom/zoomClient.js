import React from "react";

// Defining functional style code here for now-
// Messages from zoom client display correctly at at least this size
const frameStyle = {
  minWidth: "60vw",
  minHeight: "60vh",
};

// Export div containing embedded link to our zoom client code
// Embedding the link in an iframe allows it to be resized, and simplifies
// Applying styles to the rest of the application that might otherwise conflict
function ZoomClient({ userId }) {
  // userId is used to create a unique url to the zoom client,
  // and allows it to be referenced from the client's frontend JS
  return (
    <>
      <iframe
        src={`https://ttzoomclient.herokuapp.com/${userId}`}
        allow="camera;microphone"
        title="Zoom Client"
        style={frameStyle}
      />
    </>
  );
}

export default ZoomClient;
