"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { NewProjectButton } from "@/components/NewSandbox"
import { RecentProjects } from "@/components/layout/SidebarRecentProjects"
import {
  MenuIcon,
  PanelLeftCloseIcon,
  PanelLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  SettingsIcon,
  UserIcon,
  LifeBuoyIcon,
  LogOutIcon,
  LucideFolderCode,
  BookOpen,
  CompassIcon,
  Bookmark
} from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { useSidebar } from "@/hooks/use-sidebar"
import { useProjects } from "@/hooks/use-projects"
import Image from "next/image"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { MdOutlineDashboard } from "react-icons/md"

export function Sidebar() {
  const { isOpen, isMobile, toggle, close } = useSidebar()
  const { projects } = useProjects()
  const router = useRouter()
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState({
    discover: true,
    recents: true
  })
  
  const isRootPath = ['/', '/contribute', '/learn', '/legal/terms', '/legal/privacy', '/legal/cookies', '/auth'].includes(pathname)
  
  useEffect(() => {
    if (isRootPath && isOpen) {
      close()
    }
  }, [isRootPath, isOpen, close])
  
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

  if (isRootPath) {
    return null
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
              <span className="font-medium text-foreground/50">/</span>
              <div className="flex items-center gap-2 group hover:bg-accent px-2 py-1 rounded-lg transition-colors">
                <Image
                  src="https://avatars.githubusercontent.com/u/160033214?s=400&u=6d26a45a087691c64591bd56bb6c3fe24b2b0fc9&v=4"
                  width={20}
                  height={20}
                  alt="User avatar"
                  className="rounded-full transition-transform group-hover:scale-110"
                />
                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                  probabilityzero
                </span>
              </div>
            </div>
          </div>

        <div className="px-3 py-2">
          <NewProjectButton 
            fullWidth 
            className="bg-secondary/50 hover:bg-secondary border border-accent text-center h-9 font-medium"
          />
        </div>
        
        <div className="flex flex-col px-3 pt-1">
          {/* My Projects group */}
          <div className="mt-1">
            
            <div className="mt-1 flex flex-col">
              <a 
                href="/dashboard" 
                onClick={(e) => handleNavClick(e, "/dashboard")}
                className="text-sm py-1.5 hover:text-primary px-3 rounded-md hover:bg-accent text-foreground flex items-center gap-2"
              >
                <MdOutlineDashboard className="h-3.5 w-3.5" />
                <span>Dashboard</span>
              </a>
              <a 
                href="/collections" 
                onClick={(e) => handleNavClick(e, "/collections")}
                className="text-sm py-1.5 hover:text-primary px-3 rounded-md flex items-center hover:bg-accent text-foreground gap-2"
              >
                <Bookmark className="h-3.5 w-3.5" />
                <span>Collections</span>
              </a>
            </div>
          </div>

          {/* Discover group */}
          <div className="mt-2">
            <button 
            className="flex items-center justify-between pl-2 pr-3 py-1.5 w-full text-left text-muted-foreground hover:text-foreground"
            onClick={() => toggleSection('discover')}
          >
            <span className="text-xs">Discover</span>
            {expandedSections.discover ? 
              <ChevronDownIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" /> : 
              <ChevronRightIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            }
          </button>
          
            {expandedSections.discover && (
              <div className="flex flex-col">
              <a 
                href="/explore" 
                onClick={(e) => handleNavClick(e, "/explore")}
                className="text-sm py-1.5 hover:text-primary px-3 rounded-md hover:bg-accent text-foreground flex items-center gap-2"
              >
                <CompassIcon className="h-3.5 w-3.5" />
                <span>Explore</span>
              </a>
                <a 
                  href="/browse"
                  onClick={(e) => handleNavClick(e, "/browse")} 
                  className="text-sm py-1.5 hover:text-primary px-3 rounded-md hover:bg-accent text-foreground flex items-center gap-2"
                >
                  <CompassIcon className="h-3.5 w-3.5" />
                  <span>Games</span>
                </a>
                <a 
                  href="/learn" 
                  onClick={(e) => handleNavClick(e, "/learn")}
                  className="text-sm py-1.5 hover:text-primary px-3 rounded-md hover:bg-accent text-foreground flex items-center gap-2"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Learn</span>
                </a>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-1 overflow-auto mt-4">
            <RecentProjects projects={projects} />
        </div>
        
        <div className="border-t border-border mt-auto">
          <div className="p-3 py-1.5 flex items-center justify-between">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2 px-2 py-1 h-9 w-full justify-start">
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
      
      {!isMobile && !isRootPath && (
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "fixed z-50 m-2 bg-transparent transition-all duration-300",
            isOpen ? "left-60" : "left-0"
          )}
          onClick={toggle}
          title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? <PanelLeftCloseIcon className="h-4 w-4" /> : <PanelLeftIcon className="h-4 w-4" />}
        </Button>
      )}
      
      {isMobile && !isOpen && !isRootPath && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-1 left-1 z-50"
          onClick={(e) => {
            e.stopPropagation()
            toggle()
          }}
        >
          <MenuIcon className="h-6 w-6" />
        </Button>
      )}
    </>
  )
}