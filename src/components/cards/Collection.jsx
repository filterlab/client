import React from "react";
import { withRouter } from "react-router-dom";
import Fade from "react-reveal/Fade";
import BeforeAfterSlider from "react-before-after-slider";
import { Card, Button, Image } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);
const FILES_FOLDER = "../../files/images/filter";
class Collection extends React.Component {
  state = {
    filter: {},
  };

  async componentDidMount() {
    await strapi
      .request("POST", "/graphql", {
        data: {
          query: `query {
                filter(id:"${this.props.filter.id}") {
                    _id
                    name
                    description
                    categoryId
                    price
                    isPack
                  }
                }`,
        },
      })
      .then((res) => this.setState({ filter: res.data.filter }))
      .catch(() => this.props.history.push("/404"));
  }

  render() {
    const { index } = this.props;
    const { name, _id, categoryId, isPack } = this.state.filter;
    const BEFORE = `${FILES_FOLDER}/${categoryId}/before/original.jpg`;
    const AFTER = `${FILES_FOLDER}/${categoryId}/after/${_id}.jpg`;
    const PACK = `${FILES_FOLDER}/${categoryId}/pack.png`;
    return (
      <Fade clear delay={100 * index}>
        <div style={{ maxHeight: 421, margin: 20 }}>
          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {isPack ? (
                <Image height={300} width={290} src={PACK} />
              ) : (
                <BeforeAfterSlider
                  before={AFTER}
                  after={BEFORE}
                  height={300}
                  width={290}
                />
              )}
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
                  justifyContent: "center",
                }}
              >
                <a
                  href={`/files/filters/${this.props.filter.id}.${
                    isPack ? "zip" : "dng"
                  }`}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                  rel="noopener noreferrer"
                  download
                >
                  <Button
                    color="green"
                    onClick={() => this.props.history.push("/")}
                  >
                    Download
                  </Button>
                </a>
              </div>
            </Card.Content>
          </Card>
        </div>
        <ToastContainer />
      </Fade>
    );
  }
}
export default withRouter(Collection);
