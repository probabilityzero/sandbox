"use client"

import { useEffect, useRef, useState } from "react"
import { Editor } from "@monaco-editor/react"
import type { editor } from "monaco-editor"
import { useTheme } from "next-themes"
import type { LanguageType } from "@/types/project"

interface CodeEditorProps {
  code: string
  language: LanguageType
  onChange: (code: string) => void
}

export function CodeEditor({ code, language, onChange }: CodeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor
  }

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChange(value)
    }
  }

  const getMonacoLanguage = (lang: LanguageType) => {
    switch (lang) {
      case "javascript":
        return "javascript"
      case "python":
        return "python"
      case "glsl":
        return "cpp" // Monaco doesn't have GLSL directly, but C++ is close
      default:
        return "javascript"
    }
  }

  if (!mounted) {
    return <div className="h-full w-full bg-muted flex items-center justify-center">Loading editor...</div>
  }

  return (
    <div className="h-full border-r">
      <Editor
        height="100%"
        defaultLanguage={getMonacoLanguage(language)}
        language={getMonacoLanguage(language)}
        value={code}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        theme={theme === "dark" ? "vs-dark" : "light"}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  )
}
