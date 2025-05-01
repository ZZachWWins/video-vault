import { useEffect } from 'react';
import { gsap } from 'gsap';

const StarryBackground = () => {
  useEffect(() => {
    const stars = Array.from({ length: 50 }, (_, index) => ({
      id: index,
      size: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
    }));

    gsap.to('.star', {
      opacity: 0.3,
      repeat: -1,
      yoyo: true,
      duration: 2,
      stagger: 0.05,
    });
  }, []);

  return (
    <>
      {Array.from({ length: 50 }, (_, index) => (
        <div
          key={index}
          className="star"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </>
  );
};

export default StarryBackground;