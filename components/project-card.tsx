"use client"

import { cn } from "@/lib/utils"
import { SiJavascript, SiPython, SiWebgl } from "react-icons/si"
import Link from "next/link"
import { LanguageType } from "@/types/project"

export type ProjectCardProps = {
  id: number | string
  title: string
  description?: string
  language: LanguageType
  image?: string
  updatedAt?: string
  isCommunity?: boolean
  author?: {
    name: string
    avatar?: string
  }
  stats?: {
    forks?: string | number
    likes?: string | number
    views?: string | number
  }
  isCurrent?: boolean
  onClick?: () => void
}

export function ProjectCard({
  id,
  title,
  description,
  language,
  image,
  updatedAt,
  isCommunity = false,
  author,
  stats,
  isCurrent,
  onClick
}: ProjectCardProps) {
  
  const getLanguageIcon = () => {
    switch (language) {
      case "javascript":
        return <SiJavascript className="h-4 w-4 text-yellow-400" />
      case "python":
        return <SiPython className="h-4 w-4 text-blue-500" />
      case "glsl":
        return <SiWebgl className="h-4 w-4 text-purple-500" />
      default:
        return null
    }
  }
  
  const getLanguageName = () => {
    switch (language) {
      case "javascript": return "JavaScript"
      case "python": return "Python"
      case "glsl": return "GLSL"
      default: return language
    }
  }
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return ""
    
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date)
  }
  
  const cardContent = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden bg-muted rounded-lg">
        {image ? (
          <div 
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
        ) : (
          <div className={cn(
            "h-full w-full flex items-center justify-center",
            language === "javascript" ? "bg-gradient-to-br from-yellow-900/20 to-yellow-800/5" : "",
            language === "python" ? "bg-gradient-to-br from-blue-900/20 to-blue-800/5" : "",
            language === "glsl" ? "bg-gradient-to-br from-purple-900/20 to-purple-800/5" : "",
          )}>
            {language === "javascript" && <SiJavascript className="h-16 w-16 text-yellow-600/20" />}
            {language === "python" && <SiPython className="h-16 w-16 text-blue-600/20" />}
            {language === "glsl" && <SiWebgl className="h-16 w-16 text-purple-600/20" />}
          </div>
        )}
        
        {/* Language badge */}
        <div className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium bg-black/60 text-white">
          {getLanguageName()}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium mb-1 line-clamp-1">{title}</h3>
        
        {description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
        )}
        
        <div className="flex items-center justify-between">
          {isCommunity ? (
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-muted overflow-hidden">
                {author?.avatar ? (
                  <img src={author.avatar} alt={author.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-primary to-secondary opacity-30" />
                )}
              </div>
              <span className="text-xs text-muted-foreground">{author?.name || "Anonymous"}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {getLanguageIcon()}
              {updatedAt && (
                <span className="text-xs text-muted-foreground">
                  {formatDate(updatedAt)}
                </span>
              )}
            </div>
          )}
          
          {isCommunity && stats?.forks && (
            <div className="text-sm text-muted-foreground">
              {stats.forks} Forks
            </div>
          )}
          
          {isCurrent && (
            <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
              Current
            </span>
          )}
        </div>
      </div>
    </>
  )
  
  const linkHref = isCommunity 
    ? `/community/project/${id}` 
    : `/project/${id}`
  
  return (
    <div className="group overflow-hidden transition-colors">
      {onClick ? (
        <button 
          onClick={onClick} 
          className="block w-full text-left cursor-pointer"
        >
          {cardContent}
        </button>
      ) : (
        <Link href={linkHref} className="block">
          {cardContent}
        </Link>
      )}
    </div>
  )
}