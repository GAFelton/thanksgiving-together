import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function PrivateRoute({ children, ...rest }) {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) => (user ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: location },
          }}
        />
      ))}
    />
  );
}

export default PrivateRoute;
