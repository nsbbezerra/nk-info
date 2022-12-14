import { Fragment } from "react";
import { BiSearch, BiShoppingBag } from "react-icons/bi";
import Button from "../layout/Button";

export default function MyShopping() {
  return (
    <Fragment>
      <div className="px-4 py-5 sm:px-6 rounded-md border">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Minhas Compras
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-3 mt-5">
        <div className="rounded-md border shadow h-fit overflow-hidden">
          <div className="flex flex-col items-center justify-between px-3 pb-3 sm:flex-row sm:pb-0">
            <div className="flex flex-col sm:flex-row items-center gap-3 py-4 text-sky-700 font-bold md:text-lg">
              <BiShoppingBag />
              <span>Marketing Inicial</span>
              <span className="text-gray-700">R$ 199,00</span>
            </div>
            <Button icon={<BiSearch />}>Detalhes</Button>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Data da compra
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  10 de setembro de 2022
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Status do pagamento
                </dt>
                <dd className="mt-1 text-sm text-green-600 sm:col-span-2 sm:mt-0 font-bold">
                  Aprovado
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
