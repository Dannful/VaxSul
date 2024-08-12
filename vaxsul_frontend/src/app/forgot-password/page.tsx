"use client";
import { useState } from "react";
import Image from "next/image";
import vaxsulLogo from "../images/vaxsul.jpg";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [codeVerified, setCodeVerified] = useState(false);
  const router = useRouter();

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para enviar o código ao email
    setCodeSent(true);
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para verificar o código
    setCodeVerified(true);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para redefinir a senha
    router.push("/login");
  };

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
        <span className="text-white mr-2">Lembrou sua senha?</span>
        <Link href="/login">
          <button className="text-white bg-white bg-opacity-20 hover:bg-opacity-30 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out">
            Login
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
            Recuperar Senha
          </h2>
          <form
            onSubmit={codeSent ? (codeVerified ? handleResetPassword : handleVerifyCode) : handleSendCode}
            className="grid grid-flow-row gap-3"
          >
            {!codeSent && (
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
            )}
            {codeSent && !codeVerified && (
              <div>
                <label
                  htmlFor="verificationCode"
                  className="block mb-2 text-sm font-medium text-gray-200"
                >
                  Código de Verificação
                </label>
                <input
                  type="text"
                  id="verificationCode"
                  className="bg-gray-50 bg-opacity-40 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 placeholder-gray-500"
                  placeholder="Digite o código enviado ao seu email"
                  required
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </div>
            )}
            {codeVerified && (
              <div>
                <label
                  htmlFor="newPassword"
                  className="block mb-2 text-sm font-medium text-gray-200"
                >
                  Nova Senha
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="bg-gray-50 bg-opacity-40 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            )}
            <button
              type="submit"
              className="text-white bg-[#9dca46] bg-opacity-90 hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-3 text-center transition duration-150 ease-in-out transform hover:scale-105"
            >
              {codeSent ? (codeVerified ? "Redefinir Senha" : "Verificar Código") : "Enviar Código"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
