import React, { useState } from "react";
import { ZoomWindow, ZoomControl } from "../components/Zoom";

const zoomConfig = {
  // the REACT_APP_ prefix in the .env vars below flags them as readable
  // we absolutely do not want to do this in prod, call/run in backend instead
  apiKey: process.env.REACT_APP_ZOOM_API,
  apiSecret: process.env.REACT_APP_ZOOM_SECRET,
  meetingNumber: 7690603798, // must not include spaces-add validate code in e handler
  leaveUrl: "http://localhost:3000/", // redirect if join fails-current val causes some odd behavior
  userName: "", // required
  userEmail: "", // optional but must be attendee's email address
  passWord: "5bzpES",
  role: 0, // 0 : guest, 1 : host. Locked to guest--
  // host can't currently start meeting from app, but can join again as guest
};

// Fn component to export
const Zoom = () => {
  // state code here was taken from App.js in https://github.com/shawnscoding/zoom-integration-with-reactjs
  // Removed dynamic css code. Again, I aim to rework/condense this past mvp.
  // Replacing user inputs with db calls

  // Links config state to object above
  const [config, setConfig] = useState(zoomConfig);

  // Set api key/secret in config

  // Set submission status for user input, button in ZoomControl
  const [isSubmitted, setIsSubmitted] = useState({
    status: false,
  });

  // Sets value in configObject per user input
  const handleChange = (e) => {
    setConfig({
      ...config,
      [e.target.id]: e.target.value,
    });
  };

  const { userName } = config;

  // Event handler for form submission, changes submit status if userName is valid
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName.length) return;

    setIsSubmitted({
      status: true,
    });
  };

  // Returns zoom 'page', passes above fns/ obj as prop
  return (
    <>
      <ZoomControl
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        config={config}
      />
      <ZoomWindow isSubmitted={isSubmitted} meetConfig={config} />
    </>
  );
};

export default Zoom;
