/* eslint-disable import/no-named-as-default */
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "./components/Header/Header";
import LoginForm from "./components/LoginForm/LoginForm";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import About from "./components/About";
import How from "./components/How";
import Main from "./pages/Main";
import Games from "./components/Games";
import RecipesPage from "./pages/Recipes";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import { AuthProvider } from "./components/AuthContext";
import AlertComponent from "./components/AlertComponent/AlertComponent";

// App() mainly countains the React router. The router is wrapped in an AuthProvider,
// letting us discern whether a user is logged-in or not.
// Based on login status, PublicRoute and PrivateRoute will redirect users to /login or /main.
// If a route should be accessible by both logged-in and logged-out users, it is called via Route.
function App() {
  const [errorMessage, updateErrorMessage] = useState(null);
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <Container className="justify-content-center align-items-center">
            <Switch>
              <PublicRoute path="/" exact>
                <RegistrationForm showError={updateErrorMessage} />
              </PublicRoute>
              <PublicRoute exact path="/register">
                <RegistrationForm showError={updateErrorMessage} />
              </PublicRoute>
              <Redirect from="/joinfamily/:invitecode" to="/register/:invitecode" />
              <PublicRoute exact path="/register/:invitecode">
                <RegistrationForm showError={updateErrorMessage} />
              </PublicRoute>
              <PublicRoute path="/login">
                <LoginForm showError={updateErrorMessage} />
              </PublicRoute>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/how-to">
                <How />
              </Route>
              <PrivateRoute path="/main">
                <Main />
              </PrivateRoute>
              <PrivateRoute path="/games">
                <Games />
              </PrivateRoute>
              <PrivateRoute path="/recipes">
                <RecipesPage />
              </PrivateRoute>
            </Switch>
          </Container>
          {/* AlertComponent shows errors to user via the prop showError={updateErrorMessage} */}
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
