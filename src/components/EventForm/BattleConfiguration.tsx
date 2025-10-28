"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface BattleConfigurationProps {
  matchupLegion1: string
  matchupLegion2: string
  map: string
  allLegions: string[]
  onMatchupLegion1Change: (legion: string) => void
  onMatchupLegion2Change: (legion: string) => void
  onMapChange: (map: string) => void
}

export function BattleConfiguration({
  matchupLegion1,
  matchupLegion2,
  map,
  allLegions,
  onMatchupLegion1Change,
  onMatchupLegion2Change,
  onMapChange
}: BattleConfigurationProps) {
  return (
    <div className="space-y-4 p-4 bg-muted/20 border border-border">
      <h3 className="text-sm font-bold text-primary font-mono tracking-wider uppercase border-b border-primary/30 pb-2">
        {"// CONFIGURAÇÕES DE BATALHA"}
      </h3>

      <div className="space-y-2">
        <Label className="text-xs font-mono text-foreground uppercase tracking-wide">{"Confronto de Legiões"}</Label>
        <div className="flex items-center gap-2">
          <select
            value={matchupLegion1}
            onChange={(e) => onMatchupLegion1Change(e.target.value)}
            className="flex-1 h-9 rounded-md border border-border bg-background px-3 py-1 text-sm font-mono text-foreground"
            disabled={allLegions.length === 0}
          >
            <option value="">Selecione...</option>
            {allLegions.map((legion) => (
              <option key={legion} value={legion}>
                {legion}
              </option>
            ))}
          </select>
          <span className="text-primary font-mono">VS</span>
          <select
            value={matchupLegion2}
            onChange={(e) => onMatchupLegion2Change(e.target.value)}
            className="flex-1 h-9 rounded-md border border-border bg-background px-3 py-1 text-sm font-mono text-foreground"
            disabled={allLegions.length === 0}
          >
            <option value="">Selecione...</option>
            {allLegions.map((legion) => (
              <option key={legion} value={legion}>
                {legion}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="map" className="text-xs font-mono text-foreground uppercase tracking-wide">
          {"Mapa de Batalha / Localização"}
        </Label>
        <Input
          id="map"
          value={map}
          onChange={(e) => onMapChange(e.target.value)}
          placeholder="Digite o nome do mundo VRChat..."
          className="bg-background border-border font-mono"
        />
      </div>
    </div>
  )
}
