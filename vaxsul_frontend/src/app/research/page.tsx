"use client";
import { useState, useEffect, FormEvent } from "react";
import {
  useLogoutMutation,
  useSearchVaccineQuery,
  useNewResearchMutation,
  useNewVaccineMutation,
  useGetAllResearchQuery,
  useGetCurrentUserQuery,
  RESEARCHES_QUERY,
  NEW_RESEARCH,
} from "@/service/vaxsul";
import { LoadingWidget } from "../components/LoadingWidget";
import { ErrorWidget } from "../components/ErrorWidget";
import { Research } from "@/types/research";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Page from "../components/Page";
import { useMutation, useQuery } from "@apollo/client";
import { ResearchStatus } from "@/__generated__/graphql";
import { deserializeDateTime } from "../util/DateSerializer";

export default function ResearchCatalog() {
  const [editValues, setEditValues] = useState({
    researchName: "",
    researchDescription: "",
  });

  const [sortType, setSortType] = useState("");
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [newVaccineFormVisible, setNewVaccineFormVisible] = useState(false);

  const [researchSearchQuery, setResearchSearchQuery] = useState("");

  const { loading, error, data } = useQuery(RESEARCHES_QUERY);

  const [newResearch] = useMutation(NEW_RESEARCH);

  const router = useRouter();
  const user = useGetCurrentUserQuery();

  const isResearcher = user.data && user.data.role === "RESEARCHER";
  const isResearchLead = user.data && user.data.role === "RESEARCH_LEAD";

  if (loading || user.isLoading || user.isUninitialized) {
    return <LoadingWidget />;
  }

  if (!isResearcher && !isResearchLead)
    return (
      <ErrorWidget message="Você não tem permissão para ver esta página." />
    );

  if (error || !data?.researches || user.isError) {
    return (
      <ErrorWidget message="Erro ao carregar as pesquisas. Por favor, tente novamente mais tarde ou contate o dev lixo que fez essa página." />
    );
  }

  const sortedData = [...data.researches]
    .filter((res) => res.name && res.startDate)
    .sort((a, b) => {
      if (sortType === "name") {
        return (a.name || "").localeCompare(b.name || "");
      } else if (sortType === "progress") {
        return (a.progress ?? 0) - (b.progress ?? 0);
      } else if (sortType === "status") {
        const statusOrder = [
          "COMPLETED",
          "IN_PROGRESS",
          "PAUSED",
          "DROPPED",
          "APPROVED",
          "REJECTED",
        ];
        return (
          statusOrder.indexOf(a.status ?? "") -
          statusOrder.indexOf(b.status ?? "")
        );
      } else if (sortType === "startDate") {
        return (
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
      }
      return 0;
    });

  const filteredData = sortedData.filter((res) =>
    (res.name || "").toLowerCase().includes(researchSearchQuery.toLowerCase()),
  );

  const toggleFilterMenu = () => {
    setFilterMenuVisible(!filterMenuVisible);
  };

  const handleNewResearchSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const { researchName, researchDescription } = editValues;
    if (!researchName || !researchDescription)
      return alert("Preencha todos os campos.");

    if (
      user.data.laboratoryId === null ||
      user.data.laboratoryId === undefined
    ) {
      alert(
        "Você não está associado a um laboratório. Por favor, contate o administrador.",
      ); // Verificar se o usuário está associado a um laboratório
      return;
    }

    const newRes = await newResearch({
      variables: {
        research: {
          name: researchName,
          description: researchDescription,
          startDate: new Date().getTime() / 1000,
          status: ResearchStatus.InProgress,
          report: "",
          laboratoryId: user.data.laboratoryId,
          progress: 0,
        },
      },
    });
    if (newRes.errors) return alert("Erro ao criar pesquisa.");

    router.push("/research/" + newRes.data?.newResearch.id);
  };

  const titleBar = (
    <>
      <div className="flex items-center justify-center w-full">
        <input
          type="text"
          placeholder="Pesquisar"
          className="bg-gray-40 bg-opacity-60 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 w-2/5 md:w-1/4"
          value={researchSearchQuery}
          onChange={(e) => setResearchSearchQuery(e.target.value)}
        />
        <div className="relative ml-2">
          <button
            className="text-white bg-white bg-opacity-20 hover:bg-opacity-30 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out"
            onClick={toggleFilterMenu}
          >
            Ordenação
          </button>
          {filterMenuVisible && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
              <button
                onClick={() => {
                  setSortType("name");
                  toggleFilterMenu();
                }}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Nome
              </button>
              <button
                onClick={() => {
                  setSortType("startDate");
                  toggleFilterMenu();
                }}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Data de Início
              </button>
              <button
                onClick={() => {
                  setSortType("progress");
                  toggleFilterMenu();
                }}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Progresso
              </button>
              <button
                onClick={() => {
                  setSortType("status");
                  toggleFilterMenu();
                }}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Status
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );

  const AddResearchButton = (
    <button
      className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out flex items-center"
      onClick={() => setNewVaccineFormVisible(true)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-2"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 3a1 1 0 011 1v6h6a1 1 0 010 2h-6v6a1 1 0 01-2 0v-6H3a1 1 0 010-2h6V4a1 1 0 011-1z"
          clipRule="evenodd"
        />
      </svg>
      Adicionar pesquisa
    </button>
  );

  return (
    <Page titleBar={titleBar}>
      <div className="p-4 md:p-8 space-y-6">
        {" "}
        {/* Added padding to create margin between the content and sidebar, footer, and header */}
        <div className="flex flex-col items-center mx-4 md:mx-24 mt-12 space-y-6">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-2xl font-bold text-gray-700">Pesquisas:</h2>
            {isResearchLead && AddResearchButton}
          </div>
        </div>
        <VaccineResearchList research={filteredData} />
      </div>
      {newVaccineFormVisible && (
        <NewResearchForm
          onSubmit={handleNewResearchSubmit}
          onCancel={() => setNewVaccineFormVisible(false)}
          editValues={editValues}
          setEditValues={setEditValues}
        />
      )}
    </Page>
  );
}

const VaccineResearchList = ({ research }: { research: Research[] }) => {
  return (
    <ul className="w-full space-y-6">
      {research.map((res) => (
        <li
          key={res.id}
          className="bg-white bg-opacity-30 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out p-4 flex flex-col lg:flex-row items-start justify-between"
        >
          <div className="flex-1">
            <h3
              className={`text-xl ${STATUS_COLOR[res.status]} font-semibold pb-2`}
            >
              Pesquisa: {res.name}
            </h3>
            <p className="text-lg text-gray-700 mb-4">{res.description}</p>
            <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
              <div
                className="h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{
                  width: `${res.progress}%`,
                  backgroundColor: `hsl(${((res.progress ?? 0) / 100) * 120}, 100%, 40%)`, // Ajustar cor baseado no progresso
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  boxSizing: "border-box",
                }}
              >
                {res.progress}%
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:ml-6 lg:w-1/3">
            <p className="text-lg text-gray-700 mb-4">
              Data de início: {formatDateTime(res.startDate)}
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Status: {STATUS_TEXT[res.status]}
            </p>
            <div className="flex justify-end">
              <Link href={`/research/${res.id}`}>
                <button className="text-sm text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full focus:outline-none">
                  Detalhes da Pesquisa
                </button>
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

const NewResearchForm = ({
  onSubmit,
  onCancel,
  editValues,
  setEditValues,
}: {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  editValues: {
    researchName: string;
    researchDescription: string;
  };
  setEditValues: React.Dispatch<
    React.SetStateAction<{
      researchName: string;
      researchDescription: string;
    }>
  >;
}) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-2xl text-green-400 font-semibold mb-4">
          Nova Pesquisa
        </h3>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-medium mb-2"
              htmlFor="researchName"
            >
              Nome da pesquisa
            </label>
            <input
              id="researchName"
              type="text"
              required
              onChange={(e) =>
                setEditValues({ ...editValues, researchName: e.target.value })
              }
              className="bg-gray-700 text-gray-300 border border-gray-600 rounded-lg w-full py-2 px-3 focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-medium mb-2"
              htmlFor="description"
            >
              Descrição da pesquisa
            </label>
            <textarea
              id="description"
              rows={10}
              required
              onChange={(e) =>
                setEditValues({
                  ...editValues,
                  researchDescription: e.target.value,
                })
              }
              className="bg-gray-700 text-gray-300 border border-gray-600 rounded-lg w-full py-2 px-3 focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out"
              onClick={onCancel}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out"
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const STATUS_TEXT: Record<string, string> = {
  IN_PROGRESS: "Em progresso",
  PAUSED: "Pausada",
  COMPLETED: "Finalizada",
  DROPPED: "Cancelada",
  APPROVED: "Aprovada",
  REJECTED: "Rejeitada",
};

const STATUS_COLOR: Record<string, string> = {
  IN_PROGRESS: "text-blue-500",
  PAUSED: "text-gray-500",
  COMPLETED: "text-green-600",
  DROPPED: "text-red-600",
  APPROVED: "text-green-400",
  REJECTED: "text-red-400",
};

const formatDateTime = (date: string) =>
  deserializeDateTime(date).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
