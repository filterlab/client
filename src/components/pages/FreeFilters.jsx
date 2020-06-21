import React from "react";
import { withRouter } from "react-router-dom";
import Strapi from "strapi-sdk-javascript/build/main";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Filter from "../cards/Filter";
import FilterDetail from "./FilterDetail";
import ModalCloseIcon from "../ui/ModalCloseIcon";
import { Header } from "semantic-ui-react";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

class FreeFilters extends React.Component {
  state = {
    open: false,
    filters: [],
  };
  onCloseModal = () => {
    this.setState({ open: false, filterDetail: "" });
  };
  onOpenModal = (filterDetail) => {
    this.setState({
      open: true,
      filterDetail,
    });
  };
  async componentDidMount() {
    await strapi
      .request("POST", "/graphql", {
        data: {
          query: `query {
              filters(where: { price_eq: 0 }) {
                categoryId
                _id
                name
                description
                price
              }
          }`,
        },
      })
      .then((res) =>
        this.setState({
          filters: res.data.filters,
        })
      )
      .catch(() => this.props.history.push("/404"));
  }
  render() {
    const { filters } = this.state;

    return (
      <>
        <center>
          <div style={{ marginTop: 20 }} />
          <Header as="h2">
            {new Date().toLocaleString("default", { month: "long" })}'s FREE
            preset
          </Header>
        </center>
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
              categoryId={b.categoryId}
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
      </>
    );
  }
}
export default withRouter(FreeFilters);
