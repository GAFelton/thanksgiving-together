import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { Recipes, RecipeListItem } from "./Search";
// import API from "../utils/API";
import Input from "./Input";

function SearchTab({
  recipeSearch,
  handleInputChange,
  handleFormSubmit,
  recipes,
}) {
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
    </>
  );
}

export default SearchTab;
