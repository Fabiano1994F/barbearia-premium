"use server"

import { db } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createBooking(data: {
  date: Date
  hour: string
  serviceId: string
  userId: string
}) {
  try {
    await db.appointment.create({
      data: {
        appointment_date: data.date,
        appointment_time: data.hour,
        service_id: data.serviceId,
        user_id: data.userId,
      },
    })

    revalidatePath("/bookings")

    return { success: true }
  } catch (error) {
    console.error("Erro ao criar agendamento:", error)
    return { success: false }
  }
}
