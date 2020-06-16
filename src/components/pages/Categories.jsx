import React from "react";
import { withRouter } from "react-router-dom";
import Strapi from "strapi-sdk-javascript/build/main";
import Category from "../cards/Category";
import Loader from "../ui/Loader";

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
            categories (sort: "createdAt:desc"){
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
        <Loader />
      )}
    </div>
  );
}

export default withRouter(Categories);
