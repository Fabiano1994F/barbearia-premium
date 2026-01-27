'use client'

import { useState, useEffect } from 'react'
import { createBooking, getBookedSlots, getServices } from '../actions'
import { useSearchParams, useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

// ... outros imports
import { Calendar } from "@/components/ui/Calendar" // ou @/components/ui/Calendar se o alias estiver OK
import TimeSelector from "@/components/ui/TimeSelector"

interface Service {
  id: string
  name: string
  price: string
}

export default function BookingForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const urlServiceId = searchParams.get('serviceId')

  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  // 1. Carrega os serviços do banco de dados
  useEffect(() => {
    async function loadData() {
      const data = await getServices()
      setServices(data)
      if (urlServiceId) {
        setSelectedService(urlServiceId)
      } else if (data.length > 0) {
        setSelectedService(data[0].id)
      }
    }
    loadData()
  }, [urlServiceId])

  // 2. Busca horários já ocupados para a data selecionada
  useEffect(() => {
    if (selectedDate) {
      const dateString = format(selectedDate, 'yyyy-MM-dd')
      getBookedSlots(dateString).then(setBookedSlots)
      setSelectedTime(null) 
    }
  }, [selectedDate])

  const handleConfirm = async () => {
    if (!selectedTime || !selectedService || !selectedDate) {
      alert("Por favor, selecione um serviço, data e horário.")
      return
    }

    setLoading(true)
    try {
      const [hours, minutes] = selectedTime.split(':')
      const finalDate = new Date(selectedDate)
      finalDate.setHours(parseInt(hours), parseInt(minutes), 0, 0)

      const result = await createBooking({
        serviceId: selectedService,
        date: finalDate
      })

      if (result.success) {
        const dateFormatted = format(selectedDate, "dd 'de' MMMM", { locale: ptBR })
        router.push(`/bookings/success?date=${dateFormatted}&time=${selectedTime}`)
      } else {
        alert("Erro ao agendar: " + result.error)
      }
    } catch (err) {
      alert("Ocorreu um erro inesperado.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-10">
      {/* 1. Escolha o Serviço */}
      <div>
        <h2 className="text-white text-xl mb-4 font-semibold">1. Escolha o Serviço</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
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
      </div>

      {/* 2 e 3. Calendário e Horários */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
          <h2 className="text-white font-semibold mb-4 text-center">2. Selecione o Dia</h2>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            locale={ptBR}
            className="rounded-md border border-zinc-800 bg-zinc-950 text-white"
          />
        </div>

        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
          <h2 className="text-white font-semibold mb-4 text-center">3. Escolha o Horário</h2>
          <TimeSelector 
            bookedSlots={bookedSlots} 
            selected={selectedTime} 
            onSelect={setSelectedTime} 
          />
        </div>
      </div>

      {/* Resumo e Botão */}
      <div className="pt-8 border-t border-zinc-800">
        <div className="bg-zinc-950/50 p-6 rounded-xl mb-6 border border-zinc-800 text-center">
          <h3 className="text-white font-bold text-lg uppercase mb-2">Resumo do Agendamento</h3>
          <p className="text-zinc-400">
            {selectedDate ? format(selectedDate, "eeee, dd 'de' MMMM", { locale: ptBR }) : '---'} às {selectedTime || '---'}
          </p>
        </div>

        <button 
          onClick={handleConfirm}
          disabled={loading || !selectedTime}
          className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:opacity-30 p-5 rounded-xl text-white font-bold text-lg transition-all"
        >
          {loading ? 'Confirmando...' : 'Confirmar Agendamento'}
        </button>
      </div>
    </section>
  )
}