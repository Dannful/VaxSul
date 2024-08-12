"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  useGetResearchByIdQuery,
  useGetCurrentUserQuery,
  RESEARCH_BY_ID,
  NEW_RESEARCH,
  NEW_VACCINE,
  UPDATE_VACCINE,
  UPDATE_RESEARCH,
  RESEARCHES_QUERY,
  SEARCH_VACCINES,
  VACCINE_BY_ID,
} from "@/service/vaxsul";
import { LoadingWidget } from "../../components/LoadingWidget";
import { ErrorWidget } from "../../components/ErrorWidget";
import { Vaccine } from "@/types/vaccine";
import Page from "../../components/Page";
import { useMutation, useQuery } from "@apollo/client";
import {
  IdResearch,
  IdResearchFragment,
  PurchaseStatus,
  Research,
  ResearchStatus,
} from "@/__generated__/graphql";
import { User } from "@/types/user";
import { deserializeDateTime } from "@/app/util/DateSerializer";
import { countReset } from "console";

export default function VaccineResearchDetails() {
  const { id } = useParams();
  const user = useGetCurrentUserQuery();

  const validId = !Array.isArray(id) && id;
  const { data, loading, error } = useQuery(RESEARCH_BY_ID, {
    variables: {
      id: Number(id),
    },
  });

  if (loading) {
    return <LoadingWidget />;
  }

  if (error || !data?.research || !user.data) {
    return (
      <ErrorWidget message="Falha ao carregar pesquisa. Por favor, tente novamente mais tarde ou contate o dev lixo que fez essa página." />
    );
  }

  return <ResearchComponent research={data.research} user={user.data} />;
}

