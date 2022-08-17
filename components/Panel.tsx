import Image from "next/image";
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
      <section className="w-full relative bg-blue-300 rounded-br-[70px] lg:rounded-br-[150px] py-10">
        <div className="grid grid-cols-1 gap-3 w-full container mx-auto items-center justify-items-center lg:justify-items-end lg:grid-cols-2 px-10 lg:px-20">
          <div className="w-full flex flex-col gap-3 order-2 lg:order-1 -mt-10 py-10">
            <span className="text-gray-500 font-semibold z-10">
              NK INFORMÁTICA
            </span>
            <h1 className="text-xl md:text-4xl font-semibold z-10">
              Turbine <span className="text-blue-600">Seu Negócio</span> com
              nossas ferramentas de automação e serviços.
            </h1>
            <span className="text-gray-600 text-sm md:text-md z-10">
              Temos as melhores ferramentas e serviços que cuidará das suas
              vendas, dos seus clientes, do seu visual, da sua divulgação e do
              seu crescimento.
            </span>

            <button className="bg-blue-600 w-fit px-10 py-3 text-white font-semibold rounded-md hover:bg-blue-700 active:bg-blue-600 transition-all delay-75 mt-5 z-10">
              Seja nosso Cliente!
            </button>
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
