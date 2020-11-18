import React from "react";

function NavPub() {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-warning">
      <a className="navbar-brand" href="/">
        Thanksgiving Together
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="/guide">About</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/how-to">How-to</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">Login/Register</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavPub;
