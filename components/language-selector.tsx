"use client"

import type { LanguageType } from "@/types/project"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { CodeIcon, PythonIcon, ShaderIcon } from "./icons"

interface LanguageSelectorProps {
  language: LanguageType
  onChange: (language: LanguageType) => void
}

export function LanguageSelector({ language, onChange }: LanguageSelectorProps) {
  const handleValueChange = (value: string) => {
    onChange(value as LanguageType)
  }

  return (
    <Select value={language} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="javascript" className="flex items-center">
          <div className="flex items-center">
            <CodeIcon className="mr-2 h-4 w-4" />
            JavaScript
          </div>
        </SelectItem>
        <SelectItem value="python">
          <div className="flex items-center">
            <PythonIcon className="mr-2 h-4 w-4" />
            Python
          </div>
        </SelectItem>
        <SelectItem value="glsl">
          <div className="flex items-center">
            <ShaderIcon className="mr-2 h-4 w-4" />
            GLSL Shader
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
