import React from "react";
import Page from "../ui/Page";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter, Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import Strapi from "strapi-sdk-javascript/build/main";
import Collection from "../cards/Collection";
import Spacer from "../ui/Spacer";
import Empty from "../ui/Empty";
import Loader from "../ui/Loader";

const uniqBy = require("lodash.uniqby");
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

const checkoutWidth = (isTablet) => (isTablet ? 300 : 500);
class Collections extends React.Component {
  state = {
    loading: true,
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
      setTimeout(() => this.setState({ filters, loading: false }), 50);
    } catch (err) {
      this.props.history.push("/404");
    }
  }
  noCollections = () => {
    const isTablet = this.props.isTablet;
    let minWidth = checkoutWidth(isTablet);
    return (
      <>
        <div style={{ minWidth }}>
          <Spacer space={100} />
          <Empty message="You've got no presets yet" />
          <Spacer space={20} />
          <center>
            <Button>
              <Link
                style={{
                  color: "inherit",
                  textDecoration: "inherit",
                  margin: 1,
                }}
                to="/"
              >
                Go back to Home
              </Link>
            </Button>
          </center>
        </div>
      </>
    );
  };

  build = () =>
    this.state.loading ? (
      <Loader />
    ) : this.state.filters.length > 0 ? (
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {this.state.filters.map((filter) => (
          <Collection filter={filter} />
        ))}
      </div>
    ) : (
      this.noCollections()
    );

  render() {
    return (
      <Page
        header={"Collections"}
        loading={""}
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
