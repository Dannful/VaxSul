"use client";
import { useState, useEffect } from "react";
import { useLogoutMutation, useSearchVaccineMutation, useGetPurchaseMutation, useGetAllResearchQuery } from "@/service/vaxsul";
import { LoadingWidget } from "../components/LoadingWidget";
import { ErrorWidget } from "../components/ErrorWidget";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function ResearchCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [accountMenuVisible, setAccountMenuVisible] = useState(false);
  const [newVaccineFormVisible, setNewVaccineFormVisible] = useState(false);
  const [filter, setFilter] = useState("");
  const [vaccine_search, vaccineSearch] = useSearchVaccineMutation();
  const [logout, logoutResult] = useLogoutMutation();
  const [research, researchResult] = useGetPurchaseMutation();
  const router = useRouter();

  useEffect(() => {
    vaccine_search({
      name: undefined,
    });
  }, [vaccine_search]);



  if (researchResult.isError) {
    return (
      <ErrorWidget message="Erro ao carregar as pesquisas. Por favor, tente novamente mais tarde ou contate o dev lixo que fez essa página." />
    );
  }
  if (vaccineSearch.isError) {
    return (
      <ErrorWidget message="Erro ao carregar as vacinas. Por favor, tente novamente mais tarde ou contate o dev lixo que fez essa página." />
    );
  }

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


      </div>

      <footer className="bg-gray-700 text-white text-center p-2">
        © 2024 VaxSul. Todos os direitos reservados.
      </footer>
    </div>
  );
}
