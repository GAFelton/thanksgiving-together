import React, { useEffect } from "react";
import { ZoomMtg } from "@zoomus/websdk";

// Launces the Zoom SDK, then attempts to join meeting
// Signature and meetConfig params are defined below
const joinMeeting = (signature, meetConfig) => {
  ZoomMtg.init({
    leaveUrl: meetConfig.leaveUrl,
    // Enable two way audio-video over VoIP
    isSupportAV: true,

    success: (success) => {
      console.log("Init Success ", success);
      // Joins meeting using settings from object passed in as param,
      // then log result
      ZoomMtg.join({
        meetingNumber: meetConfig.meetingNumber,
        userName: meetConfig.userName,
        // Below is sugar for signature: signature,
        signature,
        apiKey: meetConfig.apiKey,
        passWord: meetConfig.passWord,

        success: (result) => {
          console.log(result);
        },

        error: (error) => {
          console.log(error);
        },
      });
    },
  });
};

// Takes meeting settings as parameter, calls fns required to connect to Zoom room
const createMeeting = (meetConfig) => {
  // Create a string with the data required to generate a signature
  // Passing the obj directly causes a CORS error, I believe this is more secure
  const raw = JSON.stringify({
    meetingNumber: meetConfig.meetingNumber,
    role: meetConfig.role,
  });

  // Sends a request to a node app deployed on my heroku account
  // Returns a unique signature generated with my Api credentials,
  // the settings in config obj, and other conditions:
  // see https://marketplace.zoom.us/docs/sdk/native-sdks/web/build/signature
  fetch("https://ttzoomsignature.herokuapp.com/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: raw,
  })
    // If successful, above returns a readable stream, first step converts to string
    .then((result) => result.text())
    // Converts string to obj and retrieves signature value
    .then((response) => {
      const { signature } = JSON.parse(response);
      // Rather then continue nesting code, call fn declared above
      joinMeeting(signature, meetConfig);
    });
};

// Component built with Zoom obj + fns above, takes meeting settings and control submission as props
const ZoomWindow = ({ meetConfig, isSubmitted }) => {
  // Activates when isSubmitted switches from false (default) to true (submit pressed on form modal)
  useEffect(() => {
    // Loads Zoom resources when required
    if (isSubmitted.status) {
      // Specifies Zoom script library, matches installed ver
      ZoomMtg.setZoomJSLib("https://source.zoom.us/1.8.1/lib", "/av");
      // Additional 'middleware' loaded by calling provided methods
      ZoomMtg.preLoadWasm();
      ZoomMtg.prepareJssdk();
      // Calls fn first declared on line 6, passing in dynamic meeting configuration
      createMeeting(meetConfig);
    }
  }, [meetConfig, isSubmitted]);
  // No pre-written JSX to send, but return tags
  return <></>;
};

export default ZoomWindow;
