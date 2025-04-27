"use client"

import { useProjects } from "@/hooks/use-projects"
import { CodeIcon, SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { NewProjectButton } from "@/components/new-project-button"
import { ProjectCard } from "@/components/project-card"
import { Header } from "@/components/layout/header"

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
      <Header title="My Projects"/>

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