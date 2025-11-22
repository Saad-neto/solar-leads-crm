# 🚀 Solar Leads - Setup Inicial Completo

Projeto estruturado e pronto para desenvolvimento!

## ✅ O que foi criado

### 📚 Documentação
- **README.md** - Visão geral do projeto
- **docs/decisoes-importantes.md** - Todas as decisões estratégicas e técnicas
- **docs/plano-30-dias.md** - Roadmap detalhado de validação
- **conversa-claude-base-projeto.txt** - Conversa original com todas as definições

### 🎯 Backend API (Node.js + TypeScript + Express + Prisma)

#### Estrutura
```
backend/
├── src/
│   ├── controllers/           # ✅ 5 controllers criados
│   │   ├── auth.controller.ts        # Login, refresh token
│   │   ├── lead.controller.ts        # CRUD de leads + export CSV
│   │   ├── cliente.controller.ts     # Gestão de clientes
│   │   ├── metrics.controller.ts     # Métricas e analytics
│   │   └── webhook.controller.ts     # Webhook WAHA (placeholder)
│   │
│   ├── middlewares/           # ✅ 4 middlewares
│   │   ├── auth.ts                   # JWT authentication
│   │   ├── errorHandler.ts           # Error handling global
│   │   ├── rateLimit.ts              # Rate limiting
│   │   └── requestLogger.ts          # Request logging
│   │
│   ├── routes/                # ✅ 5 routers
│   │   ├── auth.routes.ts            # POST /api/auth/login, /refresh
│   │   ├── lead.routes.ts            # CRUD /api/leads
│   │   ├── cliente.routes.ts         # /api/clientes/:id
│   │   ├── metrics.routes.ts         # /api/metrics
│   │   ├── webhook.routes.ts         # /api/webhooks/waha
│   │   └── index.ts                  # Router principal
│   │
│   ├── database/
│   │   └── prisma.ts                 # Prisma client config
│   │
│   ├── services/              # 🔜 TODO: Business logic
│   ├── flows/                 # 🔜 TODO: WhatsApp bot flows
│   └── server.ts              # ✅ Express server
│
├── prisma/
│   ├── schema.prisma          # ✅ Schema completo (Cliente, Lead, Usuario, SessionWAHA)
│   └── seed.ts                # ✅ Seed data (cliente + 3 leads teste)
│
├── Dockerfile                 # ✅ Multi-stage build
├── package.json               # ✅ Todas as dependências
├── tsconfig.json              # ✅ TypeScript config
└── .env.example               # ✅ Environment variables template
```

#### Features Implementadas
- ✅ Autenticação JWT (access + refresh tokens)
- ✅ CRUD completo de Leads
- ✅ Filtros e paginação
- ✅ Export para CSV
- ✅ Métricas do dashboard
- ✅ Validação com Zod
- ✅ Error handling robusto
- ✅ Rate limiting (público e autenticado)
- ✅ Security headers (Helmet)
- ✅ CORS configurado
- ✅ Health check endpoint
- ✅ Request logging
- ✅ Prisma ORM
- ✅ Database seed script

#### Endpoints Criados

**Public:**
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh token
- `POST /api/lead` - Criar lead (landing page)
- `POST /api/webhooks/waha` - Webhook WAHA

**Protected (require JWT):**
- `GET /api/leads` - Listar leads (com filtros)
- `GET /api/leads/:id` - Detalhes do lead
- `GET /api/leads/export` - Export CSV
- `PATCH /api/leads/:id/status` - Atualizar status
- `PATCH /api/leads/:id/notes` - Adicionar notas
- `GET /api/metrics` - Métricas gerais
- `GET /api/metrics/overview` - Cards overview
- `GET /api/metrics/chart` - Dados para gráficos
- `GET /api/clientes/:id` - Dados do cliente
- `PATCH /api/clientes/:id` - Atualizar cliente
- `POST /api/clientes/:id/logo` - Upload logo (TODO)

### 🐳 Docker & Infraestrutura

