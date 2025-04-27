"use client"

import { createContext, useContext, useState, useEffect } from "react"

interface SidebarContextType {
  isOpen: boolean
  isMobile: boolean
  toggle: () => void
  open: () => void
  close: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [isOpen, setIsOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  
  const checkIsMobile = () => {
    setIsMobile(window.innerWidth < 768)
  }
  
  useEffect(() => {
    checkIsMobile()
    
    if (window.innerWidth < 768) {
      setIsOpen(false)
    }
    
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])
  
  const toggle = () => {
    setIsOpen(prev => !prev)
  }
  
  const open = () => {
    setIsOpen(true)
  }
  
  const close = () => {
    setIsOpen(false)
  }
  
  return (
    <SidebarContext.Provider value={{ isOpen, isMobile, toggle, open, close }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  
  return context
}