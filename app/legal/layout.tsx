import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { SiteFooter } from "@/components/layout/SiteFooter"

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader 
        showBreadcrumb={true} 
        breadcrumbText="Legal" 
      />
      
      <div className="container py-8 flex-grow">
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
      
      <SiteFooter />
    </div>
  )
}