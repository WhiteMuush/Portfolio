"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const ITEMS = [
  "Bash", "PowerShell", "Linux", "Microsoft Azure",
  "DevOps", "Scripting", "Automatisation", "Cloud",
  "Sécurité", "Infrastructure", "Réseau", "Git",
];

export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "100px" });
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div ref={ref} className="relative overflow-hidden border-y border-border py-4">
      <motion.div
        animate={inView ? { x: "-33.333%" } : false}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex w-max gap-10"
      >
        {repeated.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground/60 sm:text-[11px]"
          >
            {item}
            <span className="ml-10 text-accent">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
