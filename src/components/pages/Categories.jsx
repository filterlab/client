import React from "react";
import { withRouter } from "react-router-dom";
import Category from "../cards/Category";
import Strapi from "strapi-sdk-javascript/build/main";
import DotLoader from "react-spinners/DotLoader";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);
class Categories extends React.Component {
  state = {
    categories: [],
  };
  async componentDidMount() {
    await strapi
      .request("POST", "/graphql", {
        data: {
          query: `query {
            categories {
              _id
              name
              description
              createdAt
            }
          }`,
        },
      })
      .then((res) => this.setState({ categories: res.data.categories }))
      .catch(() => this.props.history.push("/404"));
  }

  render = () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      {this.state.categories.length > 0 ? (
        this.state.categories.map((b, i) => Category(b, i))
      ) : (
        <div
          style={{
            height: 321,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <DotLoader />
        </div>
      )}
    </div>
  );
}

export default withRouter(Categories);
