import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Cloud, Clock, Wrench, CreditCard, Moon, Calendar, Home, Shield, DollarSign, FileCheck } from "lucide-react";

const faqs = [
  {
    icon: Cloud,
    question: "Funciona em dias nublados?",
    answer: "Sim! Os painéis solares captam luz, não calor. Mesmo em dias nublados ou chuvosos, há geração de energia. A eficiência pode ser menor, mas o sistema continua produzindo energia.",
  },
  {
    icon: Clock,
    question: "Quanto tempo dura?",
    answer: "Os painéis solares têm vida útil de 25 a 30 anos com manutenção mínima. Os fabricantes oferecem garantia de 25 anos com pelo menos 80% da capacidade original de geração.",
  },
  {
    icon: Wrench,
    question: "Precisa de manutenção?",
    answer: "Muito pouca! A manutenção é basicamente uma limpeza dos painéis 1 a 2 vezes ao ano para remover poeira e folhas. É um processo simples que pode ser feito com água e sabão neutro.",
  },
  {
    icon: CreditCard,
    question: "Posso financiar?",
    answer: "Sim! Oferecemos financiamento em até 120 meses com taxas especiais. Em muitos casos, a parcela do financiamento é menor que o valor atual da conta de luz.",
  },
  {
    icon: Moon,
    question: "Funciona à noite?",
    answer: "Sim! Durante o dia, o excesso de energia gerada vira créditos na distribuidora. À noite, você usa esses créditos. É como se a rede elétrica fosse sua bateria virtual.",
  },
  {
    icon: Calendar,
    question: "Tempo de instalação?",
    answer: "De 15 a 30 dias após aprovação do projeto pela distribuidora. Nossa equipe cuida de toda a documentação e instalação. Você não precisa se preocupar com nada!",
  },
  {
    icon: Home,
    question: "Funciona em apartamento?",
    answer: "Sim! Existem duas opções: instalação no telhado do prédio (com aprovação do condomínio) ou energia solar compartilhada, onde você assina uma cooperativa e recebe os créditos sem instalar nada.",
  },
  {
    icon: Shield,
    question: "Qual a garantia do sistema?",
    answer: "Painéis: 25 anos de garantia de fabricação e 25 anos de performance (80%). Inversor: 10 anos. Instalação: 5 anos. Você tem total segurança no seu investimento!",
  },
  {
    icon: DollarSign,
    question: "Em quanto tempo o sistema se paga?",
    answer: "Em média, de 4 a 6 anos. Considerando que o sistema dura 25+ anos, você terá aproximadamente 20 anos de energia praticamente grátis! É um dos melhores investimentos possíveis.",
  },
  {
    icon: FileCheck,
    question: "Preciso de autorização da prefeitura?",
    answer: "Não se preocupe! Cuidamos de toda a burocracia: projeto técnico, aprovação na concessionária, vistoria e troca do medidor. Você só assina os documentos. Simples assim!",
  },
];

export const FAQ = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
          Perguntas Frequentes
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Tire suas dúvidas sobre energia solar
        </p>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => {
            const Icon = faq.icon;
            return (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl px-6 border-2 border-transparent hover:border-primary/20 transition-colors shadow-[var(--shadow-card)]"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-semibold text-lg text-card-foreground">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pl-14 pb-6 text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
};
