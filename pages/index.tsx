import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { Fragment } from "react";
import HeadApp from "../components/Head";
import Header from "../components/Header";
import Panel from "../components/Panel";
import {
  BiEdit,
  BiChevronRight,
  BiMapPin,
  BiPhone,
  BiMailSend,
  BiCalendar,
  BiSend,
} from "react-icons/bi";
import Footer from "../components/Footer";
import Link from "next/link";
import Stripe from "stripe";
import { configs } from "../configs/indext";
import Button from "../components/layout/Button";

const stripe = new Stripe(configs.stripe_pk, {
  apiVersion: "2022-08-01",
});

interface Props {
  packs: Stripe.Product[];
  prices: Stripe.Price[];
}

const Home: NextPage<Props> = ({ packs, prices }) => {
  const calcReal = (amount: number) => {
    let calc = amount / 100;
    return calc.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
  };

  return (
    <Fragment>
      <HeadApp title="NK Informática | Sistemas Web, Gestão Comercial, Marketing Digital, Gestão de Redes Sociais" />
      <Header />
      <Panel />

      {/** SEÇÃO SOBRE NÓS */}

      <section className="container mx-auto py-16 px-10 lg:px-20" id="sobre">
        <div className="w-full">
          <div className="text-center w-full flex items-center flex-col gap-2">
            <h2 className="text-4xl font-bold">Sobre Nós!</h2>
            <div className="w-32 bg-gradient-to-r from-blue-400 to-blue-600 h-1 rounded-[50%]" />
          </div>
          <div className="text-center text-gray-600 mt-10">
            <p>
              Somos uma empresa desde 2017 focada em soluções na área de
              Tecnologia da Informação, estamos sempre em atualização tanto na
              nossa Stack de Desenvolvimento quanto nos ferramentais necessários
              para oferecer aos nossos clientes a maior confiabilidade nos
              nossos produtos e serviços.
            </p>
            <p>
              Temos orgulho em prestar um serviço qualificado, atendendo desde o
              pequeno até o grande empresário, trabalhamos para colocar sua
              empresa sempre bem visível, flúida, destravada e automatizada,
              nossas áreas de atuação são:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 mt-10 lg:grid-cols-3">
          <div className="w-full rounded-md p-3 grid grid-cols-3 items-center gap-3 bg-gray-400 bg-opacity-5 shadow h-32 -ml-5 lg:ml-0">
            <div className="w-[80px] min-w-[80px]">
              <Image
                draggable={false}
                src={"/img/maintenence.svg"}
                width={945}
                height={584}
                alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                layout="responsive"
                objectFit="contain"
              />
            </div>
            <div className="col-span-2 font-bold text-xl">
              Manutenção preventiva em TI
            </div>
          </div>
          <div className="w-full rounded-md p-3 grid grid-cols-3 items-center gap-3 bg-gray-400 bg-opacity-5 shadow lg:mt-5 h-32">
            <div className="w-[80px] min-w-[80px]">
              <Image
                draggable={false}
                src={"/img/social.svg"}
                width={552}
                height={554}
                alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                layout="responsive"
                objectFit="contain"
              />
            </div>
            <div className="col-span-2 font-bold text-xl">
              Marketing digital e Gestão de redes sociais
            </div>
          </div>
          <div className="w-full rounded-md p-3 grid grid-cols-3 items-center gap-3 bg-gray-400 bg-opacity-5 shadow h-32 lg:mt-10 ml-5 lg:ml-0">
            <div className="w-[80px] min-w-[80px]">
              <Image
                draggable={false}
                src={"/img/develop.svg"}
                width={787}
                height={573}
                alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                layout="responsive"
                objectFit="contain"
              />
            </div>
            <div className="col-span-2 font-bold text-xl">
              Desenvolvimento web, mobile e desktop
            </div>
          </div>
        </div>
      </section>

      {/** SEÇÃO DE ESPECIALIDADES */}

      <section className="w-full bg-gray-100 rounded-br-[70px] lg:rounded-br-[150px] p-10 lg:p-14">
        <div className="container mx-auto w-full h-full flex justify-end relative items-center flex-col lg:flex-row">
          <div className="w-[95%] lg:w-[58%] rounded-md bg-white shadow-xl lg:absolute h-fit z-10 left-0 p-7 flex flex-col gap-2">
            <h3 className="text-2xl sm:text-3xl font-bold">
              Somos especialistas em soluções de{" "}
              <span className="text-sky-700">negócios e serviços!</span>
            </h3>
            <p className="text-sm text-gray-600">
              Quando surge uma boa ideia, nosso trabalho é transformar em
              realidade, usando das melhores tecnologias disponíveis para que
              esta idéia seja alcançada pelo maior número de pessoas possíveis.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2">
              <div className="border rounded-md shadow-sm flex justify-between items-center flex-col">
                <div className="w-12 p-2 h-12">
                  <Image
                    draggable={false}
                    src={"/img/javascript.svg"}
                    width={200}
                    height={200}
                    alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <div className="border-t w-full p-1 text-center text-xs">
                  JavaScript
                </div>
              </div>

              <div className="border rounded-md shadow-sm flex justify-between items-center flex-col">
                <div className="w-12 h-12 p-2">
                  <Image
                    draggable={false}
                    src={"/img/typescript.svg"}
                    width={200}
                    height={200}
                    alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <div className="border-t w-full p-1 text-center text-xs">
                  TypeScript
                </div>
              </div>

              <div className="border rounded-md shadow-sm flex justify-between items-center flex-col">
                <div className="w-12 p-2">
                  <Image
                    draggable={false}
                    src={"/img/react.svg"}
                    width={225}
                    height={200}
                    alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <div className="border-t w-full p-1 text-center text-xs">
                  React JS
                </div>
              </div>

              <div className="border rounded-md shadow-sm flex justify-between items-center flex-col">
                <div className="w-12 h-12 p-2">
                  <Image
                    draggable={false}
                    src={"/img/react-native.svg"}
                    width={225}
                    height={200}
                    alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <div className="border-t w-full p-1 text-center text-xs">
                  React Native
                </div>
              </div>

              <div className="border rounded-md shadow-sm flex justify-between items-center flex-col">
                <div className="w-16 h-12 p-2">
                  <Image
                    draggable={false}
                    src={"/img/node.svg"}
                    width={330}
                    height={200}
                    alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <div className="border-t w-full p-1 text-center text-xs">
                  Node JS
                </div>
              </div>

              <div className="border rounded-md shadow-sm flex justify-between items-center flex-col">
                <div className="w-16 h-12 p-2">
                  <Image
                    draggable={false}
                    src={"/img/express.svg"}
                    width={360}
                    height={200}
                    alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <div className="border-t w-full p-1 text-center text-xs">
                  Express
                </div>
              </div>

              <div className="border rounded-md shadow-sm flex justify-between items-center flex-col">
                <div className="w-12 h-12 p-2">
                  <Image
                    draggable={false}
                    src={"/img/postgres.svg"}
                    width={200}
                    height={200}
                    alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <div className="border-t w-full p-1 text-center text-xs">
                  Posgres SQL
                </div>
              </div>

              <div className="border rounded-md shadow-sm flex justify-between items-center flex-col">
                <div className="w-28 h-12 p-2">
                  <Image
                    draggable={false}
                    src={"/img/mongo.svg"}
                    width={740}
                    height={200}
                    alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <div className="border-t w-full p-1 text-center text-xs">
                  Mongo DB
                </div>
              </div>

              <div className="border rounded-md shadow-sm flex justify-between items-center flex-col">
                <div className="w-20 h-12 p-2">
                  <Image
                    draggable={false}
                    src={"/img/next.svg"}
                    width={400}
                    height={200}
                    alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <div className="border-t w-full p-1 text-center text-xs">
                  Next JS
                </div>
              </div>

              <div className="border rounded-md shadow-sm flex justify-between items-center flex-col">
                <div className="w-20 h-12 p-2">
                  <Image
                    draggable={false}
                    src={"/img/nest.svg"}
                    width={400}
                    height={200}
                    alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <div className="border-t w-full p-1 text-center text-xs">
                  Nest JS
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="border rounded-md shadow-sm flex justify-between items-center flex-col">
                <div className="w-28 p-2 h-10">
                  <Image
                    draggable={false}
                    src={"/img/instagram.svg"}
                    width={680}
                    height={200}
                    alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <div className="border-t w-full p-1 text-center text-xs">
                  Instagram ADS
                </div>
              </div>
              <div className="border rounded-md shadow-sm flex justify-between items-center flex-col">
                <div className="w-36 p-2 h-10">
                  <Image
                    draggable={false}
                    src={"/img/facebook-ads.svg"}
                    width={1780}
                    height={240}
                    alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <div className="border-t w-full p-1 text-center text-xs">
                  Facebook ADS
                </div>
              </div>
              <div className="border rounded-md shadow-sm flex justify-between items-center flex-col">
                <div className="w-12 p-2 h-10">
                  <Image
                    draggable={false}
                    src={"/img/google-ads.svg"}
                    width={220}
                    height={200}
                    alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <div className="border-t w-full p-1 text-center text-xs">
                  Google ADS
                </div>
              </div>
            </div>
          </div>
          <div className="-mt-10 w-full lg:w-[45vw] rounded-md overflow-hidden sm:h-[450px] lg:h-fit lg:mt-0 xl:max-h-[500px]">
            <Image
              draggable={false}
              src={"/img/office.jpg"}
              width={1280}
              height={1020}
              alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
              layout="responsive"
              objectFit="cover"
            />
          </div>
        </div>
      </section>

      {/** SEÇÃO PACOTES DE MANUTENÇÃO */}

      <section className="mt-16 w-full" id="manutencao">
        <div className="container mx-auto px-10 lg:px-20">
          <div className="text-center w-full flex items-center flex-col gap-2 mb-10">
            <span className="text-gray-600">PARA EMPRESAS</span>
            <h2 className="text-4xl font-bold">Pacotes Manutenções em TI</h2>
            <div className="w-32 bg-gradient-to-r from-blue-400 to-blue-600 h-1 rounded-[50%]" />
            <p className="text-gray-600 text-sm max-w-screen-md">
              Montagem e Manutenção em Redes, Computadores, Impressoras,
              Roteadores, Modens, Switches, Hardwares, Softwares, Cabeamento,
              Som Ambiente e muito mais...
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {packs
              .filter((obj) => obj.metadata.category === "ti")
              .sort(
                (a, b) =>
                  parseInt(a.metadata.order) - parseInt(b.metadata.order)
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

                  <Link passHref href={`/checkout/${prod.id}`}>
                    <a className="mt-3 bg-sky-700 rounded-md px-10 py-3 flex items-center gap-2 text-white hover:bg-sky-800 active:bg-sky-700 w-full justify-center cursor-pointer">
                      <BiEdit />
                      CONTRATAR
                    </a>
                  </Link>
                </div>
              ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-20 justify-items-center">
            <div className="w-full sm:w-3/4 lg:w-full">
              <Image
                draggable={false}
                src={"/img/maintenence.svg"}
                width={945}
                height={584}
                alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                layout="responsive"
                objectFit="contain"
              />
            </div>

            <div className="lg:col-span-2">
              <h2 className="text-4xl font-bold">
                {packs.find((obj) => obj.metadata.category === "person")?.name}
              </h2>
              <p className="text-gray-600 text-sm max-w-screen-md mt-2">
                {
                  packs.find((obj) => obj.metadata.category === "person")
                    ?.description
                }
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center mb-5">
                <ul className="list-disc list-inside text-sm text-gray-600 mt-5">
                  <li>
                    {
                      packs.find((obj) => obj.metadata.category === "person")
                        ?.metadata.details_one
                    }
                  </li>
                  <li>
                    {
                      packs.find((obj) => obj.metadata.category === "person")
                        ?.metadata.details_two
                    }
                  </li>
                  <li>
                    {
                      packs.find((obj) => obj.metadata.category === "person")
                        ?.metadata.details_three
                    }
                  </li>
                  <li>
                    {
                      packs.find((obj) => obj.metadata.category === "person")
                        ?.metadata.details_four
                    }
                  </li>
                </ul>

                <div>
                  <span className="text-3xl md:text-4xl xl:text-5xl font-bold text-sky-700">
                    {calcReal(
                      prices.find(
                        (obj) =>
                          obj.id ===
                          packs.find(
                            (obj) => obj.metadata.category === "person"
                          )?.default_price
                      )?.unit_amount as number
                    )}{" "}
                    / mês
                  </span>
                </div>
              </div>

              <Link
                passHref
                href={`/checkout/${
                  packs.find((obj) => obj.metadata.category === "person")?.id
                }`}
              >
                <Button icon={<BiEdit />} buttonSize="lg">
                  Contratar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/** SEÇAO DE PASSO A PASSO DE PROCESSOS */}

      <section
        className="w-full mt-16 bg-gray-100 rounded-br-[70px] lg:rounded-br-[150px] py-10 lg:py-14"
        id="marketing"
      >
        <div className="container mx-auto px-10 lg:px-20">
          <div className="text-center w-full flex items-center flex-col gap-2 mb-10">
            <span className="text-gray-600">PARA TODOS</span>
            <h2 className="text-4xl font-bold">Pacotes de Marketing Digital</h2>
            <div className="w-32 bg-gradient-to-r from-blue-400 to-blue-600 h-1 rounded-[50%]" />
            <p className="text-gray-600 text-sm max-w-screen-md">
              Dê um boom nas suas redes sociais, turbine sua loja virtual venda
              muito mais com nossos pacotes de marketing digial e gestão de
              tráfego pago.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {packs
              .filter((obj) => obj.metadata.category === "marketing")
              .sort(
                (a, b) =>
                  parseInt(a.metadata.order) - parseInt(b.metadata.order)
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

                  <Link passHref href={`/checkout/${prod.id}`}>
                    <a className="mt-3 bg-sky-700 rounded-md px-10 py-3 flex items-center gap-2 text-white hover:bg-sky-800 active:bg-sky-700 w-full justify-center">
                      <BiEdit />
                      CONTRATAR
                    </a>
                  </Link>
                </div>
              ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link href={"/servicos"} passHref>
              <a className="font-semibold text-sky-700 flex items-center gap-2 hover:underline">
                Veja Mais <BiChevronRight />
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/** SEÇÕES DE SITES POR ASSINATURA */}

      <section className="mt-16 w-full" id="sites">
        <div className="container mx-auto px-10 lg:px-20">
          <div className="grid grid-cols-1 gap-10 items-center justify-items-center lg:grid-cols-2">
            <div className="w-full sm:w-3/4 lg:w-full">
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
            <div className="w-full flex flex-col gap-2">
              <h2 className="text-4xl font-bold text-sky-700">
                Site por Assinatura
              </h2>
              <p className="text-justify mt-4 text-sm md:text-base">
                Para você ser encontrado na internet é de suma importância ter
                um website. Então estamos aqui pra te ajudar com o nosso plano{" "}
                <strong>Site Por Assinatura</strong>, tenha o seu site com
                layout exclusivo, atual, e pagando muito pouco por isso.
              </p>

              <div className="flex sm:items-center gap-5 mt-5 flex-col sm:flex-row">
                <div className="flex flex-col">
                  <span>A partir de:</span>
                  <span className="font-bold text-xl text-sky-700">
                    R$ 29,90 / mês
                  </span>
                </div>
                <div>
                  <Link href="/sites-por-assinatura" passHref>
                    <a className="bg-sky-700 flex px-10 py-3 w-fit font-semibold text-white rounded-md hover:bg-sky-800 active:bg-sky-700 select-none cursor-pointer transition-all delay-75">
                      Quero conhecer mais!
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 w-full" id="ecommerce">
        <div className="container mx-auto px-10 lg:px-20">
          <div className="grid grid-cols-1 gap-10 items-center justify-items-center lg:grid-cols-2">
            <div className="w-full sm:w-3/4 lg:w-full">
              <Image
                draggable={false}
                src={"/img/web_shopping.svg"}
                width={880}
                height={632}
                alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                layout="responsive"
                objectFit="contain"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <h2 className="text-4xl font-bold text-sky-700">Loja Online</h2>
              <p className="text-justify mt-4 text-sm md:text-base">
                Tenha sua própria loja virtual, com um layout próprio, com suas
                cores, sua marca, e com um sistema de gestão completo para você
                ficar tranquilo em todos os passos da sua venda, veja o que o{" "}
                <strong>Nosso Ecommerce</strong> pode te oferecer:
              </p>

              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Gestão de Clientes</li>
                <li>Gestão de Produtos</li>
                <li>Gestão de Vendas, caixa, PDV</li>
                <li>
                  Pagamentos Automatizados: PIX, Cartão, Boleto, Duplicata
                </li>
                <li>Emissão de Nota Fiscal</li>
                <li>Suporte e Consultoria Contábil</li>
                <li>
                  Gestão e impulsionamento de vendas online, pelas melhores
                  plataformas e redes sociais
                </li>
              </ul>

              <div className="flex sm:items-center gap-5 mt-5 flex-col sm:flex-row">
                <div className="flex flex-col">
                  <span>A partir de:</span>
                  <span className="font-bold text-xl text-sky-700">
                    R$ 99,00 / mês
                  </span>
                </div>
                <div>
                  <Link href={"/ecommerce"} passHref>
                    <a className="bg-sky-700 flex px-10 py-3 w-fit font-semibold text-white rounded-md  hover:bg-sky-800 active:bg-sky-700 select-none cursor-pointer transition-all delay-75">
                      Quero conhecer mais!
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/** SEÇÃO DE CLIENTES */}

      <section className="w-full mt-16 bg-gray-100 rounded-br-[70px] lg:rounded-br-[150px] py-10 lg:py-14">
        <div className="container mx-auto px-10 lg:px-20">
          <div className="text-center w-full flex items-center flex-col gap-2 mb-10">
            <h2 className="text-4xl font-bold">Nossos Clientes</h2>
            <div className="w-32 bg-gradient-to-r from-blue-400 to-blue-600 h-1 rounded-[50%]" />
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 justify-items-center gap-2">
            <div className="w-full rounded-md shadow-lg overflow-hidden bg-white p-2 border">
              <Image
                draggable={false}
                src={"/img/coca.svg"}
                width={70}
                height={70}
                alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                layout="responsive"
                objectFit="cover"
              />
            </div>
            <div className="w-full rounded-md shadow-lg overflow-hidden bg-white p-2 border">
              <Image
                draggable={false}
                src={"/img/coca.svg"}
                width={70}
                height={70}
                alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                layout="responsive"
                objectFit="cover"
              />
            </div>
            <div className="w-full rounded-md shadow-lg overflow-hidden bg-white p-2 border">
              <Image
                draggable={false}
                src={"/img/coca.svg"}
                width={70}
                height={70}
                alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                layout="responsive"
                objectFit="cover"
              />
            </div>
            <div className="w-full rounded-md shadow-lg overflow-hidden bg-white p-2 border">
              <Image
                draggable={false}
                src={"/img/coca.svg"}
                width={70}
                height={70}
                alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                layout="responsive"
                objectFit="cover"
              />
            </div>
            <div className="w-full rounded-md shadow-lg overflow-hidden bg-white p-2 border">
              <Image
                draggable={false}
                src={"/img/coca.svg"}
                width={70}
                height={70}
                alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                layout="responsive"
                objectFit="cover"
              />
            </div>
            <div className="w-full rounded-md shadow-lg overflow-hidden bg-white p-2 border">
              <Image
                draggable={false}
                src={"/img/coca.svg"}
                width={70}
                height={70}
                alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                layout="responsive"
                objectFit="cover"
              />
            </div>
            <div className="w-full rounded-md shadow-lg overflow-hidden bg-white p-2 border">
              <Image
                draggable={false}
                src={"/img/coca.svg"}
                width={70}
                height={70}
                alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                layout="responsive"
                objectFit="cover"
              />
            </div>
            <div className="w-full rounded-md shadow-lg overflow-hidden bg-white p-2 border">
              <Image
                draggable={false}
                src={"/img/coca.svg"}
                width={70}
                height={70}
                alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                layout="responsive"
                objectFit="cover"
              />
            </div>
            <div className="w-full rounded-md shadow-lg overflow-hidden bg-white p-2 border">
              <Image
                draggable={false}
                src={"/img/coca.svg"}
                width={70}
                height={70}
                alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                layout="responsive"
                objectFit="cover"
              />
            </div>
            <div className="w-full rounded-md shadow-lg overflow-hidden bg-white p-2 border">
              <Image
                draggable={false}
                src={"/img/coca.svg"}
                width={70}
                height={70}
                alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                layout="responsive"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/** SEÇÃO DE CONTATO */}

      <section className="mt-16 w-full" id="contato">
        <div className="container mx-auto px-10 lg:px-20">
          <div className="text-center w-full flex items-center flex-col gap-2 mb-10">
            <span className="text-gray-600">CONTATO</span>
            <h2 className="text-4xl font-bold">Fale Conosco</h2>
            <div className="w-32 bg-gradient-to-r from-blue-400 to-blue-600 h-1 rounded-[50%]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center items-start">
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <div className="bg-sky-600 w-16 h-16 rounded-full flex items-center justify-center text-3xl text-white ring-4 ring-sky-300">
                <BiMapPin />
              </div>
              <span className="font-semibold">Endereço</span>
              <span className="text-sm text-gray-600">
                Rua 34, Qd 16 Lt 15, Setor Canavieiras, CEP: 77.710-000, Pedro
                Afonso - TO
              </span>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <div className="bg-sky-600 w-16 h-16 rounded-full flex items-center justify-center text-3xl text-white ring-4 ring-sky-300">
                <BiMailSend />
              </div>
              <span className="font-semibold">Email</span>
              <span className="text-sm text-gray-600">
                contato.nk.info@gmail.com
              </span>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <div className="bg-sky-600 w-16 h-16 rounded-full flex items-center justify-center text-3xl text-white ring-4 ring-sky-300">
                <BiPhone />
              </div>
              <span className="font-semibold">Telefone</span>
              <span className="text-sm text-gray-600">+55 (63) 99971-1716</span>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <div className="bg-sky-600 w-16 h-16 rounded-full flex items-center justify-center text-3xl text-white ring-4 ring-sky-300">
                <BiCalendar />
              </div>
              <span className="font-semibold">Horários de Atendimento</span>
              <span className="text-sm text-gray-600">
                De Segunda a Sexta, das 08:00 às 11:30 e das 13:30 às 17:30
              </span>
            </div>
          </div>

          <div className="w-full max-w-4xl mx-auto mt-10">
            <label htmlFor="name">Nome</label>
            <input
              className="w-full h-12 px-3 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75"
              placeholder="Seu nome aqui"
              id="name"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 mb-3">
              <div>
                <label htmlFor="email">Email</label>
                <input
                  className="w-full h-12 px-3 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75"
                  placeholder="Seu email aqui"
                  id="email"
                  type="email"
                />
              </div>
              <div>
                <label htmlFor="phone">Telefone</label>
                <input
                  className="w-full h-12 px-3 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75"
                  placeholder="Seu telefone aqui"
                  id="phone"
                  type="phone"
                />
              </div>
            </div>

            <label htmlFor="message">Mensagem</label>
            <textarea
              className="w-full px-3 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75 resize-none"
              placeholder="Sua mensagem aqui"
              id="message"
              rows={6}
            />

            <button className="bg-sky-700 flex items-center gap-3 px-10 py-3 w-fit text-white rounded-md mt-4 hover:bg-sky-800 active:bg-sky-700 select-none cursor-pointer transition-all delay-75">
              <BiSend />
              Enviar Mensagem
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </Fragment>
  );
};

export default Home;

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
