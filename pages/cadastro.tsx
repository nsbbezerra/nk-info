import { Fragment, useEffect, useState } from "react";
import {
  BiChevronLeft,
  BiSave,
  BiCheck,
  BiHome,
  BiLogIn,
  BiX,
  BiMessageAltError,
} from "react-icons/bi";
import HeadApp from "../components/Head";
import Button from "../components/layout/Button";
import LottieComponent from "../components/Lottie";
import * as registerAnimation from "../assets/register.json";
import ReactInputMask from "react-input-mask";
import Link from "next/link";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "urql";
import { CreateClient, PublishClient } from "../graphql/clientMutation";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

export default function Cadastro() {
  const [registerMode, setRegisterMode] = useState<string>("cpf");
  const initialValues = {
    name: "",
    fantasyName: "",
    document: "",
    email: "",
    phone: "",
    typeDocument: registerMode,
    street: "",
    number: "",
    cep: "",
    city: "",
    district: "",
    state: "",
    comp: "",
  };

  const [createClientResult, createClient] = useMutation(CreateClient);
  const [publishClientResult, publishClient] = useMutation(PublishClient);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isDialogErrorOpen, setIsDialogErrorOpen] = useState<boolean>(false);
  const { fetching } = createClientResult;

  const validationSchema = Yup.object({
    name: Yup.string().required("Insira seu nome"),
    document: Yup.string().required("Insira seu Documento CPF ou CNPJ"),
    phone: Yup.string().required("Insira um telefone (Whatsapp)"),
    street: Yup.string().required("Insira uma rua ou avenida"),
    number: Yup.string().required("Insira o número do logradouro"),
    district: Yup.string().required("Insira um bairro"),
    cep: Yup.string().required("Insira um CEP"),
    city: Yup.string().required("Insira uma cidade"),
    state: Yup.string().required("Insira um estado"),
  });

  useEffect(() => {
    registerMode === "" && setRegisterMode("cpf");
  }, [registerMode]);

  async function publish(id: string) {
    const variables = { id: id };
    const { data, error } = await publishClient(variables);
    console.log({ data, error });
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const variables = {
        name: values.name,
        document: values.document,
        typeDocument: registerMode,
        fantasyName: values.fantasyName || "",
        email: values.email,
        phone: values.phone,
        street: values.street,
        number: values.number,
        comp: values.comp || "",
        district: values.district,
        cep: values.cep,
        city: values.city,
        state: values.state,
      };
      createClient(variables)
        .then((result) => {
          if (!result.data) {
            setIsDialogErrorOpen(true);
          } else {
            const { id } = result.data.createClient;
            publish(id);
            setIsDialogOpen(true);
          }
        })
        .catch((err) => {
          setIsDialogErrorOpen(true);
        });
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
            <form onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                  <label>
                    Nome <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="name"
                    className="w-full h-12 px-3 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75"
                    placeholder="Nome"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.name && Boolean(formik.errors.name) ? (
                    <span className="text-sm text-red-600">
                      {formik.touched.name && formik.errors.name}
                    </span>
                  ) : (
                    ""
                  )}
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
              </div>

              <div
                className={`grid grid-cols-1 ${
                  registerMode === "cpf" ? "md:grid-cols-2" : "md:grid-cols-3"
                } mt-3 gap-3`}
              >
                {registerMode === "cnpj" && (
                  <div>
                    <label>
                      Nome Fantasia <span className="text-red-600">*</span>
                    </label>
                    <input
                      name="fantasyName"
                      className="w-full h-12 px-3 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75"
                      placeholder="Email"
                      value={formik.values.fantasyName}
                      onChange={formik.handleChange}
                    />
                  </div>
                )}
                <div>
                  <label>Email</label>
                  <input
                    name="email"
                    className="w-full h-12 px-3 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75"
                    placeholder="Email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.email && Boolean(formik.errors.email) ? (
                    <span className="text-sm text-red-600">
                      {formik.touched.email && formik.errors.email}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <label>
                    Telefone (Whatsapp) <span className="text-red-600">*</span>
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

              <div className="grid grid-cols-1 md:grid-cols-4 mt-3 gap-3">
                <div className="md:col-span-3">
                  <label>
                    Rua / Avenida <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full h-12 px-3 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75"
                    placeholder="Rua / Avenida"
                    name="street"
                    value={formik.values.street}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.street && Boolean(formik.errors.street) ? (
                    <span className="text-sm text-red-600">
                      {formik.touched.street && formik.errors.street}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <label>
                    Número <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full h-12 px-3 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75"
                    placeholder="Número"
                    name="number"
                    value={formik.values.number}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.number && Boolean(formik.errors.number) ? (
                    <span className="text-sm text-red-600">
                      {formik.touched.number && formik.errors.number}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 mt-3 gap-3">
                <div>
                  <label>Complemento</label>
                  <input
                    type="text"
                    className="w-full h-12 px-3 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75"
                    placeholder="Complemento"
                    name="comp"
                    value={formik.values.comp}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.comp && Boolean(formik.errors.comp) ? (
                    <span className="text-sm text-red-600">
                      {formik.touched.comp && formik.errors.comp}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <label>
                    Bairro <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full h-12 px-3 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75"
                    placeholder="Bairro"
                    name="district"
                    value={formik.values.district}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.district &&
                  Boolean(formik.errors.district) ? (
                    <span className="text-sm text-red-600">
                      {formik.touched.district && formik.errors.district}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 mt-3 gap-3 mb-5">
                <div className="md:col-span-1">
                  <label>
                    CEP <span className="text-red-600">*</span>
                  </label>
                  <ReactInputMask
                    mask={"99.999-999"}
                    className="w-full h-12 px-3 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75"
                    placeholder="CEP"
                    name="cep"
                    value={formik.values.cep}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.cep && Boolean(formik.errors.cep) ? (
                    <span className="text-sm text-red-600">
                      {formik.touched.cep && formik.errors.cep}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="md:col-span-3">
                  <label>
                    Cidade <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full h-12 px-3 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75"
                    placeholder="Cidade"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    name="city"
                  />
                  {formik.touched.city && Boolean(formik.errors.city) ? (
                    <span className="text-sm text-red-600">
                      {formik.touched.city && formik.errors.city}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <label>
                    UF <span className="text-red-600">*</span>
                  </label>
                  <select
                    className="w-full h-12 px-3 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75 bg-transparent"
                    placeholder="UF"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    name="state"
                  >
                    <option value="AC">AC</option>
                    <option value="AL">AL</option>
                    <option value="AP">AP</option>
                    <option value="AM">AM</option>
                    <option value="BA">BA</option>
                    <option value="CE">CE</option>
                    <option value="DF">DF</option>
                    <option value="ES">ES</option>
                    <option value="GO">GO</option>
                    <option value="MA">MA</option>
                    <option value="MT">MT</option>
                    <option value="MS">MS</option>
                    <option value="MG">MG</option>
                    <option value="PA">PA</option>
                    <option value="PB">PB</option>
                    <option value="PR">PR</option>
                    <option value="PE">PE</option>
                    <option value="PI">PI</option>
                    <option value="RJ">RJ</option>
                    <option value="RN">RN</option>
                    <option value="RS">RS</option>
                    <option value="RO">RO</option>
                    <option value="RR">RR</option>
                    <option value="SC">SC</option>
                    <option value="SP">SP</option>
                    <option value="SE">SE</option>
                    <option value="TO">TO</option>
                  </select>
                  {formik.touched.state && Boolean(formik.errors.state) ? (
                    <span className="text-sm text-red-600">
                      {formik.touched.state && formik.errors.state}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <Button
                icon={<BiSave />}
                buttonSize="lg"
                type="submit"
                isLoading={fetching}
              >
                Cadastrar
              </Button>
            </form>
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
                Seu cadastro foi concluído com sucesso! Agora escolha uma opção
                abaixo:
              </span>
            </div>
            <div className="flex items-center gap-3 w-full flex-col xl:flex-row">
              <Link href={"/"}>
                <AlertDialog.Cancel className="bg-gray-200 hover:bg-gray-300 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 px-4 h-10 rounded-md flex justify-center items-center gap-2 transition-all delay-75 w-full">
                  <BiHome /> Ir para o início
                </AlertDialog.Cancel>
              </Link>
              <Link href="/login">
                <AlertDialog.Action className="bg-blue-600 hover:bg-blue-700 active:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 px-4 h-10 text-white rounded-md flex justify-center items-center gap-2 transition-all delay-75 w-full">
                  <BiLogIn /> Fazer login
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
                Ops, lamentamos mais algo saiu mal no seu cadastro, tente
                novamente!
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
