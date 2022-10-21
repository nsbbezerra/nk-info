import type { NextPage } from "next";
import Image from "next/image";
import { Fragment, useState } from "react";
import HeadApp from "../components/Head";
import Header from "../components/Header";
import Panel from "../components/Panel";
import {
  BiMapPin,
  BiPhone,
  BiMailSend,
  BiCalendar,
  BiSend,
  BiX,
  BiMessageAltError,
  BiCheck,
} from "react-icons/bi";
import Footer from "../components/Footer";
import Button from "../components/layout/Button";
import { useMutation } from "urql";
import { CREATE_MESSAGE, PUBLISH_MESSAGE } from "../graphql/messages";
import * as Yup from "yup";
import { useFormik } from "formik";
import ReactInputMask from "react-input-mask";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

interface MessageProps {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Home: NextPage = () => {
  const [createMessageResult, createMessage] = useMutation(CREATE_MESSAGE);
  const [publishMessageResult, publishMessage] = useMutation(PUBLISH_MESSAGE);
  const [loading, setLoading] = useState<boolean>(false);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isDialogErrorOpen, setIsDialogErrorOpen] = useState<boolean>(false);
  const [messageDialog, setMessageDialog] = useState<string>("");

  function openError() {
    setIsDialogErrorOpen(true);
  }

  function openSuccess() {
    setIsDialogOpen(true);
  }

  function closeError() {
    setIsDialogErrorOpen(false);
  }

  function closeSuccess() {
    setIsDialogOpen(false);
  }

  const initialValues: MessageProps = {
    email: "",
    message: "",
    name: "",
    phone: "",
  };

  const validationScheme = Yup.object({
    name: Yup.string().required("Insira seu nome"),
    message: Yup.string().required("Insira uma mensagem"),
    email: Yup.string()
      .email("Insira um email válido")
      .required("Insira um email"),
    phone: Yup.string().required("Insira um telefone"),
  });

