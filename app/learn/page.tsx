import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRightIcon, BookOpenIcon, GraduationCapIcon, PlayIcon, CodeIcon } from "lucide-react"
import { SiteHeader } from "@/components/layout/site-header"

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader 
        showDashboard={true} 
        showBreadcrumb={true} 
        breadcrumbText="Learn" 
      />
      
      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Learning Resources</h1>
            <p className="text-xl text-muted-foreground">
              Expand your creative coding skills with our comprehensive guides and tutorials
            </p>
          </div>
          
          <Tabs defaultValue="tutorials" className="mb-12">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
              <TabsTrigger value="guides">Guides</TabsTrigger>
              <TabsTrigger value="reference">Reference</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tutorials">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <PlayIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Getting Started</h3>
                      <p className="text-sm text-muted-foreground">15 min · Beginner</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Learn the basics of Grid Sandbox and create your first creative coding project.
                  </p>
                  <Button variant="ghost" className="gap-1" asChild>
                    <Link href="/learn/tutorials/getting-started">
                      Start Tutorial <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                </Card>
                
                <Card className="p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <PlayIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Generative Art Basics</h3>
                      <p className="text-sm text-muted-foreground">30 min · Intermediate</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Create mesmerizing generative art using randomization and mathematical patterns.
                  </p>
                  <Button variant="ghost" className="gap-1" asChild>
                    <Link href="/learn/tutorials/generative-art">
                      Start Tutorial <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                </Card>
                
                <Card className="p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <PlayIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Interactive Animations</h3>
                      <p className="text-sm text-muted-foreground">40 min · Intermediate</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Build engaging animations that respond to user input like mouse and keyboard.
                  </p>
                  <Button variant="ghost" className="gap-1" asChild>
                    <Link href="/learn/tutorials/interactive-animations">
                      Start Tutorial <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                </Card>
                
                <Card className="p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <PlayIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">GLSL Shader Foundations</h3>
                      <p className="text-sm text-muted-foreground">60 min · Advanced</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Dive into fragment shaders to create high-performance visual effects with GLSL.
                  </p>
                  <Button variant="ghost" className="gap-1" asChild>
                    <Link href="/learn/tutorials/glsl-foundations">
                      Start Tutorial <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                </Card>
              </div>
              
              <div className="flex justify-center mt-8">
                <Button variant="outline" className="gap-2">
                  View All Tutorials
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="guides">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <BookOpenIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">p5.js Fundamentals</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    A comprehensive guide to using p5.js for creative coding in Grid Sandbox.
                  </p>
                  <Button variant="ghost" className="gap-1" asChild>
                    <Link href="/learn/guides/p5js">
                      Read Guide <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                </Card>
                
                <Card className="p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <BookOpenIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Python with Pyodide</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Learn how to utilize Python in the browser for data visualization and algorithms.
                  </p>
                  <Button variant="ghost" className="gap-1" asChild>
                    <Link href="/learn/guides/python-pyodide">
                      Read Guide <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                </Card>
                
                <Card className="p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <BookOpenIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">GLSL Shader Programming</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Master fragment shaders for creating efficient visual effects and animations.
                  </p>
                  <Button variant="ghost" className="gap-1" asChild>
                    <Link href="/learn/guides/glsl-shaders">
                      Read Guide <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                </Card>
                
                <Card className="p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <BookOpenIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Sharing & Collaboration</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Best practices for sharing your work and collaborating with other creators.
                  </p>
                  <Button variant="ghost" className="gap-1" asChild>
                    <Link href="/learn/guides/sharing">
                      Read Guide <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="reference">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <CodeIcon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">API Reference</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Complete documentation for Grid Sandbox's API and functions.
                  </p>
                  <Button variant="ghost" className="gap-1" asChild>
                    <Link href="/learn/reference/api">
                      View Reference <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                </Card>
                
                <Card className="p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <CodeIcon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">Code Examples</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    A library of reusable code snippets for common creative coding patterns.
                  </p>
                  <Button variant="ghost" className="gap-1" asChild>
                    <Link href="/learn/reference/examples">
                      View Examples <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                </Card>
                
                <Card className="p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <GraduationCapIcon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">Resources</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Additional learning materials, books, and external resources.
                  </p>
                  <Button variant="ghost" className="gap-1" asChild>
                    <Link href="/learn/reference/resources">
                      View Resources <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          <section className="border-t pt-12">
            <div className="bg-muted/50 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to apply what you've learned?</h2>
              <p className="text-muted-foreground mb-6">
                Take your new knowledge for a spin by creating a new project.
              </p>
              <Button size="lg" asChild>
                <Link href="/sandbox/new">Create New Project</Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}