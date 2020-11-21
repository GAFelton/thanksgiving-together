/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import axios from "axios";
import { Recipes, RecipeListItem } from "../components/Recipes/index";
// import API from "../utils/API";
import Input from "../components/Recipes/Input";

function RecipesPage() {
  // eslint-disable-next-line no-unused-vars
  const [recipes, setRecipes] = useState([]);
  const [recipeSearch, setRecipeSearch] = useState("");

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
      headers: { },
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
        ingredientObj.title = hits.recipe.label,
        ingredientObj.Thumbnail = hits.recipe.image,
        ingredientObj.ingredients = [hits.recipe.ingredientLines],
        ingredientObj.href = hits.recipe.source,
        output.push(ingredientObj)

      );
      setRecipes(output);
    });
  };
  return (
    <div>
      <Container>
        <Row>
          <Col size="md-12">
            <form>
              <Container>
                <Row>
                  <Col size="xs-9 sm-10">
                    <Input
                      name="RecipeSearch"
                      value={recipeSearch}
                      onChange={handleInputChange}
                      placeholder="Search For a Recipe"
                    />
                  </Col>
                  <Col size="xs-3 sm-2">
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
          </Col>
        </Row>
        <Row>
          <Col size="xs-12">
            {!recipes.length ? (
              <h1 className="text-center">Our Recipes</h1>
            ) : (
              <Recipes>
                {recipes.map((recipe) => (
                  <RecipeListItem
                    key={recipe.title}
                    title={recipe.title}
                    ingredients={recipe.ingredients}
                    href={recipe.href}
                    Thumbnail={recipe.Thumbnail}
                  />
                ))}
              </Recipes>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default RecipesPage;
