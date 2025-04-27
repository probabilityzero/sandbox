"use client"

import { useProjects } from "@/hooks/use-projects"
import { Button } from "@/components/ui/button"
import { PlusIcon, CodeIcon, SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import Link from "next/link"
import { SiJavascript, SiPython, SiWebgl } from "react-icons/si"
import { NewProjectButton } from "@/components/new-project-button"

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
  
  const getLanguageIcon = (language: string) => {
    switch (language) {
      case "javascript":
        return <SiJavascript className="h-4 w-4 text-yellow-400" />
      case "python":
        return <SiPython className="h-4 w-4 text-blue-500" />
      case "glsl":
        return <SiWebgl className="h-4 w-4 text-purple-500" />
      default:
        return <CodeIcon className="h-4 w-4" />
    }
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date)
  }

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
              <Link 
                key={project.id} 
                href={`/project/${project.id}`} 
                className="block border rounded-lg overflow-hidden bg-card hover:bg-accent/30 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  changeProject(project.id!)
                }}
              >
                <div className={cn(
                  "h-24 flex items-center justify-center",
                  project.language === "javascript" ? "bg-yellow-500/10" : "",
                  project.language === "python" ? "bg-blue-500/10" : "",
                  project.language === "glsl" ? "bg-purple-500/10" : ""
                )}>
                  {project.language === "javascript" && <SiJavascript className="h-12 w-12 text-yellow-400/40" />}
                  {project.language === "python" && <SiPython className="h-12 w-12 text-blue-500/40" />}
                  {project.language === "glsl" && <SiWebgl className="h-12 w-12 text-purple-500/40" />}
                </div>
                
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    {getLanguageIcon(project.language)}
                    <h3 className="font-medium truncate">{project.name}</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Last edited {formatDate(project.updatedAt)}
                    </span>
                    {project.id === currentProject?.id && (
                      <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                </div>
              </Link>
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

import { cn } from "@/lib/utils"