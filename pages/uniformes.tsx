import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";
import HeadApp from "../components/Head";

export default function Tshirts() {
  return (
    <Fragment>
      <HeadApp title="NK Informática | Sistemas Web, Gestão Comercial, Marketing Digital, Gestão de Redes Sociais" />
      <section className="w-screen h-screen bg-backgroundTshirt bg-cover bg-center overflow-auto p-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 container mx-auto max-w-6xl h-full items-center gap-5">
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="w-[80%] max-h-full max-w-xs">
              <Image
                draggable={false}
                src={"/img/tshirt.png"}
                width={496}
                height={799}
                alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                layout="responsive"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-1 text-zinc-800 font-semibold justify-center items-center lg:col-span-2 pb-10">
            <span className="text-center text-sky-900">
              Você está cansado de lidar com processos manuais e burocráticos
              para vender seus produtos? Está à procura de uma solução que
              otimize seu tempo e aumente suas vendas?
            </span>
            <span className="text-center text-sky-900">
              Então, temos a solução perfeita para você: o nosso sistema de
              vendas online. Com ele, você pode criar um site profissional para
              vender seus uniformes personalizados, além de gerenciar todos os
              pedidos e pagamentos.
            </span>
            <span className="text-center text-sky-900">
              Com nosso sistema de vendas online, você pode aumentar suas vendas
              sem precisar contratar mais funcionários ou investir em
              equipamentos caros. É a solução ideal para quem deseja ter um
              negócio rentável na internet!
            </span>

            <span className="font-normal py-3 md:py-0">Teste o sistema:</span>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
              <Link
                href={"https://fastidious-pony-2f04bc.netlify.app/"}
                passHref
              >
                <a
                  className="w-full flex items-center justify-center bg-sky-700 h-12 rounded-md text-white select-none cursor-pointer hover:bg-sky-900 active:bg-sky-700"
                  target={"_blank"}
                >
                  Painel Administrativo
                </a>
              </Link>
              <Link href={"https://braz-frontend-custom.vercel.app/"} passHref>
                <a
                  className="w-full flex items-center justify-center bg-yellow-700 h-12 rounded-md text-white select-none cursor-pointer hover:bg-yellow-900 active:bg-yellow-700"
                  target={"_blank"}
                >
                  Site de Vendas
                </a>
              </Link>
            </div>

            <div className="flex justify-center items-center gap-1 mt-5 md:mt-2 flex-col">
              <span>Adiquira já</span>
              <div className="flex md:gap-2 items-center flex-col md:flex-row py-5 md:py-0">
                <span>De:</span>{" "}
                <span className="line-through text-xl font-normal">
                  R$ 1.800,00
                </span>{" "}
                <span>por:</span>{" "}
                <span className="text-2xl font-bold text-sky-900">
                  R$ 1.000,00
                </span>
              </div>

              <span className="flex items-center gap-2 text-sm font-normal text-center">
                <BiCheck /> Domínio por 1 ano grátis - Após 1 ano: R$ 40,00 por
                ano.
              </span>
              <span className="flex items-center gap-2 text-sm font-normal text-center">
                <BiCheck /> Servidor (VPS) grátis por 1 mes - Após 1 mes: R$
                45,00 por mês
              </span>
              <span className="flex items-center gap-2 text-sm font-normal text-center">
                <BiCheck /> Assitência técnica no sistema e servidor sem custos
                adicionais a qualquer hora.
              </span>
            </div>

            <span className="text-center text-sm mt-3">
              Entre em contato conosco hoje mesmo para saber mais sobre nossa
              plataforma e comece a vender seus uniformes personalizados online!
            </span>

            <Link
              href={
                "https://wa.me/5563999711716?text=Tenho interesse no sistema de vendas online"
              }
            >
              <a
                className="w-fit px-10 flex items-center justify-center bg-green-700 h-12 rounded-md text-white select-none cursor-pointer hover:bg-green-900 active:bg-green-700 gap-3 mt-3"
                target={"_blank"}
              >
                <AiOutlineWhatsApp /> Fale Conosco
              </a>
            </Link>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
