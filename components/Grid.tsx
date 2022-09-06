import { Fragment } from "react";
import Stripe from "stripe";

interface Props {
  packs: Stripe.Product[];
  prices: Stripe.Price[];
  ordered: boolean;
}

const Grid = ({ packs, prices, ordered = false }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2"></div>
  );
};

export default Grid;
