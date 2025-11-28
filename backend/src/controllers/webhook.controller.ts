import { Request, Response, NextFunction } from 'express';
import { prisma } from '../database/prisma';

export const handleQuepasaWebhook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const webhookData = req.body;

    // Log webhook for debugging
    console.log('📨 Quepasa Webhook received:', JSON.stringify(webhookData, null, 2));

    // Formato do webhook Quepasa:
    // {
    //   id: "message-id",
    //   timestamp: 1234567890,
    //   source: "5511999999999", // número que enviou
    //   recipient: "5511963256658", // nosso bot
    //   message: {
    //     text: "mensagem do usuário"
    //   },
    //   fromMe: false
    // }

    // Por enquanto apenas loga e confirma recebimento
    // O processamento da mensagem está no whatsapp.controller.ts -> handleWebhook

    res.status(200).json({
      success: true,
      message: 'Webhook received',
    });
  } catch (error) {
    console.error('Webhook error:', error);
    next(error);
  }
};