  const setPublishMessage = (id: string) => {
    try {
      const variables = { id };
      publishMessage(variables).then((response) => {
        setLoading(false);
        if (response.error) {
          let message = response.error.message;
          setMessageDialog(message);
          openError();
        } else if (response.data) {
          setMessageDialog("Mensagem enviada com sucesso");
          openSuccess();
        }
      });
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationScheme,
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      const variables = {
        name: values.name,
        email: values.email,
        message: values.message,
        phone: values.phone,
      };

      createMessage(variables).then((response) => {
        setLoading(false);
        if (response.error) {
          let message = response.error.message;
          setMessageDialog(message);
        } else if (response.data) {
          setPublishMessage(response.data.createMessage.id);
          resetForm();
        }
      });
    },
  });

  return (
    <Fragment>
      <HeadApp title="NK Informática | Sistemas Web, Gestão Comercial, Marketing Digital, Gestão de Redes Sociais" />
      <Header />
      <Panel />
      {/** SEÇÃO SOBRE NÓS */}

      <section className="container mx-auto py-16 px-10 lg:px-20" id="sobre">
        <div className="w-full">
          <div className="text-center w-full flex items-center flex-col gap-2">
            <h2 className="title">Sobre Nós!</h2>
            <div className="divider-gradient" />
          </div>
          <div className="text-center text-gray-300 mt-10">
            <p>
              Somos uma empresa desde 2017 focada em soluções na área de
              Tecnologia da Informação, estamos sempre em atualização tanto na
              nossa Stack de Desenvolvimento quanto nos ferramentais necessários
              para oferecer aos nossos clientes a maior confiabilidade nos
              nossos produtos e serviços.
            </p>
            <p>
              Temos orgulho em prestar um serviço qualificado, atendendo desde o
              pequeno até o grande empresário, trabalhamos para colocar sua
              empresa sempre bem visível, flúida, destravada e automatizada,
              nossas áreas de atuação são:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-10 mt-10">
            <div className="overflow-hidden rounded-md bg-zinc-800 border border-zinc-600 shadow-xl h-fit">
              <div className="bg-zinc-100 p-7 rounded-br-[120px] bg-opacity-30">
                <Image
                  draggable={false}
                  src={"/img/svg/site.svg"}
                  width={491}
                  height={384}
                  alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                  layout="responsive"
                  objectFit="contain"
                />
              </div>
              <div className="p-3">
                <strong className="text-sky-300 text-2xl">
                  Criação de Websites
                </strong>
                <ul className="list-inside list-disc mt-3 text-zinc-300 mb-3">
                  <li>
                    Sites responsivos, se adaptam a todos os tamanhos de tela
                  </li>
                  <li>Sites otimizados para indexação nas buscas do Google</li>
                  <li>
                    Layout personalizado com suas cores, logo, textos e muito
                    mais
                  </li>
                  <li>Domínio 100% gratuito</li>
                  <li>
                    Disponibilização mensal de métricas e dados do servidor
                  </li>
                </ul>

                <a className="buttom-md buttom-blue buttom-full cursor-pointer">
                  Conheça nossos planos
                </a>
              </div>
            </div>
            <div className="overflow-hidden rounded-md bg-zinc-800 border border-zinc-600 shadow-xl h-fit">
              <div className="bg-zinc-100 p-7 rounded-br-[120px] bg-opacity-30">
                <Image
                  draggable={false}
                  src={"/img/svg/ecommerce-two.svg"}
                  width={491}
                  height={384}
                  alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                  layout="responsive"
                  objectFit="contain"
                />
              </div>
              <div className="p-3">
                <strong className="text-sky-300 text-2xl">
                  Sistema de gestão e Ecommerce
                </strong>
                <ul className="list-inside list-disc mt-3 text-zinc-300 mb-3">
                  <li>Sistema de gestão completo</li>
                  <li>
                    Gestão de clientes, funcionários, compras, comissões e
                    etc...
                  </li>
                  <li>
                    Gestão de pagamentos automatizados com as melhores
                    plataformas do mercado: Mercado Pago, Pagarme, Stripe
                  </li>
                  <li>
                    Emissão de NFE, NFCe, envios automáticos aos clientes por
                    e-mail
                  </li>
                </ul>

                <a className="buttom-md buttom-blue buttom-full cursor-pointer">
                  Conheça nossos planos
                </a>
              </div>
            </div>
            <div className="overflow-hidden rounded-md bg-zinc-800 border border-zinc-600 shadow-xl h-fit">
              <div className="bg-zinc-100 rounded-br-[120px] bg-opacity-30">
                <Image
                  draggable={false}
                  src={"/img/svg/manage-two.svg"}
                  width={491}
                  height={384}
                  alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                  layout="responsive"
                  objectFit="contain"
                />
              </div>
              <div className="p-3">
                <strong className="text-sky-300 text-2xl">
                  Marketing Digital e Gestão de Redes Sociais
                </strong>
                <ul className="list-inside list-disc mt-3 text-zinc-300 mb-3">
                  <li>
                    Gestão de redes sociais: Linkedin, Instagram, Facebook,
                    Tiktok
                  </li>
                  <li>Estratégias de crescimento</li>
                  <li>Estruturação de conteúdo</li>
                  <li>Estratégias de impulsionamento de conteúdos</li>
                  <li>Captura de novos seguidores</li>
                </ul>

                <a className="buttom-md buttom-blue buttom-full cursor-pointer">
                  Conheça nossos planos
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/** SEÇÃO DE ESPECIALIDADES */}

      <section className="w-full bg-zinc-800 rounded-br-[70px] lg:rounded-br-[150px] p-10 lg:p-14 shadow-xl">
        <div className="container mx-auto w-full h-full flex justify-end relative items-center flex-col lg:flex-row">
          <div className="w-[95%] lg:w-[58%] rounded-md bg-zinc-900 shadow-xl lg:absolute h-fit z-10 left-0 p-7 flex flex-col gap-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-100">
              Somos especialistas em soluções de{" "}
              <span className="text-sky-300">negócios e serviços!</span>
            </h3>
            <p className="text-sm text-gray-400">
              Quando surge uma boa ideia, nosso trabalho é transformar em
              realidade, usando das melhores tecnologias disponíveis para que
              esta idéia seja alcançada pelo maior número de pessoas possíveis.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2">
              <div className="minimal-card">
                <div className="w-12 p-2 h-12">
                  <Image
                    draggable={false}
                    src={"/img/javascript.svg"}
                    width={200}
                    height={200}
                    alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <div className="minimal-card-desc-text">JavaScript</div>
              </div>

              <div className="minimal-card">
                <div className="w-12 h-12 p-2">
                  <Image
                    draggable={false}
                    src={"/img/typescript.svg"}
                    width={200}
                    height={200}
                    alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <div className="minimal-card-desc-text">TypeScript</div>
              </div>

              <div className="minimal-card">
                <div className="w-12 p-2">
                  <Image
                    draggable={false}
                    src={"/img/react.svg"}
                    width={225}
                    height={200}
                    alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <div className="minimal-card-desc-text">React JS</div>
              </div>

              <div className="minimal-card">
                <div className="w-12 h-12 p-2">
                  <Image
                    draggable={false}
                    src={"/img/react-native.svg"}
                    width={225}
                    height={200}
                    alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <div className="minimal-card-desc-text">React Native</div>
              </div>

              <div className="minimal-card">
                <div className="w-16 h-12 p-2">
                  <Image
                    draggable={false}
                    src={"/img/node.svg"}
                    width={330}
                    height={200}
                    alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <div className="minimal-card-desc-text">Node JS</div>
              </div>

              <div className="minimal-card">
                <div className="w-16 h-12 p-2">
                  <Image
                    draggable={false}
                    src={"/img/express.svg"}
                    width={360}
                    height={200}
                    alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <div className="minimal-card-desc-text">Express</div>
              </div>

              <div className="minimal-card">
                <div className="w-12 h-12 p-2">
                  <Image
                    draggable={false}
                    src={"/img/postgres.svg"}
                    width={200}
                    height={200}
                    alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <div className="minimal-card-desc-text">Posgres SQL</div>
              </div>

              <div className="minimal-card">
                <div className="w-28 h-12 p-2">
                  <Image
                    draggable={false}
                    src={"/img/mongo.svg"}
                    width={740}
                    height={200}
                    alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <div className="minimal-card-desc-text">Mongo DB</div>
              </div>

              <div className="minimal-card">
                <div className="w-20 h-12 p-2">
                  <Image
                    draggable={false}
                    src={"/img/next.svg"}
                    width={400}
                    height={200}
                    alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <div className="minimal-card-desc-text">Next JS</div>
              </div>

              <div className="minimal-card">
                <div className="w-20 h-12 p-2">
                  <Image
                    draggable={false}
                    src={"/img/nest.svg"}
                    width={400}
                    height={200}
                    alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <div className="minimal-card-desc-text">Nest JS</div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="minimal-card">
                <div className="w-28 p-2 h-10">
                  <Image
                    draggable={false}
                    src={"/img/instagram.svg"}
                    width={680}
                    height={200}
                    alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <div className="minimal-card-desc-text">Instagram ADS</div>
              </div>
              <div className="minimal-card">
                <div className="w-36 p-2 h-10">
                  <Image
                    draggable={false}
                    src={"/img/facebook-ads.svg"}
                    width={1780}
                    height={240}
                    alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <div className="minimal-card-desc-text">Facebook ADS</div>
              </div>
              <div className="minimal-card">
                <div className="w-12 p-2 h-10">
                  <Image
                    draggable={false}
                    src={"/img/google-ads.svg"}
                    width={220}
                    height={200}
                    alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <div className="minimal-card-desc-text">Google ADS</div>
              </div>
            </div>
          </div>
          <div className="-mt-10 w-full lg:w-[45vw] rounded-md overflow-hidden sm:h-[450px] lg:h-fit lg:mt-0 xl:max-h-[500px]">
            <Image
              draggable={false}
              src={"/img/bulb.jpg"}
              width={1280}
              height={1020}
              alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
              layout="responsive"
              objectFit="cover"
            />
          </div>
        </div>
      </section>

      {/** SEÇÃO DE CONTATO */}

      <section className="mt-16 w-full" id="contato">
        <div className="container mx-auto px-5 lg:px-0 max-w-5xl">
          <div className="text-center w-full flex items-center flex-col gap-2 mb-10">
            <h2 className="title">Fale Conosco</h2>
            <div className="divider-gradient" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center items-start">
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <div className="rounded-pin">
                <BiMapPin />
              </div>
              <span className="font-semibold text-zinc-400">Endereço</span>
              <span className="text-sm text-gray-300">
                Rua 34, Qd 16 Lt 15, Setor Canavieiras, CEP: 77.710-000, Pedro
                Afonso - TO
              </span>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <div className="rounded-pin">
                <BiMailSend />
              </div>
              <span className="font-semibold text-zinc-400">Email</span>
              <span className="text-sm text-gray-300">
                contato.nk.info@gmail.com
              </span>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <div className="rounded-pin">
                <BiPhone />
              </div>
              <span className="font-semibold text-zinc-400">Telefone</span>
              <span className="text-sm text-gray-300">+55 (63) 99971-1716</span>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <div className="rounded-pin">
                <BiCalendar />
              </div>
              <span className="font-semibold text-zinc-400">
                Horários de Atendimento
              </span>
              <span className="text-sm text-gray-300">
                De Segunda a Sexta, das 08:00 às 11:30 e das 13:30 às 17:30
              </span>
            </div>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="w-full max-w-5xl mx-auto mt-10">
              <label className="input-label" htmlFor="name">
                Nome
              </label>
              <input
                className="input"
                placeholder="Seu nome aqui"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.touched.name && Boolean(formik.errors.name) ? (
                <span className="text-sm text-red-300">
                  {formik.touched.name && formik.errors.name}
                </span>
              ) : (
                ""
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 mb-3">
                <div>
                  <label className="input-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="input"
                    placeholder="Seu email aqui"
                    id="email"
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.email && Boolean(formik.errors.email) ? (
                    <span className="text-sm text-red-300">
                      {formik.touched.email && formik.errors.email}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <label className="input-label" htmlFor="phone">
                    Telefone
                  </label>
                  <ReactInputMask
                    mask={"99 99999-9999"}
                    className="input"
                    placeholder="Seu telefone aqui"
                    id="phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.phone && Boolean(formik.errors.phone) ? (
                    <span className="text-sm text-red-300">
                      {formik.touched.phone && formik.errors.phone}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <label className="input-label" htmlFor="message">
                Mensagem
              </label>
              <textarea
                className="textarea"
                placeholder="Sua mensagem aqui"
                id="message"
                name="message"
                rows={6}
                value={formik.values.message}
                onChange={formik.handleChange}
              />
              {formik.touched.message && Boolean(formik.errors.message) ? (
                <span className="text-sm text-red-300">
                  {formik.touched.message && formik.errors.message}
                </span>
              ) : (
                ""
              )}

              <div className="mt-5">
                <Button buttonSize="lg" type="submit" isLoading={loading}>
                  <BiSend />
                  Enviar Mensagem
                </Button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer />

      <AlertDialog.Root open={isDialogOpen}>
        <AlertDialog.Trigger asChild />
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 z-50" />
          <AlertDialog.Content className="fixed w-[80%] left-[10%] right-[10%] sm:w-[50%] sm:left-[25%] sm:right-[25%] md:w-[40%] md:left-[30%] md:right-[30%] lg:w-[30%] bg-zinc-800 border border-zinc-600 shadow-2xl rounded-md top-[15%] z-50 lg:left-[35%] lg:right-[35%] flex items-center justify-center flex-col p-5 gap-2">
            <AlertDialog.Title className="text-zinc-800 px-4 py-3 font-semibold text-4xl w-20 h-20 flex items-center justify-center bg-green-300 rounded-full">
              <BiCheck />
            </AlertDialog.Title>
            <AlertDialog.Description className="text-green-300 text-2xl font-semibold">
              Sucesso
            </AlertDialog.Description>
            <div className="text-center mb-5">
              <span className="text-gray-300">{messageDialog}</span>
            </div>
            <div className="flex items-center w-full">
              <AlertDialog.Cancel
                className="buttom-md buttom-full buttom-green"
                onClick={() => closeSuccess()}
              >
                <BiX /> Fechar
              </AlertDialog.Cancel>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>

      <AlertDialog.Root open={isDialogErrorOpen}>
        <AlertDialog.Trigger asChild />
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 z-50" />
          <AlertDialog.Content className="fixed w-[80%] left-[10%] right-[10%] sm:w-[50%] sm:left-[25%] sm:right-[25%] md:w-[40%] md:left-[30%] md:right-[30%] lg:w-[30%] bg-zinc-800 border border-zinc-600 shadow-2xl rounded-md top-[15%] z-50 lg:left-[35%] lg:right-[35%] flex items-center justify-center flex-col p-5 gap-2">
            <AlertDialog.Title className="text-zinc-800 px-4 py-3 font-semibold text-4xl w-20 h-20 flex items-center justify-center bg-red-300 rounded-full">
              <BiMessageAltError />
            </AlertDialog.Title>
            <AlertDialog.Description className="text-red-300 text-2xl font-semibold">
              Ocorreu um erro
            </AlertDialog.Description>
            <div className="text-center mb-5">
              <span className="text-gray-300">{messageDialog}</span>
            </div>
            <div className="flex items-center w-full">
              <AlertDialog.Cancel
                className="buttom-md buttom-full buttom-red"
                onClick={() => closeError()}
              >
                <BiX /> Fechar
              </AlertDialog.Cancel>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </Fragment>
  );
};

export default Home;
