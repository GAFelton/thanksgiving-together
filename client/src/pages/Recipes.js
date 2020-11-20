import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { Recipes, RecipeListItem } from "../components/Recipes/index";
import API from "../utils/API";

function RecipesPage() {
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
    API.recipes(recipeSearch)
      .then((res) => setRecipes(res.data))
      .catch((err) => console.log(err));
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
                    <form
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
              <h1 className="text-center">No Recipes to Display</h1>
            ) : (
              <Recipes>
                {recipes.map((recipe) => (
                  <RecipeListItem
                    key={recipe.title}
                    title={recipe.title}
                    href={recipe.href}
                    ingredients={recipe.ingredients}
                    thumbnail={recipe.thumbnail}
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
