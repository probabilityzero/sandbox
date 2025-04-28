"use client"

import { CodeEditor } from "./code-editor"
import { JavaScriptPreview } from "./preview-engine/p5Engine"
import { PythonPreview } from "./preview-engine/PyEngine"
import { GLSLPreview } from "./preview-engine/GLSLEngine"
import { useProjects } from "@/hooks/use-projects"
import { useSidebar } from "@/hooks/use-sidebar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { 
  SaveIcon, 
  EyeIcon, 
  EyeOffIcon, 
  DownloadIcon, 
  CodeIcon, 
  SettingsIcon, 
  CopyIcon,
  Share2Icon,
  TrashIcon
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useCallback, useEffect } from "react"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../ui/tooltip"
import { SiJavascript, SiPython, SiWebgl } from "react-icons/si"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog"
import { ProjectToolbar } from "./SandboxToolbar"
import { getDefaultSketch } from "@/lib/default-sketch"

export function EditorContainer() {
  const { 
    code, 
    language, 
    error, 
    currentProject, 
    projects, 
    setCode, 
    saveProject, 
    changeProject,
    updateProjectName,
    deleteProject
  } = useProjects()
  const { isMobile } = useSidebar()
  const [showPreview, setShowPreview] = useState(true)
  const [projectName, setProjectName] = useState("")
  const [isEditingName, setIsEditingName] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  
  useEffect(() => {
    if (currentProject?.name) {
      setProjectName(currentProject.name)
    }
  }, [currentProject])

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode)
  }, [setCode])

  const handleProjectNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value)
  }, [])
  
  const handleProjectNameBlur = useCallback(() => {
    if (currentProject && projectName.trim() !== currentProject.name) {
      updateProjectName(currentProject.id!, projectName.trim() || "Untitled Project")
    }
    setIsEditingName(false)
  }, [currentProject, projectName, updateProjectName])
  
  const handleProjectNameKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleProjectNameBlur()
    } else if (e.key === 'Escape') {
      setProjectName(currentProject?.name || "Untitled Project")
      setIsEditingName(false)
    }
  }, [currentProject, handleProjectNameBlur])
  
  const renderPreview = useCallback(() => {
    switch (language) {
      case "javascript":
        return <JavaScriptPreview code={code} />
      case "python":
        return <PythonPreview code={code} />
      case "glsl":
        return <GLSLPreview code={code} />
      default:
        return <div>Preview not available for this language</div>
    }
  }, [code, language])

  const handleResetToDefault = useCallback(() => {
    const defaultCode = getDefaultSketch(language)
    setCode(defaultCode)
  }, [language, setCode])

  return (
    <div className="flex flex-col h-screen">
      <div className="mt-12 mx-1 md:mx-2 rounded-t-lg border flex flex-col h-[calc(100dvh-3rem)]">
        <div className="p-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5">
              {language === "javascript" ? <SiJavascript className="h-3 w-3 text-yellow-400" /> : 
               language === "python" ? <SiPython className="h-3 w-3 text-blue-500" /> : 
               language === "glsl" ? <SiWebgl className="h-3 w-3 text-purple-500" /> : 
               <CodeIcon className="h-3 w-3" />}
            </span>
            {isEditingName ? (
              <Input 
                value={projectName}
                onChange={handleProjectNameChange}
                onBlur={handleProjectNameBlur}
                onKeyDown={handleProjectNameKeyDown}
                className="h-7 w-auto ring-0 text-xs"
                autoFocus
              />
            ) : (
              <div 
                className="h-7 px-2 py-1 flex items-center rounded-md cursor-pointer"
                onClick={() => setIsEditingName(true)}
                title="Click to edit project name"
              >
                <span className="text-xs font-medium truncate max-w-[160px]">{projectName}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <ProjectToolbar 
              showPreview={showPreview}
              setShowPreview={setShowPreview}
              saveProject={saveProject}
              handleDownload={() => {
                let filename = `${projectName || 'sketch'}.${language === "javascript" ? "js" : language === "python" ? "py" : "glsl"}`
                const blob = new Blob([code], { type: 'text/plain' })
                const url = URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.download = filename
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                URL.revokeObjectURL(url)
              }}
              handleCopyToClipboard={() => {
                navigator.clipboard.writeText(code)
                  .then(() => console.log('Code copied to clipboard'))
                  .catch(err => console.error('Failed to copy code: ', err))
              }}
              setShowDeleteDialog={setShowDeleteDialog}
              resetToDefault={handleResetToDefault}
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-2 rounded m-2">
            {error}
          </div>
        )}

        <div className={cn(
          "grid flex-1 overflow-hidden border-t",
          showPreview ? "sm:grid-cols-2" : "grid-cols-1"
        )}>
          <CodeEditor code={code} language={language} onChange={handleCodeChange} />
          
          {showPreview && (
            <div className="h-full">
              <div className="bg-muted overflow-hidden h-full">
                {renderPreview()}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this project?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              "{projectName}" project and remove all of its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              if (currentProject) {
                deleteProject(currentProject.id!)
                setShowDeleteDialog(false)
              }
            }} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
