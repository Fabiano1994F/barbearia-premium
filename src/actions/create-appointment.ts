"use server"

import { supabase }    from "@/lib/supabase" // Sua instância do Supabase
import { revalidatePath } from "next/cache"

export async function createAppointment(formData: {
  userId: string;
  serviceId: string;
  date: Date;
}) {
  const { data, error } = await supabase
    .from("appointments")
    .insert([
      {
        user_id: formData.userId,
        service_id: formData.serviceId,
        date: formData.date.toISOString(),
        status: "confirmed",
      },
    ])

  if (error) {
    throw new Error("Erro ao criar agendamento")
  }

  revalidatePath("/bookings") // Atualiza a página de reservas do usuário
  return data
}