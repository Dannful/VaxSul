"use client";

import { useState, ChangeEvent } from 'react';
import { useParams } from 'next/navigation';
import { useGetVaccineByIdQuery, useGetResearchByIdQuery, useNewResearchMutation, useNewVaccineMutation } from '@/service/vaxsul';
import { LoadingWidget } from '../../components/LoadingWidget';
import { ErrorWidget } from '../../components/ErrorWidget';
import { useRouter } from "next/navigation";

export default function ResearchDetails() {
  const [newResearch, newResearchResult] = useNewResearchMutation();
  const [newVaccine, newVaccineResult] = useNewVaccineMutation();

  const { id } = useParams();
  const validId = !Array.isArray(id) && id;

  const { data: vaccine, error: vaccineError, isLoading: vaccineLoading } = useGetVaccineByIdQuery(Number(validId), {
    skip: !validId,
  });

  const researchId = vaccine?.researchId ?? -1;
  const { data: research, error: researchError, isLoading: researchLoading } = useGetResearchByIdQuery(researchId, {
    skip: !researchId,
  });

  const [editing, setEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    vaccineName: vaccine?.name ?? '',
    vaccineDescription: vaccine?.description ?? '',
    vaccineDose: vaccine?.dose ?? 0,
    researchStatus: research?.status ?? '',
    researchProgress: research?.progress ?? 0,
  });

  const router = useRouter();

  if (!validId) {
    return <p className="text-black">Vacina não encontrada.</p>;
  }

  if (vaccineLoading || researchLoading) return <LoadingWidget />;
  if (vaccineError || researchError) return <ErrorWidget message="Erro ao carregar os detalhes." />;
  if (!vaccine) return <p className="text-black">Vacina não encontrada.</p>;
  if (!research) return <p className="text-black">Dados da pesquisa não encontrados.</p>;

  const handleEditClick = () => {
    setEditValues({
      vaccineName: vaccine?.name ?? '',
      vaccineDescription: vaccine?.description ?? '',
      vaccineDose: vaccine?.dose ?? '',
      researchStatus: research?.status ?? '',
      researchProgress: research?.progress ?? 0,
    });
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    newResearch({
      id: research.id,
      startDate: research.startDate,
      status: editValues.researchStatus as "IN_PROGRESS" | "PAUSED" | "COMPLETED" | "DROPPED",
      progress: editValues.researchProgress,
    });
    newVaccine({
      id: vaccine.id,
      dose: editValues.vaccineDose,
      pricePerUnit: vaccine.pricePerUnit,
      amountInStock: vaccine.amountInStock,
      researchId: vaccine.researchId,
      sellable: vaccine.sellable,
      name: editValues.vaccineName,
      laboratoryId: vaccine.laboratoryId,
      description: editValues.vaccineDescription,
    });
    window.location.reload();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-700 text-white p-4">
        <h1 className="text-xl font-semibold">Detalhes da Pesquisa</h1>
      </header>
      <main className="flex-1 p-6 flex justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-black">Vacina</h2>
              {editing ? (
                <div>
                  <label className="block mb-2 text-black">
                    Nome da Vacina:
                    <input
                      type="text"
                      name="vaccineName"
                      value={editValues.vaccineName}
                      onChange={handleInputChange}
                      className="border rounded px-4 py-2 w-full text-black"
                    />
                  </label>
                  <label className="block mb-2 text-black">
                    Descrição da Vacina:
                    <input
                      type="text"
                      name="vaccineDescription"
                      value={editValues.vaccineDescription}
                      onChange={handleInputChange}
                      className="border rounded px-4 py-2 w-full text-black"
                    />
                  </label>
                  <label className="block mb-2 text-black">
                    Dose:
                    <input
                      type="text"
                      name="vaccineDose"
                      value={editValues.vaccineDose}
                      onChange={handleInputChange}
                      className="border rounded px-4 py-2 w-full text-black"
                    />
                  </label>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-black">{vaccine.name}</h2>
                  <p className="text-lg mb-4 text-black">Descrição: {vaccine.description}</p>
                  <p className="text-lg mb-4 text-black">Dose: {vaccine.dose}</p>
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-black">Pesquisa</h2>
              {editing ? (
                <div>
                  <label className="block mb-2 text-black">
                    Status:
                    <select
                      name="researchStatus"
                      value={editValues.researchStatus}
                      onChange={handleInputChange}
                      className="border rounded px-4 py-2 w-full text-black"
                    >
                      <option value="IN_PROGRESS">{researchStatusText("IN_PROGRESS")}</option>
                      <option value="PAUSED">{researchStatusText("PAUSED")}</option>
                      <option value="COMPLETED">{researchStatusText("COMPLETED")}</option>
                      <option value="DROPPED">{researchStatusText("DROPPED")}</option>
                    </select>
                  </label>
                  <label className="block mb-2 text-black">
                    Progresso:
                    <input
                      type="number"
                      name="researchProgress"
                      min={0}
                      max={100}
                      value={editValues.researchProgress}
                      onChange={handleInputChange}
                      className="border rounded px-4 py-2 w-full text-black"
                    />
                  </label>
                </div>
              ) : (
                <div>
                  <p className="text-lg mb-4 text-black">Data de Início: {research.startDate}</p>
                  <p className="text-lg mb-4 text-black">Status: {researchStatusText(research.status)}</p>
                  <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
                    <div
                      className="h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{
                        width: `${research.progress}%`,
                        backgroundColor: `hsl(${((research.progress ?? 0) / 100) * 120}, 100%, 40%)`, // Ajustar cor baseado no progresso
                        paddingLeft: '20px', 
                        paddingRight: '20px',
                        boxSizing: 'border-box'
                      }}
                    >
                    {research.progress}%
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex space-x-4 mt-6">
            {editing ? (
              <>
                <button
                  type="button"
                  onClick={handleSaveChanges}
                  className="bg-green-500 text-white text-lg px-6 py-2 rounded hover:bg-green-700"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-red-500 text-white text-lg px-6 py-2 rounded hover:bg-red-700"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleEditClick}
                className="bg-yellow-500 text-white text-lg px-6 py-2 rounded hover:bg-yellow-700"
              >
                Editar
              </button>
            )}
          </div>
        </div>
      </main>
      <footer className="bg-gray-700 text-white text-center p-4">
        <a href="/research">Voltar ao Catálogo</a>
      </footer>
    </div>
  );
}

const researchStatusText = (status: string) => {
  switch (status) {
    case "IN_PROGRESS":
      return "Em progresso";
    case "PAUSED":
      return "Pausada"
    case "COMPLETED":
      return "Finalizada";
    case "DROPPED":
      return "Cancelada";
    default: 
      return status;
}};