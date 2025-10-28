"use client"

import { useEvents } from "@/hooks/useEvents"
import { Button } from "@/components/ui/button"
import { Trash2, Calendar, Clock, Users, MapPin, User } from "lucide-react"

export function EventList() {
  const { events, deleteEvent, getTodayEvents, getUpcomingEvents, getNextEvent } = useEvents()
  
  const todayEvents = getTodayEvents()
  const upcomingEvents = getUpcomingEvents()
  const nextEvent = getNextEvent()

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    })
  }

  const getDaysUntilEvent = (eventDate: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const event = new Date(eventDate)
    event.setHours(0, 0, 0, 0)
    
    const diffTime = event.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return "Hoje"
    if (diffDays === 1) return "Amanhã"
    if (diffDays < 7) return `Em ${diffDays} dias`
    return `Em ${Math.ceil(diffDays / 7)} semanas`
  }

  return (
    <div className="imperial-border bg-card p-4 w-100">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-primary font-mono tracking-wider uppercase">
          {"LISTA DE EVENTOS"}
        </h2>
        <p className="text-xs text-muted-foreground font-mono mt-1">
          {"STATUS: "}{events.length} {"EVENTOS REGISTRADOS"}
        </p>
      </div>

      <div className="space-y-4">
        {/* Próximo Evento */}
        {nextEvent && (
          <div className="p-3 bg-primary/10 border border-primary/30">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-bold text-primary font-mono uppercase">
                {"PRÓXIMO EVENTO"}
              </h3>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-mono text-foreground font-bold">{nextEvent.title}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                <Calendar className="h-3 w-3" />
                {formatDate(nextEvent.date)} - {getDaysUntilEvent(nextEvent.date)}
              </div>
              {nextEvent.organizer && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                  <User className="h-3 w-3" />
                  {nextEvent.organizer}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Eventos de Hoje */}
        {todayEvents.length > 0 && (
          <div className="p-3 bg-accent/10 border border-accent/30">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-accent" />
              <h3 className="text-sm font-bold text-accent font-mono uppercase">
                {"EVENTOS DE HOJE"}
              </h3>
            </div>
            <div className="space-y-2">
              {todayEvents.map((event) => (
                <div key={event.id} className="p-2 bg-background border border-border/50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-mono text-foreground font-bold">{event.title}</p>
                      {event.organizer && (
                        <p className="text-xs text-muted-foreground font-mono">{event.organizer}</p>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteEvent(event.id)}
                      className="h-6 w-6 p-0 hover:bg-destructive/20 hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Próximos Eventos */}
        {upcomingEvents.length > 0 && (
          <div className="p-3 bg-muted/20 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-bold text-primary font-mono uppercase">
                {"PRÓXIMOS EVENTOS"}
              </h3>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {upcomingEvents.slice(0, 5).map((event) => (
                <div key={event.id} className="p-2 bg-background border border-border/50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-mono text-foreground font-bold">{event.title}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono mt-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(event.date)} - {getDaysUntilEvent(event.date)}
                      </div>
                      {event.organizer && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                          <User className="h-3 w-3" />
                          {event.organizer}
                        </div>
                      )}
                      {event.map && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                          <MapPin className="h-3 w-3" />
                          {event.map}
                        </div>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteEvent(event.id)}
                      className="h-6 w-6 p-0 hover:bg-destructive/20 hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
              {upcomingEvents.length > 5 && (
                <p className="text-xs text-muted-foreground font-mono text-center py-2">
                  +{upcomingEvents.length - 5} eventos adicionais
                </p>
              )}
            </div>
          </div>
        )}

        {/* Mensagem quando não há eventos */}
        {events.length === 0 && (
          <div className="p-4 bg-muted/10 border border-border text-center">
            <p className="text-sm text-muted-foreground font-mono">
              {"NENHUM EVENTO REGISTRADO"}
            </p>
            <p className="text-xs text-muted-foreground font-mono mt-1">
              {"Selecione uma data no calendário para criar um evento"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
