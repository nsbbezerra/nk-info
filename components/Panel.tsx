import Link from "next/link";
import { Fragment } from "react";

export default function Panel() {
  return (
    <Fragment>
      <section className="w-full relative bg-backgroundBulbs object-cover bg-center rounded-br-[70px] lg:rounded-br-[150px] py-10 h-[95vh]">
        <div className="w-full h-full container mx-auto items-center max-w-4xl px-10 lg:px-20 justify-center flex-col flex text-center gap-6 mt-10">
          <span className="text-zinc-800 font-semibold z-10 bg-white rounded-md px-4 py-1">
            NK INFORMÁTICA
          </span>
          <h1 className="text-xl md:text-5xl font-bold z-10 text-sky-300">
            Turbine <span className="text-white">Seu Negócio</span> com nossas
            ferramentas de automação e serviços.
          </h1>
          <span className="text-sky-100 text-sm md:text-lg z-10 font-semibold">
            Temos as melhores ferramentas e serviços que cuidará das suas
            vendas, dos seus clientes, do seu visual, da sua divulgação e do seu
            crescimento.
          </span>

          <Link href={"/cadastro"} passHref>
            <a className="bg-sky-300 w-fit px-10 py-3 text-zinc-800 font-semibold rounded-md hover:bg-sky-400 active:bg-sky-300 transition-all delay-75 mt-5 z-10">
              Seja nosso Cliente!
            </a>
          </Link>
        </div>
      </section>
    </Fragment>
  );
}