function ResearchComponent({
  research,
  user,
}: {
  research: IdResearchFragment;
  user: User;
}) {
  const [updateResearch] = useMutation(UPDATE_RESEARCH, {
    refetchQueries: [RESEARCHES_QUERY, RESEARCH_BY_ID],
  });
  const [newVaccine] = useMutation(UPDATE_VACCINE, {
    refetchQueries: [SEARCH_VACCINES, VACCINE_BY_ID],
  });
  const [editing, setEditing] = useState(false);
  const [editValues, setEditValues] = useState<Research>({
    name: research.name,
    description: research.description,
    status: research.status,
    progress: research.progress,
    report: research.report,
    startDate: research.startDate,
    laboratoryId: research.laboratory.id,
  });

  const isResearcher = user.role === "RESEARCHER";
  const isResearchLead = user.role === "RESEARCH_LEAD";

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const validateInput = () => {
    if (
      research.status === ResearchStatus.Approved ||
      research.status === ResearchStatus.Rejected
    ) {
      alert("Você não pode editar pesquisas aprovadas ou rejeitadas.");
      return false;
    }
    if (
      editValues.status === ResearchStatus.Completed &&
      editValues.progress < 100
    ) {
      alert("O progresso da pesquisa deve ser 100% para ser finalizada.");
      return false;
    }
    if (
      editValues.progress >= 100 &&
      editValues.status !== ResearchStatus.Completed
    ) {
      alert(
        "O status da pesquisa deve ser finalizada se o progresso for 100%.",
      );
      return false;
    }
    if (editValues.status === "COMPLETED" && editValues.report.length === 0) {
      alert("O relatório é obrigatório para pesquisas finalizadas.");
      return false;
    }
    return true;
  };

  const handleSaveChanges = () => {
    if (isResearcher && !validateInput()) return;

    console.log(editValues);
    updateResearch({
      variables: {
        id: research.id,
        research: editValues,
      },
    });
  };

  const handleApproveClick = () => {
    updateResearch({
      variables: {
        id: research.id,
        research: {
          ...editValues,
          status: ResearchStatus.Approved,
        },
      },
    });
    window.location.reload();
  };

  const handleRejectClick = () => {
    updateResearch({
      variables: {
        id: research.id,
        research: {
          ...editValues,
          status: ResearchStatus.Rejected,
        },
      },
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
            <ResearchEditForm
              research={research}
              editing={editing}
              editValues={editValues}
              handleInputChange={setEditValues}
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
            research={research}
            isResearchLead={isResearchLead ?? false}
            handleApproveClick={handleApproveClick}
            handleRejectClick={handleRejectClick}
          />
        </div>
      </div>
    </Page>
  );
}

function ResearchEditForm({
  research,
  editing,
  editValues,
  handleInputChange,
}: {
  research: IdResearchFragment;
  editing: boolean;
  editValues: Research;
  handleInputChange: (update: Research) => void;
}) {
  return (
    <div>
      {editing ? (
        <div>
          <label className="block mb-2 text-black">
            Nome da Pesquisa:
            <input
              type="text"
              name="researchName"
              value={editValues.name}
              onChange={(e) =>
                handleInputChange({ ...editValues, name: e.target.value })
              }
              className="border rounded px-4 py-2 w-full text-black"
            />
          </label>
          <label className="block mb-2 text-black">
            Status:
            <select
              name="researchStatus"
              value={editValues.status}
              onChange={(e) =>
                handleInputChange({
                  ...editValues,
                  status: Object.values(ResearchStatus)[e.target.selectedIndex],
                })
              }
              className="border rounded px-4 py-2 w-full text-black"
            >
              {Object.values(ResearchStatus).map((status) => (
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
              value={editValues.progress}
              onChange={(e) =>
                handleInputChange({
                  ...editValues,
                  progress: Number(e.target.value),
                })
              }
              className="border rounded px-4 py-2 w-full text-black"
            />
          </label>
          <label className="block mb-2 text-black">
            Descrição da Pesquisa:
            <textarea
              name="researchDescription"
              value={editValues.description}
              onChange={(e) =>
                handleInputChange({
                  ...editValues,
                  description: e.target.value,
                })
              }
              className="border rounded px-4 py-2 w-full text-black"
              rows={5}
            />
          </label>
          {editValues.status === ResearchStatus.Completed && (
            <label className="block mb-2 text-black">
              Relatório:
              <textarea
                name="researchReport"
                value={editValues.report}
                onChange={(e) =>
                  handleInputChange({ ...editValues, report: e.target.value })
                }
                className="border rounded px-4 py-2 w-full text-black"
                rows={5}
              />
            </label>
          )}
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-black text-center">
            {research.name}
          </h2>{" "}
          {/* Centered the research name */}
          <p className="text-lg mb-4 text-black text-center">
            Data de Início: {formatDateTime(research.startDate)}
          </p>
          <p className="text-lg mb-4 text-black text-center">
            Status: {STATUS_TEXT[research.status]}
          </p>{" "}
          {/* Centered the status */}
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
          <p className="text-lg mb-4 text-black whitespace-pre-wrap">
            {research.description}
          </p>
          {[
            ResearchStatus.Completed,
            ResearchStatus.Approved,
            ResearchStatus.Rejected,
          ].includes(research.status) && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-center text-black mb-2">
                Relatório
              </h3>
              <p className="text-lg text-black whitespace-pre-wrap mx-auto w-3/4">
                {research.report}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const EditButtons: React.FC<{
  research: IdResearchFragment;
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
  handleEditClick,
}) => {
  return (
    <div className="flex space-x-4 mt-6">
      {editing && isResearcher ? (
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
        isResearcher &&
        ![
          ResearchStatus.Completed,
          ResearchStatus.Approved,
          ResearchStatus.Rejected,
        ].includes(research.status) && (
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
  research: IdResearchFragment;
  isResearchLead: boolean;
  handleApproveClick: () => void;
  handleRejectClick: () => void;
}> = ({ research, isResearchLead, handleApproveClick, handleRejectClick }) => {
  return (
    research.status === "COMPLETED" &&
    isResearchLead && (
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

const STATUS_TEXT: Record<ResearchStatus, string> = {
  IN_PROGRESS: "Em progresso",
  PAUSED: "Pausada",
  COMPLETED: "Finalizada",
  DROPPED: "Cancelada",
  APPROVED: "Aprovada",
  REJECTED: "Rejeitada",
};

const formatDateTime = (date: string) =>
  deserializeDateTime(date).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
