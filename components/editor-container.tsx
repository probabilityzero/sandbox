"use client"

import { CodeEditor } from "./code-editor"
import { JavaScriptPreview } from "./engine/javascript-preview"
import { PythonPreview } from "./engine/python-preview"
import { GLSLPreview } from "./engine/glsl-preview"
import { ProjectSelector } from "./project-selector"
import { useProjects } from "@/hooks/use-projects"
import { useSidebar } from "@/hooks/use-sidebar"
import { Button } from "./ui/button"
import { SaveIcon, MenuIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function EditorContainer() {
  const { code, language, error, currentProject, projects, setCode, saveProject, changeProject } = useProjects()
  const { isMobile, isOpen, toggle } = useSidebar()

  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
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
    <div className={cn(
      "flex flex-col min-h-dvh w-full",
    )}>
      <div className="h-14 p-2 flex items-center">
        
        <div className="flex-1 flex items-center justify-center">
          <ProjectSelector projects={projects} currentProject={currentProject} onProjectChange={changeProject} />
        </div>
        
        {/* Right aligned save button with proper spacing */}
        <div className="flex items-center">
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

      <div className="grid grid-cols-1 md:grid-cols-2 flex-1 overflow-hidden mx-1 sm:mx-2 rounded-t-md">
        <CodeEditor code={code} language={language} onChange={handleCodeChange} />
        <div className="h-full">
          <div className="bg-muted overflow-hidden h-full">
            {renderPreview()}
          </div>
        </div>
      </div>
    </div>
  )
}
