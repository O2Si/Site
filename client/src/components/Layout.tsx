import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Linkedin, ChevronRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Sobre", href: "#sobre" },
    { name: "Serviços", href: "#servicos" },
    { name: "Método", href: "#metodo" },
    { name: "Cases", href: "#cases" },
  ];

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      {/* Navbar */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          isScrolled ? "glass-panel py-3 border-white/10" : "bg-transparent py-6"
        )}
      >
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-display font-bold text-xl shadow-[0_0_15px_rgba(0,240,255,0.5)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.8)] transition-all">
              O2
            </div>
            <span className="font-display font-bold text-xl tracking-wider text-white group-hover:text-primary transition-colors">
              Si <span className="text-primary">Tecnologia</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest hover:text-glow"
              >
                {link.name}
              </a>
            ))}
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-display font-semibold tracking-wide shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] transition-all"
              onClick={() => window.open("https://wa.me/5521992834762", "_blank")}
            >
              Fale Conosco
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 glass-panel border-b border-white/10 p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-base font-medium text-white hover:text-primary py-2 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
            <Button 
              className="w-full bg-primary text-primary-foreground font-display"
              onClick={() => window.open("https://wa.me/5521992834762", "_blank")}
            >
              Fale Conosco
            </Button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-0">
        {children}
      </main>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/5521992834762"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:shadow-[0_0_30px_rgba(37,211,102,0.8)] transition-all duration-300 hover:scale-110 animate-in fade-in slide-in-from-bottom-10"
        aria-label="Fale conosco pelo WhatsApp"
      >
        <MessageCircle size={32} />
      </a>

      {/* Footer */}
      <footer className="bg-black/80 border-t border-white/10 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,240,255,0.05),transparent_50%)]"></div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-display font-bold text-sm">
                  O2
                </div>
                <span className="font-display font-bold text-lg text-white">
                  Si <span className="text-primary">Tecnologia</span>
                </span>
              </div>
              <p className="text-muted-foreground max-w-md mb-6 leading-relaxed">
                Transformamos desafios de negócio em soluções tecnológicas inteligentes. 
                Especialistas em automação, IA e engenharia de software moderna.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all duration-300">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-display font-bold text-white mb-6">Navegação</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                    >
                      <ChevronRight size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-white mb-6">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Política de Privacidade</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Termos de Uso</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} O2Si Tecnologia. Todos os direitos reservados.</p>
            <p>Desenvolvido por O2Si usando IA</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
