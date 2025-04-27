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
      "sticky top-0 z-10 bg-background w-full py-3",
      "transition-all duration-200",
      hasScrolled ? "shadow-md" : "bg-background/50 backdrop-blur-md",
    )}>
      <div className="container flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          {typeof title === 'string' ? (
            <h1 className="text-lg md:text-xl font-semibold ml-4">{title}</h1>
          ) : (
            title
          )}
        </div>
      </div>
    </header>
  )
}