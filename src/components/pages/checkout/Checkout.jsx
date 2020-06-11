import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import Page from "../../Page";
import { Button, Table } from "semantic-ui-react";
import "react-toastify/dist/ReactToastify.css";
import PaymentForm from "./PaymentForm";
import Spacer from "../../Spacer";

const sumTotal = (cart) => {
  let total = 0;
  cart.items.map((i) => (total = total + i.quantity * i.price));
  return total;
};

const checkoutWidth = (isTablet) => (isTablet ? 300 : 500);

const itemsInCart = (cart) => sumTotal(cart) > 0;
class Checkout extends React.Component {
  state = {};

  checkoutTableRow = (item) => {
    const { price, name } = item;
    return (
      <Table.Row>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>{`${price}€`}</Table.Cell>
      </Table.Row>
    );
  };

  noItems = () => {
    const isTablet = this.props.isTablet;
    let minWidth = checkoutWidth(isTablet);
    return (
      <>
        <div style={{ minWidth }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 5,
            }}
          >
            No items added yet {"  "}
            <span role="img" aria-label="broken-heart">
              💔
            </span>
          </div>
          <Spacer space={10} />
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
            />
          )}
        </Table>
      </div>
    );
  };

  build = (cart) => (itemsInCart(cart) ? this.checkoutTable() : this.noItems());

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

export default compose(withRouter, connect(mapStateToProps))(Checkout);
