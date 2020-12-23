// If userContext is not null, redirect to /main

import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

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
            pathname: "/main",
            state: { from: location },
          }}
        />
      ))}
    />
  );
}

export default PublicRoute;
