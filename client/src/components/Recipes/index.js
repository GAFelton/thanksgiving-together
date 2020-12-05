import React from "react";
import {
  Container, Row, Col,
} from "react-bootstrap";

// import { ACCESS_TOKEN_NAME } from "../../constants/apiConstants";
// // import API from "../utils/API.js";
// import { useAuth } from "../AuthContext";
// RecipeList renders a bootstrap list item
export function Recipes({ children }) {
  return <ul className="list-group">{children}</ul>;
}

// RecipeListItem renders a bootstrap list item containing data from the recipe api call
export function RecipeListItem({
  title,
  ingredients,
  href,
  Thumbnail,
}) {
  return (
    <li className="list-group-item">
      <Container>
        <Row>
          <Col size="xs-8 sm-9">
            <h3>{title}</h3>
            <img src={Thumbnail} alt={title} />
            <p>
              Ingredients:
              {ingredients}
            </p>
            <a rel="noreferrer noopener" target="_blank" href={href}>
              Go to recipe!
            </a>
          </Col>
        </Row>
      </Container>
    </li>
  );
}
export default { RecipeListItem, Recipes };
