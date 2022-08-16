import type { NextPage } from "next";
import Image from "next/image";
import { Fragment } from "react";
import HeadApp from "../components/Head";
import Header from "../components/Header";
import Panel from "../components/Panel";
import { BiEdit, BiChevronRight } from "react-icons/bi";
import Lottie from "../components/Lottie";
import * as maitenence from "../assets/maintenance.json";
import * as marketing from "../assets/marketing.json";
import * as webDeveloper from "../assets/web.json";

const Home: NextPage = () => {
  const Card = () => (
    <div className="rounded-md shadow-lg border p-5 w-full flex flex-col items-center transition-all duration-200 ease-in-out hover:scale-105">
      <span className="text-gray-500">PLANO BÁSICO</span>

      <div className="w-3/4 relative my-5">
        <div className="bg-blue-200 rounded-md h-14 -rotate-6" />
        <div className="bg-blue-500 rounded-md h-14 z-20 absolute w-full top-0 right-0 left-0 bottom-0 flex items-center justify-center font-bold text-xl text-white text-center">
          R$ 200,00/mês
        </div>
      </div>

      <div className="grid grid-cols-1 divide-y w-full my-5">
        <p className="py-3 text-center">Customizad Plans</p>
        <p className="py-3 text-center">Billing Report</p>
        <p className="py-3 text-center">Access to Asana</p>
      </div>

      <button className="mt-3 bg-blue-600 rounded-md px-10 py-2 flex items-center gap-2 text-white hover:bg-blue-700 active:bg-blue-600">
        <BiEdit />
        CONTRATAR
      </button>
    </div>
  );

  return (
    <Fragment>
      <HeadApp title="NK Informática | Sistemas Web, Gestão Comercial, Marketing Digital, Gestão de Redes Sociais" />
      <Header />
      <Panel />

      {/** SEÇÃO SOBRE NÓS */}

      <section className="container mx-auto mt-16 px-10 lg:px-20">
        <div className="text-center w-full flex items-center flex-col gap-2">
          <h2 className="text-4xl font-bold">Sobre Nós!</h2>
          <div className="w-32 bg-gradient-to-r from-blue-400 to-blue-600 h-1 rounded-[50%]" />
        </div>
        <div className="text-center text-gray-600 mt-10">
          <p>
            Somos uma empresa desde 2017 focada em soluções na área de
            Tecnologia da Informação, estamos sempre em atualização tanto na
            nossa Stack de Desenvolvimento quanto nos ferramentais necessários
            para oferecer aos nossos clientes a maior confiabilidade nos nossos
            produtos e serviços.
          </p>
          <p>
            Temos orgulho em prestar um serviço qualificado, atendendo desde o
            pequeno até o grande empresário, trabalhamos para colocar sua
            empresa sempre bem visível, flúida, destravada e automatizada.
          </p>
          <p className="font-semibold mt-5">Confira nossas áreas de atuação:</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          <div className="rounded-md shadow-lg p-4  flex flex-col justify-center items-center">
            <div className="h-32 flex justify-center">
              <Lottie width={"120%"} animation={maitenence} height={"100%"} />
            </div>
            <span className="text-gray-600 text-center text-sm mt-3">
              Montagem e Manutenção em Redes, Computadores, Sistemas PDV,
              Roteadores, Modens, Impressoras, e muito mais!
            </span>
          </div>

          <div className="rounded-md shadow-lg p-4  flex flex-col justify-center items-center">
            <div className="h-32">
              <Lottie width={"100%"} animation={marketing} height={"100%"} />
            </div>
            <span className="text-gray-600 text-center text-sm mt-3">
              Marketing Digital, Gestão de Tráfego Pago, Publicidades
              Áudio-Visual, Gestão de Redes Sociais, Estratégias de Crescimento
            </span>
          </div>

          <div className="rounded-md shadow-lg p-4  flex flex-col justify-center items-center">
            <div className="h-32">
              <Lottie width={"100%"} animation={webDeveloper} height={"130%"} />
            </div>
            <span className="text-gray-600 text-center text-sm mt-3">
              Desenvolvimento de Web Sites, Sistemas de Gestão, Aplicativos
              Mobile, Automatização de Vendas Online.
            </span>
          </div>
        </div>
      </section>

      {/** SEÇÃO DE ESPECIALIDADES */}

      <section className="w-full mt-16 bg-gray-100 rounded-br-[70px] lg:rounded-br-[150px] p-10 lg:p-14">
        <div className="container mx-auto w-full h-full flex justify-end relative items-center flex-col lg:flex-row">
          <div className="w-[95%] lg:w-[58%] rounded-md bg-white shadow-xl lg:absolute h-fit z-10 left-0 p-7 flex flex-col gap-2 transition-all duration-200 ease-in-out hover:scale-105">
            <h3 className="text-2xl sm:text-3xl font-bold">
              Somos especialistas em soluções de{" "}
              <span className="text-blue-600">negócios e serviços!</span>
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
          <div className="-mt-28 w-full lg:w-[45vw] rounded-md overflow-hidden sm:h-[450px] lg:h-fit lg:mt-0 xl:max-h-[500px]">
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

      <section className="mt-16 w-full">
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
            <Card />
            <Card />
            <Card />
            <Card />
          </div>

          <div className="flex justify-center">
            <a
              href="#"
              className="flex items-center text-lg mt-5 font-semibold text-blue-600 hover:underline w-fit"
            >
              Veja Mais <BiChevronRight />
            </a>
          </div>
        </div>
      </section>

      {/** SEÇAO DE PASSO A PASSO DE PROCESSOS */}
    </Fragment>
  );
};

export default Home;
