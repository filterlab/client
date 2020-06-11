import Stripe from "stripe";

const sk =
  process.env.REACT_APP_STRIPE_SK ||
  "sk_test_51Gsr1UEhqd6TMPqxMno8ObEzWAwl2rlb51fDxU4RdcczoH08RliydoVd3u1VOE5jtfva3VPXRLjVPSNttluFNCiY007baINslL";
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
