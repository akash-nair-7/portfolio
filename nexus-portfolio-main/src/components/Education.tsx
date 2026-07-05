import { motion } from "framer-motion";
import { education } from "@/data/portfolio";
import { GraduationCap } from "lucide-react";

const Education = () => (
  <section id="education" className="py-24 px-6">
    <div className="max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-3xl md:text-4xl font-bold text-gradient text-center mb-16"
      >
        Education
      </motion.h2>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border" />

        {education.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className={`relative mb-12 md:w-1/2 ${
              i % 2 === 0 ? "md:pr-12 md:ml-0" : "md:pl-12 md:ml-auto"
            } pl-14 md:pl-0`}
          >
            {/* Dot */}
            <div
              className={`absolute top-2 w-3 h-3 rounded-full bg-primary glow-blue left-[18px] md:left-auto ${
                i % 2 === 0 ? "md:right-[-6px]" : "md:left-[-6px]"
              }`}
            />

            <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-colors duration-300">
              <div className="flex items-center gap-2 text-primary mb-2">
                <GraduationCap size={18} />
                <span className="text-xs font-medium text-muted-foreground">{item.duration}</span>
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                {item.degree}
              </h3>
              <p className="text-sm text-primary/80 mb-2">{item.institution}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Education;
