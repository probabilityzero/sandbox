"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FaGithub, FaGoogle } from "react-icons/fa"

function AuthForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("login")
  
  useEffect(() => {
    if (searchParams.has("login")) {
      setActiveTab("login")
    } else if (searchParams.has("signup")) {
      setActiveTab("signup")
    }
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/dashboard")
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="login">Log In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      
      <TabsContent value="login">
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-500" htmlFor="email">
                Email Address
              </label>
              <Input id="email" type="email" placeholder="you@example.com" required />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-500" htmlFor="password">
                Password
              </label>
              <Input id="password" type="password" required />
              <div className="text-right">
                <Link href="/auth/reset-password" className="text-sm text-gray-500 hover:text-gray-700">
                  Forgot password?
                </Link>
              </div>
            </div>
            
            <Button type="submit" className="w-full bg-gray-600 hover:bg-gray-700 text-white">
              Sign in
            </Button>
          </form>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full border-gray-300">
              <FaGithub className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button variant="outline" className="w-full border-gray-300">
              <FaGoogle className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
          
          <p className="text-center text-sm text-gray-500">
            New to Grid Sandbox?{" "}
            <Link href="/auth?signup" className="text-gray-600 hover:text-gray-800">
              Create Account
            </Link>
          </p>
        </div>
      </TabsContent>
      
      <TabsContent value="signup">
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-500" htmlFor="name">
                Name
              </label>
              <Input id="name" type="text" placeholder="Your name" required />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-500" htmlFor="signup-email">
                Email Address
              </label>
              <Input id="signup-email" type="email" placeholder="you@example.com" required />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-500" htmlFor="signup-password">
                Password
              </label>
              <Input id="signup-password" type="password" required />
            </div>
            
            <Button type="submit" className="w-full bg-gray-600 hover:bg-gray-700 text-white">
              Sign up
            </Button>
          </form>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full border-gray-300">
              <FaGithub className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button variant="outline" className="w-full border-gray-300">
              <FaGoogle className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
          
          <p className="text-center text-sm text-gray-500">
            By signing up, you agree to our{" "}
            <Link href="/legal/terms" className="underline underline-offset-4 hover:text-primary">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/legal/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
          </p>
        </div>
      </TabsContent>
    </Tabs>
  )
}

function AuthFormSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="h-10 bg-muted rounded mb-8"></div>
      <div className="h-[400px] bg-muted rounded"></div>
    </div>
  )
}

export default function AuthPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="relative hidden lg:flex flex-col items-center justify-center p-8 bg-[#B5CCBE] text-white">
        <div className="max-w-md mx-auto text-center space-y-6">
          <Image 
            src="/cube-logo.svg" 
            alt="Grid Sandbox Logo"
            width={300} 
            height={300}
            className="mx-auto"
          />
          <h2 className="text-2xl font-medium">Creative coding, simplified</h2>
          <p className="text-sm text-white/80">
            Build interactive experiments, visualizations, and digital art directly in your browser.
            Join our community of creative coders today.
          </p>
          
          <div className="flex justify-center gap-2 pt-4">
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-white/40"></div>
            <div className="w-2 h-2 rounded-full bg-white/40"></div>
            <div className="w-2 h-2 rounded-full bg-white/40"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-block">
              <Image 
                src="/cube-logo.svg" 
                width={48} 
                height={48} 
                alt="Grid Sandbox Logo" 
                className="mx-auto"
              />
            </Link>
            <h1 className="text-2xl font-medium mt-4 mb-1">Grid Sandbox</h1>
            <h2 className="text-lg text-gray-600">Welcome back</h2>
          </div>

          <Suspense fallback={<AuthFormSkeleton />}>
            <AuthForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}