"use client"

import type { Project } from "@/types/project"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

interface ProjectSelectorProps {
  projects: Project[]
  currentProject: Project | null
  onProjectChange: (projectId: number) => void
}

export function ProjectSelector({ projects, currentProject, onProjectChange }: ProjectSelectorProps) {
  const handleValueChange = (value: string) => {
    onProjectChange(Number(value))
  }

  return (
    <Select value={currentProject?.id.toString()} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a project" />
      </SelectTrigger>
      <SelectContent>
        {projects.map((project) => (
          <SelectItem key={project.id} value={project.id.toString()}>
            {project.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
