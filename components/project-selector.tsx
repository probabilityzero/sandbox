"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreVerticalIcon } from "lucide-react"
import type { Project } from "@/types/project"

interface ProjectSelectorProps {
  projects: Project[]
  currentProject: Project | null
  onProjectChange: (projectId: number) => void
}

export function ProjectSelector({ projects, currentProject, onProjectChange }: ProjectSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Select
        value={currentProject?.id?.toString() || ""}
        onValueChange={(value) => onProjectChange(parseInt(value))}
      >
        <SelectTrigger className="w-[180px] md:w-[220px]">
          <SelectValue placeholder="Select a project" />
        </SelectTrigger>
        <SelectContent>
          {projects.map((project) => (
            <SelectItem key={project.id} value={project.id!.toString()}>
              {project.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
