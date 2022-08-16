import { Fragment, useState } from "react";
import Image from "next/image";
import {
  BiHome,
  BiInfoSquare,
  BiTag,
  BiCog,
  BiPhone,
  BiUser,
  BiX,
  BiMenu,
} from "react-icons/bi";

export default function Header() {
  const [open, setOpen] = useState<boolean>(false);

  const NavMenu = () => (
    <div className="flex lg:items-center gap-7 flex-col lg:flex-row px-5 lg:px-0">
      <a className="flex cursor-pointer select-none items-center gap-1 transition-all delay-75 hover:text-blue-600 font-semibold">
        <BiHome />
        Início
      </a>

      <a className="flex cursor-pointer select-none items-center gap-1 transition-all delay-75 hover:text-blue-600 ">
        <BiInfoSquare />
        Sobre Nós
      </a>

      <a className="flex cursor-pointer select-none items-center gap-1 transition-all delay-75 hover:text-blue-600 ">
        <BiTag />
        Produtos
      </a>

      <a className="flex cursor-pointer select-none items-center gap-1 transition-all delay-75 hover:text-blue-600 ">
        <BiCog />
        Serviços
      </a>

      <a className="flex cursor-pointer select-none items-center gap-1 transition-all delay-75 hover:text-blue-600 ">
        <BiPhone />
        Contato
      </a>

      <button className="bg-blue-600 px-4 py-3 text-white rounded-md flex items-center gap-2 hover:bg-blue-700 transition-all delay-75 active:bg-blue-600 w-fit lg:py-2 select-none">
        <BiUser />
        Área do Cliente
      </button>
    </div>
  );

  return (
    <Fragment>
      <header className="w-full h-16 border-b border-b-gray-50 flex items-center justify-center sticky top-0 z-30 bg-white backdrop-blur-sm bg-opacity-90 shadow-sm">
        <nav className="container mx-auto px-10 lg:px-20 flex items-center justify-between">
          <div className="w-16">
            <Image
              draggable={false}
              src={"/img/logo.svg"}
              width={70}
              height={40}
              alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
              layout="responsive"
              objectFit="contain"
            />
          </div>

          <div className="hidden lg:block">
            <NavMenu />
          </div>

          <div className="block lg:hidden">
            <button
              className="text-3xl flex items-center justify-center bg-blue-600 rounded-md text-white p-1 hover:bg-blue-700 active:bg-blue-600"
              onClick={() => setOpen(!open)}
            >
              <BiMenu />
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`fixed top-0 ${
          open ? "ml-0" : "-ml-[100%]"
        } right-0 left-0 bottom-0 w-full h-full z-50 transition-all delay-100`}
      >
        <div className="h-full w-[70%] bg-white shadow-xl border-r">
          <div className="flex justify-between h-14 border-b items-center px-5 mb-5">
            <span>MENU</span>

            <button
              className="text-3xl active:opacity-70"
              onClick={() => setOpen(!open)}
            >
              <BiX />
            </button>
          </div>
          <NavMenu />
        </div>
      </div>
    </Fragment>
  );
}
