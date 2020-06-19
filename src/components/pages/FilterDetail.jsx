import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import Strapi from "strapi-sdk-javascript/build/main";
import BeforeAfterSlider from "react-before-after-slider";
import Page from "../ui/Page";
import { handleSuccess } from "../helpers/toasts";
import "react-toastify/dist/ReactToastify.css";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);
const FILES_FOLDER = "../../files/images/filter";
class FilterDetail extends React.Component {
  state = {
    filter: "",
  };

  async componentDidMount() {
    await strapi
      .request("POST", "/graphql", {
        data: {
          query: `{
            filter(id: "${this.props.filter._id}") {
              _id
              name
              price
              categoryId
              description
            }
          }`,
        },
      })
      .then((res) =>
        this.setState({
          filter: res.data.filter,
        })
      )
      .catch(() => this.props.history.push("/404"));
  }

  handleShoppingClick = (id, price, name) => {
    this.props.addToCart(id, price, name);
    handleSuccess(`Added ${name} to cart!`);
  };

  render() {
    const filter = this.state.filter;
    const isTablet = this.props.isTablet;
    const { _id, name, categoryId, description } = filter;
    const BEFORE = `${FILES_FOLDER}/${categoryId}/before/original.jpg`;
    const AFTER = `${FILES_FOLDER}/${categoryId}/after/${_id}.jpg`;
    const WIDTH = isTablet ? 320 : 640;
    const HEIGHT = isTablet ? 240 : 480;
    const filterDetail = () => {
      return (
        <>
          <div
            style={{
              display: "flex",
              width: WIDTH,
              flexDirection: "column",
              justifyContent: "center",
              marginBottom: isTablet ? 10 : 20,
            }}
          >
            <BeforeAfterSlider
              before={AFTER}
              after={BEFORE}
              width={WIDTH}
              height={HEIGHT}
            />
          </div>
          <center>{description}</center>
        </>
      );
    };

    return (
      <Page
        header={name}
        loading={!filter}
        loadingMessage={"Loading your filter"}
        body={filterDetail()}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    isTablet: state.responsive.isTablet,
  };
}

export default compose(withRouter, connect(mapStateToProps))(FilterDetail);
