"use client"

import { Button } from "@/components/ui/Button"
import { CheckCircle2, Calendar, Clock } from "lucide-react" 
import { useRouter, useSearchParams } from "next/navigation"
import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function SuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // 1. CAPTURAMOS O NOME, DATA E HORA DA URL
  const name = searchParams.get("name")
  const date = searchParams.get("date")
  const hour = searchParams.get("hour")

  const formattedDate = date 
    ? format(parseISO(date), "EEEE, dd 'de' MMMM", { locale: ptBR })
    : ""

  return (
    <main className="container mx-auto py-20 px-4 flex flex-col items-center justify-center min-h-[80vh] text-center">
      <div className="bg-primary/20 p-6 rounded-full mb-6 animate-in zoom-in duration-500">
        {/* Ajustado para usar a cor do tema primary definida no seu Tailwind */}
        <CheckCircle2 className="w-20 h-20 text-primary" color="green"/>
      </div>
      
      {/* 2. EXIBIÇÃO DO NOME PERSONALIZADO */}
      <h1 className="text-4xl font-bold mb-2 text-white">
        Tudo pronto, <span className="text-primary">{name || "Cliente"}</span>!
      </h1>
      <p className="text-muted-foreground mb-8">
        Seu agendamento na Barbearia Premium foi confirmado com sucesso.
      </p>
      
      {/* Card de Detalhes com as informações anexadas */}
      <div className="bg-secondary/10 border border-secondary/30 p-8 rounded-2xl mb-10 w-full max-w-sm space-y-4 shadow-lg">
        <div className="flex items-center justify-center gap-3 text-white text-lg font-medium">
          <Calendar className="w-5 h-5 text-primary" />
          <span className="capitalize">{formattedDate}</span>
        </div>
        <div className="flex items-center justify-center gap-3 text-white text-lg font-medium border-t border-secondary/20 pt-4">
          <Clock className="w-5 h-5 text-primary" />
          <span>às {hour}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-none justify-center">
        <Button onClick={() => router.push("/")} variant="outline" className="sm:w-48 py-6">
          Voltar para Início
        </Button>
        
      </div>
    </main>
  )
}