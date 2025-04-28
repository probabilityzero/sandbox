"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react"
import type { Project } from "@/types/project"
import { useSidebar } from "@/hooks/use-sidebar"

interface RecentProjectsProps {
  projects: Project[]
}

export function RecentProjects({ projects }: RecentProjectsProps) {
  const router = useRouter()
  const { isMobile, close } = useSidebar()
  const [expanded, setExpanded] = useState(true)
  const [recentProjects, setRecentProjects] = useState<Project[]>([])
  
  useEffect(() => {
    if (projects && projects.length > 0) {
      const sorted = [...projects].sort((a, b) => {
        return new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime()
      }).slice(0, 10)
      
      setRecentProjects(sorted)
    }
  }, [projects])
  
  const toggleExpanded = () => {
    setExpanded(prev => !prev)
  }
  
  const handleProjectClick = (e: React.MouseEvent, projectId: number | undefined) => {
    e.preventDefault()
    
    if (isMobile) {
      close()
    }
    
    setTimeout(() => {
      if (projectId !== undefined) {
        router.push(`/sandbox/${projectId}`)
      }
    }, 10)
  }
  
  return (
    <>
      <button 
        className="flex items-center justify-between pl-5 pr-6 py-1.5 w-full text-left text-muted-foreground hover:text-foreground"
        onClick={toggleExpanded}
      >
        <span className="text-xs">Recent</span>
        {expanded ? 
          <ChevronDownIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" /> : 
          <ChevronRightIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
        }
      </button>
      
      {expanded && (
        <div className="flex flex-col">
          {recentProjects.length > 0 ? (
            recentProjects.map((project) => (
              <a
                key={project.id}
                href={`/sandbox/${project.id}`}
                className="flex items-center gap-2 px-5 py-1.5 text-sm text-foreground hover:bg-accent"
              >
                {project.language === "javascript" && <span className="text-yellow-400 text-xs">JS</span>}
                {project.language === "python" && <span className="text-blue-400 text-xs">PY</span>}
                {project.language === "glsl" && <span className="text-purple-400 text-xs">GL</span>}
                <span className="truncate">{project.name}</span>
              </a>
            ))
          ) : (
            <div className="px-5 py-2 text-sm text-muted-foreground italic">
              No recent projects
            </div>
          )}
        </div>
      )}
    </>
  )
}