import { Fragment, useEffect } from "react";
import { BiPackage, BiRefresh, BiSearch, BiShoppingBag } from "react-icons/bi";
import Button from "../layout/Button";
import { useState } from "react";
import Stripe from "stripe";
import axios from "axios";
import { format } from "date-fns";
import pt_br from "date-fns/locale/pt-BR";

type Props = {
  activateCode?: string;
  id: string;
  category: string;
  checkoutId: string;
  limitCalls?: number;
  limitCallsVirtual?: number;
  paymentIntentId?: string;
  serviceName: string;
};

interface Subscriptions {
  subscriptions: Props[];
}

type PaymentSubscription = {
  subscription: Stripe.Subscription;
  item: Stripe.SubscriptionItem | null;
};

export default function MySubscriptions({ subscriptions }: Subscriptions) {
  const [subscription, setSubscription] =
    useState<PaymentSubscription | null>();
  const [idSubscription, setIdSubscription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log(subscription);
  }, [subscription]);

  const calcReal = (amount: number) => {
    let calc = amount / 100;
    return calc.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
  };

  const findDetails = async (id: string, checkoutId: string) => {
    setSubscription(null);
    setIdSubscription(id);
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/checkoutDetails", {
        id: checkoutId,
      });
      findSubscription(data.checkout.subscription);
    } catch (error) {
      setIsLoading(false);
      console.log((error as Error).message);
    }
  };

  const findSubscription = async (id: string) => {
    try {
      const { data } = await axios.post("/api/subscription", {
        id,
      });
      console.log(data);
      setIsLoading(false);
      setSubscription({
        subscription: data.subscription,
        item: data.subscription,
      });
    } catch (error) {
      setIsLoading(false);
      console.log((error as Error).message);
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
        {subscriptions.map((sub) => (
          <div
            className="rounded-md border shadow h-fit overflow-hidden"
            key={sub.id}
          >
            <div className="flex flex-col items-center justify-between px-3 pb-3 sm:flex-row sm:pb-0">
              <div className="flex flex-col sm:flex-row items-center gap-3 py-4 text-sky-700 font-bold md:text-lg">
                <BiPackage />
                <span>{sub.serviceName}</span>
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
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Preço
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {calcReal(subscription.item?.plan.amount as number)}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Data do Pagamento
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {format(
                            new Date(
                              subscription.subscription.current_period_start
                            ),
                            "dd/MM/yyyy 'às' HH:mm'h'",
                            {
                              locale: pt_br,
                            }
                          )}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Data do Vencimento
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {format(
                            new Date(
                              subscription.subscription.current_period_end
                            ),
                            "dd/MM/yyyy 'às' HH:mm'h'",
                            {
                              locale: pt_br,
                            }
                          )}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Status do Pacote
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {subscription.subscription.status === "active" && (
                            <span className="text-green-600 font-bold w-fit px-3 py-1 border border-green-600 rounded-md">
                              Ativo
                            </span>
                          )}
                          {subscription.subscription.status === "canceled" && (
                            <span className="text-gray-900 font-bold w-fit px-3 py-1 border border-gray-900 rounded-md">
                              Cancelado
                            </span>
                          )}
                          {subscription.subscription.status ===
                            "incomplete" && (
                            <span className="text-orange-600 font-bold w-fit px-3 py-1 border border-orange-600 rounded-md">
                              Incompleto
                            </span>
                          )}
                          {subscription.subscription.status ===
                            "incomplete_expired" && (
                            <span className="text-zinc-800 font-bold w-fit px-3 py-1 border border-zinc-800 rounded-md">
                              Incompleto e Expirado
                            </span>
                          )}
                          {subscription.subscription.status === "past_due" && (
                            <span className="text-red-600 font-bold w-fit px-3 py-1 border border-red-600 rounded-md">
                              Vencido
                            </span>
                          )}
                          {subscription.subscription.status === "trialing" && (
                            <span className="text-sky-700 font-bold w-fit px-3 py-1 border border-sky-700 rounded-md">
                              Modo Teste
                            </span>
                          )}
                          {subscription.subscription.status === "unpaid" && (
                            <span className="text-zinc-600 font-bold w-fit px-3 py-1 border border-zinc-600 rounded-md">
                              Não Pago
                            </span>
                          )}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Opções
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {subscription.subscription.status === "active" && (
                            <span>Nenhuma ação</span>
                          )}
                          {subscription.subscription.status === "canceled" && (
                            <span className="text-gray-900 font-bold w-fit px-3 py-1 border border-gray-900 rounded-md">
                              Cancelado
                            </span>
                          )}
                          {subscription.subscription.status ===
                            "incomplete" && (
                            <Button buttonSize="sm" icon={<BiShoppingBag />}>
                              Completar pagamento
                            </Button>
                          )}
                          {subscription.subscription.status ===
                            "incomplete_expired" && <span>Nenhuma ação</span>}
                          {subscription.subscription.status === "past_due" && (
                            <Button buttonSize="sm" icon={<BiRefresh />}>
                              Renovar
                            </Button>
                          )}
                          {subscription.subscription.status === "trialing" && (
                            <span className="text-sky-700 font-bold w-fit px-3 py-1 border border-sky-700 rounded-md">
                              Modo Teste
                            </span>
                          )}
                          {subscription.subscription.status === "unpaid" && (
                            <Button buttonSize="sm" icon={<BiRefresh />}>
                              Renovar
                            </Button>
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
      </div>
    </Fragment>
  );
}
