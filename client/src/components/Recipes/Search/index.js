/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import { RecipeList, RecipeListItem } from "../RecipeList";
import Input from "./Input";
import API from "../../../utils/API";
import { ACCESS_TOKEN_NAME } from "../../../constants/apiConstants";

// The Search Tab allows users to search for recipes through the edamam api
// and save them to the family recipes db.
function SearchTab({ showError }) {
  // recipes returned from the edamam API Search.
  const [recipes, setRecipes] = useState([]);
  // The recipe search field, so the user can set the search query.
  const [recipeSearch, setRecipeSearch] = useState("");

  const { user, handleLogout } = useAuth();
  const storedJWT = localStorage.getItem(ACCESS_TOKEN_NAME);

  const handleInputChange = (event) => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { value } = event.target;
    setRecipeSearch(value);
  };

  const handleFormSubmit = (event) => {
    // When the form is submitted,
    // prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
    const config = {
      method: "get",
      url: `https://api.edamam.com/search?q=${recipeSearch}&app_id=769d4a23&app_key=39e4c3da53f52a122f17c5947c2f73fb&ingredients`,
      headers: {},
    };

    axios(config)
      .then((response) => {
        // eslint-disable-next-line no-use-before-define
        recipeData(response.data.hits);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // eslint-disable-next-line no-unused-vars
  const recipeData = (data) => {
    const output = [];
    // eslint-disable-next-line array-callback-return
    data.map((hits) => {
      const ingredientObj = {}; (
        ingredientObj.key = hits.recipe.uri,
        ingredientObj.title = hits.recipe.label,
        ingredientObj.thumbnail = hits.recipe.image,
        // ingredientObj.ingredients = hits.recipe.ingredientLines,
        ingredientObj.href = hits.recipe.url,
        ingredientObj.saved = false,
        output.push(ingredientObj)
      );
    });
    setRecipes(output);
  };

  function findRecipeInState(id) {
    return recipes.filter((item) => item.key === id);
  }

  function updateRecipeInState(idx, update) {
    const items = [...recipes];
    const item = { ...items[idx] };
    item.saved = update;
    items[idx] = item;
    setRecipes(items);
  }

  async function handleRecipeSave(key) {
    const familyID = user.family;
    const unsanitizedRecipe = findRecipeInState(key)[0];
    const recipeIdx = recipes.findIndex((element) => element.key === key);

    if (unsanitizedRecipe.saved === false) {
      const recipeToSave = {};
      if (unsanitizedRecipe) {
        recipeToSave.title = unsanitizedRecipe.title;
        recipeToSave.src = unsanitizedRecipe.href;
        recipeToSave.photo = unsanitizedRecipe.thumbnail;
        recipeToSave.author = user.id;
      }
      try {
        await API.recipes.create(
          { headers: { token: storedJWT } },
          recipeToSave,
          familyID,
        );
        // Sets saved to true for this recipe.
        updateRecipeInState(recipeIdx, true);
        showError(null);
      } catch (error) {
        console.log(error);
        if (error.response.status !== 200) {
          showError("Your session has ended. Please log in again.");
          handleLogout();
        } else showError("An error occurred while saving the recipe.");
      }
    } else if (unsanitizedRecipe.saved === true) {
      try {
        const query = unsanitizedRecipe.href;
        const { data } = await API.recipes.search(
          { token: storedJWT },
          query,
        );
        await API.recipes.archive(
          { headers: { token: storedJWT } },
          data[0].id,
        );
        // Sets saved to false for this recipe.
        updateRecipeInState(recipeIdx, false);
        showError(null);
      } catch (error) {
        console.log(error);
        if (error.response.status !== 200) {
          showError("Your session has ended. Please log in again.");
          handleLogout();
        } else showError("An error occurred while unsaving the recipe.");
      }
    }
  }

  return (
    <>
      <form>
        <Container>
          <Row>
            <Col xs={9} sm={10}>
              <Input
                name="RecipeSearch"
                value={recipeSearch}
                onChange={handleInputChange}
                placeholder="Search For a Recipe"
              />
            </Col>
            <Col xs={3} sm={2}>
              <Button
                onClick={handleFormSubmit}
                type="success"
                className="input-lg"
              >
                Search
              </Button>
            </Col>
          </Row>
        </Container>
      </form>
      <Row>
        <Col xs={12}>
          {!recipes.length ? (
            " "
          ) : (
            <RecipeList>
              {recipes.map((recipe) => (
                <RecipeListItem
                  key={recipe.key}
                  unique={recipe.key}
                  title={recipe.title}
                  ingredients={recipe.ingredients}
                  href={recipe.href}
                  thumbnail={recipe.thumbnail}
                  checkbox={() => handleRecipeSave(recipe.key)}
                  saved={recipe.saved}
                />
              ))}
            </RecipeList>
          )}
        </Col>
      </Row>
    </>
  );
}

export default SearchTab;
