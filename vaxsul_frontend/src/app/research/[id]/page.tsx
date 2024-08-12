"use client";

import { useState, ChangeEvent, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useGetResearchByIdQuery, useNewResearchMutation, useNewVaccineMutation, useGetCurrentUserQuery } from '@/service/vaxsul';
import { LoadingWidget } from '../../components/LoadingWidget';
import { ErrorWidget } from '../../components/ErrorWidget';
import { Research } from '@/types/research';
import { Vaccine } from '@/types/vaccine';
import Page from '../../components/Page';

export default function VaccineResearchDetails() {
  const { id } = useParams();
  const [ newResearch ]  = useNewResearchMutation();
  const [ newVaccine]  = useNewVaccineMutation();
  const user = useGetCurrentUserQuery();

  const validId = !Array.isArray(id) && id;
  const {
    data: research,
    error,
    isLoading,
  } = useGetResearchByIdQuery(Number(validId), {
    skip: !validId,
  });

  const [editing, setEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    researchName: '',
    researchDescription: '',
    researchStatus: '',
    researchProgress: 0,
    researchReport: '',
  });

  useEffect(() => {
    if (research) {
      setEditValues({
        researchName: research.name,
        researchDescription: research.description,
        researchStatus: research.status,
        researchProgress: research.progress ?? 0,
        researchReport: research.report,
      });
    }
  }, [research]);

  if (!validId) {
    return <p className="text-black">Pesquisa não encontrada.</p>;
  }

  if (isLoading) return <LoadingWidget />;
  if (error)
    return <ErrorWidget message="Erro ao carregar os detalhes da pesquisa." />;
  if (!research) return <p className="text-black">Pesquisa não encontrada.</p>;
  
  if (!validId) {
    return <p className="text-black">Vacina não encontrada.</p>;
  }

  const isResearcher = user.data && user.data.role === "RESEARCHER";
  const isResearchLead = user.data && user.data.role === "RESEARCH_LEAD";
  
  const handleEditClick = () => {
    setEditValues({
      researchName: research.name ?? '',
      researchDescription: research.description ?? '',
      researchStatus: research.status ?? '',
      researchProgress: research.progress ?? 0,
      researchReport: research.report ?? '',
    });
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditValues(prev => ({ ...prev, [name]: value }));
  };

  const validateInput = () => {
    if (editValues.researchStatus === "APPROVED" || editValues.researchStatus === "REJECTED") {
      alert("Você não pode editar pesquisas aprovadas ou rejeitadas.");
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
    if (editValues.researchStatus === "COMPLETED" && !editValues.researchReport) {
      alert("O relatório é obrigatório para pesquisas finalizadas.");
      return false;
    }
    return true;
  };


  const handleSaveChanges = () => {
    if (!validateInput()) return;

    newResearch({
      ...research,
      name: editValues.researchName,
      description: editValues.researchDescription,
      status: editValues.researchStatus as "IN_PROGRESS" | "PAUSED" | "COMPLETED" | "DROPPED",
      progress: editValues.researchProgress,
      report: editValues.researchReport,
    });
    window.location.reload();
  };

  const handleApproveClick = () => {
    newResearch({
      ...research,
      status: "APPROVED",
    });
    window.location.reload();
  };

  const handleRejectClick = () => {
    newResearch({
      ...research,
      status: "REJECTED",
    });
    window.location.reload();
  };

  return (
    <Page
      titleBar={
        <div className="flex items-center justify-center w-full">
          <h1 className="text-xl font-semibold text-white text-center">
            Detalhes da Pesquisa
          </h1>
        </div>
      }
    >
      <div className="flex-1 p-6 flex justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-6xl"> 
          <div className="grid grid-cols-1 gap-6">
            <ResearchDetails 
              research={research} 
              editing={editing} 
              editValues={editValues} 
              handleInputChange={handleInputChange} 
            />
          </div>
          <EditButtons
            research={research} 
            editing={editing} 
            isResearcher={isResearcher ?? false}
            handleSaveChanges={handleSaveChanges} 
            handleCancelEdit={handleCancelEdit} 
            handleEditClick={handleEditClick} 
          />
          <ApproveRejectButtons 
            research = {research}
            isResearchLead = {isResearchLead ?? false}
            handleApproveClick = {handleApproveClick}
            handleRejectClick = {handleRejectClick}
            />
        </div>
      </div>
    </Page>
  );
}

