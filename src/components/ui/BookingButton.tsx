"use client"

import { Button, type ButtonProps } from "@/components/ui/Button"

import { useRouter, useSearchParams } from "next/navigation"

interface BookingButtonProps extends ButtonProps {
  serviceId: string
}

export function BookingButton({ serviceId, ...props }: BookingButtonProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Pegamos o nome que já está na URL da página atual
  const name = searchParams.get("name")

  const handleBooking = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log("Iniciando agendamento do serviço:", serviceId)
    
    // Se tiver nome, passamos ele adiante. Se não, passamos vazio.
    const nameParam = name ? `&name=${encodeURIComponent(name)}` : ""
    
    router.push(`/bookings?serviceId=${serviceId}${nameParam}`)
  }

  return (
    <Button {...props} onClick={handleBooking}>
      {props.children}
    </Button>
  )
}