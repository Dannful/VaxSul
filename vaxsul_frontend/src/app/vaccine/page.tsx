"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

// Simulação dos dados de vacinas que viriam do backend 
const mockVaccines = [
  { id: 1, name: "Vacina A", description: "Descrição da Vacina A", dose: "Unica" },
  { id: 2, name: "Vacina B", description: "Descrição da Vacina B", dose: "Unica" },
  { id: 3, name: "Vacina C", description: "Descrição da Vacina C", dose: "Unica" },
  { id: 4, name: "Vacina D", description: "Descrição da Vacina D", dose: "Unica" },
  { id: 5, name: "Vacina E", description: "Descrição da Vacina E", dose: "Unica" },
  { id: 6, name: "Vacina F", description: "Descrição da Vacina F", dose: "Unica" },
  { id: 7, name: "Vacina G", description: "Descrição da Vacina G", dose: "Unica" },
  { id: 8, name: "Vacina H", description: "Descrição da Vacina H", dose: "Unica" },
  { id: 9, name: "Vacina I", description: "Descrição da Vacina I", dose: "Unica" },
  { id: 10, name: "Vacina J", description: "Descrição da Vacina J", dose: "Unica" },
];

export default function ProductCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [accountMenuVisible, setAccountMenuVisible] = useState(false);

  useEffect(() => {
    // Simula a chamada para buscar produtos (não é necessário com dados mockados)
    setProducts(mockVaccines);
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLoadMore = () => {
    // Colocar logica de carregar mais produtos
  };

  const toggleAccountMenu = () => {
    setAccountMenuVisible(!accountMenuVisible);
  };

  const toggleFilterMenu = () => {
    setFilterMenuVisible(!filterMenuVisible);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <aside className="bg-gray-800 text-white w-32 h-screen flex flex-col items-center">
          <div className="p-2 flex items-center justify-center">
            <h2 className="text-lg font-semibold text-green-400 pb-2">VaxSul</h2>
          </div>
          <hr className="border-green-400 w-full mb-4" />
          <nav className="mt-2 w-full flex-grow">
            <Link href="/outra-rota">
              <div className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M13.707 10.293a1 1 0 000-1.414L10.414 6.88a1 1 0 10-1.414 1.414L11.586 10l-2.586 2.586a1 1 0 101.414 1.414l3.293-3.293a1 1 0 000-1.414z" clipRule="evenodd" />
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
                onClick={toggleAccountMenu}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
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
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Ver Perfil
                  </a>
                  <a
                    href="/logout"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Sair
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center mx-4 md:mx-24 mt-12 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {/* Listagem de Vacinas */}
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white bg-opacity-30 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out">
                  <div className="p-6">
                    <h3 className="text-lg text-blue-500 font-semibold pb-2">{product.name}</h3>
                    <p className="text-sm text-gray-700 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-10a2 2 0 110 4 2 2 0 010-4z" clipRule="evenodd" />
                          <path d="M10 6a2 2 0 100 4 2 2 0 000-4z" />
                        </svg>
                        <span className="text-sm text-gray-500">{product.dose}</span>
                      </div>
                      <Link href={`/vaccine/${product.id}`}>
                        <button className="text-xs text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-full focus:outline-none">Detalhes</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length < products.length && (
              <button
                onClick={handleLoadMore}
                className="text-white bg-white bg-opacity-20 hover:bg-opacity-30 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out"
              >
                Carregar Mais
              </button>
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
