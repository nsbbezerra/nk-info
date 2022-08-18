import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import {
  BiHome,
  BiInfoSquare,
  BiCog,
  BiPhone,
  BiUser,
  BiX,
  BiMenu,
  BiArrowToTop,
  BiShoppingBag,
  BiLogIn,
  BiSave,
  BiListCheck,
  BiLogOut,
} from "react-icons/bi";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import ReactInputMask from "react-input-mask";
import * as Dialog from "@radix-ui/react-dialog";
import { BsTools } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";

export default function Header() {
  const [open, setOpen] = useState<boolean>(false);
  const [showScroll, setShowScroll] = useState<boolean>(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const checkScroll = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
  });

  const NavMenu = () => (
    <div className="flex lg:items-center gap-7 flex-col lg:flex-row px-5 lg:px-0">
      <Link href={"/"} passHref>
        <a className="flex cursor-pointer select-none items-center gap-1 transition-all delay-75 hover:text-blue-600 font-semibold">
          <BiHome />
          Início
        </a>
      </Link>

      <Link passHref href={"#sobre"}>
        <a className="flex cursor-pointer select-none items-center gap-1 transition-all delay-75 hover:text-blue-600 ">
          <BiInfoSquare />
          Sobre Nós
        </a>
      </Link>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="flex cursor-pointer select-none items-center gap-1 transition-all delay-75 hover:text-blue-600 ">
          <BiCog />
          Serviços
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="bg-white backdrop-blur-sm bg-opacity-90 rounded-md z-50 py-2 px-2 border shadow-lg mt-3">
            <DropdownMenu.Group>
              <Link href={"#manutencao"} passHref>
                <DropdownMenu.Item className="text-gray-800 py-1 px-2 rounded-md flex items-center gap-2 hover:bg-blue-600 cursor-pointer hover:text-white active:bg-blue-500 transition-all delay-75">
                  <BsTools />
                  Pacotes de Serviços
                </DropdownMenu.Item>
              </Link>
              <Link href={"/sites-por-assinatura"}>
                <DropdownMenu.Item className="text-gray-800 py-1 px-2 rounded-md flex items-center gap-2 hover:bg-blue-600 cursor-pointer hover:text-white active:bg-blue-500 transition-all delay-75">
                  <CgWebsite />
                  Site por Assinatura
                </DropdownMenu.Item>
              </Link>
              <Link href={"#ecommerce"}>
                <DropdownMenu.Item className="text-gray-800 py-1 px-2 rounded-md flex items-center gap-2 hover:bg-blue-600 cursor-pointer hover:text-white active:bg-blue-500 transition-all delay-75">
                  <BiShoppingBag />
                  Sua Loja Online
                </DropdownMenu.Item>
              </Link>
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <Link href={"#contato"} passHref>
        <a className="flex cursor-pointer select-none items-center gap-1 transition-all delay-75 hover:text-blue-600 ">
          <BiPhone />
          Contato
        </a>
      </Link>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="bg-blue-600 px-4 py-3 text-white rounded-md flex items-center gap-2 hover:bg-blue-700 transition-all delay-75 active:bg-blue-600 w-fit lg:py-2 select-none">
          <BiUser />
          Área do Cliente
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="bg-white backdrop-blur-sm bg-opacity-90 rounded-md z-50 py-2 px-2 border shadow-lg mt-1">
            <div className="flex flex-col items-center justify-center">
              <BiUser className="rounded-full p-1 bg-gray-300 text-4xl" />
              <span className="text-gray-600 text-sm text-center mt-2">
                Olá, Natanael dos Santos Bezerra
              </span>
            </div>
            <DropdownMenu.Separator className="border-gray-300 border my-2" />
            <DropdownMenu.Group>
              <DropdownMenu.Item
                className="text-gray-800 py-1 px-2 rounded-md flex items-center gap-2 hover:bg-blue-600 cursor-pointer hover:text-white active:bg-blue-500 transition-all delay-75"
                onClick={() => setIsRegisterModalOpen(true)}
              >
                <BiSave />
                Cadastre-se
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className="text-gray-800 py-1 px-2 rounded-md flex items-center gap-2 hover:bg-blue-600 cursor-pointer hover:text-white active:bg-blue-500 transition-all delay-75"
                onClick={() => setIsLoginModalOpen(true)}
              >
                <BiLogIn />
                Login
              </DropdownMenu.Item>
              <DropdownMenu.Item className="text-gray-800 py-1 px-2 rounded-md flex items-center gap-2 hover:bg-blue-600 cursor-pointer hover:text-white active:bg-blue-500 transition-all delay-75">
                <BiListCheck />
                Meus Dados
              </DropdownMenu.Item>
              <DropdownMenu.Item className="text-red-600 py-1 px-2 rounded-md flex items-center gap-2 hover:bg-red-600 cursor-pointer hover:text-white active:bg-red-500 transition-all delay-75">
                <BiLogOut />
                Sair
              </DropdownMenu.Item>
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
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

      {showScroll && (
        <button
          className="fixed bottom-5 right-5 rounded-full h-14 w-14 flex items-center justify-center bg-blue-600 drop-shadow-lg z-50 text-white text-3xl bg-opacity-95 backdrop-blur-sm hover:bg-blue-700 active:bg-blue-600 transition-all delay-75"
          onClick={scrollToTop}
        >
          <BiArrowToTop />
        </button>
      )}

      <Dialog.Root
        open={isRegisterModalOpen}
        onOpenChange={() => setIsRegisterModalOpen(!isRegisterModalOpen)}
      >
        <Dialog.Trigger asChild />
        <Dialog.Portal>
          <Dialog.Overlay className="w-full h-full bg-black bg-opacity-50 fixed z-50 top-0 left-0 right-0 bottom-0 flex items-center justify-center inset-0" />
          <Dialog.Content className="fixed bg-white shadow-xl top-[2%] left-[10%] w-[80%] md:top-[15%] md:left-[15%] md:w-[70%] lg:top-[10%] lg:left-[20%] lg:w-[60%] z-50 rounded-md py-3 px-4 max-h-screen overflow-auto">
            <Dialog.Title className="font-bold text-xl">
              Cadastro de Cliente
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-500">
              Cadastre-se para ter acesso aos nossos planos
            </Dialog.Description>
            <Dialog.Close
              className="top-3 right-3 absolute bg-gray-200 h-7 w-7 rounded-full hover:bg-gray-400 active:bg-gray-300 transition-all delay-75 cursor-pointer"
              asChild
            >
              <BiX />
            </Dialog.Close>

            <div className="w-full mt-5">
              <label>
                Nome <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:border-blue-600"
                placeholder="Nome"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 mt-2 gap-2">
                <div>
                  <label>
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md focus:border-blue-600"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label>
                    Whatsapp <span className="text-red-600">*</span>
                  </label>
                  <ReactInputMask
                    mask={"99 99999-9999"}
                    className="w-full p-2 border rounded-md focus:border-blue-600"
                    placeholder="Whatsapp"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 mt-2 gap-2">
                <div className="md:col-span-2">
                  <label>
                    Logradouro <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md focus:border-blue-600"
                    placeholder="Logradouro"
                  />
                </div>
                <div>
                  <label>
                    Número <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md focus:border-blue-600"
                    placeholder="Número"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 mt-2 gap-2">
                <div className="md:col-span-1">
                  <label>
                    CEP <span className="text-red-600">*</span>
                  </label>
                  <ReactInputMask
                    mask={"99.999-999"}
                    className="w-full p-2 border rounded-md focus:border-blue-600"
                    placeholder="CEP"
                  />
                </div>
                <div className="md:col-span-3">
                  <label>
                    Cidade <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md focus:border-blue-600"
                    placeholder="Cidade"
                  />
                </div>
                <div>
                  <label>
                    UF <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md focus:border-blue-600"
                    placeholder="UF"
                    maxLength={2}
                  />
                </div>
              </div>
            </div>

            <div className="flex w-full justify-end mt-5">
              <button className="bg-blue-600 px-4 py-3 text-white rounded-md flex items-center gap-2 hover:bg-blue-700 transition-all delay-75 active:bg-blue-600 w-fit lg:py-2 select-none">
                <BiSave />
                Salvar
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root
        open={isLoginModalOpen}
        onOpenChange={() => setIsLoginModalOpen(!isLoginModalOpen)}
      >
        <Dialog.Trigger asChild />
        <Dialog.Portal>
          <Dialog.Overlay className="w-full h-full bg-black bg-opacity-50 fixed z-50 top-0 left-0 right-0 bottom-0 flex items-center justify-center inset-0" />
          <Dialog.Content className="fixed bg-white shadow-xl top-[2%] left-[10%] w-[80%] md:top-[10%] md:left-[25%] md:w-[50%] lg:top-[10%] lg:left-[35%] lg:w-[30%] z-50 rounded-md py-3 px-4 max-h-screen overflow-auto">
            <Dialog.Title className="font-bold text-xl">Login</Dialog.Title>
            <Dialog.Description className="text-sm text-gray-500">
              Entre e tenha acesso aos seus dados
            </Dialog.Description>
            <Dialog.Close
              className="top-3 right-3 absolute bg-gray-200 h-7 w-7 rounded-full hover:bg-gray-400 active:bg-gray-300 transition-all delay-75 cursor-pointer"
              asChild
            >
              <BiX />
            </Dialog.Close>

            <div className="w-full mt-5">
              <label>
                Whatsapp <span className="text-red-600">*</span>
              </label>
              <ReactInputMask
                mask={"99 99999-9999"}
                className="w-full p-2 border rounded-md focus:border-blue-600"
                placeholder="Whatsapp"
              />
            </div>
            <div className="w-full mt-2">
              <label>
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:border-blue-600"
                placeholder="Email"
              />
            </div>

            <div className="flex w-full justify-end mt-5">
              <button className="bg-blue-600 px-4 py-3 text-white rounded-md flex items-center gap-2 hover:bg-blue-700 transition-all delay-75 active:bg-blue-600 w-fit lg:py-2 select-none">
                <BiLogIn />
                Entrar
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Fragment>
  );
}
