"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PersonnelAssignmentProps {
  organizer: string
  supervisor: string
  onOrganizerChange: (organizer: string) => void
  onSupervisorChange: (supervisor: string) => void
}

export function PersonnelAssignment({
  organizer,
  supervisor,
  onOrganizerChange,
  onSupervisorChange
}: PersonnelAssignmentProps) {
  return (
    <div className="space-y-4 p-4 bg-muted/20 border border-border">
      <h3 className="text-sm font-bold text-primary font-mono tracking-wider uppercase border-b border-primary/30 pb-2">
        {"// ATRIBUIÇÃO DE PESSOAL"}
      </h3>

      <div className="space-y-2">
        <Label htmlFor="organizer" className="text-xs font-mono text-foreground uppercase tracking-wide">
          {"Organizador do Evento"}
        </Label>
        <Input
          id="organizer"
          value={organizer}
          onChange={(e) => onOrganizerChange(e.target.value)}
          placeholder="Digite o nome do organizador..."
          className="bg-background border-border font-mono"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="supervisor" className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
          {"Supervisor (Opcional)"}
        </Label>
        <Input
          id="supervisor"
          value={supervisor}
          onChange={(e) => onSupervisorChange(e.target.value)}
          placeholder="Digite o nome do supervisor..."
          className="bg-background border-border font-mono"
        />
      </div>
    </div>
  )
}
