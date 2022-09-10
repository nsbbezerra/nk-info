import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { configs } from "../../configs/indext";

const stripe = new Stripe(configs.stripe_pk, { apiVersion: "2022-08-01" });

interface Props {
  url?: string;
  id?: string;
  message?: string;
}

export default async function createCheckoutSession(
  req: NextApiRequest,
  res: NextApiResponse<Props>
) {
  const { price } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      success_url: "https://nkinfo.com.br",
      cancel_url: "https://nkinfo.com.br",
      line_items: [{ price: price.id, quantity: 1 }],
      mode: "subscription",
    });
    res.status(201).json({
      url: session.url as string,
      id: session.id as string,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Ocorreu um erro inesperado durante o processo" });
  }
}
