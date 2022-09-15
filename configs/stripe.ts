import Stripe from "stripe";
import { configs } from "./indext";

const stripe = new Stripe(process.env.STRIPE_PK || configs.stripe_pk, {
  apiVersion: "2022-08-01",
});

export { stripe };
