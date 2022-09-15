import Image from "next/image";
import { Fragment, useState, useContext, useEffect } from "react";
import {
  BiCheck,
  BiMessageAltError,
  BiPlus,
  BiRefresh,
  BiSave,
  BiX,
} from "react-icons/bi";
import Stripe from "stripe";
import Button from "../layout/Button";
import * as Dialog from "@radix-ui/react-dialog";
import { useFormik } from "formik";
import { useMutation, useQuery } from "urql";
import ClientContext from "../../context/client";
import {
  CREATE_CALL,
  FIND_CALLS_AND_INVOICES,
  FIND_CALL_TO_COMPARE,
  PUBLISH_CALL,
} from "../../graphql/clientMoviment";
import * as Yup from "yup";
import axios from "axios";
import { client } from "../../lib/urql";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

type InvoicePropsIntern = {
  id: string;
  serviceName: string;
};

interface CallProps {
  id: string;
  description: string;
  dateCall: Date;
  callStatus: "open" | "accepted" | "refused" | "finished";
  month: string;
  year: string;
  invoice: InvoicePropsIntern;
}

interface SubscriptionProps {
  subscription: Stripe.Subscription;
}

interface InvoiceProps {
  activateCode?: string;
  id: string;
  category: string;
  checkoutId: string;
  limitCalls?: number;
  limitCallsVirtual?: number;
  paymentIntentId?: string;
  serviceName: string;
}

interface ValuesToCompareProps {
  calls: number;
  limitCalls: number;
  status: Stripe.Subscription.Status;
}

