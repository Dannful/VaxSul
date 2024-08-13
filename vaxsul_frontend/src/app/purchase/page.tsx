"use client";
import { useState } from "react";
import Page from "../components/Page";
import { LoadingWidget } from "../components/LoadingWidget";
import { ErrorWidget } from "../components/ErrorWidget";
import { useMutation, useQuery } from "@apollo/client";
import { PURCHASES_QUERY, PURCHASES_BY_UID_QUERY, useGetCurrentUserQuery, UPDATE_PURCHASE } from "@/service/vaxsul";
import { IdPurchase, IdPurchaseFragment, Purchase, PurchaseStatus } from "@/__generated__/graphql";

export default function Transactions() {
  const user = useGetCurrentUserQuery();
  const [updatePurchase] = useMutation(UPDATE_PURCHASE, {
    refetchQueries: [PURCHASES_QUERY],
  });
  

  const { loading, error, data } = useQuery(PURCHASES_QUERY);

  if (loading) {
    return <LoadingWidget />;
  }

  if (error || !data?.purchases) {
    return <ErrorWidget message="Erro ao carregar as transações." />;
  }

  if (user.data?.role != "SALES_MANAGER") {
    return <ErrorWidget message="Você não tem permissão para ver esta página." />;
  }

  const transactions = data.purchases;

  const handleApprove = (purchase: IdPurchaseFragment) => {
    updatePurchase({
      variables: {
        id: purchase.id,
        purchase: { 
          amount: purchase.amount,
          totalSpent: purchase.totalSpent,
          userId: purchase.user.id,
          vaccineId: purchase.vaccine.id,
          status: PurchaseStatus.Approved,
        },
      },
    });
  };

  const handleReject = (purchase: IdPurchaseFragment) => {
    updatePurchase({
      variables: {
        id: purchase.id,
        purchase: { 
          amount: purchase.amount,
          totalSpent: purchase.totalSpent,
          userId: purchase.user.id,
          vaccineId: purchase.vaccine.id,
          status: PurchaseStatus.Rejected,
        },
      },
    });
  };

  return (
    <Page
      titleBar={
        <div className="flex items-center justify-center w-full">
          <h1 className="text-xl font-semibold text-white">Aprovação de Transações</h1>
        </div>
      }
    >
      <div className="mt-12 mx-4 md:mx-24">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Pedido</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Vacina</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Qtd</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Comprador</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">{transaction.id}</th>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">{transaction.vaccine?.name}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">{transaction.amount}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">{transaction.user?.name}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">R$ {transaction.totalSpent.toFixed(2)}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">{PURCHASE_STATUS_TEXT[transaction.status]}</td>
                  <td className="px-6 py-4 text-center text-sm font-medium">
                    <button
                      className="text-green-600 hover:text-green-900 mr-4"
                      onClick={() => handleApprove(transaction)}
                    >
                      Aprovar
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleReject(transaction)}
                    >
                      Rejeitar
                    </button>
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

const PURCHASE_STATUS_TEXT: Record<PurchaseStatus, string>= {
  [PurchaseStatus.Approved]: "Aprovado",
  [PurchaseStatus.Rejected]: "Rejeitado",
  [PurchaseStatus.InValidation]: "Em Validação",
  [PurchaseStatus.WaitPayment]: "Aguardando Pagamento",
}