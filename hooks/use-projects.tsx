"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import type { Project, LanguageType } from "@/types/project"
import { db } from "@/lib/db"

// Default code templates for different languages
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

interface ProjectsContextType {
  projects: Project[]
  currentProject: Project | null
  code: string
  language: LanguageType
  error: string | null
  setCode: (code: string) => void
  createNewProject: (language: LanguageType) => void
  saveProject: () => void
  changeProject: (id: number) => void
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

  // Load projects from database
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const dbProjects = await db.projects.toArray()
        setProjects(dbProjects)
        
        // If there are projects, select the most recently updated one
        if (dbProjects.length > 0) {
          const sortedProjects = [...dbProjects].sort((a, b) => {
            return new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime()
          })
          const latestProject = sortedProjects[0]
          setCurrentProject(latestProject)
          setCode(latestProject.code || '')
          setLanguage(latestProject.language)
        } else {
          // Create a default project if none exists
          createNewProject("javascript")
        }
      } catch (err) {
        console.error("Failed to load projects:", err)
        setError("Failed to load projects from database")
      }
    }
    
    loadProjects()
  }, [])

  // Create a new project
  const createNewProject = async (lang: LanguageType) => {
    try {
      const newProject: Project = {
        name: `New ${lang.charAt(0).toUpperCase() + lang.slice(1)} Project`,
        language: lang,
        code: DEFAULT_TEMPLATES[lang],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        versions: [] // Add the missing versions property as an empty array
      }
      
      const id = await db.projects.add(newProject)
      newProject.id = id
      
      setProjects([...projects, newProject])
      setCurrentProject(newProject)
      setCode(newProject.code || '')
      setLanguage(newProject.language)
      setError(null)
    } catch (err) {
      console.error("Failed to create new project:", err)
      setError("Failed to create new project")
    }
  }

  // Save current project
  const saveProject = async () => {
    if (!currentProject) return
    
    try {
      const updatedProject = {
        ...currentProject,
        code,
        updatedAt: new Date().toISOString()
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
  const changeProject = async (id: number) => {
    try {
      // Save current project first
      if (currentProject) {
        await saveProject()
      }
      
      const project = await db.projects.get(id)
      if (project) {
        setCurrentProject(project)
        setCode(project.code || '')
        setLanguage(project.language)
        setError(null)
      }
    } catch (err) {
      console.error("Failed to change project:", err)
      setError("Failed to load selected project")
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
        } else {
          setCurrentProject(null)
          setCode('')
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