"use client";
import { useState, useEffect } from "react";
import {
  useLogoutMutation,
  useSearchVaccineMutation,
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

  return (
    <Page titleBar={"Compras"}>
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
}
