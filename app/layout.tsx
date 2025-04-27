import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { ProjectProvider } from "@/hooks/use-projects"
import { SidebarProvider } from "@/hooks/use-sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Creative Coding Editor",
  description: "A creative development environment",
  keywords: ["creative coding", "editor", "p5.js", "javascript", "sandbox"],
  authors: [{ name: "Grid Sandbox Team" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ProjectProvider>
            <SidebarProvider>
              <div className="flex min-h-screen relative">
                <Sidebar />
                <div className="flex-1 transition-all duration-300 min-w-0 w-full">
                  {children}
                </div>
              </div>
            </SidebarProvider>
          </ProjectProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
