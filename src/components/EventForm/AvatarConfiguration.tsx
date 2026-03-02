"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LinkPreview } from "@/components/ui/link-preview"
import { Plus, Trash2 } from "lucide-react"
import { type Avatar } from "@/hooks/useEvents"

const AVATAR_CLASSES = [
  "Light Infatary",
  "Light Brawler",
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
  onUpdateAvatarClass,
}: AvatarConfigurationProps) {
  return (
    <div className="space-y-3 p-3 bg-muted/20 border border-border">
      <div className="flex items-center justify-between border-b border-primary/30 pb-1.5">
        <h3 className="text-xs font-bold text-primary font-mono tracking-wider uppercase">
          {"// CONFIGURAÇÃO DE AVATARES"}
        </h3>
        <Button
          type="button"
          size="sm"
          onClick={onAddAvatar}
          className="bg-primary/15 hover:bg-primary/25 text-primary border border-primary/40 h-7 px-2"
        >
          <Plus className="h-3 w-3 mr-1" />
          Adicionar
        </Button>
      </div>

      <div className="space-y-2.5">
        {avatars.map((avatar, index) => (
          <div key={avatar.id} className="p-2.5 bg-background border border-border space-y-1.5">
            <div className="flex items-center justify-between mb-1.5">
              <Label className="text-[11px] font-mono text-muted-foreground uppercase">Avatar {index + 1}</Label>
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

            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] gap-2">
              <div className="space-y-1">
                <Label htmlFor={`avatar-link-${avatar.id}`} className="text-[11px] font-mono text-foreground">
                  Link do Avatar
                </Label>
                <Input
                  id={`avatar-link-${avatar.id}`}
                  value={avatar.link}
                  onChange={(e) => onUpdateAvatarLink(avatar.id, e.target.value)}
                  placeholder="Cole o link do avatar..."
                  className="bg-muted border-border font-mono text-xs h-8 px-2"
                />
                {avatar.link && (
                  <div className="mt-1 text-[10px] text-muted-foreground font-mono">
                    <LinkPreview url={avatar.link} className="mt-0!" />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor={`avatar-class-${avatar.id}`} className="text-[11px] font-mono text-foreground">
                  Classe
                </Label>
                <select
                  id={`avatar-class-${avatar.id}`}
                  value={avatar.class}
                  onChange={(e) => onUpdateAvatarClass(avatar.id, e.target.value)}
                  className="w-full h-8 rounded-md border border-border bg-muted px-2 text-xs font-mono text-foreground"
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
          </div>
        ))}
      </div>
    </div>
  )
}
