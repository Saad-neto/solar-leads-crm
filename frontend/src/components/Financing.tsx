import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, TrendingDown, Clock, CheckCircle } from "lucide-react";

const banks = ["Banco do Brasil", "Itaú", "Santander", "BV Financeira", "Sicredi", "Sicoob"];

const benefits = [
  "Parcelas menores que a conta de luz",
  "Até 120 meses para pagar",
  "Aprovação em até 48h",
  "Taxa a partir de 1,49% ao mês",
];

export const Financing = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4 font-semibold">
              <CreditCard className="w-4 h-4" />
              Financiamento Facilitado
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Parcele em Até 120 Meses
            </h2>
            <p className="text-xl text-muted-foreground">
              Comece a economizar <span className="text-primary font-bold">sem investimento inicial</span>
            </p>
          </div>

          <Card className="p-8 md:p-12 bg-card shadow-2xl">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Lado Esquerdo - Benefícios */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-card-foreground flex items-center gap-2">
                  <TrendingDown className="w-6 h-6 text-primary" />
                  Por que financiar?
                </h3>

                <div className="space-y-4 mb-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-muted-foreground font-medium">{benefit}</p>
                    </div>
                  ))}
                </div>

                {/* Exemplo de Parcela */}
                <div className="bg-primary/5 rounded-xl p-6 border-2 border-primary/20">
                  <p className="text-sm text-muted-foreground mb-2">Exemplo de parcela:</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-primary">R$ 299</span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Sistema de 4 kWp em 120x
                  </p>
                </div>
              </div>

              {/* Lado Direito - Parceiros */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-card-foreground flex items-center gap-2">
                  <Clock className="w-6 h-6 text-primary" />
                  Parceiros Financeiros
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {banks.map((bank, index) => (
                    <div
                      key={index}
                      className="p-4 bg-background rounded-lg border-2 border-muted hover:border-primary/50 transition-colors text-center"
                    >
                      <p className="font-semibold text-sm text-foreground">{bank}</p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-xl text-primary-foreground">
                  <p className="font-bold text-lg mb-2">🎉 Simulação em 2 minutos</p>
                  <p className="text-sm mb-4 text-primary-foreground/90">
                    Descubra quanto você pode economizar e como financiar
                  </p>
                  <Button
                    className="w-full bg-background text-foreground hover:bg-background/90 font-bold h-12 shadow-lg"
                    onClick={() =>
                      document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Simular Agora →
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
