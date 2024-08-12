"use client";
import { useState } from "react";
import Page from "../components/Page";
import { LoadingWidget } from "../components/LoadingWidget";
import { ErrorWidget } from "../components/ErrorWidget";

export default function AddVaccine() {
  const [newVaccine, setNewVaccine] = useState({
    dose: "",
    name: "",
    description: "",
    price: "",
    amountInStock: 0,
    research: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const researchOptions = [
    { id: "1", name: "Pesquisa A" },
    { id: "2", name: "Pesquisa B" },
  ];

  const handleAddVaccine = () => {
    setIsLoading(true);
    setTimeout(() => {
      console.log("Vacina adicionada:", newVaccine);
      setIsLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    window.history.back();
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    const numericValue = parseFloat(value); // Convert to number
    const formattedValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numericValue / 100);
    setNewVaccine({ ...newVaccine, price: formattedValue });
  };

  const titleBar = (
    <div className="flex items-center justify-center w-full">
      <h1 className="text-2xl font-semibold text-white">Adicionar Produto</h1>
    </div>
  );

  if (isLoading) {
    return <LoadingWidget />;
  }

  if (isError) {
    return <ErrorWidget message="Erro ao carregar dados. Por favor, tente novamente mais tarde." />;
  }

  return (
    <Page titleBar={titleBar}>
      <div className="flex flex-col items-center mx-4 md:mx-24 mt-12 space-y-6">
        <div className="bg-white bg-opacity-30 rounded-lg shadow-lg p-6 w-full md:w-3/4 lg:w-1/2">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Nome</label>
            <input
              type="text"
              className="bg-gray-40 bg-opacity-60 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={newVaccine.name}
              onChange={(e) => setNewVaccine({ ...newVaccine, name: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Dose</label>
            <input
              type="text"
              className="bg-gray-40 bg-opacity-60 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={newVaccine.dose}
              onChange={(e) => setNewVaccine({ ...newVaccine, dose: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Pesquisa</label>
            <select
              className="bg-gray-40 bg-opacity-60 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={newVaccine.research}
              onChange={(e) => setNewVaccine({ ...newVaccine, research: e.target.value })}
            >
              {researchOptions.map((research) => (
                <option key={research.id} value={research.id}>
                  {research.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Preço</label>
            <input
              type="text"
              className="bg-gray-40 bg-opacity-60 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={newVaccine.price}
              onChange={handlePriceChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Quantidade no Estoque</label>
            <input
              type="number"
              className="bg-gray-40 bg-opacity-60 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={newVaccine.amountInStock}
              onChange={(e) => setNewVaccine({ ...newVaccine, amountInStock: Number(e.target.value) })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Descrição</label>
            <textarea
              className="bg-gray-40 bg-opacity-60 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={newVaccine.description}
              onChange={(e) => setNewVaccine({ ...newVaccine, description: e.target.value })}
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
