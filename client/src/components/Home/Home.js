import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from "../../constants/apiConstants";
import API from "../../utils/API";

function Home(props) {
  useEffect(() => {
    validateToken(); // eslint-disable-line no-use-before-define
  });

  function redirectToLogin() {
    props.updateTitle("Login");
    props.history.push("/login");
  }

  function validateToken() {
    // TODO: Need to send user ID in request body.
    API.users.getMe({ headers: { token: localStorage.getItem(ACCESS_TOKEN_NAME) } })
      .then((response) => {
        if (response.status !== 200) {
          redirectToLogin();
        }
      })
      .catch((error) => {
        console.log(error);
        redirectToLogin();
      });
  }

  return (
    <div className="mt-2">
      Home page content
    </div>
  );
}

export default withRouter(Home);
