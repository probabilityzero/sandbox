"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import { PlayIcon, PauseIcon, RefreshCwIcon as RefreshIcon, TerminalIcon } from "lucide-react"
import { Card } from "./ui/card"

interface JavaScriptPreviewProps {
  code: string
}

export function JavaScriptPreview({ code }: JavaScriptPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isRunning, setIsRunning] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [consoleOutput, setConsoleOutput] = useState<Array<{ type: string; message: string }>>([])
  const [showConsole, setShowConsole] = useState(false)

  useEffect(() => {
    if (isRunning) {
      updatePreview()
    }
  }, [code, isRunning])

  const updatePreview = () => {
    if (!iframeRef.current) return

    try {
      // Reset console output
      setConsoleOutput([])

      // Create a blob URL for the HTML content
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
            // Override console methods to capture output
            (function() {
              const originalConsole = {
                log: console.log,
                warn: console.warn,
                error: console.error,
                info: console.info
              };
              
              function captureConsole(type) {
                return function() {
                  const args = Array.from(arguments);
                  const message = args.map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                  ).join(' ');
                  
                  window.parent.postMessage({
                    type: 'console',
                    consoleType: type,
                    message: message
                  }, '*');
                  
                  originalConsole[type].apply(console, arguments);
                };
              }
              
              console.log = captureConsole('log');
              console.warn = captureConsole('warn');
              console.error = captureConsole('error');
              console.info = captureConsole('info');
            })();
            
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

      // Create a blob URL
      const blob = new Blob([htmlContent], { type: "text/html" })
      const blobURL = URL.createObjectURL(blob)

      // Set the iframe src to the blob URL
      iframeRef.current.src = blobURL

      // Clean up the blob URL when the iframe loads
      iframeRef.current.onload = () => {
        URL.revokeObjectURL(blobURL)
      }

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
      } else if (event.data && event.data.type === "console") {
        setConsoleOutput((prev) => [...prev, { type: event.data.consoleType, message: event.data.message }])
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

  const toggleConsole = () => {
    setShowConsole(!showConsole)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b p-2 flex items-center">
        <Button size="sm" variant="outline" onClick={toggleRunning} className="mr-2">
          {isRunning ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
          {isRunning ? "Pause" : "Run"}
        </Button>
        <Button size="sm" variant="outline" onClick={handleRefresh} className="mr-2">
          <RefreshIcon className="h-4 w-4 mr-1" />
          Refresh
        </Button>
        <Button size="sm" variant={showConsole ? "default" : "outline"} onClick={toggleConsole} className="ml-auto">
          <TerminalIcon className="h-4 w-4 mr-1" />
          Console {consoleOutput.length > 0 && `(${consoleOutput.length})`}
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-2 rounded m-2 font-mono text-sm whitespace-pre-wrap">
          {error}
        </div>
      )}

      <div className={`flex-1 bg-muted ${showConsole ? "h-1/2" : "h-full"}`}>
        <iframe
          ref={iframeRef}
          title="Preview"
          className="w-full h-full border-none"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>

      {showConsole && (
        <Card className="h-1/2 overflow-auto p-2 m-2 font-mono text-sm">
          <div className="p-2">
            {consoleOutput.length === 0 ? (
              <div className="text-muted-foreground">No console output</div>
            ) : (
              consoleOutput.map((output, index) => (
                <div
                  key={index}
                  className={`mb-1 ${
                    output.type === "error"
                      ? "text-red-600 dark:text-red-400"
                      : output.type === "warn"
                        ? "text-yellow-600 dark:text-yellow-400"
                        : output.type === "info"
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-foreground"
                  }`}
                >
                  <span className="opacity-70">{`> `}</span>
                  {output.message}
                </div>
              ))
            )}
          </div>
        </Card>
      )}
    </div>
  )
}
