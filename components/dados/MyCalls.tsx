import { Fragment } from "react";
import { BiPhoneCall, BiPlus, BiSearch, BiShoppingBag } from "react-icons/bi";
import Button from "../layout/Button";

export default function MyCalls() {
  return (
    <Fragment>
      <div className="px-4 py-5 sm:px-6 rounded-md border">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Meus Chamados: Abril de 2022
        </h3>
      </div>

      <div className="mt-5">
        <Button icon={<BiPlus />} buttonSize="lg">
          Novo Chamado
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 mt-5">
        <div className="rounded-md border shadow h-fit overflow-hidden">
          <div className="flex flex-col items-center justify-between px-3 pb-3 sm:flex-row sm:pb-0">
            <div className="flex flex-col sm:flex-row items-center gap-3 py-4 text-sky-700 font-bold md:text-lg">
              <BiPhoneCall />
              <span>Chamado: adhoek</span>
              <span className="bg-yellow-400 font-light text-base px-3 py-1 rounded-md text-gray-900">
                Aguardando...
              </span>
            </div>
            <Button icon={<BiSearch />}>Detalhes</Button>
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
        <div className="rounded-md border shadow h-fit overflow-hidden">
          <div className="flex flex-col items-center justify-between px-3 pb-3 sm:flex-row sm:pb-0">
            <div className="flex flex-col sm:flex-row items-center gap-3 py-4 text-sky-700 font-bold md:text-lg">
              <BiPhoneCall />
              <span>Chamado: adhoek</span>
              <span className="bg-green-400 font-light text-base px-3 py-1 rounded-md text-gray-900">
                Aceito
              </span>
            </div>
            <Button icon={<BiSearch />}>Detalhes</Button>
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
        <div className="rounded-md border shadow h-fit overflow-hidden">
          <div className="flex flex-col items-center justify-between px-3 pb-3 sm:flex-row sm:pb-0">
            <div className="flex flex-col sm:flex-row items-center gap-3 py-4 text-sky-700 font-bold md:text-lg">
              <BiPhoneCall />
              <span>Chamado: adhoek</span>
              <span className="bg-red-400 font-light text-base px-3 py-1 rounded-md text-gray-900">
                Recusado
              </span>
            </div>
            <Button icon={<BiSearch />}>Detalhes</Button>
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
        <div className="rounded-md border shadow h-fit overflow-hidden">
          <div className="flex flex-col items-center justify-between px-3 pb-3 sm:flex-row sm:pb-0">
            <div className="flex flex-col sm:flex-row items-center gap-3 py-4 text-sky-700 font-bold md:text-lg">
              <BiPhoneCall />
              <span>Chamado: adhoek</span>
              <span className="bg-sky-400 font-light text-base px-3 py-1 rounded-md text-gray-900">
                Finalizado
              </span>
            </div>
            <Button icon={<BiSearch />}>Detalhes</Button>
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
    </Fragment>
  );
}
