"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { 
  HeartIcon, 
  Share2Icon, 
  BookmarkIcon, 
  GitForkIcon,
  ArrowLeftIcon
} from "lucide-react"
import { SiJavascript, SiPython, SiWebgl } from "react-icons/si"
import Link from "next/link"
import { CodeEditor } from "@/components/code-editor"
import { useProjects } from "@/hooks/use-projects"
import { COMMUNITY_PROJECT_CODE_SAMPLES } from "@/lib/community-samples"
import { LanguageType } from "@/types/project"

// This is a mapping to our dummy community projects
// In a real app, you'd fetch this from a database
const communityProjects = [
  {
    id: "1",
    name: "Particle System",
    language: "javascript" as LanguageType,
    author: {
      name: "Alex Smith",
      avatar: "/avatars/alex.png"
    },
    description: "Interactive particle system with force fields. This project demonstrates particle physics simulation with customizable forces and interactions.",
    stats: {
      likes: 2341,
      forks: 11432,
      views: 58976
    },
    createdAt: "2023-11-02",
    updatedAt: "2024-03-18"
  },
  {
    id: "2",
    name: "Audio Visualizer",
    language: "javascript" as LanguageType,
    author: {
      name: "Jane Doe",
      avatar: "/avatars/jane.png"
    },
    description: "Real-time audio visualization with p5.js. Use your microphone or upload audio files to create dynamic visualizations based on sound frequencies.",
    stats: {
      likes: 8241,
      forks: 13421,
      views: 127839
    },
    createdAt: "2023-08-14",
    updatedAt: "2024-04-05"
  },
  {
    id: "3",
    name: "Fractal Explorer",
    language: "python" as LanguageType,
    author: {
      name: "John Smith",
      avatar: "/avatars/john.png"
    },
    description: "Interactive fractal visualization with zoom. Explore the fascinating world of fractals with this interactive tool that allows deep zooming into Mandelbrot and Julia sets.",
    stats: {
      likes: 3142,
      forks: 6432,
      views: 42156
    },
    createdAt: "2023-12-18",
    updatedAt: "2024-02-22"
  },
  {
    id: "4",
    name: "Fluid Simulation",
    language: "glsl" as LanguageType,
    author: {
      name: "Emma Wilson",
      avatar: "/avatars/emma.png"
    },
    description: "WebGL-based fluid dynamics simulation. This shader creates realistic fluid motion with adjustable viscosity and interactive mouse controls.",
    stats: {
      likes: 4731,
      forks: 5214,
      views: 39784
    },
    createdAt: "2024-01-03",
    updatedAt: "2024-03-27"
  }
]

export default function CommunityProjectPage() {
  const { id } = useParams()
  const [project, setProject] = useState<any>(null)
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const { createNewProject } = useProjects()
  
  useEffect(() => {
    setIsLoading(true)
    
    // In a real app, this would be an API call
    const projectData = communityProjects.find(p => p.id === id)
    
    if (projectData) {
      setProject(projectData)
      // Get the sample code for this project
      const sampleCode = COMMUNITY_PROJECT_CODE_SAMPLES[projectData.id] || 
        COMMUNITY_PROJECT_CODE_SAMPLES.default[projectData.language]
      
      setCode(sampleCode)
    }
    
    setIsLoading(false)
  }, [id])
  
  const handleFork = () => {
    if (!project) return
    
    // Now using the updated createNewProject that accepts options
    createNewProject(project.language, {
      name: `Fork of ${project.name}`,
      code: code
    })
  }
  
  if (isLoading) {
    return (
      <div className="container py-16 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }
  
  if (!project) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
        <p className="text-muted-foreground mb-8">This project doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/community">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Community
          </Link>
        </Button>
      </div>
    )
  }
  
  const LanguageIcon = project.language === "javascript" ? SiJavascript :
                        project.language === "python" ? SiPython :
                        project.language === "glsl" ? SiWebgl : null
  
  return (
    <div className="container py-8">
      <div className="mb-4">
        <Link href="/community" className="text-sm text-muted-foreground hover:text-foreground flex items-center">
          <ArrowLeftIcon className="h-4 w-4 mr-1" /> 
          Back to Community
        </Link>
      </div>
      
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-6 w-6 flex items-center justify-center">
                {LanguageIcon && (
                  <LanguageIcon 
                    className={`h-5 w-5 ${
                      project.language === "javascript" ? "text-yellow-400" :
                      project.language === "python" ? "text-blue-500" :
                      "text-purple-500"
                    }`} 
                  />
                )}
              </div>
              <h1 className="text-2xl font-bold">{project.name}</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-muted overflow-hidden">
                  {project.author.avatar ? (
                    <img src={project.author.avatar} alt={project.author.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-primary to-secondary opacity-30" />
                  )}
                </div>
                <span className="text-sm text-muted-foreground">{project.author.name}</span>
              </div>
              
              <span className="text-xs text-muted-foreground">
                Last updated {new Date(project.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <HeartIcon className="h-4 w-4" />
              <span>{project.stats.likes.toLocaleString()}</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <BookmarkIcon className="h-4 w-4" />
              <span>Save</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Share2Icon className="h-4 w-4" />
              <span>Share</span>
            </Button>
            
            <Button
              onClick={handleFork}
              className="flex items-center gap-1"
              size="sm"
            >
              <GitForkIcon className="h-4 w-4" />
              <span>Fork</span>
            </Button>
          </div>
        </div>
        
        {project.description && (
          <div className="text-muted-foreground">
            {project.description}
          </div>
        )}
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted/30 p-2 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Code</span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span>View only</span>
            </div>
          </div>
          
          <div className="h-[60vh] overflow-auto">
            <CodeEditor 
              code={code}
              language={project.language}
              onChange={() => {}} // This is needed even in readOnly mode
              readOnly={true}
            />
          </div>
        </div>
      </div>
    </div>
  )
}