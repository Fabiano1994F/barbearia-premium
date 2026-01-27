'use server'

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

// Interface para garantir a tipagem correta no Front-end
export interface Service {
  id: string
  name: string
  description: string | null
  price: number
  duration_minutes: number
}

// Função utilitária para criar o cliente do Supabase compatível com Next.js 16
async function getSupabaseClient() {
  const cookieStore = await cookies()

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

export async function getServices(): Promise<Service[]> {
  try {
    const supabase = await getSupabaseClient()
    
    // Forçamos a busca das colunas exatamente como estão na sua imagem do Table Editor
    const { data, error, status } = await supabase
      .from('services')
      .select('id, name, description, price, duration_minutes')

    if (error) {
      // Isso vai nos mostrar o erro real no terminal do VS Code
      console.error('Erro Supabase:', {
        message: error.message,
        details: error.details,
        status: status
      })
      return []
    }

    if (!data || data.length === 0) {
      console.log('Aviso: Conectou ao banco, mas a tabela services está vazia.')
      return []
    }

    console.log('Serviços encontrados com sucesso:', data.length)
    return data as Service[]
  } catch (err) {
    console.error('Erro crítico na Action:', err)
    return []
  }
}

// 2. CRIAR AGENDAMENTO (Corrigido para usar a tabela 'appointments' do seu SQL)
export async function createBooking(formData: { 
  serviceId: string; 
  date: string; // Formato YYYY-MM-DD
  time: string; // Formato HH:mm
}) {
  const supabase = await getSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Você precisa estar logado para agendar.")
  }

  const { error } = await supabase
    .from('appointments') // Nome exato da tabela no seu SQL
    .insert([
      { 
        user_id: user.id,
        service_id: formData.serviceId, 
        appointment_date: formData.date,
        appointment_time: formData.time,
        status: 'pending'
      }
    ])

  if (error) {
    console.error('Erro ao salvar agendamento:', error.message)
    throw new Error("Erro ao confirmar agendamento")
  }

  revalidatePath('/agendamentos')
  return { success: true }
}