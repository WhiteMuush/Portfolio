"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useState, useCallback, useEffect, useRef } from "react";

const INFO_ITEMS = [
  { label: "Localisation", value: "France/Toulouse" },
  { label: "Statut", value: "Disponible", className: "text-green-400" },
];

function HoverText({ children, className }: { children: string; className?: string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = useCallback((index: number) => {
    setHoveredIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const section = container.closest("#about");
    if (!section) return;

    const onEnter = () => setIsActive(true);
    const onLeave = () => {
      setIsActive(false);
      setHoveredIndex(null);
    };

    section.addEventListener("mouseenter", onEnter);
    section.addEventListener("mouseleave", onLeave);

    return () => {
      section.removeEventListener("mouseenter", onEnter);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <span ref={containerRef} className={`${className ?? ""} select-none`}>
      {children.split("").map((char, index) => {
        const distance = isActive && hoveredIndex !== null ? Math.abs(index - hoveredIndex) : Infinity;
        const isClose = distance <= 3;
        const opacity = isClose ? Math.max(0.4, 1 - distance * 0.2) : 0;

        return (
          <span
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            className="cursor-default transition-colors duration-150"
            style={{
              color: isActive && isClose ? `rgba(244, 114, 182, ${opacity})` : undefined,
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorOpacity = useMotionValue(0);

  const springX = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 200 });
  const springOpacity = useSpring(cursorOpacity, { damping: 20, stiffness: 300 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      cursorOpacity.set(1);
      setIsSectionHovered(true);
    };

    const handleMouseLeave = () => {
      cursorOpacity.set(0);
      setIsSectionHovered(false);
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, cursorOpacity]);

  return (
    <section ref={sectionRef} id="about" className="px-6 py-24 md:px-12 lg:px-20 cursor-default select-none">
      {/* Enchanté - follows cursor, only visible in this section */}
      {isSectionHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none fixed z-50"
          style={{
            left: springX,
            top: springY,
            x: 20,
            y: 20,
            opacity: springOpacity,
          }}
        >
          <p className="whitespace-nowrap rounded-full border border-muted-foreground/20 bg-background/80 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground backdrop-blur-sm sm:text-[11px] sm:tracking-[0.2em]">
            Enchanté 👋
          </p>
        </motion.div>
      )}

      {/* Section label */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground"
      >
        À propos
      </motion.p>

      <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">
        {/* Left column — 70% */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:w-[70%]"
        >
          <p className="font-serif text-2xl leading-relaxed text-foreground md:text-3xl lg:text-4xl">
            <HoverText>
              {"DevOps Junior passionné par l'automatisation, le scripting Bash, la sécurité et l'infrastructure. Je conçois des outils CLI qui simplifient les opérations complexes et crée des environnements résilients et reproductibles."}
            </HoverText>
          </p>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground">
          </p>
        </motion.div>

        {/* Right column — 30% */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="lg:w-[30%]"
        >
          <ul className="flex flex-col gap-6">
            {INFO_ITEMS.map((item) => (
              <li key={item.label}>
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-1 text-base text-foreground">
                  <HoverText>{item.value}</HoverText>
                </p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Separator */}
      <div className="mt-24 h-px w-full bg-border" />
    </section>
  );
}
