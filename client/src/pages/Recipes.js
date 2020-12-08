import React from "react";
import {
  Container,
  Row,
  Col,
  Tabs,
  Tab,
} from "react-bootstrap";
import { SearchTab, SavedTab } from "../components/Recipes/index";
import "./recipes.css";

function RecipesPage({ showError }) {
  return (
    <div>
      <Container>
        <Row>
          <Col md={12}>
            <h1 className="text-center mb-4 h1Style">Our Recipes</h1>
            <Row>
              <Col>
                {/* Tabs will unmountOnExit to trigger SavedTab's useEffect & load latest searches.
                This unloads SearchTab (and the current search), so is not ideal. */}
                <Tabs mountOnEnter unmountOnExit>
                  <Tab eventKey="search" title="Search" tabClassName="recipeTab">
                    <SearchTab showError={showError} />
                  </Tab>
                  <Tab eventKey="saved" title="Saved" tabClassName="recipeTab">
                    <SavedTab showError={showError} />
                  </Tab>
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
