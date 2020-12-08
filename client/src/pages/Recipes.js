import React from "react";
import {
  Container,
  Row,
  Col,
  Tabs,
} from "react-bootstrap";
<<<<<<< HEAD
=======

import { Recipes, RecipeListItem } from "../components/Recipes/index";
import API from "../utils/API";
import Input from "../components/Recipes/Input";

// CSS style
const h1Style = {
  textShadow: "1px 2px 1px #000000",
  textAlign: "center",
  color: "#F5E625",
  fontSize: "6vw",
  fontFamily: "Kaushan Script, cursive",
};

>>>>>>> 9257b4cb51f5d4dbd9d62465e624ed377c08a8ff
import { SearchTab, SavedTab } from "../components/Recipes/index";
import "./recipes.css";

function RecipesPage() {
  return (
    <div>
      <Container>
        <Row>
          <Col md={12}>
            <h1 className="text-center mb-4 h1Style">Our Recipes</h1>
            <Row>
              <Col>
                <Tabs>
                  <Tabs.Tab eventKey="search" title="Search" tabClassName="recipeTab">
                    <SearchTab />
                  </Tabs.Tab>
                  <Tabs.Tab eventKey="saved" title="Saved" tabClassName="recipeTab">
                    <SavedTab />
                  </Tabs.Tab>
                </Tabs>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default RecipesPage;
