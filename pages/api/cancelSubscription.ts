import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { configs } from "../../configs/indext";

const stripe = new Stripe(configs.stripe_pk, { apiVersion: "2022-08-01" });

interface Props {
  message?: string;
}

export default async function createCheckoutSession(
  req: NextApiRequest,
  res: NextApiResponse<Props>
) {
  const { id } = req.body;

  try {
    await stripe.subscriptions.del(id);

    res.status(200).json({ message: "Assinatura cancelada com sucesso" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Ocorreu um erro inesperado durante o processo" });
  }
}
