import Image from "next/image";
import Link from "next/link";
import { Fragment, useContext } from "react";
import { BiLogIn, BiSave, BiShoppingBag } from "react-icons/bi";
import Footer from "../../components/Footer";
import HeadApp from "../../components/Head";
import Header from "../../components/Header";
import ClientContext from "../../context/client";
import Stripe from "stripe";
import { configs } from "../../configs/indext";
import { GetServerSideProps, NextPage } from "next";
import Button from "../../components/layout/Button";

const stripe = new Stripe(configs.stripe_pk, {
  apiVersion: "2022-08-01",
});

interface Props {
  product: Stripe.Product;
  price: Stripe.Price;
}

const Checkout: NextPage<Props> = ({ product, price }) => {
  const { state: clientState, setState: setClientState } =
    useContext(ClientContext);

  const calcReal = (amount: number) => {
    let calc = amount / 100;
    return calc.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
  };

  return (
    <Fragment>
      <HeadApp title="NK Informática | Checkout" />
      <Header />
      <section className="w-full bg-gradient-to-b from-blue-300 to-sky-100 rounded-br-[70px] lg:rounded-br-[150px] p-5 relative overflow-hidden">
        <div className="container mx-auto z-10 py-10 text-center w-full flex justify-center">
          <h1 className="text-sky-900 text-lg sm:text-2xl md:text-3xl font-bold text-center max-w-5xl z-10">
            CHECKOUT
          </h1>
        </div>
      </section>

      {!clientState.id ? (
        <div className="container mx-auto max-w-3xl pt-16 px-10">
          <div className="flex items-center justify-center flex-col gap-2">
            <div className="w-[280px]">
              <Image
                draggable={false}
                src={"/img/pc.png"}
                width={600}
                height={450}
                alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                layout="responsive"
                objectFit="contain"
              />
            </div>

            <span className="text-3xl text-gray-800 font-bold text-center">
              Não encontramos você!
            </span>
            <span className="text-gray-700 text-center">
              Escolha uma opção abaixo
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-10">
            <Link href={`/login?redirect=${product.id}`} passHref>
              <a className="w-full shadow rounded-md flex flex-col justify-center items-center p-5 text-2xl gap-3 bg-sky-100 text-sky-700 font-bold select-none cursor-pointer hover:bg-sky-200 active:bg-sky-100">
                <BiLogIn className="text-5xl" />
                Fazer Login
              </a>
            </Link>
            <Link href={`/cadastro?redirect=${product.id}`} passHref>
              <a className="w-full shadow rounded-md flex flex-col justify-center items-center p-5 text-2xl gap-3 bg-green-100 text-green-700 font-bold select-none cursor-pointer hover:bg-green-200 active:bg-sky-100">
                <BiSave className="text-5xl" />
                Cadastre-se
              </a>
            </Link>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-10 max-w-4xl mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="overflow-hidden bg-white border rounded-md shadow">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Meus Dados
                </h3>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Nome</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {clientState.name}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Telefone
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {clientState.phone}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {clientState.email || ""}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Endereço
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {clientState.street}, {clientState.number},{" "}
                      {clientState.district}, CEP:{clientState.cep},{" "}
                      {clientState.city} - {clientState.state}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <div
            className="rounded-md shadow border p-5 w-full flex flex-col items-center bg-white h-fit"
            key={product.id}
          >
            <span className="text-gray-700 text-lg text-center font-bold">
              {product.name}
            </span>

            <div className="w-3/4 relative my-5">
              <div className="bg-blue-300 rounded-md h-14 -rotate-6" />
              <div className="bg-blue-900 rounded-md h-14 z-20 absolute w-full top-0 right-0 left-0 bottom-0 flex items-center justify-center font-bold text-xl text-white text-center">
                {calcReal(price?.unit_amount as number)}
                /mês
              </div>
            </div>

            <div className="grid grid-cols-1 divide-y w-full my-5">
              <p className="py-2 text-center">
                {product.metadata?.details_one || ""}
              </p>
              <p className="py-2 text-center">
                {product.metadata?.details_two || ""}
              </p>
              <p className="py-2 text-center">
                {product.metadata?.details_three || ""}
              </p>
              <p className="py-2 text-center">
                {product.metadata?.details_four || ""}
              </p>
              <p className="py-2 text-center">
                {product.metadata?.details_five || ""}
              </p>
            </div>

            <Button icon={<BiShoppingBag />} buttonSize="lg" isFullSize>
              CONTRATAR
            </Button>
          </div>
        </div>
      )}

      <Footer />
    </Fragment>
  );
};

export default Checkout;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const product = params?.product || "";

  const myProduct = await stripe.products.retrieve(product as string);
  const price = await stripe.prices.retrieve(myProduct.default_price as string);

  return {
    props: {
      product: myProduct,
      price,
    },
  };
};
