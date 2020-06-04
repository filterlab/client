import React from "react";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import { Card } from "semantic-ui-react";
const Category = (category, index) => {
  const { _id, name, description, image } = category;
  return (
    <Fade clear delay={100 * index}>
      <div style={{ margin: 5, maxHeight: 321 }}>
        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              alt={image}
              height={193}
              width={290}
              style={{
                objectFit: "contain",
              }}
              src={image}
            />
          </div>

          <Card.Content>
            <div style={{ height: 80 }}>
              <Card.Header>
                <b>{name}</b>
              </Card.Header>
              <Card.Description>
                {
                  <div
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {description}
                  </div>
                }
              </Card.Description>
            </div>
            <Card.Meta>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Link
                  to={`/category/${_id}`}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <span className="date">See all filters</span>
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
