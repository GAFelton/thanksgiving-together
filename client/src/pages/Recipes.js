import React from "react";
import {
  Container,
  Row,
  Col,
  Tabs,
  Tab,
} from "react-bootstrap";
import { SearchTab, SavedTab } from "../components/Recipes/index";

function RecipesPage() {
  return (
    <div>
      <Container>
        <Row>
          <Col md={12}>
            <h1 className="text-center mb-4 h1Style">Our Recipes</h1>
            <Row>
              <Tabs>
                <Tab eventKey="search" title="Search">
                  <SearchTab />
                </Tab>
                <Tab eventKey="saved" title="Saved">
                  <SavedTab />
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
