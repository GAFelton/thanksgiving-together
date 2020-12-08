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

function SearchTab() {
  // eslint-disable-next-line no-unused-vars
  const [recipes, setRecipes] = useState([]);
  const [recipeSearch, setRecipeSearch] = useState("");

  const { user } = useAuth();
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
        console.log(response.data);
        // eslint-disable-next-line no-use-before-define
        recipeData(response.data.hits);
      })
      .catch((error) => {
        console.log(error);
      });
    // API.recipes.get(recipeSearch)
    //   .then((res) => setRecipes(res.data))
    //   .catch((err) => console.log(err));
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

  function handleRecipeSave(key) {
    const familyID = user.family;
    const unsanitizedRecipe = findRecipeInState(key);
    const recipeToSave = {};
    if (unsanitizedRecipe[0]) {
      recipeToSave.title = unsanitizedRecipe[0].title;
      recipeToSave.src = unsanitizedRecipe[0].href;
      recipeToSave.photo = unsanitizedRecipe[0].Thumbnail;
      recipeToSave.author = user.id;
    }
    try {
      API.recipes.create(
        { headers: { token: storedJWT } },
        recipeToSave,
        familyID,
      );
    } catch (error) {
      console.log(error);
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
