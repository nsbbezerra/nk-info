import { Fragment, useContext, useEffect, useState } from "react";
import {
  BiCheck,
  BiChevronLeft,
  BiHome,
  BiLogIn,
  BiMessageAltError,
  BiX,
} from "react-icons/bi";
import HeadApp from "../components/Head";
import Button from "../components/layout/Button";
import LottieComponent from "../components/Lottie";
import * as loginAnimation from "../assets/login.json";
import Link from "next/link";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import ReactInputMask from "react-input-mask";
import { LoginQuery } from "../graphql/clientMutation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { client } from "../lib/urql";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import ClientContext from "../context/client";

interface LoginProps {
  document: string;
  phone: string;
}

export default function Login() {
  const [registerMode, setRegisterMode] = useState<string>("cpf");
  const initialValues: LoginProps = { document: "", phone: "" };
  const validationSchema = Yup.object({
    document: Yup.string().required("Insira um documento"),
    phone: Yup.string().required("Insira um telefone"),
  });

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isDialogErrorOpen, setIsDialogErrorOpen] = useState<boolean>(false);
  const { setState: setClientState } = useContext(ClientContext);

  useEffect(() => {
    registerMode === "" && setRegisterMode("cpf");
  }, [registerMode]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { data, error } = await client
        .query(LoginQuery, {
          document: values.document,
          phone: values.phone,
        })
        .toPromise();

      const { clients } = data;

      if (clients.length !== 0) {
        setClientState(clients[0]);
        const user = JSON.stringify(clients[0]);
        localStorage.setItem("client", user);
        setIsDialogOpen(true);
      } else {
        setIsDialogErrorOpen(true);
      }
    },
  });

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
            <form onSubmit={formik.handleSubmit}>
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
                    value={formik.values.document}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.document &&
                  Boolean(formik.errors.document) ? (
                    <span className="text-sm text-red-600">
                      {formik.touched.document && formik.errors.document}
                    </span>
                  ) : (
                    ""
                  )}
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
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.phone && Boolean(formik.errors.phone) ? (
                    <span className="text-sm text-red-600">
                      {formik.touched.phone && formik.errors.phone}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <Button
                icon={<BiLogIn />}
                isFullSize
                buttonSize="lg"
                isLoading={formik.isSubmitting}
                type="submit"
              >
                Entrar
              </Button>
            </form>

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

      <AlertDialog.Root open={isDialogOpen}>
        <AlertDialog.Trigger asChild />
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-40 backdrop-blur-sm" />
          <AlertDialog.Content className="fixed w-[80%] left-[10%] right-[10%] sm:w-[50%] sm:left-[25%] sm:right-[25%] md:w-[40%] md:left-[30%] md:right-[30%] lg:w-[30%] bg-white shadow-lg rounded-md top-[15%] z-50 lg:left-[35%] lg:right-[35%] flex items-center justify-center flex-col p-5 gap-2">
            <AlertDialog.Title className="text-green-600 px-4 py-3 font-semibold text-4xl w-20 h-20 flex items-center justify-center bg-green-100 rounded-full">
              <BiCheck />
            </AlertDialog.Title>
            <AlertDialog.Description className="text-green-600 text-2xl font-semibold">
              Sucesso
            </AlertDialog.Description>
            <div className="text-center">
              <span className="text-gray-700">
                Login efetuado com sucesso, aproveite ao máximo!
              </span>
            </div>
            <div className="flex items-center w-full">
              <Link href="/">
                <AlertDialog.Action className="bg-blue-600 hover:bg-blue-700 active:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 px-4 h-10 text-white rounded-md flex justify-center items-center gap-2 transition-all delay-75 w-full">
                  <BiHome /> Ir ao início
                </AlertDialog.Action>
              </Link>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>

      <AlertDialog.Root open={isDialogErrorOpen}>
        <AlertDialog.Trigger asChild />
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-40 backdrop-blur-sm" />
          <AlertDialog.Content className="fixed w-[80%] left-[10%] right-[10%] sm:w-[50%] sm:left-[25%] sm:right-[25%] md:w-[40%] md:left-[30%] md:right-[30%] lg:w-[30%] bg-white shadow-lg rounded-md top-[15%] z-50 lg:left-[35%] lg:right-[35%] flex items-center justify-center flex-col p-5 gap-2">
            <AlertDialog.Title className="text-red-600 px-4 py-3 font-semibold text-4xl w-20 h-20 flex items-center justify-center bg-red-100 rounded-full">
              <BiMessageAltError />
            </AlertDialog.Title>
            <AlertDialog.Description className="text-red-600 text-2xl font-semibold">
              Ocorreu um erro
            </AlertDialog.Description>
            <div className="text-center">
              <span className="text-gray-700">
                Cliente não encontrado, por favor tente novamente.
              </span>
            </div>
            <div className="flex items-center w-full">
              <AlertDialog.Cancel
                className="bg-red-600 hover:bg-red-700 active:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 px-4 h-10 rounded-md flex text-white justify-center items-center gap-2 transition-all delay-75 w-full"
                onClick={() => setIsDialogErrorOpen(false)}
              >
                <BiX /> Fechar
              </AlertDialog.Cancel>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </Fragment>
  );
}
