import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { configs } from "../../configs/indext";

const stripe = new Stripe(configs.stripe_pk, { apiVersion: "2022-08-01" });

interface Props {
  invoice?: Stripe.Invoice;
  message?: string;
}

export default async function findInvoiceInfo(
  req: NextApiRequest,
  res: NextApiResponse<Props>
) {
  const { id } = req.body;

  try {
    const invoice = await stripe.invoices.retrieve(id);

    res.status(200).json({ invoice });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Ocorreu um erro inesperado durante o processo" });
  }
}
