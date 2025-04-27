"use client"

import { useEffect, useState } from "react"
import { CodeEditor } from "./code-editor"
import { JavaScriptPreview } from "./javascript-preview"
import { PythonPreview } from "./python-preview"
import { GLSLPreview } from "./glsl-preview"
import { ProjectSelector } from "./project-selector"
import { LanguageSelector } from "./language-selector"
import { db } from "@/lib/db"
import type { LanguageType, Project } from "@/types/project"
import { Button } from "../components/ui/button"
import { PlusIcon, SaveIcon } from "lucide-react"
import { getDefaultSketch } from "@/lib/default-sketch"

export function EditorContainer() {
  const [code, setCode] = useState<string>("")
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [error, setError] = useState<string | null>(null)
  const [language, setLanguage] = useState<LanguageType>("javascript")

  // Load projects on mount
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const allProjects = await db.projects.toArray()
        setProjects(allProjects)

        // Load the last project or create a default one if none exists
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

  // Auto-save changes every 5 seconds
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
      // Create a new version
      const newVersion = {
        code: currentProject.code,
        timestamp: new Date(),
      }

      // Update the project
      const updatedProject = {
        ...currentProject,
        code,
        language,
        updatedAt: new Date(),
        versions: [...(currentProject.versions || []), newVersion],
      }

      await db.projects.update(currentProject.id, updatedProject)
      setCurrentProject(updatedProject)

      // Update projects list
      setProjects(projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)))

      return updatedProject
    } catch (err) {
      console.error("Failed to save project:", err)
      setError("Failed to save project")
      throw err
    }
  }

  const handleProjectChange = async (projectId: number) => {
    try {
      // Save current project first
      if (currentProject) {
        await saveProject()
      }

      // Load selected project
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

  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
    setError(null)
  }

  const handleLanguageChange = async (newLanguage: LanguageType) => {
    if (language === newLanguage) return

    try {
      // Save current project first
      if (currentProject) {
        await saveProject()
      }

      // Create a new project with the selected language
      await createNewProject(newLanguage)
    } catch (err) {
      console.error("Failed to change language:", err)
      setError("Failed to change language")
    }
  }

  const renderPreview = () => {
    switch (language) {
      case "javascript":
        return <JavaScriptPreview code={code} />
      case "python":
        return <PythonPreview code={code} />
      case "glsl":
        return <GLSLPreview code={code} />
      default:
        return <JavaScriptPreview code={code} />
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="border-b p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ProjectSelector projects={projects} currentProject={currentProject} onProjectChange={handleProjectChange} />
          <Button size="sm" variant="outline" onClick={() => createNewProject()}>
            <PlusIcon className="h-4 w-4 mr-1" />
            New
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSelector language={language} onChange={handleLanguageChange} />
          <Button size="sm" onClick={saveProject}>
            <SaveIcon className="h-4 w-4 mr-1" />
            Save
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-2 rounded m-2">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 flex-1 overflow-hidden">
        <CodeEditor code={code} language={language} onChange={handleCodeChange} />
        {renderPreview()}
      </div>
    </div>
  )
}
