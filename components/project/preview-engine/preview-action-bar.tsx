"use client"

import { Button } from "../../ui/button"
import { RefreshCwIcon, Terminal, SlidersIcon } from "lucide-react"
import type { LanguageType } from "@/types/project"

interface PreviewActionBarProps {
  language: LanguageType
  onRefresh: () => void
  showConsole?: boolean
  onToggleConsole?: () => void
  showControls?: boolean
  onToggleControls?: () => void
}

export function PreviewActionBar({
  language,
  onRefresh,
  showConsole = false,
  onToggleConsole,
  showControls = false,
  onToggleControls
}: PreviewActionBarProps) {
  return (
    <div className="border-t p-1.5 flex items-center gap-1 bg-muted/50">
      <Button size="icon" variant="ghost" onClick={onRefresh} className="h-7 w-7">
        <RefreshCwIcon className="h-3.5 w-3.5" />
      </Button>
      
      {/* Language-specific controls */}
      {language === "javascript" && onToggleConsole && (
        <Button
          size="icon"
          variant={showConsole ? "secondary" : "ghost"}
          onClick={onToggleConsole}
          className="h-7 w-7 ml-auto"
          title="Toggle console"
        >
          <Terminal className="h-3.5 w-3.5" />
        </Button>
      )}
      
      {language === "python" && onToggleConsole && (
        <Button
          size="icon"
          variant={showConsole ? "secondary" : "ghost"}
          onClick={onToggleConsole}
          className="h-7 w-7 ml-auto"
          title="Toggle console"
        >
          <Terminal className="h-3.5 w-3.5" />
        </Button>
      )}
      
      {language === "glsl" && onToggleControls && (
        <Button
          size="icon"
          variant={showControls ? "secondary" : "ghost"}
          onClick={onToggleControls}
          className="h-7 w-7 ml-auto"
          title="Toggle shader controls"
        >
          <SlidersIcon className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  )
}