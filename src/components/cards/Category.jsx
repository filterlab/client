import React from "react";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import BeforeAfterSlider from "react-before-after-slider";
import { Card, Button, Header } from "semantic-ui-react";
import Spacer from "../ui/Spacer"

const FILES_FOLDER = "../../files/images/category/";
const Category = (category, index, isTablet) => {
  const { _id, name } = category;
  const desktopCard = () => (
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
  const mobileCard = () => (
    <Fade up delay={50 * index}>
      <Link
        to={`/category/${_id}`}
        style={{
          color: "inherit",
          textDecoration: "inherit",
          cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <center><Header as="h3">{name}</Header></center>
          <Spacer space={15} />
          <BeforeAfterSlider
            before={`${FILES_FOLDER}${_id}/after.jpg`}
            after={`${FILES_FOLDER}${_id}/before.jpg`}
            height={150}
            width={145}
          />
          <Spacer space={15} />
          <Link
            to={`/category/${_id}`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <Button>See all presets</Button>
          </Link>
        </div>
      </Link>
    </Fade>
  );
  return (
    <div
      style={{
        margin: 20,
        height: !isTablet && 421,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {category && isTablet ? mobileCard() : desktopCard()}
    </div>
  );
};
export default Category;
