"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { NewProjectButton } from "@/components/new-project-button"
import { MenuIcon, XIcon, PanelLeftCloseIcon, PanelLeftIcon } from "lucide-react"
import Link from "next/link"
import { useSidebar } from "@/hooks/use-sidebar"

export function Sidebar() {
  const { isOpen, isMobile, toggle, close } = useSidebar()

  useEffect(() => {
    // Close sidebar when pressing escape on mobile
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobile) close()
    }
    
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isMobile, close])

  useEffect(() => {
    // Close sidebar when clicking outside on mobile
    if (!isMobile || !isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      // Check if the click was outside the sidebar
      const sidebar = document.getElementById("sidebar-container")
      if (sidebar && !sidebar.contains(e.target as Node)) {
        close()
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, isMobile, close])

  return (
    <>
      {/* Mobile overlay - only used on mobile */}
      {isOpen && isMobile && (
        <div className="fixed inset-0 bg-black/20 z-30" />
      )}
      
      {/* Desktop sidebar - part of the layout flow */}
      {!isMobile && (
        <div 
          className={cn(
            "h-screen border-r bg-background transition-all duration-300",
            isOpen ? "w-64" : "w-0 overflow-hidden opacity-0"
          )}
        />
      )}
      
      {/* Sidebar contents - fixed on mobile, absolute on desktop */}
      <div 
        id="sidebar-container"
        className={cn(
          "top-0 bottom-0 bg-background border-r z-40 flex flex-col h-screen",
          isMobile ? "fixed" : "absolute", 
          isOpen ? (isMobile ? "w-[280px]" : "w-64") : "w-0",
          isOpen ? "left-0" : "-left-80", 
          "transition-all duration-300"
        )}
      >
        <div className="flex items-center justify-between p-4 h-14">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-xl font-bold justify-between items-center">Sandbox</h1>
          </Link>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={close}>
              <XIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="flex flex-col space-y-4 p-4 flex-1">
          <NewProjectButton fullWidth />
        </div>
        
        <div className="p-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
      
      {/* Toggle button for desktop */}
      {!isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "fixed z-50 m-3 bg-background shadow-sm transition-all duration-300",
            isOpen ? "left-64" : "left-0"
          )}
          onClick={toggle}
          title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? <PanelLeftCloseIcon className="h-4 w-4" /> : <PanelLeftIcon className="h-4 w-4" />}
        </Button>
      )}
      
      {/* Mobile toggle button - only shown when sidebar is closed */}
      {isMobile && !isOpen && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-3 left-3 z-50"
          onClick={(e) => {
            e.stopPropagation()
            toggle()
          }}
        >
          <MenuIcon className="h-4 w-4" />
        </Button>
      )}
    </>
  )
}