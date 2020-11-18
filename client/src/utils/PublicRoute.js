// If userContext is not null, redirect to /home

import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

// TODO: Work with useAuth().
function PublicRoute({ children, ...rest }) {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) => ((user === null) ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: "/home",
            state: { from: location },
          }}
        />
      ))}
    />
  );
}

export default PublicRoute;
