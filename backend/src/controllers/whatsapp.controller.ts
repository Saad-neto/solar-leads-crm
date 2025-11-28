import { Request, Response, NextFunction } from 'express';
import { prisma } from '../database/prisma';
import { AppError } from '../middlewares/errorHandler';
import quepasaService from '../services/quepasa.service';
import llmService from '../services/llm.service';
import { LeadStatus } from '@prisma/client';

interface QuepasaWebhookMessage {
  id: string;
  timestamp: string;
  type: string;
  chat: {
    id: string;
    phone: string;
    title: string;
  };
  text: string;
  fromme: boolean;
  frominternal: boolean;
  wid: string;
}

export const handleWebhook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const message: QuepasaWebhookMessage = req.body;

    console.log('📨 Processing Quepasa message:', JSON.stringify(message, null, 2));

    // Ignora mensagens enviadas por nós
    if (message.fromme) {
      console.log('⏭️ Ignoring message from bot');
      return res.status(200).json({ success: true });
    }

    // Ignora se não tiver texto
    if (!message.text) {
      console.log('⏭️ Ignoring message without text');
      return res.status(200).json({ success: true });
    }

    const phoneNumber = message.chat.phone.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    const messageText = message.text.toLowerCase().trim();

    console.log(`💬 Message from: ${phoneNumber} - Text: "${messageText}"`);

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
      const leadName = message.chat.title || 'Lead WhatsApp';

      console.log(`✨ Creating new lead: ${leadName} (${phoneNumber})`);

      lead = await prisma.lead.create({
        data: {
          nome: leadName,
          telefone: phoneNumber,
          origem: 'whatsapp',
          status: LeadStatus.NOVO,
          clienteId: defaultClientId,
        },
      });

      console.log(`✅ Lead created with ID: ${lead.id}`);
    } else {
      console.log(`📋 Found existing lead: ${lead.nome} (ID: ${lead.id})`);
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
  try {
    console.log(`🤖 Processing message with LLM for ${phoneNumber}: "${messageText}"`);

    // Usa o LLM para gerar resposta inteligente
    const botResponse = await llmService.chat(phoneNumber, messageText);

    console.log(`💬 Bot response: "${botResponse}"`);

    // Salva mensagem do cliente no histórico
    const currentLead = await prisma.lead.findUnique({
      where: { id: leadId },
      select: { conversaCompleta: true },
    });

    const conversationHistory = currentLead?.conversaCompleta || '';
    const timestamp = new Date().toISOString();
    const updatedHistory = conversationHistory +
      `\n[${timestamp}] Cliente: ${messageText}` +
      `\n[${timestamp}] Bot: ${botResponse}`;

    // Extrai dados do lead da conversa
    const leadData = llmService.getLeadData(phoneNumber);
    const isQualified = llmService.isLeadQualified(phoneNumber);

    console.log(`📊 Lead data extracted:`, leadData);
    console.log(`✅ Lead qualified:`, isQualified);

    // Prepara atualização do lead
    const leadUpdate: any = {
      conversaCompleta: updatedHistory,
    };

    // Atualiza campos específicos se foram extraídos
    if (leadData.tipoImovel) {
      leadUpdate.interesse = leadData.tipoImovel;
    }

    if (leadData.valorConta) {
      // Converte valor para enum do banco
      const valor = leadData.valorConta.replace(/[^\d]/g, '');
      if (parseInt(valor) <= 200) {
        leadUpdate.valorConta = 'ATE_200';
      } else if (parseInt(valor) <= 500) {
        leadUpdate.valorConta = 'DE_200_A_500';
      } else if (parseInt(valor) <= 1000) {
        leadUpdate.valorConta = 'DE_500_A_1000';
      } else {
        leadUpdate.valorConta = 'ACIMA_1000';
      }
    }

    if (leadData.cidade) {
      leadUpdate.cidade = leadData.cidade;
    }

    if (leadData.nome) {
      leadUpdate.nome = leadData.nome;
    }

    if (leadData.email) {
      leadUpdate.email = leadData.email;
    }

    // Se lead está qualificado, atualiza status
    const conversaAnterior = typeof currentLead?.conversaCompleta === 'string' ? currentLead.conversaCompleta : '';
    if (isQualified && !conversaAnterior.includes('QUALIFICADO')) {
      leadUpdate.status = LeadStatus.QUALIFICADO;
      console.log(`🎯 Lead qualificado! Dados: tipo=${leadData.tipoImovel}, valor=${leadData.valorConta}, cidade=${leadData.cidade}`);
    }

    // Atualiza lead no banco
    await prisma.lead.update({
      where: { id: leadId },
      data: leadUpdate,
    });

    console.log(`💾 Lead updated in database`);

    // Envia resposta via WhatsApp
    await quepasaService.sendMessage({
      chatId: phoneNumber,
      text: botResponse,
    });

    console.log(`✅ Message sent to WhatsApp`);

  } catch (error) {
    console.error('❌ Error processing message with LLM:', error);

    // Fallback: envia mensagem de erro amigável
    await quepasaService.sendMessage({
      chatId: phoneNumber,
      text: 'Desculpe, tive um problema técnico. Pode repetir sua mensagem? 🔧',
    });
  }
}

export const getSessionStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status = await quepasaService.getStatus();
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
    const qrCode = await quepasaService.getQRCode();

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

    const formattedPhone = quepasaService.formatPhoneNumber(lead.telefone);
    await quepasaService.sendMessage({
      chatId: formattedPhone,
      text: message,
    });

    // Salva no histórico
    const conversaAtual = typeof lead.conversaCompleta === 'string' ? lead.conversaCompleta : '';
    await prisma.lead.update({
      where: { id: leadId },
      data: {
        conversaCompleta: conversaAtual +
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

    await quepasaService.sendTemplateMessage(lead.telefone, 'welcome');

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
