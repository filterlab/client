import React, { Component } from "react";
import _ from "lodash";
import Strapi from "strapi-sdk-javascript/build/main";
import { Search } from "semantic-ui-react";
import Page from "./Page";
import Spacer from "./Spacer";
import Category from "./cards/Category";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);
const LOADING_TIMEOUT = 1000;
class App extends Component {
  state = {
    categories: [],
    filteredCategories: [],
    isLoading: false,
    value: "",
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
      setTimeout(() => this.setState({ categories: data.categories }), 50);
    } catch (err) {}
  }

  handleResultSelect = (e, { res }) => this.setState({ value: res.name });

  handleSearchChange = (e, { value }) => {
    const initialState = {
      isLoading: false,
      filteredCategories: [],
      value: "",
    };
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = (res) => re.test(res.name);

      this.setState({
        isLoading: false,
        filteredCategories: _.filter(this.state.categories, isMatch),
      });
    }, LOADING_TIMEOUT);
  };

  render() {
    const { isLoading, value, categories } = this.state;
    const spinner = !categories;

    const filterCategories = () => {
      const allCategories =
        this.state.filteredCategories.length <= 0
          ? categories
          : this.state.filteredCategories;

      return (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          {allCategories.map((b, i) => Category(b, i))}
        </div>
      );
    };

    const build = () => {
      return (
        <>
          <Search
            showNoResults={false}
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            value={value}
          />
          <Spacer space={30} />
          {filterCategories()}
        </>
      );
    };

    return (
      <Page
        header={"Welcome to Filterstore!"}
        loading={spinner}
        loadingMessage={"Loading your favourite filters"}
        body={build()}
      />
    );
  }
}

export default App;
