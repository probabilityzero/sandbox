"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SiteHeaderProps {
  showDashboard?: boolean
  showBreadcrumb?: boolean
  breadcrumbText?: string
  showHomeNav?: boolean
}

export function SiteHeader({
  showDashboard = false,
  showBreadcrumb = false,
  breadcrumbText = "",
  showHomeNav = false,
}: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background transition-all", 
        scrolled ? "backdrop-blur-md bg-background/90" : ""
      )}
    >
      <div className="container flex items-center justify-between h-14">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <div className="h-7 w-7 flex items-center justify-center">
              <Image 
                src="/cube-logo.svg" 
                width={24} 
                height={24} 
                alt="Grid Sandbox Logo" 
              />
            </div>
            <span className="font-medium ml-2">Sandbox</span>
          </Link>

          {showBreadcrumb && (
            <>
              <span className="text-muted-foreground">/</span>
              <span className="font-medium">{breadcrumbText}</span>
            </>
          )}
        </div>
        
        {showHomeNav && (
          <nav className="hidden md:flex gap-6">
            <Link href="/explore" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Explore
            </Link>
            <Link href="/learn" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Learn
            </Link>
            <Link href="/contribute" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contribute
            </Link>
          </nav>
        )}
        
        <div className="flex gap-3">
          {showDashboard ? (
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/auth?login">Sign In</Link>
              </Button>
              <Button asChild className="py-1 my-1 px-4">
                <Link href="/auth?signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}