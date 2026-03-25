"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { useCursorSection } from "@/hooks/use-cursor-section";

const FULL_NAME = "MELVIN PETIT";
const SUBTITLE = "Mon portfolio";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const cursorProps = useCursorSection("Scroller pour explorer");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId: number;
    const spans = section.querySelectorAll<HTMLSpanElement>(".char-span");

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        spans.forEach((span) => {
          const rect = span.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const dist = Math.sqrt(
            (e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2
          );
          span.style.color = dist < 60 ? "rgb(239, 68, 68)" : "";
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      {...cursorProps}
      className="relative flex min-h-[100dvh] cursor-default select-none flex-col justify-between overflow-x-hidden px-5 pb-8 pt-20 sm:px-8 sm:pb-10 sm:pt-22 md:px-10 md:pb-12 md:pt-24 lg:px-14"
    >
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
            href="https://github.com/WhiteMuush"
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
      <motion.div
        style={{ y: nameY, opacity: nameOpacity }}
        className="relative z-10 my-auto flex flex-col items-center justify-center py-6 sm:py-10 md:py-14 lg:py-16"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1.5,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="cursor-default whitespace-nowrap text-center font-serif text-[13vw] font-normal uppercase leading-[0.85] tracking-tight sm:text-[17vw] md:text-[15vw] lg:text-[13vw] xl:text-[12vw] 2xl:text-[11vw] bg-gradient-to-br from-foreground via-primary to-primary/60 bg-clip-text text-transparent"
          aria-label={FULL_NAME}
        >
          {FULL_NAME.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 1.6 + index * 0.04,
                duration: 0.5,
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
      </motion.div>

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
            href="https://github.com/WhiteMuush"
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
