import Link from "next/link";
import { Fragment } from "react";
import Lottie from "react-lottie";
import * as animationData from "../assets/animation.json";

export default function Panel() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Fragment>
      <section className="w-full relative bg-sky-300 bg-opacity-5 rounded-br-[70px] lg:rounded-br-[150px] py-10 shadow-xl">
        <div className="grid grid-cols-1 gap-3 w-full container mx-auto items-center justify-items-center lg:justify-items-end lg:grid-cols-2 px-10 lg:px-20">
          <div className="w-full flex flex-col gap-3 order-2 lg:order-1 -mt-10 py-10">
            <span className="text-zinc-400 font-semibold z-10">
              NK INFORMÁTICA
            </span>
            <h1 className="text-xl md:text-4xl font-semibold z-10 text-zinc-100">
              Turbine <span className="text-sky-300">Seu Negócio</span> com
              nossas ferramentas de automação e serviços.
            </h1>
            <span className="text-gray-400 text-sm md:text-md z-10">
              Temos as melhores ferramentas e serviços que cuidará das suas
              vendas, dos seus clientes, do seu visual, da sua divulgação e do
              seu crescimento.
            </span>

            <Link href={"/cadastro"} passHref>
              <a className="bg-sky-300 w-fit px-10 py-3 text-zinc-800 font-semibold rounded-md hover:bg-sky-400 active:bg-sky-300 transition-all delay-75 mt-5 z-10">
                Seja nosso Cliente!
              </a>
            </Link>
          </div>
          <div className="w-full sm:w-3/4 order-1 lg:order-2 py-10 lg:w-full">
            <Lottie
              options={defaultOptions}
              width="100%"
              isClickToPauseDisabled
            />
          </div>
        </div>
      </section>
    </Fragment>
  );
}
