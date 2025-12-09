import { useEffect, useRef } from "react";
import { ArrowRight, CheckCircle2, Code2, Cpu, Database, FileText, Lightbulb, MessageSquare, Terminal, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import Layout from "@/components/Layout";

// Schema for contact form
const formSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres." }),
  company: z.string().min(2, { message: "Empresa deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Email inválido." }),
  phone: z.string().min(8, { message: "Telefone inválido." }),
  message: z.string().min(10, { message: "Mensagem deve ter pelo menos 10 caracteres." }),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    form.reset();
  }

  // Intersection Observer for fade-in animations
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in", "fade-in", "slide-in-from-bottom-8");
          entry.target.classList.remove("opacity-0");
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      el.classList.add("opacity-0", "duration-1000");
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const services = [
    {
      title: "Treinamento com IA",
      icon: <Code2 className="w-10 h-10 text-primary" />,
      description: "Capacitamos times de desenvolvimento a utilizarem IA como copiloto, acelerando a escrita de código, testes e refatorações com segurança e ética.",
    },
    {
      title: "Engenharia de Prompt",
      icon: <Terminal className="w-10 h-10 text-secondary" />,
      description: "Treinamentos especializados para dominar a engenharia de prompt aplicada ao ciclo de desenvolvimento, desde requisitos até testes automatizados.",
    },
    {
      title: "Integrações N8N",
      icon: <Zap className="w-10 h-10 text-primary" />,
      description: "Desenhamos e implementamos automações corporativas com N8N, conectando ERPs, CRMs e criando robôs operacionais inteligentes.",
    },
    {
      title: "Documentação Autônoma",
      icon: <FileText className="w-10 h-10 text-secondary" />,
      description: "Modelo de documentação técnica que evolui junto ao código, utilizando IA para manter consistência, rastreabilidade e padronização.",
    },
    {
      title: "Consultoria em Software",
      icon: <Cpu className="w-10 h-10 text-primary" />,
      description: "Modernização de sistemas, arquitetura de software e melhoria de pipelines DevOps para escalabilidade e alta performance.",
    },
  ];

  const methodSteps = [
    {
      title: "Diagnóstico Rápido",
      desc: "Entendemos desafios, ferramentas e processos existentes.",
      icon: <Lightbulb className="w-6 h-6" />,
    },
    {
      title: "Plano Estratégico",
      desc: "Roadmap de melhorias, modernização e automações.",
      icon: <Database className="w-6 h-6" />,
    },
    {
      title: "Execução e Implementação",
      desc: "Desenvolvimento, integrações, treinamento e documentação.",
      icon: <Code2 className="w-6 h-6" />,
    },
    {
      title: "Acompanhamento Contínuo",
      desc: "Evolução constante das soluções e dos times.",
      icon: <CheckCircle2 className="w-6 h-6" />,
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-bg.png" 
            alt="Futuristic Technology Background" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_100%)]"></div>
        </div>

        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left reveal-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Inovação em Engenharia de Software
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight text-white">
              Transformamos <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-secondary animate-gradient-x">
                Processos em Resultados
              </span> <br />
              com IA
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Consultoria, desenvolvimento de software e automação inteligente para acelerar seu negócio e modernizar sua operação.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-display text-lg px-8 h-14 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all" onClick={() => window.open("https://wa.me/5521982454343", "_blank")}>
                Fale com um especialista <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 font-display text-lg px-8 h-14 backdrop-blur-sm" onClick={() => document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' })}>
                Conheça nossos serviços
              </Button>
            </div>
          </div>

          {/* Hero Visual Element */}
          <div className="hidden lg:block relative reveal-on-scroll delay-200">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse-slow"></div>
              <div className="glass-card p-8 rounded-2xl border border-white/10 relative z-10 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="ml-auto text-xs text-muted-foreground font-mono">automation_flow.ts</div>
                </div>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex gap-2">
                    <span className="text-secondary">const</span>
                    <span className="text-primary">optimizeWorkflow</span>
                    <span className="text-white">=</span>
                    <span className="text-secondary">async</span>
                    <span className="text-white">()</span>
                    <span className="text-secondary">=&gt;</span>
                    <span className="text-white">{`{`}</span>
                  </div>
                  <div className="pl-4 flex gap-2">
                    <span className="text-secondary">await</span>
                    <span className="text-primary">AI.analyze</span>
                    <span className="text-white">(currentProcess);</span>
                  </div>
                  <div className="pl-4 flex gap-2">
                    <span className="text-secondary">return</span>
                    <span className="text-primary">Results.maximize</span>
                    <span className="text-white">({`{`}</span>
                  </div>
                  <div className="pl-8 text-green-400">efficiency: "100%",</div>
                  <div className="pl-8 text-green-400">cost: "optimized",</div>
                  <div className="pl-8 text-green-400">speed: "accelerated"</div>
                  <div className="pl-4 text-white">{`}`});</div>
                  <div className="text-white">{`}`}</div>
                </div>
                
                <div className="absolute -bottom-6 -right-6 glass-card p-4 rounded-xl border border-primary/30 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                      <Zap size={20} />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Performance</div>
                      <div className="text-lg font-bold text-white">+300%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-24 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 reveal-on-scroll">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:bg-transparent transition-all duration-500"></div>
                <img 
                  src="/images/about-tech.png" 
                  alt="About O2Si Technology" 
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                  <div className="flex gap-4">
                    <div className="glass-card px-4 py-2 rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary">IA</div>
                      <div className="text-xs text-muted-foreground">Integrada</div>
                    </div>
                    <div className="glass-card px-4 py-2 rounded-lg text-center">
                      <div className="text-2xl font-bold text-secondary">Dev</div>
                      <div className="text-xs text-muted-foreground">Moderno</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-8 reveal-on-scroll">
              <div>
                <h2 className="text-primary font-display font-bold tracking-wider uppercase mb-2">Quem Somos</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Tecnologia Inteligente para <br />
                  <span className="text-white/80">Desafios Reais</span>
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  A O2Si Tecnologia é uma empresa de consultoria e desenvolvimento de software especializada em transformar desafios de negócio em soluções tecnológicas inteligentes. Atuamos com foco em eficiência, inovação e modernização constante.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Nosso propósito é apoiar empresas a otimizar processos, desenvolver novas soluções e estruturar times para trabalhar com as tecnologias mais recentes do mercado, combinando práticas avançadas de engenharia, automação e Inteligência Artificial.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Aplicação prática de IA",
                  "Metodologia centrada em automação",
                  "Integrações inteligentes",
                  "Treinamentos corporativos"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-primary/30 transition-colors">
                    <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
                    <span className="text-white font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-24 bg-black/40 relative">
        <div className="absolute inset-0 bg-[url('/images/automation-nodes.png')] bg-cover bg-center opacity-10 fixed-bg"></div>
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
            <h2 className="text-primary font-display font-bold tracking-wider uppercase mb-2">Nossos Serviços</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Soluções de Ponta a Ponta</h3>
            <p className="text-muted-foreground text-lg">
              Do treinamento de equipes à implementação de robôs autônomos, oferecemos o stack completo para modernizar sua empresa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="glass-card border-white/5 hover:border-primary/50 group overflow-hidden reveal-on-scroll">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader>
                  <div className="mb-4 p-3 rounded-xl bg-white/5 w-fit group-hover:scale-110 transition-transform duration-300 border border-white/10 group-hover:border-primary/30 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl font-display font-bold text-white group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground leading-relaxed group-hover:text-white/80 transition-colors">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Method Section */}
      <section id="metodo" className="py-24 relative">
        <div className="container">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-primary font-display font-bold tracking-wider uppercase mb-2">Como Trabalhamos</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">Nosso Método</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2 z-0"></div>

            {methodSteps.map((step, index) => (
              <div key={index} className="relative z-10 flex flex-col items-center text-center group reveal-on-scroll" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="w-16 h-16 rounded-full bg-background border-2 border-primary/30 flex items-center justify-center text-primary mb-6 group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 relative">
                  <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-0 group-hover:opacity-100"></div>
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-secondary text-white text-xs font-bold flex items-center justify-center border border-background">
                    {index + 1}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-white mb-3 font-display">{step.title}</h4>
                <p className="text-sm text-muted-foreground px-4">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section id="cases" className="py-24 bg-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal-on-scroll">
              <h2 className="text-primary font-display font-bold tracking-wider uppercase mb-2">Resultados Reais</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Impacto que geramos
              </h3>
              <div className="space-y-6">
                {[
                  { value: "60%", label: "Redução no tempo de desenvolvimento com IA integrada" },
                  { value: "3x", label: "Aumento de produtividade em times treinados" },
                  { value: "100%", label: "Automação de conciliações e cadastros entre sistemas" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-6 p-4 rounded-xl bg-background/50 border border-white/5 hover:border-primary/30 transition-all">
                    <div className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary w-24 text-center">
                      {stat.value}
                    </div>
                    <div className="h-10 w-px bg-white/10"></div>
                    <p className="text-white font-medium text-lg">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 reveal-on-scroll">
              <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center aspect-square hover:bg-primary/10 transition-colors">
                <Terminal className="w-12 h-12 text-primary mb-4" />
                <h4 className="font-bold text-white mb-2">Pipelines Automáticos</h4>
                <p className="text-xs text-muted-foreground">Documentação técnica viva</p>
              </div>
              <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center aspect-square hover:bg-secondary/10 transition-colors mt-8">
                <Zap className="w-12 h-12 text-secondary mb-4" />
                <h4 className="font-bold text-white mb-2">Integrações N8N</h4>
                <p className="text-xs text-muted-foreground">Conectividade total</p>
              </div>
              <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center aspect-square hover:bg-secondary/10 transition-colors -mt-8">
                <Code2 className="w-12 h-12 text-secondary mb-4" />
                <h4 className="font-bold text-white mb-2">Dev Moderno</h4>
                <p className="text-xs text-muted-foreground">Engenharia de ponta</p>
              </div>
              <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center aspect-square hover:bg-primary/10 transition-colors">
                <MessageSquare className="w-12 h-12 text-primary mb-4" />
                <h4 className="font-bold text-white mb-2">IA Copilot</h4>
                <p className="text-xs text-muted-foreground">Assistência inteligente</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-24 relative">
        <div className="container max-w-4xl">
          <div className="glass-card rounded-3xl p-8 md:p-12 border border-primary/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] reveal-on-scroll">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Vamos transformar tecnologia em resultado?
              </h2>
              <p className="text-muted-foreground text-lg">
                Preencha o formulário abaixo e fale com nossos especialistas.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome completo" {...field} className="bg-background/50 border-white/10 focus:border-primary/50 text-white h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Empresa</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome da sua empresa" {...field} className="bg-background/50 border-white/10 focus:border-primary/50 text-white h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">E-mail Corporativo</FormLabel>
                        <FormControl>
                          <Input placeholder="seu@email.com" {...field} className="bg-background/50 border-white/10 focus:border-primary/50 text-white h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Telefone / WhatsApp</FormLabel>
                        <FormControl>
                          <Input placeholder="(11) 99999-9999" {...field} className="bg-background/50 border-white/10 focus:border-primary/50 text-white h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Como podemos ajudar?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Descreva sua necessidade ou desafio..." 
                          className="bg-background/50 border-white/10 focus:border-primary/50 text-white min-h-[120px] resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold text-lg h-14 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all">
                  Enviar Mensagem <ArrowRight className="ml-2" />
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
