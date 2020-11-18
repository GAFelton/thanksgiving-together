import React from "react";
import { PointSpreadLoading } from "react-loadingg";
import { Jumbotron, Container } from "react-bootstrap";

function LoadingComponent() {
  return (
    <Jumbotron fluid>
      <Container>
        <PointSpreadLoading />
      </Container>
    </Jumbotron>

  );
}

export default LoadingComponent;
