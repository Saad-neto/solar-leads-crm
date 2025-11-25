import { Request, Response, NextFunction } from 'express';
import { prisma } from '../database/prisma';
import { AppError } from '../middlewares/errorHandler';
import wahaService from '../services/waha.service';
import { LeadStatus } from '@prisma/client';

interface WhatsAppMessage {
  event: string;
  session: string;
  payload: {
    id: string;
    timestamp: number;
    from: string;
    fromMe: boolean;
    body: string;
    hasMedia: boolean;
  };
}

interface ConversationState {
  step: 'tipo_imovel' | 'valor_conta' | 'cidade' | 'finalizado';
  data: {
    tipoImovel?: string;
    valorConta?: string;
    cidade?: string;
  };
}

// Armazena estado da conversa em memória (em produção, usar Redis)
const conversationStates = new Map<string, ConversationState>();

export const handleWebhook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const message: WhatsAppMessage = req.body;

    // Ignora mensagens enviadas por nós
    if (message.payload.fromMe) {
      return res.status(200).json({ success: true });
    }

    const phoneNumber = message.payload.from.replace('@c.us', '');
    const messageText = message.payload.body.toLowerCase().trim();

    // Busca ou cria lead
    let lead = await prisma.lead.findFirst({
      where: {
        telefone: {
          contains: phoneNumber.substring(2), // Remove código do país
        },
      },
    });

    if (!lead) {
      // Cria novo lead se não existir
      const defaultClientId = 'cmiaplne2000013cgz37gk2zd'; // ID do cliente de teste
      lead = await prisma.lead.create({
        data: {
          nome: 'Lead WhatsApp',
          telefone: phoneNumber,
          origem: 'whatsapp',
          status: LeadStatus.NOVO,
          clienteId: defaultClientId,
        },
      });
    }

    // Processa mensagem
    await processMessage(lead.id, phoneNumber, messageText);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    next(error);
  }
};

async function processMessage(
  leadId: string,
  phoneNumber: string,
  messageText: string
) {
  let state = conversationStates.get(phoneNumber) || {
    step: 'tipo_imovel',
    data: {},
  };

  let response = '';
  let shouldUpdateLead = false;
  let leadUpdate: any = {};

  switch (state.step) {
    case 'tipo_imovel':
      if (messageText.includes('a') || messageText.includes('residencial')) {
        state.data.tipoImovel = 'residencial';
        response = 'valorConta';
        state.step = 'valor_conta';
        shouldUpdateLead = true;
        leadUpdate.interesse = 'residencial';
      } else if (messageText.includes('b') || messageText.includes('comercial')) {
        state.data.tipoImovel = 'comercial';
        response = 'valorConta';
        state.step = 'valor_conta';
        shouldUpdateLead = true;
        leadUpdate.interesse = 'comercial';
      } else if (messageText.includes('c') || messageText.includes('rural')) {
        state.data.tipoImovel = 'rural';
        response = 'valorConta';
        state.step = 'valor_conta';
        shouldUpdateLead = true;
        leadUpdate.interesse = 'rural';
      } else {
        await wahaService.sendMessage({
          chatId: `${phoneNumber}@c.us`,
          text: 'Por favor, escolha uma das opções: (a) Residencial, (b) Comercial ou (c) Rural',
        });
        return;
      }
      break;

    case 'valor_conta':
      let valorConta = null;
      if (messageText.includes('a') || messageText.includes('200')) {
        valorConta = 'ATE_200';
        state.data.valorConta = 'ATE_200';
      } else if (messageText.includes('b') || messageText.includes('500')) {
        valorConta = 'DE_200_A_500';
        state.data.valorConta = 'DE_200_A_500';
      } else if (messageText.includes('c') || messageText.includes('1000')) {
        valorConta = 'DE_500_A_1000';
        state.data.valorConta = 'DE_500_A_1000';
      } else if (messageText.includes('d') || messageText.includes('acima')) {
        valorConta = 'ACIMA_1000';
        state.data.valorConta = 'ACIMA_1000';
      } else {
        await wahaService.sendMessage({
          chatId: `${phoneNumber}@c.us`,
          text: 'Por favor, escolha uma das opções: (a), (b), (c) ou (d)',
        });
        return;
      }

      response = 'cidade';
      state.step = 'cidade';
      shouldUpdateLead = true;
      leadUpdate.valorConta = valorConta;
      break;

    case 'cidade':
      state.data.cidade = messageText;
      response = 'finalizado';
      state.step = 'finalizado';
      shouldUpdateLead = true;
      leadUpdate.cidade = messageText;
      leadUpdate.status = LeadStatus.QUALIFICADO;
      break;

    case 'finalizado':
      await wahaService.sendMessage({
        chatId: `${phoneNumber}@c.us`,
        text: 'Você já completou o cadastro! Nossa equipe entrará em contato em breve. 😊',
      });
      return;
  }

  // Atualiza lead
  if (shouldUpdateLead) {
    const currentConversation = await prisma.lead.findUnique({
      where: { id: leadId },
      select: { conversaCompleta: true },
    });

    const conversationHistory = currentConversation?.conversaCompleta || '';
    const newEntry = `\n[${new Date().toISOString()}] Cliente: ${messageText}`;

    await prisma.lead.update({
      where: { id: leadId },
      data: {
        ...leadUpdate,
        conversaCompleta: conversationHistory + newEntry,
      },
    });
  }

  // Salva estado
  conversationStates.set(phoneNumber, state);

  // Envia próxima mensagem
  await wahaService.sendTemplateMessage(phoneNumber, response);

  // Adiciona resposta do bot ao histórico
  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    select: { conversaCompleta: true },
  });

  await prisma.lead.update({
    where: { id: leadId },
    data: {
      conversaCompleta: (lead?.conversaCompleta || '') + `\n[${new Date().toISOString()}] Bot: ${response}`,
    },
  });
}

