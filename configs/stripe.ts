import Stripe from "stripe";
import { configs } from "./indext";

const pk = process.env.STRIPE_PK || configs.stripe_pk;
console.log(pk);
const stripe = new Stripe(pk, {
  apiVersion: "2022-08-01",
});

export { stripe };
