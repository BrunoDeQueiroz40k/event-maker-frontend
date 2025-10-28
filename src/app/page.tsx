"use client"

import { Calendar } from "@/components/Calendar"
import { EventForm } from "@/components/EventForm"
import { EventList } from "@/components/EventList"
import { Header } from "@/components/Header"
import { useState } from "react"

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showEventForm, setShowEventForm] = useState(false)

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setShowEventForm(true)
  }

  const handleCloseForm = () => {
    setShowEventForm(false)
    setSelectedDate(null)
  }
  
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2 tracking-wider uppercase font-mono">
            {"WARHAMMER 40K EVENT MAKER"}
          </h1>
          <p className="text-muted-foreground font-mono text-sm tracking-wide">
            {"VRCHAT BATTLE COORDINATION SYSTEM // IMPERIUM SANCTIONED"}
          </p>
        </div>

        {!showEventForm ? (
          <div className="flex gap-6 justify-center items-start">
            <EventList />
            <Calendar onDateClick={handleDateClick} />
          </div>
        ) : (
          <EventForm selectedDate={selectedDate} onClose={handleCloseForm} />
        )}
      </main>
    </main>
  );
}
