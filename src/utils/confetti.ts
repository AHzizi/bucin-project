interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  velocity: {
    x: number;
    y: number;
  };
  rotationSpeed: number;
  gravity: number;
  alpha: number;
  alphaDecay: number;
}

const colors = [
  '#ffb6c1', // Light pink
  '#ff69b4', // Hot pink
  '#ff1493', // Deep pink
  '#ffffff', // White
  '#fff0f5', // Lavender blush
  '#ff6b81', // Pink
  '#ffe4e1', // Misty rose
];

export default function confetti() {
  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '1000';
  document.body.appendChild(canvas);

  // Set canvas dimensions
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    document.body.removeChild(canvas);
    return;
  }

  const particles: Particle[] = [];
  const particleCount = 200;
  
  // Create particles
  for (let i = 0; i < particleCount; i++) {
    const size = Math.random() * 10 + 5;
    
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      size,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      velocity: {
        x: (Math.random() - 0.5) * 15,
        y: (Math.random() - 0.5) * 15
      },
      rotationSpeed: (Math.random() - 0.5) * 10,
      gravity: 0.1 + Math.random() * 0.1,
      alpha: 1,
      alphaDecay: 0.005 + Math.random() * 0.01
    });
  }

  // Animation function
  function animate() {
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let stillActive = false;
    
    particles.forEach(particle => {
      if (particle.alpha <= 0) return;
      
      stillActive = true;
      particle.velocity.y += particle.gravity;
      
      particle.x += particle.velocity.x;
      particle.y += particle.velocity.y;
      particle.rotation += particle.rotationSpeed;
      particle.alpha -= particle.alphaDecay;
      
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate((particle.rotation * Math.PI) / 180);
      ctx.globalAlpha = particle.alpha;
      
      // Randomly draw different shapes (squares, circles, hearts)
      const shapeType = Math.floor(Math.random() * 3);
      
      ctx.fillStyle = particle.color;
      
      if (shapeType === 0) {
        // Square/rectangle
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
      } else if (shapeType === 1) {
        // Circle
        ctx.beginPath();
        ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Heart shape
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(
          particle.size / 2, -particle.size / 2,
          particle.size, 0,
          0, particle.size
        );
        ctx.bezierCurveTo(
          -particle.size, 0,
          -particle.size / 2, -particle.size / 2,
          0, 0
        );
        ctx.fill();
      }
      
      ctx.restore();
    });
    
    if (stillActive) {
      requestAnimationFrame(animate);
    } else {
      document.body.removeChild(canvas);
    }
  }
  
  // Start animation
  animate();
  
  // Remove canvas after animation is complete (safety cleanup)
  setTimeout(() => {
    if (document.body.contains(canvas)) {
      document.body.removeChild(canvas);
    }
  }, 8000);
}

