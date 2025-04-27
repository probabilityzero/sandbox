"use client"

import { Button } from "../ui/button"
import { 
  SaveIcon, 
  EyeIcon, 
  EyeOffIcon, 
  DownloadIcon, 
  SettingsIcon, 
  CopyIcon,
  Share2Icon,
  TrashIcon,
  RefreshCcw
} from "lucide-react"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../ui/tooltip"

interface ProjectToolbarProps {
  showPreview: boolean
  setShowPreview: (show: boolean) => void
  saveProject: () => void
  handleDownload: () => void
  handleCopyToClipboard: () => void
  setShowDeleteDialog: (show: boolean) => void
  resetToDefault?: () => void
}

export function ProjectToolbar({
  showPreview,
  setShowPreview,
  saveProject,
  handleDownload,
  handleCopyToClipboard,
  setShowDeleteDialog,
  resetToDefault
}: ProjectToolbarProps) {
  return (
    <TooltipProvider>
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
        
        {resetToDefault && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={resetToDefault}
              >
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reset to default</TooltipContent>
          </Tooltip>
        )}
        
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
  )
}