  "use client";
  import { useState, useEffect, FormEvent } from "react";
  import { useLogoutMutation, useSearchVaccineQuery, useNewResearchMutation, useNewVaccineMutation, useGetAllResearchQuery, useGetCurrentUserQuery } from "@/service/vaxsul";
  import { LoadingWidget } from "../components/LoadingWidget";
  import { ErrorWidget } from "../components/ErrorWidget";
  import { Vaccine, VaccineSearch } from "@/types/vaccine";
  import { Research } from "@/types/research";
  import Link from "next/link";
  import { useRouter } from "next/navigation";
  import Page from "../components/Page";

  export default function ResearchCatalog() {
    const [editValues, setEditValues] = useState({
      vaccineName: '',
      vaccineDescription: '',
      vaccineDoses: 1,
    });

    const [sortType, setSortType] = useState("");
    const [filterMenuVisible, setFilterMenuVisible] = useState(false);
    const [accountMenuVisible, setAccountMenuVisible] = useState(false);
    const [newVaccineFormVisible, setNewVaccineFormVisible] = useState(false);

    const [vaccineSearchQuery, setVaccineSearchQuery] = useState<VaccineSearch>({
      name: "",
    });
    const vaccineSearchRequest = useSearchVaccineQuery(vaccineSearchQuery);
    const researchSearch = useGetAllResearchQuery();
    const [newResearch, newResearchResult] = useNewResearchMutation();
    const [newVaccine, newVaccineResult] = useNewVaccineMutation();
    

    const [filter, setFilter] = useState("");
    const [logout, logoutResult] = useLogoutMutation();
    const router = useRouter();
    const user = useGetCurrentUserQuery();

    const isResearcher = user.data && (user.data.role === "RESEARCH_LEAD" || user.data.role === "RESEARCHER");
    const isResearchLead = user.data && user.data.role === "RESEARCH_LEAD";

    if (vaccineSearchRequest.isLoading || vaccineSearchRequest.isUninitialized || 
        researchSearch.isLoading || researchSearch.isUninitialized || 
        user.isLoading || user.isUninitialized) {
    return <LoadingWidget />;
    }

    if (!isResearcher) return <ErrorWidget message="Você não tem permissão para ver esta página." />;

    if (vaccineSearchRequest.isError || researchSearch.isError || user.isError ) {
      return (
        <ErrorWidget message="Erro ao carregar. Por favor, tente novamente mais tarde ou contate o dev lixo que fez essa página." />
      );
    }

    const vaccines = vaccineSearchRequest.data;
    const researches = researchSearch.data;

    const combinedData = vaccines.second // Combinar dados das vacinas com as pesquisas
    .map((vaccine) => {
      const research = researches.find((research) => research.id === vaccine.researchId);
      if (!research) return null;
      return {
        vaccine, 
        research,
      };
    })
    .filter((data) => data !== null);

    const toggleAccountMenu = () => {
      setAccountMenuVisible(!accountMenuVisible);
    };

    const toggleFilterMenu = () => {
      setFilterMenuVisible(!filterMenuVisible);
    };

    const handleNewResearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { vaccineName, vaccineDescription, vaccineDoses } = editValues;
      if (!vaccineName || !vaccineDescription || vaccineDoses === 0) return alert("Preencha todos os campos.");

      if (user.data.laboratoryId === null || user.data.laboratoryId === undefined) {
        alert("Você não está associado a um laboratório. Por favor, contate o administrador."); // Verificar se o usuário está associado a um laboratório
        return;
      }

      const newRes = await newResearch({ 
        startDate: new Date().toISOString().split(".")[0], 
        status: "IN_PROGRESS" 
      });
      if (newRes.error) return alert("Erro ao criar pesquisa.");

      const newVac = await newVaccine({
        dose: vaccineDoses,
        pricePerUnit: 0,
        amountInStock: 0,
        researchId: newRes.data.id,
        sellable: false,
        name: vaccineName,
        laboratoryId: user.data.laboratoryId,
        description: vaccineDescription,
      });
      if (newVac.error) return alert("Erro ao criar vacina.");

      router.push("/research/" + newVac.data.id);
    };

    const titleBar = (
      <>
        <div className="flex items-center justify-center w-full">
          <input
            type="text"
            placeholder="Pesquisar"
            className="bg-gray-40 bg-opacity-60 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 w-2/5 md:w-1/4"
            value={vaccineSearchQuery.name}
            onChange={(e) =>
              setVaccineSearchQuery({ ...vaccineSearchQuery, name: e.target.value })
            }
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
        <div className="p-4 md:p-8 space-y-6"> {/* Added padding to create margin between the content and sidebar, footer, and header */}
          <div className="flex flex-col items-center mx-4 md:mx-24 mt-12 space-y-6">
            <div className="flex justify-between items-center w-full">
              <h2 className="text-2xl font-bold text-gray-700">Pesquisas:</h2>
              {isResearchLead && AddResearchButton}
            </div>
          </div>
          <VaccineResearchList combinedData={combinedData} />
        </div>
        {newVaccineFormVisible && (
          <NewVaccineForm
            onSubmit={handleNewResearchSubmit}
            onCancel={() => setNewVaccineFormVisible(false)}
            editValues={editValues}
            setEditValues={setEditValues}
          />
        )}
      </Page>
    );    
  }

