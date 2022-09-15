import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { configs } from "../../configs/indext";

const stripe = new Stripe(configs.stripe_pk, { apiVersion: "2022-08-01" });

type Props = {
  checkout?: Stripe.Checkout.Session;
  message?: string;
};

export default async function listCheckoutSessionDetails(
  req: NextApiRequest,
  res: NextApiResponse<Props>
) {
  const { id } = req.body;
  const checkout = await stripe.checkout.sessions.retrieve(id as string);
  res.status(200).json({ checkout: checkout });
  try {
  } catch (error) {
    res
      .status(400)
      .json({ message: "Ocorreu um erro inesperado durante o processo" });
  }
}
