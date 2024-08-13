"use client";
import { useState } from "react";
import Page from "../components/Page";
import { LoadingWidget } from "../components/LoadingWidget";
import { ErrorWidget } from "../components/ErrorWidget";
import { useMutation, useQuery } from "@apollo/client";
import {
  PURCHASES_BY_UID_QUERY,
  useGetCurrentUserQuery,
  UPDATE_PURCHASE,
} from "@/service/vaxsul";
import { IdPurchaseFragment, PurchaseStatus } from "@/__generated__/graphql";
import { useRouter } from "next/navigation";

export default function MyPurchases() {
  const userQuery = useGetCurrentUserQuery();
  const router = useRouter();

  if (userQuery.isLoading || userQuery.isUninitialized) {
    return <LoadingWidget />;
  }

  if (userQuery.isError || !userQuery.data.id) {
    router.push("/login");
    return <></>;
  }

  return <PurchaseList userId={userQuery.data.id} />;
}

function PurchaseList({ userId }: { userId: number }) {
  const { loading, error, data } = useQuery(PURCHASES_BY_UID_QUERY, {
    variables: { UserId: userId },
  });

  if (loading) {
    return <LoadingWidget />;
  }

  if (error || !data) {
    return <ErrorWidget message="Erro ao carregar as transações." />;
  }

  const orders = data.userPurchases;

  return (
    <Page
      titleBar={
        <div className="flex items-center justify-center w-full">
          <h1 className="text-xl font-semibold text-white">
            Histórico de Transações
          </h1>
        </div>
      }
    >
      <div className="mt-12 mx-4 md:mx-24">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pedido
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vacina
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qtd
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {order.id}
                  </th>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">
                    {order.vaccine?.name}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">
                    R$ {order.totalSpent.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">
                    {PURCHASE_STATUS_TEXT[order.status]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Page>
  );
}

const PURCHASE_STATUS_TEXT: Record<PurchaseStatus, string> = {
  [PurchaseStatus.Approved]: "Aprovado",
  [PurchaseStatus.Rejected]: "Rejeitado",
  [PurchaseStatus.InValidation]: "Em Validação",
  [PurchaseStatus.WaitPayment]: "Aguardando Pagamento",
};
