"use client";
import Link from "next/link";

export default function Home() {
    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center"
            style={{
                background: "#1e426f",
                backgroundImage: "linear-gradient(to left, #1e426f 80%, #234a7b)",
            }}
        >
            <div className="absolute top-4 right-4 flex justify-end items-center w-auto z-10">
                <Link href="/login">
                    <button className="text-white bg-white bg-opacity-20 hover:bg-opacity-30 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out">
                        Sair
                    </button>
                </Link>
            </div>
            <div className="flex flex-col items-center justify-center bg-white bg-opacity-30 p-10 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-200 mb-6 text-center">
                    Bem-vindo
                </h2>
                <div className="grid grid-flow-row gap-3">
                    <Link href="/catalog">
                        <button className="text-white bg-[#9dca46] bg-opacity-90 hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-3 text-center transition duration-150 ease-in-out transform hover:scale-105">
                            Consultar Catálogo
                        </button>
                    </Link>
                    <Link href="/manage-research">
                        <button className="text-white bg-[#9dca46] bg-opacity-90 hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-3 text-center transition duration-150 ease-in-out transform hover:scale-105">
                            Gerenciar Pesquisas
                        </button>
                    </Link>
                    <Link href="/manage-stock">
                        <button className="text-white bg-[#9dca46] bg-opacity-90 hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-3 text-center transition duration-150 ease-in-out transform hover:scale-105">
                            Gerenciar Estoque
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
