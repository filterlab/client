import React from "react";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import { Card, Button } from "semantic-ui-react";

const FILES_FOLDER = "../../files/images/category/";
const Category = (category, index) => {
  const { _id, name, description } = category;
  const card = () => (
    <Fade clear delay={100 * index}>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            alt={name}
            height={200}
            width={290}
            src={`${FILES_FOLDER}${_id}/cover.jpg`}
          />
        </div>
        <Card.Content>
          <div>
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
            <div
              style={{ display: "flex", justifyContent: "center", margin: 5 }}
            >
              <Link
                to={`/category/${_id}`}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <Button>See all presets</Button>
              </Link>
            </div>
          </Card.Meta>
        </Card.Content>
      </Card>
    </Fade>
  );
  return (
    <div
      style={{
        margin: 20,
        height: 321,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {category && card()}
    </div>
  );
};
export default Category;
