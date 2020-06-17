import React from "react";
import { withRouter } from "react-router-dom";
import Strapi from "strapi-sdk-javascript/build/main";
import { Icon } from "semantic-ui-react";
import "react-responsive-modal/styles.css";
import FilterDetail from "./FilterDetail";
import { Modal } from "react-responsive-modal";
import Filter from "../cards/Filter";
import Page from "../ui/Page";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);
const closeIcon = (
  <div style={{ marginTop: 90 }}>
    <Icon name="delete" size="big" />
  </div>
);
class Filters extends React.Component {
  state = {
    name: "",
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
              filters {
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
        })
      )
      .catch(() => this.props.history.push("/404"));
  }

  render() {
    const { filters, name, categoryId } = this.state;
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
            closeIcon={closeIcon}
          >
            <FilterDetail filter={this.state.filterDetail} />
          </Modal>
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

export default withRouter(Filters);