const ResearchDetails: React.FC<{
  research: Research;
  editing: boolean;
  editValues: {
    researchName: string;
    researchDescription: string;
    researchProgress: number;
    researchStatus: string;
    researchReport:string;
  };
  handleInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>) => void;
}> = ({
  research,
  editing,
  editValues,
  handleInputChange,
}) => {
  return (
    <div>
      {editing ? (
        <div>
          <label className="block mb-2 text-black">
            Nome da Pesquisa:
            <input
              type="text"
              name="researchName"
              value={editValues.researchName}
              onChange={handleInputChange}
              className="border rounded px-4 py-2 w-full text-black"
            />
          </label>
          <label className="block mb-2 text-black">
            Status:
            <select
              name="researchStatus"
              value={editValues.researchStatus}
              onChange={handleInputChange}
              className="border rounded px-4 py-2 w-full text-black"
            >
              {["IN_PROGRESS", "PAUSED", "COMPLETED", "DROPPED"].map((status) => (
                <option key={status} value={status}>
                  {STATUS_TEXT[status]}
                </option>
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
          <label className="block mb-2 text-black">
            Descrição da Pesquisa:
            <textarea
              name="researchDescription"
              value={editValues.researchDescription}
              onChange={handleInputChange}
              className="border rounded px-4 py-2 w-full text-black"
              rows={5}
            />
          </label>
          {editValues.researchStatus === "COMPLETED" && (
            <label className="block mb-2 text-black">
              Relatório:
              <textarea
                name="researchReport"
                value={editValues.researchReport}
                onChange={handleInputChange}
                className="border rounded px-4 py-2 w-full text-black"
                rows={5}
              />
            </label>
          )}
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-black text-center">{research.name}</h2> {/* Centered the research name */}
          <p className="text-lg mb-4 text-black text-center">
            Data de Início: {formatDateTime(research.startDate)}
          </p>
          <p className="text-lg mb-4 text-black text-center">Status: {STATUS_TEXT[research.status]}</p> {/* Centered the status */}
          <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
            <div
              className="h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{
                width: `${research.progress}%`,
                backgroundColor: `hsl(${((research.progress ?? 0) / 100) * 120}, 100%, 40%)`, // Adjust color based on progress
                paddingLeft: "20px",
                paddingRight: "20px",
                boxSizing: "border-box",
              }}
            >
              {research.progress}%
            </div>
          </div>
          <p className="text-lg mb-4 text-black whitespace-pre-wrap">{research.description}</p>
          {["COMPLETED", "APPROVED", "REJECTED"].includes(research.status) && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-center text-black mb-2">Relatório</h3>
              <p className="text-lg text-black whitespace-pre-wrap mx-auto w-3/4">{research.report}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const EditButtons: React.FC<{
  research: Research,
  isResearcher: boolean;
  editing: boolean;
  handleSaveChanges: () => void;
  handleCancelEdit: () => void;
  handleEditClick: () => void;
}> = ({
  research,
  isResearcher,
  editing,
  handleSaveChanges,
  handleCancelEdit,
  handleEditClick
}) => {
  return (
    <div className="flex space-x-4 mt-6">
      {(editing && isResearcher) ? (
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
        (isResearcher && !["COMPLETED", "APPROVED", "REJECTED"].includes(research.status)) && (
          <button
            type="button"
            onClick={handleEditClick}
            className="bg-yellow-500 text-white text-lg px-6 py-2 rounded hover:bg-yellow-700"
          >
            Editar
          </button>
        )
      )}
    </div>
  );
};

const ApproveRejectButtons: React.FC<{
  research: Research,
  isResearchLead: boolean;
  handleApproveClick: () => void;
  handleRejectClick: () => void;
}> = ({ research, isResearchLead, handleApproveClick, handleRejectClick }) => {
  return (
    (research.status === "COMPLETED" && isResearchLead) && (
      <div>
        <button
          type="button"
          onClick={handleApproveClick}
          className="bg-green-500 text-white text-lg px-6 py-2 rounded hover:bg-green-700"
        >
          Aprovar Produção da Vacina
        </button>
        <button
          type="button"
          onClick={handleRejectClick}
          className="bg-red-500 text-white text-lg px-6 py-2 rounded hover:bg-red-700 ml-4"
        >
          Rejeitar Produção da Vacina
        </button>
      </div>
    )
  );
};

const STATUS_TEXT: Record<string, string> = {
  "IN_PROGRESS": "Em progresso",
  "PAUSED": "Pausada",
  "COMPLETED": "Finalizada",
  "DROPPED": "Cancelada",
  "APPROVED" : "Aprovada",
  "REJECTED" : "Rejeitada"
};

const formatDateTime = (date: string) => 
  new Date(date).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
});