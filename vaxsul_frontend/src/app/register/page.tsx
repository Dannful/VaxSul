"use client";
import { sha256 } from "@/lib/encryption";
import { useRegisterMutation } from "@/service/vaxsul";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");

  const [register, result] = useRegisterMutation();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem. Por favor, verifique.");
      return;
    }

    const registerResult = await register({
      password: await sha256(password),
      name: fullName,
      email: email,
      cpf: cpf,
      birthdate: birthdate,
      phone: phone,
      role: "USER",
    });

    if (registerResult.error) {
      console.error("Erro ao registrar: ", registerResult.error);
    } else {
      router.push("/login");
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setCpf("");
      setBirthdate("");
      setPhone("");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        background:
          "linear-gradient(to bottom, rgba(30, 66, 111, 0.9), rgba(30, 66, 111, 0.5))",
      }}
    >
      <div className="absolute top-0 right-0 p-5 flex items-center">
        <span className="text-white mr-2">Já possui uma conta?</span>
        <Link href="/login">
          <button className="text-white bg-white bg-opacity-20 hover:bg-opacity-30 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out">
            Entrar
          </button>
        </Link>
      </div>
      <div className="w-4/5 max-w-lg bg-white bg-opacity-30 p-6 rounded-lg shadow-lg mt-20 mb-20">
        <h2 className="text-2xl font-bold text-gray-200 mb-6 text-center">
          Cadastro
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {result.isError && (
            <div
              className="p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {getMessageForStatusCode(result.error)}
            </div>
          )}
          <div className="flex flex-col">
            <label
              htmlFor="fullName"
              className="text-sm font-medium text-gray-200 mb-1"
            >
              Nome Completo
            </label>
            <input
              type="text"
              id="fullName"
              className="bg-gray-50 bg-opacity-40 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 placeholder-gray-500"
              placeholder="Nome completo"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-200 mb-1"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 bg-opacity-40 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w/full p-3 placeholder-gray-500"
              placeholder="example@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="cpf"
              className="text-sm font-medium text-gray-200 mb-1"
            >
              CPF
            </label>
            <input
              type="text"
              id="cpf"
              className="bg-gray-50 bg-opacity-40 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 placeholder-gray-500"
              placeholder="CPF"
              required
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="birthdate"
              className="text-sm font-medium text-gray-200 mb-1"
            >
              Data de Nascimento
            </label>
            <input
              type="date"
              id="birthdate"
              className="bg-gray-50 bg-opacity-40 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w/full p-3 placeholder-gray-500"
              required
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-gray-200 mb-1"
            >
              Telefone
            </label>
            <input
              type="text"
              id="phone"
              className="bg-gray-50 bg-opacity-40 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w/full p-3 placeholder-gray-500"
              placeholder="Telefone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-200 mb-1"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 bg-opacity-40 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w/full p-3 placeholder-gray-500"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-200 mb-1"
            >
              Confirme a Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="bg-gray-50 bg-opacity-40 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w/full p-3 placeholder-gray-500"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="text-white bg-[#9dca46] bg-opacity-90 hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-3 text-center transition duration-150 ease-in-out transform hover:scale-105"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

function getMessageForStatusCode(error: FetchBaseQueryError | SerializedError) {
  if (
    "status" in error &&
    typeof error.status === "number" &&
    error.status === 400
  ) {
    return "Usuário já existente. Por favor, utilize algo diferente.";
  }
  return "Erro ao processar sua requisição. Por favor, tente novamente mais tarde.";
}
