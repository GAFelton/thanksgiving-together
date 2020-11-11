import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-warning">
      <a className="navbar-brand" href="/">
        Thanksgiving Together
      </a>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">Link</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Menu
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/">Games</a>
              <a className="dropdown-item" href="/">Discussion Topics</a>
              <a className="dropdown-item" href="/">Recipes</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
