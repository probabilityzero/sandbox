import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b container flex sticky top-0 items-center justify-between h-14">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <Image src="/cube-logo.svg" width={24} height={24} alt="Grid Sandbox Logo" />
            <span className="font-medium ml-2">Sandbox</span>
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium">Legal</span>
        </div>
      </header>
      
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="terms" className="mb-8">
            <TabsList className="w-full">
              <TabsTrigger value="terms" asChild>
                <Link href="/legal/terms">Terms of Service</Link>
              </TabsTrigger>
              <TabsTrigger value="privacy" asChild>
                <Link href="/legal/privacy">Privacy Policy</Link>
              </TabsTrigger>
              <TabsTrigger value="cookies" asChild>
                <Link href="/legal/cookies">Cookie Policy</Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          {children}
        </div>
      </div>
    </div>
  )
}