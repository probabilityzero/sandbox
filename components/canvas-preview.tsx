"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import { PlayIcon, PauseIcon, RefreshCwIcon as RefreshIcon } from "lucide-react"

interface CanvasPreviewProps {
  code: string
}

export function CanvasPreview({ code }: CanvasPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isRunning, setIsRunning] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isRunning) {
      updatePreview()
    }
  }, [code, isRunning])

  const updatePreview = () => {
    if (!iframeRef.current) return

    try {
      const iframe = iframeRef.current
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document

      if (!iframeDoc) return

      // Create HTML content with p5.js and the user's code
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js"></script>
            <style>
              body {
                margin: 0;
                padding: 0;
                overflow: hidden;
              }
              canvas {
                display: block;
              }
              .error {
                color: red;
                font-family: monospace;
                padding: 10px;
                white-space: pre-wrap;
              }
            </style>
          </head>
          <body>
            <script>
              try {
                ${code}
              } catch (error) {
                document.body.innerHTML = '<div class="error">Error: ' + error.message + '</div>';
                window.parent.postMessage({ type: 'error', message: error.message }, '*');
              }
            </script>
          </body>
        </html>
      `

      iframeDoc.open()
      iframeDoc.write(htmlContent)
      iframeDoc.close()

      setError(null)
    } catch (err) {
      console.error("Failed to update preview:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
    }
  }

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "error") {
        setError(event.data.message)
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  const toggleRunning = () => {
    setIsRunning(!isRunning)
    if (!isRunning) {
      updatePreview()
    }
  }

  const handleRefresh = () => {
    updatePreview()
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b p-2 flex items-center">
        <Button size="sm" variant="outline" onClick={toggleRunning} className="mr-2">
          {isRunning ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
          {isRunning ? "Pause" : "Run"}
        </Button>
        <Button size="sm" variant="outline" onClick={handleRefresh}>
          <RefreshIcon className="h-4 w-4 mr-1" />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded m-2 font-mono text-sm whitespace-pre-wrap">
          {error}
        </div>
      )}

      <div className="flex-1 bg-muted">
        <iframe ref={iframeRef} title="Preview" className="w-full h-full border-none" sandbox="allow-scripts" />
      </div>
    </div>
  )
}
