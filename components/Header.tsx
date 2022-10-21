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
    setClientState({
      id: "",
      name: "",
      document: "",
      email: "",
      phone: "",
      street: "",
      number: "",
      district: "",
      cep: "",
      city: "",
      state: "",
    });
    push("/");
  };

  const NavMenu = () => (
    <div className="flex lg:items-center gap-7 flex-col lg:flex-row px-5 lg:px-0">
      <Link href={"/"} passHref>
        <a className="menu-items">
          <BiHome />
          Início
        </a>
      </Link>

      <Link passHref href={"#sobre"}>
        <a className="menu-items">
          <BiInfoSquare />
          Sobre Nós
        </a>
      </Link>

      <Link href={"/servicos"} passHref>
        <a className="menu-items">
          <BiCog />
          Serviços
        </a>
      </Link>

      <Link href={"#contato"} passHref>
        <a className="menu-items">
          <BiPhone />
          Contato
        </a>
      </Link>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="client-area-button">
          <BiUser />
          Área do Cliente
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="dropdown-content">
            {clientState.id !== "" ? (
              <>
                <div className="flex flex-col items-center justify-center">
                  <BiUser className="rounded-full p-1 bg-sky-300 text-4xl text-zinc-800" />
                  <span className="text-gray-100 text-sm text-center mt-2">
                    Olá, {clientState.name || ""}
                  </span>
                </div>
                <DropdownMenu.Separator className="border-zinc-600 border-b my-2" />
              </>
            ) : (
              ""
            )}
            <DropdownMenu.Group className="flex flex-col gap-2">
              {clientState.id === "" ? (
                <>
                  <Link href="/cadastro" passHref>
                    <DropdownMenu.Item className="dropdwon-items-blue">
                      <BiSave />
                      Cadastre-se
                    </DropdownMenu.Item>
                  </Link>
                  <Link href="/login" passHref>
                    <DropdownMenu.Item className="dropdwon-items-blue">
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
                    <DropdownMenu.Item className="dropdwon-items-blue">
                      <BiListCheck />
                      Meus Dados
                    </DropdownMenu.Item>
                  </Link>
                  <DropdownMenu.Item
                    className="dropdwon-items-red"
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
      <header className="w-full h-16 flex items-center justify-center sticky top-0 z-40 bg-zinc-800 backdrop-blur-sm bg-opacity-90 shadow-md">
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
              className="text-3xl flex items-center justify-center bg-sky-300 rounded-md text-zinc-800 p-1 hover:bg-sky-400 active:bg-sky-300"
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
        <div className="h-full w-[70%] bg-zinc-800 shadow-xl border-r border-r-zinc-600">
          <div className="flex justify-between h-14 border-b border-b-zinc-600 items-center px-5 mb-5 text-zinc-100">
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
          className="fixed bottom-5 right-5 rounded-full h-14 w-14 flex items-center justify-center bg-sky-300 drop-shadow-lg z-50 text-zinc-800 text-3xl bg-opacity-95 backdrop-blur-sm hover:bg-sky-400 active:bg-sky-300 transition-all delay-75"
          onClick={scrollToTop}
        >
          <BiArrowToTop />
        </button>
      )}
    </Fragment>
  );
}
