'use client'

import { useState } from 'react'
import { createBooking } from '../actions'

// Lista de serviços da sua barbearia
const SERVICES = [
  { id: 'corte-cabelo', name: 'Corte de Cabelo', price: 'R$ 50,00' },
  { id: 'barba', name: 'Barba Completa', price: 'R$ 35,00' },
  { id: 'combo-premium', name: 'Combo (Cabelo + Barba)', price: 'R$ 75,00' },
  { id: 'sobrancelha', name: 'Sobrancelha', price: 'R$ 15,00' },
]

export default function BookingForm() {
  const [selectedService, setSelectedService] = useState(SERVICES[0].id)
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    setLoading(true)
    
    // Pegamos o nome do serviço baseado no ID selecionado
    const serviceName = SERVICES.find(s => s.id === selectedService)?.name || 'Serviço'

    const bookingData = {
      serviceId: serviceName,
      date: new Date() // No futuro, você pode adicionar um seletor de calendário aqui
    }

    const result = await createBooking(bookingData)

    if (result.success) {
      alert("Agendamento para " + serviceName + " realizado!")
    } else {
      alert("Erro ao agendar: " + result.error)
    }
    
    setLoading(false)
  }

  return (
    <section className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 mb-10">
      <h2 className="text-white text-xl mb-6 font-semibold">1. Escolha o Serviço</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {SERVICES.map((service) => (
          <button
            key={service.id}
            onClick={() => setSelectedService(service.id)}
            className={`flex flex-col p-4 rounded-xl border-2 text-left transition-all ${
              selectedService === service.id
                ? 'border-yellow-600 bg-yellow-600/10'
                : 'border-zinc-800 bg-zinc-800/50 hover:border-zinc-700'
            }`}
          >
            <span className={`font-bold ${selectedService === service.id ? 'text-yellow-500' : 'text-white'}`}>
              {service.name}
            </span>
            <span className="text-zinc-400 text-sm">{service.price}</span>
          </button>
        ))}
      </div>
       <button 
        onClick={handleConfirm}
        disabled={loading}
        className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 px-6 py-4 rounded-xl text-white font-bold text-lg shadow-lg shadow-yellow-900/20 transition-all active:scale-[0.98]"
      >
        {loading ? 'Processando...' : 'Confirmar Agendamento'}
      </button>
    </section>
  )
}