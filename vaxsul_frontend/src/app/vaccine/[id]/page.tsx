"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetVaccineByIdQuery } from "@/service/vaxsul";
import { LoadingWidget } from "@/app/components/LoadingWidget";
import { ErrorWidget } from "@/app/components/ErrorWidget";
import Link from "next/link";
import Footer from "@/app/components/Footer";

export default function VaccineDetails() {
  const { id } = useParams();
  const router = useRouter();
  const validId = !Array.isArray(id) && id;
  const {
    data: vaccine,
    error,
    isLoading,
  } = useGetVaccineByIdQuery(Number(validId), {
    skip: !validId,
  });

  const [quantity, setQuantity] = useState(1);
  const [accountMenuVisible, setAccountMenuVisible] = useState(false);

  if (!validId) {
    return <p className="text-black">Vacina não encontrada.</p>;
  }

  if (isLoading) return <LoadingWidget />;
  if (error)
    return <ErrorWidget message="Erro ao carregar os detalhes da vacina." />;
  if (!vaccine) return <p className="text-black">Vacina não encontrada.</p>;

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(
      Math.max(Number(e.target.value), 1),
      vaccine.amountInStock,
    );
    setQuantity(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: lidar com isso no backend
    const purchaseData = {
      vaccineId: vaccine.id,
      quantity,
    };

    try {
      // TODO: Colocar processamento no backend mais tarde
      console.log(
        `Preparando para enviar dados: ${JSON.stringify(purchaseData)}`,
      );

      // TODO: como receber essa mensagem em outra pagina e mostrar ela?
      router.push(
        `/vaccine?message=${encodeURIComponent(`Compra realizada com sucesso: ${quantity} unidades de ${vaccine.name} compradas.`)}`,
      );
    } catch (error: any) {
      console.error("Erro na compra:", error.message);

      router.push(
        `/vaccine?message=${encodeURIComponent(`Erro na compra: ${error.message}`)}`,
      );
    }
  };

  const totalPrice = vaccine.pricePerUnit * quantity;

  const toggleAccountMenu = () => {
    setAccountMenuVisible(!accountMenuVisible);
  };

  return (
    <div className="flex flex-col min-h-screen">
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
              <h1 className="text-xl font-semibold text-white">
                Detalhes da Vacina
              </h1>
            </div>
            <div className="flex items-center space-x-4">
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
                            router.push("/account");
                          }}
                        >
                          Ver Perfil
                        </button>
                      </li>
                      <li>
                        <button
                          className="btn w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={async (event) => {
                            router.push("/logout");
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
          </div>

          <div className="flex justify-center mt-12 mx-4 md:mx-24">
            <div className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-2xl shadow-lg p-8 w-full md:w-3/4 lg:w-1/2 relative">
              <button
                onClick={() => router.push("/vaccine")}
                className="absolute top-4 left-4 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-2 transition duration-300 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 14.293a1 1 0 01-1.414 0L4.293 10.293a1 1 0 010-1.414l4.586-4.586a1 1 0 011.414 1.414L6.414 10l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div className="text-center mb-6">
                <h2 className="text-4xl font-bold text-gray-800 mb-2">
                  {vaccine.name}
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  {vaccine.description}
                </p>
                <p className="text-lg text-gray-700">
                  Dose: <span className="font-semibold">{vaccine.dose}</span>
                </p>
                {vaccine.laboratoryId && (
                  <p className="text-lg text-gray-700">
                    Laboratório:{" "}
                    <span className="font-semibold">
                      {vaccine.laboratoryId}
                    </span>
                  </p>
                )}
              </div>

              {vaccine.sellable && (
                <div className="mt-6">
                  <div className="border-t border-gray-300 pt-6 mb-6">
                    <div className="flex justify-between text-gray-700 text-lg mb-2">
                      <span>Quantidade em estoque:</span>
                      <span className="font-semibold">
                        {vaccine.amountInStock}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-700 text-lg mb-4">
                      <span>Preço:</span>
                      <span className="font-semibold">
                        R$ {vaccine.pricePerUnit}
                      </span>
                    </div>
                  </div>
                  <form
                    className="flex flex-col items-end"
                    onSubmit={handleSubmit}
                  >
                    <div className="flex items-center mb-4">
                      <input
                        type="number"
                        min={1}
                        max={vaccine.amountInStock}
                        value={quantity}
                        onChange={handleQuantityChange}
                        placeholder="Quantidade"
                        className="border border-gray-300 rounded-lg px-3 py-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mr-2"
                        style={{ width: "100px" }}
                      />
                      <button
                        type="submit"
                        className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition duration-300"
                      >
                        Comprar
                      </button>
                    </div>
                    <p className="text-lg text-gray-700">
                      Preço total: R$ {totalPrice.toFixed(2)}
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
