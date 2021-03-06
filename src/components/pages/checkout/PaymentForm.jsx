import React, { useState } from "react";
import { connect } from "react-redux";
import Strapi from "strapi-sdk-javascript/build/main";
import { Button, Table } from "semantic-ui-react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { handleSuccess, handleError } from "../../helpers/toasts";
import { formatCurrency } from "../../helpers/currency";
import { clearCart } from "../../../actions/cartActions";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

const SUCCESS_MESSAGE = "Payment successful! Redirecting to Collections.";
const FAILURE_MESSAGE = "Please check your billing details and try again.";

const PaymentForm = ({
  currency,
  history,
  error,
  filters,
  total,
  clearCart,
  setLoadingCollections,
}) => {
  const [loading, setLoading] = useState(false);
  const elements = useElements();
  const stripe = useStripe();

  const onSuccess = () => {
    setLoading(false);
    setLoadingCollections();
    handleSuccess(SUCCESS_MESSAGE);
    clearCart();
    setTimeout(() => history.push("/collections"), 2000);
  };
  const onFailure = () => {
    setLoading(false);
    handleError(FAILURE_MESSAGE);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const paymentMethodReq = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (paymentMethodReq.error) {
      onFailure();
    } else if (
      paymentMethodReq &&
      paymentMethodReq.paymentMethod &&
      paymentMethodReq.paymentMethod.id
    ) {
      const id = paymentMethodReq.paymentMethod.id;

      // eslint-disable-next-line
      await strapi
        .createEntry("orders", {
          amount: total * 100,
          filters,
          id,
          currency,
        })
        .then(() => onSuccess())
        .catch(() => onFailure());
    }
  };

  const form = () => (
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan="3">
          <div style={{ minHeight: 30 }}>{<CardElement hidePostalCode />}</div>
          <Button
            loading={loading}
            disabled={!stripe || error}
            onClick={(e) => handleSubmit(e)}
            type="submit"
          >
            {`Checkout ${formatCurrency(total, currency)}`}
          </Button>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  );

  return form();
};
function mapStateToProps(state) {
  return {
    email: state.auth.email,
    currency: state.cart.currency,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => {
      dispatch(clearCart());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm);
