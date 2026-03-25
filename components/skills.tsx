"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { useCursorSection } from "@/hooks/use-cursor-section";

const SKILLS = [
  {
    category: "Scripting",
    values: ["Bash", "PowerShell", "Python", "Template ARM"],
  },
  {
    category: "Systèmes",
    values: ["Linux", "Windows Server", "WSL"],
  },
  {
    category: "Réseau",
    values: ["IP", "Firewall", "DNS", "VLAN"],
  },
  {
    category: "Dépôt",
    values: ["GitHub", "GitLab", "Azure DevOps"],
  },
  {
    category: "Microsoft Azure",
    values: ["Entra ID", "Key Vault", "Azure Monitor", "ARM Templates"],
  },
  {
    category: "Virtualisation",
    values: ["Hyper-V", "VMware", "VirtualBox"],
  },
];

export function Skills() {
  const [hovered, setHovered] = useState<string | null>(null);
  const cursorProps = useCursorSection("Mes compétences actuelles");

  return (
    <section
      id="skills"
      {...cursorProps}
      className="relative cursor-default select-none overflow-hidden px-5 py-28 sm:px-8 md:px-10 md:py-32 lg:px-14"
    >
      {/* Numéro filigrane */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-6 top-16 hidden select-none font-serif leading-none text-foreground/[0.08] md:block md:right-12 lg:right-20"
        style={{ fontSize: "clamp(120px, 20vw, 300px)" }}
      >
        03
      </span>

      {/* Section label — text reveal */}
      <div className="mb-4 overflow-hidden">
        <motion.p
          initial={{ y: "110%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-[15px] font-medium uppercase tracking-[0.2em] text-muted-foreground"
        >
          Compétences
        </motion.p>
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16 font-serif text-[16vw] leading-none tracking-tight text-foreground sm:text-[12vw] md:text-[9vw] lg:text-[7vw] md:mb-20"
      >
        Compétences
      </motion.h2>

      <div className="flex flex-col">
        {SKILLS.map((skill, i) => (
          <motion.div
            key={skill.category}
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            animate={{
              opacity: hovered && hovered !== skill.category ? 0.25 : 1,
            }}
            className="relative border-b border-border"
            onMouseEnter={() => setHovered(skill.category)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Ligne verte qui s'étire au hover */}
            <motion.div
              className="absolute bottom-0 left-0 h-px"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: hovered === skill.category ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0, width: "100%", background: "#22c55e" }}
            />

            <div className="flex flex-col gap-5 py-8 md:flex-row md:items-center md:gap-0 md:py-10 lg:py-12">

              {/* Catégorie — fixe à gauche */}
              <div className="flex min-w-0 gap-4 md:w-[45%] md:gap-8 md:pr-12">
                <motion.span
                  animate={{ color: hovered === skill.category ? "#22c55e" : "" }}
                  transition={{ duration: 0.2 }}
                  className="mt-1 w-7 shrink-0 text-[11px] tabular-nums text-muted-foreground md:w-8 md:text-sm"
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.span>
                <motion.p
                  animate={{ x: hovered === skill.category ? 8 : 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="font-serif text-2xl tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl"
                >
                  {skill.category}
                </motion.p>
              </div>

              {/* Tags — droite */}
              <motion.div
                animate={{ x: hovered === skill.category ? 8 : 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap gap-2 pl-11 md:w-[55%] md:pl-0"
              >
                {skill.values.map((tag, j) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 + j * 0.04 }}
                    className="rounded-full border border-border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground transition-colors duration-200"
                    style={{
                      borderColor: hovered === skill.category ? "rgba(34,197,94,0.3)" : "",
                      color: hovered === skill.category ? "rgb(34,197,94)" : "",
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>

            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
