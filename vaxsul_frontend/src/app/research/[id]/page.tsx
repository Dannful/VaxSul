"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'next/navigation';
import { useGetVaccineByIdQuery } from '@/service/vaxsul';
import { LoadingWidget } from '../../components/LoadingWidget';
import { ErrorWidget } from '../../components/ErrorWidget';

export default function ResearchDetails() {
  const { id } = useParams();
  const validId = !Array.isArray(id) && id;

  const { data: vaccine, error, isLoading } = useGetVaccineByIdQuery(Number(validId), {
    skip: !validId,
  });

  const [quantity, setQuantity] = useState(1);

  if (!validId) {
    return <p className="text-black">Vacina não encontrada.</p>;
  }

  if (isLoading) return <LoadingWidget />;
  if (error) return <ErrorWidget message="Erro ao carregar os detalhes da vacina." />;
  if (!vaccine) return <p className="text-black">Vacina não encontrada.</p>;

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Math.max(Number(e.target.value), 1), vaccine.amountInStock);
    setQuantity(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Lógica de compra
    console.log(`${quantity} unidades de ${vaccine.name} compradas.`);
  };

  const totalPrice = vaccine.pricePerUnit * quantity;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-700 text-white p-4">
        <h1 className="text-xl font-semibold">Detalhes da Vacina</h1>
      </header>
      <main className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-black">{vaccine.name}</h2>
          <p className="text-lg mb-4 text-black">Descrição: {vaccine.description}</p>
          <p className="text-lg mb-4 text-black">Dose: {vaccine.dose}</p>
          
          {vaccine.sellable && (
            <div className="mt-6">
              <p className="text-lg mb-4 text-black">Quantidade em estoque: {vaccine.amountInStock}</p>
              <p className="text-lg mb-4 text-black">Preço: R$ {vaccine.pricePerUnit}</p>
              <form className="flex items-center space-x-4" onSubmit={handleSubmit}>
                <input
                  type="number"
                  min={1}
                  max={vaccine.amountInStock}
                  value={quantity}
                  onChange={handleQuantityChange}
                  placeholder="Quantidade"
                  className="border rounded px-4 py-2 text-black"
                />
                
                <button
                  type="submit"
                  className="bg-blue-500 text-white text-lg px-6 py-2 rounded hover:bg-blue-700"
                >
                  Comprar
                </button>
              </form>
              <p className="text-lg mt-4 text-black">Total: R$ {totalPrice}</p>
            </div>
          )}
        </div>
      </main>
      <footer className="bg-gray-700 text-white text-center p-4">
        <a href="/vaccine">Voltar ao Catálogo</a>
      </footer>
    </div>
  );
}