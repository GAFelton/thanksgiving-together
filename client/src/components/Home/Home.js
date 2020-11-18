import React from "react";
import { withRouter } from "react-router-dom";

// Home is a placeholder page for a private Route. The important functions to have are:
function Home() {
  // Placeholder render.
  return (
    <div className="mt-2">
      Home page content
    </div>
  );
}

export default withRouter(Home);
