# Solar Leads System

Sistema completo de captação e qualificação de leads para integradores de energia solar.

## 📋 Sobre o Projeto

Plataforma SaaS que fornece:
- **Landing pages personalizadas** com calculadora de economia
- **Bot WhatsApp automatizado** para qualificação de leads via WAHA
- **Dashboard administrativo** para gestão de leads e métricas
- **Tracking completo** com Meta Pixel e Google Analytics 4

## 💰 Modelo de Negócio

- **Setup**: R$ 1.497 (pagamento único)
- **Mensalidade**: R$ 997/mês
- **Consultoria (opcional)**: R$ 397/mês

## 🛠️ Stack Tecnológico

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form + Zod
- Recharts (gráficos)
- TanStack Table

### Backend
- Node.js + Express/Fastify
- TypeScript
- Prisma ORM
- PostgreSQL 15+
- JWT Authentication
- Zod/Joi Validation

### Infraestrutura
- Docker + Docker Compose
- Docker Swarm
- Portainer
- Traefik (reverse proxy + SSL)
- WAHA (WhatsApp HTTP API)

### Serviços Externos
- Meta Pixel
- Google Analytics 4
- Uptime Robot (monitoramento)

## 📁 Estrutura do Projeto

```
solar-leads/
├── docs/                    # Documentação do projeto
├── backend/                 # API Node.js + Express
│   ├── src/
│   │   ├── routes/         # Rotas da API
│   │   ├── controllers/    # Controllers
│   │   ├── services/       # Lógica de negócio
│   │   ├── middlewares/    # Middlewares (auth, validation)
│   │   ├── database/       # Configuração do banco
│   │   └── flows/          # Fluxos do bot WhatsApp
│   └── prisma/             # Schema e migrations
├── landing-page/           # Landing pages Next.js
├── dashboard/              # Dashboard administrativo Next.js
└── docker/                 # Configurações Docker
```

## 🚀 Quick Start

### Pré-requisitos
- Docker & Docker Compose
- Node.js 18+ (para desenvolvimento local)
- PostgreSQL 15+ (ou via Docker)

### Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPO]
cd solar-leads
```

2. Configure as variáveis de ambiente:
```bash
cd docker
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

3. Inicie os containers:
```bash
docker-compose up -d
```

4. Execute as migrations:
```bash
docker exec backend npx prisma migrate deploy
```

5. Acesse:
- Dashboard: https://dashboard.seudominio.com
- API: https://api.seudominio.com
- WAHA: https://waha.seudominio.com

## 📚 Documentação

- [Conversa Completa](./docs/conversa-completa.md) - Conversa original com todas as definições
- [Plano 30 Dias](./docs/plano-30-dias.md) - Roadmap de desenvolvimento e validação
- [Decisões Importantes](./docs/decisoes-importantes.md) - Decisões estratégicas e técnicas

## 🎯 Roadmap

### Semana 1 - MVP
- [ ] **Landing Page**: Criar no Lovable (calculator + form)
- [ ] Backend: API + Auth + CRUD Leads
- [ ] Bot WhatsApp: Fluxo básico de qualificação
- [ ] Dashboard: Login + Listagem de leads

### Semana 2 - Validação
- [ ] Conseguir 2-3 clientes teste (gratuito)
- [ ] Deploy em VPS
- [ ] Configuração completa para clientes teste

### Semana 3 - Tráfego
- [ ] Configurar Meta Pixel e GA4
- [ ] Criar templates de campanhas
- [ ] Rodar tráfego teste (R$ 50-100/dia)

### Semana 4 - Conversão
- [ ] Converter 1-2 clientes teste em pagantes
- [ ] Ajustes baseados em feedback
- [ ] Documentação de onboarding

## 🔐 Segurança

- Autenticação JWT (24h access, 7d refresh)
- Senhas hasheadas com bcrypt (10 rounds)
- Rate limiting em todas as rotas
- HTTPS obrigatório (Let's Encrypt via Traefik)
- Validação de input com Zod
- Proteção contra SQL Injection (Prisma ORM)
- CORS configurado

## 📊 Métricas de Sucesso

### Mês 1
- 2 clientes pagantes
- R$ 2-4k de receita
- Sistema validado

### Mês 6
- 10-12 clientes
- R$ 10-15k/mês recorrente
- Churn < 10%

### Mês 12
- 25-30 clientes
- R$ 25-35k/mês recorrente
- Equipe pequena (2-3 pessoas)

## 🤝 Suporte

- Resposta técnica: 24h (não crítico), 4h (crítico)
- Uptime target: 99%
- Backup diário automático
- Monitoramento 24/7

## 📄 Licença

Proprietary - Todos os direitos reservados

---

**Desenvolvido com** ⚡ **por Claude Code**
