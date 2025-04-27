"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { NewProjectButton } from "@/components/new-project-button"
import { RecentProjects } from "@/components/recent-projects"
import {
  MenuIcon,
  PanelLeftCloseIcon,
  PanelLeftIcon,
  FolderIcon,
  UsersIcon,
  BookOpenIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  BrushIcon,
  SettingsIcon,
  UserIcon,
  LifeBuoyIcon,
  LogOutIcon,
  MenuSquareIcon,
  LucideFolderCode,
  Shapes
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSidebar } from "@/hooks/use-sidebar"
import { useProjects } from "@/hooks/use-projects"
import Image from "next/image"

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

export function Sidebar() {
  const { isOpen, isMobile, toggle, close } = useSidebar()
  const { projects } = useProjects()
  const router = useRouter()
  const [expandedSections, setExpandedSections] = useState({
    examples: false,
    tutorials: false
  })
  
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobile) close()
    }
    
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isMobile, close])

  useEffect(() => {
    if (!isMobile || !isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      const sidebar = document.getElementById("sidebar-container")
      if (sidebar && !sidebar.contains(e.target as Node)) {
        close()
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, isMobile, close])
  
  const handleNavClick = (e: React.MouseEvent, path: string) => {
    if (isMobile) {
      e.preventDefault()
      close()
      setTimeout(() => {
        router.push(path)
      }, 10)
    }
  }

  return (
    <>
      {isOpen && isMobile && (
        <div className="fixed inset-0 bg-background/80 transition-all duration-400 z-30" />
      )}
      
      {!isMobile && (
        <div 
          className={cn(
            "h-screen border-r border-border bg-background transition-all duration-300",
            isOpen ? "w-60" : "w-0 overflow-hidden opacity-0"
          )}
        />
      )}
      
      <div 
        id="sidebar-container"
        className={cn(
          "top-0 bottom-0 bg-background border-r border-border z-40 flex flex-col h-screen",
          isMobile ? "fixed" : "fixed", 
          isOpen ? (isMobile ? "w-[280px]" : "w-60") : "w-0",
          isOpen ? "left-0" : "-left-80", 
          "transition-all duration-200"
        )}
      >
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 flex items-center justify-center">
              <Image 
                src="/cube-logo.svg" 
                width={24} 
                height={24} 
                alt="Grid Sandbox Logo" 
              />
            </div>
            <span className="font-medium text-foreground">Grid Sandbox</span>
          </div>
        </div>
        
        <div className="px-3 py-2">
          <NewProjectButton 
            fullWidth 
            className="bg-secondary/50 hover:bg-secondary border-accent text-center h-9 font-medium"
          />
        </div>
        
        <div className="flex flex-col px-3 pt-1">
          <a 
            href="/dashboard" 
            onClick={(e) => handleNavClick(e, "/dashboard")}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-accent text-foreground"
          >
            <LucideFolderCode className="h-4 w-4" />
            <span className="text-sm">My Projects</span>
          </a>
          
          <a
            href="/community" 
            onClick={(e) => handleNavClick(e, "/community")}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-accent text-foreground"
          >
            <Shapes className="h-4 w-4" />
            <span className="text-sm">Community</span>
          </a>
        </div>

        <div className="flex flex-col px-3 py-2">
          <button 
            className="flex items-center justify-between px-3 py-1.5 rounded-md hover:bg-accent text-foreground"
            onClick={() => toggleSection('examples')}
          >
            <div className="flex items-center gap-2">
              <BrushIcon className="h-4 w-4" />
              <span className="text-sm">Examples</span>
            </div>
            {expandedSections.examples ? 
              <ChevronDownIcon className="h-4 w-4" /> : 
              <ChevronRightIcon className="h-4 w-4" />
            }
          </button>
          
          <button 
            className="flex items-center justify-between px-3 py-1.5 group-hover:text-foreground rounded-md hover:bg-accent text-foreground"
            onClick={() => toggleSection('tutorials')}
          >
            <div className="flex items-center gap-2">
              <BookOpenIcon className="h-4 w-4" />
              <span className="text-sm">Tutorials</span>
            </div>
            {expandedSections.tutorials ? 
              <ChevronDownIcon className="h-4 w-4" /> : 
              <ChevronRightIcon className="h-4 w-4" />
            }
          </button>
        </div>
        
        <div className="flex-1 overflow-auto mt-2">
          <RecentProjects projects={projects} />
        </div>
        
        <div className="border-t border-border mt-auto">
          <div className="p-3 flex items-center justify-between">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2 px-3 py-1.5 h-9 w-full justify-start">
                  <SettingsIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Settings</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex justify-between cursor-default">
                  Theme
                  <ThemeToggle />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <UserIcon className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LifeBuoyIcon className="h-4 w-4 mr-2" />
                    Support
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOutIcon className="h-4 w-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      {!isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "fixed z-50 m-2 bg-background transition-all duration-300",
            isOpen ? "left-60" : "left-0"
          )}
          onClick={toggle}
          title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? <PanelLeftCloseIcon className="h-4 w-4" /> : <PanelLeftIcon className="h-4 w-4" />}
        </Button>
      )}
      
      {isMobile && !isOpen && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-1 left-1 z-50"
          onClick={(e) => {
            e.stopPropagation()
            toggle()
          }}
        >
          <MenuSquareIcon className="h-6 w-6" />
        </Button>
      )}
    </>
  )
}