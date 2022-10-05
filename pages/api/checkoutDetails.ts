import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { configs } from "../../configs/indext";

const stripe = new Stripe(configs.stripe_pk, { apiVersion: "2022-08-01" });

type Props = {
  checkout?: Stripe.Checkout.Session;
  message?: string;
  subscription?: Stripe.Subscription | null;
  items?: Stripe.SubscriptionItem | null;
  product?: Stripe.Product | null;
};

export default async function listCheckoutSessionDetails(
  req: NextApiRequest,
  res: NextApiResponse<Props>
) {
  const { id } = req.body;
  const checkout: Stripe.Checkout.Session =
    await stripe.checkout.sessions.retrieve(id as string);
  if (!checkout.subscription) {
    res.status(200).json({ checkout: checkout, subscription: null });
  } else {
    const subscription = await stripe.subscriptions.retrieve(
      checkout.subscription as string
    );
    const items: Stripe.SubscriptionItem = subscription.items.data[0];
    const product = await stripe.products.retrieve(
      items.plan.product as string
    );
    res
      .status(200)
      .json({ checkout: checkout, subscription: subscription, product });
  }
  try {
  } catch (error) {
    res
      .status(400)
      .json({ message: "Ocorreu um erro inesperado durante o processo" });
  }
}
