"use client"

import { Button } from "../ui/button"
import { 
  MdSave, 
  MdVisibility, 
  MdVisibilityOff, 
  MdSettings, 
  MdContentCopy,
  MdDelete,
  MdRefresh,
  MdMoreVert,
  MdCode,
  MdDownload,
  MdShare
} from "react-icons/md"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "../ui/dropdown-menu"

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
        {/* Code/Preview Toggle */}
        <div className="mr-2 bg-muted border border-border rounded-md overflow-hidden flex text-xs">
          <button 
            className={`px-3 py-1 flex items-center gap-1 transition-colors ${!showPreview ? 'bg-background text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setShowPreview(false)}
          >
            <MdCode className="h-3 w-3" />
            <span>Code</span>
          </button>
          <button 
            className={`px-3 py-1 flex items-center gap-1 transition-colors ${showPreview ? 'bg-blue-500 text-white' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setShowPreview(true)}
          >
            <MdVisibility className="h-3 w-3" />
            <span>Preview</span>
          </button>
        </div>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-auto mx-2"
              onClick={saveProject}
            >
              <MdSave className="h-4.5 w-4.5" />
              Save
            </Button>
          </TooltipTrigger>
          <TooltipContent>Save project</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={handleCopyToClipboard}
            >
              <MdContentCopy className="h-3.5 w-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copy to clipboard</TooltipContent>
        </Tooltip>

        {/* More options dropdown menu */}
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7"
                >
                  <MdMoreVert className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>More options</TooltipContent>
          </Tooltip>
          
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleDownload} className="flex items-center gap-2">
              <MdDownload className="h-4 w-4" /> Download code
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center gap-2">
              <MdShare className="h-4 w-4" /> Share project
            </DropdownMenuItem>
            
            {resetToDefault && (
              <DropdownMenuItem onClick={resetToDefault} className="flex items-center gap-2">
                <MdRefresh className="h-4 w-4" /> Reset to default
              </DropdownMenuItem>
            )}
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem 
              onClick={() => setShowDeleteDialog(true)} 
              className="text-red-500 focus:text-red-500 flex items-center gap-2"
            >
              <MdDelete className="h-4 w-4" /> Delete project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </TooltipProvider>
  )
}
