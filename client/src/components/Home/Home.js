import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from "../../constants/apiConstants";
import API from "../../utils/API";

// Home is a placeholder page for a private Route. The important functions to have are:
// redirectToLogin, and validateToken (on page load).
// TODO: These might be better implemented via a Context.
function Home(props) {
  // useEffect calls validateToken() as soon as the page is loaded.
  useEffect(() => {
    validateToken(); // eslint-disable-line no-use-before-define
  });

  // This function redirects a user if their JWT cannot be verified..
  function redirectToLogin() {
    props.updateTitle("Login");
    props.history.push("/login");
  }

  // Sends the users JWT to be compared/validated. The full user object will be returned on success.
  function validateToken() {
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

  // Placeholder render.
  return (
    <div className="mt-2">
      Home page content
    </div>
  );
}

export default withRouter(Home);
