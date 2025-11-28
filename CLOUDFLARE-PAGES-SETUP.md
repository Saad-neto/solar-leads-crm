# 🚀 DEPLOY CLOUDFLARE PAGES - SOLAR LEADS

## 📋 **CONFIGURAÇÃO COMPLETA**

### **Repositório GitHub:**
https://github.com/Saad-neto/solar-leads-crm

---

## 🌐 **PROJETO 1: FRONTEND (Landing Page)**

### **Passo 1: Criar Projeto**
1. Acesse: https://dash.cloudflare.com
2. Sidebar → **Pages**
3. Clique em **Create a project**
4. Selecione **Connect to Git**
5. Escolha **GitHub**
6. Autorize o Cloudflare a acessar seus repositórios
7. Selecione: **Saad-neto/solar-leads-crm**

---

### **Passo 2: Configurar Build**

**Project name:**
```
energiasolar
```

**Production branch:**
```
master
```

**Framework preset:**
```
Vite
```

**Build command:**
```
cd frontend && npm install && npm run build
```

**Build output directory:**
```
frontend/dist
```

**Root directory (optional):**
```
(deixe vazio)
```

---

### **Passo 3: Environment Variables**

Clique em **Add variable** e adicione:

**Nome:** `VITE_API_URL`
**Valor:** `http://95.217.158.112:3003`

**Nome:** `NODE_VERSION`
**Valor:** `18`

---

### **Passo 4: Deploy**
1. Clique em **Save and Deploy**
2. Aguarde 2-3 minutos
3. URL gerada: `energiasolar.pages.dev` ✅

---

## 🎯 **PROJETO 2: DASHBOARD**

### **Passo 1: Criar Projeto**
1. Pages → **Create a project**
2. **Connect to Git**
3. Selecione: **Saad-neto/solar-leads-crm** (mesmo repo!)

---

### **Passo 2: Configurar Build**

**Project name:**
```
dashboard-energiasolar
```

**Production branch:**
```
master
```

**Framework preset:**
```
Next.js
```

**Build command:**
```
cd dashboard && npm install && npm run build
```

**Build output directory:**
```
dashboard/.next
```

**Root directory (optional):**
```
(deixe vazio)
```

---

### **Passo 3: Environment Variables**

**Nome:** `NEXT_PUBLIC_API_URL`
**Valor:** `http://95.217.158.112:3003`

**Nome:** `NODE_VERSION`
**Valor:** `18`

---

### **Passo 4: Deploy**
1. **Save and Deploy**
2. Aguarde 3-5 minutos
3. URL gerada: `dashboard-energiasolar.pages.dev` ✅

---

## 🔧 **AJUSTES NO CÓDIGO**

### **Frontend - Atualizar API URL**

O frontend precisa apontar para a API:

**Arquivo:** `frontend/src/main.tsx` ou arquivo de config

Certifique-se que usa:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://95.217.158.112:3003';
```

---

### **Dashboard - Atualizar API URL**

**Arquivo:** `dashboard/src/lib/api.ts`

Deve usar:
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://95.217.158.112:3003';
```

---

## 🌍 **URLs FINAIS**

Após deploy:

| Componente | URL | SSL |
|------------|-----|-----|
| **Frontend** | https://energiasolar.pages.dev | ✅ Grátis |
| **Dashboard** | https://dashboard-energiasolar.pages.dev | ✅ Grátis |
| **API Backend** | http://95.217.158.112:3003 | ⚠️ HTTP |

---

## 🔒 **CORS - IMPORTANTE!**

Como o frontend vai estar em `energiasolar.pages.dev`, precisa atualizar CORS no backend:

**Arquivo:** `backend/.env`

```env
CORS_ORIGIN="http://localhost:3001,http://localhost:3002,http://localhost:5173,http://95.217.158.112:8081,http://95.217.158.112:3003,https://energiasolar.pages.dev,https://dashboard-energiasolar.pages.dev"
```

**Depois reiniciar backend:**
```bash
pm2 restart backend
```

---

## 🚀 **REDEPLOY AUTOMÁTICO**

Sempre que fizer `git push`:
```bash
git add .
git commit -m "feat: update feature"
git push
```

Cloudflare Pages faz deploy **automático**! 🎉

