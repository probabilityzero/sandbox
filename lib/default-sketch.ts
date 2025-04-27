export const defaultJavaScriptSketch = `function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 100);
  noStroke();
}

function draw() {
  background(20);
  
  // Draw a grid of circles
  const size = 30;
  const spacing = 40;
  
  for (let x = spacing; x < width - spacing; x += spacing) {
    for (let y = spacing; y < height - spacing; y += spacing) {
      // Calculate distance from mouse
      const d = dist(mouseX, mouseY, x, y);
      
      // Map distance to hue and size
      const hue = map(d, 0, 300, 0, 100) % 100;
      const s = map(sin(frameCount * 0.05 + x * 0.1 + y * 0.1), -1, 1, 0.5, 1.5);
      
      fill(hue, 80, 90);
      circle(x, y, size * s);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}`

export const defaultPythonSketch = `import numpy as np
from js import window, document, console
import pyodide

# Setup function - runs once
def setup():
    global canvas, width, height, ctx
    
    # Create canvas
    canvas = document.createElement('canvas')
    width = window.innerWidth
    height = window.innerHeight
    canvas.width = width
    canvas.height = height
    document.body.appendChild(canvas)
    
    # Get context
    ctx = canvas.getContext('2d')
    
    # Start animation
    window.requestAnimationFrame(pyodide.create_proxy(draw))

# Draw function - runs every frame
def draw(timestamp):
    global canvas, width, height, ctx
    
    # Clear canvas
    ctx.fillStyle = 'rgb(20, 20, 20)'
    ctx.fillRect(0, 0, width, height)
    
    # Draw grid of circles
    size = 30
    spacing = 40
    
    for x in range(spacing, width - spacing, spacing):
        for y in range(spacing, height - spacing, spacing):
            # Calculate distance from mouse
            dx = x - window.mouseX
            dy = y - window.mouseY
            d = np.sqrt(dx*dx + dy*dy)
            
            # Map distance to hue
            hue = (d % 300) / 300 * 360
            
            # Calculate size variation
            s = 0.5 + np.sin(timestamp * 0.001 + x * 0.1 + y * 0.1) * 0.5
            
            # Draw circle
            ctx.beginPath()
            ctx.arc(x, y, size * s, 0, 2 * np.pi)
            ctx.fillStyle = f'hsl({hue}, 80%, 60%)'
            ctx.fill()
    
    # Continue animation
    window.requestAnimationFrame(pyodide.create_proxy(draw))

# Initialize
setup()
`

export const defaultGLSLSketch = `// Fragment shader
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

void main() {
    // Normalized coordinates (0 to 1)
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    
    // Center the coordinates (-.5 to .5)
    st = st * 2.0 - 1.0;
    
    // Correct aspect ratio
    st.x *= u_resolution.x / u_resolution.y;
    
    // Mouse position (normalized and centered)
    vec2 mouse = u_mouse / u_resolution.xy;
    mouse = mouse * 2.0 - 1.0;
    mouse.x *= u_resolution.x / u_resolution.y;
    
    // Calculate distance from each point to mouse
    float d = distance(st, mouse);
    
    // Create circular waves emanating from mouse position
    float freq = 10.0;
    float wave = sin(d * freq - u_time * 2.0) * 0.5 + 0.5;
    
    // Create color
    vec3 color = vec3(0.0);
    color = mix(
        vec3(0.0, 0.5, 1.0),  // Blue
        vec3(1.0, 0.0, 0.5),  // Pink
        wave
    );
    
    // Add glow around mouse
    float glow = 0.05 / d;
    color += vec3(glow * 0.5);
    
    gl_FragColor = vec4(color, 1.0);
}`

type LanguageType = "javascript" | "python" | "glsl"

export const getDefaultSketch = (language: LanguageType) => {
  switch (language) {
    case "javascript":
      return defaultJavaScriptSketch
    case "python":
      return defaultPythonSketch
    case "glsl":
      return defaultGLSLSketch
    default:
      return defaultJavaScriptSketch
  }
}
