"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditAccount() {
  const router = useRouter();
  
  // placeholders
  const [user, setUser] = useState({
    fullName: "Nome do Usuário",
    email: "email@exemplo.com",
    state: "Estado",
    city: "Cidade",
    role: "Papel"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Lógica para salvar as informações do usuário
    // Redireciona para a página de visualização após salvar
    router.push("/account");
  };

  const handleCancel = () => {
    // Volta para a página anterior
    router.back();
  }

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
          Editar Informações do Usuário
        </h2>
        <div className="space-y-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-200 mb-2">
              Nome Completo
            </label>
            <input
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              className="bg-gray-50 bg-opacity-40 border border-gray-300 text-gray-900 text-sm rounded-lg p-4"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-200 mb-2">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="bg-gray-50 bg-opacity-40 border border-gray-300 text-gray-900 text-sm rounded-lg p-4"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-200 mb-2">
              Estado
            </label>
            <input
              type="text"
              name="state"
              value={user.state}
              onChange={handleChange}
              className="bg-gray-50 bg-opacity-40 border border-gray-300 text-gray-900 text-sm rounded-lg p-4"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-200 mb-2">
              Cidade
            </label>
            <input
              type="text"
              name="city"
              value={user.city}
              onChange={handleChange}
              className="bg-gray-50 bg-opacity-40 border border-gray-300 text-gray-900 text-sm rounded-lg p-4"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-200 mb-2">
              Papel
            </label>
            <input
              type="text"
              name="role"
              value={user.role}
              onChange={handleChange}
              className="bg-gray-50 bg-opacity-40 border border-gray-300 text-gray-900 text-sm rounded-lg p-4"
            />
          </div>
          <div className="flex justify-between mt-10">
            <button
              onClick={handleCancel}
              className="text-white bg-[#4a90e2] bg-opacity-90 hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out transform hover:scale-105"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="text-white bg-[#9dca46] bg-opacity-90 hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out transform hover:scale-105"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
