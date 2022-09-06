import { Fragment, useContext, useEffect, useState } from "react";
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
import ClientContext from "../context/client";
import { useRouter } from "next/router";

export default function Header() {
  const { push } = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [showScroll, setShowScroll] = useState<boolean>(false);
  const { state: clientState, setState: setClientState } =
    useContext(ClientContext);

  useEffect(() => {
    const client = localStorage.getItem("client");
    if (client) {
      const parsed = JSON.parse(client);
      setClientState(parsed);
    }
  }, []);

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

  const logout = () => {
    localStorage.removeItem("client");
    setClientState({ id: "", name: "" });
    push("/");
  };

  const NavMenu = () => (
    <div className="flex lg:items-center gap-7 flex-col lg:flex-row px-5 lg:px-0">
      <Link href={"/"} passHref>
        <a className="flex cursor-pointer select-none items-center gap-1 transition-all delay-75 hover:text-sky-700 font-semibold">
          <BiHome />
          Início
        </a>
      </Link>

      <Link passHref href={"#sobre"}>
        <a className="flex cursor-pointer select-none items-center gap-1 transition-all delay-75 hover:text-sky-700 ">
          <BiInfoSquare />
          Sobre Nós
        </a>
      </Link>

      <Link href={"/servicos"} passHref>
        <a className="flex cursor-pointer select-none items-center gap-1 transition-all delay-75 hover:text-sky-700 ">
          <BiCog />
          Serviços
        </a>
      </Link>

      <Link href={"#contato"} passHref>
        <a className="flex cursor-pointer select-none items-center gap-1 transition-all delay-75 hover:text-blue-600 ">
          <BiPhone />
          Contato
        </a>
      </Link>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="bg-sky-700 px-4 py-3 text-white rounded-md flex items-center gap-2 hover:bg-sky-800 transition-all delay-75 active:bg-sky-700 w-fit lg:py-2 select-none">
          <BiUser />
          Área do Cliente
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="bg-white backdrop-blur-sm bg-opacity-90 rounded-md z-50 py-2 px-2 border shadow-lg mt-1 min-w-[180px]">
            {clientState.id !== "" ? (
              <>
                <div className="flex flex-col items-center justify-center">
                  <BiUser className="rounded-full p-1 bg-gray-300 text-4xl" />
                  <span className="text-gray-600 text-sm text-center mt-2">
                    Olá, {clientState.name || ""}
                  </span>
                </div>
                <DropdownMenu.Separator className="border-gray-300 border my-2" />
              </>
            ) : (
              ""
            )}
            <DropdownMenu.Group>
              {clientState.id === "" ? (
                <>
                  <Link href="/cadastro" passHref>
                    <DropdownMenu.Item className="text-gray-800 py-2 px-2 rounded-md flex items-center gap-2 hover:bg-sky-700 cursor-pointer hover:text-white active:bg-sky-800 transition-all delay-75 focus:outline-none focus:ring-2 focus:ring-sky-500">
                      <BiSave />
                      Cadastre-se
                    </DropdownMenu.Item>
                  </Link>
                  <Link href="/login" passHref>
                    <DropdownMenu.Item className="text-gray-800 py-2 px-2 rounded-md flex items-center gap-2 hover:bg-sky-700 cursor-pointer hover:text-white active:bg-sky-800 transition-all delay-75 focus:outline-none focus:ring-2 focus:ring-sky-500">
                      <BiLogIn />
                      Login
                    </DropdownMenu.Item>
                  </Link>
                </>
              ) : (
                ""
              )}
              {clientState.id !== "" ? (
                <>
                  <Link href={`/meusdados/${clientState.id}`}>
                    <DropdownMenu.Item className="text-gray-800 py-2 px-2 rounded-md flex items-center gap-2 hover:bg-sky-700 cursor-pointer hover:text-white active:bg-sky-800 transition-all delay-75 focus:outline-none focus:ring-2 focus:ring-sky-500">
                      <BiListCheck />
                      Meus Dados
                    </DropdownMenu.Item>
                  </Link>
                  <DropdownMenu.Item
                    className="text-red-600 py-2 px-2 rounded-md flex items-center gap-2 hover:bg-red-600 cursor-pointer hover:text-white active:bg-red-500 transition-all delay-75 focus:outline-none focus:ring-2 focus:ring-red-400"
                    onClick={() => logout()}
                  >
                    <BiLogOut />
                    Sair
                  </DropdownMenu.Item>
                </>
              ) : (
                ""
              )}
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );

  return (
    <Fragment>
      <header className="w-full h-16 border-b border-b-gray-50 flex items-center justify-center sticky top-0 z-40 bg-white backdrop-blur-sm bg-opacity-90 shadow-sm">
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
              className="text-3xl flex items-center justify-center bg-sky-700 rounded-md text-white p-1 hover:bg-sky-800 active:bg-sky-700"
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
          className="fixed bottom-5 right-5 rounded-full h-14 w-14 flex items-center justify-center bg-sky-700 drop-shadow-lg z-50 text-white text-3xl bg-opacity-95 backdrop-blur-sm hover:bg-sky-800 active:bg-sky-700 transition-all delay-75"
          onClick={scrollToTop}
        >
          <BiArrowToTop />
        </button>
      )}
    </Fragment>
  );
}
