import React from "react";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Cart = (props) =>
  props.isAuthed ? (
    <Link
      to="/checkout"
      style={{ color: "inherit", textDecoration: "inherit", margin: 1 }}
    >
      <Icon
        name={props.cart.items.length > 0 ? "cart plus" : "cart"}
        size="big"
        color="grey"
      />
    </Link>
  ) : (
    <Link
      to="/checkout_login"
      style={{ color: "inherit", textDecoration: "inherit", margin: 1 }}
    >
      <Icon
        name={props.cart.items.length > 0 ? "cart plus" : "cart"}
        size="big"
        color="grey"
      />
    </Link>
  );

function mapStateToProps(state) {
  return {
    isAuthed: state.auth.key,
    cart: state.cart,
  };
}

export default connect(mapStateToProps)(Cart);
