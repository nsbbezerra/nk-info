import { Fragment, useState } from "react";
import { BiChevronLeft, BiSave } from "react-icons/bi";
import HeadApp from "../components/Head";
import Button from "../components/layout/Button";
import LottieComponent from "../components/Lottie";
import * as registerAnimation from "../assets/register.json";
import ReactInputMask from "react-input-mask";
import Link from "next/link";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

export default function Cadastro() {
  const [registerMode, setRegisterMode] = useState<string>("cpf");

  return (
    <Fragment>
      <HeadApp title="NK Informática | Sistemas Web, Gestão Comercial, Marketing Digital, Gestão de Redes Sociais" />
      <section className="grid grid-cols-1 lg:grid-cols-3 h-screen w-screen">
        <article className="w-full bg-gray-900 rounded-br-[70px] lg:rounded-br-[150px] p-5 flex items-center justify-center">
          <div>
            <div className="container mx-auto flex flex-col items-center justify-center gap-3">
              <div className="w-1/2 md:w-72 lg:w-72">
                <LottieComponent
                  animation={registerAnimation}
                  width="100%"
                  height={"100%"}
                />
              </div>
              <h1 className="text-gray-300 text-3xl font-bold text-center max-w-5xl">
                Seja nosso cliente!
              </h1>
              <p className="text-gray-100 text-center text-sm">
                Que bom que chegou até aqui, agora é só mais um passo até você
                ter acesso aos melhores pacotes de serviços para você ou para o
                seu negócio, cadastre-se e tenha acesso às melhores ferramentas
                que preparamos especialmente para você!
              </p>
            </div>
          </div>
        </article>

        <aside className="lg:col-span-2 p-5 md:p-10 flex justify-center items-center w-full h-full">
          <div className="border rounded-md shadow-lg p-5 w-full">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2">
                <label>
                  Nome <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75"
                  placeholder="Nome"
                />
              </div>
              <div>
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
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75"
                  placeholder={registerMode === "cpf" ? "CPF" : "CNPJ"}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 mt-3 gap-3">
              <div>
                <label>
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75"
                  placeholder="Email"
                />
              </div>
              <div>
                <label>
                  Whatsapp <span className="text-red-600">*</span>
                </label>
                <ReactInputMask
                  mask={"99 99999-9999"}
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75"
                  placeholder="Whatsapp"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 mt-3 gap-3">
              <div className="md:col-span-3">
                <label>
                  Logradouro <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75"
                  placeholder="Logradouro"
                />
              </div>
              <div>
                <label>
                  Número <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75"
                  placeholder="Número"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 mt-3 gap-3">
              <div className="md:col-span-1">
                <label>
                  CEP <span className="text-red-600">*</span>
                </label>
                <ReactInputMask
                  mask={"99.999-999"}
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75"
                  placeholder="CEP"
                />
              </div>
              <div className="md:col-span-3">
                <label>
                  Cidade <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75"
                  placeholder="Cidade"
                />
              </div>
              <div>
                <label>
                  UF <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75"
                  placeholder="UF"
                  maxLength={2}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 mt-3 gap-3 mb-5">
              <div>
                <label>
                  Usuário <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75"
                  placeholder="Usuário"
                />
              </div>
              <div>
                <label>
                  Senha <span className="text-red-600">*</span>
                </label>
                <input
                  type="password"
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75"
                  placeholder="Senha"
                />
              </div>
            </div>

            <Button icon={<BiSave />} buttonSize="lg">
              Cadastrar
            </Button>
          </div>
        </aside>
      </section>
    </Fragment>
  );
}
