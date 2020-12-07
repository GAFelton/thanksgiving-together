import React from "react";
import { Container, Row, Col } from "react-bootstrap";

// import { ACCESS_TOKEN_NAME } from "../../constants/apiConstants";
// // import API from "../utils/API.js";
// import { useAuth } from "../AuthContext";
// RecipeList renders a bootstrap list item
export function RecipeList({ children }) {
  return <ul className="list-group">{children}</ul>;
}

// RecipeListItem renders a bootstrap list item containing data from the recipe api call
export function RecipeListItem({
  title,
  ingredients,
  href,
  Thumbnail,
  description,
  instructions,
  prep,
  cook,
}) {
  return (
    <li className="list-group-item">
      <Container>
        <Row>
          <Col size="xs-8 sm-9">
            <h3>{title}</h3>
            {Thumbnail ? <img src={Thumbnail} alt={title} /> : null}
            <p>
              {description ? (
                <p>
                  {description}
                  <br />
                  {prep ? `Prep Time: ${prep}` : null}
                  {cook ? `Cook Time: ${cook}` : null}
                </p>
              ) : null}
              Ingredients:
              <ul>
                {ingredients.map((ingredient) => (<li>{ingredient}</li>))}
              </ul>
              {instructions ? (
                <ul>
                  {instructions.map((instruction) => (<li>{instruction}</li>))}
                </ul>
              ) : null }
            </p>
            {href ? (
              <a rel="noreferrer noopener" target="_blank" href={href}>
                Go to recipe!
              </a>
            ) : null}
          </Col>
        </Row>
      </Container>
    </li>
  );
}
export default { RecipeListItem, RecipeList };