---

## 🎨 **DOMÍNIO PERSONALIZADO (OPCIONAL)**

Se quiser usar domínio próprio depois:

### **Opção 1: Subdomínio Cloudflare**
Se já tem domínio no Cloudflare:
1. Pages → energiasolar → Custom domains
2. Adicionar: `solar.seudominio.com.br`
3. DNS configurado automaticamente ✅

### **Opção 2: Domínio Novo**
1. Registrar: `energiasolarleads.com.br` (~R$ 40/ano)
2. Transferir DNS para Cloudflare
3. Configurar custom domain

---

## 📊 **MONITORAMENTO**

### **Analytics (Grátis no Cloudflare)**
1. Pages → energiasolar → Analytics
2. Veja:
   - Pageviews
   - Unique visitors
   - Top pages
   - Geographic data

### **Web Vitals**
- Cloudflare mede automaticamente
- Core Web Vitals dashboard
- Performance insights

---

## 🐛 **TROUBLESHOOTING**

### **Build falha?**

**Erro comum:** `npm: command not found`
**Solução:** Adicione env var `NODE_VERSION=18`

**Erro:** `Module not found`
**Solução:** Verifique build command tem `npm install`

---

### **API não conecta?**

**Erro:** `CORS policy`
**Solução:** Atualizar `CORS_ORIGIN` no backend

**Erro:** `Network error`
**Solução:** Verificar backend está rodando em 95.217.158.112:3003

---

### **Página 404?**

**Problema:** Next.js pages não carregam
**Solução:** Verificar build output directory está correto

---

## ✅ **CHECKLIST DEPLOY**

### **Antes do Deploy**
- [x] Código no GitHub ✅
- [ ] Variáveis de ambiente configuradas
- [ ] CORS atualizado no backend
- [ ] API_URL correto no frontend/dashboard

### **Durante Deploy**
- [ ] Build command correto
- [ ] Output directory correto
- [ ] Environment variables setadas
- [ ] Deploy iniciado

### **Depois do Deploy**
- [ ] Testar frontend: energiasolar.pages.dev
- [ ] Testar dashboard: dashboard-energiasolar.pages.dev
- [ ] Testar formulário captura lead
- [ ] Testar bot WhatsApp integrado
- [ ] Verificar analytics funcionando

---

## 🎯 **PRÓXIMOS PASSOS**

### **Após Deploy Bem-Sucedido:**

1. **Atualizar CORS** (backend)
2. **Testar integração completa**
3. **Gravar vídeo Loom** com URLs novas
4. **Começar prospecção!**

---

## 💡 **VANTAGENS CLOUDFLARE PAGES**

✅ **SSL Grátis** (HTTPS automático)
✅ **CDN Global** (site rápido no mundo todo)
✅ **Deploy automático** (git push → live)
✅ **Rollback fácil** (voltar versão anterior)
✅ **Analytics grátis**
✅ **Preview deployments** (teste antes de prod)
✅ **Zero custo** (até 500 deploys/mês grátis)

---

## 📱 **URLs COMPARTILHÁVEIS**

Quando mostrar para clientes:

**Landing Page:**
```
https://energiasolar.pages.dev
```

**Dashboard (demo):**
```
https://dashboard-energiasolar.pages.dev
```

**API Docs:**
```
http://95.217.158.112:3003/api-docs
```

---

## 🔐 **SEGURANÇA**

### **Proteção Dashboard (Opcional)**

Se quiser proteger o dashboard com senha:

1. Pages → dashboard-energiasolar → Settings
2. Access Policy → Add a rule
3. Cloudflare Access (grátis até 50 usuários)

---

## 📊 **EXEMPLO DE SUCESSO**

Depois do deploy, suas URLs vão ficar assim:

```
Cliente vê a landing:
https://energiasolar.pages.dev
↓
Preenche formulário
↓
Bot WhatsApp responde
+55 11 96325-6658
↓
Lead aparece no dashboard:
https://dashboard-energiasolar.pages.dev
↓
Vendedor liga e fecha! 💰
```

---

**Data:** 28/11/2025
**Status:** 📝 Aguardando configuração no Cloudflare
**Tempo estimado:** 10-15 minutos

---

🚀 **Bora fazer o deploy!**
