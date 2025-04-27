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
  
  const handleRefresh = () => {
    setKey(Date.now())
    setIsRunning(true)
  }
  
  const toggleRunning = () => {
    setIsRunning(!isRunning)
    
    if (iframeRef.current) {
      if (isRunning) {
        // Pause by removing the iframe src
        iframeRef.current.srcdoc = ''
      } else {
        // Resume by refreshing
        handleRefresh()
      }
    }
  }
  
  useEffect(() => {
    // Only create the preview if it's running
    if (!isRunning) return
    
    // Create a safe HTML template with CSP
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <!-- Add strict Content Security Policy -->
          <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'unsafe-inline'">
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
            // Safety wrapper for user code
            try {
              ${code}
            } catch (error) {
              console.error('Error in sketch:', error);
              document.body.innerHTML = '<div style="color: red; padding: 20px;"><h3>Error in sketch:</h3><pre>' + error.message + '</pre></div>';
            }
          </script>
        </body>
      </html>
    `
    
    if (iframeRef.current) {
      iframeRef.current.srcdoc = htmlTemplate
    }
  }, [code, isRunning, key])
  
  return (
    <div className="relative h-full w-full">
      <div className="absolute top-2 right-2 flex gap-2 z-10">
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-background/80 backdrop-blur-sm"
          onClick={toggleRunning}
        >
          {isRunning ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-background/80 backdrop-blur-sm"
          onClick={handleRefresh}
        >
          <RefreshIcon className="h-4 w-4" />
        </Button>
      </div>
      
      <iframe
        key={key}
        ref={iframeRef}
        className="h-full w-full border-0"
        title="JavaScript Preview"
        sandbox="allow-scripts"
        // Note: Removed allow-same-origin to prevent sandbox escape
      />
    </div>
  )
}
