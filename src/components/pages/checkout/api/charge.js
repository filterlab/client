import Stripe from "stripe";

const sk =
  process.env.REACT_APP_STRIPE_SK ||
  "sk_test_s8mmMGNJEq7H7T59OG5MOnSL00b2bcvNdS";
const stripe = new Stripe(sk);

export default async (req, res) => {
  const { id, amount } = req.body;

  try {
    await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      description: `${Date.now()} - ${amount} `,
      payment_method: id,
      confirm: true,
    });

    return res.status(200).json({
      confirm: "success",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
