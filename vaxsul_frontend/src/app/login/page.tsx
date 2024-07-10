"use client";
import { useLoginMutation } from "@/service/vaxsul";
import { useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { sha256 } from "@/lib/encryption";
import Image from 'next/image';
import vaxsulLogo from '../images/vaxsul.jpg';
import Link from 'next/link';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, result] = useLoginMutation();

  return (
    <div className="min-h-screen flex flex-col relative" style={{ background: "#1e426f", backgroundImage: "linear-gradient(to right, #1e426f 50%, #33639e)" }}>
      <div className="flex justify-end p-4 items-center">
        <span className="text-white mr-2">Não tem uma conta?</span>
        <Link href="/register">
          <button
            className="text-white bg-white bg-opacity-20 hover:bg-opacity-30 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out"
          >
            Cadastrar
          </button>
        </Link>
      </div>
      <div className="flex flex-grow items-center justify-between mx-24">
        <div className="flex items-center justify-start w-1/3">
          <Image src={vaxsulLogo} alt="Vaxsul Logo" width={300} height={300} className="object-contain" />
        </div>
        <div className="absolute inset-y-20 left-1/2 bg-gray-400 w-px opacity-20 transform -translate-x-1/2"></div> {}
        <div className="w-2/5 bg-white bg-opacity-30 p-10 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-200 mb-6 text-center">Bem-vindo</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              login({
                username: username,
                password: await sha256(password),
              })
                .unwrap()
                .then((token) => {
                  alert(token);
                });
            }}
          >
            {result.isError && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {getMessageForStatusCode(result.error)}
              </div>
            )}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-200"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 bg-opacity-40 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 placeholder-gray-500"
                placeholder="example@email.com"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-200"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 bg-opacity-40 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 bg-opacity-40 focus:ring-3 focus:ring-blue-300"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm font-medium text-gray-200"
                >
                  Lembrar-me
                </label>
              </div>
              <Link href="/forgot-password" className="text-sm text-blue-200 hover:underline">
                Esqueceu a senha?
              </Link>
            </div>
            <button
              type="submit"
              className="text-white bg-[#9dca46] bg-opacity-90 hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-3 text-center transition duration-150 ease-in-out transform hover:scale-105"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
      <div className="absolute inset-y-20 left-1/2 bg-gray-400 w-px opacity-40 transform -translate-x-1/2"></div> { }
    </div>
  );
}

function getMessageForStatusCode(error: FetchBaseQueryError | SerializedError) {
  if (
    "status" in error &&
    typeof (error as FetchBaseQueryError).status === "number" &&
    ((error as FetchBaseQueryError).status as number) == 400
  ) {
    return "Usuário ou senha inválida.";
  }
  return "Erro ao processar sua requisição. Por favor, tente novamente mais tarde.";
}
