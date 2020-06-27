import React from "react";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import BeforeAfterSlider from "react-before-after-slider";
import { Card, Button } from "semantic-ui-react";
const FILES_FOLDER = "../../files/images/category/";
const Category = (category, index) => {
  const { _id, name } = category;
  const card = () => (
    <Fade up delay={50 * index}>
      <Link
        to={`/category/${_id}`}
        style={{
          color: "inherit",
          textDecoration: "inherit",
          cursor: "pointer",
        }}
      >
        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <BeforeAfterSlider
              before={`${FILES_FOLDER}${_id}/after.jpg`}
              after={`${FILES_FOLDER}${_id}/before.jpg`}
              height={300}
              width={290}
            />
          </div>
          <Card.Content>
            <div>
              <Card.Header>
                <b>
                  <center>{name}</center>
                </b>
              </Card.Header>
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
      </Link>
    </Fade>
  );
  return (
    <div
      style={{
        margin: 20,
        height: 421,
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
