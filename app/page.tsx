import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRightIcon, CodeIcon, BrushIcon, ArrowRightIcon, ShapesIcon } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero section */}
      <header className="w-full border-b sticky top-0 z-50 bg-background">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 flex items-center justify-center">
              <Image 
                src="/cube-logo.svg" 
                width={24} 
                height={24} 
                alt="Grid Sandbox Logo" 
              />
            </div>
            <span className="font-medium text-foreground">Sandbox</span>
          </div>
          
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
          
          <div className="flex gap-3">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Log in</Link>
            </Button>
            <Button asChild className="py-2 px-4">
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main section */}
      <main className="flex-grow">
        {/* Hero section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="container flex flex-col items-center text-center space-y-6 relative z-10">
            <div className="flex gap-2 py-2 px-4 bg-muted rounded-full">
              <div className="bg-primary/20 rounded-full px-3 py-1 text-sm font-medium">
                <span>New Release</span>
              </div>
              <span className="text-sm text-muted-foreground flex items-center">
                Introducing Grid Sandbox v1.0 
                <ChevronRightIcon className="h-4 w-4 ml-1" />
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold max-w-4xl">
              Create interactive coding experiments directly in your browser
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
              A lightweight creative coding environment for JavaScript, Python, and GLSL shader programming.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="gap-2 text-lg" asChild>
              <Link href="/sandbox/new">
                <CodeIcon className="h-4 w-4" />
                Start Coding
              </Link>
              </Button>
              <Button variant="outline" size="lg" className="gap-2 text-lg" asChild>
              <Link href="/explore">
              <ShapesIcon className="h-4 w-4" />
                Explore Examples
              </Link>
              </Button>
            </div>
          </div>
          
          {/* Background pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.025]"></div>
        </section>
        
        {/* Features */}
        <section id="features" className="py-20 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Features that empower your creativity</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-lg border">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <CodeIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Multiple Languages</h3>
                <p className="text-muted-foreground">
                  Choose between JavaScript with p5.js, Python with Pyodide, or GLSL shaders for your creative coding projects.
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg border">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BrushIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Instant Preview</h3>
                <p className="text-muted-foreground">
                  See your changes in real-time with our fast rendering engine, making iterative creative development seamless.
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg border">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Share & Collaborate</h3>
                <p className="text-muted-foreground">
                  Share your projects with the community, get feedback, and collaborate with other creative coders.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Examples showcase */}
        <section id="examples" className="py-20">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Inspiring examples</h2>
            <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Discover what's possible with Grid Sandbox through these community examples
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Example cards would go here - simplified for brevity */}
              {[1, 2, 3].map(i => (
                <div key={i} className="rounded-lg overflow-hidden border bg-card">
                  <div className="h-48 bg-muted"></div>
                  <div className="p-4">
                    <h3 className="font-medium">Example Project {i}</h3>
                    <p className="text-sm text-muted-foreground">A creative coding experiment</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Button asChild>
                <Link href="/explore">
                  View All Examples
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-20 bg-muted">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start creating?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Jump in and start experimenting with code in your browser, no downloads required.
            </p>
            <Button size="lg" asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t py-10">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="h-7 w-7 flex items-center justify-center">
              <Image 
                src="/cube-logo.svg" 
                width={20} 
                height={20} 
                alt="Grid Sandbox Logo" 
              />
            </div>
            <span className="font-medium">Grid Sandbox</span>
          </div>
          
          <div className="flex gap-6">
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}