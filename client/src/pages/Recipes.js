import React from "react";
import {
  Container,
  Row,
  Col,
  Tabs,
} from "react-bootstrap";
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
