import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { RecipeList, RecipeListItem } from "../Search/RecipeSearchList";
import API from "../../../utils/API";
import { useAuth } from "../../AuthContext";

function SavedTab() {
  // Array to receive/store family recipes
  const [recipes, setRecipes] = useState([]);

  // Retrieve user's family ID
  const { family } = useAuth().user;

  // On each load, get family's recipes from DB and save to recipes array
  useEffect(() => {
    API.family.get(family)
      .then((response) => {
        setRecipes(response.data.recipes);
      });
  }, []);

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
