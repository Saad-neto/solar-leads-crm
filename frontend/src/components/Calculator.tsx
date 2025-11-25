import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap, TrendingDown } from "lucide-react";

export const Calculator = () => {
  const [billValue, setBillValue] = useState<string>("");
  const [savings, setSavings] = useState<number | null>(null);

  const calculateSavings = () => {
    const value = parseFloat(billValue.replace(/\D/g, "")) / 100;
    if (value > 0) {
      setSavings(value * 0.9); // 90% de economia
    }
  };

  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    const amount = parseFloat(numbers) / 100;
    return isNaN(amount) ? "" : amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setBillValue(formatted);
    setSavings(null);
  };

  return (
    <div className="bg-card rounded-2xl p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-300 max-w-md mx-auto">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Zap className="w-8 h-8 text-primary" />
        </div>
      </div>

      <h3 className="text-xl font-semibold text-center mb-6 text-card-foreground">
        Quanto você paga de luz por mês?
      </h3>

      <div className="mb-6">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-semibold text-muted-foreground">
            R$
          </span>
          <Input
            type="text"
            value={billValue}
            onChange={handleInputChange}
            placeholder="0,00"
            className="pl-14 text-2xl font-semibold h-16 text-center border-2 focus:border-primary"
          />
        </div>
      </div>

      <Button
        onClick={calculateSavings}
        disabled={!billValue || parseFloat(billValue.replace(/\D/g, "")) === 0}
        className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      >
        Calcular Minha Economia →
      </Button>

      {savings !== null && (
        <div className="mt-8 p-6 bg-primary/5 rounded-xl animate-fade-in border-2 border-primary/20">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-primary" />
            <p className="text-sm font-medium text-card-foreground">💰 Você pode economizar</p>
          </div>
          <p className="text-4xl font-bold text-primary text-center mb-1">
            R$ {savings.toFixed(2).replace(".", ",")}
          </p>
          <p className="text-center text-muted-foreground mb-4">/mês com energia solar</p>
          
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground animate-pulse-slow font-semibold h-12 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Quero Meu Orçamento Grátis →
          </Button>
        </div>
      )}
    </div>
  );
};
