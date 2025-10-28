"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

const LEGIONS = {
  LEGALISTAS: [
    "Ultramarines",
    "Blood Angels",
    "Dark Angels",
    "Space Wolves",
    "Imperial Fists",
    "Salamanders",
    "Raven Guard",
    "Iron Hands",
    "White Scars",
    "Black Templars",
    "Carcharodons",
    "Imperial Guard",
    "Korps of Krieg",
    "Adeptus Custodes",
  ],
  HEREGES: [
    "Death Guard",
    "Thousand Sons",
    "World Eaters",
    "Emperor's Children",
    "Black Legion",
    "Iron Warriors",
    "Night Lords",
    "Alpha Legion",
    "Word Bearers"
  ],
  XENOS: [
    "Orks",
    "Tyranids",
    "Necrons",
    "Tau Empire",
    "Eldar",
  ]
}

interface LegionSelectionProps {
  selectedLegions: string[]
  customLegion: string
  showCustomLegion: boolean
  onToggleLegion: (legion: string) => void
  onToggleCustomLegion: () => void
  onCustomLegionChange: (legion: string) => void
}

export function LegionSelection({
  selectedLegions,
  customLegion,
  showCustomLegion,
  onToggleLegion,
  onToggleCustomLegion,
  onCustomLegionChange
}: LegionSelectionProps) {
  return (
    <div className="space-y-4 p-4 bg-muted/20 border border-border">
      <h3 className="text-sm font-bold text-primary font-mono tracking-wider uppercase border-b border-primary/30 pb-2">
        {"// LEGIÕES PARTICIPANTES"}
      </h3>

      {/* Legalistas */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-primary font-mono uppercase tracking-wide">
          {">> LEGALISTAS <<"}
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {LEGIONS.LEGALISTAS.map((legion) => (
            <div key={legion} className="flex items-center space-x-2">
              <Checkbox
                id={legion}
                checked={selectedLegions.includes(legion)}
                onCheckedChange={() => onToggleLegion(legion)}
                className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label
                htmlFor={legion}
                className="text-xs font-mono text-foreground cursor-pointer hover:text-primary transition-colors"
              >
                {legion}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Hereges */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-primary font-mono uppercase tracking-wide">
          {">> HEREGES <<"}
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {LEGIONS.HEREGES.map((legion) => (
            <div key={legion} className="flex items-center space-x-2">
              <Checkbox
                id={legion}
                checked={selectedLegions.includes(legion)}
                onCheckedChange={() => onToggleLegion(legion)}
                className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label
                htmlFor={legion}
                className="text-xs font-mono text-foreground cursor-pointer hover:text-primary transition-colors"
              >
                {legion}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Xenos */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-primary font-mono uppercase tracking-wide">
          {">> XENOS <<"}
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {LEGIONS.XENOS.map((legion) => (
            <div key={legion} className="flex items-center space-x-2">
            <Checkbox
              id={legion}
              checked={selectedLegions.includes(legion)}
              onCheckedChange={() => onToggleLegion(legion)}
              className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <Label
              htmlFor={legion}
              className="text-xs font-mono text-foreground cursor-pointer hover:text-primary transition-colors"
            >
              {legion}
            </Label>
          </div>
          ))}
        </div>
      </div>

      {/* Custom Legion */}
      <div className="flex items-center space-x-2 mt-4 pt-3 border-t border-border/30">
        <Checkbox
          id="custom-legion"
          checked={showCustomLegion}
          onCheckedChange={onToggleCustomLegion}
          className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
        <Label
          htmlFor="custom-legion"
          className="text-xs font-mono text-foreground cursor-pointer hover:text-primary transition-colors"
        >
          Outro
        </Label>
      </div>
      {showCustomLegion && (
        <div className="mt-3">
          <Input
            value={customLegion}
            onChange={(e) => onCustomLegionChange(e.target.value)}
            placeholder="Digite o nome da legião..."
            className="bg-background border-border font-mono text-sm"
          />
        </div>
      )}
    </div>
  )
}
