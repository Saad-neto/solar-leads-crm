import { Card } from "@/components/ui/card";
import { Cpu, Gauge, Repeat, Coins } from "lucide-react";

const components = [
  {
    icon: Cpu,
    title: "Painéis Solares",
    subtitle: "Módulos Fotovoltaicos",
    description: "Captam a luz solar e convertem em energia elétrica. Garantia de 25 anos com 80% de eficiência.",
    specs: ["Tier 1", "25 anos garantia", "Máxima eficiência"],
  },
  {
    icon: Gauge,
    title: "Inversor Solar",
    subtitle: "Cérebro do Sistema",
    description: "Transforma a energia dos painéis em energia compatível com sua casa. Monitoramento em tempo real.",
    specs: ["Alta eficiência", "Monitoramento", "10 anos garantia"],
  },
  {
    icon: Repeat,
    title: "Medidor Bidirecional",
    subtitle: "Controle Inteligente",
    description: "Mede tanto a energia que você consome quanto a que você injeta na rede.",
    specs: ["Fornecido", "pela concessionária", "Sem custo"],
  },
  {
    icon: Coins,
    title: "Sistema de Créditos",
    subtitle: "Economia Garantida",
    description: "Energia excedente vira créditos válidos por 60 meses. Use quando precisar!",
    specs: ["Válido 60 meses", "Sem desperdício", "Máxima economia"],
  },
];

export const SystemComponents = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Como Funciona o Sistema
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Entenda cada componente do seu sistema de energia solar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {components.map((component, index) => {
            const Icon = component.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 hover:-translate-y-2 bg-card relative group"
              >
                {/* Número do passo */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-lg">
                  {index + 1}
                </div>

                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-7 h-7 text-primary" />
                </div>

                <h3 className="text-xl font-bold mb-1 text-card-foreground">
                  {component.title}
                </h3>
                <p className="text-sm text-primary font-semibold mb-3">
                  {component.subtitle}
                </p>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {component.description}
                </p>

                <div className="space-y-1 pt-4 border-t">
                  {component.specs.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <p className="text-xs text-muted-foreground">{spec}</p>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
