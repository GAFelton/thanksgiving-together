import React, { useState } from "react";
import {
  Button, Alert,
} from "react-bootstrap";
import API from "../../utils/API";
import { useAuth } from "../AuthContext";

function InviteButton() {
  const [inviteURL, setInviteURL] = useState();
  const [show, setShow] = useState(false);

  const { user } = useAuth();

  React.useEffect(() => {
    const { family } = user;
    const baseURL = window.location.origin;

    API.family.get(family)
      .then((response) => {
        const inviteLink = `${baseURL}/joinfamily/${response.data.roomCode}`;
        setInviteURL(inviteLink);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleClick() {
    setShow(true);
  }

  return (

    <>
      <Button onClick={handleClick}>
        Generate Invite Link
      </Button>
      {show ? (
        <Alert className="mt2" style={{ width: "fit-content" }} variant="success">
          {inviteURL}
        </Alert>
      ) : ""}
    </>

  );
}

export default InviteButton;
