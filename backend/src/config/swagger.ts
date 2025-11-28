import swaggerJsdoc from 'swagger-jsdoc';
import { version } from '../../package.json';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Solar Leads API',
      version,
      description: 'API completa para gerenciamento de leads de energia solar',
      contact: {
        name: 'Solar Energy',
        email: 'contato@solarenergy.com.br',
      },
      license: {
        name: 'Proprietary',
        url: 'https://solarenergy.com.br/license',
      },
    },
    servers: [
      {
        url: 'http://95.217.158.112:3003',
        description: 'Servidor de Desenvolvimento',
      },
      {
        url: 'https://api.solarenergy.com.br',
        description: 'Servidor de Produção',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token obtido através do endpoint /api/auth/login',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              example: 'Erro na operação',
            },
            error: {
              type: 'string',
              example: 'Detalhes do erro',
            },
          },
        },
        Lead: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'cmiaplne20000...3cgz37gk2zd',
            },
            nome: {
              type: 'string',
              example: 'João Silva',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'joao@example.com',
            },
            telefone: {
              type: 'string',
              example: '11999999999',
            },
            cidade: {
              type: 'string',
              example: 'São Paulo',
            },
            estado: {
              type: 'string',
              example: 'SP',
            },
            valorConta: {
              type: 'number',
              format: 'float',
              example: 350.5,
            },
            consumoMensal: {
              type: 'number',
              format: 'float',
              example: 450.0,
            },
            tipo: {
              type: 'string',
              enum: ['residencial', 'comercial', 'industrial', 'rural'],
              example: 'residencial',
            },
            origem: {
              type: 'string',
              enum: ['landing_page', 'whatsapp', 'facebook', 'google', 'indicacao', 'outros'],
              example: 'landing_page',
            },
            status: {
              type: 'string',
              enum: ['novo', 'contatado', 'qualificado', 'proposta_enviada', 'ganho', 'perdido'],
              example: 'novo',
            },
            observacoes: {
              type: 'string',
              nullable: true,
              example: 'Cliente interessado em sistema residencial',
            },
            clienteId: {
              type: 'string',
              nullable: true,
              example: 'cmiaplne20000...3cgz37gk2zd',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-11-28T10:30:00.000Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-11-28T10:30:00.000Z',
            },
          },
          required: ['nome', 'email', 'telefone', 'cidade', 'valorConta'],
        },
        CreateLeadRequest: {
          type: 'object',
          properties: {
            nome: {
              type: 'string',
              example: 'João Silva',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'joao@example.com',
            },
            telefone: {
              type: 'string',
              example: '11999999999',
            },
            cidade: {
              type: 'string',
              example: 'São Paulo',
            },
            estado: {
              type: 'string',
              example: 'SP',
            },
            valorConta: {
              type: 'number',
              format: 'float',
              example: 350.5,
            },
            consumoMensal: {
              type: 'number',
              format: 'float',
              example: 450.0,
            },
            tipo: {
              type: 'string',
              enum: ['residencial', 'comercial', 'industrial', 'rural'],
              example: 'residencial',
            },
            origem: {
              type: 'string',
              enum: ['landing_page', 'whatsapp', 'facebook', 'google', 'indicacao', 'outros'],
              example: 'landing_page',
            },
            observacoes: {
              type: 'string',
              example: 'Cliente interessado em sistema residencial',
            },
          },
          required: ['nome', 'email', 'telefone', 'cidade', 'valorConta'],
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'cmiaplne20000...3cgz37gk2zd',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'admin@solarenergy.com',
            },
            role: {
              type: 'string',
              enum: ['ADMIN', 'MANAGER', 'USER'],
              example: 'ADMIN',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        LoginRequest: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'teste@solarlead.com',
            },
            password: {
              type: 'string',
              format: 'password',
              example: 'senha123',
            },
          },
          required: ['email', 'password'],
        },
        LoginResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            token: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
            user: {
              $ref: '#/components/schemas/User',
            },
          },
        },
        PaginatedLeads: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Lead',
              },
            },
            pagination: {
              type: 'object',
              properties: {
                page: {
                  type: 'integer',
                  example: 1,
                },
                pageSize: {
                  type: 'integer',
                  example: 10,
                },
                total: {
                  type: 'integer',
                  example: 50,
                },
                totalPages: {
                  type: 'integer',
                  example: 5,
                },
                hasNext: {
                  type: 'boolean',
                  example: true,
                },
                hasPrev: {
                  type: 'boolean',
                  example: false,
                },
              },
            },
          },
        },
        MetricsOverview: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            data: {
              type: 'object',
              properties: {
                totalLeads: {
                  type: 'integer',
                  example: 150,
                },
                newLeads: {
                  type: 'integer',
                  example: 25,
                },
                conversionRate: {
                  type: 'number',
                  format: 'float',
                  example: 18.5,
                },
                pendingLeads: {
                  type: 'integer',
                  example: 42,
                },
              },
            },
          },
        },
        Cliente: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'cmiaplne20000...3cgz37gk2zd',
            },
            nome: {
              type: 'string',
              example: 'Solar Energy',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'contato@solarenergy.com',
            },
            telefone: {
              type: 'string',
              example: '11999999999',
            },
            logo: {
              type: 'string',
              nullable: true,
              example: 'https://example.com/logo.png',
            },
            cor_primaria: {
              type: 'string',
              example: '#FF6B00',
            },
            cor_secundaria: {
              type: 'string',
              example: '#FFA500',
            },
            whatsapp_numero: {
              type: 'string',
              nullable: true,
              example: '5511999999999',
            },
            whatsapp_token: {
              type: 'string',
              nullable: true,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        UpdateClienteRequest: {
          type: 'object',
          properties: {
            nome: {
              type: 'string',
              example: 'Solar Energy Atualizada',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'novo@solarenergy.com',
            },
            telefone: {
              type: 'string',
              example: '11988888888',
            },
            cor_primaria: {
              type: 'string',
              example: '#00FF00',
            },
            cor_secundaria: {
              type: 'string',
              example: '#00AA00',
            },
          },
        },
        QuepasaWebhookEvent: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'message-id-123',
            },
            timestamp: {
              type: 'integer',
              example: 1701234567,
            },
            source: {
              type: 'string',
              description: 'Número do remetente',
              example: '5511999999999',
            },
            recipient: {
              type: 'string',
              description: 'Número do bot que recebeu',
              example: '5511963256658',
            },
            message: {
              type: 'object',
              properties: {
                text: {
                  type: 'string',
                  example: 'Olá, tenho interesse em energia solar',
                },
              },
            },
            fromMe: {
              type: 'boolean',
              description: 'Se a mensagem foi enviada pelo bot',
              example: false,
            },
          },
        },
        WhatsAppMessage: {
          type: 'object',
          properties: {
            chatId: {
              type: 'string',
              description: 'Número do destinatário (sem @c.us)',
              example: '5511999999999',
            },
            text: {
              type: 'string',
              example: 'Olá! Recebemos seu interesse em energia solar.',
            },
          },
          required: ['chatId', 'text'],
        },
        WhatsAppSessionStatus: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            data: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  example: 'default',
                },
                status: {
                  type: 'string',
                  enum: ['STOPPED', 'STARTING', 'SCAN_QR_CODE', 'WORKING', 'FAILED'],
                  example: 'WORKING',
                },
              },
            },
          },
        },
        WhatsAppQRCode: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            data: {
              type: 'object',
              properties: {
                qr: {
                  type: 'string',
                  example: 'base64_encoded_qr_code...',
                },
              },
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Auth',
        description: 'Endpoints de autenticação e autorização',
      },
      {
        name: 'Leads',
        description: 'Gerenciamento de leads',
      },
      {
        name: 'Metrics',
        description: 'Métricas e análises',
      },
      {
        name: 'Clientes',
        description: 'Gerenciamento de clientes e configurações',
      },
      {
        name: 'Webhooks',
        description: 'Webhooks externos (Quepasa)',
      },
      {
        name: 'WhatsApp',
        description: 'Integração com WhatsApp via Quepasa',
      },
      {
        name: 'Health',
        description: 'Verificação de saúde da API',
      },
    ],
  },
  apis: [
    './src/routes/*.ts',
    './src/controllers/*.ts',
  ],
};

export const swaggerSpec = swaggerJsdoc(options);
