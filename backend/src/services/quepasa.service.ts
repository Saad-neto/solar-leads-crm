import axios from 'axios';

const QUEPASA_URL = process.env.QUEPASA_API_URL || 'https://quepasa.isaai.online';
const QUEPASA_TOKEN = process.env.QUEPASA_BOT_TOKEN || '';
const QUEPASA_BOT_NUMBER = process.env.QUEPASA_BOT_NUMBER || '';

interface QuepasaMessage {
  chatId: string;
  text: string;
}

interface QuepasaSendResponse {
  id: string;
  timestamp: number;
  source: string;
  recipient: string;
  message: {
    text: string;
  };
}

class QuepasaService {
  private axiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: QUEPASA_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Verifica o status da conexão do bot
   */
  async getStatus() {
    try {
      const response = await this.axiosInstance.get(`/v3/bot/${QUEPASA_TOKEN}`);
      return response.data;
    } catch (error: any) {
      console.error('Error getting Quepasa status:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Obtém o QR Code para conectar o WhatsApp
   */
  async getQRCode() {
    try {
      const response = await this.axiosInstance.get(`/v3/bot/${QUEPASA_TOKEN}/qrcode`);
      return response.data;
    } catch (error: any) {
      console.error('Error getting QR code:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Envia uma mensagem de texto
   */
  async sendMessage({ chatId, text }: QuepasaMessage): Promise<QuepasaSendResponse> {
    try {
      // Formato do chatId para Quepasa: número sem @ (ex: 5511999999999)
      const cleanChatId = chatId.replace('@c.us', '');

      console.log(`📤 Sending message to ${cleanChatId}: "${text.substring(0, 50)}..."`);

      const response = await this.axiosInstance.post(`/v3/bot/${QUEPASA_TOKEN}/sendtext`, {
        chatId: cleanChatId,
        text: text,
      });

      console.log('✅ Message sent successfully');
      return response.data;
    } catch (error: any) {
      console.error('❌ Error sending message:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Envia uma mensagem usando templates predefinidos
   */
  async sendTemplateMessage(phoneNumber: string, templateName: string) {
    const formattedPhone = this.formatPhoneNumber(phoneNumber);
    const chatId = formattedPhone; // Quepasa usa número direto, sem @c.us

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

  /**
   * Formata número de telefone para o padrão Quepasa
   */
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

  /**
   * Configura webhook para receber mensagens
   */
  async setupWebhook(webhookUrl: string) {
    try {
      const response = await this.axiosInstance.post(`/v3/bot/${QUEPASA_TOKEN}/webhook`, {
        url: webhookUrl,
        forwardurl: webhookUrl,
        trackid: 'solar-leads',
      });
      return response.data;
    } catch (error: any) {
      console.error('Error setting up webhook:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Verifica webhook configurado
   */
  async getWebhook() {
    try {
      const response = await this.axiosInstance.get(`/v3/bot/${QUEPASA_TOKEN}/webhook`);
      return response.data;
    } catch (error: any) {
      console.error('Error getting webhook:', error.response?.data || error.message);
      return null;
    }
  }

  /**
   * Inicia a sessão do bot
   */
  async startBot() {
    try {
      const response = await this.axiosInstance.post(`/v3/bot/${QUEPASA_TOKEN}/start`);
      return response.data;
    } catch (error: any) {
      console.error('Error starting bot:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Para a sessão do bot
   */
  async stopBot() {
    try {
      const response = await this.axiosInstance.post(`/v3/bot/${QUEPASA_TOKEN}/stop`);
      return response.data;
    } catch (error: any) {
      console.error('Error stopping bot:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Obtém informações do bot
   */
  async getBotInfo() {
    try {
      const response = await this.axiosInstance.get(`/v3/bot/${QUEPASA_TOKEN}`);
      return response.data;
    } catch (error: any) {
      console.error('Error getting bot info:', error.response?.data || error.message);
      throw error;
    }
  }
}

export default new QuepasaService();
