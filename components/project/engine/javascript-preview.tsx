"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { PlayIcon, PauseIcon, RefreshCwIcon as RefreshIcon, TerminalIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

interface JavaScriptPreviewProps {
  code: string
}

export function JavaScriptPreview({ code }: JavaScriptPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isRunning, setIsRunning] = useState(true)
  const [key, setKey] = useState(Date.now())
  const [error, setError] = useState<string | null>(null)
  const [consoleOutput, setConsoleOutput] = useState<Array<{ type: string; message: string }>>([])
  const [showConsole, setShowConsole] = useState(false)
  
  const handleRefresh = () => {
    setKey(Date.now())
    setIsRunning(true)
  }
  
  const toggleRunning = () => {
    setIsRunning(!isRunning)
    
    if (iframeRef.current) {
      if (isRunning) {
        iframeRef.current.srcdoc = ''
      } else {
        handleRefresh()
      }
    }
  }

  const toggleConsole = () => {
    setShowConsole(!showConsole)
  }
  
  useEffect(() => {
    if (!isRunning) return
    
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            html, body {
              margin: 0;
              padding: 0;
              overflow: hidden;
            }
            canvas {
              display: block;
            }
          </style>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js"></script>
        </head>
        <body>
          <script>
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
              console.error('Error in sketch:', error.message);
              document.body.innerHTML = '<div style="color: red; padding: 20px;"><h3>Error in sketch:</h3><pre>' + error.message + '</pre></div>';
              window.parent.postMessage({ type: 'error', message: error.message }, '*');
            }
          </script>
        </body>
      </html>
    `
    
    if (iframeRef.current) {
      const blob = new Blob([htmlTemplate], { type: "text/html" })
      const blobURL = URL.createObjectURL(blob)
      
      iframeRef.current.src = blobURL
      
      iframeRef.current.onload = () => {
        URL.revokeObjectURL(blobURL)
      }
    }
  }, [code, isRunning, key])
  
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
  
  return (
    <div className="flex flex-col h-full">
      <div className={`flex-1 bg-muted ${showConsole ? "h-2/3" : "h-full"}`}>
        <iframe
          key={key}
          ref={iframeRef}
          className="h-full w-full border-0"
          title="JavaScript Preview"
          sandbox="allow-scripts"
        />
      </div>
      
      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-2 rounded m-2 font-mono text-sm whitespace-pre-wrap">
          {error}
        </div>
      )}

      {showConsole && (
        <Card className="h-1/3 overflow-auto p-2 m-2 font-mono text-sm">
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

      <div className="border-t p-1.5 flex items-center gap-1 bg-muted/50">
        <Button size="icon" variant="ghost" onClick={toggleRunning} className="h-7 w-7">
          {isRunning ? <PauseIcon className="h-3.5 w-3.5" /> : <PlayIcon className="h-3.5 w-3.5" />}
        </Button>
        <Button size="icon" variant="ghost" onClick={handleRefresh} className="h-7 w-7">
          <RefreshIcon className="h-3.5 w-3.5" />
        </Button>
        <Button 
          size="icon" 
          variant={showConsole ? "secondary" : "ghost"} 
          onClick={toggleConsole} 
          className="h-7 w-7 ml-auto"
        >
          <TerminalIcon className="h-3.5 w-3.5" />
        </Button>
        {consoleOutput.length > 0 && (
          <span className="text-xs bg-primary text-primary-foreground rounded-full px-1.5 h-4 flex items-center justify-center">
            {consoleOutput.length}
          </span>
        )}
      </div>
    </div>
  )
}
