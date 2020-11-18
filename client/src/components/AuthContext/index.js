import React from "react";
import { ACCESS_TOKEN_NAME } from "../../constants/apiConstants";
import API from "../../utils/API";
import LoadingComponent from "../LoadingComponent";

const AuthContext = React.createContext(
  { user: null },
);

const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState();
  const [initializing, setInitializing] = React.useState(true);

  // initializing hook -> defaults to true.
  // after validation & in catch block, set to false.

  // useEffect calls validateToken() as soon as the page is loaded.
  React.useEffect(() => {
    validateToken(); // eslint-disable-line no-use-before-define
  }, []);

  // Sends the users JWT to be compared/validated. The full user object will be returned on success.
  function validateToken() {
    const storedJWT = localStorage.getItem(ACCESS_TOKEN_NAME);
    if (storedJWT !== null) {
      API.users.getMe({ headers: { token: storedJWT } })
        .then((response) => {
          if (response.status !== 200) {
            setUser(null);
          }
          setUser(response.data);
          // turn off loading state
          setInitializing(false);
        })
        .catch((error) => {
          console.log(error);
          setUser(null);
          // turn off loading state
          setInitializing(false);
        })
        .finally(() => {
          setInitializing(false);
        });
    } else {
      setUser(null);
      setInitializing(false);
    }
  }

  function handleLogin(token) {
    // After successful login, the user is granted a JWT, and redirected.
    // TODO: is localStorage the best place to store the JWT? Maybe for now.
    localStorage.setItem(ACCESS_TOKEN_NAME, token);
    validateToken();
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem(ACCESS_TOKEN_NAME);
  }

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {initializing
        ? <LoadingComponent />
        : children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth hook can only be used in AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
