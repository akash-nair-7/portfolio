import { motion } from "framer-motion";
import { socialLinks } from "@/data/portfolio";

const Contact = () => (
  <section id="contact" className="py-24 px-6">
    <div className="max-w-xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-3xl md:text-4xl font-bold text-gradient text-center mb-16"
      >
        Get In Touch
      </motion.h2>

      <motion.form
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-5"
        onSubmit={(e) => e.preventDefault()}
      >
        {[
          { name: "name", type: "text", placeholder: "Your Name" },
          { name: "email", type: "email", placeholder: "Your Email" },
        ].map((field) => (
          <input
            key={field.name}
            type={field.type}
            placeholder={field.placeholder}
            className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 focus:glow-blue transition-all duration-300"
          />
        ))}
        <textarea
          placeholder="Your Message"
          rows={5}
          className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 focus:glow-blue transition-all duration-300 resize-none"
        />
        <button
          type="submit"
          className="w-full py-3 bg-primary text-primary-foreground font-heading text-sm font-semibold rounded-lg glow-blue hover:glow-blue-strong transition-all duration-300 hover:scale-[1.02]"
        >
          Send Message
        </button>
      </motion.form>

      {/* Social links */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex justify-center gap-6 mt-10"
      >
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 inline-block"
            aria-label={link.label}
          >
            <link.icon size={22} />
          </a>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Contact;
