"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ChevronDownIcon, SearchIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Sample template data
const templates = [
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
    forks: "11.4K"
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
    forks: "13.4K"
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
    forks: "6.4K"
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
    forks: "5.2K"
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
    forks: "9.8K"
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
    forks: "7.6K"
  }
]

export default function Community() {
  const [activeTab, setActiveTab] = useState("all")
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="border-b">
        <div className="container py-4 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold">Community</h1>
            <div className="flex space-x-4 mt-2">
              <Link href="/community" className="text-sm font-medium">Discover</Link>
              <Link href="/community/submissions" className="text-sm font-medium text-muted-foreground">My Submissions</Link>
            </div>
          </div>
        </div>
      </div>
      
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
          />
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="flex justify-center space-x-1 overflow-x-auto">
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
              {templates.map((template) => (
                <div key={template.id} className="group overflow-hidden rounded-lg border bg-background transition-colors hover:bg-accent/50">
                  <Link href={`/community/project/${template.id}`} className="block">
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/10" />
                      {/* Using a div as placeholder for now since we don't have the actual images */}
                      <div 
                        className="h-full w-full bg-gradient-to-br from-gray-900 to-gray-700"
                        style={{ backgroundImage: `url(${template.image})`, backgroundSize: 'cover' }}
                      />
                      
                      {/* Language badge */}
                      <div className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium bg-black/60 text-white">
                        {template.language === "javascript" && "JavaScript"}
                        {template.language === "python" && "Python"}
                        {template.language === "glsl" && "GLSL"}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium mb-1">{template.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full bg-gray-300 overflow-hidden">
                            {/* Avatar placeholder */}
                            <div className="h-full w-full bg-gradient-to-br from-pink-500 to-blue-500" />
                          </div>
                          <span className="text-xs text-muted-foreground">{template.author.name}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {template.forks} Forks
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </TabsContent>
          
          {/* Filter tabs by language */}
          {["javascript", "python", "glsl", "generative", "interactive", "data"].map(tab => (
            <TabsContent key={tab} value={tab}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates
                  .filter(t => {
                    if (tab === "javascript" || tab === "python" || tab === "glsl") {
                      return t.language === tab;
                    }
                    // For other categories, we would filter by category if we had that data
                    return true;
                  })
                  .map((template) => (
                    <div key={template.id} className="group overflow-hidden rounded-lg border bg-background transition-colors hover:bg-accent/50">
                      <Link href={`/community/project/${template.id}`} className="block">
                        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/10" />
                          <div 
                            className="h-full w-full bg-gradient-to-br from-gray-900 to-gray-700"
                            style={{ backgroundImage: `url(${template.image})`, backgroundSize: 'cover' }}
                          />
                          
                          {/* Language badge */}
                          <div className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium bg-black/60 text-white">
                            {template.language === "javascript" && "JavaScript"}
                            {template.language === "python" && "Python"}
                            {template.language === "glsl" && "GLSL"}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium mb-1">{template.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-7 w-7 rounded-full bg-gray-300 overflow-hidden">
                                <div className="h-full w-full bg-gradient-to-br from-pink-500 to-blue-500" />
                              </div>
                              <span className="text-xs text-muted-foreground">{template.author.name}</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {template.forks} Forks
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}