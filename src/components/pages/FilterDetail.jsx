import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { Icon, Button } from "semantic-ui-react";
import Strapi from "strapi-sdk-javascript/build/main";
import Page from "../Page";
import BeforeAfterSlider from "react-before-after-slider";
import { handleSuccess } from "../helpers/toasts";
import { addToCart } from "../../actions/cartActions";
import "react-toastify/dist/ReactToastify.css";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);
const FILES_FOLDER = "../../files/images/filter";
const FILES_FOLDER_BEFORE = FILES_FOLDER + "/before/";
const FILES_FOLDER_AFTER = FILES_FOLDER + "/after/";
class FilterDetail extends React.Component {
  state = {
    filter: "",
  };

  async componentDidMount() {
    try {
      const res = await strapi.request("POST", "/graphql", {
        data: {
          query: `{
            filter(id: "${this.props.match.params.filterId}") {
              _id
              name
              price
              description
              image_before
              image_after
            }
          }`,
        },
      });
      setTimeout(
        () =>
          this.setState({
            filter: res.data.filter,
          }),
        50
      );
    } catch (err) {
      this.props.history.push("/404");
    }
  }

  handleShoppingClick = (id, price, name) => {
    this.props.addToCart(id, price, name);
    handleSuccess(`Added ${name} to cart!`);
  };

  render() {
    const filter = this.state.filter;
    const { _id, price, name, image_before, image_after, description } = filter;
    const BEFORE = `${FILES_FOLDER_BEFORE}${image_before}.jpg`;
    const AFTER = `${FILES_FOLDER_AFTER}${image_after}.jpg`;
    const isTablet = this.props.isTablet;
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              minWidth: WIDTH,
              marginTop: isTablet ? 10 : 20,
            }}
          >
            <Button onClick={() => this.handleShoppingClick(_id, price, name)}>
              <Icon name="shopping cart" />
              {price}€
            </Button>
          </div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id, price, name) => {
      dispatch(addToCart(id, price, name));
    },
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(FilterDetail);
