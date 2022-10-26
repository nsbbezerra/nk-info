import Link from "next/link";
import { Fragment } from "react";

export default function Panel() {
  return (
    <Fragment>
      <section className="w-full relative bg-backgroundInfo bg-opacity-30 object-cover bg-center py-10 h-[100vh]">
        <div className="w-full h-full container mx-auto items-center max-w-4xl px-10 lg:px-20 justify-center flex-col flex text-center gap-5 sm:gap-10 mt-10">
          <span className="text-zinc-800 font-semibold z-10 bg-white rounded-md px-4 py-1 bg-opacity-90">
            NK INFORMÁTICA
          </span>
          <h1 className="text-3xl md:text-5xl font-bold z-10 text-white drop-shadow-xl shadow-sky-50">
            Turbine <span className="text-sky-300">Seu Empreendimento</span> com
            nossas ferramentas de automação e serviços.
          </h1>

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
