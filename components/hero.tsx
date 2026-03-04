"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

const FULL_NAME = "MELVIN PETIT";
const SUBTITLE = "Mon portfolio";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 200 });
  const isCursorInSection = useMotionValue(0);
  const springOpacity = useSpring(isCursorInSection, { damping: 20, stiffness: 150 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const spans = section.querySelectorAll<HTMLSpanElement>(".char-span");
      spans.forEach((span) => {
        const rect = span.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.sqrt(
          (e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2
        );
        if (dist < 60) {
          span.style.color = "rgb(239, 68, 68)";
        } else {
          span.style.color = "";
        }
      });

      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const rect = section.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      isCursorInSection.set(inside ? 1 : 0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY, isCursorInSection]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100dvh] cursor-default select-none flex-col justify-between px-4 pb-8 pt-20 sm:px-6 sm:pb-10 sm:pt-22 md:px-12 md:pb-12 md:pt-24 lg:px-20"
    >
      {/* Scroll to explore - follows cursor */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
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
          Scroller pour explorer
        </p>
      </motion.div>

      {/* Top tagline */}
      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground sm:text-[12px] md:text-[13px] md:tracking-[0.2em]"
        >
          {"Technicien Cloud Junior — France/Toulouse".split("").map((char, index) => (
            <span
              key={index}
              className="char-span inline-block transition-colors duration-200"
              style={{ minWidth: char === " " ? "0.25em" : undefined }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="hidden items-center gap-6 md:flex lg:gap-8"
        >
          <a
            href="https://GitHub.com/WhiteMuush"
            target="_blank"
            rel="noopener noreferrer"
            className="group cursor-pointer text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-red-500"
          >
            {"GitHub "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
          <a
            href="https://linktr.ee/melvinpetit"
            target="_blank"
            rel="noopener noreferrer"
            className="group cursor-pointer text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-red-500"
          >
            {"Linktree "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
        </motion.div>
      </div>

      {/* Main name */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center py-6 sm:py-10 md:py-14 lg:py-16">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.1,
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="cursor-default text-center font-serif text-[15vw] font-normal uppercase leading-[0.85] tracking-tight sm:text-[13vw] md:text-[11vw] lg:text-[10vw] xl:text-[9vw] 2xl:text-[8vw] bg-gradient-to-br from-foreground via-primary to-primary/60 bg-clip-text text-transparent"
          aria-label={FULL_NAME}
        >
          {FULL_NAME.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 60, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                delay: 0.3 + index * 0.05,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="char-span inline-block transition-colors duration-200"
              style={{
                WebkitTextFillColor: "inherit",
                minWidth: char === " " ? "0.25em" : undefined,
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.webkitTextFillColor =
                  "rgb(239, 68, 68)";
                (e.target as HTMLElement).style.backgroundImage = "none";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.webkitTextFillColor = "";
                (e.target as HTMLElement).style.backgroundImage = "";
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2 text-center text-[3.5vw] font-medium uppercase tracking-[0.2em] text-muted-foreground sm:mt-3 sm:text-[2.5vw] sm:tracking-[0.3em] md:mt-4 md:text-[2vw] lg:text-[1.5vw] xl:text-[1.2vw] 2xl:text-[1vw]"
        >
          {SUBTITLE.split("").map((char, index) => (
            <span
              key={index}
              className="char-span inline-block transition-colors duration-200"
              style={{ minWidth: char === " " ? "0.25em" : undefined }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </motion.p>
      </div>

      {/* Bottom section */}
      <div className="relative z-10 flex flex-col gap-4 sm:gap-5 md:flex-row md:items-end md:justify-between md:gap-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="max-w-xs font-serif text-base text-foreground/70 italic sm:max-w-sm sm:text-lg md:max-w-md md:text-xl"
        >
          {"Culture, Automatisation, Mesure, Partage."
            .split("")
            .map((char, index) => (
              <span
                key={index}
                className="char-span inline-block transition-colors duration-200"
                style={{ minWidth: char === " " ? "0.25em" : undefined }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
        </motion.p>

        {/* Mobile links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="flex items-center gap-5 sm:gap-6 md:hidden"
        >
          <a
            href="https://GitHub.com/WhiteMuush"
            target="_blank"
            rel="noopener noreferrer"
            className="group cursor-pointer text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-red-500"
          >
            {"GitHub "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
          <a
            href="https://linktr.ee/melvinpetit"
            target="_blank"
            rel="noopener noreferrer"
            className="group cursor-pointer text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-red-500"
          >
            {"Linktree "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
