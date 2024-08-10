"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "./Footer";

export default function Page({
  titleBar,
  children,
}: {
  titleBar: React.ReactNode;
  children: React.ReactNode;
}) {
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [accountMenuVisible, setAccountMenuVisible] = useState(false);
  const toggleAccountMenu = () => {
    setAccountMenuVisible(!accountMenuVisible);
  };
  const router = useRouter();

  const toggleFilterMenu = () => {
    setFilterMenuVisible(!filterMenuVisible);
  };
  return (
    <div
      className="flex flex-col min-h-screen"
      onClick={() => setAccountMenuVisible(false)}
    >
      <div className="flex flex-1 ">
        <aside className="bg-gray-800 text-white w-32 flex flex-col items-center overflow-auto">
          <div className="p-2 flex items-center justify-center w-full">
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
            {titleBar}

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
                          Perfil
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
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
