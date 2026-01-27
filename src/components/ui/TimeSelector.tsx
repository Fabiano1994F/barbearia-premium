'use client'

interface TimeSelectorProps {
  selected: string | null
  onSelect: (time: string) => void
  bookedSlots: string[] // Horários vindo do Supabase
}

export default function TimeSelector({ selected, onSelect, bookedSlots }: TimeSelectorProps) {
  // Lista de horários de funcionamento da sua barbearia
  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", 
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"
  ]

  return (
    <div className="grid grid-cols-3 gap-3">
      {timeSlots.map((time) => {
        const isBooked = bookedSlots.includes(time)
        const isSelected = selected === time

        return (
          <button
            key={time}
            type="button"
            disabled={isBooked}
            onClick={() => onSelect(time)}
            className={`py-3 rounded-lg font-medium transition-all border-2 ${
              isSelected 
                ? 'bg-yellow-600 border-yellow-600 text-white' 
                : isBooked
                ? 'bg-zinc-800 border-zinc-800 text-zinc-600 cursor-not-allowed opacity-50'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-yellow-600/50'
            }`}
          >
            {time}
            {isBooked && <span className="block text-[10px] uppercase font-bold text-zinc-500">Ocupado</span>}
          </button>
        )
      })}
    </div>
  )
}