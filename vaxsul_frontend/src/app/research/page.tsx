"use client";
import { useState, useEffect } from "react";
import { useLogoutMutation, useSearchVaccineMutation, useGetResearchByIdQuery, useGetAllResearchQuery } from "@/service/vaxsul";
import { LoadingWidget } from "../components/LoadingWidget";
import { ErrorWidget } from "../components/ErrorWidget";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function ResearchCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [accountMenuVisible, setAccountMenuVisible] = useState(false);
  const [newVaccineFormVisible, setNewVaccineFormVisible] = useState(false);
  const [vaccineName, setVaccineName] = useState("");
  const [vaccineDescription, setVaccineDescription] = useState("");
  const [vaccineDoses, setVaccineDoses] = useState("");
  const [filter, setFilter] = useState("");
  const [vaccine_search, vaccineSearch] = useSearchVaccineMutation();
  const [logout, logoutResult] = useLogoutMutation();
  const researchSearch = useGetAllResearchQuery();
  const router = useRouter();

  useEffect(() => {
    vaccine_search({
      name: undefined,
    });
  }, [vaccine_search]);

  if (vaccineSearch.isLoading || vaccineSearch.isUninitialized || researchSearch.isLoading || researchSearch.isUninitialized) {
    return <LoadingWidget />;
  }

  if (researchSearch.isError) {
    return (
      <ErrorWidget message="Erro ao carregar as pesquisas. Por favor, tente novamente mais tarde ou contate o dev lixo que fez essa página." />
    );
  }
  if (vaccineSearch.isError) {
    return (
      <ErrorWidget message="Erro ao carregar as vacinas. Por favor, tente novamente mais tarde ou contate o dev lixo que fez essa página." />
    );
  }

  const vaccines = vaccineSearch.data;
  const researches = researchSearch.data;

  const combinedData = vaccines // Combinar dados das vacinas com as pesquisas
  .map((vaccine) => {
    const research = researches.find((research) => research.id === vaccine.researchId);
    if (!research) return null;
    return {
      ...vaccine,
      researchId: research.id,
      startDate: research.startDate, 
      status: research.status,
    };
  })
  .filter((data) => data !== null);

  const toggleAccountMenu = () => {
    setAccountMenuVisible(!accountMenuVisible);
  };

  const toggleFilterMenu = () => {
    setFilterMenuVisible(!filterMenuVisible);
  };


  return (
    <div
      className="flex flex-col min-h-screen"
      onClick={() => setAccountMenuVisible(false)}
    >
      <div className="flex flex-1">
        <aside className="bg-gray-800 text-white w-32 h-screen flex flex-col items-center">
          <div className="p-2 flex items-center justify-center">
            <h2 className="text-lg font-semibold text-green-400 pb-2">
              VaxSul
            </h2>
          </div>
          <hr className="border-green-400 w-full mb-4" />
          <nav className="mt-2 w-full flex-grow">
            <Link href="/outra-rota">
              <div className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M13.707 10.293a1 1 0 000-1.414L10.414 6.88a1 1 0 10-1.414 1.414L11.586 10l-2.586 2.586a1 1 0 101.414 1.414l3.293-3.293a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">Rotas</span>
              </div>
            </Link>
          </nav>
        </aside>
  
        <div className="flex-1 bg-gray-200 relative pb-16">
          <div className="bg-gray-700 bg-opacity-80 p-2 flex justify-between items-center w-full">
            <div className="flex items-center justify-center w-full">
              <input
                type="text"
                placeholder="Pesquisar"
                className="bg-gray-40 bg-opacity-60 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 w-2/5 md:w-1/4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="relative ml-2">
                <button
                  className="text-white bg-white bg-opacity-20 hover:bg-opacity-30 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out"
                  onClick={toggleFilterMenu}
                >
                  Filtro
                </button>
                {filterMenuVisible && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                    {/* Criar uma função de filtro para os filtros*/}
                    <button
                      onClick={() => setFilter("filtro1")}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Filtro 1
                    </button>
                    <button
                      onClick={() => setFilter("filtro2")}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Filtro 2
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="relative">
              <button
                className="text-white bg-white bg-opacity-20 hover:bg-opacity-30 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out flex items-center"
                onClick={(event) => {
                  event.stopPropagation();
                  toggleAccountMenu();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0a5 5 0 00-5 5c0 2.757 2.243 5 5 5s5-2.243 5-5a5 5 0 00-5-5zm0 7a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M18 18a1 1 0 01-1-1c0-3.859-3.141-7-7-7s-7 3.141-7 7a1 1 0 01-1 1H0a2 2 0 002 2h16a2 2 0 002-2h-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Conta
              </button>
              {accountMenuVisible && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <button
                        className="btn w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                      >
                        Ver Perfil
                      </button>
                    </li>
                    <li>
                      <button
                        className="btn w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={async (event) => {
                          event.stopPropagation();
                          await logout();
                          router.push("/login");
                        }}
                      >
                        Sair
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
  
          <div className="flex flex-col items-center mx-4 md:mx-24 mt-12 space-y-6">
            <div className="flex justify-between items-center w-full">
              <h2 className="text-2xl font-bold text-gray-700">Pesquisas:</h2>
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
            </div>
            <ul className="w-full space-y-6">
              {combinedData.map((vaccine) => (
                <li
                  key={vaccine.id}
                  className="bg-white bg-opacity-30 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out p-4 flex flex-col lg:flex-row items-start justify-between"
                >
                  <div className="flex-1">
                    <h3 className={`text-xl ${researchStatusColor(vaccine.status)} font-semibold pb-2`}>
                      Pesquisa: {vaccine.name}
                    </h3>
                    <p className="text-lg text-gray-700 mb-4">
                      {vaccine.description}
                    </p>
                  </div>
                  <div className="flex flex-col lg:ml-6 lg:w-1/3">
                    <p className="text-lg text-gray-700 mb-4">
                      Data de início: {vaccine.startDate}
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                      Status: {researchStatusText(vaccine.status)}
                    </p>
                    <div className="flex justify-end">
                      <Link href={`/research/${vaccine.id}`}>
                        <button className={`text-sm text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full focus:outline-none`}>
                          Detalhes da Pesquisa
                        </button>
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {newVaccineFormVisible && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                  <h3 className="text-xl text-green-500 font-bold mb-4">Nova pesquisa:</h3>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      // TODO: Implementar a lógica de criação de pesquisa
                    }}
                  >
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vaccineName">
                        Nome da vacina
                      </label>
                      <input
                        id="vaccineName"
                        type="text"
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
                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="flex justify-between">
                      <button
                        type="button"
                        className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out"
                        onClick={() => setNewVaccineFormVisible(false)}
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
            )}
          </div>
        </div>
      </div>
  
      <footer className="bg-gray-700 text-white text-center p-2">
        © 2024 VaxSul. Todos os direitos reservados.
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

const researchStatusColor = (status: string) => {
  switch (status) {
    case "IN_PROGRESS":
      return "text-blue-500";
    case "PAUSED":
      return "text-gray-500";
    case "COMPLETED":
      return "text-green-500";
    case "DROPPED":
      return "text-red-500";
    default: 
      return "text-gray-500";
}};