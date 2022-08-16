import type { NextPage } from "next";
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
import Lottie from "../components/Lottie";
import * as maitenence from "../assets/maintenance.json";
import * as marketing from "../assets/marketing.json";
import * as webDeveloper from "../assets/web.json";
import * as webSite from "../assets/website.json";
import * as ecommerce from "../assets/ecommerce.json";

const Home: NextPage = () => {
  const Card = () => (
    <div className="rounded-md shadow-lg border p-5 w-full flex flex-col items-center transition-all duration-200 ease-in-out hover:scale-105 bg-white">
      <span className="text-gray-500">PLANO BÁSICO</span>

      <div className="w-3/4 relative my-5">
        <div className="bg-blue-200 rounded-md h-14 -rotate-6" />
        <div className="bg-blue-500 rounded-md h-14 z-20 absolute w-full top-0 right-0 left-0 bottom-0 flex items-center justify-center font-bold text-xl text-white text-center">
          R$ 200,00/mês
        </div>
      </div>

      <div className="grid grid-cols-1 divide-y w-full my-5">
        <p className="py-2 text-center">Customizad Plans</p>
        <p className="py-2 text-center">Billing Report</p>
        <p className="py-2 text-center">Access to Asana</p>
      </div>

      <button className="mt-3 bg-blue-600 rounded-md px-10 py-3 flex items-center gap-2 text-white hover:bg-blue-700 active:bg-blue-600">
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
          <div className="rounded-md shadow-lg p-4  flex flex-col justify-center items-center border">
            <div className="h-32 flex justify-center">
              <Lottie width={"120%"} animation={maitenence} height={"100%"} />
            </div>
            <span className="text-gray-600 text-center text-sm mt-3">
              Montagem e Manutenção em Redes, Computadores, Sistemas PDV,
              Roteadores, Modens, Impressoras, e muito mais!
            </span>
          </div>

          <div className="rounded-md shadow-lg p-4  flex flex-col justify-center items-center border">
            <div className="h-32">
              <Lottie width={"100%"} animation={marketing} height={"100%"} />
            </div>
            <span className="text-gray-600 text-center text-sm mt-3">
              Marketing Digital, Gestão de Tráfego Pago, Publicidades
              Áudio-Visual, Gestão de Redes Sociais, Estratégias de Crescimento
            </span>
          </div>

          <div className="rounded-md shadow-lg p-4  flex flex-col justify-center items-center border">
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
        </div>
      </section>

      {/** SEÇAO DE PASSO A PASSO DE PROCESSOS */}

      <section className="w-full mt-16 bg-gray-100 rounded-br-[70px] lg:rounded-br-[150px] py-10 lg:py-14">
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
            <Card />
            <Card />
            <Card />
            <Card />
          </div>

          <div className="flex justify-center mt-10">
            <a
              href="#"
              className="font-semibold text-blue-600 flex items-center gap-2 hover:underline"
            >
              Veja Mais <BiChevronRight />
            </a>
          </div>
        </div>
      </section>

      {/** SEÇÕES DE SITES POR ASSINATURA */}

      <section className="mt-16 w-full">
        <div className="container mx-auto px-10 lg:px-20">
          <div className="grid grid-cols-1 gap-10 items-center justify-items-center lg:grid-cols-2">
            <div className="w-full sm:w-3/4 lg:w-full">
              <Lottie animation={webSite} width="100%" height={"100%"} />
            </div>
            <div className="w-full flex flex-col gap-2">
              <h2 className="text-4xl font-bold text-blue-600">
                Site por Assinatura
              </h2>
              <p className="text-justify mt-4 text-sm md:text-base">
                Para você ser encontrado na internet é de suma importância ter
                um website. Então estamos aqui pra te ajudar com o nosso plano{" "}
                <strong>Site Por Assinatura</strong>, tenha o seu site com
                layout exclusivo, atual, e pagando muito pouco por isso.
              </p>

              <a className="bg-blue-600 flex px-10 py-3 w-fit font-semibold text-white rounded-md mt-4 hover:bg-blue-700 active:bg-blue-600 select-none cursor-pointer transition-all delay-75">
                Quero conhecer mais!
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 w-full">
        <div className="container mx-auto px-10 lg:px-20">
          <div className="grid grid-cols-1 gap-10 items-center justify-items-center lg:grid-cols-2">
            <div className="w-full sm:w-3/4 lg:w-full">
              <Lottie animation={ecommerce} width="100%" height={"100%"} />
            </div>
            <div className="w-full flex flex-col gap-2">
              <h2 className="text-4xl font-bold text-blue-600">
                Ecommerce por Assinatura
              </h2>
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
                <li>Suporte e consultoria Contábil</li>
                <li>
                  Gestão e impulsionamento de vendas online, pelas melhores
                  plataformas e redes sociais
                </li>
              </ul>

              <a className="bg-blue-600 flex px-10 py-3 w-fit font-semibold text-white rounded-md mt-4 hover:bg-blue-700 active:bg-blue-600 select-none cursor-pointer transition-all delay-75">
                Quero conhecer mais!
              </a>
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

      <section className="mt-16 w-full">
        <div className="container mx-auto px-10 lg:px-20">
          <div className="text-center w-full flex items-center flex-col gap-2 mb-10">
            <span className="text-gray-600">CONTATO</span>
            <h2 className="text-4xl font-bold">Fale Conosco</h2>
            <div className="w-32 bg-gradient-to-r from-blue-400 to-blue-600 h-1 rounded-[50%]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center items-start">
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center text-3xl text-white ring-4 ring-blue-300">
                <BiMapPin />
              </div>
              <span className="font-semibold">Endereço</span>
              <span className="text-sm text-gray-600">
                Rua 34, Qd 16 Lt 15, Setor Canavieiras, CEP: 77.710-000, Pedro
                Afonso - TO
              </span>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center text-3xl text-white ring-4 ring-blue-300">
                <BiMailSend />
              </div>
              <span className="font-semibold">Email</span>
              <span className="text-sm text-gray-600">
                contato.nk.info@gmail.com
              </span>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center text-3xl text-white ring-4 ring-blue-300">
                <BiPhone />
              </div>
              <span className="font-semibold">Telefone</span>
              <span className="text-sm text-gray-600">+55 (63) 99971-1716</span>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center text-3xl text-white ring-4 ring-blue-300">
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
              className="w-full p-2 border rounded-md focus:border-blue-600"
              placeholder="Seu nome aqui"
              id="name"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 mb-3">
              <div>
                <label htmlFor="email">Email</label>
                <input
                  className="w-full p-2 border rounded-md focus:border-blue-600"
                  placeholder="Seu email aqui"
                  id="email"
                  type="email"
                />
              </div>
              <div>
                <label htmlFor="phone">Telefone</label>
                <input
                  className="w-full p-2 border rounded-md focus:border-blue-600"
                  placeholder="Seu telefone aqui"
                  id="phone"
                  type="phone"
                />
              </div>
            </div>

            <label htmlFor="message">Mensagem</label>
            <textarea
              className="w-full p-2 border rounded-md focus:border-blue-600 resize-none"
              placeholder="Sua mensagem aqui"
              id="message"
              rows={6}
            />

            <button className="bg-blue-600 flex items-center gap-3 px-10 py-3 w-fit text-white rounded-md mt-4 hover:bg-blue-700 active:bg-blue-600 select-none cursor-pointer transition-all delay-75">
              <BiSend />
              Enviar Mensagem
            </button>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
