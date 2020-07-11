import React from "react";
import Fade from "react-reveal/Fade";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Strapi from "strapi-sdk-javascript/build/main";
import { Icon } from "semantic-ui-react";
import "react-responsive-modal/styles.css";
import FilterDetail from "./FilterDetail";
import { Modal } from "react-responsive-modal";
import Filter from "../cards/Filter";
import Page from "../ui/Page";
import CategoryDropdown from "../ui/dropdowns/CategoryDropdown";
import CurrencyDropdown from "../ui/dropdowns/CurrencyDropdown";
import Spacer from "../ui/Spacer";
import ModalCloseIcon from "../ui/ModalCloseIcon";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

class Filters extends React.Component {
  state = {
    name: "",
    loading: true,
    filters: [],
    filterDetail: "",
    open: false,
  };
  onOpenModal = (filterDetail) => {
    this.setState({
      open: true,
      filterDetail,
    });
  };

  onCloseModal = () => {
    this.setState({ open: false, filterDetail: "" });
  };
  async componentDidMount() {
    const categoryId = this.props.match.params.categoryId;
    await strapi
      .request("POST", "/graphql", {
        data: {
          query: `query {
            category(id: "${categoryId}") {
              _id
              name
              filters(sort: "createdAt:asc"){
                _id
                name
                description
                price
              }
            }
          }`,
        },
      })
      .then((res) =>
        this.setState({
          categoryId: res.data.category._id,
          name: res.data.category.name,
          filters: res.data.category.filters,
          loading: false,
        })
      )
      .catch(() => this.props.history.push("/404"));
  }

  async componentDidUpdate() {
    if (this.props.match.params.categoryId !== this.state.categoryId) {
      const categoryId = this.props.match.params.categoryId;
      this.setState({
        loading: true,
        categoryId: this.props.match.params.categoryId,
      });
      await strapi
        .request("POST", "/graphql", {
          data: {
            query: `query {
            category(id: "${categoryId}") {
              _id
              name
              filters(sort: "createdAt:asc"){
                _id
                name
                description
                price
              }
            }
          }`,
          },
        })
        .then((res) =>
          this.setState({
            categoryId: res.data.category._id,
            name: res.data.category.name,
            filters: res.data.category.filters,
            loading: false,
          })
        )
        .catch(() => this.props.history.push("/404"));
    }
  }

  render() {
    const { filters, name, categoryId } = this.state;
    const build = () => {
      return (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CategoryDropdown categoryId={categoryId} />
            {this.props.isTablet && (
              <>
                <div style={{ minHeight: 5 }} />
                <CurrencyDropdown />
              </>
            )}
          </div>
          <Spacer space={20} />
          <div
            style={{
              fontWeight: 500,
              fontSize: 18,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span>
              Expand the images by pressing <Icon small name="expand" />
            </span>{" "}
            <span> and see what each preset can do</span>
          </div>
          <Spacer space={20} />
          <Fade spy={this.state.categoryId}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              {filters.map((b, i) => (
                <Filter
                  onOpenModal={() => this.onOpenModal(b)}
                  categoryId={categoryId}
                  filter={b}
                  index={i}
                  apiUrl={apiUrl}
                />
              ))}
              <Modal
                open={this.state.open}
                onClose={this.onCloseModal}
                center
                closeIcon={<ModalCloseIcon />}
              >
                <FilterDetail filter={this.state.filterDetail} />
              </Modal>
            </div>
          </Fade>
        </>
      );
    };
    return (
      <Page
        header={`${name}`}
        loading={this.state.loading}
        loadingMessage={"Loading filters"}
        body={build()}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isTablet: state.responsive.isTablet,
  };
};

export default compose(withRouter, connect(mapStateToProps, null))(Filters);
