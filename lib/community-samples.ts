import type { LanguageType } from "@/types/project"

// Define a better type structure that works
interface CommunityCodeSamples {
  [key: string]: string;
  default: {
    [key in LanguageType]: string;
  };
}

export const COMMUNITY_PROJECT_CODE_SAMPLES: CommunityCodeSamples = {
  // Particle System
  "1": `let particles = [];
const PARTICLE_COUNT = 500;
const FORCE_STRENGTH = 0.1;
const MAX_SPEED = 3;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  
  // Create initial particles
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      vx: random(-1, 1),
      vy: random(-1, 1),
      radius: random(2, 6),
      color: color(random(150, 255), random(150, 255), random(150, 255), 150)
    });
  }
}

function draw() {
  background(10, 10, 15);
  
  // Create force fields
  let forceX = map(mouseX, 0, width, -1, 1);
  let forceY = map(mouseY, 0, height, -1, 1);
  
  // Update and display particles
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    
    // Apply forces
    p.vx += forceX * FORCE_STRENGTH;
    p.vy += forceY * FORCE_STRENGTH;
    
    // Limit speed
    let speed = sqrt(p.vx * p.vx + p.vy * p.vy);
    if (speed > MAX_SPEED) {
      p.vx = (p.vx / speed) * MAX_SPEED;
      p.vy = (p.vy / speed) * MAX_SPEED;
    }
    
    // Update position
    p.x += p.vx;
    p.y += p.vy;
    
    // Wrap around edges
    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;
    
    // Display particle
    fill(p.color);
    noStroke();
    circle(p.x, p.y, p.radius * 2);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}`,

  // Audio Visualizer
  "2": `let mic;
let fft;
let spectrum = [];
const BANDS = 256;
const MIN_RADIUS = 100;
const MAX_RADIUS = 300;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  
  // Setup audio input
  mic = new p5.AudioIn();
  mic.start();
  
  // Create FFT analyzer
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(10, 10, 15);
  translate(width/2, height/2);
  
  // Analyze audio
  fft.analyze();
  spectrum = fft.logAverages(fft.getOctaveBands(5));
  
  // Draw circular visualizer
  noFill();
  strokeWeight(2);
  
  // Draw frequency bands
  for (let i = 0; i < spectrum.length; i++) {
    let angle = map(i, 0, spectrum.length, 0, 360);
    let amp = spectrum[i];
    let r = map(amp, 0, 255, MIN_RADIUS, MAX_RADIUS);
    
    let x = r * cos(angle);
    let y = r * sin(angle);
    
    let hue = map(i, 0, spectrum.length, 0, 360);
    stroke(hue, 80, 100, 0.8);
    
    line(0, 0, x, y);
    
    // Create circular shape
    stroke(hue, 100, 100);
    noFill();
    
    let rad = map(spectrum[i], 0, 255, 5, 50);
    circle(x, y, rad);
  }
  
  // Draw center circle
  fill(255, 100);
  noStroke();
  circle(0, 0, MIN_RADIUS / 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}`,

  // Fractal Explorer (Python)
  "3": `import js
from pyodide.ffi import create_proxy
import numpy as np

# Global variables
width = 800
height = 600
max_iterations = 100
center_x = -0.5
center_y = 0
zoom = 250
is_dragging = False
drag_start_x = 0
drag_start_y = 0
drag_prev_center_x = 0
drag_prev_center_y = 0

def compute_mandelbrot(h, w, max_iter):
    y, x = np.ogrid[-1.4:1.4:h*1j, -2:0.8:w*1j]
    c = x + y*1j
    z = c
    divtime = max_iter + np.zeros(z.shape, dtype=int)
    
    for i in range(max_iter):
        z = z**2 + c
        diverge = z*np.conj(z) > 2**2
        div_now = diverge & (divtime == max_iter)
        divtime[div_now] = i
        z[diverge] = 2
    
    return divtime

def map_color(iterations, max_iter):
    if iterations == max_iter:
        return [0, 0, 0]
    
    # Color mapping - adjust to your liking
    h = 0.5 + iterations / max_iter
    s = 0.8
    v = iterations / max_iter
    
    # HSV to RGB conversion (simplified)
    h_i = int(h * 6)
    f = h * 6 - h_i
    p = v * (1 - s)
    q = v * (1 - f * s)
    t = v * (1 - (1 - f) * s)
    
    if h_i == 0:
        r, g, b = v, t, p
    elif h_i == 1:
        r, g, b = q, v, p
    elif h_i == 2:
        r, g, b = p, v, t
    elif h_i == 3:
        r, g, b = p, q, v
    elif h_i == 4:
        r, g, b = t, p, v
    else:
        r, g, b = v, p, q
    
    return [int(r * 255), int(g * 255), int(b * 255)]

def setup():
    global p5
    p5 = js.window.p5
    p5.createCanvas(width, height)
    draw_fractal()

def draw_fractal():
    global center_x, center_y, zoom, p5
    
    # Clear canvas
    p5.background(20)
    
    # Draw the Mandelbrot set
    for y in range(height):
        for x in range(width):
            # Map pixel to complex plane
            real = center_x + (x - width / 2) / zoom
            imag = center_y + (y - height / 2) / zoom
            
            # Compute iterations at this point
            c = complex(real, imag)
            z = 0
            iteration = 0
            
            while abs(z) < 2 and iteration < max_iterations:
                z = z*z + c
                iteration += 1
            
            # Color based on iteration count
            if iteration < max_iterations:
                # Smooth coloring
                log_zn = np.log(abs(z)) / 2
                nu = np.log(log_zn / np.log(2)) / np.log(2)
                iteration = iteration + 1 - nu
                
                color = map_color(iteration, max_iterations)
                p5.stroke(color[0], color[1], color[2])
            else:
                p5.stroke(0)
            
            p5.point(x, y)

def mouse_pressed(event):
    global is_dragging, drag_start_x, drag_start_y, drag_prev_center_x, drag_prev_center_y
    is_dragging = True
    drag_start_x = p5.mouseX
    drag_start_y = p5.mouseY
    drag_prev_center_x = center_x
    drag_prev_center_y = center_y

def mouse_released(event):
    global is_dragging
    is_dragging = False

def mouse_dragged(event):
    global center_x, center_y, drag_start_x, drag_start_y, drag_prev_center_x, drag_prev_center_y
    if is_dragging:
        dx = p5.mouseX - drag_start_x
        dy = p5.mouseY - drag_start_y
        
        center_x = drag_prev_center_x - dx / zoom
        center_y = drag_prev_center_y - dy / zoom
        
        draw_fractal()

def mouse_wheel(event):
    global zoom, center_x, center_y
    
    # Get mouse position in complex plane before zoom
    old_real = center_x + (p5.mouseX - width / 2) / zoom
    old_imag = center_y + (p5.mouseY - height / 2) / zoom
    
    # Adjust zoom
    e = event.get('deltaY')
    if e < 0:  # Zoom in
        zoom *= 1.2
    else:      # Zoom out
        zoom /= 1.2
    
    # Recalculate center based on mouse position
    new_center_x = old_real - (p5.mouseX - width / 2) / zoom
    new_center_y = old_imag - (p5.mouseY - height / 2) / zoom
    
    center_x = new_center_x
    center_y = new_center_y
    
    draw_fractal()

def draw():
    # We're doing all the drawing in the event handlers
    pass

# Register event handlers
js.window.setup = create_proxy(setup)
js.window.draw = create_proxy(draw)
js.window.mousePressed = create_proxy(mouse_pressed)
js.window.mouseReleased = create_proxy(mouse_released)
js.window.mouseDragged = create_proxy(mouse_dragged)
js.window.mouseWheel = create_proxy(mouse_wheel)`,

  // Fluid Simulation (GLSL)
  "4": `precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

// Fluid simulation parameters
const float viscosity = 0.1;
const float speed = 25.0;
const int iterations = 15;

// UV coordinates and pixel size
vec2 getUV(vec2 fragCoord) {
  return fragCoord.xy / u_resolution.xy;
}

float rand(vec2 co) {
  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

// Simulate fluid dynamics
vec3 fluid(vec2 uv) {
  float time = u_time * 0.5;
  vec2 p = uv * 8.0;
  
  // Mouse interaction
  vec2 mouse = u_mouse.xy / u_resolution.xy;
  float mouseForce = 0.0;
  
  if (mouse.x > 0.0 && mouse.y > 0.0) {
    float dist = length(uv - mouse);
    mouseForce = exp(-dist * 10.0) * 2.0;
  }
  
  // Fluid dynamics simulation
  float x = p.x;
  float y = p.y;
  
  float vx = 0.0;
  float vy = 0.0;
  
  // Iterate to improve simulation
  for (int i = 1; i < iterations; i++) {
    float n = float(i) * 0.1;
    float t = time * (1.0 - 0.5 / float(i));
    
    // Advection terms
    vx += 0.2 * cos(n * x + t + 0.8 * cos(n * y + t)) + mouseForce * (uv.x - mouse.x);
    vy += 0.2 * cos(n * y + t + 0.8 * cos(n * x + t)) + mouseForce * (uv.y - mouse.y);
  }
  
  // Apply viscosity
  vx *= viscosity;
  vy *= viscosity;
  
  // Get velocity magnitude
  float vel = length(vec2(vx, vy));
  
  // Create color based on velocity and position
  vec3 color = mix(
    vec3(0.1, 0.4, 0.7), 
    vec3(0.7, 0.2, 0.8),
    smoothstep(0.0, 1.5, vel)
  );
  
  // Add some noise for more organic look
  float noise = rand(uv + time * 0.01) * 0.02;
  
  // Apply brightness based on velocity
  color *= (0.6 + 0.4 * vel + noise);
  
  // Calculate fluid "density"
  float density = smoothstep(0.05, 0.0, vel);
  
  return color;
}

void main() {
  vec2 uv = getUV(gl_FragCoord.xy);
  vec3 color = fluid(uv);
  
  // Apply some bloom effect
  color = pow(color, vec3(0.8));
  
  gl_FragColor = vec4(color, 1.0);
}`,

  // Default samples for each language
  default: {
    javascript: `function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  ellipse(mouseX, mouseY, 80, 80);
}`,
    
    python: `import js
from pyodide.ffi import create_proxy

def setup():
    p5 = js.window.p5
    p5.createCanvas(400, 400)

def draw():
    p5 = js.window.p5
    p5.background(220)
    p5.ellipse(p5.mouseX, p5.mouseY, 80, 80)

# Setup p5js event listeners
js.window.setup = create_proxy(setup)
js.window.draw = create_proxy(draw)`,
    
    glsl: `precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    gl_FragColor = vec4(st.x, st.y, abs(sin(u_time * 0.5)), 1.0);
}`
  }
}