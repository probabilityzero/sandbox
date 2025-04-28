"use client"

import { useEffect, useState } from "react"
import { CodeEditor } from "../code-editor"
import { JavaScriptPreview } from "./preview-engine/javascript-preview"
import { PythonPreview } from "./preview-engine/python-preview"
import { GLSLPreview } from "./preview-engine/glsl-preview"
import { ProjectSelector } from "../project-selector"
import { LanguageSelector } from "../language-selector"
import { db } from "@/lib/db"
import type { LanguageType, Project } from "@/types/project"
import { Button } from "../ui/button"
import { PlusIcon, SaveIcon } from "lucide-react"
import { getDefaultSketch } from "@/lib/default-sketch"
import { Input } from "../ui/input"
import { CodeIcon } from "../ui/icons"
import { SiJavascript, SiPython, SiWebgl } from "react-icons/si"
import { ProjectToolbar } from "./project-toolbar"

export function EditorContainer() {
  const [code, setCode] = useState<string>("")
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [error, setError] = useState<string | null>(null)
  const [language, setLanguage] = useState<LanguageType>("javascript")

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const allProjects = await db.projects.toArray()
        setProjects(allProjects)

        if (allProjects.length > 0) {
          const lastProject = allProjects[allProjects.length - 1]
          setCurrentProject(lastProject)
          setCode(lastProject.code || "")
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
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
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
        timestamp: new Date().toISOString(),
      }

      const updatedProject: Project = {
        ...currentProject,
        code,
        language,
        updatedAt: new Date().toISOString(),
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

  const handleProjectChange = async (projectId: number) => {
    try {
      if (currentProject) {
        await saveProject()
      }

      const selectedProject = await db.projects.get(projectId)
      if (selectedProject) {
        setCurrentProject(selectedProject)
        setCode(selectedProject.code || "")
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
      if (currentProject) {
        await saveProject()
      }

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
    <div className="flex flex-col h-screen">
      <div className="mt-12 mx-1 md:mx-2 rounded-t-lg border flex flex-col h-[calc(100dvh-3rem)]">
        <div className="p-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LanguageSelector language={language} onChange={handleLanguageChange} />
          </div>
          
          <div className="flex items-center gap-1">
            <ProjectToolbar showPreview={false} setShowPreview={function (show: boolean): void {
              throw new Error("Function not implemented.")
            } } saveProject={function (): void {
              throw new Error("Function not implemented.")
            } } handleDownload={function (): void {
              throw new Error("Function not implemented.")
            } } handleCopyToClipboard={function (): void {
              throw new Error("Function not implemented.")
            } } setShowDeleteDialog={function (show: boolean): void {
              throw new Error("Function not implemented.")
            } } />
          </div>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-2 rounded m-2">
            {error}
          </div>
        )}

        <div className="grid sm:grid-cols-2 flex-1 overflow-hidden">
          <CodeEditor code={code} language={language} onChange={handleCodeChange} />
          
          <div className="h-full">
            <div className="bg-muted overflow-hidden h-full">
              {renderPreview()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}