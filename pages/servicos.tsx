import { GetStaticProps, NextPage } from "next";
import { Fragment, useEffect, useState } from "react";
import { BsTags } from "react-icons/bs";
import Footer from "../components/Footer";
import HeadApp from "../components/Head";
import Header from "../components/Header";

import Stripe from "stripe";
import { configs } from "../configs/indext";
import { BiEdit } from "react-icons/bi";

const stripe = new Stripe(configs.stripe_pk, {
  apiVersion: "2022-08-01",
});

interface Props {
  packs: Stripe.Product[];
  prices: Stripe.Price[];
}

type SearchProps = {
  text: "ti" | "marketing" | "sites" | "shopping";
};

const Servicos: NextPage<Props> = ({ packs, prices }) => {
  const [search, setSearch] = useState<SearchProps>({ text: "ti" });
  const [myPacks, setMyPacks] = useState<Stripe.Product[]>([]);

  useEffect(() => {
    if (search.text === "ti") {
      const result = packs.filter((obj) => obj.metadata.category === "ti");
      setMyPacks(result);
    }
    if (search.text === "marketing") {
      const result = packs.filter(
        (obj) => obj.metadata.category === "marketing"
      );
      setMyPacks(result);
    }
    if (search.text === "sites") {
      const result = packs.filter((obj) => obj.metadata.category === "sites");
      setMyPacks(result);
    }
    if (search.text === "shopping") {
      const result = packs.filter(
        (obj) => obj.metadata.category === "ecommerce"
      );
      setMyPacks(result);
    }
  }, [search, packs]);

  const calcReal = (amount: number) => {
    let calc = amount / 100;
    return calc.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
  };

  return (
    <Fragment>
      <HeadApp title="NK Informática | Serviços" />
      <Header />
      <section className="w-full bg-gradient-to-b from-blue-300 to-sky-100 rounded-br-[70px] lg:rounded-br-[150px] p-5 relative overflow-hidden">
        <div className="container mx-auto z-10 py-10 text-center w-full flex justify-center">
          <h1 className="text-sky-900 text-lg sm:text-2xl md:text-3xl font-bold text-center max-w-5xl z-10">
            NOSSOS PLANOS E SERVIÇOS
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-10 lg:px-20 py-16">
        <span>Escolha uma opção:</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 sm:divide-x divide-y lg:divide-y-0 rounded-md border shadow-md overflow-hidden">
          <button
            className={`flex items-center px-3 py-3 gap-3 justify-center w-full ${
              search.text === "ti"
                ? "bg-sky-700 border-0 text-white hover:bg-sky-800 active:bg-sky-700"
                : "hover:bg-sky-100 active:bg-sky-200"
            }`}
            onClick={() => setSearch({ text: "ti" })}
          >
            <BsTags />
            Manutenção em TI
          </button>
          <button
            className={`flex items-center px-3 py-3 gap-3 justify-center w-full ${
              search.text === "marketing"
                ? "bg-sky-700 border-0 text-white hover:bg-sky-800 active:bg-sky-700"
                : "hover:bg-sky-100 active:bg-sky-200"
            }`}
            onClick={() => setSearch({ text: "marketing" })}
          >
            <BsTags />
            Marketing Digital
          </button>
          <button
            className={`flex items-center px-3 py-3 gap-3 justify-center w-full ${
              search.text === "sites"
                ? "bg-sky-700 border-0 text-white hover:bg-sky-800 active:bg-sky-700"
                : "hover:bg-sky-100 active:bg-sky-200"
            }`}
            onClick={() => setSearch({ text: "sites" })}
          >
            <BsTags />
            Sites e Desenvolvimento
          </button>
          <button
            className={`flex items-center px-3 py-3 gap-3 justify-center w-full ${
              search.text === "shopping"
                ? "bg-sky-700 border-0 text-white hover:bg-sky-800 active:bg-sky-700"
                : "hover:bg-sky-100 active:bg-sky-200"
            }`}
            onClick={() => setSearch({ text: "shopping" })}
          >
            <BsTags />
            E-commerce
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-10">
          {myPacks.map((prod) => (
            <div
              className="rounded-md shadow-lg border p-5 w-full flex flex-col items-center bg-white h-fit"
              key={prod.id}
            >
              <span className="text-gray-700 text-lg text-center font-bold">
                {prod.name}
              </span>

              <div className="w-3/4 relative my-5">
                <div className="bg-blue-300 rounded-md h-14 -rotate-6" />
                <div className="bg-blue-900 rounded-md h-14 z-20 absolute w-full top-0 right-0 left-0 bottom-0 flex items-center justify-center font-bold text-xl text-white text-center">
                  {calcReal(
                    prices.find((obj) => obj.id === prod.default_price)
                      ?.unit_amount as number
                  )}
                  /mês
                </div>
              </div>

              <div className="grid grid-cols-1 divide-y w-full my-5">
                <p className="py-2 text-center">
                  {prod.metadata?.details_one || ""}
                </p>
                <p className="py-2 text-center">
                  {prod.metadata?.details_two || ""}
                </p>
                <p className="py-2 text-center">
                  {prod.metadata?.details_three || ""}
                </p>
                <p className="py-2 text-center">
                  {prod.metadata?.details_four || ""}
                </p>
                <p className="py-2 text-center">
                  {prod.metadata?.details_five || ""}
                </p>
              </div>

              <button className="mt-3 bg-sky-700 rounded-md px-10 py-3 flex items-center gap-2 text-white hover:bg-sky-800 active:bg-sky-700 w-full justify-center">
                <BiEdit />
                CONTRATAR
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Servicos;

export const getStaticProps: GetStaticProps = async () => {
  const pack = await stripe.products.list({ limit: 20 });
  const price = await stripe.prices.list({ limit: 25 });

  const packs = pack.data;
  const prices = price.data;

  return {
    props: {
      packs,
      prices,
    },
    revalidate: 60,
  };
};
