"use client";
import {
  useState,
  useEffect,
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import { useSearchVaccineMutation } from "@/service/vaxsul";
import { LoadingWidget } from "../components/LoadingWidget";
import { ErrorWidget } from "../components/ErrorWidget";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "@/app/components/Footer";
import { Vaccine } from "@/types/vaccine";
import Page from "../components/Page";

export default function ProductCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [accountMenuVisible, setAccountMenuVisible] = useState(false);
  const [sortType, setSortType] = useState("");
  const [search, searchResult] = useSearchVaccineMutation();
  const router = useRouter();
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    search({
      name: undefined,
      maximumPrice: undefined,
      minimumPrice: undefined,
      count: visibleCount,
    });
  }, [search, visibleCount]);

  if (searchResult.isLoading || searchResult.isUninitialized) {
    return <LoadingWidget />;
  }

  if (searchResult.isError) {
    return (
      <ErrorWidget message="Erro ao carregar o catálogo. Por favor, tente novamente mais tarde ou contate o dev lixo que fez essa página." />
    );
  }

  const vaccinesResponse = searchResult.data;

  const handleLoadMore = () => {
    setVisibleCount(visibleCount + 12);
    search({
      ...search,
      count: visibleCount,
    });
  };

  const toggleAccountMenu = () => {
    setAccountMenuVisible(!accountMenuVisible);
  };

  const toggleFilterMenu = () => {
    setFilterMenuVisible(!filterMenuVisible);
  };

  const titleBar = (
    <>
      <div className="flex items-center justify-center w-full">
        <input
          type="text"
          placeholder="Pesquisar"
          className="bg-gray-40 bg-opacity-60 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 w-2/5 md:w-1/4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              search({
                name: searchTerm,
              });
            }
          }}
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
                  setSortType("value");
                  toggleFilterMenu();
                }}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Valor
              </button>
              <button
                onClick={() => {
                  setSortType("lab");
                  toggleFilterMenu();
                }}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Laboratório
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <Page titleBar={titleBar}>
      <div className="flex flex-col items-center mx-4 md:mx-24 mt-12 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          <VaccineList vaccines={vaccinesResponse.second} />
        </div>

        {vaccinesResponse.second.length < vaccinesResponse.first && (
          <button
            onClick={handleLoadMore}
            className="text-white bg-blue-500 bg-opacity-80 hover:bg-opacity-30 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out"
          >
            Carregar mais
          </button>
        )}
      </div>
    </Page>
  );
}

function VaccineList({ vaccines }: { vaccines: Vaccine[] }) {
  return (
    <>
      {vaccines.map((product: Vaccine) => (
        <div
          key={product.id}
          className="bg-white bg-opacity-30 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out"
        >
          <div className="p-6">
            <h3 className="text-lg text-blue-500 font-semibold pb-2">
              {product.name}
            </h3>
            <p className="text-sm text-gray-700 mb-4">{product.description}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-10a2 2 0 110 4 2 2 0 010-4z"
                    clipRule="evenodd"
                  />
                  <path d="M10 6a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                <span className="text-sm text-gray-500">{product.dose}</span>
              </div>
              <Link href={`/vaccine/${product.id}`}>
                <button className="text-xs text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-full focus:outline-none">
                  Detalhes
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
