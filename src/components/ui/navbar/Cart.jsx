import React from "react";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Cart = (props) => (
  <Link
    to={props.isAuthed ? "/checkout" : "/checkout_login"}
    style={{ color: "inherit", textDecoration: "inherit" }}
  >
    <div
      style={{
        color: "white",
        fontSize: 8,
        position: "relative",
        top: -3,
        left: 12.5,
        width: 15,
        height: 15,
        borderRadius: "50%",
        background: "red",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {props.cart.items.length}
    </div>
    <div style={{ marginTop: -11 }}>
      <Icon name={"cart"} size="big" color="black" />
    </div>
  </Link>
);

function mapStateToProps(state) {
  return {
    isAuthed: state.auth.key,
    cart: state.cart,
  };
}

export default connect(mapStateToProps)(Cart);
