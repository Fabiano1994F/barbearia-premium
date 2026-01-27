"use client"

import { Button } from "@/components/ui/Button"
import { useRouter } from "next/navigation"
import { Scissors, Calendar, Star } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-black z-0" />
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tighter">
            BARBEARIA <span className="text-primary">PREMIUM</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Estilo, tradição e excelência. Agende seu horário com os melhores profissionais de São Paulo em poucos cliques.
          </p>
          
          <Button 
            size="lg" 
            className="px-10 py-8 text-xl font-bold uppercase tracking-widest hover:scale-105 transition-transform"
            onClick={() => router.push("/login")}
          >
            Agendar Agora
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Scissors className="text-primary w-10 h-10" />}
              title="Cortes Exclusivos"
              description="Do clássico ao moderno, nossos barbeiros dominam todas as técnicas."
            />
            <FeatureCard 
              icon={<Calendar className="text-primary w-10 h-10" />}
              title="Agendamento Online"
              description="Escolha sua data e hora sem precisar ligar. Praticidade total."
            />
            <FeatureCard 
              icon={<Star className="text-primary w-10 h-10" />}
              title="Experiência VIP"
              description="Ambiente climatizado, café premium e atendimento personalizado."
            />
          </div>
        </div>
      </section>

      {/* Footer Corrigido */}
      <footer className="py-10 border-t border-secondary/20 text-center text-gray-500 text-sm">
        <p>© 2026 Barbearia Premium - Desenvolvido por Fabiano.</p>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-3xl border border-secondary/20 bg-secondary/10 hover:border-primary/50 transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  )
}