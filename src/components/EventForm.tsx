"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useEvents, type Avatar } from "@/hooks/useEvents"
import { BasicInformation } from "./EventForm/BasicInformation"
import { LegionSelection } from "./EventForm/LegionSelection"
import { BattleConfiguration } from "./EventForm/BattleConfiguration"
import { PersonnelAssignment } from "./EventForm/PersonnelAssignment"
import { AvatarConfiguration } from "./EventForm/AvatarConfiguration"
import { EventPreview } from "./EventForm/EventPreview"

interface EventFormProps {
  selectedDate: Date | null
  onClose: () => void
}

export function EventForm({ selectedDate, onClose }: EventFormProps) {
  const { addEvent } = useEvents()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedLegions, setSelectedLegions] = useState<string[]>([])
  const [customLegion, setCustomLegion] = useState("")
  const [showCustomLegion, setShowCustomLegion] = useState(false)
  const [matchupLegion1, setMatchupLegion1] = useState("")
  const [matchupLegion2, setMatchupLegion2] = useState("")
  const [map, setMap] = useState("")
  const [organizer, setOrganizer] = useState("")
  const [supervisor, setSupervisor] = useState("")
  const [avatars, setAvatars] = useState<Avatar[]>([{ id: "1", link: "", class: "" }])

  const toggleLegion = (legion: string) => {
    setSelectedLegions((prev) => (prev.includes(legion) ? prev.filter((l) => l !== legion) : [...prev, legion]))
  }

  const toggleCustomLegion = () => {
    setShowCustomLegion((prev) => !prev)
    if (showCustomLegion) {
      setCustomLegion("")
    }
  }

  const addAvatar = () => {
    setAvatars((prev) => [...prev, { id: Date.now().toString(), link: "", class: "" }])
  }

  const removeAvatar = (id: string) => {
    setAvatars((prev) => prev.filter((avatar) => avatar.id !== id))
  }

  const updateAvatarLink = (id: string, link: string) => {
    setAvatars((prev) => prev.map((avatar) => (avatar.id === id ? { ...avatar, link } : avatar)))
  }

  const updateAvatarClass = (id: string, avatarClass: string) => {
    setAvatars((prev) => prev.map((avatar) => (avatar.id === id ? { ...avatar, class: avatarClass } : avatar)))
  }

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    : ""

  const allLegions = [...selectedLegions, ...(customLegion ? [customLegion] : [])]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedDate || !title.trim()) {
      alert('Por favor, preencha pelo menos o título do evento.')
      return
    }

    const eventData = {
      title: title.trim(),
      description: description.trim(),
      date: selectedDate,
      selectedLegions,
      customLegion: customLegion.trim(),
      matchupLegion1,
      matchupLegion2,
      map: map.trim(),
      organizer: organizer.trim(),
      supervisor: supervisor.trim(),
      avatars: avatars.filter(avatar => avatar.link.trim() || avatar.class.trim())
    }

    addEvent(eventData)
    onClose()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Form Section */}
      <div className="imperial-border bg-card p-6">
        <div className="flex justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-primary font-mono tracking-wider uppercase">
              {"CRIAR EVENTO"}
            </h2>
            <p className="text-sm text-muted-foreground font-mono mt-1">
              {"DATA: "}
              {formattedDate}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-destructive/20 hover:text-destructive"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <BasicInformation
            title={title}
            description={description}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
          />

          <LegionSelection
            selectedLegions={selectedLegions}
            customLegion={customLegion}
            showCustomLegion={showCustomLegion}
            onToggleLegion={toggleLegion}
            onToggleCustomLegion={toggleCustomLegion}
            onCustomLegionChange={setCustomLegion}
          />

          <BattleConfiguration
            matchupLegion1={matchupLegion1}
            matchupLegion2={matchupLegion2}
            map={map}
            allLegions={allLegions}
            onMatchupLegion1Change={setMatchupLegion1}
            onMatchupLegion2Change={setMatchupLegion2}
            onMapChange={setMap}
          />

          <PersonnelAssignment
            organizer={organizer}
            supervisor={supervisor}
            onOrganizerChange={setOrganizer}
            onSupervisorChange={setSupervisor}
          />

          <AvatarConfiguration
            avatars={avatars}
            onAddAvatar={addAvatar}
            onRemoveAvatar={removeAvatar}
            onUpdateAvatarLink={updateAvatarLink}
            onUpdateAvatarClass={updateAvatarClass}
          />

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/80 text-primary-foreground font-mono tracking-wider uppercase group cursor-pointer"
            >
              <span className="inline-block arrow-right">{" >>"}</span>
              {" INICIAR EVENTO "}
              <span className="inline-block arrow-left">{"<< "}</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-destructive/50 text-destructive hover:bg-destructive/20 hover:border-destructive font-mono tracking-wider uppercase bg-transparent cursor-pointer"
            >
              {"ABORTAR"}
            </Button>
          </div>
        </form>
      </div>

      <div className="lg:sticky lg:top-4 lg:self-start">
        <EventPreview
          formattedDate={formattedDate}
          title={title}
          description={description}
          allLegions={allLegions}
          matchupLegion1={matchupLegion1}
          matchupLegion2={matchupLegion2}
          map={map}
          organizer={organizer}
          supervisor={supervisor}
          avatars={avatars}
        />
      </div>
    </div>
  )
}
