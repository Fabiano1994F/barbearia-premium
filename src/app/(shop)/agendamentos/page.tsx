"use client";

import BookingList from './components/BookingList'
import BookingForm from './components/BookingForm'
import { Suspense } from 'react'

export default function AgendamentoPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 min-h-screen bg-zinc-950">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">Barbearia Premium</h1>
        <p className="text-zinc-400">Reserve seu horário com os melhores</p>
      </header>

      {/* O Suspense aqui é essencial porque o BookingForm usa useSearchParams */}
      <Suspense fallback={<p className="text-zinc-500 text-center">Carregando formulário...</p>}>
        <BookingForm />
      </Suspense>

      <div className="mt-12">
        <h2 className="text-xl font-semibold text-white mb-4">Seus Agendamentos</h2>
        <Suspense fallback={<p className="text-zinc-500">Carregando seus horários...</p>}>
          <BookingList />
        </Suspense>
      </div>
    </div>
  )
}