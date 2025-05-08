"use client"

import { useState, useEffect, ReactNode } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link";

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
      "sticky top-0 z-10 bg-background w-full",
      "transition-all duration-200",
      hasScrolled ? "shadow-md bg-background/50 backdrop-blur-md border-b" : "",
    )}>
      <div className="container flex flex-row items-center justify-between gap-4 h-14">
                <h1 className="text-lg md:text-xl font-semibold ml-4">{title}</h1>
                <div className="flex space-x-4 text-sm font-medium text-muted-foreground">
                  <Link href="/explore/submissions">My Submissions</Link>
                </div>
              </div>
    </header>
  )
}