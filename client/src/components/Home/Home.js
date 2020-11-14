import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { ACCESS_TOKEN_NAME, API_BASE_URL } from "../../constants/apiConstants";

function Home(props) {
  useEffect(() => {
    validateToken(); // eslint-disable-line no-use-before-define
  });

  function redirectToLogin() {
    props.history.push("/login");
  }

  function validateToken() {
    axios.get(`${API_BASE_URL}/user/me`, { headers: { token: localStorage.getItem(ACCESS_TOKEN_NAME) } })
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
