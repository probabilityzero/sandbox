import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  GitPullRequestIcon, 
  CodeIcon, 
  MessagesSquareIcon, 
  BugIcon, 
  GraduationCapIcon, 
  HeartIcon,
  StarIcon,
  UsersIcon,
  EyeIcon
} from "lucide-react"

export default function ContributePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b container flex sticky top-0 items-center justify-between h-14">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <Image src="/cube-logo.svg" width={24} height={24} alt="Grid Sandbox Logo" />
            <span className="font-medium ml-2">Sandbox</span>
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium">Contribute</span>
        </div>
      </header>
      
      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Contribute to Grid Sandbox</h1>
            <p className="text-xl text-muted-foreground">
              Help us make Grid Sandbox better for creative coders everywhere
            </p>
          </div>
          
          <div className="bg-muted/30 border rounded-lg p-8 mb-12">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-4">An open platform for creative code</h2>
                <p className="text-muted-foreground mb-4">
                  Grid Sandbox is built on open source principles. We believe in transparency, 
                  community collaboration, and making creative coding accessible to everyone.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-background border rounded-full px-3 py-1">
                    <StarIcon className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">2.5k Stars</span>
                  </div>
                  <div className="flex items-center gap-2 bg-background border rounded-full px-3 py-1">
                    <GitPullRequestIcon className="h-4 w-4 text-primary" />
                    <span className="text-sm">420 PRs</span>
                  </div>
                  <div className="flex items-center gap-2 bg-background border rounded-full px-3 py-1">
                    <UsersIcon className="h-4 w-4 text-green-500" />
                    <span className="text-sm">150 Contributors</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="bg-background border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Image src="/cube-logo.svg" width={24} height={24} alt="Grid Sandbox Logo" />
                      <span className="font-medium">grid-sandbox</span>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <EyeIcon className="h-4 w-4" />
                      Watch
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <GitPullRequestIcon className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Latest PR: Add shader parameter controls</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BugIcon className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium">Open issues: 36</span>
                    </div>
                    <div className="text-right">
                      <Button asChild>
                        <a href="https://github.com/grid-sandbox/grid-sandbox" target="_blank" rel="noopener noreferrer">
                          View on GitHub
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-6">Ways to contribute</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <CodeIcon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Code Contributions</CardTitle>
                </div>
                <CardDescription>
                  Contribute code improvements, bug fixes, and new features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full h-6 w-6 bg-muted flex items-center justify-center mt-0.5">
                      <span className="text-xs font-medium">1</span>
                    </div>
                    <div>
                      <p className="font-medium">Fork the repository</p>
                      <p className="text-sm text-muted-foreground">Start by forking our GitHub repository to your account</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full h-6 w-6 bg-muted flex items-center justify-center mt-0.5">
                      <span className="text-xs font-medium">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Set up your development environment</p>
                      <p className="text-sm text-muted-foreground">Follow our setup guide to get your local environment ready</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full h-6 w-6 bg-muted flex items-center justify-center mt-0.5">
                      <span className="text-xs font-medium">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Submit a pull request</p>
                      <p className="text-sm text-muted-foreground">Create a PR with your changes and a clear description</p>
                    </div>
                  </li>
                </ul>
                
                <div className="mt-6">
                  <Button className="w-full" asChild>
                    <a href="https://github.com/grid-sandbox/grid-sandbox/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">
                      Contributor Guidelines
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <BugIcon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Issue Reporting</CardTitle>
                </div>
                <CardDescription>
                  Help identify bugs and suggest improvements to the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  Found a bug or have an idea for a new feature? Your feedback is invaluable to us! 
                  Please report issues with detailed information so we can address them effectively.
                </p>
                
                <div className="bg-muted p-4 rounded-md mb-4">
                  <h4 className="font-medium mb-2">What to include in your report:</h4>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Steps to reproduce the issue</li>
                    <li>Expected vs. actual behavior</li>
                    <li>Screenshots if applicable</li>
                    <li>Browser and OS information</li>
                  </ul>
                </div>
                
                <Button className="w-full" asChild>
                  <a href="https://github.com/grid-sandbox/grid-sandbox/issues/new/choose" target="_blank" rel="noopener noreferrer">
                    Report an Issue
                  </a>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <GraduationCapIcon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Documentation</CardTitle>
                </div>
                <CardDescription>
                  Help improve tutorials, guides, and reference materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  Good documentation is crucial for learning. Help us expand our learning materials by
                  contributing tutorials, examples, or improvements to existing documentation.
                </p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Write new tutorials for specific techniques</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Improve existing documentation for clarity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Translate content to other languages</span>
                  </div>
                </div>
                
                <Button className="w-full" asChild>
                  <a href="https://github.com/grid-sandbox/grid-sandbox/tree/main/docs" target="_blank" rel="noopener noreferrer">
                    Contribute to Docs
                  </a>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <HeartIcon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Community Support</CardTitle>
                </div>
                <CardDescription>
                  Engage with the community and help others learn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  Join our community forums and Discord to help answer questions, provide feedback,
                  and share your knowledge with other creative coders.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Button variant="outline" className="w-full" asChild>
                    <a href="https://discord.gg/grid-sandbox" target="_blank" rel="noopener noreferrer">
                      Join Discord
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="https://forum.grid-sandbox.dev" target="_blank" rel="noopener noreferrer">
                      Visit Forums
                    </a>
                  </Button>
                </div>
                
                <div className="bg-muted p-4 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <MessagesSquareIcon className="h-4 w-4 text-primary" />
                    <h4 className="font-medium">Community Guidelines</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We're committed to providing a welcoming and inclusive space for everyone.
                    Please review our community guidelines before participating.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <section className="border-t pt-12">
            <div className="bg-muted/50 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Recognition Program</h2>
              <p className="text-muted-foreground mb-6">
                We recognize and celebrate our contributors through our recognition program.
                Active contributors receive special badges, access to beta features, and more.
              </p>
              <Button asChild>
                <Link href="/contribute/recognition">Learn About Recognition</Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}