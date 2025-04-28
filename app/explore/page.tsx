"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ChevronDownIcon, SearchIcon } from "lucide-react"
import Link from "next/link"
import { ProjectCard, ProjectCardProps } from "@/components/SandboxCards"
import { Header } from "@/components/layout/Header"

const communityProjects: ProjectCardProps[] = [
  {
    id: 1,
    title: "Particle System",
    description: "Interactive particle system with force fields",
    image: "/templates/particle-system.png",
    language: "javascript",
    author: {
      name: "Alex Smith",
      avatar: "/avatars/alex.png"
    },
    stats: {
      forks: "11.4K",
      likes: "2.3K"
    },
    isCommunity: true
  },
  {
    id: 2,
    title: "Audio Visualizer",
    description: "Real-time audio visualization with p5.js",
    image: "/templates/audio-visualizer.png",
    language: "javascript",
    author: {
      name: "Jane Doe",
      avatar: "/avatars/jane.png"
    },
    stats: {
      forks: "13.4K",
      likes: "8.2K"
    },
    isCommunity: true
  },
  {
    id: 3,
    title: "Fractal Explorer",
    description: "Interactive fractal visualization with zoom",
    image: "/templates/fractal-explorer.png",
    language: "python",
    author: {
      name: "John Smith",
      avatar: "/avatars/john.png"
    },
    stats: {
      forks: "6.4K",
      likes: "3.1K"
    },
    isCommunity: true
  },
  {
    id: 4,
    title: "Fluid Simulation",
    description: "WebGL-based fluid dynamics simulation",
    image: "/templates/fluid-simulation.png",
    language: "glsl",
    author: {
      name: "Emma Wilson",
      avatar: "/avatars/emma.png"
    },
    stats: {
      forks: "5.2K",
      likes: "4.7K"
    },
    isCommunity: true
  },
  {
    id: 5,
    title: "Neural Network Visualizer",
    description: "Interactive neural network visualization",
    image: "/templates/neural-network.png",
    language: "python",
    author: {
      name: "Michael Brown",
      avatar: "/avatars/michael.png"
    },
    stats: {
      forks: "9.8K",
      likes: "5.6K"
    },
    isCommunity: true
  },
  {
    id: 6,
    title: "Procedural Terrain",
    description: "3D procedural terrain generation with heightmaps",
    image: "/templates/procedural-terrain.png",
    language: "javascript",
    author: {
      name: "Sarah Johnson",
      avatar: "/avatars/sarah.png"
    },
    stats: {
      forks: "7.6K",
      likes: "4.2K"
    },
    isCommunity: true
  },
  {
    id: 7,
    title: "Ray Marching Demo",
    description: "Real-time ray marching with signed distance functions",
    image: "/templates/ray-marching.png",
    language: "glsl",
    author: {
      name: "David Lee",
      avatar: "/avatars/david.png"
    },
    stats: {
      forks: "3.9K",
      likes: "2.8K"
    },
    isCommunity: true
  },
  {
    id: 8,
    title: "Physics Playground",
    description: "Interactive physics simulation with custom forces",
    image: "/templates/physics.png",
    language: "javascript",
    author: {
      name: "Lisa Chen",
      avatar: "/avatars/lisa.png"
    },
    stats: {
      forks: "8.5K",
      likes: "6.1K"
    },
    isCommunity: true
  },
  {
    id: 9,
    title: "Data Visualization Toolkit",
    description: "Modular components for interactive data visualization",
    image: "/templates/data-viz.png",
    language: "javascript",
    author: {
      name: "Robert Kim",
      avatar: "/avatars/robert.png"
    },
    stats: {
      forks: "12.2K",
      likes: "7.8K"
    },
    isCommunity: true
  }
]

export default function Community() {
  const [searchTerm, setSearchTerm] = useState("")
  
  const filteredProjects = searchTerm 
    ? communityProjects.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : communityProjects

  const headerTitle = (
    <div className="flex justify-between items-center">
      <h1 className="text-lg md:text-xl font-semibold ml-4">Community</h1>
      <div className="flex space-x-4 text-sm font-medium text-muted-foreground">
        <Link href="/community/submissions">My Submissions</Link>
      </div>
    </div>
  )
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header title={headerTitle} />
      
      <div className="container py-8 space-y-8">
        {/* Icons and header */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
            <span className="text-2xl">🎨</span>
          </div>
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded">
            <span className="text-2xl">🔍</span>
          </div>
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded">
            <span className="text-2xl">🧩</span>
          </div>
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded">
            <span className="text-2xl">🔮</span>
          </div>
          <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded">
            <span className="text-2xl">🚀</span>
          </div>
        </div>
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Discover creative coding examples from our community.
          </h2>
          <p className="text-muted-foreground">
            Explore and learn from projects created by other creative coders. Fork any project to remix and make it your own.
          </p>
        </div>
        
        {/* Search bar */}
        <div className="relative max-w-2xl mx-auto w-full">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search projects..." 
            className="pl-10 py-6 text-base rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="flex justify-center bg-transparent space-x-1 overflow-x-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="glsl">GLSL</TabsTrigger>
            <TabsTrigger value="generative">Generative</TabsTrigger>
            <TabsTrigger value="interactive">Interactive</TabsTrigger>
            <TabsTrigger value="data">Data Viz</TabsTrigger>
          </TabsList>
          
          <div className="flex justify-end mt-6">
            <Button variant="outline" className="flex items-center gap-1">
              Trending
              <ChevronDownIcon className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  {...project}
                />
              ))}
            </div>
          </TabsContent>
          
          {/* Filter tabs by language */}
          {["javascript", "python", "glsl", "generative", "interactive", "data"].map(tab => (
            <TabsContent key={tab} value={tab}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects
                  .filter(p => {
                    if (tab === "javascript" || tab === "python" || tab === "glsl") {
                      return p.language === tab;
                    }
                    // For other categories, we would filter by category
                    return true;
                  })
                  .map((project) => (
                    <ProjectCard 
                      key={project.id} 
                      {...project}
                    />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}