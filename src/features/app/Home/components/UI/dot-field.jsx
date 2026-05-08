import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useCallback } from "react";

export function DotField({ 
  className = "",
  dotCount = 120,
  mouseSensitivity = 0.3,
  glowIntensity = 1,
  gridOpacity = 0.15
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef(null);

  // Enhanced smooth mouse tracking
  const smoothX = useSpring(mouseX, { 
    stiffness: 120, 
    damping: 30,
    restDelta: 0.1
  });
  const smoothY = useSpring(mouseY, { 
    stiffness: 120, 
    damping: 30,
    restDelta: 0.1
  });

  // Dynamic radius & intensity based on mouse speed
  const radius = useTransform(smoothX, latest => Math.min(250, Math.max(60, 180)));
  const glowRadius = useSpring(radius, { stiffness: 250, damping: 35 });

  // Performance: throttle mouse move
  const rafRef = useRef(0);
  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    
    rafRef.current = requestAnimationFrame(() => {
      mouseX.set(e.clientX * mouseSensitivity);
      mouseY.set(e.clientY * mouseSensitivity);
    });
  }, [mouseX, mouseY, mouseSensitivity]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  // Generate dots with better distribution
  const dots = Array.from({ length: dotCount }, (_, i) => {
    const angle = (i / dotCount) * Math.PI * 2;
    const baseDistance = 90 + Math.sin(i * 0.15) * 40;
    const phaseOffset = i * 0.1;
    
    return {
      id: i,
      angle,
      distance: baseDistance,
      size: 1.2 + Math.sin(i * 0.25) * 1.2,
      hue: 210 + Math.sin(i * 0.18 + Date.now() * 0.0001) * 30,
      phaseOffset,
      speed: 0.8 + Math.random() * 0.4
    };
  });

  return (
    <div 
      ref={containerRef}
      className={`dot-field-container ${className}`}
      style={{ 
        '--grid-opacity': gridOpacity,
        '--glow-intensity': glowIntensity
      }}
    >
      {/* Enhanced Background Grid */}
      <div 
        className="dot-field__grid"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255,255,255,${gridOpacity * 0.3}) 1px, transparent 0),
            radial-gradient(circle at 1px 1px, rgba(59,130,246,${gridOpacity * 0.1}) 1px, transparent 0),
            linear-gradient(#000 1px, transparent 1px),
            linear-gradient(90deg, #000 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Floating Dots */}
      {dots.map(({ id, angle, distance, size, hue, phaseOffset, speed }) => (
        <Dot 
          key={id}
          angle={angle}
          distance={distance}
          size={size}
          hue={hue}
          phaseOffset={phaseOffset}
          speed={speed}
          smoothX={smoothX}
          smoothY={smoothY}
        />
      ))}

      {/* Multi-layer Mouse Glow */}
      <motion.div
        className="dot-field__mouse-glow-outer"
        style={{
          x: smoothX,
          y: smoothY,
          scale: useSpring(glowRadius, { stiffness: 300, damping: 40 }),
          opacity: 0.4 * glowIntensity
        }}
        animate={{
          boxShadow: [
            "0 0 20px rgba(59,130,246,0.2)",
            "0 0 60px rgba(59,130,246,0.5)",
            "0 0 100px rgba(59,130,246,0.3)"
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
      />
      
      <motion.div
        className="dot-field__mouse-glow-inner"
        style={{
          x: smoothX,
          y: smoothY,
          scale: radius,
          opacity: 0.7 * glowIntensity
        }}
        animate={{
          background: [
            "radial-gradient(circle, rgba(99,102,241,0.8) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(139,92,246,0.9) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(59,130,246,0.8) 0%, transparent 70%)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
      />
    </div>
  );
}

// Optimized single dot component
function Dot({ angle, distance, size, hue, phaseOffset, speed, smoothX, smoothY }) {
  const x = useTransform(smoothX, x => 
    `calc(${x}px + ${Math.cos(angle + phaseOffset) * distance}px)`
  );
  const y = useTransform(smoothY, y => 
    `calc(${y}px + ${Math.sin(angle + phaseOffset) * distance}px)`
  );

  return (
    <motion.div
      className="dot-field__dot"
      style={{
        x,
        y,
        width: size,
        height: size,
        background: `hsl(${hue}, 65%, 55%)`,
        filter: "blur(0.4px)",
        boxShadow: `0 0 8px hsla(${hue}, 65%, 55%, 0.4)`
      }}
      initial={{ opacity: 0.3, scale: 0.7 }}
      animate={{
        opacity: [0.2, 0.9, 0.6, 0.3],
        scale: [0.7, 1.4, 1.1, 0.7],
        rotate: [0, 180, 360]
      }}
      transition={{
        duration: 10 + speed * 5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        times: [0, 0.35, 0.75, 1]
      }}
    />
  );
}