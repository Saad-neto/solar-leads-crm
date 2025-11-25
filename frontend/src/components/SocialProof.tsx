import { Card } from "@/components/ui/card";
import { Users, Zap, Award, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "5.000+",
    label: "Clientes Satisfeitos",
    color: "text-blue-500",
  },
  {
    icon: Zap,
    value: "15 MW",
    label: "de Energia Instalada",
    color: "text-yellow-500",
  },
  {
    icon: Award,
    value: "10 Anos",
    label: "de Experiência",
    color: "text-green-500",
  },
  {
    icon: TrendingUp,
    value: "98%",
    label: "de Recomendação",
    color: "text-purple-500",
  },
];

export const SocialProof = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
            Referência em Energia Solar
          </h2>
          <p className="text-muted-foreground text-lg">
            Números que comprovam nossa qualidade
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 hover:-translate-y-2 bg-card border-2 border-transparent hover:border-primary/20"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className={`w-7 h-7 ${stat.color}`} />
                  </div>
                </div>
                <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Certificações */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">Certificações e Parcerias:</p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            <div className="px-4 py-2 bg-card rounded-lg border">
              <p className="font-semibold text-foreground">ABSOLAR</p>
            </div>
            <div className="px-4 py-2 bg-card rounded-lg border">
              <p className="font-semibold text-foreground">INMETRO</p>
            </div>
            <div className="px-4 py-2 bg-card rounded-lg border">
              <p className="font-semibold text-foreground">⭐ 4.9 Google</p>
            </div>
            <div className="px-4 py-2 bg-card rounded-lg border">
              <p className="font-semibold text-foreground">ISO 9001</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
