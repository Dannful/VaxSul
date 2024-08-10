"use client";

import { useState, ChangeEvent } from 'react';
import { useParams } from 'next/navigation';
import { useGetVaccineByIdQuery, useGetResearchByIdQuery, useNewResearchMutation, useNewVaccineMutation, useGetCurrentUserQuery } from '@/service/vaxsul';
import { LoadingWidget } from '../../components/LoadingWidget';
import { ErrorWidget } from '../../components/ErrorWidget';
import { useRouter } from "next/navigation";
import { Vaccine } from '@/types/vaccine';
import { Research } from '@/types/research';

export default function VaccineResearchDetails() {
  const [newResearch, newResearchResult] = useNewResearchMutation();
  const [newVaccine, newVaccineResult] = useNewVaccineMutation();
  const user = useGetCurrentUserQuery();

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
  const [sellableCheck, setSellableCheck] = useState(vaccine?.sellable ?? false);
  
  const router = useRouter();

  if (!validId) {
    return <p className="text-black">Vacina não encontrada.</p>;
  }

  const isResearcher = user.data && (user.data.role === "RESEARCH_LEAD" || user.data.role === "RESEARCHER");
  const isResearchLead = user.data && user.data.role === "RESEARCH_LEAD";

  if (vaccineLoading || researchLoading) return <LoadingWidget />;
  if (vaccineError || researchError) return <ErrorWidget message="Erro ao carregar os detalhes." />;
  if (!vaccine) return <p className="text-black">Vacina não encontrada.</p>;
  if (!research) return <p className="text-black">Dados da pesquisa não encontrados.</p>;
  if (!isResearcher) return <ErrorWidget message="Você não tem permissão para ver esta página." />;

  
  const handleEditClick = () => {
    setEditValues({
      vaccineName: vaccine.name ?? '',
      vaccineDescription: vaccine.description ?? '',
      vaccineDose: vaccine.dose ?? '',
      researchStatus: research.status ?? '',
      researchProgress: research.progress ?? 0,
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

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSellableCheck(e.target.checked);
  };

  const validateInput = () => {
    if (!isResearchLead && vaccine.sellable) {
      alert("Apenas líderes de pesquisa podem alterar vacinas autorizadas para venda.");
      return false;
    }
    if (sellableCheck && editValues.researchStatus !== "COMPLETED") {
      alert("A vacina só pode ser vendida se a pesquisa estiver finalizada.");
      return false;
    }
    if (editValues.researchStatus === "COMPLETED" && editValues.researchProgress < 100) {
      alert("O progresso da pesquisa deve ser 100% para ser finalizada.");
      return false;
    }
    if (editValues.researchProgress >= 100 && editValues.researchStatus !== "COMPLETED") {
      alert("O status da pesquisa deve ser finalizada se o progresso for 100%.");
      return false;
    }
    if (editValues.researchStatus === "COMPLETED" && editValues.vaccineDose === 0) {
      alert("A dose da vacina não pode ser 0 ao final da pesquisa.");
      return false;
    }
    return true;
  };


  const handleSaveChanges = () => {
    if (!validateInput()) return;
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
      sellable: sellableCheck,
      name: editValues.vaccineName,
      laboratoryId: vaccine.laboratoryId,
      description: editValues.vaccineDescription,
    });
    window.location.reload();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-6 flex justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
          <div className="grid grid-cols-2 gap-6">
            <VaccineDetails 
              vaccine={vaccine} 
              editing={editing} 
              editValues={editValues} 
              sellableCheck={sellableCheck} 
              handleInputChange={handleInputChange} 
              handleCheckboxChange={handleCheckboxChange}
            />
            <ResearchDetails 
              research={research} 
              editing={editing} 
              editValues={editValues} 
              handleInputChange={handleInputChange} 
            />
          </div>
          <ActionButtons 
            editing={editing} 
            handleSaveChanges={handleSaveChanges} 
            handleCancelEdit={handleCancelEdit} 
            handleEditClick={handleEditClick} 
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="bg-gray-700 text-white p-4">
      <h1 className="text-xl font-semibold">Detalhes da Pesquisa</h1>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-700 text-white text-center p-4">
      <a href="/research">Voltar ao Catálogo</a>
    </footer>
  );
}

const VaccineDetails: React.FC<{
  vaccine: Vaccine;
  editing: boolean;
  editValues: {
    vaccineName: string;
    vaccineDescription: string;
    vaccineDose: number;
  };
  sellableCheck: boolean;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({
  vaccine,
  editing,
  editValues,
  sellableCheck,
  handleInputChange,
  handleCheckboxChange
}) => {
  return (
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
              value={editValues.vaccineDose.toString()}
              onChange={handleInputChange}
              className="border rounded px-4 py-2 w-full text-black"
            />
          </label>
          <label className="block mb-2 text-black">
            Venda autorizada:
            <input
              type="checkbox"
              checked={sellableCheck}
              onChange={handleCheckboxChange}
              className="ml-2"
            />
          </label>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-black">{vaccine.name}</h2>
          <p className="text-lg mb-4 text-black">Descrição: {vaccine.description}</p>
          <p className="text-lg mb-4 text-black">Dose: {vaccine.dose}</p>
          <p className="text-lg mb-4 text-black">Venda autorizada: {vaccine.sellable ? "Sim" : "Não"}</p>
        </div>
      )}
    </div>
  );
};
const ResearchDetails: React.FC<{
  research: Research;
  editing: boolean;
  editValues: {
    researchStatus: string;
    researchProgress: number;
  };
  handleInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void;
}> = ({
  research,
  editing,
  editValues,
  handleInputChange
}) => {
  return (
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
              {Object.entries(STATUS_TEXT).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
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
          <p className="text-lg mb-4 text-black">Data de Início: {formatDateTime(research.startDate)}</p>
          <p className="text-lg mb-4 text-black">Status: {STATUS_TEXT[research.status]}</p>
          <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
            <div
              className="h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{
                width: `${research.progress}%`,
                backgroundColor: `hsl(${((research.progress ?? 0) / 100) * 120}, 100%, 40%)`, // Adjust color based on progress
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
  );
};


// Component for displaying action buttons
const ActionButtons: React.FC<{
  editing: boolean;
  handleSaveChanges: () => void;
  handleCancelEdit: () => void;
  handleEditClick: () => void;
}> = ({
  editing,
  handleSaveChanges,
  handleCancelEdit,
  handleEditClick
}) => {
  return (
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
  );
};


const STATUS_TEXT: Record<string, string> = {
  "IN_PROGRESS": "Em progresso",
  "PAUSED": "Pausada",
  "COMPLETED": "Finalizada",
  "DROPPED": "Cancelada"
};

const formatDateTime = (date: string) => 
  new Date(date).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
});