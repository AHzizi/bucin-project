import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  rotation: number;
  xSpeed: number;
  ySpeed: number;
  rotationSpeed: number;
  opacity: number;
}

export const FallingPetals: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize petals
    const initPetals = () => {
      const petalsCount = Math.max(50, Math.floor(window.innerWidth / 20)); // Responsive count
      petalsRef.current = [];

      for (let i = 0; i < petalsCount; i++) {
        petalsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          size: Math.random() * 10 + 8,
          rotation: Math.random() * 360,
          xSpeed: Math.random() * 1 - 0.5,
          ySpeed: Math.random() * 1 + 0.5,
          rotationSpeed: Math.random() * 1 - 0.5,
          opacity: Math.random() * 0.5 + 0.3
        });
      }
    };

    // Draw a petal
    const drawPetal = (petal: Petal) => {
      if (!ctx) return;
      
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate((petal.rotation * Math.PI) / 180);
      ctx.beginPath();
      
      // Petal shape
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(
        petal.size / 2, -petal.size / 2,
        petal.size, -petal.size / 4,
        petal.size, 0
      );
      ctx.bezierCurveTo(
        petal.size, petal.size / 4,
        petal.size / 2, petal.size / 2,
        0, 0
      );
      
      // Gradient for realistic look
      const gradient = ctx.createRadialGradient(
        petal.size / 2, 0, 0,
        petal.size / 2, 0, petal.size
      );
      
      gradient.addColorStop(0, `rgba(255, 182, 193, ${petal.opacity})`);
      gradient.addColorStop(1, `rgba(255, 192, 203, ${petal.opacity * 0.7})`);
      
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      petalsRef.current.forEach(petal => {
        // Update position
        petal.y += petal.ySpeed;
        petal.x += petal.xSpeed;
        petal.rotation += petal.rotationSpeed;
        
        // Add some wind effect
        petal.x += Math.sin(Date.now() * 0.001) * 0.5;
        
        // Reset if off-screen
        if (petal.y > canvas.height) {
          petal.y = -petal.size;
          petal.x = Math.random() * canvas.width;
        }
        
        if (petal.x < -petal.size) {
          petal.x = canvas.width + petal.size;
        } else if (petal.x > canvas.width + petal.size) {
          petal.x = -petal.size;
        }
        
        drawPetal(petal);
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Setup
    window.addEventListener('resize', () => {
      resizeCanvas();
      initPetals();
    });
    
    resizeCanvas();
    initPetals();
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40"
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%',
        pointerEvents: 'none'
      }}
    />
  );
};