import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import Header from "./components/Header/Header";
import LoginForm from "./components/LoginForm/LoginForm";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import Home from "./components/Home/Home";
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
            <Switch>
              <PublicRoute path="/" exact>
                <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle} />
              </PublicRoute>
              <PublicRoute path="/register">
                <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle} />
              </PublicRoute>
              <PublicRoute path="/login">
                <LoginForm showError={updateErrorMessage} updateTitle={updateTitle} />
              </PublicRoute>
              <PrivateRoute path="/home">
                <Home />
              </PrivateRoute>
            </Switch>
            <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage} />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
