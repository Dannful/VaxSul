"use client";

import { ErrorWidget } from "@/app/components/ErrorWidget";
import { LoadingWidget } from "@/app/components/LoadingWidget";
import Page from "@/app/components/Page";
import {
  useGetCurrentUserQuery,
  VACCINE_BY_ID,
  UPDATE_VACCINE,
  NEW_PURCHASE,
  DELETE_VACCINE,
  SEARCH_VACCINES,
} from "@/service/vaxsul";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { Vaccine } from "@/types/vaccine";
import { useMutation, useQuery } from "@apollo/client";
import { IdVaccineFragment, PurchaseStatus } from "@/__generated__/graphql";
import { serializeDateTime } from "@/app/util/DateSerializer";

export default function VaccineDetails() {
  const { id } = useParams();
  const router = useRouter();
  const user = useGetCurrentUserQuery();
  const validId = !Array.isArray(id) && id;
  const isSalesManager = user.data?.role === "SALES_MANAGER" ?? false;
  const { loading, error, data } = useQuery(VACCINE_BY_ID, {
    variables: {
      id: Number(id),
    },
  });

  if (loading) return <LoadingWidget />;
  if (error)
    return <ErrorWidget message="Erro ao carregar os detalhes do produto." />;
  if (!data?.vaccine)
    return <p className="text-black">Vacina não encontrada.</p>;
  return (
    <VaccineComponent
      vaccine={data.vaccine}
      isSalesManager={isSalesManager}
      userId={user.data?.id ?? -1}
    />
  );
}

function VaccineComponent({
  vaccine,
  isSalesManager,
  userId,
}: {
  vaccine: IdVaccineFragment;
  isSalesManager: boolean;
  userId: number;
}) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const [updateVaccine] = useMutation(UPDATE_VACCINE, {
    variables: {
      id: vaccine.id,
      vaccine: {
        amountInStock: vaccine.amountInStock,
        description: vaccine.description,
        dose: vaccine.dose,
        name: vaccine.name,
        pricePerUnit: vaccine.pricePerUnit,
        researchId: vaccine.research.id,
      },
    },
    refetchQueries: [SEARCH_VACCINES, VACCINE_BY_ID],
  });
  const [newPurchase] = useMutation(NEW_PURCHASE);
  const [deleteVaccine] = useMutation(DELETE_VACCINE);

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(
      Math.max(Number(e.target.value), 1),
      vaccine.amountInStock,
    );
    setQuantity(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let vaccineResult = await updateVaccine({
      variables: {
        id: vaccine.id,
        vaccine: {
          amountInStock: vaccine.amountInStock - quantity,
          description: vaccine.description,
          dose: vaccine.dose,
          name: vaccine.name,
          pricePerUnit: vaccine.pricePerUnit,
          researchId: vaccine.research.id,
        },
      },
    });
    if (vaccineResult.errors) {
      return;
    }
    let purchaseResult = await newPurchase({
      variables: {
        purchase: {
          vaccineId: vaccine.id ?? -1,
          amount: quantity,
          totalSpent: quantity * vaccine.pricePerUnit,
          timestamp: serializeDateTime(new Date()),
          status: PurchaseStatus.Approved,
          userId: userId,
        },
      },
    });
    if (purchaseResult.errors) {
      return;
    }
    router.push("/vaccine");
  };

  const handleDelete = async () => {
    if (confirm("Tem certeza de que deseja deletar este produto?")) {
      if (vaccine.id != null) {
        let deleteResult = await deleteVaccine({
          variables: { id: vaccine.id },
        });
        if (deleteResult.errors) {
          alert(
            "Erro ao deletar o produto. Por favor, tente novamente mais tarde.",
          );
        } else {
          router.push("/vaccine");
        }
      }
    }
  };

  const totalPrice = vaccine.pricePerUnit * quantity;

  return (
    <Page
      titleBar={
        <div className="flex items-center justify-center w-full">
          <h1 className="text-xl font-semibold text-white">
            Detalhes do produto
          </h1>
        </div>
      }
    >
      <div className="flex justify-center mt-12 mx-4 md:mx-24">
        <div className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-2xl shadow-lg p-8 w-full md:w-3/4 lg:w-1/2 relative">
          <button
            onClick={() => router.push("/vaccine")}
            className="absolute top-4 left-4 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-2 transition duration-300 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 14.293a1 1 0 01-1.414 0L4.293 10.293a1 1 0 010-1.414l4.586-4.586a1 1 0 011.414 1.414L6.414 10l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              {vaccine.name}
            </h2>
            <p className="text-lg text-gray-700 mb-4">{vaccine.description}</p>
            <p className="text-lg text-gray-700">
              Dose: <span className="font-semibold">{vaccine.dose}</span>
            </p>
            <p className="text-lg text-gray-700">
              Laboratório:{" "}
              <span className="font-semibold">
                {vaccine.research.laboratory.name}
              </span>
            </p>
            )
          </div>

          <div className="mt-6">
            <div className="border-t border-gray-300 pt-6 mb-6">
              <div className="flex justify-between text-gray-700 text-lg mb-2">
                <span>Quantidade em estoque:</span>
                <span className="font-semibold">{vaccine.amountInStock}</span>
              </div>
              <div className="flex justify-between text-gray-700 text-lg mb-4">
                <span>Preço:</span>
                <span className="font-semibold">R$ {vaccine.pricePerUnit}</span>
              </div>
            </div>
            {!isSalesManager && (
              <form className="flex flex-col items-end" onSubmit={handleSubmit}>
                <div className="flex items-center mb-4">
                  <input
                    type="number"
                    min={1}
                    max={vaccine.amountInStock}
                    value={quantity}
                    onChange={handleQuantityChange}
                    placeholder="Quantidade"
                    className="border border-gray-300 rounded-lg px-3 py-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mr-2"
                    style={{ width: "100px" }}
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition duration-300"
                  >
                    Comprar
                  </button>
                </div>
                <p className="text-lg text-gray-700">
                  Preço total: R$ {totalPrice.toFixed(2)}
                </p>
              </form>
            )}
            {isSalesManager && (
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white rounded-lg px-4 py-2 mt-4 hover:bg-red-700 transition duration-300"
              >
                Deletar
              </button>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
}
