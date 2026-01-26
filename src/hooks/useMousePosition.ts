'use client';

import { useState, useEffect } from 'react';
import { useMotionValue, useSpring, MotionValue } from 'framer-motion';

interface MousePosition {
  x: number;
  y: number;
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}

// Spring config from PRD Section 2.4 - smooth following for cursor effects
const smoothSpring = { stiffness: 150, damping: 20 };

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  // Raw motion values that update immediately
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smoothed values with spring physics for organic lag
  const smoothX = useSpring(mouseX, smoothSpring);
  const smoothY = useSpring(mouseY, smoothSpring);

  useEffect(() => {
    // SSR guard
    if (typeof window === 'undefined') return;

    const handleMouseMove = (e: MouseEvent) => {
      // Update raw position state
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Update motion values (these drive the springs)
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return {
    x: position.x,
    y: position.y,
    smoothX,
    smoothY,
  };
}
