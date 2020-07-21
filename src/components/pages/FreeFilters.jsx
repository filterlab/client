import React from "react";
import { withRouter } from "react-router-dom";
import Strapi from "strapi-sdk-javascript/build/main";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Filter from "../cards/Filter";
import FilterDetail from "./FilterDetail";
import ModalCloseIcon from "../ui/ModalCloseIcon";
import Loader from "../ui/Loader";
import { Header, Card } from "semantic-ui-react";
import Spacer from "../ui/Spacer";

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
              filters(where: { free_eq: true }) {
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
      <div>
        <center>
          <div style={{ marginTop: 20 }} />
          <Card>
            <Card.Content>
              <Header as="h2">
                {new Date().toLocaleString("en-GB", { month: "long" })}'s FREE
                preset
              </Header>
            </Card.Content>
          </Card>
        </center>
        <Spacer space={15} />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          {filters && filters.length > 0 ? (
            filters.map((b, i) => (
              <Filter
                onOpenModal={() => this.onOpenModal(b)}
                categoryId={b.categoryId}
                filter={b}
                index={i}
                apiUrl={apiUrl}
              />
            ))
          ) : (
            <Loader />
          )}
          <Modal
            open={this.state.open}
            onClose={this.onCloseModal}
            center
            closeIcon={<ModalCloseIcon />}
          >
            <FilterDetail filter={this.state.filterDetail} />
          </Modal>
        </div>
      </div>
    );
  }
}
export default withRouter(FreeFilters);
