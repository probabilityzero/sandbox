"use client"

import { useState } from "react"
import { Header } from "@/components/layout/Heading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon, PlusIcon, ArrowLeftIcon } from "lucide-react"
import { ProjectCard, ProjectCardProps } from "@/components/project-card"
import Link from "next/link"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

// Mock data for my submissions
const mySubmissions: ProjectCardProps[] = [
  {
    id: 101,
    title: "Recursive Tree Generator",
    description: "Procedural tree generation with customizable parameters",
    image: "/templates/recursive-tree.png",
    language: "javascript",
    author: {
      name: "You",
      avatar: "/avatars/user.png"
    },
    stats: {
      forks: "42",
      likes: "156"
    },
    isCommunity: true,
  },
  {
    id: 102,
    title: "Color Palette Extractor",
    description: "Extract dominant colors from images using k-means clustering",
    image: "/templates/color-palette.png", 
    language: "python",
    author: {
      name: "You",
      avatar: "/avatars/user.png"
    },
    stats: {
      forks: "38",
      likes: "124"
    },
    isCommunity: true,
  }
]

export default function Submissions() {
  const [searchTerm, setSearchTerm] = useState("")
  
  const filteredSubmissions = searchTerm 
    ? mySubmissions.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : mySubmissions

  const headerActions = (
    <div className="flex items-center gap-3">
      <div className="relative lg:w-64 hidden md:block">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search submissions..." 
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Button className="gap-2">
        <PlusIcon className="h-4 w-4" />
        Submit Project
      </Button>
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        title="My Submissions" 
        actions={headerActions}
      />
      
      <div className="container py-8 space-y-8">
        {/* Mobile search - only visible on small screens */}
        <div className="relative w-full md:hidden mb-6">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search submissions..." 
            className="pl-10 py-5"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs defaultValue="published" className="w-full">
          <TabsList className="flex justify-center bg-transparent space-x-1">
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          
          <TabsContent value="published" className="mt-6">
            {filteredSubmissions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSubmissions.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    {...project}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 bg-muted flex items-center justify-center rounded-full mb-4">
                  <PlusIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No published projects</h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm ? "No projects match your search term" : "You haven't published any projects to the community yet"}
                </p>
                {!searchTerm && (
                  <Button>Submit Your First Project</Button>
                )}
              </div>
            )}
          </TabsContent>
          
          {/* Empty states for other tabs */}
          <TabsContent value="drafts" className="mt-6">
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 bg-muted flex items-center justify-center rounded-full mb-4">
                <PlusIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No draft submissions</h3>
              <p className="text-muted-foreground mb-6">
                You don't have any draft submissions at the moment
              </p>
              <Button>Create New Draft</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="archived" className="mt-6">
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 bg-muted flex items-center justify-center rounded-full mb-4">
                <PlusIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No archived submissions</h3>
              <p className="text-muted-foreground mb-6">
                You haven't archived any community submissions
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}