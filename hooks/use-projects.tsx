"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import type { Project, LanguageType, Version } from "@/types/project"
import { db } from "@/lib/db"

const DEFAULT_TEMPLATES: Record<LanguageType, string> = {
  javascript: `function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  ellipse(mouseX, mouseY, 80, 80);
}`,
  python: `import js
from pyodide.ffi import create_proxy

def setup():
    p5 = js.window.p5
    p5.createCanvas(400, 400)

def draw():
    p5 = js.window.p5
    p5.background(220)
    p5.ellipse(p5.mouseX, p5.mouseY, 80, 80)

# Setup p5js event listeners
js.window.setup = create_proxy(setup)
js.window.draw = create_proxy(draw)`,
  glsl: `precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    gl_FragColor = vec4(st.x, st.y, abs(sin(u_time * 0.5)), 1.0);
}`
}

type ProjectOptions = {
  name?: string;
  code?: string;
}

interface ProjectsContextType {
  projects: Project[]
  currentProject: Project | null
  code: string
  language: LanguageType
  error: string | null
  isLoading: boolean
  setCode: (code: string) => void
  createNewProject: (language: LanguageType, options?: ProjectOptions) => Promise<number | null>
  saveProject: () => void
  changeProject: (id: number) => boolean
  updateProjectName: (id: number, name: string) => void
  deleteProject: (id: number) => void
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState<LanguageType>("javascript")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // Load projects from database - update this effect to avoid auto-loading the most recent project
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true)
        const dbProjects = await db.projects.toArray()
        setProjects(dbProjects)
        
        // Only load the most recent project if there's no current project
        // This prevents overriding a project loaded by ID
        if (dbProjects.length > 0 && !currentProject) {
          // Check if we have a project ID in the URL
          const pathSegments = window.location.pathname.split('/')
          const projectIdFromUrl = pathSegments.length > 2 && pathSegments[1] === 'project' 
            ? Number(pathSegments[2]) 
            : null
            
          if (projectIdFromUrl) {
            // If we're on a project page, load that specific project
            const projectFromUrl = dbProjects.find(p => p.id === projectIdFromUrl)
            if (projectFromUrl) {
              setCurrentProject(projectFromUrl)
              setCode(projectFromUrl.code || '')
              setLanguage(projectFromUrl.language)
              setIsLoading(false)
              return
            }
          }
          
          // Otherwise, load the most recently updated project
          const sortedProjects = [...dbProjects].sort((a, b) => {
            return new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime()
          })
          const latestProject = sortedProjects[0]
          setCurrentProject(latestProject)
          setCode(latestProject.code || '')
          setLanguage(latestProject.language)
        } else if (dbProjects.length === 0) {
          // Create a default project if none exists
          await createNewProject("javascript")
        }
      } catch (err) {
        console.error("Failed to load projects:", err)
        setError("Failed to load projects from database")
      } finally {
        setIsLoading(false)
      }
    }
    
    loadProjects()
  }, [])

  // Create a new project
  const createNewProject = async (lang: LanguageType, options?: ProjectOptions) => {
    try {
      const timestamp = new Date().toISOString()
      const defaultCode = options?.code || DEFAULT_TEMPLATES[lang]
      const projectName = options?.name || `New ${lang.charAt(0).toUpperCase() + lang.slice(1)} Project`
      
      const newProject: Project = {
        name: projectName,
        language: lang,
        code: defaultCode,
        createdAt: timestamp,
        updatedAt: timestamp,
        versions: [
          {
            code: defaultCode,
            timestamp
          }
        ]
      }
      
      const id = await db.projects.add(newProject)
      newProject.id = id
      
      setProjects(prev => [...prev, newProject])
      setCurrentProject(newProject)
      setCode(defaultCode)
      setLanguage(lang)
      setError(null)
      
      // Don't redirect programmatically - use Next.js router instead
      return id // Return the ID so caller can navigate if needed
    } catch (err) {
      console.error("Failed to create new project:", err)
      setError("Failed to create new project")
      return null
    }
  }

  // Save current project
  const saveProject = async () => {
    if (!currentProject) return
    
    try {
      const timestamp = new Date().toISOString()
      
      // Only create a new version if code has changed
      let versions = [...(currentProject.versions || [])]
      if (!versions.length || versions[versions.length - 1].code !== code) {
        versions.push({
          code,
          timestamp
        })
      }
      
      const updatedProject = {
        ...currentProject,
        code,
        updatedAt: timestamp,
        versions
      }
      
      await db.projects.update(currentProject.id!, updatedProject)
      
      const updatedProjects = projects.map(p => {
        if (p.id === currentProject.id) {
          return updatedProject
        }
        return p
      })
      
      setProjects(updatedProjects)
      setCurrentProject(updatedProject)
      setError(null)
    } catch (err) {
      console.error("Failed to save project:", err)
      setError("Failed to save project")
    }
  }

  // Change to a different project
  const changeProject = (id: number): boolean => {
    try {
      // Find the project in the existing projects array
      const project = projects.find(p => p.id === id)
      
      if (!project) {
        return false
      }
      
      setCurrentProject(project)
      setCode(project.code || '')
      setLanguage(project.language)
      return true
    } catch (err) {
      console.error("Failed to change project:", err)
      return false
    }
  }
  
  // Update project name
  const updateProjectName = async (id: number, name: string) => {
    try {
      await db.projects.update(id, { name })
      
      const updatedProjects = projects.map(p => {
        if (p.id === id) {
          return { ...p, name }
        }
        return p
      })
      
      setProjects(updatedProjects)
      
      if (currentProject && currentProject.id === id) {
        setCurrentProject({ ...currentProject, name })
      }
      
      setError(null)
    } catch (err) {
      console.error("Failed to update project name:", err)
      setError("Failed to update project name")
    }
  }
  
  // Delete project
  const deleteProject = async (id: number) => {
    try {
      await db.projects.delete(id)
      
      const updatedProjects = projects.filter(p => p.id !== id)
      setProjects(updatedProjects)
      
      if (currentProject && currentProject.id === id) {
        if (updatedProjects.length > 0) {
          const nextProject = updatedProjects[0]
          setCurrentProject(nextProject)
          setCode(nextProject.code || '')
          setLanguage(nextProject.language)
          
          // Redirect to the next project
          if (typeof window !== "undefined") {
            window.history.pushState({}, '', `/project/${nextProject.id}`)
          }
        } else {
          setCurrentProject(null)
          setCode('')
          
          // Redirect to home if no projects left
          if (typeof window !== "undefined") {
            window.history.pushState({}, '', '/')
          }
        }
      }
      
      setError(null)
    } catch (err) {
      console.error("Failed to delete project:", err)
      setError("Failed to delete project")
    }
  }

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        currentProject,
        code,
        language,
        error,
        isLoading,
        setCode,
        createNewProject,
        saveProject,
        changeProject,
        updateProjectName,
        deleteProject
      }}
    >
      {children}
    </ProjectsContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectsContext)
  if (!context) {
    throw new Error("useProjects must be used within a ProjectProvider")
  }
  return context
}