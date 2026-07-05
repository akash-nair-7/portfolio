import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouse = useCallback((e: MouseEvent) => {
    setMouse({
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [handleMouse]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Floating shapes
  const shapes = [
    { size: 80, top: "15%", left: "10%", depth: 30, delay: 0 },
    { size: 120, top: "60%", left: "80%", depth: 50, delay: 0.5 },
    { size: 60, top: "75%", left: "20%", depth: 20, delay: 1 },
    { size: 100, top: "25%", left: "75%", depth: 40, delay: 0.3 },
    { size: 50, top: "45%", left: "50%", depth: 25, delay: 0.8 },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(hsl(198 100% 50% / 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(198 100% 50% / 0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          transform: `translate(${mouse.x * 5}px, ${mouse.y * 5}px)`,
        }}
      />

      {/* Floating shapes */}
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.08, scale: 1 }}
          transition={{ delay: s.delay, duration: 1.2 }}
          className="absolute rounded-full border border-primary/20"
          style={{
            width: s.size,
            height: s.size,
            top: s.top,
            left: s.left,
            transform: `translate(${mouse.x * s.depth}px, ${mouse.y * s.depth}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
      ))}

      {/* Radial glow behind name */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, hsl(198 100% 50% / 0.15), transparent 70%)",
          transform: `translate(${mouse.x * 15}px, ${mouse.y * 15}px)`,
          transition: "transform 0.3s ease-out",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-heading text-5xl md:text-7xl font-bold tracking-tight text-gradient mb-4"
        >
          {personalInfo.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto"
        >
          {personalInfo.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={() => scrollTo("projects")}
            className="px-6 py-3 bg-primary text-primary-foreground font-heading text-sm font-semibold rounded-lg glow-blue hover:glow-blue-strong transition-all duration-300 hover:scale-105"
          >
            View Projects
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="px-6 py-3 border border-primary/40 text-primary font-heading text-sm font-semibold rounded-lg hover:bg-primary/10 transition-all duration-300 hover:scale-105"
          >
            Contact Me
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={() => scrollTo("education")}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="text-primary/50" size={28} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
