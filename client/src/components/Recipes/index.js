/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import React from "react";
// Exporting both RecipeList and RecipeListItem from this file

// RecipeList renders a bootstrap list item
export function Recipes({ children }) {
  return <ul className="list-group">{children}</ul>;
}

// RecipeListItem renders a bootstrap list item containing data from the recipe api call
export function RecipeListItem({
  thumbnail,
  title,
  ingredients,
  href,
}) {
  return (
    <li className="list-group-item">
      <Container>
        <Row>
          <Col size="xs-4 sm-2">
            <Thumbnail src={thumbnail || "https://www.edamam.com/recipes/"} />
          </Col>
          <Col size="xs-8 sm-9">
            <h3>{title}</h3>
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

export default { Recipes, RecipeListItem };
