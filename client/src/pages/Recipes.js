/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Tabs,
  Tab,
} from "react-bootstrap";
import axios from "axios";
import { SearchTab, SavedTab } from "../components/Recipes/index";

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
        ingredientObj.ingredients = hits.recipe.ingredientLines,
        ingredientObj.href = hits.recipe.source,
        output.push(ingredientObj)

      );
    });
    setRecipes(output);
  };
  return (
    <div>
      <Container>
        <Row>
          <Col md={12}>
            <h1 className="text-center mb-4 h1Style">Our Recipes</h1>
            <Row>
              <Tabs>
                <Tab eventKey="search" title="Search">
                  <SearchTab
                    recipeSearch={recipeSearch}
                    handleInputChange={handleInputChange}
                    handleFormSubmit={handleFormSubmit}
                    recipes={recipes}
                  />
                </Tab>
                <Tab eventKey="saved" title="Saved">
                  <SavedTab
                    recipes={recipes}
                  />
                </Tab>
              </Tabs>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default RecipesPage;
