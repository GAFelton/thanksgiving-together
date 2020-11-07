import React from "react";
import Nav from "./components/Nav";
import Zoom from "./pages/Zoom";
import DiscussTopicBtn from "./components/DiscussTopicBtn";

// AUTHENTICATION NOTES
// Wrap providers around MAIN app.
// Logic for determing "is user logged in?" should all be in the auth context provider.
// React Router ((user) ? Logged-in Routes : Logged-out Routes)
function App() {
  return (
    <div>
      <Nav />
      <Zoom />
      <DiscussTopicBtn />
    </div>
  );
}

export default App;
