import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { RecipeList, RecipeListItem } from "../RecipeList";
import API from "../../../utils/API";
import { useAuth } from "../../AuthContext";
import { ACCESS_TOKEN_NAME } from "../../../constants/apiConstants";

function SavedTab({ showError }) {
  // Array to receive/store family recipes
  const [recipes, setRecipes] = useState([]);

  // Retrieve user's family ID
  const { family } = useAuth().user;
  const storedJWT = localStorage.getItem(ACCESS_TOKEN_NAME);

  // On each load, get family's recipes from DB and save to recipes array
  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    getRecipesFromDB();
  }, []);

  function getRecipesFromDB() {
    API.family.get(family)
      .then((response) => {
        setRecipes(response.data.recipes);
      });
  }

  async function handleDelete(id) {
    try {
      await API.recipes.archive(
        { headers: { token: storedJWT } },
        id,
      );
      getRecipesFromDB();
      showError(null);
    } catch (error) {
      showError("An error occurred while deleting a recipe.");
      console.log(error);
    }
  }

  return (
    <Row>
      <Col xs={12}>
        {!recipes.length ? (
          " "
        ) : (
          <RecipeList>
            {recipes.map((recipe) => (
              <RecipeListItem
                key={recipe.id}
                title={recipe.title}
                href={recipe.src}
                thumbnail={recipe.photo}
                handleDelete={() => handleDelete(recipe.id)}
              />
            ))}
          </RecipeList>
        )}
      </Col>
    </Row>
  );
}

export default SavedTab;
