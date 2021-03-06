import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { Button, Table, Icon, Divider } from "semantic-ui-react";
import PaymentForm from "./PaymentForm";
import Page from "../../ui/Page";
import Spacer from "../../ui/Spacer";
import Empty from "../../ui/Empty";
import Loader from "../../ui/Loader";
import Hover from "../../ui/Hover";
import { removeItem } from "../../../actions/cartActions";
import { formatCurrency } from "../../helpers/currency";
import "react-toastify/dist/ReactToastify.css";
import PaymentLogos from "./PaymentLogos";

const sumTotal = (cart) => {
  let total = 0;
  cart.items.map((i) => (total = total + i.quantity * i.price));
  return total;
};

const checkoutWidth = (isTablet) => (isTablet ? 300 : 500);

const itemsInCart = (cart) => sumTotal(cart) > 0;
class Checkout extends React.Component {
  state = { loadingCollections: false };

  checkoutTableRow = (item) => {
    const { price, name, id } = item;
    return (
      <Table.Row>
        <Table.Cell>
          {
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {name}
              <Hover>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => this.props.removeItem(id, price, name)}
                >
                  <Icon circular name="delete" />
                </span>
              </Hover>
            </div>
          }
        </Table.Cell>
        <Table.Cell>
          {formatCurrency(price, this.props.cart.currency)}
        </Table.Cell>
      </Table.Row>
    );
  };

  noItems = () => {
    const isTablet = this.props.isTablet;
    let minWidth = checkoutWidth(isTablet);
    return (
      <>
        <div style={{ minWidth }}>
          <Spacer space={100} />
          <Empty message="No items added yet" />
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
          <Spacer space={20} />
          <Divider />
          <PaymentLogos />
        </div>
      </>
    );
  };

  checkoutTable = () => {
    const cart = this.props.cart;
    const isTablet = this.props.isTablet;
    return (
      <div style={{ minWidth: checkoutWidth(isTablet) }}>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Product</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {cart.items.map((item) => this.checkoutTableRow(item))}
          </Table.Body>

          {itemsInCart(cart) && (
            <PaymentForm
              history={this.props.history}
              error={this.state.error}
              filters={cart.items}
              total={sumTotal(cart)}
              setLoadingCollections={() =>
                this.setState({
                  loadingCollections: true,
                })
              }
            />
          )}
        </Table>
        <Spacer space={20} />
        <Divider />
        <PaymentLogos />
      </div>
    );
  };

  build = (cart) =>
    this.state.loadingCollections ? (
      <Loader />
    ) : itemsInCart(cart) ? (
      this.checkoutTable()
    ) : (
      this.noItems()
    );

  render() {
    const cart = this.props.cart;
    return (
      <Page
        header={"Checkout"}
        loading={false}
        loadingMessage={"Redirecting to checkout cart"}
        body={this.build(cart)}
      />
    );
  }
}
function mapStateToProps(state) {
  return {
    isTablet: state.responsive.isTablet,
    isAuthed: state.auth.key,
    cart: state.cart,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (id, price, name) => {
      dispatch(removeItem(id, price, name));
    },
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Checkout);
