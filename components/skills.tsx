"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

const SKILLS_ACQUIS = [
  { category: "Scripting", values: "Bash, PowerShell, Python" },
  { category: "Systèmes", values: "Linux, Windows Server, WSL" },
  { category: "Réseau", values: "IP, Firewall, DNS, VLAN" },
  { category: "Dépot", values: "Github, Gitlab, Azure DevOps" },
  { category: "Microsoft Azure", values: "VMs, App Services, Azure Functions, Azure AD, Blob Storage, Logic Apps, ARM Templates, Azure Monitor, Key Vault" },
  { category: "Virtualisation", values: "Hyper-V, VMWare, virtualbox" },
  { category: "DevOps", values: "Github action, GitLab CI" },
];

const SKILLS_EN_COURS = [
  { category: "Containerisation", values: "Docker, Kubernetes" },
  { category: "Monitoring", values: "Prometheus, Grafana" },
    { category: "Infrastructure as code", values: "Terraform, Ansible" },
];

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
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

  return (
    <section ref={sectionRef} id="skills" className="relative select-none px-6 py-24 md:px-12 lg:px-20 cursor-default">
      {/* Cursor follower text */}
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
          Mes compétences actuelles
        </p>
      </motion.div>

      {/* Section label */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-[15px] font-medium uppercase tracking-[0.2em] text-muted-foreground"
      >
        Compétences
      </motion.p>

      {/* Compétences acquises */}
      <div className="mb-10">
        <h2 className="mb-6 text-lg font-semibold uppercase tracking-[0.15em] text-[#388E3C]">Compétences acquises</h2>
        <div className="flex flex-col gap-0">
          {SKILLS_ACQUIS.map((skill, i) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex flex-col gap-2 border-b border-border py-6 transition-colors duration-300 hover:text-[#388E3C] md:flex-row md:items-baseline md:gap-16"
            >
              <p className="w-48 shrink-0 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 group-hover:text-[#388E3C]">
                {skill.category}
              </p>
              <p className="text-base text-foreground transition-colors duration-300 group-hover:text-[#388E3C]">
                {skill.values}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Compétences en cours */}
      <div>
        <h2 className="mb-6 text-lg font-semibold uppercase tracking-[0.15em] text-[#388E3C]">Compétences en cours</h2>
        <div className="flex flex-col gap-0">
          {SKILLS_EN_COURS.map((skill, i) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex flex-col gap-2 border-b border-border py-6 transition-colors duration-300 hover:text-[#388E3C] md:flex-row md:items-baseline md:gap-16"
            >
              <p className="w-48 shrink-0 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 group-hover:text-[#388E3C]">
                {skill.category}
              </p>
              <p className="text-base text-foreground transition-colors duration-300 group-hover:text-[#388E3C]">
                {skill.values}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Separator */}
      <div className="mt-24 h-px w-full bg-border" />
    </section>
  );
}
