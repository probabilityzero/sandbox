import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/layout/Sidebar"
import { ProjectProvider } from "@/hooks/use-projects"
import { SidebarProvider } from "@/hooks/use-sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Grid Sandbox - Creative Coding Platform",
  description: "A browser-based creative coding platform for experimenting with JavaScript, Python, and shader programming",
  keywords: ["creative coding", "editor", "p5.js", "javascript", "python", "glsl", "sandbox"],
  authors: [{ name: "Grid Sandbox Team" }],
  icons: {
    icon: "/cube-logo.svg",
    apple: "/cube-logo.svg",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/cube-logo.svg" />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
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
