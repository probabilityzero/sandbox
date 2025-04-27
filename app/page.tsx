import { EditorContainer } from "@/components/editor-container"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-14 items-center justify-between px-4">
          <h1 className="text-xl font-bold">Creative Coding Editor</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <EditorContainer />
    </main>
  )
}