export const getSessionStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status = await wahaService.getSessionStatus();
    res.json({
      success: true,
      data: status,
    });
  } catch (error) {
    next(error);
  }
};

export const getQRCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Verifica se sessão existe
    let session = await wahaService.checkSession();

    if (!session) {
      // Cria sessão se não existir
      await wahaService.createSession();
      // Aguarda um pouco para o QR code ser gerado
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    const qrCode = await wahaService.getQRCode();

    res.json({
      success: true,
      data: {
        qrCode,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const sendMessageToLead = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'Authentication required');
    }

    const { leadId, message } = req.body;

    const lead = await prisma.lead.findFirst({
      where: {
        id: leadId,
        clienteId: req.user.clienteId,
      },
    });

    if (!lead) {
      throw new AppError(404, 'Lead not found');
    }

    if (!lead.telefone) {
      throw new AppError(400, 'Lead has no phone number');
    }

    const formattedPhone = wahaService.formatPhoneNumber(lead.telefone);
    await wahaService.sendMessage({
      chatId: `${formattedPhone}@c.us`,
      text: message,
    });

    // Salva no histórico
    await prisma.lead.update({
      where: { id: leadId },
      data: {
        conversaCompleta: (lead.conversaCompleta || '') +
          `\n[${new Date().toISOString()}] Vendedor: ${message}`,
      },
    });

    res.json({
      success: true,
      message: 'Message sent',
    });
  } catch (error) {
    next(error);
  }
};

export const startConversation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'Authentication required');
    }

    const { leadId } = req.body;

    const lead = await prisma.lead.findFirst({
      where: {
        id: leadId,
        clienteId: req.user.clienteId,
      },
    });

    if (!lead) {
      throw new AppError(404, 'Lead not found');
    }

    if (!lead.telefone) {
      throw new AppError(400, 'Lead has no phone number');
    }

    await wahaService.sendTemplateMessage(lead.telefone, 'welcome');

    await prisma.lead.update({
      where: { id: leadId },
      data: {
        status: LeadStatus.CONTATADO,
        contatadoEm: new Date(),
      },
    });

    res.json({
      success: true,
      message: 'Conversation started',
    });
  } catch (error) {
    next(error);
  }
};
