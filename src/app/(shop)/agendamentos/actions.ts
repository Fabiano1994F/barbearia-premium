'use server'

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

/**
 * Função utilitária para criar o cliente do Supabase em Server Actions (Next.js 15/16)
 */
async function getSupabaseClient() {
  const cookieStore = await cookies() // No Next.js 16, cookies() é uma Promise

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}

// 1. CRIAR AGENDAMENTO
export async function createBooking(formData: { serviceId: string, date: Date }) {
  const supabase = await getSupabaseClient()
  
  // No @supabase/ssr, usamos getUser() para maior segurança em Server Actions
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Você precisa estar logado para agendar." }
  }

  const { error } = await supabase
    .from('bookings')
    .insert([
      {
        user_id: user.id,
        service_id: formData.serviceId,
        date: formData.date.toISOString(),
        status: 'confirmed'
      }
    ])

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/agendamentos')
  return { success: true }
}

// 2. BUSCAR AGENDAMENTOS DO USUÁRIO
export async function getUserBookings() {
  const supabase = await getSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return []

  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: true })

  if (error) {
    console.error('Erro ao buscar agendamentos:', error.message)
    return []
  }
  
  return data
}

// 3. CANCELAR AGENDAMENTO
export async function cancelBooking(bookingId: string) {
  const supabase = await getSupabaseClient()
  
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId)

  if (error) return { success: false, error: error.message }

  revalidatePath('/agendamentos')
  return { success: true }
}

// 4. BUSCAR HORÁRIOS OCUPADOS (CORREÇÃO DE TIMEZONE)
export async function getBookedSlots(date: string) {
  const supabase = await getSupabaseClient()

  const { data, error } = await supabase
    .from('bookings')
    .select('date')
    .filter('date', 'gte', `${date}T00:00:00`)
    .filter('date', 'lte', `${date}T23:59:59`)

  if (error || !data) return []
  
  return data.map(b => {
    const d = new Date(b.date)
    return d.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit', 
      timeZone: 'UTC' 
    })
  })
}

// 5. CADASTRO DE USUÁRIO
export async function signUp(formData: FormData) {
  const supabase = await getSupabaseClient()
  
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}

// 6. LOGIN DE USUÁRIO
export async function signIn(formData: FormData) {
  const supabase = await getSupabaseClient()
  
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { success: false, error: "E-mail ou senha incorretos." }
  }

  revalidatePath('/')
  return { success: true }
}

// actions.ts
export async function getServices() {
  const supabase = await getSupabaseClient()
  const { data, error } = await supabase
    .from('services')
    .select('id, name, price') // Busca apenas o necessário

  if (error) {
    console.error('Erro ao buscar serviços:', error)
    return []
  }
  return data
}