import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Phone, Mail, MapPin, Zap, Lock } from "lucide-react";
import { toast } from "sonner";

export const LeadForm = () => {
  const [formData, setFormData] = useState({
    nome: "",
    whatsapp: "",
    email: "",
    cidade: "",
    valorConta: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    return value;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validação básica
    if (!formData.nome || !formData.whatsapp || !formData.email || !formData.cidade || !formData.valorConta) {
      toast.error("Por favor, preencha todos os campos");
      setIsSubmitting(false);
      return;
    }

    try {
      // Capturar parâmetros UTM da URL
      const urlParams = new URLSearchParams(window.location.search);

      // Preparar dados para envio
      const leadData = {
        nome: formData.nome,
        telefone: formData.whatsapp.replace(/\D/g, ""), // Remove formatação
        email: formData.email,
        cidade: formData.cidade,
        valorConta: formData.valorConta,
        clienteId: "cmiaplne2000013cgz37gk2zd", // Cliente de teste
        origem: "landing_page",
        utmSource: urlParams.get("utm_source") || undefined,
        utmMedium: urlParams.get("utm_medium") || undefined,
        utmCampaign: urlParams.get("utm_campaign") || undefined,
      };

      // Enviar para o backend
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await fetch(`${apiUrl}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao enviar formulário");
      }

      const result = await response.json();

      toast.success("✅ Orçamento solicitado com sucesso! Em breve entraremos em contato.");

      // Limpar formulário
      setFormData({
        nome: "",
        whatsapp: "",
        email: "",
        cidade: "",
        valorConta: "",
      });

      // Opcional: Redirecionar para WhatsApp após 2 segundos
      // setTimeout(() => {
      //   const whatsapp = formData.whatsapp.replace(/\D/g, "");
      //   window.open(`https://wa.me/55${whatsapp}?text=Olá! Acabei de solicitar um orçamento de energia solar.`, '_blank');
      // }, 2000);

    } catch (error) {
      console.error("Erro ao enviar lead:", error);
      toast.error(error instanceof Error ? error.message : "❌ Erro ao enviar formulário. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="formulario" className="py-20 bg-gradient-to-br from-primary to-secondary">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary-foreground">
          Solicite Seu Orçamento Grátis
        </h2>
        <p className="text-center text-primary-foreground/90 mb-12 text-lg">
          Sem compromisso. Resposta em até 24 horas.
        </p>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-2xl">
          <div className="space-y-6">
            <div>
              <Label htmlFor="nome" className="flex items-center gap-2 mb-2 text-card-foreground">
                <User className="w-4 h-4" />
                Nome Completo
              </Label>
              <Input
                id="nome"
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Seu nome completo"
                className="h-12"
                required
              />
            </div>

            <div>
              <Label htmlFor="whatsapp" className="flex items-center gap-2 mb-2 text-card-foreground">
                <Phone className="w-4 h-4" />
                WhatsApp
              </Label>
              <Input
                id="whatsapp"
                type="tel"
                value={formData.whatsapp}
                onChange={(e) =>
                  setFormData({ ...formData, whatsapp: formatPhone(e.target.value) })
                }
                placeholder="(99) 99999-9999"
                className="h-12"
                maxLength={15}
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="flex items-center gap-2 mb-2 text-card-foreground">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="seu@email.com"
                className="h-12"
                required
              />
            </div>

            <div>
              <Label htmlFor="cidade" className="flex items-center gap-2 mb-2 text-card-foreground">
                <MapPin className="w-4 h-4" />
                Cidade
              </Label>
              <Input
                id="cidade"
                type="text"
                value={formData.cidade}
                onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                placeholder="Sua cidade"
                className="h-12"
                required
              />
            </div>

            <div>
              <Label htmlFor="valorConta" className="flex items-center gap-2 mb-2 text-card-foreground">
                <Zap className="w-4 h-4" />
                Valor da Conta de Luz
              </Label>
              <Select
                value={formData.valorConta}
                onValueChange={(value) => setFormData({ ...formData, valorConta: value })}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Selecione uma faixa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ATE_200">Menos de R$ 200</SelectItem>
                  <SelectItem value="DE_200_A_500">R$ 200 a R$ 500</SelectItem>
                  <SelectItem value="DE_500_A_1000">R$ 500 a R$ 1.000</SelectItem>
                  <SelectItem value="ACIMA_1000">Mais de R$ 1.000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-16 text-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {isSubmitting ? "ENVIANDO..." : "SOLICITAR ORÇAMENTO GRÁTIS →"}
            </Button>

            <p className="text-center text-muted-foreground flex items-center justify-center gap-2">
              <Lock className="w-4 h-4" />
              Seus dados estão seguros
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};
