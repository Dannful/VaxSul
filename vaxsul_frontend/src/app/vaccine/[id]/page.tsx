"use client";

import { useParams } from 'next/navigation';
import { useGetVaccineByIdQuery } from '@/service/vaxsul';
import { LoadingWidget } from '../../components/LoadingWidget';
import { ErrorWidget } from '../../components/ErrorWidget';

export default function VaccineDetails() {
  const { id } = useParams();
  const validId = !Array.isArray(id) && id;

  const { data: vaccine, error, isLoading } = useGetVaccineByIdQuery(Number(validId), {
    skip: !validId,
  });

  if (!validId) {
    return <p className="text-black">Vacina não encontrada.</p>;
  }

  if (isLoading) return <LoadingWidget />;
  if (error) return <ErrorWidget message="Erro ao carregar os detalhes da vacina." />;
  if (!vaccine) return <p className="text-black">Vacina não encontrada.</p>;

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
        </div>
      </main>
      <footer className="bg-gray-700 text-white text-center p-4">
        <a href="/vaccine">Voltar ao Catálogo</a>
      </footer>
    </div>
  );
}