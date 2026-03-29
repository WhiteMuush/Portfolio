"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useCursorSection } from "@/hooks/use-cursor-section";

interface Project {
  num: string;
  name: string;
  desc: string;
  why: string;
  stars?: number;
  stack: string;
  url: string;
  image: string;
  preview: string[];
}

const PROJECTS: Project[] = [
  {
    num: "01",
    name: "SANDEVISTAN",
    desc: "Boîte à outils de pentest avec plus de 30 outils de test d'intrusion et de red teaming",
    why: "Suite cohérente avec mise à jour automatique et configuration modulaire — centralise tous mes outils offensifs dans une interface unifiée.",
    stars: 98,
    stack: "Bash",
    url: "https://github.com/WhiteMuush/Sandevistan",
    image: "/projects/sandevistan.jpg",
    preview: [],
  },
  {
    num: "02",
    name: "KRAKEN",
    desc: "Framework de pentest modulaire extensible",
    why: "Chaque module peut être ajouté, retiré ou mis à jour indépendamment — s'adapte à chaque mission sans fonctionnalités superflues.",
    stars: 6,
    stack: "Bash",
    url: "https://github.com/WhiteMuush/Kraken",
    image: "/projects/kraken.jpg",
    preview: [],
  },
  {
    num: "03",
    name: "GHOSTLINE",
    desc: "Boîte à outils d'énumération Active Directory avec plus de 10 outils intégrés",
    why: "L'énumération Active Directory est une phase critique de tout pentest interne. Ghostline regroupe les outils les plus pertinents dans un workflow structuré, permettant une reconnaissance rapide et méthodique des environnements AD.",
    stars: 1,
    stack: "Bash",
    url: "https://github.com/WhiteMuush/Ghostline",
    image: "/projects/ghostline.jpg",
    preview: [],
  },
  {
    num: "04",
    name: "FEEDYOURSPIDER",
    desc: "Vérificateur de santé réseau mesurant connectivité et temps de réponse",
    why: "Surveille rapidement la santé d'un réseau sans dépendre d'outils lourds — mesure connectivité et anomalies en temps réel.",
    stars: 2,
    stack: "Bash",
    url: "https://github.com/WhiteMuush/FeedYourSpider",
    image: "/projects/feedyourspider.jpg",
    preview: [],
  },
  {
    num: "05",
    name: "WAKESSH",
    desc: "Réveil à distance via Wake-on-LAN et connexion SSH automatique sur Windows",
    why: "Administre des machines Windows à distance sans les laisser allumées — combine WoL et SSH dans un seul workflow automatisé.",
    stack: "PowerShell",
    url: "https://github.com/WhiteMuush/WakeSSH_WIN",
    image: "/projects/wakessh.jpg",
    preview: [],
  },
  {
    num: "06",
    name: "PLUTUS",
    desc: "Déploiement d'infrastructure + synchronisation de serveurs multi-nodes",
    why: "Réduit les erreurs humaines lors des déploiements répétitifs et garantit une cohérence totale entre les machines de production.",
    stack: "Bash & PowerShell",
    url: "https://github.com/WhiteMuush/Plutus---ProjetFilsRouge01",
    image: "/projects/plutus.jpg",
    preview: [],
  },
  {
    num: "07",
    name: "MEDUSA",
    desc: "Toolkit d'orchestration déployant et gérant 35 outils open source de cybersécurité via menu interactif ou CLI",
    why: "Centralise le déploiement et la gestion d'un arsenal d'outils de sécurité dans une interface unifiée — simplifie la mise en place d'un environnement de travail complet en une seule commande.",
    stack: "Bash",
    url: "https://github.com/WhiteMuush/Medusa",
    image: "/projects/Medusa.jpg",
    preview: [],
  },
];

