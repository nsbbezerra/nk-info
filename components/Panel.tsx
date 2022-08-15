import Image from "next/image";
import { Fragment } from "react";

export default function Panel() {
  return (
    <Fragment>
      <section className="w-full relative bg-blue-100 rounded-br-[70px] lg:rounded-br-[150px]">
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
          <div className="w-60 sm:w-96 order-1 lg:order-2 py-10 lg:w-[400px]">
            <Image
              draggable={false}
              src={"/img/system-dev.svg"}
              width={130}
              height={120}
              alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
              layout="responsive"
              objectFit="cover"
            />
          </div>
        </div>
      </section>
    </Fragment>
  );
}
