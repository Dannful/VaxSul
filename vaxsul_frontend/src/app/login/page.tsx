"use client";
import { useLoginMutation } from "@/service/vaxsul";
import { useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { sha256 } from "@/lib/encryption";
import Image from "next/image";
import vaxsulLogo from "../images/vaxsul.jpg";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, result] = useLoginMutation();

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        background: "#1e426f",
        backgroundImage: "linear-gradient(to left, #1e426f 80%, #234a7b)",
        paddingBottom: "20px",
      }}
    >
      <div className="absolute top-4 right-4 flex justify-end items-center w-auto z-10">
        <span className="text-white mr-2">Não tem uma conta?</span>
        <Link href="/register">
          <button className="text-white bg-white bg-opacity-20 hover:bg-opacity-30 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out">
            Cadastrar
          </button>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row flex-grow items-center justify-between mx-4 md:mx-24 mt-12 md:mt-0 space-y-3 md:space-y-0">
        <div className="flex items-center justify-center w-full md:w-1/3 mb-6 md:mb-0 md:order-2 order-1">
          <div className="md:ml-4">
            <div className="flex flex-grow justify-center">
              <Image src={vaxsulLogo} alt="Vaxsul Logo" className="w-64" />
            </div>
          </div>
        </div>
        <div className="hidden md:block absolute inset-y-20 left-1/2 bg-gray-400 w-px opacity-20 transform -translate-x-1/2"></div>
        <div className="w-full md:w-2/5 bg-white bg-opacity-30 p-10 rounded-lg shadow-lg mb-12 md:mb-0 md:order-1 order-2">
          <h2 className="text-2xl font-bold text-gray-200 mb-6 text-center">
            Bem-vindo
          </h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              login({
                email: email,
                password: await sha256(password),
              })
                .unwrap()
                .then((token) => {
                  alert(token);
                });
            }}
            className="grid grid-flow-row gap-3"
          >
            {result.isError && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {getMessageForStatusCode(result.error)}
              </div>
            )}
            <div>
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
                placeholder="exemplo@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
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
            <div className="flex flex-wrap gap-3">
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
              <Link
                href="/forgot-password"
                className="text-sm text-blue-200 hover:underline"
              >
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
    </div>
  );
}

function getMessageForStatusCode(
  error: FetchBaseQueryError | SerializedError
) {
  if (
    "status" in error &&
    typeof (error as FetchBaseQueryError).status === "number" &&
    (error as FetchBaseQueryError).status === 400
  ) {
    return "Usuário ou senha inválida.";
  }
  return "Erro ao processar sua requisição. Por favor, tente novamente mais tarde.";
}
