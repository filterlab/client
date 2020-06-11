import React, { useState } from "react";
import { connect } from "react-redux";
import Strapi from "strapi-sdk-javascript/build/main";
import { handleSuccess, handleError } from "../../helpers/toasts";
import { Button, Table } from "semantic-ui-react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

const SUCCESS_MESSAGE = "Payment successful! Redirecting to Collections.";
const FAILURE_MESSAGE = "Please check your billing details and try again.";

const PaymentForm = ({ history, error, filters, total }) => {
  const [loading, setLoading] = useState(false);
  const elements = useElements();
  const stripe = useStripe();

  const onSuccess = () => {
    setLoading(false);
    handleSuccess(SUCCESS_MESSAGE);
    setTimeout(() => history.push("/collections"), 3500);
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

    const id = paymentMethodReq.paymentMethod.id;

    try {
      // eslint-disable-next-line
      await strapi.createEntry("orders", {
        amount: total * 100,
        filters,
        id,
      });
      onSuccess();
    } catch {
      onFailure();
    }
  };

  return (
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
            {`Checkout ${total}€`}
          </Button>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  );
};
function mapStateToProps(state) {
  return {
    email: state.auth.email,
  };
}

export default connect(mapStateToProps)(PaymentForm);
