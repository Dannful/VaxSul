"use client";
import { useState } from "react";
import Page from "../components/Page";
import { LoadingWidget } from "../components/LoadingWidget";
import { ErrorWidget } from "../components/ErrorWidget";
import { useMutation, useQuery } from "@apollo/client";
import {
  NEW_VACCINE,
  RESEARCHES_QUERY,
  SEARCH_VACCINES,
  VACCINE_BY_ID,
} from "@/service/vaxsul";
import { Vaccine } from "@/__generated__/graphql";
import { useRouter } from "next/navigation";

export default function AddVaccine() {
  const [newVaccine, setNewVaccine] = useState<Vaccine>({
    dose: 1,
    name: "",
    description: "",
    pricePerUnit: 1,
    amountInStock: 1,
    researchId: 1,
  });

  const [addNewVaccine] = useMutation(NEW_VACCINE, {
    refetchQueries: [SEARCH_VACCINES, VACCINE_BY_ID],
  });
  const { loading, data, error } = useQuery(RESEARCHES_QUERY);
  const router = useRouter();

  if (loading) {
    return <LoadingWidget />;
  }

  if (error || !data?.researches) {
    return (
      <ErrorWidget message="Erro ao processar as pesquisas. Por favor, tente novamente mais tarde." />
    );
  }

  const researchOptions = data.researches;

  const handleAddVaccine = () => {
    addNewVaccine({
      variables: {
        vaccine: newVaccine,
      },
    });
    router.push("/vaccine");
  };

  const handleCancel = () => {
    router.back();
  };

  const titleBar = (
    <div className="flex items-center justify-center w-full">
      <h1 className="text-2xl font-semibold text-white">Adicionar Produto</h1>
    </div>
  );

  return (
    <Page titleBar={titleBar}>
      <div className="flex flex-col items-center mx-4 md:mx-24 mt-12 space-y-6">
        <div className="bg-white bg-opacity-30 rounded-lg shadow-lg p-6 w-full md:w-3/4 lg:w-1/2">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nome
            </label>
            <input
              type="text"
              className="bg-gray-40 bg-opacity-60 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={newVaccine.name}
              onChange={(e) =>
                setNewVaccine({ ...newVaccine, name: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Dose
            </label>
            <input
              type="number"
              min={1}
              className="bg-gray-40 bg-opacity-60 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={newVaccine.dose}
              onChange={(e) =>
                setNewVaccine({ ...newVaccine, dose: Number(e.target.value) })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Pesquisa
            </label>
            <select
              className="bg-gray-40 bg-opacity-60 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={newVaccine.researchId}
              onChange={(e) =>
                setNewVaccine({
                  ...newVaccine,
                  researchId: Number(e.target.value),
                })
              }
            >
              {researchOptions.map((research) => (
                <option key={research.id} value={research.id}>
                  {research.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Preço (R$)
            </label>
            <input
              type="number"
              min={0}
              step={0.01}
              className="bg-gray-40 bg-opacity-60 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={newVaccine.pricePerUnit}
              onChange={(e) =>
                setNewVaccine({
                  ...newVaccine,
                  pricePerUnit: Number(e.target.value),
                })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Quantidade no Estoque
            </label>
            <input
              type="number"
              className="bg-gray-40 bg-opacity-60 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={newVaccine.amountInStock}
              onChange={(e) =>
                setNewVaccine({
                  ...newVaccine,
                  amountInStock: Number(e.target.value),
                })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Descrição
            </label>
            <textarea
              className="bg-gray-40 bg-opacity-60 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={newVaccine.description}
              onChange={(e) =>
                setNewVaccine({ ...newVaccine, description: e.target.value })
              }
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleCancel}
              className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out"
            >
              Cancelar
            </button>
            <button
              onClick={handleAddVaccine}
              className="text-white bg-blue-500 bg-opacity-80 hover:bg-opacity-30 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out"
            >
              Adicionar Produto
            </button>
          </div>
        </div>
      </div>
    </Page>
  );
}
