import { NextPage } from "next";
import Link from "next/link";
import { Fragment, useState } from "react";
import {
  BiEdit,
  BiLaptop,
  BiListCheck,
  BiPhoneCall,
  BiSave,
  BiShoppingBag,
} from "react-icons/bi";
import { BsMenuApp } from "react-icons/bs";
import MyDataComp from "../../components/dados/MyData";
import Footer from "../../components/Footer";
import HeadApp from "../../components/Head";
import Header from "../../components/Header";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import MySubscriptions from "../../components/dados/MySubsciptions";
import MyShopping from "../../components/dados/MyShopping";
import MyCalls from "../../components/dados/MyCalls";
import MyEquipment from "../../components/dados/MyEquipment";

type SearchProps = {
  text: "data" | "subscribes" | "buy" | "calls" | "equipment";
};

const MyData: NextPage = () => {
  const [search, setSearch] = useState<SearchProps>({ text: "data" });

  return (
    <Fragment>
      <HeadApp title="NK Informática | Meus dados" />
      <Header />
      <section className="w-full bg-gradient-to-b from-blue-300 to-sky-100 rounded-br-[70px] lg:rounded-br-[150px] p-5 relative overflow-hidden">
        <div className="container mx-auto z-10 py-10 text-center w-full flex justify-center">
          <h1 className="text-sky-900 text-lg sm:text-2xl md:text-3xl font-bold text-center max-w-5xl z-10">
            MEUS DADOS
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-10 lg:px-20 pt-16 grid grid-cols-1 xl:grid-cols-4 gap-10">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="bg-sky-700 px-5 h-12 text-white rounded-md flex items-center gap-2 hover:bg-sky-800 transition-all delay-75 active:bg-sky-700 w-fit lg:py-2 select-none xl:hidden">
            <BsMenuApp />
            Opções
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content className="bg-white backdrop-blur-sm bg-opacity-90 rounded-md z-50 p-2 border shadow-lg mt-1 min-w-[180px]">
              <DropdownMenu.Item
                className="text-gray-800 py-2 px-2 rounded-md flex items-center gap-2 hover:bg-sky-700 cursor-pointer hover:text-white active:bg-sky-800 transition-all delay-75 focus:outline-none focus:ring-2 focus:ring-sky-500"
                onClick={() => setSearch({ text: "data" })}
              >
                <BiListCheck />
                Meus dados
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className="text-gray-800 py-2 px-2 rounded-md flex items-center gap-2 hover:bg-sky-700 cursor-pointer hover:text-white active:bg-sky-800 transition-all delay-75 focus:outline-none focus:ring-2 focus:ring-sky-500"
                onClick={() => setSearch({ text: "subscribes" })}
              >
                <BiEdit />
                Minhas assinaturas
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className="text-gray-800 py-2 px-2 rounded-md flex items-center gap-2 hover:bg-sky-700 cursor-pointer hover:text-white active:bg-sky-800 transition-all delay-75 focus:outline-none focus:ring-2 focus:ring-sky-500"
                onClick={() => setSearch({ text: "buy" })}
              >
                <BiShoppingBag />
                Minhas compras
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className="text-gray-800 py-2 px-2 rounded-md flex items-center gap-2 hover:bg-sky-700 cursor-pointer hover:text-white active:bg-sky-800 transition-all delay-75 focus:outline-none focus:ring-2 focus:ring-sky-500"
                onClick={() => setSearch({ text: "calls" })}
              >
                <BiPhoneCall />
                Meus chamados
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className="text-gray-800 py-2 px-2 rounded-md flex items-center gap-2 hover:bg-sky-700 cursor-pointer hover:text-white active:bg-sky-800 transition-all delay-75 focus:outline-none focus:ring-2 focus:ring-sky-500"
                onClick={() => setSearch({ text: "equipment" })}
              >
                <BiLaptop />
                Meus equipamentos
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        <div className="w-full rounded-md shadow-md overflow-hidden border h-fit hidden xl:block">
          <div className="flex items-center gap-3 px-3 py-3 bg-sky-700 text-white font-bold">
            <BsMenuApp />
            Menu
          </div>

          <button
            className="w-full flex items-center gap-3 py-2 px-3 border-b cursor-pointer hover:bg-sky-100 active:bg-sky-50 select-none"
            onClick={() => setSearch({ text: "data" })}
          >
            <BiListCheck />
            Meus dados
          </button>
          <button
            className="w-full flex items-center gap-3 py-2 px-3 border-b cursor-pointer hover:bg-sky-100 active:bg-sky-50 select-none"
            onClick={() => setSearch({ text: "subscribes" })}
          >
            <BiEdit />
            Minhas assinaturas
          </button>
          <button
            className="w-full flex items-center gap-3 py-2 px-3 border-b cursor-pointer hover:bg-sky-100 active:bg-sky-50 select-none"
            onClick={() => setSearch({ text: "buy" })}
          >
            <BiShoppingBag />
            Minhas compras
          </button>
          <button
            className="w-full flex items-center gap-3 py-2 px-3 border-b cursor-pointer hover:bg-sky-100 active:bg-sky-50 select-none"
            onClick={() => setSearch({ text: "calls" })}
          >
            <BiPhoneCall />
            Meus chamados
          </button>
          <button
            className="w-full flex items-center gap-3 py-2 px-3 cursor-pointer hover:bg-sky-100 active:bg-sky-50 select-none"
            onClick={() => setSearch({ text: "equipment" })}
          >
            <BiLaptop />
            Meus equipamentos
          </button>
        </div>

        <div className="xl:col-span-3">
          <div>
            {search.text === "data" && <MyDataComp />}
            {search.text === "buy" && <MyShopping />}
            {search.text === "calls" && <MyCalls />}
            {search.text === "equipment" && <MyEquipment />}
            {search.text === "subscribes" && <MySubscriptions />}
          </div>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

export default MyData;