#### Arquivos
```
docker/
├── docker-compose.yml         # ✅ Multi-service stack
├── .env.example               # ✅ Environment template
└── README.md                  # ✅ Guia completo de deploy
```

#### Serviços Configurados
1. **PostgreSQL 15** - Banco de dados
2. **Backend** - API Node.js
3. **WAHA** - WhatsApp HTTP API
4. **Dashboard** - Next.js (placeholder)
5. **Traefik** - Reverse proxy + SSL automático

#### Features Docker
- ✅ Multi-stage build (otimizado)
- ✅ Health checks
- ✅ Volumes persistentes
- ✅ Networks isoladas
- ✅ Traefik labels (SSL automático)
- ✅ Environment variables
- ✅ Restart policies
- ✅ Docker Compose v3.8

### 📊 Database Schema (Prisma)

#### Models Criados
1. **Cliente** - Integrador de energia solar
   - Auth (email, senha)
   - Customização (logo, cores, subdomínio)
   - Billing (status, planValue, setupPago)
   - WhatsApp integration

2. **Lead** - Lead capturado
   - Dados pessoais (nome, email, telefone, cidade)
   - Qualificação (valorConta, tipoImovel, interesse)
   - Tracking (origem, UTMs)
   - Status workflow
   - Conversa bot (JSON)

3. **Usuario** - Usuário do dashboard
   - Auth (email, senha, role)
   - Vinculado a Cliente

4. **SessionWAHA** - Sessão WhatsApp
   - QR Code
   - Status conexão

#### Enums
- `StatusCliente`: TRIAL, ACTIVE, PAUSED, CANCELLED
- `LeadStatus`: NOVO, CONTATADO, QUALIFICADO, ORCAMENTO_ENVIADO, NEGOCIACAO, FECHADO, PERDIDO
- `Role`: ADMIN, USER

### 🔐 Segurança Implementada
- ✅ JWT tokens (24h access, 7d refresh)
- ✅ Senhas hasheadas (bcrypt, 10 rounds)
- ✅ Rate limiting (100 req/15min público, 1000 autenticado)
- ✅ Helmet (security headers)
- ✅ CORS configurado
- ✅ Input validation (Zod)
- ✅ SQL injection protection (Prisma)
- ✅ Error sanitization (prod vs dev)

## 🎯 Próximos Passos

### Fase 1 - Setup Local (1-2 horas)

1. **Instalar dependências do backend:**
   ```bash
   cd backend
   npm install
   ```

2. **Configurar PostgreSQL local:**
   ```bash
   # Opção A: Via Docker
   docker run --name postgres-solar -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:15-alpine

   # Opção B: Instalar localmente
   # sudo apt install postgresql-15
   ```

3. **Configurar .env:**
   ```bash
   cp .env.example .env
   nano .env
   # Editar DATABASE_URL e JWT secrets
   ```

