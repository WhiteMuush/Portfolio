"use client";

import { motion } from "framer-motion";
import { useState, useCallback, useEffect, useRef } from "react";
import { useCursorSection } from "@/hooks/use-cursor-section";

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
  const cursorProps = useCursorSection("Enchanté 👋");

  return (
    <section
      id="about"
      {...cursorProps}
      className="cursor-default select-none px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-24 lg:px-14"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-45px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8 font-serif text-[16vw] leading-none tracking-tight text-foreground sm:text-[12vw] md:text-[9vw] lg:text-[7vw] sm:mb-12 md:mb-16"
      >
        À propos
      </motion.h2>

      <div className="flex flex-col gap-10 sm:gap-12 md:gap-16 lg:flex-row lg:gap-24">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:w-[65%] xl:w-[70%]"
        >
          <p className="font-serif text-xl leading-relaxed text-foreground sm:text-2xl md:text-3xl lg:text-4xl text-pretty">
            <HoverText>
              {"Enchanté ! Je m'appelle Melvin et je m'oriente en tant qu'Administrateur Systèmes & Cloud Junior avec une appétence pour le DevOps, la sécurité, l'automatisation et l'infrastructure cloud. Mon approche allie rigueur technique et veille constante pour concevoir des systèmes performants, sécurisés et évolutifs."}
            </HoverText>
          </p>
        </motion.div>

        {/* Right column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="lg:w-[35%] xl:w-[30%]"
        >
          <ul className="flex flex-row flex-wrap gap-6 sm:gap-8 lg:flex-col lg:gap-6">
            {INFO_ITEMS.map((item) => (
              <li key={item.label} className="min-w-[140px]">
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground sm:text-[11px] sm:tracking-[0.2em]">
                  {item.label}
                </p>
                <p className={`mt-1 text-sm text-foreground sm:text-base ${item.className ?? ""}`}>
                  <HoverText>{item.value}</HoverText>
                </p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Separator */}
      <div className="mt-16 h-px w-full bg-border sm:mt-20 md:mt-24" />
    </section>
  );
}
