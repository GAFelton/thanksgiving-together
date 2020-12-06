import React from "react";
import { Row, Col } from "react-bootstrap";
import { RecipeList, RecipeListItem } from "../RecipeList";

function SavedTab({ recipes }) {
  return (
    <Row>
      <Col xs={12}>
        {!recipes.length ? (
          " "
        ) : (
          <RecipeList>
            {recipes.map((recipe) => (
              <RecipeListItem
                key={recipe.title}
                title={recipe.title}
                ingredients={recipe.ingredients}
                href={recipe.href}
                Thumbnail={recipe.Thumbnail}
              />
            ))}
          </RecipeList>
        )}
      </Col>
    </Row>
  );
}

export default SavedTab;
