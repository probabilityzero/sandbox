"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "../../ui/button"
import { RefreshCwIcon as RefreshIcon, SlidersIcon, ChevronDownIcon } from "lucide-react"
import { Card } from "../../ui/card"
import { Slider } from "../../ui/slider"
import { Label } from "../../ui/label"
import { Switch } from "../../ui/switch"

interface GLSLPreviewProps {
  code: string
}

export function GLSLPreview({ code }: GLSLPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [showControls, setShowControls] = useState(false)
  const [uniforms, setUniforms] = useState({
    u_time: 0,
    u_mouse: [0, 0],
    u_resolution: [0, 0],
  })
  const [params, setParams] = useState({
    animate: true,
    speed: 1.0,
  })
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(Date.now())
  const mousePositionRef = useRef<[number, number]>([0, 0])
  const programRef = useRef<WebGLProgram | null>(null)
  const glRef = useRef<WebGLRenderingContext | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const gl = canvas.getContext("webgl") as WebGLRenderingContext | null

    if (!gl) {
      setError("WebGL is not supported in your browser")
      return
    }

    glRef.current = gl

    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
        gl.viewport(0, 0, canvas.width, canvas.height)
        setUniforms((prev) => ({
          ...prev,
          u_resolution: [canvas.width, canvas.height],
        }))
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = rect.height - (e.clientY - rect.top)
      mousePositionRef.current = [x, y]
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    if (!vertexShader) {
      setError("Failed to create vertex shader")
      return
    }

    gl.shaderSource(vertexShader, vertexShaderSource)
    gl.compileShader(vertexShader)

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      setError(`Vertex shader compilation error: ${gl.getShaderInfoLog(vertexShader)}`)
      return
    }

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    if (!fragmentShader) {
      setError("Failed to create fragment shader")
      return
    }

    let newProgram: WebGLProgram | null = null

    try {
      gl.shaderSource(fragmentShader, code)
      gl.compileShader(fragmentShader)

      if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        setError(`Fragment shader compilation error: ${gl.getShaderInfoLog(fragmentShader)}`)
        return
      }

      const program = gl.createProgram()
      if (!program) {
        setError("Failed to create program")
        return
      }

      gl.attachShader(program, vertexShader)
      gl.attachShader(program, fragmentShader)
      gl.linkProgram(program)

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        setError(`Program linking error: ${gl.getProgramInfoLog(program)}`)
        return
      }

      newProgram = program

      const positionBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW,
      )

      const positionAttributeLocation = gl.getAttribLocation(program, "a_position")
      gl.enableVertexAttribArray(positionAttributeLocation)
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)

      const timeUniformLocation = gl.getUniformLocation(program, "u_time")
      const mouseUniformLocation = gl.getUniformLocation(program, "u_mouse")
      const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution")

      const render = (timestamp: number) => {
        if (!glRef.current || !programRef.current) return

        const elapsedTime = ((Date.now() - startTimeRef.current) / 1000) * params.speed

        if (timeUniformLocation) {
          glRef.current.uniform1f(timeUniformLocation, params.animate ? elapsedTime : uniforms.u_time)
        }

        if (mouseUniformLocation) {
          glRef.current.uniform2f(mouseUniformLocation, mousePositionRef.current[0], mousePositionRef.current[1])
        }

        if (resolutionUniformLocation) {
          glRef.current.uniform2f(resolutionUniformLocation, canvas.width, canvas.height)
        }

        glRef.current.drawArrays(glRef.current.TRIANGLE_STRIP, 0, 4)

        if (params.animate) {
          animationRef.current = requestAnimationFrame(render)
        }
      }

      if (params.animate) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
        animationRef.current = requestAnimationFrame(render)
      } else {
        render(0)
      }

      setError(null)
    } catch (err) {
      console.error("Shader error:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      programRef.current = newProgram
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)

      if (gl && programRef.current) {
        gl.deleteProgram(programRef.current)
      }
    }
  }, [code, params.animate, params.speed])

  useEffect(() => {
    if (glRef.current && programRef.current) {
      glRef.current.useProgram(programRef.current)
    }
  }, [programRef.current])

  const handleRefresh = () => {
    startTimeRef.current = Date.now()
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
    setUniforms({ ...uniforms })
  }

  const toggleControls = () => {
    setShowControls(!showControls)
  }

  const toggleAnimation = (checked: boolean) => {
    setParams({ ...params, animate: checked })
  }

  const updateSpeed = (value: number[]) => {
    setParams({ ...params, speed: value[0] })
  }

  return (
    <div className="flex flex-col h-full">
      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-2 rounded m-2 font-mono text-sm whitespace-pre-wrap">
          {error}
        </div>
      )}

      <div className={`flex-1 bg-muted ${showControls ? "h-2/3" : "h-full"}`}>
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {showControls && (
        <Card className="relative h-1/3 overflow-auto p-4 m-2">
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={toggleControls} 
            className="absolute right-2 top-2 h-6 w-6 p-0"
          >
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
          
          <h3 className="text-lg font-medium mb-4">Shader Controls</h3>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="animate-toggle" className="flex items-center gap-2">
                Animation
              </Label>
              <Switch id="animate-toggle" checked={params.animate} onCheckedChange={toggleAnimation} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="speed-slider">Speed</Label>
                <span className="text-sm text-muted-foreground">{params.speed.toFixed(1)}x</span>
              </div>
              <Slider
                id="speed-slider"
                min={0.1}
                max={3}
                step={0.1}
                value={[params.speed]}
                onValueChange={updateSpeed}
                disabled={!params.animate}
              />
            </div>
          </div>
        </Card>
      )}

      <div className="border-t p-2 flex items-center bg-background">
        <Button size="sm" variant="outline" onClick={handleRefresh} className="mr-2">
          <RefreshIcon className="h-3 w-3 mr-1" />
          Refresh
        </Button>
        <Button size="sm" variant={showControls ? "default" : "outline"} onClick={toggleControls} className="ml-auto">
          <SlidersIcon className="h-3 w-3 mr-1" />
          Controls
        </Button>
      </div>
    </div>
  )
}
