"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export function Cursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorOpacity = useMotionValue(0);
  const [text, setText] = useState<string | null>(null);

  const springX = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 200 });
  const springOpacity = useSpring(cursorOpacity, { damping: 20, stiffness: 300 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleSectionChange = (e: Event) => {
      const detail = (e as CustomEvent<{ text: string | null }>).detail;
      if (detail.text) {
        setText(detail.text);
        cursorOpacity.set(1);
      } else {
        cursorOpacity.set(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("cursor-section", handleSectionChange);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("cursor-section", handleSectionChange);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed z-50 hidden md:block"
      style={{
        left: springX,
        top: springY,
        x: 20,
        y: 20,
        opacity: springOpacity,
      }}
    >
      <AnimatePresence mode="wait">
        {text && (
          <motion.p
            key={text}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="whitespace-nowrap rounded-full border border-muted-foreground/20 bg-background/80 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground backdrop-blur-sm sm:text-[11px] sm:tracking-[0.2em]"
          >
            {text}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
