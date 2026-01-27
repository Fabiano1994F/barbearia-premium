import { getServices } from "@/services/actions"
import { Button } from "@/components/ui/Button"

export default async function HomePage() {
  const services = await getServices()

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Nossos Serviços</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.length === 0 ? (
          <p className="text-muted-foreground">Nenhum serviço encontrado no momento.</p>
        ) : (
          services.map((service) => (
            <div 
              key={service.id} 
              className="p-6 border rounded-xl shadow-sm bg-card flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {service.description}
                </p>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold text-lg">
                  R$ {service.price.toFixed(2)}
                </span>
                <Button>Agendar</Button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  )
}