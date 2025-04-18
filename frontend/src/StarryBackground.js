import React, { useEffect } from 'react';

function StarryBackground() {
  useEffect(() => {
    const createStars = () => {
      const app = document.querySelector('.app');
      const starCount = 100;

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = `${Math.random() * 3}px`;
        star.style.height = star.style.width;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        app.appendChild(star);
      }
    };

    createStars();
  }, []);

  return null;
}

export default StarryBackground;