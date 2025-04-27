"use client"

import { CodeEditor } from "./code-editor"
import { JavaScriptPreview } from "./engine/javascript-preview"
import { PythonPreview } from "./engine/python-preview"
import { GLSLPreview } from "./engine/glsl-preview"
import { ProjectSelector } from "./project-selector"
import { useProjects } from "@/hooks/use-projects"
import { useSidebar } from "@/hooks/use-sidebar"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Toggle } from "./ui/toggle"
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
} from "./ui/tooltip"
import { SiJavascript, SiPython, SiWebgl } from "react-icons/si"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog"

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
  const { isMobile, isOpen, toggle } = useSidebar()
  const [showPreview, setShowPreview] = useState(true)
  const [projectName, setProjectName] = useState(currentProject?.name || "Untitled Project")
  const [isEditingName, setIsEditingName] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  
  useEffect(() => {
    if (currentProject?.name) {
      setProjectName(currentProject.name)
    }
  }, [currentProject])

  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
  }

  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value)
  }
  
  const handleProjectNameBlur = () => {
    setIsEditingName(false)
    if (currentProject && projectName !== currentProject.name) {
      updateProjectName(currentProject.id!, projectName)
    }
  }
  
  const handleProjectNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditingName(false)
      if (currentProject && projectName !== currentProject.name) {
        updateProjectName(currentProject.id!, projectName)
      }
    }
  }

  const handleDownload = useCallback(() => {
    let filename = ''
    let fileContent = ''
    
    switch (language) {
      case "javascript":
        filename = `${projectName || 'sketch'}.js`
        fileContent = code
        break
      case "python":
        filename = `${projectName || 'sketch'}.py`
        fileContent = code
        break
      case "glsl":
        filename = `${projectName || 'sketch'}.glsl`
        fileContent = code
        break
    }
    
    const blob = new Blob([fileContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, [code, language, projectName])

  const handleCopyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(code)
      .then(() => {
        console.log('Code copied to clipboard')
        // Could show a toast notification here
      })
      .catch(err => {
        console.error('Failed to copy code: ', err)
      })
  }, [code])
  
  const handleDeleteProject = () => {
    if (currentProject) {
      deleteProject(currentProject.id!)
      setShowDeleteDialog(false)
    }
  }

  const renderPreview = () => {
    if (!showPreview) return null
    
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

  const renderLanguageIcon = () => {
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

  return (
    <div className={cn("flex flex-col min-h-dvh w-full")}>
      <div className="h-14 p-2 flex items-center">
        <div className="flex-1 flex items-center justify-center">
          <ProjectSelector projects={projects} currentProject={currentProject} onProjectChange={changeProject} />
        </div>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-2 rounded m-2">
          {error}
        </div>
      )}

      <div className="bg-muted/30 border-b p-2 mx-1 sm:mx-2 rounded-t-md flex flex-wrap items-center gap-2">
        <TooltipProvider>
          <div className="flex items-center gap-2 flex-1">
            <span className="flex items-center justify-center w-6 h-6">
              {renderLanguageIcon()}
            </span>
            {isEditingName ? (
              <Input 
                value={projectName}
                onChange={handleProjectNameChange}
                onBlur={handleProjectNameBlur}
                onKeyDown={handleProjectNameKeyDown}
                className="h-8 w-[200px] text-sm"
                autoFocus
              />
            ) : (
              <div 
                className="h-8 px-3 py-1 flex items-center border border-transparent hover:border-border rounded-md cursor-pointer"
                onClick={() => setIsEditingName(true)}
                title="Click to edit project name"
              >
                <span className="text-sm font-medium truncate max-w-[200px]">{projectName}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8" 
                  onClick={() => setShowPreview(!showPreview)}
                >
                  {showPreview ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {showPreview ? "Hide preview" : "Show preview"}
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={saveProject}
                >
                  <SaveIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Save project</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleDownload}
                >
                  <DownloadIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Download code</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleCopyToClipboard}
                >
                  <CopyIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy to clipboard</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                >
                  <Share2Icon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share project</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                >
                  <SettingsIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Project settings</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500 hover:text-red-600"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete project</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>

      <div className={cn(
        "grid flex-1 overflow-hidden mx-1 sm:mx-2",
        showPreview ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
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
      
      {/* Delete confirmation dialog */}
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
            <AlertDialogAction onClick={handleDeleteProject} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
