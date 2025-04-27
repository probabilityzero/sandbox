"use client"

import { useState, useEffect, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface HeaderProps {
  title: string | ReactNode;
  actions?: ReactNode;
}

export function Header({ title, actions }: HeaderProps) {
  const [hasScrolled, setHasScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  return (
    <header className={cn(
      "sticky top-0 z-10 bg-background w-full py-4",
      "transition-all duration-200",
      hasScrolled ? "border-b shadow-sm" : ""
    )}>
      <div className="container flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          {typeof title === 'string' ? (
            <h1 className="text-xl md:text-2xl font-semibold">{title}</h1>
          ) : (
            title
          )}
        </div>
        
        {actions && (
          <div className="flex items-center gap-2 w-full md:w-auto">
            {actions}
          </div>
        )}
      </div>
    </header>
  )
}