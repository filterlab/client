import React, { Component } from "react";
import Strapi from "strapi-sdk-javascript/build/main";
import Page from "./Page";
import Spacer from "./Spacer";
import Category from "./cards/Category";
import Install from "./pages/Install";
import Logo from "./Logo";
import { Loader } from "semantic-ui-react";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);
class App extends Component {
  state = {
    categories: [],
  };

  async componentDidMount() {
    try {
      const { data } = await strapi.request("POST", "/graphql", {
        data: {
          query: `query {
            categories {
              _id
              name
              description
              createdAt
              image
            }
          }`,
        },
      });
      this.setState({ categories: data.categories });
    } catch (err) {}
  }

  handleResultSelect = (e, { res }) => this.setState({ value: res.name });

  render() {
    const { categories } = this.state;

    const filterCategories = () => (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {categories.map((b, i) => Category(b, i))}
      </div>
    );

    const build = () => (
      <>
        <Logo size="big" />
        <Spacer space={50} />
        {categories ? (
          filterCategories()
        ) : (
          <Loader active>Loading categories</Loader>
        )}
        <Spacer space={10} />
        <Install />
      </>
    );

    return <Page loadingMessage={"Loading awesome filters"} body={build()} />;
  }
}

export default App;
