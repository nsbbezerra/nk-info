import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { configs } from "../../configs/indext";

const stripe = new Stripe(configs.stripe_pk, { apiVersion: "2022-08-01" });

type Props = {
  subscription?: Stripe.Subscription;
  message?: string;
};

export default async function listSubscriptionDetails(
  req: NextApiRequest,
  res: NextApiResponse<Props>
) {
  const { id } = req.body;

  try {
    const subscription = await stripe.subscriptions.retrieve(id);

    res.status(200).json({ subscription });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Ocorreu um erro inesperado durante o processo" });
  }
}
