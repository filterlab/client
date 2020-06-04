import React from "react"
import Checkout from "./Checkout"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, ElementsConsumer } from "@stripe/react-stripe-js"

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PK || "pk_test_C0GqP99IZuCIhm5CRPqBML8N00VFfgsUFL"
)

const InjectedCheckoutForm = () => (
  <Elements stripe={stripePromise}>
    <ElementsConsumer>
      {({ stripe, elements }) => <Checkout stripe={stripe} elements={elements} />}
    </ElementsConsumer>
  </Elements>
)

export default InjectedCheckoutForm
