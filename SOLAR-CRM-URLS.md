# ☀️ Solar CRM - URLs e Configuração

## ✅ Status: RODANDO

### 📍 URLs de Acesso

**Frontend Solar CRM:**
- URL Direta: `http://95.217.158.112:8081`
- Porta: 8081

**Backend API:**
- URL Direta: `http://95.217.158.112:3003/api`
- Porta: 3003

---

## 🏗️ Arquitetura Atual

```
Frontend (Vite + React)
├─ Porta: 8081
└─ Conecta em: http://95.217.158.112:3003

Backend API (Express + TypeScript)
├─ Porta: 3003
├─ Rotas: /api/*
└─ Database: PostgreSQL (porta 5435)
```

---

## ⚙️ Configuração do Frontend

**Arquivo:** `/root/projetos/institucional/solar-leads/frontend/.env`

```bash
VITE_API_URL=http://95.217.158.112:3003
```

---

## 🚀 Como Rodar

### 1. Iniciar Backend (porta 3003)

```bash
cd /root/projetos/institucional/solar-leads/backend
npm run dev
```

**Ou em background:**
```bash
cd /root/projetos/institucional/solar-leads/backend
nohup npm run dev > backend.log 2>&1 &
```

### 2. Iniciar Frontend (porta 8081)

```bash
cd /root/projetos/institucional/solar-leads/frontend
npm run dev -- --host 0.0.0.0 --port 8081
```

**Ou em background:**
```bash
cd /root/projetos/institucional/solar-leads/frontend
nohup npm run dev -- --host 0.0.0.0 --port 8081 > frontend.log 2>&1 &
```

### 3. Verificar PostgreSQL

O banco já está rodando via Docker na porta 5435:

```bash
docker ps | grep postgres-solar-leads
```

---

## 🧪 Testando

### 1. Health Check Backend
```bash
curl http://95.217.158.112:3003/health
```

Resposta esperada:
```json
{
  "status": "ok",
  "timestamp": "2025-11-25T...",
  "uptime": 123.45,
  "environment": "development"
}
```

### 2. Testar API (precisa autenticação)
```bash
curl http://95.217.158.112:3003/api/leads
```

Resposta esperada:
```json
{
  "success": false,
  "message": "No token provided"
}
```

### 3. Acessar Frontend
Abra no navegador: `http://95.217.158.112:8081`

---

## 📊 Processos Rodando

Verificar o que está rodando:

```bash
# Frontend (porta 8081)
lsof -i :8081

# Backend (porta 3003)
lsof -i :3003

# PostgreSQL (porta 5435)
docker ps | grep solar-leads
```

Matar processos se necessário:

```bash
# Matar frontend
lsof -ti:8081 | xargs kill -9

# Matar backend
lsof -ti:3003 | xargs kill -9
```

---

## 🔧 Estrutura do Projeto

```
/root/projetos/institucional/solar-leads/
├── frontend/              # React + Vite (porta 8081)
│   ├── src/
│   ├── .env              # Configuração da API
│   └── package.json
│
├── backend/              # Express + TypeScript (porta 3003)
│   ├── src/
│   │   ├── routes/      # Rotas da API
│   │   ├── controllers/
│   │   ├── services/
│   │   └── server.ts
│   ├── prisma/          # ORM e migrations
│   ├── .env             # Configurações (porta, DB, etc)
│   └── package.json
│
└── docker/              # Docker configs
```

---

## 🔐 Configurações Importantes

### Backend (.env)

```bash
# Server
PORT=3003
NODE_ENV=development

# Database
DATABASE_URL="postgresql://user:pass@localhost:5435/solar_leads_db"

# CORS
CORS_ORIGIN=http://95.217.158.112:8081,http://localhost:5173

# Auth (JWT, etc)
JWT_SECRET=sua_chave_secreta
```

### Frontend (.env)

```bash
VITE_API_URL=http://95.217.158.112:3003
```

---

## 🐛 Troubleshooting

### Problema: Frontend não conecta na API

**Verificar:**
1. Backend está rodando? `lsof -i :3003`
2. CORS configurado? `cat backend/.env | grep CORS`
3. URL correta no frontend? `cat frontend/.env | grep API`

**Solução:**
```bash
# Backend deve ter:
CORS_ORIGIN=http://95.217.158.112:8081

# Frontend deve ter:
VITE_API_URL=http://95.217.158.112:3003
```

### Problema: Erro de banco de dados

**Verificar:**
```bash
docker ps | grep postgres
```

**Iniciar se necessário:**
```bash
cd /root/projetos/institucional/solar-leads
docker-compose up -d postgres
```

### Problema: Porta já em uso

**Verificar:**
```bash
lsof -i :8081
lsof -i :3003
```

**Matar processo:**
```bash
lsof -ti:8081 | xargs kill -9
lsof -ti:3003 | xargs kill -9
```

---

## 📝 Notas

- O projeto está rodando **diretamente nas portas** (sem nginx proxy)
- Frontend na 8081, Backend na 3003
- Banco PostgreSQL na 5435
- Para produção, considere usar PM2 ou Docker
- Para HTTPS, configure nginx com certbot

---

## 🎯 Status Atual

- ✅ Frontend rodando (8081)
- ✅ Backend API rodando (3003)
- ✅ PostgreSQL rodando (5435)
- ✅ CORS configurado
- ✅ Conexão funcionando

**Acesse:** `http://95.217.158.112:8081`

---

Última atualização: 25/11/2025
