import { EditorContainer } from "@/components/sandbox/sandbox-new-container"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <EditorContainer />
    </main>
  )
}
