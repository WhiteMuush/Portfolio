"use client";

import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronDown } from "lucide-react";
import { useState } from "react";

interface Project {
  num: string;
  name: string;
  desc: string;
  why: string;
  stars?: number;
  stack: string;
  url: string;
}

const PROJECTS: Project[] = [
  {
    num: "01",
    name: "SANDEVISTAN",
    desc: "Boîte à outils de pentest personnalisée avec plus de 30 outils de test d'intrusion et de red teaming",
    why: "J'ai créé Sandevistan pour centraliser mes outils de pentest dans une interface unifiée. Plutôt que de jongler entre des dizaines de scripts éparpillés, j'ai voulu proposer une suite cohérente avec mise à jour automatique et configuration modulaire, améliorant ainsi mon efficacité lors des engagements offensifs.",
    stars: 98,
    stack: "Bash",
    url: "https://github.com/WhiteMuush/Sandevistan",
  },
  {
    num: "02",
    name: "PLUTUS",
    desc: "Déploiement d'infrastructure + synchronisation de serveurs",
    why: "J'ai développé Plutus pour automatiser le provisionnement et la synchronisation de serveurs dans des environnements multi-nodes. L'objectif était de réduire les erreurs humaines lors des déploiements répétitifs et de garantir une cohérence totale entre les machines de production.",
    stack: "Bash & PowerShell",
    url: "https://github.com/WhiteMuush/Plutus",
  },
  {
    num: "03",
    name: "GHOSTLINE",
    desc: "Boîte à outils d'énumération AD avec plus de 10 outils intégrés",
    why: "L'énumération Active Directory est une phase critique de tout pentest interne. Ghostline regroupe les outils les plus pertinents dans un workflow structuré, permettant une reconnaissance rapide et méthodique des environnements AD sans perdre de temps en configuration manuelle.",
    stack: "Bash",
    url: "https://github.com/WhiteMuush/Ghostline",
  },
  {
    num: "04",
    name: "KRAKEN",
    desc: "Framework de pentest modulaire",
    why: "Kraken est né du besoin d'avoir un framework extensible où chaque module peut être ajouté, retiré ou mis à jour indépendamment. Cette approche modulaire permet d'adapter l'outil à chaque mission sans embarquer de fonctionnalités superflues, tout en gardant une base solide et maintenable.",
    stack: "Bash",
    url: "https://github.com/WhiteMuush/Kraken",
  },
  {
    num: "05",
    name: "FRESHLINUX",
    desc: "Sécuriser rapidement une machine Linux fraîchement installée",
    why: "Une installation Linux par défaut laisse de nombreuses surfaces d'attaque exposées. FreshLinux applique automatiquement un ensemble de durcissements, pare-feu, désactivation de services inutiles, configuration SSH, et audit des permissions pour atteindre un niveau de sécurité de base en quelques minutes.",
    stack: "Bash",
    url: "https://github.com/WhiteMuush/FreshLinux",
  },
  {
    num: "06",
    name: "WakeSSH",
    desc: "Réveil à distance via Wake-on-LAN et connexion SSH automatique sur Windows, avec une interface graphique simple",
    why: "WakeSSH_WIN permet de réveiller une machine distante via Wake-on-LAN puis de s'y connecter automatiquement en SSH une fois qu'elle est en ligne. C'est un outil pratique pour administrer des machines Windows à distance sans avoir à les laisser allumées en permanence, combinant WoL et SSH dans un seul workflow.",
    stack: "PowerShell",
    url: "https://github.com/WhiteMuush/WakeSSH_WIN",
  },
];

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="border-b border-border"
    >
      <div
        className="group flex cursor-pointer items-baseline gap-4 py-5 transition-colors duration-300 md:gap-6"
        onClick={() => setExpanded((prev) => !prev)}
      >
        {/* Number */}
        <span className="w-8 shrink-0 text-sm tabular-nums text-muted-foreground transition-colors duration-300 group-hover:text-accent">
          {project.num}
        </span>

        {/* Name */}
        <span className="relative shrink-0 font-serif text-lg tracking-wide text-foreground transition-colors duration-300 group-hover:text-foreground md:text-xl">
          {project.name}
          <span className="absolute bottom-0 left-0 h-px w-0 bg-foreground transition-all duration-500 group-hover:w-full" />
        </span>

        {/* Separator dash */}
        <span className="hidden text-muted-foreground/40 md:inline">&mdash;</span>

        {/* Description */}
        <span className="hidden flex-1 text-sm text-muted-foreground md:inline">
          {project.desc}
        </span>

        {/* Stars */}
        {project.stars && (
          <span className="hidden items-center gap-1 text-sm text-muted-foreground md:flex">
            <Star className="h-3 w-3" />
            {project.stars}
          </span>
        )}

        {/* Stack */}
        <span className="ml-auto text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground md:ml-0">
          {project.stack}
        </span>

        {/* Expand icon */}
        <span className="text-sm text-muted-foreground transition-all duration-300 group-hover:text-foreground">
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          />
        </span>
      </div>

      {/* Expandable "why" section */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="why"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="flex items-start gap-4 pb-5 pl-12 md:gap-6 md:pl-14">
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {project.why}
              </p>
                <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto shrink-0 text-[11px] font-medium uppercase tracking-[0.15em] text-red-500 underline underline-offset-4 transition-colors duration-300 hover:text-red-400"
                >
                Voir sur GitHub ↗
                </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="px-6 py-24 md:px-12 lg:px-20">
      {/* Section label */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-[15px] font-medium uppercase tracking-[0.2em] text-muted-foreground"
      >
        Mes projets en tant que Junior
      </motion.p>

      {/* Project list */}
      <div className="flex flex-col">
        {PROJECTS.map((project, i) => (
          <ProjectRow key={project.num} project={project} index={i} />
        ))}
      </div>

      {/* Separator */}
      <div className="mt-24 h-px w-full bg-border" />
    </section>
  );
}
