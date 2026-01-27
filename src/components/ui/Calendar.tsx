"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"
import { ptBR } from "date-fns/locale"
import "react-day-picker/dist/style.css"

// Você pode customizar as classes CSS aqui depois
export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      locale={ptBR}
      showOutsideDays={showOutsideDays}
      className={className}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }