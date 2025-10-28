"use client"

import { useState, useEffect } from "react"

export interface Avatar {
  id: string
  link: string
  class: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: Date
  selectedLegions: string[]
  customLegion: string
  matchupLegion1: string
  matchupLegion2: string
  map: string
  organizer: string
  supervisor: string
  avatars: Avatar[]
  createdAt: Date
}

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([])

  // Carregar eventos do localStorage na inicialização
  useEffect(() => {
    const savedEvents = localStorage.getItem('warhammer-events')
    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents).map((event: Event) => ({
          ...event,
          date: new Date(event.date),
          createdAt: new Date(event.createdAt)
        }))
        setTimeout(() => {
          setEvents(parsedEvents)
        }, 0)
      } catch (error) {
        console.error('Erro ao carregar eventos:', error)
      }
    }
  }, [])

  // Salvar eventos no localStorage sempre que a lista mudar
  useEffect(() => {
    localStorage.setItem('warhammer-events', JSON.stringify(events))
  }, [events])

  const addEvent = (eventData: Omit<Event, 'id' | 'createdAt'>) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      createdAt: new Date()
    }
    setEvents(prev => [...prev, newEvent])
    return newEvent
  }

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id))
  }

  const updateEvent = (id: string, eventData: Partial<Event>) => {
    setEvents(prev => prev.map(event => 
      event.id === id ? { ...event, ...eventData } : event
    ))
  }

  // Funções para filtrar eventos
  const getTodayEvents = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    return events.filter(event => {
      const eventDate = new Date(event.date)
      eventDate.setHours(0, 0, 0, 0)
      return eventDate.getTime() === today.getTime()
    })
  }

  const getUpcomingEvents = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    return events.filter(event => {
      const eventDate = new Date(event.date)
      eventDate.setHours(0, 0, 0, 0)
      return eventDate.getTime() > today.getTime()
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  const getNextEvent = () => {
    const upcoming = getUpcomingEvents()
    return upcoming.length > 0 ? upcoming[0] : null
  }

  return {
    events,
    addEvent,
    deleteEvent,
    updateEvent,
    getTodayEvents,
    getUpcomingEvents,
    getNextEvent
  }
}
