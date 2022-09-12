import Image from "next/image";
import { Fragment, useState } from "react";
import { BiPhoneCall, BiPlus, BiRefresh, BiSearch } from "react-icons/bi";
import Button from "../layout/Button";

interface CallProps {
  id: string;
  description: string;
  dateCall: Date;
  callStatus: "open" | "accepted" | "refused" | "finished";
  month: string;
  year: string;
}

export default function MyCalls() {
  const [dateActive] = useState<Date>(new Date());
  const [calls, setCalls] = useState<CallProps[]>([]);

  function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

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
        <Button icon={<BiPlus />} buttonSize="lg">
          Novo Chamado
        </Button>
        <Button icon={<BiRefresh />} buttonSize="lg" scheme="success">
          Atualizar
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 mt-5">
        <div className="rounded-md border shadow h-fit overflow-hidden">
          <div className="flex flex-col sm:items-center justify-between px-4 pb-3 sm:flex-row sm:pb-0">
            <div className="flex flex-row items-center gap-3 py-4 text-sky-700 font-bold text-lg">
              <div className="w-[48px] min-w-[48px]">
                <Image
                  draggable={false}
                  src={"/img/phone.png"}
                  width={600}
                  height={450}
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
    </Fragment>
  );
}
