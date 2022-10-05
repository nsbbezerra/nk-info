import { Fragment, useContext, useEffect } from "react";
import {
  BiCheck,
  BiMessageAltError,
  BiPlus,
  BiSearch,
  BiShoppingBag,
  BiTrash,
  BiX,
  BiZoomIn,
} from "react-icons/bi";
import Button from "../layout/Button";
import { useState } from "react";
import Stripe from "stripe";
import axios from "axios";
import { format } from "date-fns";
import pt_br from "date-fns/locale/pt-BR";
import { useRouter } from "next/router";
import Link from "next/link";
import { useMutation, useQuery } from "urql";
import { DELETE_INVOICE } from "../../graphql/invoiceMutation";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import Image from "next/image";
import ClientContext from "../../context/client";
import { FIND_CLIENT_SUBSCRIPTIONS } from "../../graphql/clientMoviment";

type Subscriptions = {
  activateCode?: string;
  id: string;
  category: string;
  checkoutId: string;
  limitCalls?: number;
  limitCallsVirtual?: number;
  paymentIntentId?: string;
  serviceName: string;
};

type SubscriptionInfoProps = {
  subscription: Stripe.Subscription | null;
  item: Stripe.SubscriptionItem | null;
  checkout: Stripe.Checkout.Session | null;
  product: Stripe.Product | null;
};

type InvoiceProps = {
  invoice: Stripe.Invoice | null;
};

