import Image from "next/image";
import Link from "next/link";
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
      <footer className="bg-sky-300 bg-opacity-5 w-full py-10 mt-16">
        <div className="container mx-auto px-10 lg:px-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-20">
            <div className="flex flex-col justify-center gap-4">
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

              <span className="text-gray-400 max-w-3xl">
                NK Informática, aqui tem tecnologias de ponta, serviços de
                qualidade, preço justo e a maior satisfação é em fazer do nosso
                cliente um destaque!
              </span>

              <div className="w-fit flex gap-4 items-center">
                <Link href={"https://wa.me/5563999711716"} passHref>
                  <a
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-400 hover:bg-blue-500 active:bg-blue-400 transition-all delay-75"
                    target={"_blank"}
                  >
                    <AiOutlineWhatsApp />
                  </a>
                </Link>
                <Link href={"https://www.facebook.com/nkinfo.pa"} passHref>
                  <a
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-400 hover:bg-blue-500 active:bg-blue-400 transition-all delay-75"
                    target={"_blank"}
                  >
                    <AiOutlineFacebook />
                  </a>
                </Link>
                <Link
                  href={"https://www.linkedin.com/in/natanael-bezerra-dev/"}
                  passHref
                >
                  <a
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-400 hover:bg-blue-500 active:bg-blue-400 transition-all delay-75"
                    target={"_blank"}
                  >
                    <AiOutlineLinkedin />
                  </a>
                </Link>
                <Link
                  href={"https://www.instagram.com/nk.informatica.pa/"}
                  passHref
                >
                  <a
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-400 hover:bg-blue-500 active:bg-blue-400 transition-all delay-75"
                    target={"_blank"}
                  >
                    <AiOutlineInstagram />
                  </a>
                </Link>
              </div>
            </div>

            <div className="w-full lg:col-span-2">
              <h3 className="text-3xl font-semibold text-white mb-3">
                NK INFORMÁTICA
              </h3>
              <p className="text-gray-400">
                Rua 34, Qd 16 Lt 15, 173, Setor Canavieiras, CEP: 77.710-000,
                Pedro Afonso - TO
              </p>
              <p className="text-gray-400">CNPJ: 40.526.622/0001-72</p>
              <p className="text-gray-400 flex gap-2 items-center">
                Whatsapp: (63) 99971-1716{" "}
                <Link href={"https://wa.me/5563999711716"} passHref>
                  <a
                    className="bg-green-400 p-1 rounded-full text-gray-900 cursor-pointer hover:bg-green-500 active:bg-green-400 transition-all delay-75"
                    target={"_blank"}
                  >
                    <AiOutlineWhatsApp />
                  </a>
                </Link>
              </p>
              <p className="text-gray-400">contato.nk.info@gmail.com</p>
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
