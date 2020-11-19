import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function NavPub() {
  return (
    <Navbar collapseOnSelect fixed="top" expand="lg" bg="warning" variant="light">
      <Navbar.Brand href="/">Thanksgiving Together</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/how-to">How-to</Nav.Link>
          <Nav.Link href="/login">Login/Register</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

  );
}

export default NavPub;