export function Projects() {
  const [hovered, setHovered] = useState<Project | null>(null);

  const cursorX = useMotionValue(-400);
  const cursorY = useMotionValue(-400);
  const springX = useSpring(cursorX, { damping: 22, stiffness: 160 });
  const springY = useSpring(cursorY, { damping: 22, stiffness: 160 });

  const cursorProps = useCursorSection("");


  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <section
      id="projects"
      {...cursorProps}
      className="relative overflow-hidden px-5 py-28 sm:px-8 md:px-10 md:py-32 lg:px-14"
    >
      {/* Numéro filigrane */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-6 top-16 hidden select-none font-serif leading-none text-foreground/[0.08] md:block md:right-12 lg:right-20"
        style={{ fontSize: "clamp(120px, 20vw, 300px)" }}
      >
        01
      </span>

      {/* Image flottante qui suit le curseur */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key={hovered.num}
            className="pointer-events-none fixed z-50 hidden md:block"
            style={{ left: springX, top: springY, x: 28, y: "-50%" }}
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-[360px] w-[580px] overflow-hidden rounded-sm border border-border shadow-2xl lg:h-[440px] lg:w-[700px]">
              <motion.img
                key={hovered.image}
                src={hovered.image}
                alt={hovered.name}
                className="h-full w-full object-cover"
                initial={{ scale: 1.08, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section label — text reveal */}
      <div className="mb-4 overflow-hidden">
        <motion.p
          initial={{ y: "110%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-[15px] font-medium uppercase tracking-[0.2em] text-muted-foreground"
        >
          Mes projets en tant que Junior
        </motion.p>
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16 font-serif text-[16vw] leading-none tracking-tight text-foreground sm:text-[12vw] md:text-[9vw] lg:text-[7vw] md:mb-20"
      >
        Projets
      </motion.h2>

      {/* Liste */}
      <div className="flex flex-col">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.num}
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            animate={{
              opacity: hovered && hovered.num !== project.num ? 0.25 : 1,
            }}
            className="group/row relative border-b border-border"
            onMouseEnter={() => setHovered(project)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Ligne rouge qui s'étire au hover */}
            <motion.div
              className="absolute bottom-0 left-0 h-px bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: hovered?.num === project.num ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0, width: "100%" }}
            />

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start justify-between gap-3 py-8 sm:gap-6 md:py-10 lg:py-12"
            >
              {/* num + name + desc */}
              <div className="flex min-w-0 gap-3 sm:gap-4 md:gap-8">
                <motion.span
                  animate={{ color: hovered?.num === project.num ? "#e63030" : "" }}
                  transition={{ duration: 0.2 }}
                  className="mt-2 hidden w-7 shrink-0 text-[11px] tabular-nums text-muted-foreground sm:block md:w-8 md:text-sm"
                >
                  {project.num}
                </motion.span>
                <div className="min-w-0">
                  <motion.p
                    animate={{ x: hovered?.num === project.num ? 10 : 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="font-serif text-2xl tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl"
                  >
                    {project.name}
                  </motion.p>
                  <motion.p
                    animate={{
                      opacity: hovered?.num === project.num ? 1 : 0.5,
                      x: hovered?.num === project.num ? 10 : 0,
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-1 text-xs leading-relaxed text-muted-foreground sm:mt-2 sm:text-sm md:text-base"
                  >
                    {project.desc}
                  </motion.p>
                </div>
              </div>

              {/* stack + stars + arrow */}
              <div className="flex shrink-0 flex-col items-end gap-2 pt-1">
                <motion.span
                  animate={{
                    x: hovered?.num === project.num ? 2 : 0,
                    y: hovered?.num === project.num ? -2 : 0,
                    color: hovered?.num === project.num ? "#e63030" : "",
                  }}
                  transition={{ duration: 0.25 }}
                  className="text-xl text-muted-foreground"
                >
                  ↗
                </motion.span>
                {project.stars && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-2.5 w-2.5" />
                    {project.stars}
                  </span>
                )}
                <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  {project.stack}
                </span>
              </div>
            </a>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
