import React from "react";
import Checkout from "./Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PK ||
    "pk_test_51Gsr1UEhqd6TMPqxtAzXV2xYzhOAlHxRS6zXwIDCixoFD7vyQrmee7QTzQcj26crKLanSb6gMnj6EXkrt6HtU2FD00IDTzkjQn"
);

const InjectedCheckoutForm = () => (
  <Elements stripe={stripePromise}>
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <Checkout stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  </Elements>
);

export default InjectedCheckoutForm;
