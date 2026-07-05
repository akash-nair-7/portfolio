import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Education />
      <Projects />
      <Experience />
      <Contact />
      <footer className="py-8 text-center text-xs text-muted-foreground border-t border-border">
        © {new Date().getFullYear()} Aakash Nair. All rights reserved.
      </footer>
      <Chatbot />
    </div>
  );
};

export default Index;
