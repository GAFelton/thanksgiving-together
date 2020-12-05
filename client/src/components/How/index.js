import React from "react";

const h1Style = {
  textShadow: "2px 2px 2px #000000",
  textAlign: "center",
  color: "yellow",
  fontSize: "6vw",
  fontFamily: "Kaushan Script, cursive",
};

const bStyle = {
  textAlign: "left",
  textShadow: "1px 1px 2px #000000",
  color: "yellow",
  fontSize: "1.7vw",
};

const h2Style = {
  textShadow: "2px 2px 3px #000000",
  textAlign: "left",
  color: "yellow",
  fontSize: "3.5vw",
  fontFamily: "Kaushan Script, cursive",
};

function How() {
  return (
    <div className="flex-container" style={bStyle}>
      <h1 style={h1Style}>
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
