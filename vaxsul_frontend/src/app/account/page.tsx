"use client";
import { useGetCurrentUserQuery } from "@/service/vaxsul";
import Link from "next/link";
import { LoadingWidget } from "../components/LoadingWidget";
import { ErrorWidget } from "../components/ErrorWidget";
import { useRouter } from "next/navigation";
import Page from "../components/Page";

export default function Account() {
  const currentUserQuery = useGetCurrentUserQuery();
  const router = useRouter();

  if (currentUserQuery.isUninitialized || currentUserQuery.isLoading) {
    return <LoadingWidget />;
  }

  if (currentUserQuery.isError) {
    router.push("/login");
    return <></>;
  }

  const user = currentUserQuery.data;

  return (
    <Page>
      <div className="flex-1 bg-gray-200 relative pb-16 flex justify-center items-start">
        <div className="w-4/5 max-w-lg bg-white bg-opacity-30 p-8 rounded-lg shadow-lg mt-10">
          <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
            Informações do Usuário
          </h2>
          <div className="space-y-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Nome Completo
              </label>
              <div className="bg-gray-50 bg-opacity-40 border border-gray-300 text-gray-900 text-sm rounded-lg p-4">
                {user.name}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <div className="bg-gray-50 bg-opacity-40 border border-gray-300 text-gray-900 text-sm rounded-lg p-4">
                {user.email}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                CPF
              </label>
              <div className="bg-gray-50 bg-opacity-40 border border-gray-300 text-gray-900 text-sm rounded-lg p-4">
                {user.cpf}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Telefone
              </label>
              <div className="bg-gray-50 bg-opacity-40 border border-gray-300 text-gray-900 text-sm rounded-lg p-4">
                {user.phone}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Papel
              </label>
              <div className="bg-gray-50 bg-opacity-40 border border-gray-300 text-gray-900 text-sm rounded-lg p-4">
                {user.role}
              </div>
            </div>
            <div className="flex justify-between mt-10">
              <button
                className="text-white bg-[#4a90e2] bg-opacity-90 hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out transform hover:scale-105"
                onClick={() => router.back()}
              >
                Voltar à tela anterior
              </button>
              <button
                className="text-white bg-[#9dca46] bg-opacity-90 hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out transform hover:scale-105"
                onClick={() => router.push("/edit-account")}
              >
                Editar informações
              </button>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );

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
      </div>
      <footer className="bg-gray-700 text-white text-center p-2">
        © 2024 VaxSul. Todos os direitos reservados.
      </footer>
    </div>
  );
}
