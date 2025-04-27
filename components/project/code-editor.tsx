"use client"

import { useEffect, useState } from "react"
import Editor from "@monaco-editor/react"
import { LanguageType } from "@/types/project"
import { useTheme } from "next-themes"

export interface CodeEditorProps {
  code: string
  language: LanguageType
  onChange: (value: string) => void
  readOnly?: boolean
}

export function CodeEditor({ code, language, onChange, readOnly = false }: CodeEditorProps) {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDarkTheme = resolvedTheme === "dark"
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-full h-full bg-background flex items-center justify-center">Loading editor...</div>
  }

  const getLanguageId = () => {
    switch (language) {
      case "javascript": return "javascript"
      case "python": return "python"
      case "glsl": return "cpp" 
      default: return "javascript"
    }
  }
  
  return (
    <Editor
      height="100%"
      language={getLanguageId()}
      value={code}
      theme={isDarkTheme ? "vs-dark" : "vs-light"}
      options={{
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 14,
        readOnly: readOnly,
        automaticLayout: true,
        tabSize: 2,
        wordWrap: "on",
        lineNumbers: "on",
        renderLineHighlight: "line",
        hideCursorInOverviewRuler: true,
        scrollbar: {
          vertical: 'visible',
          horizontalScrollbarSize: 10,
          verticalScrollbarSize: 10,
        }
      }}
      onChange={(value) => onChange(value || "")}
    />
  )
}