4. **Rodar migrations:**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   npm run prisma:seed
   ```

5. **Iniciar servidor:**
   ```bash
   npm run dev
   # Server: http://localhost:3000
   # Health: http://localhost:3000/health
   ```

6. **Testar API:**
   ```bash
   # Login
   curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"teste@solarlead.com","password":"senha123"}'

   # Listar leads (use o token recebido)
   curl -X GET http://localhost:3000/api/leads \
     -H "Authorization: Bearer SEU_TOKEN"
   ```

### Fase 2 - Landing Page no Lovable (2-4 horas)

**Ir para Lovable.dev e criar:**
1. Hero com calculadora de economia
2. Seção "Como Funciona" (4 passos)
3. Seção Benefícios (6 cards)
4. Showcase de projetos
5. Depoimentos
6. FAQ (6-8 perguntas)
7. Formulário de contato
8. Integração com API backend (`POST /api/lead`)

**Configurar tracking:**
- Meta Pixel
- Google Analytics 4
- Captura de UTM parameters

### Fase 3 - Bot WhatsApp WAHA (4-6 horas)

1. **Criar fluxo de conversação:**
   - `backend/src/flows/qualificacao.flow.ts`
   - Implementar 7 perguntas
   - Salvar respostas no banco
   - Notificar integrador

2. **Implementar webhook handler:**
   - `backend/src/controllers/webhook.controller.ts`
   - Parse mensagens WAHA
   - Gerenciar estado da conversa
   - Enviar respostas via WAHA API

3. **Testar localmente:**
   - Rodar WAHA via Docker
   - Conectar número teste
   - Simular conversas

### Fase 4 - Dashboard Next.js (6-8 horas)

**Criar estrutura:**
```bash
cd dashboard
npx create-next-app@latest . --typescript --tailwind --app
npm install @tanstack/react-table recharts shadcn/ui
```

**Páginas a criar:**
1. `/login` - Autenticação
2. `/dashboard` - Overview (cards + gráfico)
3. `/leads` - Tabela de leads
4. `/leads/[id]` - Detalhes do lead
5. `/config` - Configurações

### Fase 5 - Deploy VPS (2-3 horas)

1. **Contratar VPS:**
   - 4GB RAM, 2 CPU (mínimo)
   - Ubuntu 22.04
   - Digital Ocean, Vultr, Contabo

2. **Configurar servidor:**
   ```bash
   # Instalar Docker
   curl -fsSL https://get.docker.com | sh

   # Clone repo
   git clone [URL]
   cd solar-leads/docker

   # Configurar
   cp .env.example .env
   nano .env

   # Deploy
   docker-compose up -d

   # Migrations
   docker exec solar-leads-backend npx prisma migrate deploy
   ```

3. **Configurar DNS:**
   - api.seudominio.com → VPS IP
   - dashboard.seudominio.com → VPS IP
   - waha.seudominio.com → VPS IP

## 📝 Credenciais de Teste

Após rodar `npm run prisma:seed`:

- **Email:** teste@solarlead.com
- **Senha:** senha123
- **Subdomínio:** teste
- **Leads:** 3 leads de exemplo criados

## 🐛 Troubleshooting

### Erro de conexão com banco
```bash
# Verificar se PostgreSQL está rodando
docker ps | grep postgres

# Verificar DATABASE_URL
cat backend/.env | grep DATABASE_URL
```

### Prisma errors
```bash
# Regenerar client
cd backend
npm run prisma:generate

# Reset database (CUIDADO: apaga dados!)
npx prisma migrate reset
```

### Docker errors
```bash
# Ver logs
cd docker
docker-compose logs -f backend

# Rebuild
docker-compose build --no-cache backend
docker-compose up -d backend
```

## 📚 Recursos Úteis

- [Documentação Prisma](https://www.prisma.io/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [WAHA Documentation](https://waha.devlike.pro/)
- [Traefik Docs](https://doc.traefik.io/traefik/)
- [Next.js 14](https://nextjs.org/docs)

## 🎉 Status do Projeto

### ✅ Concluído
- [x] Estrutura do projeto
- [x] Documentação completa
- [x] Backend API (Express + TypeScript)
- [x] Database schema (Prisma)
- [x] Autenticação JWT
- [x] CRUD de Leads
- [x] Métricas básicas
- [x] Docker setup
- [x] Git repository

### 🔜 Próximo (Semana 1)
- [ ] Landing page (Lovable)
- [ ] Bot WhatsApp (WAHA)
- [ ] Dashboard (Next.js)
- [ ] Testes locais
- [ ] Deploy VPS

### 🎯 Meta Mês 1
- [ ] 2 clientes teste onboardados
- [ ] Tráfego rodando
- [ ] 1-2 clientes pagantes
- [ ] R$ 2-4k de receita

---

**Projeto iniciado em:** 22/11/2024
**Última atualização:** 22/11/2024

**Comandos úteis:**
```bash
# Backend dev
cd backend && npm run dev

# Ver estrutura
find . -type f -name "*.ts" | grep -v node_modules

# Commits
git log --oneline

# Docker
cd docker && docker-compose up -d
docker-compose logs -f
```

**Pronto para começar o desenvolvimento! 🚀**
