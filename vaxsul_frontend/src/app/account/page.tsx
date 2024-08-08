"use client";
import Link from "next/link";

export default function Account() {
  // placeholders
  const user = {
    fullName: "Nome do Usuário",
    email: "email@exemplo.com",
    state: "Estado",
    city: "Cidade",
    role: "Papel"
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        background:
          "linear-gradient(to bottom, rgba(30, 66, 111, 0.9), rgba(30, 66, 111, 0.5))",
      }}
    >
      <div className="w-4/5 max-w-lg bg-white bg-opacity-30 p-8 rounded-lg shadow-lg mt-20 mb-20">
        <h2 className="text-2xl font-bold text-gray-200 mb-6 text-center">
          Informações do Usuário
        </h2>
        <div className="space-y-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-200 mb-2">
              Nome Completo
            </label>
            <div className="bg-gray-50 bg-opacity-40 border border-gray-300 text-gray-900 text-sm rounded-lg p-4">
              {user.fullName}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-200 mb-2">
              E-mail
            </label>
            <div className="bg-gray-50 bg-opacity-40 border border-gray-300 text-gray-900 text-sm rounded-lg p-4">
              {user.email}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-200 mb-2">
              Estado
            </label>
            <div className="bg-gray-50 bg-opacity-40 border border-gray-300 text-gray-900 text-sm rounded-lg p-4">
              {user.state}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-200 mb-2">
              Cidade
            </label>
            <div className="bg-gray-50 bg-opacity-40 border border-gray-300 text-gray-900 text-sm rounded-lg p-4">
              {user.city}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-200 mb-2">
              Papel
            </label>
            <div className="bg-gray-50 bg-opacity-40 border border-gray-300 text-gray-900 text-sm rounded-lg p-4">
              {user.role}
            </div>
          </div>
          <div className="flex justify-between mt-10">
            <Link href="/vaccines">
              <button className="text-white bg-[#4a90e2] bg-opacity-90 hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out transform hover:scale-105">
                Voltar para Início
              </button>
            </Link>
            <Link href="/edit-account">
              <button className="text-white bg-[#9dca46] bg-opacity-90 hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out transform hover:scale-105">
                Editar Informações
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
