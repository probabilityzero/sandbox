import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HomeIcon, ArrowLeftIcon } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="flex flex-col items-center space-y-6">
        {/* Visual element */}
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-2">
          <span className="text-4xl">🔍</span>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>
        
        <p className="text-muted-foreground text-lg max-w-md">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button asChild>
            <Link href="/">
              <HomeIcon className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
      
      {/* Grid sandbox branding */}
      <div className="text-muted-foreground text-sm mt-16">
        <div className="flex items-center justify-center gap-2">
          <span>Grid Sandbox</span>
        </div>
      </div>
    </div>
  )
}