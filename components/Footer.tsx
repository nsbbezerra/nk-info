import Image from "next/image";
import { Fragment } from "react";
import {
  AiOutlineWhatsApp,
  AiOutlineFacebook,
  AiOutlineLinkedin,
  AiOutlineInstagram,
} from "react-icons/ai";

export default function Footer() {
  return (
    <Fragment>
      <footer className="bg-gray-900 w-full py-10 mt-16">
        <div className="container mx-auto px-10 lg:px-20">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="w-16">
              <Image
                draggable={false}
                src={"/img/logo-white.svg"}
                width={70}
                height={40}
                alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                layout="responsive"
                objectFit="contain"
              />
            </div>

            <span className="text-center text-gray-400 max-w-3xl">
              NK Informática, aqui tem tecnologias de ponta, serviços de
              qualidade, preço justo e a maior satisfação é em fazer do nosso
              cliente um destaque!
            </span>

            <div className="w-fit flex gap-4 items-center">
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-400 hover:bg-blue-500 active:bg-blue-400 transition-all delay-75">
                <AiOutlineWhatsApp />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-400 hover:bg-blue-500 active:bg-blue-400 transition-all delay-75">
                <AiOutlineFacebook />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-400 hover:bg-blue-500 active:bg-blue-400 transition-all delay-75">
                <AiOutlineLinkedin />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-400 hover:bg-blue-500 active:bg-blue-400 transition-all delay-75">
                <AiOutlineInstagram />
              </button>
            </div>
          </div>

          <hr className="border-gray-600 mt-10 mb-10" />

          <span className="text-center block w-full text-gray-400">
            2022 © NK Informática - Todos os direitos reservados
          </span>
        </div>
      </footer>
    </Fragment>
  );
}
