"use client"

import { type Avatar } from "@/hooks/useEvents"
import { LinkPreview } from "@/components/ui/link-preview"

interface EventPreviewProps {
  formattedDate: string
  title: string
  description: string
  allLegions: string[]
  matchupLegion1: string
  matchupLegion2: string
  map: string
  organizer: string
  supervisor: string
  avatars: Avatar[]
}

export function EventPreview({
  formattedDate,
  title,
  description,
  allLegions,
  matchupLegion1,
  matchupLegion2,
  map,
  organizer,
  supervisor,
  avatars
}: EventPreviewProps) {
  return (
    <div className="imperial-border bg-card p-6">
      <h2 className="text-2xl font-bold text-primary font-mono tracking-wider uppercase mb-6">{"PREVIEW DO EVENTO"}</h2>

      <div className="space-y-4">
        {/* Date */}
        <div className="p-3 bg-muted/20 border border-border">
          <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Data</p>
          <p className="text-sm font-mono text-foreground">{formattedDate || "Não definida"}</p>
        </div>

        {/* Title */}
        <div className="p-3 bg-muted/20 border border-border">
          <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Título</p>
          <p className="text-sm font-mono text-foreground">{title || "Sem título"}</p>
        </div>

        {/* Description */}
        <div className="p-3 bg-muted/20 border border-border">
          <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Descrição</p>
          <p className="text-sm font-mono text-foreground whitespace-pre-wrap">{description || "Sem descrição"}</p>
        </div>

        {/* Legions */}
        <div className="p-3 bg-muted/20 border border-border">
          <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Legiões Participantes</p>
          {allLegions.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-2">
              {allLegions.map((legion) => (
                <span
                  key={legion}
                  className="px-2 py-1 bg-primary/20 border border-primary/50 text-xs font-mono text-primary"
                >
                  {legion}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm font-mono text-foreground">Nenhuma legião selecionada</p>
          )}
        </div>

        {/* Matchup */}
        <div className="p-3 bg-muted/20 border border-border">
          <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Confronto</p>
          <p className="text-sm font-mono text-foreground">
            {matchupLegion1 && matchupLegion2 ? `${matchupLegion1} VS ${matchupLegion2}` : "Não definido"}
          </p>
        </div>

        {/* Map */}
        <div className="p-3 bg-muted/20 border border-border">
          <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Mapa</p>
          {map && map.startsWith("http") ? (
            <LinkPreview url={map} className="mt-2" />
          ) : (
            <p className="text-sm font-mono text-foreground">{map || "Não definido"}</p>
          )}
        </div>

        {/* Organizer */}
        <div className="p-3 bg-muted/20 border border-border">
          <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Organizador</p>
          <p className="text-sm font-mono text-foreground">{organizer || "Não definido"}</p>
        </div>

        {/* Supervisor */}
        {supervisor && (
          <div className="p-3 bg-muted/20 border border-border">
            <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Supervisor</p>
            <p className="text-sm font-mono text-foreground">{supervisor}</p>
          </div>
        )}

        {/* Avatars with Classes */}
        <div className="p-3 bg-muted/20 border border-border">
          <p className="text-xs font-mono text-muted-foreground uppercase mb-1">Avatares e Classes</p>
          {avatars.some((a) => a.link || a.class) ? (
            <div className="space-y-2 mt-2">
              {avatars.map((avatar, index) => {
                if (!avatar.link && !avatar.class) return null
                return (
                  <div key={avatar.id} className="space-y-2">
                    <div className="p-2 bg-background border border-border/50">
                      <p className="text-xs font-mono text-primary mb-1">Avatar {index + 1}</p>
                      {avatar.class && (
                        <p className="text-xs font-mono text-foreground mb-1">
                          <span className="text-muted-foreground">Classe:</span>{" "}
                          <span className="text-primary">{avatar.class}</span>
                        </p>
                      )}
                    </div>
                    {avatar.link && avatar.link.startsWith("http") && (
                      <LinkPreview url={avatar.link} className="mt-1" />
                    )}
                    {avatar.link && !avatar.link.startsWith("http") && (
                      <p className="text-xs font-mono text-foreground break-all mb-1 px-2">
                        <span className="text-muted-foreground">Link:</span> {avatar.link}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-sm font-mono text-foreground">Nenhum avatar configurado</p>
          )}
        </div>
      </div>
    </div>
  )
}
