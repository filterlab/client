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
const FILES_FOLDER = "../../files/images/filter";
const FILES_FOLDER_BEFORE = FILES_FOLDER + "/before/";
const FILES_FOLDER_AFTER = FILES_FOLDER + "/after/";
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
    const { name, download } = this.state.filter;

    const BEFORE = `${FILES_FOLDER_BEFORE}${this.props.filter.id}.jpg`;
    const AFTER = `${FILES_FOLDER_AFTER}${this.props.filter.id}.jpg`;
    return (
      <Fade clear delay={100 * index}>
        <div style={{ maxHeight: 321, margin: 20 }}>
          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <BeforeAfterSlider
                before={AFTER}
                after={BEFORE}
                height={200}
                width={290}
              />
            </div>

            <Card.Content>
              <div style={{ height: 40 }}>
                <Card.Header>
                  <b>
                    <center>{name}</center>
                  </b>
                </Card.Header>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Link
                  to={`/files/filters/${download}`}
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
