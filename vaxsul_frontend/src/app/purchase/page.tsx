"use client";
import { useState, useEffect } from "react";
import {
  useLogoutMutation,
  useGetAllResearchQuery,
  useGetPurchasesQuery,
  useGetCurrentUserQuery,
} from "@/service/vaxsul";
import { LoadingWidget } from "../components/LoadingWidget";
import { ErrorWidget } from "../components/ErrorWidget";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Page from "../components/Page";

export default function ResearchCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [accountMenuVisible, setAccountMenuVisible] = useState(false);
  const [logout, logoutResult] = useLogoutMutation();
  const router = useRouter();
  const getCurrentUser = useGetCurrentUserQuery();

  if (getCurrentUser.isUninitialized || getCurrentUser.isLoading) {
    return <LoadingWidget />;
  }

  if (getCurrentUser.isError || !getCurrentUser.data.id) {
    router.push("/login");
    return <></>;
  }

  const titleBar = (
    <>
      <div className="flex items-center justify-center w-full">Compras</div>
    </>
  );

  return (
    <Page titleBar={titleBar}>
      <PurchaseList userId={getCurrentUser.data.id} />
    </Page>
  );
}

function PurchaseList({ userId }: { userId: number }) {
  const purchasesQuery = useGetPurchasesQuery(userId);

  if (purchasesQuery.isUninitialized || purchasesQuery.isLoading) {
    return <LoadingWidget />;
  }

  if (purchasesQuery.isError) {
    return (
      <ErrorWidget message="Erro ao carregar suas compras. Por favor, tente novamente mais tarde ou contate o dev lixo que fez essa página." />
    );
  }

  const purchases = purchasesQuery.data;

  return (
    <div className="flex flex-col items-center mx-4 md:mx-24 mt-12 space-y-6">
      <ul className="flex w-full h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {purchases.map((purchase) => (
            <div
              key={purchase.id}
              className="bg-white bg-opacity-30 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out"
            >
              <div className="p-6">
                <h3 className="text-lg text-blue-500 font-semibold pb-2">
                  R${" "}
                  {purchase.totalSpent.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Código: {purchase.id}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
                    </svg>
                    <span className="text-sm text-gray-500">
                      {/* HACK: adding "Z" to an ISO date time string enforces that it is in UTC time */}
                      {new Date(purchase.timestamp + "Z").toLocaleString(
                        "pt-BR",
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
}
