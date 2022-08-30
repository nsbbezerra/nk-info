import { Fragment, useEffect, useState } from "react";
import { BiChevronLeft, BiLogIn } from "react-icons/bi";
import HeadApp from "../components/Head";
import Button from "../components/layout/Button";
import LottieComponent from "../components/Lottie";
import * as loginAnimation from "../assets/login.json";
import Link from "next/link";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import ReactInputMask from "react-input-mask";

export default function Login() {
  const [registerMode, setRegisterMode] = useState<string>("cpf");
  useEffect(() => {
    registerMode === "" && setRegisterMode("cpf");
  }, [registerMode]);
  return (
    <Fragment>
      <HeadApp title="NK Informática | Sistemas Web, Gestão Comercial, Marketing Digital, Gestão de Redes Sociais" />
      <section className="grid grid-cols-1 lg:grid-cols-3 h-screen w-screen">
        <article className="w-full bg-gray-900 rounded-br-[70px] lg:rounded-br-[150px] p-5 flex items-center justify-center">
          <div>
            <div className="container mx-auto flex flex-col items-center justify-center gap-3">
              <div className="w-1/2 md:w-72 lg:w-72">
                <LottieComponent
                  animation={loginAnimation}
                  width="100%"
                  height={"100%"}
                />
              </div>
              <h1 className="text-gray-300 text-3xl font-bold text-center max-w-5xl">
                Bem vindo de volta!
              </h1>
              <p className="text-gray-100 text-center text-sm">
                Entre com sua conta e tenha acesso aos seus planos contratados,
                seus dados, mais também dê uma olhada nos nossos novos planos,
                temos muita coisa preparada especialmente para você.
              </p>
            </div>
          </div>
        </article>

        <aside className="p-10 flex items-center justify-center w-full h-full col-span-2">
          <div className="w-full max-w-sm border rounded-md shadow-lg mx-auto p-5">
            <Link href="/" passHref>
              <a className="flex items-center gap-2 text-blue-600 hover:underline mb-3 cursor-pointer w-fit">
                <BiChevronLeft />
                Voltar
              </a>
            </Link>
            <ToggleGroup.Root
              type="single"
              className="inline-flex rounded-md mb-3 overflow-hidden"
              onValueChange={(e) => setRegisterMode(e)}
              value={registerMode}
            >
              <ToggleGroup.Item
                value="cpf"
                className={`${
                  registerMode === "cpf" ? "bg-blue-800" : "bg-blue-600"
                } text-white h-8 px-2 flex items-center border-r`}
              >
                Pessoa Física
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value="cnpj"
                className={`${
                  registerMode === "cnpj" ? "bg-blue-800" : "bg-blue-600"
                } text-white h-8 px-2 flex items-center`}
              >
                Pessoa Jurídica
              </ToggleGroup.Item>
            </ToggleGroup.Root>
            <div className="flex flex-col gap-2 mb-5">
              <div className="w-full">
                <label>
                  {registerMode === "cpf" ? "CPF" : "CNPJ"}{" "}
                  <span className="text-red-600">*</span>
                </label>
                <ReactInputMask
                  mask={
                    registerMode === "cpf"
                      ? "999.999.999-99"
                      : "99.999.999/9999-99"
                  }
                  name="document"
                  className="w-full h-12 px-3 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75"
                  placeholder={registerMode === "cpf" ? "CPF" : "CNPJ"}
                />
              </div>

              <div className="w-full">
                <label>
                  Telefone <span className="text-red-600">*</span>
                </label>
                <ReactInputMask
                  mask={"99 99999-9999"}
                  className="w-full h-12 px-3 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75"
                  placeholder="Telefone"
                  name="phone"
                />
              </div>
            </div>

            <Button icon={<BiLogIn />} isFullSize buttonSize="lg">
              Entrar
            </Button>

            <div className="flex items-center justify-center flex-col gap-1 mt-3">
              <Link href="/cadastro" passHref>
                <a className="text-gray-600 hover:underline cursor-pointer">
                  Não possui conta? Cadastre-se
                </a>
              </Link>
            </div>
          </div>
        </aside>
      </section>
    </Fragment>
  );
}
