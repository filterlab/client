import React from "react";
import Strapi from "strapi-sdk-javascript/build/main";
import Page from "../Page";
import Filter from "../cards/Filter";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

class Filters extends React.Component {
  state = {
    name: "",
    filters: [],
  };

  async componentDidMount() {
    try {
      const res = await strapi.request("POST", "/graphql", {
        data: {
          query: `query {
            category(id: "${this.props.match.params.categoryId}") {
              _id
              name
              filters {
                _id
                name
                description
                image
                image_after
                image_before
                price
              }
            }
          }`,
        },
      });
      setTimeout(
        () =>
          this.setState({
            name: res.data.category.name,
            filters: res.data.category.filters,
          }),
        50
      );
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { filters, name } = this.state;
    const spinner = filters.length <= 0;
    const build = () => {
      return (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          {filters.map((b, i) => (
            <Filter filter={b} index={i} apiUrl={apiUrl} />
          ))}
        </div>
      );
    };
    return (
      <Page
        header={`${name}`}
        loading={spinner}
        loadingMessage={"Filters everywhere!"}
        body={build()}
      />
    );
  }
}

export default Filters;
