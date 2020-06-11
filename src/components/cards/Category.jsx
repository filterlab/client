import React from "react";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import { Card, Button } from "semantic-ui-react";
const FILES_FOLDER = "../../files/images/category/";
const Category = (category, index) => {
  const { _id, name, description, image } = category;
  return (
    <Fade clear delay={100 * index}>
      <div style={{ margin: 20, maxHeight: 321 }}>
        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              alt={image}
              height={200}
              width={290}
              src={`${FILES_FOLDER}${image}.jpg`}
            />
          </div>
          <Card.Content>
            <div style={{ height: 80 }}>
              <Card.Header>
                <b>
                  <center>{name}</center>
                </b>
              </Card.Header>
              <Card.Description>
                {
                  <center>
                    <div
                      style={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {description}
                    </div>
                  </center>
                }
              </Card.Description>
            </div>
            <Card.Meta>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Link
                  to={`/category/${_id}`}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <Button>See this category</Button>
                </Link>
              </div>
            </Card.Meta>
          </Card.Content>
        </Card>
      </div>
    </Fade>
  );
};
export default Category;
