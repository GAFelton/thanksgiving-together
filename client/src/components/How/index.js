import React from "react";

const h2Style = {
  textAlign: "left",
  color: "#fd7e14",
  fontSize: "3.5vw",
  fontFamily: "Kaushan Script, cursive",
};

function How() {
  return (
    <div className="paragraph flex-container">
      <h1 className="h1Style">
        How-To
      </h1>
      <br />
      <h2 style={h2Style}>Step 1: Sign up</h2>
      <p>
        Register an account and a family if you are the first of your group to sign up.
        Share your invite link for family and friends to join your group.
      </p>
      <p>
        Not the first in your group to sign up? Register with the family code or through the
        invite link so you can join your group.
      </p>
      <br />
      <h2 style={h2Style}>Step 2: Set up your Zoom</h2>
      <p>
        Open up user settings and input your Zoom room code and password. Those that join your
        family group will have access to join the Zoom call.
      </p>
      <br />
      <h2 style={h2Style}>Step 3: Thanksgiving Together </h2>
      <p>
        Invite your family and friends to join your family group on our app and spend Thanksgiving
        safely and remotely, together.
      </p>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default How;
