"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Loader2 } from "lucide-react"
import { createAppointment } from "@/actions/create-appointment"
import { useToast } from "@/components/ui/use-toast" // Verifique se criou o arquivo!

interface ConfirmButtonProps {
  userId: string;
  serviceId: string;
  selectedDate: Date | undefined;
}

export function ConfirmButton({ userId, serviceId, selectedDate }: ConfirmButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleConfirm = async () => {
    if (!selectedDate) {
      return toast({
        variant: "destructive",
        title: "Atenção",
        description: "Por favor, selecione uma data e horário.",
      })
    }

    setIsLoading(true)

    try {
      await createAppointment({ userId, serviceId, date: selectedDate })
      
      toast({
        title: "Sucesso!",
        description: "Reserva realizada com sucesso!",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Ocorreu um erro ao reservar. Tente novamente.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      className="w-full" 
      onClick={handleConfirm} 
      disabled={!selectedDate || isLoading}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Confirmar Agendamento
    </Button>
  )
}