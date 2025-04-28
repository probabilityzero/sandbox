"use client"

import type { LanguageType } from "@/types/project"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { SiJavascript, SiPython, SiWebgl } from "react-icons/si"
import { CodeIcon } from "./ui/icons"

interface LanguageSelectorProps {
  language: LanguageType
  onChange: (language: LanguageType) => void
}

export function LanguageSelector({ language, onChange }: LanguageSelectorProps) {
  const handleValueChange = (value: string) => {
    onChange(value as LanguageType)
  }

  const renderLanguageIcon = () => {
    switch (language) {
      case "javascript":
        return <SiJavascript className="mr-2 h-3 w-3 text-yellow-400" />
      case "python":
        return <SiPython className="mr-2 h-3 w-3 text-blue-500" />
      case "glsl":
        return <SiWebgl className="mr-2 h-3 w-3 text-purple-500" />
      default:
        return <CodeIcon className="mr-2 h-3 w-3" />
    }
  }

  return (
    <Select value={language} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[120px] h-8">
        <div className="flex items-center">
          {renderLanguageIcon()}
          <span className="ml-1">{language.charAt(0).toUpperCase() + language.slice(1)}</span>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="javascript">
          <div className="flex items-center">
            <SiJavascript className="mr-2 h-3 w-3 text-yellow-400" />
            JavaScript
          </div>
        </SelectItem>
        <SelectItem value="python">
          <div className="flex items-center">
            <SiPython className="mr-2 h-3 w-3 text-blue-500" />
            Python
          </div>
        </SelectItem>
        <SelectItem value="glsl">
          <div className="flex items-center">
            <SiWebgl className="mr-2 h-3 w-3 text-purple-500" />
            GLSL
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
