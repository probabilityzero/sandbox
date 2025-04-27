"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { NewProjectButton } from "@/components/new-project-button"
import { 
  MenuIcon, 
  XIcon, 
  PanelLeftCloseIcon, 
  PanelLeftIcon, 
  FolderIcon,
  UsersIcon,
  BookOpenIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  CodeIcon,
  BrushIcon
} from "lucide-react"
import Link from "next/link"
import { useSidebar } from "@/hooks/use-sidebar"
import { useProjects } from "@/hooks/use-projects"
import type { Project } from "@/types/project"

export function Sidebar() {
  const { isOpen, isMobile, toggle, close } = useSidebar()
  const { projects } = useProjects()
  const [recentProjects, setRecentProjects] = useState<Project[]>([])
  const [expandedSections, setExpandedSections] = useState({
    recent: true,
    examples: false,
    tutorials: false
  })
  
  useEffect(() => {
    if (projects && projects.length > 0) {
      const sorted = [...projects].sort((a, b) => {
        return new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime()
      }).slice(0, 10)
      
      setRecentProjects(sorted)
    }
  }, [projects])

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobile) close()
    }
    
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isMobile, close])

  useEffect(() => {
    if (!isMobile || !isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      const sidebar = document.getElementById("sidebar-container")
      if (sidebar && !sidebar.contains(e.target as Node)) {
        close()
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, isMobile, close])

  return (
    <>
      {isOpen && isMobile && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30" />
      )}
      
      {!isMobile && (
        <div 
          className={cn(
            "h-screen border-r border-border bg-background transition-all duration-300",
            isOpen ? "w-60" : "w-0 overflow-hidden opacity-0"
          )}
        />
      )}
      
      <div 
        id="sidebar-container"
        className={cn(
          "top-0 bottom-0 bg-background border-r border-border z-40 flex flex-col h-screen",
          isMobile ? "fixed" : "absolute", 
          isOpen ? (isMobile ? "w-[280px]" : "w-60") : "w-0",
          isOpen ? "left-0" : "-left-80", 
          "transition-all duration-300"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
              <CodeIcon className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-medium text-foreground">Grid Sandbox</span>
          </div>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={close}>
              <XIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="px-3 py-4">
          <Button 
            variant="outline" 
            className="w-full bg-secondary/50 hover:bg-secondary border-accent text-center h-9 font-medium"
            onClick={() => window.location.href = '/new'}
          >
            New Project
          </Button>
        </div>
        
        <div className="flex flex-col space-y-1 px-3 py-2">
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-accent text-foreground"
          >
            <FolderIcon className="h-4 w-4" />
            <span className="text-sm">My Projects</span>
          </Link>
          
          <Link 
            href="/community" 
            className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-accent text-foreground"
          >
            <UsersIcon className="h-4 w-4" />
            <span className="text-sm">Community</span>
          </Link>
        </div>

        <div className="flex flex-col space-y-1 px-3 mt-2">
          <button 
            className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-accent text-foreground"
            onClick={() => toggleSection('examples')}
          >
            <div className="flex items-center gap-2">
              <BrushIcon className="h-4 w-4" />
              <span className="text-sm">Examples</span>
            </div>
            {expandedSections.examples ? 
              <ChevronDownIcon className="h-4 w-4" /> : 
              <ChevronRightIcon className="h-4 w-4" />
            }
          </button>
          
          <button 
            className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-accent text-foreground"
            onClick={() => toggleSection('tutorials')}
          >
            <div className="flex items-center gap-2">
              <BookOpenIcon className="h-4 w-4" />
              <span className="text-sm">Tutorials</span>
            </div>
            {expandedSections.tutorials ? 
              <ChevronDownIcon className="h-4 w-4" /> : 
              <ChevronRightIcon className="h-4 w-4" />
            }
          </button>
        </div>
        
        <div className="flex-1 overflow-auto mt-2">
          <button 
            className="flex items-center justify-between px-5 py-1.5 w-full text-left hover:bg-accent"
            onClick={() => toggleSection('recent')}
          >
            <span className="text-xs uppercase text-muted-foreground font-medium">Recent Projects</span>
            {expandedSections.recent ? 
              <ChevronDownIcon className="h-4 w-4" /> : 
              <ChevronRightIcon className="h-4 w-4" />
            }
          </button>
          
          {expandedSections.recent && (
            <div className="flex flex-col">
              {recentProjects.length > 0 ? (
                recentProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/project/${project.id}`}
                    className="flex items-center gap-2 px-5 py-1.5 text-sm text-foreground hover:bg-accent"
                  >
                    {project.language === "javascript" && <span className="text-yellow-400 text-xs">JS</span>}
                    {project.language === "python" && <span className="text-blue-400 text-xs">PY</span>}
                    {project.language === "glsl" && <span className="text-purple-400 text-xs">GL</span>}
                    <span className="truncate">{project.name}</span>
                  </Link>
                ))
              ) : (
                <div className="px-5 py-2 text-sm text-muted-foreground italic">
                  No recent projects
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
      
      {!isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "fixed z-50 m-3 bg-background shadow-sm transition-all duration-300",
            isOpen ? "left-60" : "left-0"
          )}
          onClick={toggle}
          title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? <PanelLeftCloseIcon className="h-4 w-4" /> : <PanelLeftIcon className="h-4 w-4" />}
        </Button>
      )}
      
      {isMobile && !isOpen && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-3 left-3 z-50"
          onClick={(e) => {
            e.stopPropagation()
            toggle()
          }}
        >
          <MenuIcon className="h-4 w-4" />
        </Button>
      )}
    </>
  )
}