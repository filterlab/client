import React from "react";
import Page from "../Page";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import Strapi from "strapi-sdk-javascript/build/main";
import Collection from "../cards/Collection";

const uniqBy = require("lodash.uniqby");
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);
class Collections extends React.Component {
  state = {
    filters: [],
  };

  mergeFilters = (orders) => {
    const allFilters = [];
    orders.map((order) =>
      order.filters.map((filter) =>
        allFilters.push({ id: filter.id, name: filter.name })
      )
    );
    return uniqBy(allFilters, "id");
  };

  async componentDidMount() {
    try {
      const { data } = await strapi.request("POST", "/graphql", {
        data: {
          query: `query {
            user(id: "${this.props.accountId}") {
              _id
              orders {
                filters
              }
            }
          }`,
        },
      });
      const filters = this.mergeFilters(data.user.orders);
      setTimeout(() => this.setState({ filters }), 50);
    } catch (err) {
      this.props.history.push("/404");
    }
  }

  build = () =>
    this.state.filters.map((filter) => <Collection filter={filter} />);

  render() {
    return (
      <Page
        header={"Collections"}
        loading={this.state.filters <= 0}
        loadingMessage={"Loading your Collection"}
        body={this.build()}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    isTablet: state.responsive.isTablet,
    accountId: state.auth.accountId,
  };
}

export default compose(withRouter, connect(mapStateToProps))(Collections);
