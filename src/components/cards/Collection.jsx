import React from "react";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import BeforeAfterSlider from "react-before-after-slider";
import { Card, Button } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

class Collection extends React.Component {
  state = {
    filter: {},
  };

  async componentDidMount() {
    try {
      const { data } = await strapi.request("POST", "/graphql", {
        data: {
          query: `query {
                filter(id:"${this.props.filter.id}") {
                    _id
                    name
                    description
                    image
                    image_after
                    image_before
                    price
                    download
                  }
                }`,
        },
      });

      setTimeout(() => this.setState({ filter: data.filter }), 50);
    } catch (err) {}
  }

  render() {
    const { index } = this.props;
    const {
      name,
      description,
      image_after,
      image_before,
      download,
    } = this.state.filter;
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
              <BeforeAfterSlider
                before={image_before}
                after={image_after}
                height={200}
                width={290}
              />
            </div>

            <Card.Content>
              <div style={{ height: 100 }}>
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Link
                  to={`/files/${download}`}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                  target="_blank"
                  download
                >
                  <Button>Download</Button>
                </Link>
              </div>
            </Card.Content>
          </Card>
        </div>
        <ToastContainer />
      </Fade>
    );
  }
}

export default Collection;
