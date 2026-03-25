"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { useCursorSection } from "@/hooks/use-cursor-section";

export function Contact() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cursorProps = useCursorSection("Hésitez pas à me contacter !");

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    let rafId: number;
    const spans = heading.querySelectorAll<HTMLSpanElement>(".char-span");

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
          span.style.color = dist < 60 ? "#7dd3fc" : "";
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const text = "Travaillons ensemble !";

  return (
    <section
      id="contact"
      {...cursorProps}
      className="relative flex cursor-default select-none flex-col items-center justify-center overflow-hidden px-5 pb-20 pt-20 text-center sm:px-8 sm:pb-24 sm:pt-28 md:px-10 md:pt-32 lg:px-14"
    >
      {/* Heading */}
      <motion.h2
        ref={headingRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="cursor-default select-none font-serif text-3xl text-foreground sm:text-4xl md:text-6xl lg:text-7xl"
      >
        {text.split("").map((char, i) => (
          <span
            key={i}
            className="char-span inline-block transition-colors duration-200"
            style={{ minWidth: char === " " ? "0.25em" : undefined }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </motion.h2>

      {/* Links */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-12 flex items-center gap-8"
      >
        <a
          href="mailto:melvin.petit31@gmail.com"
          className="group cursor-pointer select-none text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
        >
          Email{" "}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
        </a>
        <a
          href="https://github.com/WhiteMuush"
          target="_blank"
          rel="noopener noreferrer"
          className="group cursor-pointer select-none text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
        >
          GitHub{" "}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
        </a>
        <a
          href="https://www.linkedin.com/in/melvin-petit/"
          target="_blank"
          rel="noopener noreferrer"
          className="group cursor-pointer select-none text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
        >
          LinkedIn{" "}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
        </a>
      </motion.div>

      {/* Copyright */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-16 cursor-default select-none text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50"
      >
        Melvin Petit — 2026
      </motion.p>

    </section>
  );
}
