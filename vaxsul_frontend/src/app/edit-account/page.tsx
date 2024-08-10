"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User } from "@/types/user";
import {
  useGetCurrentUserQuery,
  useUpdateUserMutation,
} from "@/service/vaxsul";
import { LoadingWidget } from "../components/LoadingWidget";
import { ErrorWidget } from "../components/ErrorWidget";

export default function EditAccount() {
  const router = useRouter();
  const currentUser = useGetCurrentUserQuery();

  if (currentUser.isUninitialized || currentUser.isLoading) {
    return <LoadingWidget />;
  }

  if (currentUser.isError) {
    router.push("/login");
    return <></>;
  }

  return <UserForm currentUser={currentUser.data} />;
}

function UserForm({ currentUser }: { currentUser: User }) {
  const [user, setUser] = useState<User>(currentUser);
  const [updateAccount, updateAccountResult] = useUpdateUserMutation();
  const router = useRouter();

  if (updateAccountResult.isError) {
    return (
      <ErrorWidget message="Falha ao atualizar conta. Por favor, tente novamente mais tarde ou contate o dev lixo que fez essa página." />
    );
  }

  const handleSave = async () => {
    const result = await updateAccount(user);
    if (result.error) {
      return;
    }
    router.push("/account");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <aside className="bg-gray-800 text-white w-32 flex flex-col items-center h-screen sticky top-0">
          <div className="p-2 flex items-center justify-center">
            <h2 className="text-lg font-semibold text-green-400 pb-2">
              Perfil
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

        <div className="flex-1 bg-gray-200 relative pb-16 flex justify-center items-start">
          <div className="w-4/5 max-w-lg bg-white bg-opacity-30 p-8 rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
              Editar Informações do Usuário
            </h2>
            <div className="space-y-6">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="bg-gray-50 bg-opacity-40 border border-gray-300 text-gray-900 text-sm rounded-lg p-4"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="bg-gray-50 bg-opacity-40 border border-gray-300 text-gray-900 text-sm rounded-lg p-4"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">
                  CPF
                </label>
                <input
                  type="text"
                  name="cpf"
                  value={user.cpf}
                  onChange={(e) => setUser({ ...user, cpf: e.target.value })}
                  className="bg-gray-50 bg-opacity-40 border border-gray-300 text-gray-900 text-sm rounded-lg p-4"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  className="bg-gray-50 bg-opacity-40 border border-gray-300 text-gray-900 text-sm rounded-lg p-4"
                />
              </div>
              <div className="flex justify-between mt-10">
                <button
                  onClick={() => router.back()}
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
      </div>
      <footer className="bg-gray-700 text-white text-center p-2">
        © 2024 VaxSul. Todos os direitos reservados.
      </footer>
    </div>
  );
}
