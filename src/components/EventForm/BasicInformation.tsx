"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface BasicInformationProps {
  title: string
  description: string
  onTitleChange: (title: string) => void
  onDescriptionChange: (description: string) => void
}

export function BasicInformation({ 
  title, 
  description, 
  onTitleChange, 
  onDescriptionChange 
}: BasicInformationProps) {
  return (
    <div className="space-y-4 p-4 bg-muted/20 border border-border">
      <h3 className="text-sm font-bold text-primary font-mono tracking-wider uppercase border-b border-primary/30 pb-2">
        {"// INFORMAÇÕES BÁSICAS"}
      </h3>

      <div className="space-y-2">
        <Label htmlFor="title" className="text-xs font-mono text-foreground uppercase tracking-wide">
          {"Título do Evento"}
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Digite o título do evento..."
          className="bg-background border-border font-mono"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-xs font-mono text-foreground uppercase tracking-wide">
          {"Descrição do Evento"}
        </Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Digite a descrição do evento..."
          className="bg-background border-border font-mono min-h-[100px]"
        />
      </div>
    </div>
  )
}
