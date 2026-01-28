"use client"

import { Suspense, useEffect, useState } from "react"
import { Button } from "@/components/ui/Button"
import { CheckCircle2, Calendar, Clock } from "lucide-react" 
import { useRouter, useSearchParams } from "next/navigation"
import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"

// Componente que lida estritamente com os parâmetros da URL
function SuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [params, setParams] = useState({ name: "", date: "", hour: "" })

  useEffect(() => {
    // Definimos os parâmetros apenas após a montagem no cliente
    setParams({
      name: searchParams.get("name") || "Cliente",
      date: searchParams.get("date") || "",
      hour: searchParams.get("hour") || ""
    })
  }, [searchParams])

  const formattedDate = params.date 
    ? format(parseISO(params.date), "EEEE, dd 'de' MMMM", { locale: ptBR })
    : ""

  return (
    <main className="container mx-auto py-20 px-4 flex flex-col items-center justify-center min-h-[80vh] text-center">
      <div className="bg-primary/20 p-6 rounded-full mb-6 animate-in zoom-in duration-500">
        <CheckCircle2 className="w-20 h-20 text-primary" color="green"/>
      </div>
      
      <h1 className="text-4xl font-bold mb-2 text-white">
        Tudo pronto, <span className="text-primary">{params.name}</span>!
      </h1>
      <p className="text-muted-foreground mb-8">
        Seu agendamento na Barbearia Premium foi confirmado com sucesso.
      </p>
      
      <div className="bg-secondary/10 border border-secondary/30 p-8 rounded-2xl mb-10 w-full max-w-sm space-y-4 shadow-lg">
        <div className="flex items-center justify-center gap-3 text-white text-lg font-medium">
          <Calendar className="w-5 h-5 text-primary" />
          <span className="capitalize">{formattedDate}</span>
        </div>
        <div className="flex items-center justify-center gap-3 text-white text-lg font-medium border-t border-secondary/20 pt-4">
          <Clock className="w-5 h-5 text-primary" />
          <span>às {params.hour}</span>
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

export default function SuccessPage() {
  return (
    // O fallback é o que aparece enquanto o Next processa a página
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Carregando...</div>}>
      <SuccessContent />
    </Suspense>
  )
}