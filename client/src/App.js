import React from "react";
import Books from "./pages/Books";
import Nav from "./components/Nav";

// AUTHENTICATION NOTES
// Wrap providers around MAIN app.
// Logic for determing "is user logged in?" should all be in the auth context provider.
// React Router ((user) ? Logged-in Routes : Logged-out Routes)
function App() {
  return (
    <div>
      <Nav />
      <Books />
    </div>
  );
}

export default App;
