import axios from 'axios';

const WAHA_URL = process.env.WAHA_API_URL || 'http://localhost:3001';
const WAHA_API_KEY = process.env.WAHA_API_KEY || '';
const SESSION_NAME = process.env.WAHA_SESSION_NAME || 'solar-leads-bot';

interface WahaMessage {
  chatId: string;
  text: string;
  session?: string;
}

class WahaService {
  private axiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: WAHA_URL,
      headers: {
        'X-Api-Key': WAHA_API_KEY,
        'Content-Type': 'application/json',
      },
    });
  }

  async checkSession() {
    try {
      const response = await this.axiosInstance.get(`/api/sessions/${SESSION_NAME}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async createSession() {
    try {
      const response = await this.axiosInstance.post('/api/sessions', {
        name: SESSION_NAME,
        config: {
          proxy: null,
          noweb: {
            store: {
              enabled: true,
              fullSync: false,
            },
          },
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error creating session:', error.response?.data || error.message);
      throw error;
    }
  }

  async getQRCode() {
    try {
      const response = await this.axiosInstance.get(`/api/sessions/${SESSION_NAME}/auth/qr`, {
        responseType: 'text',
      });
      return response.data;
    } catch (error: any) {
      console.error('Error getting QR code:', error.response?.data || error.message);
      throw error;
    }
  }

  async getSessionStatus() {
    try {
      const response = await this.axiosInstance.get(`/api/sessions/${SESSION_NAME}/status`);
      return response.data;
    } catch (error: any) {
      console.error('Error getting session status:', error.response?.data || error.message);
      return null;
    }
  }

  async sendMessage({ chatId, text }: WahaMessage) {
    try {
      const response = await this.axiosInstance.post(
        `/api/sendText`,
        {
          session: SESSION_NAME,
          chatId,
          text,
        }
      );
      return response.data;
    } catch (error: any) {
      console.error('Error sending message:', error.response?.data || error.message);
      throw error;
    }
  }

  async sendTemplateMessage(phoneNumber: string, templateName: string) {
    const formattedPhone = this.formatPhoneNumber(phoneNumber);
    const chatId = `${formattedPhone}@c.us`;

    const templates: Record<string, string> = {
      welcome: `Olá! 👋

Obrigado por seu interesse em energia solar! ☀️

Sou o assistente virtual da Solar Energy e vou te ajudar a economizar até 95% na sua conta de luz.

Para fazer uma simulação personalizada, preciso de algumas informações:

1️⃣ Qual o tipo do seu imóvel?
   (a) Residencial
   (b) Comercial
   (c) Rural

Digite a letra da sua resposta.`,

      valorConta: `Perfeito! Agora me diga:

2️⃣ Qual o valor médio da sua conta de luz?
   (a) Até R$ 200
   (b) De R$ 200 a R$ 500
   (c) De R$ 500 a R$ 1000
   (d) Acima de R$ 1000`,

      cidade: `Ótimo! Última pergunta:

3️⃣ Em qual cidade você mora?

Digite o nome da cidade.`,

      finalizado: `Perfeito! ✅

Recebi todas as informações. Nossa equipe está analisando seu perfil e em breve um consultor especializado entrará em contato para apresentar a melhor proposta personalizada para você!

Você pode economizar até 95% na conta de luz e o investimento se paga em poucos anos.

Aguarde nosso contato! 📞

Qualquer dúvida, estou por aqui! 😊`,
    };

    const message = templates[templateName] || templates.welcome;
    return this.sendMessage({ chatId, text: message });
  }

  formatPhoneNumber(phone: string): string {
    // Remove todos os caracteres não numéricos
    const cleaned = phone.replace(/\D/g, '');

    // Se começar com 0, remove
    const withoutZero = cleaned.startsWith('0') ? cleaned.substring(1) : cleaned;

    // Se não tiver código do país, adiciona 55 (Brasil)
    if (withoutZero.length === 11 || withoutZero.length === 10) {
      return `55${withoutZero}`;
    }

    return withoutZero;
  }

  async setupWebhook(webhookUrl: string) {
    try {
      const response = await this.axiosInstance.put(`/api/sessions/${SESSION_NAME}`, {
        config: {
          webhooks: [
            {
              url: webhookUrl,
              events: ['message'],
              hmac: null,
              retries: null,
              customHeaders: null,
            },
          ],
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error setting up webhook:', error.response?.data || error.message);
      throw error;
    }
  }
}

export default new WahaService();
