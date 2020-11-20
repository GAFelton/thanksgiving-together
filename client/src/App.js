/* eslint-disable import/no-named-as-default */
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "./components/Header/Header";
import LoginForm from "./components/LoginForm/LoginForm";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import About from "./components/About";
import Main from "./pages/Main";
import Games from "./components/Games";
import RecipesPage from "./pages/Recipes";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import { AuthProvider } from "./components/AuthContext";
import AlertComponent from "./components/AlertComponent/AlertComponent";

function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header title={title} />
          <div className="container d-flex align-items-center flex-column">
            <Container>
              <Switch>
                <PublicRoute path="/" exact>
                  <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle} />
                </PublicRoute>
                <PublicRoute exact path="/register">
                  <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle} />
                </PublicRoute>
                <Redirect from="/joinfamily/:invitecode" to="/register/:invitecode" />
                <PublicRoute exact path="/register/:invitecode">
                  <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle} />
                </PublicRoute>
                <PublicRoute path="/login">
                  <LoginForm showError={updateErrorMessage} updateTitle={updateTitle} />
                </PublicRoute>
                <PublicRoute path="/about">
                  <About />
                </PublicRoute>
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
            <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage} />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