export default function MySubscriptions() {
  const { state } = useContext(ClientContext);
  const { push } = useRouter();
  const [subscription, setSubscription] =
    useState<SubscriptionInfoProps | null>(null);
  const [idSubscription, setIdSubscription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [invoiceLoading, setInvoiceLoading] = useState<boolean>(false);
  const [invoice, setInvoice] = useState<InvoiceProps | null>();
  const [subscriptions, setSubscriptions] = useState<Subscriptions[]>([]);

  const [result, reexecuteQuery] = useQuery({
    query: FIND_CLIENT_SUBSCRIPTIONS,
    variables: { id: state.id },
  });

  const { fetching, data, error } = result;

  useEffect(() => {
    if (data) {
      setSubscriptions(data.invoices);
    }
  }, [data]);

  const [delInvoiceResult, delInvoice] = useMutation(DELETE_INVOICE);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isDialogErrorOpen, setIsDialogErrorOpen] = useState<boolean>(false);
  const [messageDialog, setMessageDialog] = useState<string>("");

  const calcReal = (amount: number) => {
    let calc = amount / 100;
    return calc.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
  };

  function openError() {
    setIsDialogErrorOpen(true);
  }

  function openSuccess() {
    setIsDialogOpen(true);
  }

  function closeError() {
    setIsDialogErrorOpen(false);
    reexecuteQuery();
  }

  function closeSuccess() {
    setIsDialogOpen(false);
    reexecuteQuery();
  }

  if (error) {
    let message = error.message;
    setMessageDialog(message);
    openError();
  }

  const findDetails = async (id: string, checkoutId: string) => {
    setSubscription(null);
    setInvoice(null);
    setIdSubscription(id);
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/checkoutDetails", {
        id: checkoutId,
      });
      console.log(data);
      if (data.subscription === null) {
        data.checkout.url !== null && push(data.checkout.url);
      } else {
        setSubscription({
          checkout: data.checkout,
          subscription: data.subscription,
          item: data.subscription.items.data[0],
          product: data.product,
        });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      let message = (error as Error).message;
      setMessageDialog(message);
      openError();
    }
  };

  const findInvoiceInfo = async (id: string) => {
    setInvoiceLoading(true);
    try {
      const { data } = await axios.post("/api/findInvoice", { id });
      setInvoice({ invoice: data.invoice });
      setInvoiceLoading(false);
    } catch (error) {
      setInvoiceLoading(false);
      let message = (error as Error).message;
      setMessageDialog(message);
      openError();
    }
  };

  const cancelSubscription = async (id: string, subscriptionId: string) => {
    setInvoiceLoading(true);
    try {
      const response = await axios.post("/api/cancelSubscription", {
        id: subscriptionId,
      });
      const variables = { id: id };
      await delInvoice(variables);
      setInvoiceLoading(false);
      setMessageDialog(response.data.message);
      openSuccess();
    } catch (error) {
      setInvoiceLoading(false);
      let message = (error as Error).message;
      setMessageDialog(message);
      openError();
    }
  };

  const cancelSubscriptionExpires = async (subscriptionId: string) => {
    setInvoiceLoading(true);
    try {
      const variables = { id: subscriptionId };
      const { data, error } = await delInvoice(variables);
      if (data) {
        setInvoiceLoading(false);
        setMessageDialog("Assinatura cancelada com sucesso");
        openSuccess();
      } else if (error) {
        setMessageDialog(error.message);
        openError();
      }
    } catch (error) {
      setInvoiceLoading(false);
      let message = (error as Error).message;
      setMessageDialog(message);
      openError();
    }
  };

  return (
    <Fragment>
      <div className="px-4 py-5 sm:px-6 rounded-md border">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Minhas Assinaturas
        </h3>
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
            {subscriptions.length === 0 ? (
              <div className="w-full flex flex-col justify-center items-center gap-2">
                <div className="w-1/4">
                  <Image
                    draggable={false}
                    src={"/img/empty_box.svg"}
                    width={863}
                    height={645}
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
                {subscriptions.map((sub) => (
                  <div
                    className="rounded-md border shadow h-fit overflow-hidden"
                    key={sub.id}
                  >
                    <div className="flex flex-col sm:items-center justify-between px-4 pb-3 sm:flex-row sm:pb-0">
                      <div className="flex flex-row items-center gap-3 py-4 font-bold text-lg">
                        <div className="w-[48px] min-w-[48px]">
                          <Image
                            draggable={false}
                            src={"/img/subs.svg"}
                            width={734}
                            height={504}
                            alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                            layout="responsive"
                            objectFit="contain"
                          />
                        </div>
                        <span>Assinatura ID: {sub.id}</span>
                      </div>

                      <Button
                        icon={<BiSearch />}
                        isLoading={idSubscription === sub.id && isLoading}
                        onClick={() => findDetails(sub.id, sub.checkoutId)}
                      >
                        Detalhes
                      </Button>
                    </div>
                    {!subscription ? (
                      ""
                    ) : (
                      <>
                        {idSubscription === sub.id && subscription ? (
                          <div className="border-t border-gray-200">
                            <dl>
                              <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                  Informação da Assinatura
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                  {subscription.product?.name}
                                </dd>
                              </div>
                              <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                  Limite de Chamados Mensais
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                  {subscription.product?.metadata?.call_limit}
                                </dd>
                              </div>
                              <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                  Valor Mensal
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                  {calcReal(
                                    subscription.item?.plan.amount as number
                                  )}
                                </dd>
                              </div>
                              <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                  Data do Pagamento
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                  {format(
                                    new Date(
                                      subscription.subscription
                                        ?.current_period_start || new Date()
                                    ),
                                    "dd/MM/yyyy 'às' HH:mm'h'",
                                    {
                                      locale: pt_br,
                                    }
                                  )}
                                </dd>
                              </div>
                              <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                  Data do Vencimento
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                  {format(
                                    new Date(
                                      subscription.subscription
                                        ?.current_period_end || new Date()
                                    ),
                                    "dd/MM/yyyy 'às' HH:mm'h'",
                                    {
                                      locale: pt_br,
                                    }
                                  )}
                                </dd>
                              </div>
                              <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                  Status do Pacote
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                  {subscription.subscription?.status ===
                                    "active" && (
                                    <span className="text-green-600 font-bold w-fit px-3 py-1 border border-green-600 rounded-md">
                                      Ativo
                                    </span>
                                  )}
                                  {subscription.subscription?.status ===
                                    "canceled" && (
                                    <span className="text-gray-900 font-bold w-fit px-3 py-1 border border-gray-900 rounded-md">
                                      Cancelado
                                    </span>
                                  )}
                                  {subscription.subscription?.status ===
                                    "incomplete" && (
                                    <span className="text-orange-600 font-bold w-fit px-3 py-1 border border-orange-600 rounded-md">
                                      Incompleto
                                    </span>
                                  )}
                                  {subscription.subscription?.status ===
                                    "incomplete_expired" && (
                                    <span className="text-zinc-800 font-bold w-fit px-3 py-1 border border-zinc-800 rounded-md">
                                      Incompleto e Expirado
                                    </span>
                                  )}
                                  {subscription.subscription?.status ===
                                    "past_due" && (
                                    <span className="text-red-600 font-bold w-fit px-3 py-1 border border-red-600 rounded-md">
                                      Vencido
                                    </span>
                                  )}
                                  {subscription.subscription?.status ===
                                    "trialing" && (
                                    <span className="text-sky-700 font-bold w-fit px-3 py-1 border border-sky-700 rounded-md">
                                      Modo Teste
                                    </span>
                                  )}
                                  {subscription.subscription?.status ===
                                    "unpaid" && (
                                    <span className="text-zinc-600 font-bold w-fit px-3 py-1 border border-zinc-600 rounded-md">
                                      Não Pago
                                    </span>
                                  )}
                                </dd>
                              </div>
                              <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                  Opções
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                  {subscription.subscription?.status ===
                                    "active" && (
                                    <div className="flex md:items-center flex-col md:flex-row justify-center gap-2 md:justify-start flex-wrap">
                                      <Button
                                        buttonSize="sm"
                                        icon={<BiTrash />}
                                        scheme="error"
                                        onClick={() =>
                                          cancelSubscription(
                                            sub.id,
                                            subscription.subscription
                                              ?.id as string
                                          )
                                        }
                                        isLoading={invoiceLoading}
                                      >
                                        Cancelar assinatura
                                      </Button>
                                    </div>
                                  )}
                                  {subscription.subscription?.status ===
                                    "canceled" && <span>Nenhuma</span>}
                                  {subscription.subscription?.status ===
                                    "incomplete" && (
                                    <div className="flex md:items-center flex-col md:flex-row justify-center gap-2 md:justify-start flex-wrap">
                                      <Button
                                        buttonSize="sm"
                                        icon={<BiShoppingBag />}
                                        isLoading={invoiceLoading}
                                        onClick={() =>
                                          findInvoiceInfo(
                                            subscription.subscription
                                              ?.latest_invoice as string
                                          )
                                        }
                                      >
                                        Completar pagamento
                                      </Button>
                                      {invoice && (
                                        <Link
                                          href={
                                            invoice.invoice
                                              ?.hosted_invoice_url || "#"
                                          }
                                          passHref
                                        >
                                          <a
                                            className="flex h-8 items-center border h px-3 rounded-md text-sky-700 border-sky-700 font-semibold hover:bg-sky-50 active:bg-sky-100 w-fit"
                                            target={"_blank"}
                                          >
                                            <BiZoomIn />
                                            Visualizar fatura
                                          </a>
                                        </Link>
                                      )}
                                    </div>
                                  )}
                                  {subscription.subscription?.status ===
                                    "incomplete_expired" && (
                                    <Button
                                      buttonSize="sm"
                                      icon={<BiTrash />}
                                      scheme="error"
                                      onClick={() =>
                                        cancelSubscriptionExpires(sub.id)
                                      }
                                      isLoading={invoiceLoading}
                                    >
                                      Cancelar assinatura
                                    </Button>
                                  )}
                                  {subscription.subscription?.status ===
                                    "trialing" && (
                                    <span className="text-sky-700 font-bold w-fit px-3 py-1 border border-sky-700 rounded-md">
                                      Modo Teste
                                    </span>
                                  )}
                                  {subscription.subscription?.status ===
                                    "unpaid" && (
                                    <div className="flex md:items-center flex-col md:flex-row justify-center gap-2 md:justify-start flex-wrap">
                                      <Button
                                        buttonSize="sm"
                                        icon={<BiPlus />}
                                        isLoading={invoiceLoading}
                                        onClick={() =>
                                          findInvoiceInfo(
                                            subscription.subscription
                                              ?.latest_invoice as string
                                          )
                                        }
                                      >
                                        Nova fatura
                                      </Button>
                                      {invoice && (
                                        <Link
                                          href={
                                            invoice.invoice
                                              ?.hosted_invoice_url || "#"
                                          }
                                          passHref
                                        >
                                          <a
                                            className="flex h-8 items-center border h px-3 rounded-md text-sky-700 border-sky-700 font-semibold hover:bg-sky-50 active:bg-sky-100 w-fit"
                                            target={"_blank"}
                                          >
                                            <BiZoomIn />
                                            Visualizar fatura
                                          </a>
                                        </Link>
                                      )}
                                    </div>
                                  )}
                                </dd>
                              </div>
                            </dl>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>

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
          <AlertDialog.Overlay className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-40 backdrop-blur-sm" />
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
