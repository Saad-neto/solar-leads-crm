import { Calculator } from "@/components/Calculator";
import { FAQ } from "@/components/FAQ";
import { LeadForm } from "@/components/LeadForm";
import { SocialProof } from "@/components/SocialProof";
import { SystemComponents } from "@/components/SystemComponents";
import { Financing } from "@/components/Financing";
import { UrgencyBanner } from "@/components/UrgencyBanner";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Battery,
  TrendingUp,
  Calendar,
  Home,
  Lightbulb,
  Leaf,
  LineChart,
  CreditCard,
  Zap,
  Star,
  ChevronDown,
  Phone,
  Smartphone,
  FileText,
  CheckCircle2,
  DollarSign,
  Mail,
} from "lucide-react";
import heroImage from "@/assets/solar-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Banner de Urgência */}
      <UrgencyBanner />
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
        }}
      >
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center text-primary-foreground mb-12 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6 font-semibold text-sm">
              <Zap className="w-4 h-4" />
              Mais de 5.000 clientes satisfeitos
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-lg">
              Reduza Sua Conta de Luz em <span className="text-yellow-300">Até 95%</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 opacity-95">
              Energia Solar com <span className="underline">Instalação Grátis</span> + Financiamento em 120x
            </h2>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-4">
              ✓ Simulação gratuita em 2 minutos
              <span className="mx-3">•</span>
              ✓ Sem compromisso
              <span className="mx-3">•</span>
              ✓ Resposta em 24h
            </p>
          </div>

          <div className="animate-slide-up">
            <Calculator />
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-scroll-bounce">
            <ChevronDown className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
      </section>

      {/* Social Proof - Números Impressionantes */}
      <SocialProof />

      {/* Stats Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: TrendingUp, value: "95%", label: "Economia na conta" },
              { icon: Calendar, value: "25 anos", label: "Vida útil do sistema" },
              { icon: Battery, value: "4-6 anos", label: "Retorno do investimento" },
              { icon: Home, value: "30%", label: "Valorização do imóvel" },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="p-8 text-center hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 hover:-translate-y-2 bg-card"
                >
                  <Icon className="w-16 h-16 mx-auto mb-4 text-primary" />
                  <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
            Como Funciona
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            4 passos simples para começar a economizar
          </p>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {/* Line connecting steps - hidden on mobile */}
              <div className="hidden lg:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary -z-10" />

              {[
                {
                  icon: Smartphone,
                  step: "PASSO 1",
                  title: "Simule Grátis",
                  desc: "Digite sua conta e descubra sua economia",
                },
                {
                  icon: FileText,
                  step: "PASSO 2",
                  title: "Receba Orçamento",
                  desc: "Proposta personalizada em até 24h",
                },
                {
                  icon: Zap,
                  step: "PASSO 3",
                  title: "Instalamos em 30 dias",
                  desc: "Equipe especializada cuida de tudo",
                },
                {
                  icon: DollarSign,
                  step: "PASSO 4",
                  title: "Comece a Economizar",
                  desc: "Até 95% de redução na sua conta",
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="text-center relative">
                    <div className="w-20 h-20 rounded-full bg-primary mx-auto mb-4 flex items-center justify-center shadow-lg relative z-10">
                      <Icon className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <p className="text-sm font-bold text-primary mb-2">{item.step}</p>
                    <h3 className="text-xl font-bold mb-2 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
            Por Que Escolher Energia Solar?
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Benefícios que fazem a diferença
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Lightbulb,
                title: "Economia Real",
                subtitle: "Reduza sua conta em até 95%",
                desc: "Pague até R$ 80 no lugar de R$ 800",
              },
              {
                icon: Home,
                title: "Valorize Seu Imóvel",
                subtitle: "Até 30% de valorização",
                desc: "Imóveis com energia solar valem mais",
              },
              {
                icon: Leaf,
                title: "Sustentável",
                subtitle: "Energia 100% limpa e renovável",
                desc: "Reduza sua pegada de carbono",
              },
              {
                icon: LineChart,
                title: "ROI Rápido",
                subtitle: "Retorno em 4 a 6 anos",
                desc: "Sistema se paga sozinho",
              },
              {
                icon: CreditCard,
                title: "Financiamento",
                subtitle: "Parcele em até 120 meses",
                desc: "Prestação menor que a conta de luz",
              },
              {
                icon: Zap,
                title: "Crédito de Energia",
                subtitle: "Energia excedente vira crédito",
                desc: "Use quando precisar",
              },
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card
                  key={index}
                  className="p-8 hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 hover:-translate-y-2 bg-card"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-card-foreground">
                    {benefit.title}
                  </h3>
                  <p className="font-semibold text-primary mb-3">{benefit.subtitle}</p>
                  <p className="text-muted-foreground">{benefit.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Componentes do Sistema - Educação */}
      <SystemComponents />

      {/* Financiamento */}
      <Financing />

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Histórias reais de quem já economiza
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "João Silva",
                city: "São Paulo",
                text: "Minha conta era R$ 800. Hoje pago R$ 80. Melhor investimento que já fiz na vida!",
                rating: 5,
              },
              {
                name: "Maria Santos",
                city: "Campinas",
                text: "Financiei tudo. A parcela é menor que a antiga conta de luz. Incrível!",
                rating: 5,
              },
              {
                name: "Pedro Costa",
                city: "Jundiaí",
                text: "Instalaram em 3 semanas. Sistema funcionando perfeitamente há 2 anos!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 bg-card"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-card-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.city}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>

                <p className="text-muted-foreground italic">&ldquo;{testimonial.text}&rdquo;</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ com 10 perguntas */}
      <FAQ />

      {/* Lead Form */}
      <LeadForm />

      {/* Footer */}
      <footer className="bg-dark text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <h3 className="text-3xl font-bold mb-2">Solar Energy</h3>
            <p className="text-primary-foreground/80">Energia limpa para um futuro melhor</p>
          </div>

          <div className="flex justify-center gap-6 mb-8">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary-foreground/10 text-primary-foreground"
            >
              <Phone className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary-foreground/10 text-primary-foreground"
            >
              <Mail className="w-5 h-5" />
            </Button>
          </div>

          <p className="text-primary-foreground/60">
            © 2024 Solar Energy. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </div>
  );
};

export default Index;
