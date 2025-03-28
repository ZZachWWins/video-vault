import React, { useEffect, useRef } from 'react';
import './App.css';

function StarryBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const stars = Array.from({ length: 50 }, () => ({
      x: Math.random() * (canvas?.width || window.innerWidth),
      y: Math.random() * (canvas?.height || window.innerHeight),
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.5,
    }));

    const getScaledPoints = (basePoints, width, height) => {
      return basePoints.map(([x, y]) => [(x / 1000) * width, (y / 800) * height]);
    };

    const constellations = [
      { points: getScaledPoints([[300, 200], [350, 200], [400, 200], [350, 250], [350, 300]], canvas?.width || window.innerWidth, canvas?.height || window.innerHeight), color: '#d4af37' },
      { points: getScaledPoints([[600, 400], [650, 350], [700, 350], [750, 400], [800, 450], [850, 500], [900, 550]], canvas?.width || window.innerWidth, canvas?.height || window.innerHeight), color: '#ffffff' },
    ];

    const animate = () => {
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach((star) => {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
          ctx.fill();
          star.alpha += Math.random() * 0.05 - 0.025;
          star.alpha = Math.max(0.5, Math.min(1, star.alpha));
        });

        constellations.forEach((constellation) => {
          ctx.beginPath();
          ctx.strokeStyle = constellation.color;
          ctx.lineWidth = 1;
          constellation.points.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
          ctx.stroke();
        });

        animationFrameId = requestAnimationFrame(animate);
      }
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="starry-background" />;
}

export default StarryBackground;