const VaccineResearchList = ({ combinedData }: { combinedData: { vaccine: Vaccine; research: Research }[] }) => {
  return (
    <ul className="w-full space-y-6">
      {combinedData.map((data) => (
        <li
        key={data.vaccine.id}
        className="bg-white bg-opacity-30 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out p-4 flex flex-col lg:flex-row items-start justify-between"
        >
          <div className="flex-1">
            <h3 className={`text-xl ${STATUS_COLOR[data.research.status]} font-semibold pb-2`}>
              Pesquisa: {data.vaccine.name}
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              {data.vaccine.description}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
              <div
                className="h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{
                  width: `${data.research.progress}%`,
                  backgroundColor: `hsl(${((data.research.progress ?? 0) / 100) * 120}, 100%, 40%)`, // Ajustar cor baseado no progresso
                  paddingLeft: '20px', 
                  paddingRight: '20px',
                  boxSizing: 'border-box'
                }}
              >
              {data.research.progress}%
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:ml-6 lg:w-1/3">
            <p className="text-lg text-gray-700 mb-4">
              Data de início: {formatDateTime(data.research.startDate)}
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Status: {STATUS_TEXT[data.research.status]}
            </p>
            <div className="flex justify-end">
              <Link href={`/research/${data.vaccine.id}`}>
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
}

const NewVaccineForm = ({ 
  onSubmit, 
  onCancel, 
  editValues, 
  setEditValues 
}: { 
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  editValues: {
    vaccineName: string;
    vaccineDescription: string;
    vaccineDoses: number;
  };
  setEditValues: React.Dispatch<React.SetStateAction<{
    vaccineName: string;
    vaccineDescription: string;
    vaccineDoses: number;
  }>>;
}) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-xl text-green-500 font-bold mb-4">Nova pesquisa:</h3>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vaccineName">
              Nome da vacina
            </label>
            <input
              id="vaccineName"
              type="text"
              required
              onChange={(e) => setEditValues({ ...editValues, vaccineName: e.target.value })}
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Descrição da vacina
            </label>
            <textarea
              id="description"
              rows={10}
              required
              onChange={(e) => setEditValues({ ...editValues, vaccineDescription: e.target.value })}
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vaccineDoses">
              Doses
            </label>
            <input
              id="vaccineDoses"
              type="number"
              required
              onChange={(e) => setEditValues({ ...editValues, vaccineDoses: parseInt(e.target.value) })}
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out"
              onClick={onCancel}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out"
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const STATUS_TEXT: Record<string, string> = {
  "IN_PROGRESS": "Em progresso",
  "PAUSED": "Pausada",
  "COMPLETED": "Finalizada",
  "DROPPED": "Cancelada"
};

const STATUS_COLOR: Record<string, string> = {
  "IN_PROGRESS": "text-blue-500",
  "PAUSED": "text-gray-500",
  "COMPLETED": "text-green-500",
  "DROPPED": "text-red-500"
};

const formatDateTime = (date: string) => 
  new Date(date).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
});