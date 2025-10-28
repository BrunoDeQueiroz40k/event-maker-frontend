"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"
import { type Avatar } from "@/hooks/useEvents"

const AVATAR_CLASSES = [
  "Light Infatary",
  "Medium Infantry",
  "Medium Brawler",
  "Heavy Infantry",
  "Heavy Brawler",
  "Light Walker",
  "Medium Walker",
  "Heavy Walker",
  "Commander",
  "Warlord",
  "Boss",
]

interface AvatarConfigurationProps {
  avatars: Avatar[]
  onAddAvatar: () => void
  onRemoveAvatar: (id: string) => void
  onUpdateAvatarLink: (id: string, link: string) => void
  onUpdateAvatarClass: (id: string, avatarClass: string) => void
}

export function AvatarConfiguration({
  avatars,
  onAddAvatar,
  onRemoveAvatar,
  onUpdateAvatarLink,
  onUpdateAvatarClass
}: AvatarConfigurationProps) {
  return (
    <div className="space-y-4 p-4 bg-muted/20 border border-border">
      <div className="flex items-center justify-between border-b border-primary/30 pb-2">
        <h3 className="text-sm font-bold text-primary font-mono tracking-wider uppercase">
          {"// CONFIGURAÇÃO DE AVATARES"}
        </h3>
        <Button
          type="button"
          size="sm"
          onClick={onAddAvatar}
          className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 h-7 px-2"
        >
          <Plus className="h-3 w-3 mr-1" />
          Adicionar
        </Button>
      </div>

      <div className="space-y-3">
        {avatars.map((avatar, index) => (
          <div key={avatar.id} className="p-3 bg-background border border-border space-y-2">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs font-mono text-muted-foreground uppercase">Avatar {index + 1}</Label>
              {avatars.length > 1 && (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => onRemoveAvatar(avatar.id)}
                  className="h-6 w-6 p-0 hover:bg-destructive/20 hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`avatar-link-${avatar.id}`} className="text-xs font-mono text-foreground">
                Link do Avatar
              </Label>
              <Input
                id={`avatar-link-${avatar.id}`}
                value={avatar.link}
                onChange={(e) => onUpdateAvatarLink(avatar.id, e.target.value)}
                placeholder="Cole o link do avatar..."
                className="bg-muted border-border font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`avatar-class-${avatar.id}`} className="text-xs font-mono text-foreground">
                Classe
              </Label>
              <select
                id={`avatar-class-${avatar.id}`}
                value={avatar.class}
                onChange={(e) => onUpdateAvatarClass(avatar.id, e.target.value)}
                className="w-full h-9 rounded-md border border-border bg-muted px-3 py-1 text-sm font-mono text-foreground"
              >
                <option value="">Selecione uma classe...</option>
                {AVATAR_CLASSES.map((avatarClass) => (
                  <option key={avatarClass} value={avatarClass}>
                    {avatarClass}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
