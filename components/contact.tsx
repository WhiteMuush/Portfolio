"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
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
    };

    const handleMouseLeave = () => {
      cursorOpacity.set(0);
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, cursorOpacity]);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const handleMouseMove = (e: MouseEvent) => {
      const spans = heading.querySelectorAll<HTMLSpanElement>(".char-span");
      spans.forEach((span) => {
        const rect = span.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.sqrt(
          (e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2
        );
        if (dist < 60) {
          span.style.color = "#7dd3fc";
        } else {
          span.style.color = "";
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const text = "Travaillons ensemble.";

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="flex cursor-default select-none flex-col items-center justify-center px-6 py-32 text-center md:px-12 lg:px-20"
    >
      {/* Cursor follower */}
      <motion.div
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
          Hésitez pas à me contacter !
        </p>
      </motion.div>

      <motion.h2
        ref={headingRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="cursor-default select-none font-serif text-4xl text-foreground md:text-6xl lg:text-7xl"
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
          {"Email "}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          </span>
        </a>
        <a
          href="https://github.com/WhiteMuush"
          target="_blank"
          rel="noopener noreferrer"
          className="group cursor-pointer select-none text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
        >
          {"GitHub "}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          </span>
        </a>
        <a
          href="https://www.linkedin.com/in/melvin-petit/"
          target="_blank"
          rel="noopener noreferrer"
          className="group cursor-pointer select-none text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
        >
          {"LinkedIn "}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          </span>
        </a>
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-24 cursor-default select-none text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50"
      >
        {"Melvin Petit — 2026"}
      </motion.p>
    </section>
  );
}
