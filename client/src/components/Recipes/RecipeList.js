import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Image,
} from "react-bootstrap";
import DeleteBtn from "../DeleteBtn";

// import { ACCESS_TOKEN_NAME } from "../../constants/apiConstants";
// // import API from "../utils/API.js";
// import { useAuth } from "../AuthContext";
// RecipeList renders a bootstrap list item
export function RecipeList({ children }) {
  return <ul className="list-group">{children}</ul>;
}

// RecipeListItem renders a bootstrap list item containing data from the recipe api call
export function RecipeListItem({
  unique,
  title,
  ingredients,
  href,
  thumbnail,
  description,
  instructions,
  prep,
  cook,
  checkbox,
  saved,
  handleDelete,
}) {
  return (
    <li className="list-group-item" key={unique}>
      <Container>
        <Row>
          <Col xs={8} sm={9}>
            <Row>
              <Col sm={2}>
                {thumbnail ? <Image src={thumbnail} alt={title} fluid rounded style={{ maxWidth: "100%", height: "auto" }} /> : null}
              </Col>
              <Col>
                <h3>{title}</h3>
                <p>
                  {description ? (
                    <p>
                      {description}
                      <br />
                      {prep ? `Prep Time: ${prep}` : null}
                      {cook ? `Cook Time: ${cook}` : null}
                    </p>
                  ) : null}
                  {ingredients ? (
                    <p>
                      Ingredients:
                      <ul>
                        {ingredients.map((ingredient) => (<li>{ingredient}</li>))}
                      </ul>
                    </p>
                  ) : null}
                  {instructions ? (
                    <ul>
                      {instructions.map((instruction) => (<li>{instruction}</li>))}
                    </ul>
                  ) : null}
                </p>
                {href ? (
                  <a rel="noreferrer noopener" target="_blank" href={href}>
                    Go to recipe!
                  </a>
                ) : null}
                {checkbox ? (
                  <Form inline>
                    <Form.Text muted>Save Recipe?  </Form.Text>
                    <Form.Check aria-label={`Save Recipe: ${title}`} onChange={checkbox} checked={saved ? !!saved : false} />
                  </Form>
                ) : null}
              </Col>
            </Row>
          </Col>
          {handleDelete ? (
            <Col xs={1}>
              <DeleteBtn onClick={handleDelete} />
            </Col>
          )
            : " "}
        </Row>
      </Container>
    </li>
  );
}
export default { RecipeListItem, RecipeList };
