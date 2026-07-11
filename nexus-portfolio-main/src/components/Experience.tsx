import { motion } from "framer-motion";
import { experience } from "@/data/portfolio";
import { Briefcase } from "lucide-react";

const Experience = () => (
  <section id="experience" className="py-24 px-6">
    <div className="max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-3xl md:text-4xl font-bold text-gradient text-center mb-16"
      >
        Work Experience
      </motion.h2>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

        {experience.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="relative pl-14 mb-12"
          >
            <div className="absolute left-[18px] top-2 w-3 h-3 rounded-full bg-primary glow-blue" />

            <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-colors duration-300">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Briefcase size={18} />
                <span className="text-xs font-medium text-muted-foreground">{item.duration}</span>
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                {item.role}
              </h3>
              <p className="text-sm text-primary/80 mb-4">
                {item.company} · {item.client}
              </p>
              <div className="space-y-5">
                {item.projects.map((project) => (
                  <div key={project.title}>
                    <h4 className="mb-3 text-sm font-semibold text-foreground">
                      {project.title}
                    </h4>
                    <ul className="space-y-2">
                      {project.responsibilities.map((responsibility, j) => (
                        <li key={j} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary mt-1.5 shrink-0">▹</span>
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
