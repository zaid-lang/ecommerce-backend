const express = require("express");
const Stripe = require("stripe");
require("dotenv").config();

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Endpoint to create a Payment Intent
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency } = req.body; // amount should be in cents, currency like 'usd'
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe Error:", error.message);
    res.status(500).json({ error: "Failed to create payment intent" });
  }
});

module.exports = router;
