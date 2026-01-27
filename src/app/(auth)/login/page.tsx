"use client"

import * as React from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { useRouter } from "next/navigation"
import { UserCircle } from "lucide-react"

export default function QuickLoginPage() {
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const router = useRouter()

  const handleJoin = async () => {
    if (!firstName || !lastName) {
      alert("Por favor, preencha seu nome e sobrenome.");
      return;
    }

    setIsSubmitting(true);
    try {
      const fullName = `${firstName} ${lastName}`;
      
      await new Promise(resolve => setTimeout(resolve, 800));

      // Usamos encodeURIComponent para proteger o nome na URL
      router.push(`/bookings?name=${encodeURIComponent(fullName)}`); 
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md space-y-8 bg-secondary/10 p-10 rounded-3xl border border-secondary/20 shadow-2xl">
        <div className="text-center">
          <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
            <UserCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Quase lá!</h1>
          <p className="text-gray-400">Como gostaria de ser chamado(a) na barbearia?</p>
        </div>

        <div className="space-y-4">
          <Input 
            placeholder="Nome" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={isSubmitting}
          />
          
          <Input 
            placeholder="Sobrenome" 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={isSubmitting}
          />
          
          <Button 
            className="w-full py-7 text-lg font-bold" 
            onClick={handleJoin}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Entrando..." : "Ir para Agendamento"}
          </Button>
        </div>

        <p className="text-center text-xs text-gray-500">
          Seus dados são usados apenas para identificar seu horário.
        </p>
      </div>
    </main>
  );
}