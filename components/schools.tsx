"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

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
        name: "IFORM - bootcamp",
        diploma: "Bachelor Administrateur Système et Réseaux & DevOps",
        desc: "Apprentissage intensif de l'administration système cloud et du DevOps. Developpement de compétences avancées en scripting, gestion d'infrastructure, CI/CD. Réalisation de projets pratiques pour maîtriser les outils et méthodologies DevOps modernes.",
        location: "Toulouse, FR",
    },
    {
        year: "Juill - Aout 2025",
        name: "CIRISI - stage",
        diploma: "Administrateur Système et Réseaux",
        desc: "Maintenance et dépannage des matériels SIC, gestion des réseaux du ministère de la Défense et suivi opérationnel des ACSSI (Articles Contrôlés de la Sécurité des Systèmes d'Information).",
        location: "Toulouse, FR",
    },
    {
        year: "2023 — 2025",
        name: "Ynov Campus",
        diploma: "Bachelor Informatique",
        desc: "Apprentissage des fondamentaux en développement, réseaux, systèmes d'exploitation et bases de données. Introduction au développement full-stack et aux méthodologies agiles.",
        location: "Toulouse, FR",
    },
    {
        year: "2021 — 2023",
        name: "Lycée Saint Joseph La Salle",
        diploma: "STI2D",
        desc: "Baccalauréat technologique avec spécialité Systèmes d'Information et Numérique (SIN). Études des systèmes embarqués, réseaux, et programmation.",
        location: "Toulouse, FR",
    },
];
function SchoolRow({ school, index }: { school: School; index: number }) {
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
                {/* Year */}
                <span className="w-30 shrink-0 text-sm tabular-nums text-muted-foreground transition-colors duration-300 group-hover:text-accent">
                    {school.year}
                </span>

                {/* School name */}
                <span className="relative shrink-0 font-serif text-lg tracking-wide text-foreground transition-colors duration-300 group-hover:text-foreground md:text-xl">
                    {school.name}
                    <span className="absolute bottom-0 left-0 h-px w-0 bg-foreground transition-all duration-500 group-hover:w-full" />
                </span>

                {/* Separator dash */}
                <span className="hidden text-muted-foreground/40 md:inline">&mdash;</span>

                {/* Diploma */}
                <span className="hidden flex-1 text-sm text-muted-foreground md:inline">
                    {school.diploma}
                </span>

                {/* Location */}
                <span className="ml-auto text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground md:ml-0">
                    {school.location}
                </span>

                {/* Expand icon */}
                <span className="text-sm text-muted-foreground transition-all duration-300 group-hover:text-foreground">
                    <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                    />
                </span>
            </div>

            {/* Expandable description */}
            <AnimatePresence initial={false}>
                {expanded && (
                    <motion.div
                        key="desc"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="flex items-start gap-4 pb-5 pl-28 md:gap-6 md:pl-[7.5rem]">
                            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                                {school.desc}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function Schools() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isSectionHovered, setIsSectionHovered] = useState(false);
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
            const rect = section.getBoundingClientRect();
            const inside =
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom;
            if (inside) {
                cursorX.set(e.clientX);
                cursorY.set(e.clientY);
                cursorOpacity.set(1);
                setIsSectionHovered(true);
            } else {
                cursorOpacity.set(0);
                setIsSectionHovered(false);
            }
        };

        section.addEventListener("mousemove", handleMouseMove);
        section.addEventListener("mouseleave", () => {
            cursorOpacity.set(0);
            setIsSectionHovered(false);
        });

        return () => {
            section.removeEventListener("mousemove", handleMouseMove);
            section.removeEventListener("mouseleave", () => {
                cursorOpacity.set(0);
                setIsSectionHovered(false);
            });
        };
    }, [cursorX, cursorY, cursorOpacity]);

    return (
        <section ref={sectionRef} id="schools" className="cursor-default select-none relative px-6 py-24 md:px-12 lg:px-20">
            {/* Texte qui suit le curseur, style About */}
            {isSectionHovered && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="pointer-events-none fixed z-50 hidden md:block"
                    style={{
                        left: springX,
                        top: springY,
                        x: 20,
                        y: 20,
                        opacity: springOpacity,
                    }}
                >
                    <p className="whitespace-nowrap rounded-full border border-muted-foreground/20 bg-background/80 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground backdrop-blur-sm sm:text-[11px] sm:tracking-[0.2em]">
                        L'envie d'apprendre 
                    </p>
                </motion.div>
            )}

            {/* Section label */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="mb-16 text-[15px] font-medium uppercase tracking-[0.2em] text-muted-foreground"
            >
                Mon parcours scolaire
            </motion.p>

            {/* School list */}
            <div className="flex flex-col">
                {SCHOOLS.map((school, i) => (
                    <SchoolRow key={school.year} school={school} index={i} />
                ))}
            </div>

            {/* Separator */}
            <div className="mt-24 h-px w-full bg-border" />
        </section>
    );
}