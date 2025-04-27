"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { db } from "@/lib/db"
import type { Project, LanguageType } from "@/types/project"
import { getDefaultSketch } from "@/lib/default-sketch"

interface ProjectContextType {
  projects: Project[]
  currentProject: Project | null
  code: string
  language: LanguageType
  error: string | null
  setCode: (code: string) => void
  createNewProject: (language: LanguageType) => Promise<void>
  saveProject: () => Promise<Project | undefined>
  changeProject: (projectId: number) => Promise<void>
  changeLanguage: (language: LanguageType) => Promise<void>
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [code, setCode] = useState<string>("")
  const [language, setLanguage] = useState<LanguageType>("javascript")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const allProjects = await db.projects.toArray()
        setProjects(allProjects)

        if (allProjects.length > 0) {
          const lastProject = allProjects[allProjects.length - 1]
          setCurrentProject(lastProject)
          setCode(lastProject.code)
          setLanguage(lastProject.language || "javascript")
        } else {
          createNewProject("javascript")
        }
      } catch (err) {
        console.error("Failed to load projects:", err)
        setError("Failed to load projects from database")
      }
    }

    loadProjects()
  }, [])

  useEffect(() => {
    if (!currentProject) return

    const saveTimer = setTimeout(async () => {
      try {
        await saveProject()
      } catch (err) {
        console.error("Auto-save failed:", err)
      }
    }, 5000)

    return () => clearTimeout(saveTimer)
  }, [code, currentProject])

  const createNewProject = async (selectedLanguage: LanguageType = language) => {
    try {
      const defaultCode = getDefaultSketch(selectedLanguage)

      const newProject: Project = {
        id: Date.now(),
        name: `${selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)} Sketch ${projects.length + 1}`,
        code: defaultCode,
        language: selectedLanguage,
        createdAt: new Date(),
        updatedAt: new Date(),
        versions: [],
      }

      await db.projects.add(newProject)
      setProjects([...projects, newProject])
      setCurrentProject(newProject)
      setCode(newProject.code)
      setLanguage(selectedLanguage)
    } catch (err) {
      console.error("Failed to create new project:", err)
      setError("Failed to create new project")
    }
  }

  const saveProject = async () => {
    if (!currentProject) return

    try {
      const newVersion = {
        code: currentProject.code,
        timestamp: new Date(),
      }

      const updatedProject = {
        ...currentProject,
        code,
        language,
        updatedAt: new Date(),
        versions: [...(currentProject.versions || []), newVersion],
      }

      await db.projects.update(currentProject.id, updatedProject)
      setCurrentProject(updatedProject)
      setProjects(projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)))

      return updatedProject
    } catch (err) {
      console.error("Failed to save project:", err)
      setError("Failed to save project")
      throw err
    }
  }

  const changeProject = async (projectId: number) => {
    try {
      if (currentProject) {
        await saveProject()
      }

      const selectedProject = await db.projects.get(projectId)
      if (selectedProject) {
        setCurrentProject(selectedProject)
        setCode(selectedProject.code)
        setLanguage(selectedProject.language || "javascript")
      }
    } catch (err) {
      console.error("Failed to change project:", err)
      setError("Failed to change project")
    }
  }

  const changeLanguage = async (newLanguage: LanguageType) => {
    if (language === newLanguage) return

    try {
      if (currentProject) {
        await saveProject()
      }

      await createNewProject(newLanguage)
    } catch (err) {
      console.error("Failed to change language:", err)
      setError("Failed to change language")
    }
  }

  const value = {
    projects,
    currentProject,
    code,
    language, 
    error,
    setCode,
    createNewProject,
    saveProject,
    changeProject,
    changeLanguage,
  }

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
}

export function useProjects() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectProvider")
  }
  return context
}