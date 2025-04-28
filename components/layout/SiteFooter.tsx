import Link from "next/link"
import Image from "next/image"
import { Twitter, Github, Instagram, Linkedin } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t py-10 bg-background">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
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
            <p className="text-sm text-muted-foreground">
              A lightweight creative coding environment for JavaScript, Python, and GLSL shader programming.
            </p>
            <div className="flex gap-4">
              <a href="https://twitter.com/gridsandbox" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://github.com/gridsandbox" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://instagram.com/gridsandbox" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://linkedin.com/company/gridsandbox" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3 text-sm">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/sandbox/new" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Create Project
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-3 text-sm">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/learn" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Learning Resources
                </Link>
              </li>
              <li>
                <Link href="/learn/tutorials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/learn/guides" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/learn/reference" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  API Reference
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-3 text-sm">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contribute" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contribute
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} Grid Sandbox. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/legal/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="/legal/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="/legal/cookies" className="text-sm text-muted-foreground hover:text-foreground">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}