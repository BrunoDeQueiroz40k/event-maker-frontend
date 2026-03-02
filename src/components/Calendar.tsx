"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CalendarProps {
  onDateClick: (date: Date) => void
}

export function Calendar({ onDateClick }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const monthNames = [
    "JANEIRO",
    "FEVEREIRO",
    "MARÇO",
    "ABRIL",
    "MAIO",
    "JUNHO",
    "JULHO",
    "AGOSTO",
    "SETEMBRO",
    "OUTUBRO",
    "NOVEMBRO",
    "DEZEMBRO",
  ]

  const dayNames = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"]

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1))
  }

  const isPastDay = (day: number) => {
    const today = new Date()
    if (year < today.getFullYear()) return true
    if (year > today.getFullYear()) return false
    if (month < today.getMonth()) return true
    if (month > today.getMonth()) return false
    return day < today.getDate()
  }

  const handleDayClick = (day: number) => {
    if (isPastDay(day)) return
    const selectedDate = new Date(year, month, day)
    onDateClick(selectedDate)
  }

  return (
    <div className="imperial-border bg-card p-3 w-[700px]">
      <div className="flex items-center justify-between mb-5">
        <Button
          variant="outline"
          size="icon"
          onClick={previousMonth}
          className="border-primary/50 hover:bg-primary/20 hover:border-primary bg-transparent h-6 w-6"
        >
          <ChevronLeft className="h-3 w-3" />
        </Button>
        <h2 className="text-xl font-bold text-primary font-mono tracking-widest">
          {monthNames[month]} {year}
        </h2>
        <Button
          variant="outline"
          size="icon"
          onClick={nextMonth}
          className="border-primary/50 hover:bg-primary/20 hover:border-primary bg-transparent h-6 w-6"
        >
          <ChevronRight className="h-3 w-3" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-[12px] font-bold text-primary/70 font-mono py-0.5">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => {
          const day = daysInPrevMonth - firstDayOfMonth + index + 1
          return (
            <div
              key={`prev-${index}`}
              className="aspect-square border border-border/30 flex items-center justify-center text-muted-foreground/30 font-mono text-[15px]"
            >
              {day}
            </div>
          )
        })}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1
          const past = isPastDay(day)
          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              className={`aspect-square border flex items-center justify-center font-mono text-[15px] transition-all relative overflow-hidden
                ${past
                  ? "border-border/60 bg-muted/30 text-muted-foreground/80 cursor-default"
                  : "border-border hover:border-primary hover:bg-primary/10 text-foreground group"
                }`}
            >
              <span className="relative z-10">{day}</span>
              {!past && (
                <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform" />
              )}
            </button>
          )
        })}
        {Array.from({ length: 42 - daysInMonth - firstDayOfMonth }).map((_, index) => {
          const day = index + 1
          return (
            <div
              key={`next-${index}`}
              className="aspect-square border border-border/30 flex items-center justify-center text-muted-foreground/30 font-mono text-[15px]"
            >
              {day}
            </div>
          )
        })}
      </div>

      <div className="mt-2 p-1.5 bg-muted/30 border border-border">
        <p className="text-[11px] text-muted-foreground font-mono text-center">
          {">> SELECIONE A DATA PARA INICIAR A CRIAÇÃO DO EVENTO <<"}
        </p>
      </div>
    </div>
  )
}
