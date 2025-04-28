"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GitHubIcon, GoogleIcon } from "@/components/icons"

export default function AuthPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("login")
  
  useEffect(() => {
    // Set the active tab based on URL parameters
    if (searchParams.has("login")) {
      setActiveTab("login")
    } else if (searchParams.has("signup")) {
      setActiveTab("signup")
    }
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // For demo purposes, just redirect to dashboard
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Left side: Brand */}
      <div className="hidden lg:flex flex-col w-1/2 bg-gradient-to-b from-primary/5 to-primary/10 items-center justify-center p-12">
        <div className="max-w-md">
          <div className="flex items-center mb-8">
            <Image src="/cube-logo.svg" width={32} height={32} alt="Grid Sandbox Logo" />
            <span className="text-xl font-semibold ml-2">Grid Sandbox</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-6">Creative coding, simplified</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Build interactive experiments, visualizations, and digital art directly in your browser.
          </p>
          
          {/* Testimonial */}
          <div className="bg-background p-6 rounded-lg border">
            <p className="italic text-muted-foreground mb-4">
              "Grid Sandbox completely changed how I prototype creative coding ideas. The instant feedback loop is incredible."
            </p>
            <div className="flex items-center">
              <div className="h-10 w-10 bg-muted rounded-full"></div>
              <div className="ml-4">
                <p className="font-medium">Alex Chen</p>
                <p className="text-sm text-muted-foreground">Creative Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side: Auth form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="flex justify-center lg:justify-start mb-8">
            <Link href="/" className="flex items-center">
              <Image 
                src="/cube-logo.svg" 
                width={24} 
                height={24} 
                alt="Grid Sandbox Logo" 
                className="lg:hidden"
              />
              <span className="font-medium ml-2 lg:hidden">Grid Sandbox</span>
            </Link>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Log In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome back</CardTitle>
                  <CardDescription>
                    Log in to your Grid Sandbox account to continue your creative journey.
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="you@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link href="/auth/reset-password" className="text-xs text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Input id="password" type="password" required />
                    </div>
                    
                    <Button type="submit" className="w-full">Log In</Button>
                  </form>
                  
                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t"></span>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <Button variant="outline" className="w-full">
                        <GitHubIcon className="mr-2 h-4 w-4" />
                        GitHub
                      </Button>
                      <Button variant="outline" className="w-full">
                        <GoogleIcon className="mr-2 h-4 w-4" />
                        Google
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Create an account</CardTitle>
                  <CardDescription>
                    Join Grid Sandbox to unleash your creative coding potential.
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" type="text" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input id="signup-email" type="email" placeholder="you@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input id="signup-password" type="password" required />
                    </div>
                    
                    <Button type="submit" className="w-full">Sign Up</Button>
                  </form>
                  
                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t"></span>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <Button variant="outline" className="w-full">
                        <GitHubIcon className="mr-2 h-4 w-4" />
                        GitHub
                      </Button>
                      <Button variant="outline" className="w-full">
                        <GoogleIcon className="mr-2 h-4 w-4" />
                        Google
                      </Button>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="text-sm text-center text-muted-foreground">
                  By signing up, you agree to our{" "}
                  <Link href="/legal/terms" className="underline underline-offset-4 hover:text-primary">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/legal/privacy" className="underline underline-offset-4 hover:text-primary">
                    Privacy Policy
                  </Link>
                  .
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}