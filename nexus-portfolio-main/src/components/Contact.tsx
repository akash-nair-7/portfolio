import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { socialLinks } from "@/data/portfolio";

const Contact = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const contactScriptUrl = import.meta.env.VITE_CONTACT_SCRIPT_URL;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!contactScriptUrl) {
      setStatus("error");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("sending");

    try {
      await fetch(contactScriptUrl, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
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
          onSubmit={handleSubmit}
        >
          {[
            { name: "name", type: "text", placeholder: "Your Name" },
            { name: "email", type: "email", placeholder: "Your Email" },
          ].map((field) => (
            <input
              key={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              required
              className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 focus:glow-blue transition-all duration-300"
            />
          ))}
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            required
            className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 focus:glow-blue transition-all duration-300 resize-none"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full py-3 bg-primary text-primary-foreground font-heading text-sm font-semibold rounded-lg glow-blue hover:glow-blue-strong transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
          {status === "success" && (
            <p className="text-center text-sm text-primary">
              Message sent successfully.
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-sm text-destructive">
              Message could not be sent. Please try again or email directly.
            </p>
          )}
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
};

export default Contact;
