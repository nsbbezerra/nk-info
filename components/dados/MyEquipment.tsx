import { Fragment, useState } from "react";
import { BiLaptop, BiPlus, BiSave, BiSearch, BiX } from "react-icons/bi";
import Button from "../layout/Button";
import * as Dialog from "@radix-ui/react-dialog";

export default function MyEquipment() {
  const [dialog, setDialog] = useState<boolean>(false);

  return (
    <Fragment>
      <div className="px-4 py-5 sm:px-6 rounded-md border mb-5">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Meus Equipamentos
        </h3>
      </div>

      <Button icon={<BiPlus />} buttonSize="lg" onClick={() => setDialog(true)}>
        Adicionar equipamento
      </Button>

      <div className="grid grid-cols-1 gap-3 mt-5">
        <div className="rounded-md border shadow h-fit overflow-hidden">
          <div className="flex flex-col items-center justify-between px-3 pb-3 sm:flex-row sm:pb-0">
            <div className="flex flex-col sm:flex-row items-center gap-3 py-4 text-sky-700 font-bold md:text-lg">
              <BiLaptop />
              <span>Equipamento: ahsjdh</span>
            </div>
            <Button icon={<BiSearch />}>Detalhes</Button>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Tipo</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  Notebook
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Marca</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  Positivo
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Modelo</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  XC771-289
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Descrição</dt>
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
          <Dialog.Content className="fixed w-[80%] left-[10%] right-[10%] bg-white shadow-lg rounded-md top-10 md:top-[15%] z-50 max-h-[80vh] overflow-auto lg:w-[60%] lg:left-[20%] lg:right-[20%]">
            <div className="flex justify-between items-center border-b px-5 py-3 sticky top-0 bg-white">
              <Dialog.Title className="font-bold text-lg  ">
                Adicionar Equipamento
              </Dialog.Title>
              <Dialog.Close
                asChild
                className=" bg-black bg-opacity-10 rounded-full text-2xl cursor-pointer hover:bg-opacity-20 active:bg-opacity-10"
              >
                <BiX />
              </Dialog.Close>
            </div>

            <div className="flex flex-col gap-3 w-full p-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label>
                    Tipo <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="type"
                    className="w-full h-12 px-3 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75 bg-transparent"
                    placeholder="Selecione uma opção"
                  >
                    <option>Notebook</option>
                    <option>Computador</option>
                  </select>
                </div>
                <div>
                  <label>
                    Marca <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="name"
                    className="w-full h-12 px-3 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75"
                    placeholder="Nome"
                  />
                </div>
                <div>
                  <label>
                    Modelo <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="name"
                    className="w-full h-12 px-3 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75"
                    placeholder="Nome"
                  />
                </div>
              </div>
              <div>
                <label>Descrição</label>
                <textarea
                  name="name"
                  className="w-full px-3 py-3 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75 resize-none"
                  placeholder="Nome"
                  rows={5}
                />
              </div>

              <div className="flex justify-end">
                <Button icon={<BiSave />} buttonSize="lg">
                  Salvar
                </Button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Fragment>
  );
}
