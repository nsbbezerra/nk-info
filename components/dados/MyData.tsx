import { stat } from "fs";
import { useContext } from "react";
import { BiEdit } from "react-icons/bi";
import ClientContext from "../../context/client";
import Button from "../layout/Button";

export default function MyDataComp() {
  const { state, setState } = useContext(ClientContext);

  return (
    <div className="flex flex-col gap-5">
      <div className="overflow-hidden bg-white border rounded-md shadow">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Meus Dados
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Nome</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {state.name}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Telefone</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {state.phone}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {state.email}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Endereço</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {state.street}, {state.number}, {state.district}, CEP:
                {state.cep}, {state.city} - {state.state}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <Button icon={<BiEdit />} buttonSize="lg">
        Atualizar
      </Button>
    </div>
  );
}
