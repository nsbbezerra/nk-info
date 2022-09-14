import Image from "next/image";
import { Fragment, useState, useContext, useEffect } from "react";
import { BiPlus, BiRefresh, BiSave, BiX } from "react-icons/bi";
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
} from "../../graphql/clientMoviment";
import * as Yup from "yup";
import axios from "axios";
import { client } from "../../lib/urql";

interface CallProps {
  id: string;
  description: string;
  dateCall: Date;
  callStatus: "open" | "accepted" | "refused" | "finished";
  month: string;
  year: string;
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

  const { data, error, fetching } = callsResult;

  useEffect(() => {
    if (data) {
      setCalls(data.calls);
      setInvoice(data.invoices);
      console.log(data);
    }
  }, [data]);

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

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleSearchSubscription = async (id: string) => {
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
      console.log(message);
    }
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
        <Button icon={<BiRefresh />} buttonSize="lg" scheme="success">
          Atualizar
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 mt-5">
        <div className="rounded-md border shadow h-fit overflow-hidden">
          <div className="flex flex-col sm:items-center justify-between px-4 pb-3 sm:flex-row sm:pb-0">
            <div className="flex flex-row items-center gap-3 py-4 font-bold text-lg">
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
              <span>Chamado: adhoek</span>
              <span className="bg-yellow-400 font-light text-base px-3 py-1 rounded-md text-gray-900">
                Aguardando...
              </span>
            </div>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Data e Hora
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  10/10/2000 às 21:00
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Relatório</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                  incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                  consequat sint. Sit id mollit nulla mollit nostrud in ea
                  officia proident. Irure nostrud pariatur mollit ad adipisicing
                  reprehenderit deserunt qui eu.
                </dd>
              </div>
            </dl>
          </div>
        </div>
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
                  className="w-full h-10 px-3 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75"
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
                <label>Chamados</label>
                <div
                  className={`w-full h-10 px-3 flex ${
                    (compareValues.status === "active" && "bg-green-600") ||
                    (compareValues.status === "incomplete" && "bg-zinc-800")
                  } text-white rounded-md items-center justify-center`}
                  placeholder="Seu telefone aqui"
                  id="phone"
                >
                  Ativo
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
                  <label>Descrição</label>
                  <textarea
                    name="description"
                    className="w-full px-3 py-3 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75 resize-none"
                    placeholder="Descrição"
                    rows={5}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    icon={<BiSave />}
                    buttonSize="lg"
                    type="submit"
                    isLoading={loading}
                  >
                    Salvar
                  </Button>
                </div>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Fragment>
  );
}
