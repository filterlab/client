import React from "react";
import { withRouter } from "react-router-dom";
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
                    categoryId,
                    price
                    download
                  }
                }`,
        },
      })
      .then((res) => this.setState({ filter: res.data.filter }))
      .catch(() => this.props.history.push("/404"));
  }

  render() {
    const { index } = this.props;
    const { name, download, _id, categoryId } = this.state.filter;
    const BEFORE = `${FILES_FOLDER}/${categoryId}/before/original.jpg`;
    const AFTER = `${FILES_FOLDER}/${categoryId}/after/${_id}.jpg`;
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
              <BeforeAfterSlider
                before={AFTER}
                after={BEFORE}
                height={300}
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
                  justifyContent: "center",
                }}
              >
                <Link
                  to={`/files/filters/${download}`}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                  target="_blank"
                  download
                >
                  <Button color="green">Download</Button>
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
export default withRouter(Collection);
