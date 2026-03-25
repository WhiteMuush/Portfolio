"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useCursorSection } from "@/hooks/use-cursor-section";

interface School {
  year: string;
  name: string;
  diploma: string;
  desc: string;
  location: string;
}

const SCHOOLS: School[] = [
  {
    year: "2025 — 2026",
    name: "IFORM",
    diploma: "Bachelor Administrateur Système et Réseaux & DevOps",
    desc: "Apprentissage intensif de l'administration système cloud et du DevOps. Compétences avancées en scripting, gestion d'infrastructure, Microsoft Azure. Réalisation de projets pratiques pour maîtriser les outils et méthodologies DevOps modernes.",
    location: "Toulouse, FR",
  },
  {
    year: "Juill — Août 2025",
    name: "CIRISI",
    diploma: "Stage — Administrateur Système et Réseaux",
    desc: "Maintenance et dépannage des matériels SIC, gestion des réseaux du ministère de la Défense et suivi opérationnel des ACSSI (Articles Contrôlés de la Sécurité des Systèmes d'Information).",
    location: "Toulouse, FR",
  },
  {
    year: "2023 — 2025",
    name: "YNOV CAMPUS",
    diploma: "Bachelor Informatique",
    desc: "Apprentissage des fondamentaux en développement, réseaux, systèmes d'exploitation et bases de données. Introduction au développement full-stack et aux méthodologies agiles.",
    location: "Toulouse, FR",
  },
  {
    year: "2021 — 2023",
    name: "LYCÉE ST JOSEPH",
    diploma: "Baccalauréat STI2D",
    desc: "Spécialité Systèmes d'Information et Numérique (SIN). Études des systèmes embarqués, réseaux, et programmation.",
    location: "Toulouse, FR",
  },
];

export function Schools() {
  const [hovered, setHovered] = useState<School | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const cursorProps = useCursorSection("L'envie d'apprendre");

  return (
    <section
      id="schools"
      {...cursorProps}
      className="relative cursor-default select-none overflow-hidden px-5 py-28 sm:px-8 md:px-10 md:py-32 lg:px-14"
    >
      {/* Numéro filigrane */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-6 top-16 hidden select-none font-serif leading-none text-foreground/[0.08] md:block md:right-12 lg:right-20"
        style={{ fontSize: "clamp(120px, 20vw, 300px)" }}
      >
        02
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
          Mon parcours scolaire
        </motion.p>
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16 font-serif text-[16vw] leading-none tracking-tight text-foreground sm:text-[12vw] md:text-[9vw] lg:text-[7vw] md:mb-20"
      >
        Formation
      </motion.h2>

      {/* Liste */}
      <div className="flex flex-col">
        {SCHOOLS.map((school, i) => (
          <motion.div
            key={school.name}
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            animate={{
              opacity: hovered && hovered.name !== school.name ? 0.25 : 1,
            }}
            className="relative border-b border-border"
            onMouseEnter={() => setHovered(school)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Ligne bleue qui s'étire au hover */}
            <motion.div
              className="absolute bottom-0 left-0 h-px"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: hovered?.name === school.name ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0, width: "100%", background: "#3b82f6" }}
            />

            {/* Row cliquable */}
            <div
              className="flex cursor-pointer items-start justify-between gap-3 py-8 sm:gap-6 md:py-10 lg:py-12"
              onClick={() => setExpanded(expanded === school.name ? null : school.name)}
            >
              <div className="flex min-w-0 gap-3 sm:gap-4 md:gap-8">
                <motion.span
                  animate={{ color: hovered?.name === school.name ? "#3b82f6" : "" }}
                  transition={{ duration: 0.2 }}
                  className="mt-2 hidden w-28 shrink-0 text-[11px] tabular-nums text-muted-foreground sm:block md:text-sm"
                >
                  {school.year}
                </motion.span>
                <div className="min-w-0">
                  <motion.p
                    animate={{ x: hovered?.name === school.name ? 10 : 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="font-serif text-2xl tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl"
                  >
                    {school.name}
                  </motion.p>
                  <motion.p
                    animate={{
                      opacity: hovered?.name === school.name ? 1 : 0.5,
                      x: hovered?.name === school.name ? 10 : 0,
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-1 text-xs leading-relaxed text-muted-foreground sm:mt-2 sm:text-sm md:text-base"
                  >
                    {school.diploma}
                  </motion.p>
                </div>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-2 pt-2">
                <motion.span
                  animate={{
                    rotate: expanded === school.name ? 45 : 0,
                    color: hovered?.name === school.name ? "#3b82f6" : "",
                  }}
                  transition={{ duration: 0.25 }}
                  className="text-xl text-muted-foreground"
                >
                  +
                </motion.span>
                <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  {school.location}
                </span>
              </div>
            </div>

            {/* Description expandable */}
            <AnimatePresence initial={false}>
              {expanded === school.name && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-8 pl-0 pr-4 text-sm leading-relaxed text-muted-foreground sm:pl-32 sm:pr-12 md:pl-36 md:text-base lg:pb-10">
                    {school.desc}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
