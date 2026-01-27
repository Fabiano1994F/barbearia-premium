"use client"

import * as React from "react"
import { Suspense } from 'react' // Importação necessária
import { Calendar } from "@/components/ui/Calendar"
import { Button } from "@/components/ui/Button"
import { useSearchParams, useRouter } from "next/navigation"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

const AVAILABLE_HOURS = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

// Criamos um sub-componente para isolar o useSearchParams
function BookingContent() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [selectedHour, setSelectedHour] = React.useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()

  const serviceId = searchParams.get("serviceId")
  const name = searchParams.get("name") 

  const handleConfirmBooking = async () => {
    if (!date || !selectedHour) return;
    setIsSubmitting(true)
    try {
      const dateParam = format(date, "yyyy-MM-dd");
      await new Promise(resolve => setTimeout(resolve, 1500))
      router.push(`/bookings/success?date=${dateParam}&hour=${selectedHour}&name=${encodeURIComponent(name || "")}`);
    } catch (error) {
      console.error(error)
      alert("Erro ao confirmar agendamento.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="container mx-auto py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-2 text-center text-white">Finalizar Agendamento</h1>
      <p className="text-muted-foreground mb-8 text-center italic">
        {name ? `Olá, ${name}! ` : ""}Selecione o melhor dia e horário para o seu serviço.
      </p>

      <div className="flex flex-col md:flex-row gap-8 items-start justify-center w-full">
        <div className="bg-card p-4 border rounded-xl shadow-sm border-secondary text-white">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => { setDate(d); setSelectedHour(null); }}
            className="rounded-md"
          />
        </div>

        {date && (
          <div className="w-full md:w-64 bg-card p-4 border rounded-xl shadow-sm border-secondary">
            <h2 className="text-lg font-semibold mb-4 text-center text-white">
              {format(date, "dd 'de' MMMM", { locale: ptBR })}
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-2 gap-2">
              {AVAILABLE_HOURS.map((hour) => (
                <Button
                  key={hour}
                  variant={(selectedHour === hour ? "default" : "outline") as any}
                  className="w-full"
                  onClick={() => setSelectedHour(hour)}
                >
                  {hour}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {date && selectedHour && (
        <div className="mt-10 w-full max-w-md space-y-4">
          <div className="p-6 bg-secondary/10 rounded-xl border border-secondary/30 text-center">
            <h3 className="font-bold mb-3 text-white">Resumo do Agendamento</h3>
            <div className="text-sm space-y-1 text-gray-400">
              <p>Cliente: <span className="text-white">{name || "Não informado"}</span></p>
              <p>Data: <span className="text-white">{format(date, "PPPP", { locale: ptBR })}</span></p>
              <p>Horário: <span className="text-white">{selectedHour}</span></p>
              <p className="text-xs italic text-gray-500 mt-2">Serviço ID: {serviceId}</p>
            </div>
          </div>

          <Button
            className="w-full py-7 text-lg font-bold uppercase tracking-widest"
            onClick={handleConfirmBooking}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processando..." : "Confirmar Agendamento"}
          </Button>
        </div>
      )}
    </main>
  );
}

// O componente principal apenas envolve o conteúdo no Suspense
export default function BookingPage() {
  return (
    <Suspense fallback={<div className="text-white text-center py-10">Carregando formulário...</div>}>
      <BookingContent />
    </Suspense>
  )
}