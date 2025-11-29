# 🌐 URLs do Projeto Solar Leads

Documentação de todos os links e endpoints do sistema.

---

## 🎯 URLs Principais

### 📱 **Landing Page (Pública)**
```
https://energiasolar.pages.dev
```
- Para captar leads
- Calculadora de economia
- Formulário de contato
- Totalmente responsivo

### 🔐 **Dashboard (Administrativo)**

**Login (URL SECRETA - Não compartilhar!):**
```
https://energiasolar.pages.dev/admin-solar-2024x
```

⚠️ **ATENÇÃO:** Esta URL é secreta! Não compartilhe publicamente.

**Credenciais de teste:**
- Email: `teste@solarlead.com`
- Senha: `senha123`

**Páginas do Dashboard:**
```
https://energiasolar.pages.dev/dashboard           → Visão geral
https://energiasolar.pages.dev/dashboard/leads     → Listagem de leads
https://energiasolar.pages.dev/dashboard/analytics → Analytics e gráficos
```

---

## 🔧 URLs Técnicas

### **API Backend (via Worker Proxy)**
```
https://solar-leads-api.saadneto.workers.dev
```

**Principais endpoints:**
- `GET /health` → Status da API
- `POST /api/auth/login` → Login
- `GET /api/leads` → Listar leads
- `GET /api/metrics` → Métricas

### **API Backend (Direta - HTTP)**
```
http://95.217.158.112:3003
```
⚠️ Não usar diretamente do frontend (Mixed Content)

### **Documentação API (Swagger)**
```
http://95.217.158.112:3003/api-docs
```

---

## 📊 Cloudflare

### **Worker Proxy**
```
https://solar-leads-api.saadneto.workers.dev
```
- Converte HTTP → HTTPS
- Adiciona CORS headers
- 100.000 req/dia grátis

### **Cloudflare Pages**
```
Dashboard: https://dash.cloudflare.com
Workers: https://dash.cloudflare.com/?to=/:account/workers
Pages: https://dash.cloudflare.com/?to=/:account/pages
```

---

## 🔗 Repositório GitHub

```
https://github.com/Saad-neto/solar-leads-crm
```

**Clone:**
```bash
git clone https://github.com/Saad-neto/solar-leads-crm.git
```

---

## 📝 Variáveis de Ambiente

### **Desenvolvimento (.env)**
```env
VITE_API_URL=http://95.217.158.112:3003
```

### **Produção (.env.production)**
```env
VITE_API_URL=https://solar-leads-api.saadneto.workers.dev
```

---

## ✅ Checklist de Deploy

- [x] Frontend deployado no Cloudflare Pages
- [x] Worker proxy configurado
- [x] Backend rodando no VPS
- [x] SSL/HTTPS funcionando
- [x] CORS configurado
- [ ] Domínio customizado (opcional)

---

## 🚀 Como Atualizar

**Frontend:**
```bash
cd frontend
git add .
git commit -m "feat: sua mensagem"
git push
# Cloudflare Pages faz deploy automático
```

**Backend:**
```bash
cd backend
# Fazer alterações
pm2 restart solar-leads-api
# ou
npm run dev
```

**Worker:**
```
1. Acesse: https://dash.cloudflare.com
2. Workers & Pages → solar-leads-api
3. Editar código
4. Save and Deploy
```

---

## 📞 Suporte

**Problemas com:**
- **Frontend/Dashboard**: Verificar console (F12)
- **API**: Verificar logs do backend
- **Worker**: Verificar logs no Cloudflare
- **Deploy**: Verificar Cloudflare Pages build logs

---

**Última atualização:** 29/11/2025
**Status:** ✅ Produção
