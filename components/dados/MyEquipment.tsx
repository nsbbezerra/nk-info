import { Fragment, useState, useContext, useEffect } from "react";
import {
  BiCheck,
  BiLaptop,
  BiMessageAltError,
  BiPlus,
  BiSave,
  BiSearch,
  BiX,
} from "react-icons/bi";
import Button from "../layout/Button";
import * as Dialog from "@radix-ui/react-dialog";
import { useFormik } from "formik";
import * as Yup from "yup";
import ClientContext from "../../context/client";
import { useMutation, useQuery } from "urql";
import {
  CREATE_EQUIPMENT,
  FIND_EQUIPMENTS,
  PUBLISH_EQUIPMENT,
} from "../../graphql/clientMoviment";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import Image from "next/image";

interface Equipments {
  id: string;
  model: string;
  owner: string;
  description: string;
  type: "notebook" | "pc";
}

export default function MyEquipment() {
  const [dialog, setDialog] = useState<boolean>(false);
  const { state } = useContext(ClientContext);

  const [createEquipmentResult, createEquipment] =
    useMutation(CREATE_EQUIPMENT);
  const [publishEquipamentResult, publishEquipament] =
    useMutation(PUBLISH_EQUIPMENT);

  const [loading, setLoading] = useState<boolean>(false);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isDialogErrorOpen, setIsDialogErrorOpen] = useState<boolean>(false);
  const [messageDialog, setMessageDialog] = useState<string>("");

  const [equipments, setEquipments] = useState<Equipments[]>([]);

  const [result, reexecuteQuery] = useQuery({
    query: FIND_EQUIPMENTS,
    variables: { id: state.id },
  });

  const { data, error, fetching } = result;

  useEffect(() => {
    if (data) {
      setEquipments(data.equipaments);
    }
  }, [data]);

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

  const initalValues = {
    client: state.id,
    type: "",
    model: "",
    owner: "",
    description: "",
  };

  const validationSchema = Yup.object({
    type: Yup.string().required("Selecione um tipo de equipamento"),
    model: Yup.string().required("Insira um modelo"),
    owner: Yup.string().required("Insira uma marca"),
  });

  const formik = useFormik({
    initialValues: initalValues,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      const variables = {
        client: state.id,
        type: values.type,
        model: values.model,
        owner: values.owner,
        description: values.description,
      };

      createEquipment(variables).then((result) => {
        if (result.error) {
          setLoading(false);
          setMessageDialog(result.error.message);
          openError();
        } else if (result.data) {
          const id = result.data.createEquipament.id || "";
          setPublishEquipament(id);
          resetForm();
        }
      });
    },
  });

  const setPublishEquipament = async (id: string) => {
    const variables = { id: id };
    publishEquipament(variables).then((result) => {
      if (result.error) {
        setLoading(false);
        setMessageDialog(result.error.message);
        openError();
      } else if (result.data) {
        setLoading(false);
        setDialog(false);
        setMessageDialog("Equipamento inserido com sucesso");
        openSuccess();
        reexecuteQuery();
      }
    });
  };

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
            {equipments.length === 0 ? (
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
                {equipments.map((eq) => (
                  <div
                    className="rounded-md border shadow h-fit overflow-hidden"
                    key={eq.id}
                  >
                    <div className="flex flex-col sm:items-center justify-between px-4 pb-3 sm:flex-row sm:pb-0">
                      <div className="flex flex-row items-center gap-3 py-4 text-sky-700 font-bold text-lg">
                        <div className="w-[48px] min-w-[48px]">
                          <Image
                            draggable={false}
                            src={"/img/computer.png"}
                            width={600}
                            height={450}
                            alt="NK Info, sistemas, soluções em TI e desenvolvimento web."
                            layout="responsive"
                            objectFit="contain"
                            quality={100}
                          />
                        </div>
                        <span>
                          Equipamento: {eq.owner} - {eq.model}
                        </span>
                      </div>
                    </div>
                    <div className="border-t border-gray-200">
                      <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Tipo
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {eq.type === "notebook" ? "Notebook" : "Computador"}
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Marca
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {eq.owner}
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Modelo
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {eq.model}
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Descrição
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {eq.description}
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

            <form onSubmit={formik.handleSubmit}>
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
                      value={formik.values.type}
                      onChange={formik.handleChange}
                    >
                      <option value={""}>Selecione uma opção</option>
                      <option value={"notebook"}>Notebook</option>
                      <option value="pc">Computador</option>
                    </select>
                    {formik.touched.type && Boolean(formik.errors.type) ? (
                      <span className="text-sm text-red-600">
                        {formik.touched.type && formik.errors.type}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    <label>
                      Marca <span className="text-red-600">*</span>
                    </label>
                    <input
                      name="owner"
                      className="w-full h-12 px-3 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75"
                      placeholder="Marca"
                      value={formik.values.owner}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.owner && Boolean(formik.errors.owner) ? (
                      <span className="text-sm text-red-600">
                        {formik.touched.owner && formik.errors.owner}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    <label>
                      Modelo <span className="text-red-600">*</span>
                    </label>
                    <input
                      name="model"
                      className="w-full h-12 px-3 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all delay-75"
                      placeholder="Modelo"
                      value={formik.values.model}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.model && Boolean(formik.errors.model) ? (
                      <span className="text-sm text-red-600">
                        {formik.touched.model && formik.errors.model}
                      </span>
                    ) : (
                      ""
                    )}
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
