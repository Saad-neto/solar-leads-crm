# 🚀 Próximos Passos - Solar Leads

**Atualizado em:** 22/11/2024 20:00

---

## ✅ O QUE JÁ ESTÁ PRONTO

### Backend API (100% Funcional) ✅

**Rodando em:** http://localhost:3000

**Testado e funcionando:**
- ✅ Health check: `GET /health`
- ✅ Login: `POST /api/auth/login`
- ✅ Listar leads: `GET /api/leads`
- ✅ PostgreSQL conectado (porta 5435)
- ✅ 3 leads de teste criados
- ✅ Cliente teste criado (teste@solarlead.com)

**Credenciais de teste:**
```
Email: teste@solarlead.com
Senha: senha123
```

**Como rodar:**
```bash
cd backend
npm run dev
# Server em http://localhost:3000
```

---

## 🎯 PRÓXIMOS PASSOS (Semana 1)

### **Passo 2: Landing Page no Lovable** (2-4 horas) 🔜

**O que fazer:**

1. **Acessar Lovable.dev**
   - Login: https://lovable.dev
   - Criar novo projeto: "solar-leads-teste"

2. **Usar este prompt no Lovable:**

```
Crie uma landing page moderna para captação de leads de energia solar com:

HERO SECTION:
- Headline grande: "Economize Até 95% na Conta de Luz com Energia Solar"
- Subheadline: "Simulação gratuita em 2 minutos. Descubra quanto você pode economizar!"
- Calculadora inline:
  * Input numérico: "Quanto você paga de luz por mês? (R$)"
  * Botão verde grande: "Calcular Minha Economia"
  * Ao calcular: Mostrar "Você pode economizar R$ XXX/mês (90% do valor digitado)"
  * CTA: "Quero Meu Orçamento Grátis" → botão verde, redireciona para #formulario

CORES:
- Primária: #10b981 (verde)
- Secundária: #3b82f6 (azul)
- Fundo: branco e cinza claro

SEÇÃO: COMO FUNCIONA (4 passos em grid)
1. 📱 Simule grátis (ícone celular)
2. 📋 Receba orçamento (ícone documento)
3. ⚡ Instalação em 30 dias (ícone raio)
4. 💰 Comece a economizar (ícone cifrão)

SEÇÃO: BENEFÍCIOS (6 cards em grid 2x3)
1. Economize até 95% na conta de luz
2. Valorize seu imóvel em até 30%
3. Energia limpa e sustentável
4. Retorno do investimento em 4-6 anos
5. Financiamento em até 120 meses
6. Energia excedente vira crédito

SEÇÃO: FAQ (accordion, 6 perguntas)
- Energia solar funciona em dias nublados?
- Quanto tempo dura um sistema?
- Precisa de manutenção?
- Posso financiar?
- Funciona à noite?
- Quanto tempo demora a instalação?

SEÇÃO: FORMULÁRIO (id="formulario")
Título: "Solicite Seu Orçamento Grátis"
Campos:
- Nome completo (required)
- WhatsApp (required, mask: (99) 99999-9999)
- Email (required)
- Cidade (required)
- Valor aproximado da conta (select: Menos de R$200 | R$200-500 | R$500-1.000 | Mais de R$1.000)
Botão: "Solicitar Orçamento" (verde, grande)

FOOTER:
- Logo centralizado
- "© 2024 Solar Energy. Todos os direitos reservados."

REQUISITOS TÉCNICOS:
- Mobile-first, totalmente responsivo
- Usar Tailwind CSS
- Animações suaves (fade-in ao scroll)
- Performance otimizada
- CTAs em destaque (verde #10b981)
```

3. **Integrar com Backend**

Após criar no Lovable, adicionar este código no formulário:

```typescript
// components/LeadForm.tsx
const handleSubmit = async (data: any) => {
  try {
    const response = await fetch('http://localhost:3000/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: data.nome,
        telefone: data.whatsapp.replace(/\D/g, ''), // Remove formatação
        email: data.email,
        cidade: data.cidade,
        valorConta: data.valorConta, // Mapear para enum (ATE_200, etc)
        clienteId: 'cmiaplne2000013cgz37gk2zd', // ID do cliente teste
        origem: 'landing',
        utmSource: new URLSearchParams(window.location.search).get('utm_source'),
        utmMedium: new URLSearchParams(window.location.search).get('utm_medium'),
        utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign'),
      })
    });

    if (response.ok) {
      // Mostrar mensagem de sucesso
      alert('Orçamento solicitado! Em breve entraremos em contato.');
      // Ou redirecionar para WhatsApp
      // window.location.href = 'https://wa.me/5511999999999?text=Oi! Acabei de simular...';
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao enviar. Tente novamente.');
  }
};
```

4. **Testar**
   - Preencher formulário
   - Verificar se lead aparece no banco
   - Testar calculadora
   - Testar em mobile

**Tempo estimado:** 2-4 horas

---

### **Passo 3: Bot WhatsApp (WAHA)** (4-6 horas) 🔜

**O que fazer:**

