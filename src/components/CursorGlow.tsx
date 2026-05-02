import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';

export default function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();

  useEffect(() => {
    // Only track mouse if device has a pointer
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  if (theme !== 'dark') return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300 pointer-events-none hidden md:block" // Hidden on mobile where there's no cursor
      style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(191, 247, 71, 0.05), transparent 40%)`,
      }}
    />
  );
}
