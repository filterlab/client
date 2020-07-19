import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { setFilters } from "../../actions/authActions";
import Strapi from "strapi-sdk-javascript/build/main";
import Category from "../cards/Category";
import Loader from "../ui/Loader";
import Page from "../ui/Page";
import InstagramBanner from "../ui/InstagramBanner";
import Spacer from "../ui/Spacer";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);
class Categories extends React.Component {
  state = {
    categories: [],
    filters: [],
  };
  async componentDidMount() {
    await strapi
      .request("POST", "/graphql", {
        data: {
          query: `query {
            categories (sort: "createdAt:desc", where: { hidden_ne: true }){
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

    if (this.props.isAuthed) {
      await strapi
        .request("POST", "/graphql", {
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
        })
        .then((res) => {
          let arr = [];
          res.data.user.orders.map((order) => arr.push(order.filters[0]));
          const filters = arr.reduce((acc, current) => {
            const x = acc.find((item) => item.id === current.id);
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          }, []);
          this.props.setFilters(filters);
          this.setState({ filters: filters });
        });
    }
  }

  build = () => (
    <>
      <center>
        <InstagramBanner />
      </center>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Spacer space={20} />
        {this.state.categories.length > 0 ? (
          this.state.categories.map((b, i) => Category(b, i, this.props.isTablet))
        ) : (
            <Loader />
          )}
      </div>
    </>
  );
  render = () => (
    <Page
      header={"All Categories"}
      loading={false}
      loadingMessage={""}
      body={this.build()}
    />
  );
}
function mapStateToProps(state) {
  return {
    isAuthed: state.auth.key,
    accountId: state.auth.accountId,
    isTablet: state.responsive.isTablet,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    setFilters: (filters) => {
      dispatch(setFilters(filters));
    },
  };
};
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Categories);
