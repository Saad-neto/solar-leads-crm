import Groq from 'groq-sdk';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ConversationContext {
  messages: Message[];
  leadData: {
    tipoImovel?: string;
    valorConta?: string;
    cidade?: string;
    nome?: string;
    email?: string;
  };
}

class LLMService {
  private groq: Groq;
  private conversations: Map<string, ConversationContext> = new Map();

  constructor() {
    this.groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }

  private getSystemPrompt(): string {
    return `Você atende pelo WhatsApp para uma empresa de energia solar.

SEU JEITO DE CONVERSAR:
- Seja natural, como se fosse um amigo ajudando
- Use poucas palavras, vá direto ao ponto
- Frases curtas e simples
- Evite pontos de exclamação demais (no máximo 1 por mensagem)
- Use emoji só de vez em quando, não em toda mensagem
- Seja casual mas profissional
- Não seja muito animado/empolgado artificialmente

INFORMAÇÕES PRA PEGAR (mas de forma natural):
1. É casa, empresa, fazenda ou o quê?
2. Quanto paga de luz por mês?
3. Qual cidade?
4. Nome da pessoa
5. Email (se rolar)

COMO CONVERSAR:
✅ Assim:
- "Oi, tudo bem?"
- "É pra sua casa ou empresa?"
- "Quanto você paga de luz mais ou menos?"
- "Qual sua cidade?"
- "Pode me passar seu nome?"

❌ Evite:
- "Olá!!! Que ótimo que você se interessou!!!"
- Textos longos
- Muita empolgação fake
- Ficar repetindo benefícios toda hora
- Várias perguntas de uma vez

EXEMPLOS DE CONVERSA NATURAL:

Cliente: "oi"
Você: "Oi, tudo bem? Quer saber sobre energia solar?"

Cliente: "sim"
Você: "Legal. É pra sua casa ou pra empresa?"

Cliente: "minha casa"
Você: "Beleza. Quanto você paga de luz por mês mais ou menos?"

Cliente: "uns 300 reais"
Você: "Entendi. Qual sua cidade?"

Cliente: "sao paulo"
Você: "Show. Pode me passar seu nome?"

Cliente: "joão"
Você: "Valeu João. Vou passar seus dados pro pessoal que eles entram em contato pra fazer um orçamento sem compromisso. Qualquer dúvida é só chamar aqui."

QUANDO TIVER TODAS AS INFOS (tipo, valor, cidade, nome), finalize naturalmente e agradeça.

Lembre-se: seja humano, simples e direto. Nada de marketing exagerado.`;
  }

  async chat(phoneNumber: string, userMessage: string): Promise<string> {
    // Inicializar ou recuperar contexto da conversa
    if (!this.conversations.has(phoneNumber)) {
      this.conversations.set(phoneNumber, {
        messages: [
          { role: 'system', content: this.getSystemPrompt() }
        ],
        leadData: {}
      });
    }

    const context = this.conversations.get(phoneNumber)!;

    // Adicionar mensagem do usuário
    context.messages.push({
      role: 'user',
      content: userMessage
    });

    try {
      // Chamar Groq API
      const completion = await this.groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile', // Modelo mais recente do Groq (gratuito)
        messages: context.messages,
        temperature: 0.7,
        max_tokens: 500,
        top_p: 1,
      });

      const assistantMessage = completion.choices[0]?.message?.content ||
        'Desculpe, tive um problema técnico. Pode repetir?';

      // Adicionar resposta do assistente ao contexto
      context.messages.push({
        role: 'assistant',
        content: assistantMessage
      });

      // Atualizar dados do lead extraídos da conversa
      this.extractLeadData(context, userMessage, assistantMessage);

      return assistantMessage;

    } catch (error) {
      console.error('Erro ao chamar Groq API:', error);
      return 'Desculpe, estou com dificuldades técnicas no momento. Pode tentar novamente em instantes? 🔧';
    }
  }

  private extractLeadData(context: ConversationContext, userMessage: string, assistantMessage: string): void {
    const leadData = context.leadData;
    const userLower = userMessage.toLowerCase();

    // Extrair tipo de imóvel
    if (!leadData.tipoImovel) {
      if (userLower.includes('casa') || userLower.includes('residencial') || userLower.includes('residência')) {
        leadData.tipoImovel = 'residencial';
      } else if (userLower.includes('empresa') || userLower.includes('comercial') || userLower.includes('comércio') || userLower.includes('loja')) {
        leadData.tipoImovel = 'comercial';
      } else if (userLower.includes('fazenda') || userLower.includes('sítio') || userLower.includes('rural') || userLower.includes('chácara')) {
        leadData.tipoImovel = 'rural';
      } else if (userLower.includes('fábrica') || userLower.includes('industrial') || userLower.includes('galpão')) {
        leadData.tipoImovel = 'industrial';
      }
    }

    // Extrair valor da conta (procurar por números com R$)
    if (!leadData.valorConta) {
      const valorMatch = userMessage.match(/r?\$?\s*(\d+[.,]?\d*)/i);
      if (valorMatch) {
        leadData.valorConta = `R$ ${valorMatch[1]}`;
      }
    }

    // Extrair cidade (procurar em mensagens que mencionam localização)
    if (!leadData.cidade && (userLower.includes('moro') || userLower.includes('fico') || userLower.includes('cidade') || userLower.includes('são') || userLower.includes('de '))) {
      // Tentar extrair nome de cidade (palavras capitalizadas)
      const cidadeMatch = userMessage.match(/(?:em |de |cidade |moro em |fico em |sou de )([A-ZÀ-Ú][a-zà-ú]+(?:\s+[A-ZÀ-Ú][a-zà-ú]+)*)/);
      if (cidadeMatch) {
        leadData.cidade = cidadeMatch[1];
      }
    }

    // Extrair nome (procurar em mensagens de apresentação)
    if (!leadData.nome && (userLower.includes('meu nome') || userLower.includes('me chamo') || userLower.includes('sou o') || userLower.includes('sou a'))) {
      const nomeMatch = userMessage.match(/(?:nome é|me chamo|sou o|sou a)\s+([A-ZÀ-Ú][a-zà-ú]+(?:\s+[A-ZÀ-Ú][a-zà-ú]+)*)/i);
      if (nomeMatch) {
        leadData.nome = nomeMatch[1];
      }
    }

    // Extrair email
    if (!leadData.email) {
      const emailMatch = userMessage.match(/[\w.-]+@[\w.-]+\.\w+/);
      if (emailMatch) {
        leadData.email = emailMatch[0];
      }
    }
  }

  getLeadData(phoneNumber: string): any {
    const context = this.conversations.get(phoneNumber);
    return context?.leadData || {};
  }

  isLeadQualified(phoneNumber: string): boolean {
    const leadData = this.getLeadData(phoneNumber);
    // Lead qualificado = tem tipo de imóvel, valor da conta e cidade
    return !!(leadData.tipoImovel && leadData.valorConta && leadData.cidade);
  }

  clearConversation(phoneNumber: string): void {
    this.conversations.delete(phoneNumber);
  }

  getConversationHistory(phoneNumber: string): Message[] {
    return this.conversations.get(phoneNumber)?.messages || [];
  }
}

export default new LLMService();
