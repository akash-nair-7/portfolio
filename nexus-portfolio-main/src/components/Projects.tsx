import { motion } from "framer-motion";
import { projects } from "@/data/portfolio";
import { Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Projects = () => (
  <section id="projects" className="py-24 px-6">
    <div className="max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-3xl md:text-4xl font-bold text-gradient text-center mb-16"
      >
        Projects
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="group bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:border-primary/50 hover:glow-blue"
          >
            <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              {project.techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="text-xs border-primary/30 text-primary/80"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="flex gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github size={18} />
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