export default function MyCalls() {
  const { state } = useContext(ClientContext);
  const [dateActive] = useState<Date>(new Date());
  const [calls, setCalls] = useState<CallProps[]>([]);
  const [invoice, setInvoice] = useState<InvoiceProps[]>([]);
  const [subscription, setSubscription] = useState<SubscriptionProps | null>();
  const [compareValues, setCompareValues] = useState<ValuesToCompareProps>({
    calls: 0,
    limitCalls: 0,
    status: "incomplete",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [dialog, setDialog] = useState<boolean>(false);
  const [invoiceId, setInvoiceId] = useState<string>("");

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isDialogErrorOpen, setIsDialogErrorOpen] = useState<boolean>(false);
  const [messageDialog, setMessageDialog] = useState<string>("");

  const [callsResult, reexecuteQuery] = useQuery({
    query: FIND_CALLS_AND_INVOICES,
    variables: {
      id: state.id,
      month: dateActive.toLocaleString("pt-Br", { month: "long" }),
      year: dateActive.getFullYear().toString(),
    },
  });

  const validationSchema = Yup.object({
    description: Yup.string().required("Insira uma descrição"),
  });

  const [createCallResult, createCall] = useMutation(CREATE_CALL);
  const [publishCallResult, publishCall] = useMutation(PUBLISH_CALL);

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

  const { data, error, fetching } = callsResult;

  useEffect(() => {
    if (data) {
      setCalls(data.calls);
      setInvoice(data.invoices);
    }
  }, [data]);

  if (error) {
    let message = error.message;
    setMessageDialog(message);
    openError();
  }

  const initialValues = {
    description: "",
    dateCall: dateActive,
    callStatus: "open",
    month: dateActive.toLocaleString("pt-Br", { month: "long" }),
    year: dateActive.getFullYear().toString(),
  };

  function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  const setPublishCall = (id: string) => {
    try {
      const variables = { id };

      publishCall(variables).then((response) => {
        if (response.error) {
          setMessageDialog(response.error.message);
          openError();
        } else if (response.data) {
          setLoading(false);
          setInvoiceId("");
          setCompareValues({
            calls: 0,
            limitCalls: 0,
            status: "incomplete",
          });
          setDialog(false);
          reexecuteQuery();
          setMessageDialog("Chamado aberto com sucesso");
          openSuccess();
        }
      });
    } catch (error) {
      let message = (error as Error).message;
      setMessageDialog(message);
      openError();
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      const variables = {
        client: state.id,
        description: values.description,
        dateCall: dateActive,
        callStatus: "open",
        month: dateActive.toLocaleString("pt-Br", { month: "long" }),
        year: dateActive.getFullYear().toString(),
        invoice: invoiceId,
      };

      createCall(variables).then((response) => {
        if (response.error) {
          setMessageDialog(response.error.message);
          openError();
        } else if (response.data) {
          setPublishCall(response.data.createCall.id);
          resetForm();
        }
      });
    },
  });

  const handleSearchSubscription = async (id: string) => {
    setCompareValues({
      calls: 0,
      limitCalls: 0,
      status: "incomplete",
    });
    const result = invoice.find((obj) => obj.id === id);
    setInvoiceId(id);
    try {
      const { data } = await axios.post("/api/subscription", {
        id: result?.paymentIntentId || "",
      });
      const variables = {
        id,
        month: dateActive.toLocaleString("pt-Br", { month: "long" }),
        year: dateActive.getFullYear().toString(),
      };
      const compareInvoice = await client
        .query(FIND_CALL_TO_COMPARE, variables)
        .toPromise();

      const totalCalls = !compareInvoice.data.calls.length
        ? 0
        : compareInvoice.data.calls.length;

      const options: ValuesToCompareProps = {
        calls: totalCalls,
        limitCalls: result?.limitCalls || 0,
        status: data.subscription.status || "incomplete",
      };

      setCompareValues(options);
    } catch (error) {
      let message = (error as Error).message;
      setMessageDialog(message);
      openError();
    }
  };

  const formatDate = (myDate: Date) => {
    const dateformat = new Date(myDate);
    const dia = (dateformat.getDate() + 1).toString().padStart(2, "0");
    const mes = (dateformat.getMonth() + 1).toString().padStart(2, "0");
    const ano = dateformat.getFullYear();

    return `${dia}/${mes}/${ano}`;
  };

  return (
    <Fragment>
      <div className="px-4 py-5 sm:px-6 rounded-md border">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Meus Chamados:{" "}
          {capitalizeFirstLetter(
            dateActive.toLocaleString("pt-Br", { month: "long" })
          )}{" "}
          de {dateActive.getFullYear()}
        </h3>
      </div>

      <div className="mt-5 flex sm:items-center gap-3 flex-col sm:flex-row">
        <Button
          icon={<BiPlus />}
          buttonSize="lg"
          onClick={() => setDialog(true)}
        >
          Novo Chamado
        </Button>
        <Button
          icon={<BiRefresh />}
          buttonSize="lg"
          onClick={() => reexecuteQuery()}
          scheme="warning"
        >
          Atualizar
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 mt-5">
        {fetching ? (
          <div className="w-full flex flex-col items-center justify-center gap-2">
            <div className="w-20">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 128 128"
                className="animate-spin"
              >
                <path
                  fill="#222"
                  d="M64.4 16a49 49 0 0 0-50 48 51 51 0 0 0 50 52.2 53 53 0 0 0 54-52c-.7-48-45-55.7-45-55.7s45.3 3.8 49 55.6c.8 32-24.8 59.5-58 60.2-33 .8-61.4-25.7-62-60C1.3 29.8 28.8.6 64.3 0c0 0 8.5 0 8.7 8.4 0 8-8.6 7.6-8.6 7.6z"
                ></path>
              </svg>
            </div>

            <span>Carregando...</span>
          </div>
        ) : (
          <>
            {calls.length === 0 ? (
              <div className="w-full flex flex-col justify-center items-center gap-2">
                <div className="w-1/4">
                  <Image
                    draggable={false}
                    src={"/img/box-6.png"}
                    width={600}
                    height={450}
                    alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                    layout="responsive"
                    objectFit="contain"
                    quality={100}
                  />
                </div>
                <span className="text-gray-700 text-center">
                  Nenhuma informação para mostrar
                </span>
              </div>
            ) : (
              <>
                {calls.map((call) => (
                  <div
                    className="rounded-md border shadow h-fit overflow-hidden"
                    key={call.id}
                  >
                    <div className="flex flex-col sm:items-center justify-between px-4 pb-3 sm:flex-row sm:pb-0">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 py-4 font-bold text-lg w-full">
                        <div className="flex items-start md:items-center gap-3 flex-col md:flex-row">
                          <div className="w-[48px] min-w-[48px]">
                            <Image
                              draggable={false}
                              src={"/img/call.svg"}
                              width={972}
                              height={629}
                              alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                              layout="responsive"
                              objectFit="contain"
                              quality={100}
                            />
                          </div>
                          <span>
                            Chamado do Pacote: {call.invoice.serviceName}
                          </span>
                        </div>
                        <span
                          className={`${
                            (call.callStatus === "open" && "bg-yellow-600") ||
                            (call.callStatus === "accepted" &&
                              "bg-green-600") ||
                            (call.callStatus === "refused" && "bg-red-600") ||
                            (call.callStatus === "finished" && "bg-sky-700")
                          } text-base px-3 py-1 rounded-md text-white font-bold block`}
                        >
                          {call.callStatus === "open" && "Aberto"}
                          {call.callStatus === "accepted" && "Aceito"}
                          {call.callStatus === "finished" && "Finalizado"}
                          {call.callStatus === "refused" && "Recusado"}
                        </span>
                      </div>
                    </div>
                    <div className="border-t border-gray-200">
                      <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Data
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {formatDate(call.dateCall)}
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Relatório
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {call.description}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>

      <Dialog.Root open={dialog} onOpenChange={() => setDialog(!dialog)}>
        <Dialog.Trigger asChild />
        <Dialog.Portal>
          <Dialog.Overlay className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-40 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed w-[80%] left-[10%] right-[10%] bg-white shadow-lg rounded-md top-10 md:top-[10%] z-50 max-h-[80vh] overflow-auto lg:w-[60%] lg:left-[20%] lg:right-[20%]">
            <div className="flex justify-between items-center border-b px-5 py-3 sticky top-0 bg-white">
              <Dialog.Title className="font-bold text-lg  ">
                Novo Chamado
              </Dialog.Title>
              <Dialog.Close
                asChild
                className=" bg-black bg-opacity-10 rounded-full text-2xl cursor-pointer hover:bg-opacity-20 active:bg-opacity-10"
              >
                <BiX />
              </Dialog.Close>
            </div>

            <div className="grid grid-cols-3 gap-3 px-5 pt-3">
              <div>
                <label>Chamados</label>
                <input
                  className={`w-full h-10 px-3 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75 ${
                    compareValues.calls >= compareValues.limitCalls
                      ? "bg-red-600 text-white border-0"
                      : ""
                  }`}
                  placeholder="Seu telefone aqui"
                  id="phone"
                  type="phone"
                  readOnly
                  value={compareValues.calls}
                />
              </div>
              <div>
                <label>Limite</label>
                <input
                  className="w-full h-10 px-3 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75"
                  placeholder="Seu telefone aqui"
                  id="phone"
                  type="phone"
                  readOnly
                  value={compareValues.limitCalls}
                />
              </div>
              <div>
                <label>Status</label>
                <div
                  className={`w-full h-10 px-3 flex ${
                    (compareValues.status === "active" && "bg-green-600") ||
                    (compareValues.status === "incomplete" && "bg-zinc-800") ||
                    (compareValues.status === "incomplete_expired" &&
                      "bg-zinc-800") ||
                    (compareValues.status === "past_due" && "bg-red-600") ||
                    (compareValues.status === "unpaid" && "bg-red-600")
                  } text-white rounded-md items-center justify-center`}
                  placeholder="Seu telefone aqui"
                  id="phone"
                >
                  {compareValues.status === "active" && "Ativo"}
                  {compareValues.status === "canceled" && "Cancelado"}
                  {compareValues.status === "incomplete" && "Nenhum"}
                  {compareValues.status === "incomplete_expired" && "Nenhum"}
                  {compareValues.status === "past_due" && "Vencido"}
                  {compareValues.status === "unpaid" && "Não Pago"}
                </div>
              </div>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-3 w-full p-5">
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label>
                      Pacote <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="type"
                      className="w-full h-12 px-3 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75 bg-transparent"
                      placeholder="Selecione uma opção"
                      value={invoiceId}
                      onChange={(e) => handleSearchSubscription(e.target.value)}
                    >
                      <option value={""}>Selecione uma opção</option>
                      {invoice.map((inv) => (
                        <option key={inv.id} value={inv.id}>
                          {inv.serviceName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label>
                    Descrição <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    name="description"
                    className="w-full px-3 py-3 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75 resize-none"
                    placeholder="Descrição"
                    rows={5}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.description &&
                  Boolean(formik.errors.description) ? (
                    <span className="text-sm text-red-600">
                      {formik.touched.description && formik.errors.description}
                    </span>
                  ) : (
                    ""
                  )}
                </div>

                <div className="flex justify-end">
                  {compareValues.status === "active" && (
                    <Button
                      icon={<BiSave />}
                      buttonSize="lg"
                      type="submit"
                      isLoading={loading}
                      isDisabled={
                        compareValues.calls >= compareValues.limitCalls
                      }
                    >
                      Salvar
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <AlertDialog.Root open={isDialogOpen}>
        <AlertDialog.Trigger asChild />
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-40 backdrop-blur-sm z-50" />
          <AlertDialog.Content className="fixed w-[80%] left-[10%] right-[10%] sm:w-[50%] sm:left-[25%] sm:right-[25%] md:w-[40%] md:left-[30%] md:right-[30%] lg:w-[30%] bg-white shadow-lg rounded-md top-[15%] z-50 lg:left-[35%] lg:right-[35%] flex items-center justify-center flex-col p-5 gap-2">
            <AlertDialog.Title className="text-green-600 px-4 py-3 font-semibold text-4xl w-20 h-20 flex items-center justify-center bg-green-100 rounded-full">
              <BiCheck />
            </AlertDialog.Title>
            <AlertDialog.Description className="text-green-600 text-2xl font-semibold">
              Sucesso
            </AlertDialog.Description>
            <div className="text-center">
              <span className="text-gray-700">{messageDialog}</span>
            </div>
            <div className="flex items-center w-full">
              <AlertDialog.Cancel
                className="bg-green-600 hover:bg-green-700 active:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 px-4 h-10 rounded-md flex text-white justify-center items-center gap-2 transition-all delay-75 w-full"
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
          <AlertDialog.Overlay className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-40 backdrop-blur-sm z-50" />
          <AlertDialog.Content className="fixed w-[80%] left-[10%] right-[10%] sm:w-[50%] sm:left-[25%] sm:right-[25%] md:w-[40%] md:left-[30%] md:right-[30%] lg:w-[30%] bg-white shadow-lg rounded-md top-[15%] z-50 lg:left-[35%] lg:right-[35%] flex items-center justify-center flex-col p-5 gap-2">
            <AlertDialog.Title className="text-red-600 px-4 py-3 font-semibold text-4xl w-20 h-20 flex items-center justify-center bg-red-100 rounded-full">
              <BiMessageAltError />
            </AlertDialog.Title>
            <AlertDialog.Description className="text-red-600 text-2xl font-semibold">
              Ocorreu um erro
            </AlertDialog.Description>
            <div className="text-center">
              <span className="text-gray-700">{messageDialog}</span>
            </div>
            <div className="flex items-center w-full">
              <AlertDialog.Cancel
                className="bg-red-600 hover:bg-red-700 active:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 px-4 h-10 rounded-md flex text-white justify-center items-center gap-2 transition-all delay-75 w-full"
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
}
