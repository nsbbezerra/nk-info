import { Fragment } from "react";
import Footer from "../components/Footer";
import HeadApp from "../components/Head";
import Header from "../components/Header";
import {
  BiDesktop,
  BiEdit,
  BiLayout,
  BiMobile,
  BiSearch,
} from "react-icons/bi";
import { RiPagesLine } from "react-icons/ri";
import { AiOutlineCloudServer } from "react-icons/ai";
import Stripe from "stripe";
import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { stripe } from "../configs/stripe";

interface Props {
  packs: Stripe.Product[];
  prices: Stripe.Price[];
}

const Sites: NextPage<Props> = ({ packs, prices }) => {
  const calcReal = (amount: number) => {
    let calc = amount / 100;
    return calc.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
  };

  return (
    <Fragment>
      <HeadApp title="Sites por Assinatura - NK Informática" />
      <Header />

      <section className="w-full bg-gradient-to-b from-blue-300 to-sky-100 rounded-br-[70px] lg:rounded-br-[150px] p-5 relative overflow-hidden">
        <div className="container mx-auto flex flex-col items-center justify-center gap-3 z-10">
          <div className="w-1/2 md:w-72 lg:w-80">
            <Image
              draggable={false}
              src={"/img/web_site.svg"}
              width={1099}
              height={633}
              alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
              layout="responsive"
              objectFit="contain"
            />
          </div>
          <h1 className="text-sky-900 text-lg sm:text-2xl md:text-3xl font-bold text-center max-w-5xl z-10">
            CRIAÇÃO DE SITES POR ASSINATURA COM LAYOUTS PROFISSIONAIS, MODERNOS
            E COM UM VALOR QUE CABE NO SEU BOLSO
          </h1>
          <span className="text-center text-gray-700 text-base lg:text-lg z-10">
            Seu Negócio 24 horas no ar!
          </span>
        </div>
      </section>

      <div className="container mx-auto px-10 lg:px-20">
        <section className="w-full mt-16">
          <article>
            <div className="text-center w-full flex items-center flex-col gap-2">
              <h2 className="text-4xl font-bold">Por que ter um Site?</h2>
              <div className="w-32 bg-gradient-to-r from-blue-400 to-blue-600 h-1 rounded-[50%]" />
            </div>
            <p className="text-gray-700 text-center mt-5">
              Para que você ou seu negócio seja encontrado por seus clientes com
              mais facilidade na internet, com esta ferramenta você pode mostrar
              para um maior número de pessoas em qualquer lugar do mundo os seus
              projetos, suas criações, seu portfólio, suas idéias e muito mais.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 items-start">
              <div className="flex flex-col items-center justify-center gap-2">
                <BiLayout className="bg-sky-700 rounded-full h-16 w-16 p-2 text-white ring-4 ring-blue-300" />
                <span className="font-semibold text-gray-700 text-lg text-center">
                  DESIGN MODERNO
                </span>
                <span className="text-gray-600 text-center">
                  Layout moderno, bonito e atrativo para captar a atenção de
                  seus clientes
                </span>
              </div>

              <div className="flex flex-col items-center justify-center gap-2">
                <BiDesktop className="bg-sky-700 rounded-full h-16 w-16 p-2 text-white ring-4 ring-blue-300" />
                <span className="font-semibold text-gray-700 text-lg text-center">
                  TODOS OS NAVEGADORES
                </span>
                <span className="text-gray-600 text-center">
                  Seu site será visualizado sem quebras em todos os navegadores
                  do mercado (Google Chrome, Microsoft Edge, Firefox, Brave,
                  Safari, etc...)
                </span>
              </div>

              <div className="flex flex-col items-center justify-center gap-2">
                <BiMobile className="bg-sky-700 rounded-full h-16 w-16 p-2 text-white ring-4 ring-blue-300" />
                <span className="font-semibold text-gray-700 text-lg text-center">
                  SITE RESPONSIVO
                </span>
                <span className="text-gray-600 text-center">
                  Seu site se ajustará automaticamente a todos os tamanhos de
                  telas, Computador, Tablet e Celulares.
                </span>
              </div>

              <div className="flex flex-col items-center justify-center gap-2">
                <RiPagesLine className="bg-sky-700 rounded-full h-16 w-16 p-2 text-white ring-4 ring-blue-300" />
                <span className="font-semibold text-gray-700 text-lg text-center">
                  ONE PAGE
                </span>
                <span className="text-gray-600 text-center">
                  O conceito de One Page, é mostrar tudo o que deve ser exibido
                  para destacar um negócio em uma única página.
                </span>
              </div>

              <div className="flex flex-col items-center justify-center gap-2">
                <BiSearch className="bg-sky-700 rounded-full h-16 w-16 p-2 text-white ring-4 ring-blue-300" />
                <span className="text-gray-700 text-lg font-semibold text-center">
                  OTIMIZADO PARA BUSCAS
                </span>
                <span className="text-gray-600 text-center">
                  Seu site estará bem rankeado, visível em todos os motores de
                  busca (Google, Bing, Yahoo, etc...)
                </span>
              </div>

              <div className="flex flex-col items-center justify-center gap-2">
                <AiOutlineCloudServer className="bg-sky-700 rounded-full h-16 w-16 p-2 text-white ring-4 ring-blue-300" />
                <span className="font-semibold text-gray-700 text-lg text-center">
                  HOSPEDAGEM E DOMÍNIO
                </span>
                <span className="text-gray-600 text-center">
                  Seu site estará bem rankeado, visível em todos os motores de
                  busca (Google, Bing, Yahoo, etc...)
                </span>
              </div>
            </div>
          </article>
        </section>
      </div>

      <section className="w-full mt-16 bg-gray-100 rounded-br-[70px] lg:rounded-br-[150px] p-10 lg:p-14">
        <div className="container mx-auto px-10 lg:px-20">
          <div className="text-center w-full flex items-center flex-col gap-2 mb-10">
            <h2 className="text-4xl font-bold">Passo a Passo</h2>
            <div className="w-32 bg-gradient-to-r from-blue-400 to-blue-600 h-1 rounded-[50%]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
            <div className="flex flex-col items-center justify-center gap-3">
              <span className="bg-sky-700 rounded-full h-16 w-16 p-2 text-white ring-4 ring-blue-300 flex items-center justify-center text-3xl font-semibold">
                1
              </span>
              <span className="text-center text-gray-700">
                Escolha um plano, clique em <strong>CONTRATAR</strong>, logo
                após entraremos em contato com você.
              </span>
            </div>

            <div className="flex flex-col items-center justify-center gap-3">
              <span className="bg-sky-700 rounded-full h-16 w-16 p-2 text-white ring-4 ring-blue-300 flex items-center justify-center text-3xl font-semibold">
                2
              </span>
              <span className="text-center text-gray-700">
                Faremos uma entrevista para entendermos mais sobre as suas
                necessidades.
              </span>
            </div>

            <div className="flex flex-col items-center justify-center gap-3">
              <span className="bg-sky-700 rounded-full h-16 w-16 p-2 text-white ring-4 ring-blue-300 flex items-center justify-center text-3xl font-semibold">
                3
              </span>
              <span className="text-center text-gray-700">
                Desenvolvemos seu site e enviamos para que aprove ou solicite
                alguma alteração
              </span>
            </div>

            <div className="flex flex-col items-center justify-center gap-3">
              <span className="bg-sky-700 rounded-full h-16 w-16 p-2 text-white ring-4 ring-blue-300 flex items-center justify-center text-3xl font-semibold">
                4
              </span>
              <span className="text-center text-gray-700">
                Após a aprovação final do layout colocaremos seu site no ar!
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-10 lg:px-20 mt-16">
        <div className="text-center w-full flex items-center flex-col gap-2 mb-10">
          <h2 className="text-4xl font-bold">Planos</h2>
          <div className="w-32 bg-gradient-to-r from-blue-400 to-sky-700 h-1 rounded-[50%]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {packs
            .filter((obj) => obj.metadata.category === "sites")
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

export default Sites;

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
