"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PlusIcon } from "lucide-react"
import { useProjects } from "@/hooks/use-projects"
import type { LanguageType } from "@/types/project"
import { SiJavascript, SiPython, SiWebgl } from "react-icons/si"
import { IconType } from "react-icons"
import { cn } from "@/lib/utils"

type LanguageOption = {
  value: LanguageType
  label: string
  framework: string
  icon: IconType
  color: string
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    value: "javascript",
    label: "JavaScript",
    framework: "p5.js",
    icon: SiJavascript,
    color: "text-yellow-400"
  },
  {
    value: "python",
    label: "Python",
    framework: "Pyodide",
    icon: SiPython,
    color: "text-blue-500"
  },
  {
    value: "glsl",
    label: "GLSL Shader",
    framework: "",
    icon: SiWebgl,
    color: "text-purple-500"
  }
]

export function NewProjectButton({ fullWidth = false }: { fullWidth?: boolean }) {
  const { createNewProject } = useProjects()
  
  const handleCreateProject = (language: LanguageType) => {
    createNewProject(language)
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className={cn(fullWidth && "w-full justify-start")}
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          New Project
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={fullWidth ? "center" : "start"}>
        {LANGUAGE_OPTIONS.map((option) => {
          const Icon = option.icon
          return (
            <DropdownMenuItem 
              key={option.value}
              onClick={() => handleCreateProject(option.value)} 
              className="cursor-pointer"
            >
              <Icon className={`mr-2 h-4 w-4 ${option.color}`} />
              <span>
                {option.label}
                {option.framework && ` (${option.framework})`}
              </span>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}