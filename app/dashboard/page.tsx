"use client"

import { useProjects } from "@/hooks/use-projects"
import { Button } from "@/components/ui/button"
import { PlusIcon, CodeIcon, SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { NewProjectButton } from "@/components/new-project-button"
import { ProjectCard } from "@/components/project-card"

export default function Dashboard() {
  const { projects, currentProject, changeProject } = useProjects()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProjects, setFilteredProjects] = useState(projects)

  useEffect(() => {
    if (searchTerm) {
      const filtered = projects.filter(project => 
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredProjects(filtered)
    } else {
      setFilteredProjects(projects)
    }
  }, [searchTerm, projects])

  return (
    <div className="flex flex-col min-h-screen">
      <div className="border-b">
        <div className="container py-4 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold">My Projects</h1>
            <p className="text-muted-foreground mt-1">
              Manage your creative coding projects
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search projects" 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <NewProjectButton />
          </div>
        </div>
      </div>

      <div className="container py-8">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                id={project.id!}
                title={project.name}
                language={project.language}
                updatedAt={project.updatedAt}
                isCurrent={project.id === currentProject?.id}
                onClick={() => changeProject(project.id!)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-muted flex items-center justify-center rounded-full mb-4">
              <CodeIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm ? "No projects match your search term" : "You haven't created any projects yet"}
            </p>
            {!searchTerm && (
              <NewProjectButton />
            )}
          </div>
        )}
      </div>
    </div>
  )
}