1. **Rodar WAHA localmente**

```bash
cd /root/projetos/institucional/solar-leads

# Criar docker-compose para WAHA
cat > docker-compose.waha.yml << 'EOF'
version: '3.8'

services:
  waha:
    image: devlikeapro/waha:latest
    container_name: waha-solar-leads
    restart: unless-stopped
    ports:
      - "3003:3000"
    environment:
      WHATSAPP_HOOK_URL: http://host.docker.internal:3000/api/webhooks/waha
      WHATSAPP_HOOK_EVENTS: message
    volumes:
      - waha_data:/app/.wwebjs_auth
      - waha_sessions:/app/.sessions

volumes:
  waha_data:
  waha_sessions:
EOF

docker-compose -f docker-compose.waha.yml up -d
```

2. **Criar arquivo de fluxo do bot**

```bash
cd backend
mkdir -p src/flows
touch src/flows/qualificacao.flow.ts
```

3. **Implementar fluxo de qualificação** (vou criar o arquivo completo depois)

4. **Conectar número WhatsApp de teste**
   - Acessar http://localhost:3003
   - Criar sessão
   - Escanear QR Code

**Tempo estimado:** 4-6 horas

---

### **Passo 4: Dashboard Next.js** (6-8 horas) 🔜

**O que fazer:**

1. **Criar projeto Next.js**

```bash
cd /root/projetos/institucional/solar-leads/dashboard
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir
```

2. **Instalar dependências**

```bash
npm install @tanstack/react-table recharts zustand
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input table
```

3. **Criar páginas principais**
   - `/login` - Tela de login
   - `/dashboard` - Overview (cards + gráfico)
   - `/leads` - Tabela de leads
   - `/leads/[id]` - Detalhes do lead
   - `/config` - Configurações

**Tempo estimado:** 6-8 horas

---

## 📅 CRONOGRAMA SUGERIDO

### **Hoje (22/11):**
- ✅ Backend testado (FEITO)
- 🔜 Começar landing page no Lovable (2-3h)

### **Amanhã (23/11):**
- 🔜 Finalizar landing + integração (1-2h)
- 🔜 Setup WAHA + fluxo bot básico (4-6h)

### **24/11 (Domingo):**
- 🔜 Dashboard Next.js MVP (6-8h)
- 🔜 Testes end-to-end

### **25/11 (Segunda):**
- 🔜 Deploy VPS (ou manter local por enquanto)
- 🔜 Documentar processo
- 🔜 Buscar primeiros clientes teste

---

## 🎯 DECISÕES IMPORTANTES

### Landing Page: Lovable vs Next.js?
**Decisão:** Usar **Lovable** para MVP
- ✅ Mais rápido (2-4h vs 8-12h)
- ✅ Visual profissional sem esforço
- ✅ Já responsivo
- ✅ Fácil de customizar depois
- ❌ Menos controle técnico (mas ok para MVP)

### Onde hospedar Lovable?
**Opções:**
1. Deploy nativo do Lovable (mais fácil)
2. Export e deploy em Vercel/Netlify
3. Export e colocar em VPS

**Recomendação:** Deploy nativo primeiro, migrar depois se necessário

### WAHA: Rodar onde?
**Para testes:** localhost (Docker)
**Para produção:** VPS com Docker Compose

---

## 🚧 BLOQUEIOS / DÚVIDAS

Nenhum bloqueio no momento! Tudo rodando.

---

## 📊 PROGRESSO GERAL

```
Semana 1: [███████░░░] 70% completo

✅ Dia 1-2: Backend estruturado e testado
🔜 Dia 3: Landing page (Lovable)
🔜 Dia 4: Bot WhatsApp (WAHA)
🔜 Dia 5-7: Dashboard Next.js
```

---

## 💡 DICAS

### Para Landing Page:
- Foque em conversão, não perfeição
- Use fotos de alta qualidade (buscar no Unsplash)
- CTAs claros e grandes
- Mobile-first sempre

### Para Bot WhatsApp:
- Comece com fluxo simples (5 perguntas)
- Teste muito antes de lançar
- Tenha fallback se bot falhar

### Para Dashboard:
- Comece com o essencial: login + listagem
- Use componentes shadcn/ui
- Foque em UX limpa

---

## 🔗 LINKS ÚTEIS

**Ferramentas:**
- Lovable: https://lovable.dev
- WAHA Docs: https://waha.devlike.pro
- shadcn/ui: https://ui.shadcn.com
- Unsplash (fotos): https://unsplash.com

**Backend rodando:**
- API: http://localhost:3000
- Health: http://localhost:3000/health
- Prisma Studio: `npm run prisma:studio`

---

## 📝 ANOTAÇÕES

- Backend server rodando em background (PID: ebc805)
- PostgreSQL na porta 5435 (não 5432)
- Cliente teste já criado e funcionando
- 3 leads de exemplo no banco

---

**Próxima ação:** Criar landing page no Lovable (2-4h)

**Meta da semana:** MVP completo funcionando

**Meta do mês:** 2 clientes pagantes + R$ 2-4k receita
