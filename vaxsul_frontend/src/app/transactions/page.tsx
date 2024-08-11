"use client";
import { useState } from "react";
import Page from "../components/Page";
import { LoadingWidget } from "../components/LoadingWidget";
import { ErrorWidget } from "../components/ErrorWidget";

export default function Transactions() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const transactions = [
    { id: 1, vaccineName: "Vacina A", quantity: 10, total: 100.00, status: "Pendente", userName: "Usuário 1", labName: "Laboratório A" },
    { id: 2, vaccineName: "Vacina B", quantity: 5, total: 50.00, status: "Pendente", userName: "Usuário 2", labName: "Laboratório B" },
  ];

  if (isLoading) {
    return <LoadingWidget />;
  }

  if (isError) {
    return <ErrorWidget message="Erro ao carregar as transações." />;
  }

  const handleApprove = () => {
    // Mestre Vini Lorde do backend trate isso pfv

  };

  const handleReject = () => {
    // Mestre Vini Lorde do backend trate isso pfv

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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vacina</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qtd</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Laboratório</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comprador</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.vaccineName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.labName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.userName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    R$ {transaction.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                    <button
                      className="text-green-600 hover:text-green-900 mr-4"
                      onClick={() => handleApprove()}
                    >
                      Aprovar
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleReject()}
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
