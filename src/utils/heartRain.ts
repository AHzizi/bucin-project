interface Heart {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

export default function heartRain() {
  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '999';
  document.body.appendChild(canvas);

  // Set canvas dimensions
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    document.body.removeChild(canvas);
    return;
  }

  const hearts: Heart[] = [];
  const heartCount = 50;
  
  // Create hearts
  for (let i = 0; i < heartCount; i++) {
    createHeart();
  }
  
  function createHeart() {
    hearts.push({
      x: Math.random() * canvas.width,
      y: -50 - Math.random() * 100, // Start above the screen
      size: 5 + Math.random() * 20,
      speed: 1 + Math.random() * 3,
      opacity: 0.5 + Math.random() * 0.5,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2
    });
  }
  
  function drawHeart(x: number, y: number, size: number, rotation: number) {
    if (!ctx) return;
    
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotation * Math.PI) / 180);
    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    
    // Heart shape
    const topCurveHeight = size * 0.3;
    ctx.bezierCurveTo(
      size / 2, -size / 2,
      size, -topCurveHeight,
      0, size
    );
    ctx.bezierCurveTo(
      -size, -topCurveHeight,
      -size / 2, -size / 2,
      0, 0
    );
    
    // Add gradient fill
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
    gradient.addColorStop(0, '#ff6b81');
    gradient.addColorStop(1, '#ff1493');
    
    ctx.fillStyle = gradient;
    ctx.fill();
    
    ctx.restore();
  }
  
  // Animation function
  function animate() {
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let stillVisible = false;
    
    hearts.forEach((heart, index) => {
      // Update position
      heart.y += heart.speed;
      heart.x += Math.sin(Date.now() * 0.001 + index) * 0.5; // Gentle sway
      heart.rotation += heart.rotationSpeed;
      
      // Check if still on screen
      if (heart.y < canvas.height + heart.size) {
        stillVisible = true;
        
        // Draw heart
        ctx.globalAlpha = heart.opacity;
        drawHeart(heart.x, heart.y, heart.size, heart.rotation);
      } else {
        // Recycle heart if it's off-screen
        hearts[index] = {
          x: Math.random() * canvas.width,
          y: -50 - Math.random() * 100,
          size: 5 + Math.random() * 20,
          speed: 1 + Math.random() * 3,
          opacity: 0.5 + Math.random() * 0.5,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 2
        };
        stillVisible = true;
      }
    });
    
    if (stillVisible) {
      requestAnimationFrame(animate);
    } else {
      document.body.removeChild(canvas);
    }
  }
  
  // Start animation
  animate();
  
  // Add more hearts periodically
  const heartInterval = setInterval(() => {
    if (hearts.length < 100) { // Cap at 100 hearts for performance
      createHeart();
    }
  }, 300);
  
  // Stop adding hearts and clean up after a while
  setTimeout(() => {
    clearInterval(heartInterval);
    
    setTimeout(() => {
      if (document.body.contains(canvas)) {
        document.body.removeChild(canvas);
      }
    }, 10000);
  }, 5000);
}