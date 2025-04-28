"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "../../ui/button"
import { PlayIcon, PauseIcon, RefreshCwIcon as RefreshIcon, TerminalIcon, LoaderIcon } from "lucide-react"
import { Card } from "../../ui/card"
import { Progress } from "../../ui/progress"
import { MdPause, MdPlayArrow, MdReplay } from "react-icons/md"

interface PythonPreviewProps {
  code: string
}

export function PythonPreview({ code }: PythonPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isRunning, setIsRunning] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [consoleOutput, setConsoleOutput] = useState<Array<{ type: string; message: string }>>([])
  const [showConsole, setShowConsole] = useState(false)
  const [pyodideLoading, setPyodideLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)

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
      setPyodideLoading(true)
      setLoadingProgress(0)

      // Create HTML content with Pyodide and the user's code
      const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"></script>
          <style>
            body {
              margin: 0;
              padding: 0;
              overflow: hidden;
              background-color: rgb(20, 20, 20);
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
            .loading {
              color: white;
              font-family: sans-serif;
              padding: 20px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div id="loading" class="loading">Loading Python environment...</div>
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
            
            // Mouse tracking for Python code
            window.mouseX = 0;
            window.mouseY = 0;
            document.addEventListener('mousemove', (e) => {
              window.mouseX = e.clientX;
              window.mouseY = e.clientY;
            });

            // Load Pyodide and run the code
            async function main() {
              try {
                window.parent.postMessage({ type: 'pyodide-loading', progress: 10 }, '*');
                const pyodide = await loadPyodide();
                window.parent.postMessage({ type: 'pyodide-loading', progress: 50 }, '*');
                
                // Setup stdout/stderr capture
                pyodide.setStdout({
                  write: (text) => {
                    console.log(text);
                  }
                });
                
                pyodide.setStderr({
                  write: (text) => {
                    console.error(text);
                  }
                });
                
                window.parent.postMessage({ type: 'pyodide-loading', progress: 70 }, '*');
                
                // Load numpy
                await pyodide.loadPackage("numpy");
                window.parent.postMessage({ type: 'pyodide-loading', progress: 90 }, '*');
                
                // Hide loading message
                document.getElementById('loading').style.display = 'none';
                window.parent.postMessage({ type: 'pyodide-loading', progress: 100 }, '*');
                
                // Run the Python code
                await pyodide.runPythonAsync(\`${code}\`);
              } catch (error) {
                document.body.innerHTML = '<div class="error">Error: ' + error.message + '</div>';
                window.parent.postMessage({ type: 'error', message: error.message }, '*');
              }
            }
            
            main();
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
      setPyodideLoading(false)
    }
  }

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "error") {
        setError(event.data.message)
        setPyodideLoading(false)
      } else if (event.data && event.data.type === "console") {
        setConsoleOutput((prev) => [...prev, { type: event.data.consoleType, message: event.data.message }])
      } else if (event.data && event.data.type === "pyodide-loading") {
        setLoadingProgress(event.data.progress)
        if (event.data.progress === 100) {
          setPyodideLoading(false)
        }
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
      {pyodideLoading && (
        <div className="bg-background p-4 flex flex-col items-center justify-center">
          <div className="flex items-center mb-2">
            <LoaderIcon className="animate-spin h-4 w-4 mr-2" />
            <span>Loading Python Environment...</span>
          </div>
          <Progress value={loadingProgress} className="w-full max-w-md" />
        </div>
      )}

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

      <div className="border-t p-2  h-10 flex items-center bg-background">
        <Button size="sm" variant="outline" onClick={toggleRunning} className="mr-2" disabled={pyodideLoading}>
          {isRunning ? <MdPause className="h-2 w-2 mr-1" /> : <MdPlayArrow className="h-2 w-2 mr-1" />}
          {isRunning ? "Pause" : "Run"}
        </Button>
        <Button size="sm" variant="outline" onClick={handleRefresh} className="mr-2" disabled={pyodideLoading}>
          <MdReplay className="h-2 w-2 mr-1" />
          Refresh
        </Button>
        <Button size="sm" variant={showConsole ? "default" : "outline"} onClick={toggleConsole} className="ml-auto">
          <TerminalIcon className="h-2 w-2 mr-1" />
          {consoleOutput.length > 0 && `(${consoleOutput.length})`}
        </Button>
      </div>
    </div>
  )
}
