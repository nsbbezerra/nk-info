import { Fragment } from "react";
import { BiEdit } from "react-icons/bi";
import Footer from "../components/Footer";
import HeadApp from "../components/Head";
import Header from "../components/Header";
import LottieComponent from "../components/Lottie";
import * as ecommerce from "../assets/ecommerce.json";
import Stripe from "stripe";
import { configs } from "../configs/indext";
import { GetStaticProps, NextPage } from "next";

const stripe = new Stripe(configs.stripe_pk, {
  apiVersion: "2022-08-01",
});

interface Props {
  packs: Stripe.Product[];
  prices: Stripe.Price[];
}

const Ecommerce: NextPage<Props> = ({ packs, prices }) => {
  const calcReal = (amount: number) => {
    let calc = amount / 100;
    return calc.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
  };

  return (
    <Fragment>
      <HeadApp title="Ecommerce por assinatura - NK Informática" />
      <Header />

      <section className="w-full bg-gray-100 rounded-br-[70px] lg:rounded-br-[150px] p-5">
        <div className="container mx-auto flex flex-col items-center justify-center gap-3">
          <div className="w-1/2 md:w-72 lg:w-80">
            <LottieComponent
              animation={ecommerce}
              width="100%"
              height={"100%"}
            />
          </div>
          <h1 className="text-sky-900 text-lg sm:text-2xl md:text-3xl font-bold text-center max-w-5xl">
            LOJA VIRTUAL COM UM SISTEMA DE GESTÃO COMPLETO, PAGAMENTOS, NOTAS
            FISCAIS, VENDAS ONLINE E PRESENCIAL
          </h1>
          <span className="text-center text-gray-700 text-base lg:text-lg">
            Venda 24 horas por dia!
          </span>
        </div>
      </section>

      <div className="container mx-auto px-10 lg:px-20"></div>

      <section className="container mx-auto px-10 lg:px-20 mt-16">
        <div className="w-full flex flex-col gap-2 mb-16">
          <h2 className="text-4xl font-bold text-sky-700">Loja Online</h2>
          <p className="text-justify mt-4 text-xl">
            Tenha sua própria loja virtual, com um layout próprio, com suas
            cores, sua marca, e com um sistema de gestão completo para você
            ficar tranquilo em todos os passos da sua venda, veja o que o{" "}
            <strong>Nosso Ecommerce</strong> pode te oferecer:
          </p>

          <ul className="list-disc list-inside text-lg text-gray-700">
            <li>Gestão de Clientes</li>
            <li>Gestão de Produtos</li>
            <li>Gestão de Vendas, caixa, PDV</li>
            <li>Pagamentos Automatizados: PIX, Cartão, Boleto, Duplicata</li>
            <li>Emissão de Nota Fiscal</li>
            <li>Suporte e Consultoria Contábil</li>
            <li>
              Gestão e impulsionamento de vendas online, pelas melhores
              plataformas e redes sociais
            </li>
          </ul>
        </div>

        <div className="text-center w-full flex items-center flex-col gap-2">
          <h2 className="text-4xl font-bold">Planos</h2>
          <div className="w-32 bg-gradient-to-r from-blue-400 to-sky-700 h-1 rounded-[50%]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-10">
          {packs
            .filter((obj) => obj.metadata.category === "ecommerce")
            .sort(
              (a, b) => parseInt(a.metadata.order) - parseInt(b.metadata.order)
            )
            .map((prod) => (
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
      </section>
      <Footer />
    </Fragment>
  );
};

export default Ecommerce;

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
