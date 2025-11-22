# 🔄 Processo de Onboarding de Novos Clientes

Guia passo a passo para replicar o setup para cada novo cliente integrador.

## 📋 Checklist Geral

**Tempo estimado total:** 2-4 horas por cliente

- [ ] Coleta de informações (30min)
- [ ] Criação de conta no sistema (10min)
- [ ] Personalização da landing page (1-2h)
- [ ] Configuração do WhatsApp (30min)
- [ ] Setup de tracking (Meta Pixel + GA4) (30min)
- [ ] Criação de campanha template (30min)
- [ ] Treinamento do cliente (30min)
- [ ] Follow-up pós-setup (15min)

---

## Fase 1: Coleta de Informações (30min)

### 1.1 Dados Básicos do Cliente

**Formulário de onboarding** (enviar antes da reunião):

```
INFORMAÇÕES DA EMPRESA
- Nome da empresa: _______________
- Email de acesso: _______________
- Telefone comercial: _______________
- WhatsApp Business: _______________
- Cidade/Estado: _______________
- Site atual (se houver): _______________

BRANDING
- Cores da marca (hex):
  - Cor primária: #______
  - Cor secundária: #______
- Logo (enviar PNG/SVG transparente, mín 512x512px)

CONTEÚDO
- 3-5 Fotos de projetos realizados (alta qualidade)
- 2-3 Depoimentos de clientes (nome, cidade, frase)
- Diferenciais da empresa (máx 3)

SUBDOMÍNIO DESEJADO
- Preferência: _________.seudominio.com
  (Ex: solarcampinas.seudominio.com)

ACESSO META BUSINESS
- Você tem conta Business Manager? Sim / Não
- Se sim, ID da conta: _______________
```

### 1.2 Reunião de Kickoff (30min via Google Meet)

**Agenda:**
1. Boas-vindas (5min)
2. Explicar o processo (5min)
3. Revisar informações coletadas (10min)
4. Tirar dúvidas (5min)
5. Próximos passos (5min)

**Enviar após reunião:**
- Link para envio de materiais (Google Drive folder)
- Cronograma de entrega (2-3 dias úteis)

---

## Fase 2: Criação de Conta no Sistema (10min)

### 2.1 Criar Cliente no Banco de Dados

**Método A: Via API (Recomendado para produção)**

```bash
# Endpoint interno (protegido)
POST /api/admin/clientes

{
  "nome": "Solar Energy Campinas",
  "email": "contato@solarcamp.com",
  "senha": "senha-temporaria-123", # Cliente muda no primeiro login
  "telefone": "5519998887777",
  "subdominio": "solarcampinas",
  "whatsapp": "5519998887777",
  "corPrimaria": "#10b981",
  "corSecundaria": "#3b82f6",
  "status": "TRIAL"
}
```

**Método B: Via Prisma Studio (Desenvolvimento)**

```bash
cd backend
npm run prisma:studio

# Acessar http://localhost:5555
# Criar novo registro em Cliente
```

**Método C: Script de seed customizado**

```typescript
// backend/scripts/criar-cliente.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import readline from 'readline';

const prisma = new PrismaClient();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function criarCliente() {
  const dados = await perguntarDados();

  const senhaHash = await bcrypt.hash(dados.senha, 10);

  const cliente = await prisma.cliente.create({
    data: {
      ...dados,
      senha: senhaHash,
      status: 'TRIAL',
      setupPago: false,
    }
  });

  console.log('✅ Cliente criado:', cliente.email);
  console.log('Subdomínio:', `https://${cliente.subdominio}.seudominio.com`);
}
```

### 2.2 Validar Criação

```bash
# Verificar no banco
docker exec -it solar-leads-postgres psql -U postgres -d solar_leads

SELECT id, nome, email, subdominio, status FROM "Cliente" WHERE email = 'contato@solarcamp.com';
```

---

## Fase 3: Personalização da Landing Page (1-2h)

### 3.1 Criar Projeto no Lovable

**Passo a passo:**

1. **Login no Lovable.dev**
   - Acessar: https://lovable.dev
   - Login com conta da empresa

2. **Criar Novo Projeto**
   - Click "New Project"
   - Nome: `solar-leads-[subdominio]`
   - Template: Blank ou Solar Energy (se houver)

3. **Estrutura da Landing Page**

**Prompt para o Lovable AI:**

```
Crie uma landing page para empresa de energia solar com:

HERO SECTION:
- Headline: "Economize Até 95% na Conta de Luz com Energia Solar"
- Subheadline: "Simulação gratuita em 2 minutos. Descubra quanto você pode economizar!"
- Calculadora inline:
  - Input: "Quanto você paga de luz por mês?"
  - Botão: "Calcular Economia"
  - Resultado: "Você pode economizar R$ X/mês (90% do valor)"
  - CTA: "Quero meu orçamento grátis" (verde, grande)

CORES:
- Primária: [COR DO CLIENTE]
- Secundária: [COR DO CLIENTE]

SEÇÕES:
1. Como Funciona (4 passos: Simule, Receba Orçamento, Instalação, Comece a Economizar)
2. Benefícios (6 cards com ícones)
3. Projetos Realizados (carrossel de fotos)
4. Depoimentos (3 cards)
5. FAQ (6 perguntas)
6. CTA Final

FORMULÁRIO:
- Nome completo
- WhatsApp
- Email
- Cidade
- Valor aproximado da conta
- Botão: "Solicitar Orçamento Grátis"

INTEGRAÇÕES:
- Meta Pixel ID: [ID DO CLIENTE]
- Google Analytics: [GA4 ID]
- API Endpoint: https://api.seudominio.com/api/lead

MOBILE FIRST, responsivo, rápido, CTAs em verde destacado.
```

4. **Customizar Conteúdo**

Substituir placeholders com dados do cliente:
- Logo
- Fotos de projetos
- Depoimentos reais
- FAQ específica da região
- Número do WhatsApp
- Textos personalizados

5. **Configurar Integrações**

**a) Integração com Backend API:**

```javascript
// components/LeadForm.tsx
const handleSubmit = async (data) => {
  try {
    const response = await fetch('https://api.seudominio.com/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: data.nome,
        telefone: data.whatsapp,
        email: data.email,
        cidade: data.cidade,
        clienteId: '[ID_DO_CLIENTE]', // Pegar do banco
        origem: 'landing',
        utmSource: new URLSearchParams(window.location.search).get('utm_source'),
        utmMedium: new URLSearchParams(window.location.search).get('utm_medium'),
        utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign'),
      })
    });

    if (response.ok) {
      // Redirecionar para WhatsApp
      window.location.href = `https://wa.me/55${data.whatsapp}?text=Olá! Acabei de simular na calculadora e quero saber mais sobre energia solar.`;
    }
  } catch (error) {
    console.error('Erro ao enviar lead:', error);
  }
};
```

**b) Meta Pixel:**

```javascript
// app/layout.tsx ou _app.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**Eventos a disparar:**
- `PageView` - Ao carregar a página
- `Lead` - Ao enviar formulário
- `ViewContent` - Ao usar calculadora

**c) Google Analytics 4:**

```javascript
// app/layout.tsx
<Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
<Script id="google-analytics">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}');
  `}
</Script>

// No formulário
gtag('event', 'generate_lead', {
  currency: 'BRL',
  value: 1497, // Valor do setup
  items: [{
    item_name: 'Lead Energia Solar',
    item_category: 'Lead',
  }]
});
```

### 3.2 Deploy da Landing

**Opção A: Lovable Deploy Nativo**
- Click em "Deploy"
- Conectar domínio customizado: `[subdominio].seudominio.com`
- Aguardar DNS propagar (10-30min)

**Opção B: Export e Deploy Manual**
- Export do Lovable
- Deploy em Vercel/Netlify
- Conectar domínio

### 3.3 Teste da Landing

**Checklist de testes:**
- [ ] Calculadora funcionando
- [ ] Formulário enviando para API
- [ ] Lead criado no banco de dados
- [ ] Redirecionamento para WhatsApp OK
- [ ] Meta Pixel disparando eventos (testar com Pixel Helper)
- [ ] GA4 recebendo dados (testar com Debug View)
- [ ] Mobile responsivo
- [ ] Performance OK (PageSpeed > 80)

---

## Fase 4: Configuração do WhatsApp (30min)

### 4.1 Preparação

**Pré-requisitos:**
- Cliente deve ter WhatsApp Business instalado
- Número não pode estar conectado em outro lugar
- Número deve aceitar mensagens de desconhecidos

### 4.2 Conectar no WAHA

**Via Dashboard (futuro):**
1. Cliente faz login no dashboard
2. Vai em Configurações > WhatsApp
3. Click em "Conectar WhatsApp"
4. Escaneia QR Code com o app
5. Aguarda confirmação

**Via API (manual - MVP):**

```bash
# 1. Criar sessão
curl -X POST https://waha.seudominio.com/api/sessions/start \
  -H "Content-Type: application/json" \
  -d '{
    "name": "solarcampinas",
    "config": {
      "webhooks": [{
        "url": "https://api.seudominio.com/api/webhooks/waha",
        "events": ["message"]
      }]
    }
  }'

# 2. Pegar QR Code
curl https://waha.seudominio.com/api/sessions/solarcampinas/qr

# 3. Mostrar QR para cliente escanear

# 4. Verificar status
curl https://waha.seudominio.com/api/sessions/solarcampinas/status
```

### 4.3 Testar Bot

**Enviar mensagem teste:**

1. De outro número, enviar "Oi" para o WhatsApp do cliente
2. Bot deve responder com mensagem de boas-vindas
3. Seguir fluxo completo de qualificação
4. Verificar se lead foi criado no banco

**Fluxo esperado:**
```
Bot: Olá! 👋 Sou o assistente virtual da [NOME DA EMPRESA].
     Vamos calcular quanto você pode economizar com energia solar?

Usuário: Sim

Bot: Ótimo! Quanto você paga de luz por mês?
     1️⃣ Menos de R$ 200
     2️⃣ Entre R$ 200 e R$ 500
     3️⃣ Entre R$ 500 e R$ 1.000
     4️⃣ Mais de R$ 1.000

Usuário: 3

Bot: Entendi! Qual o tipo do seu imóvel?
     1️⃣ Residencial
     2️⃣ Comercial
     3️⃣ Industrial
     4️⃣ Rural
     5️⃣ Condomínio

[... continua até o final do fluxo ...]
```

---

## Fase 5: Setup de Tracking (30min)

### 5.1 Meta Pixel

**1. Criar Pixel no Business Manager:**
- Acessar https://business.facebook.com
- Eventos > Pixels
- Criar novo Pixel
- Copiar ID

**2. Configurar na landing:**
- Adicionar Pixel ID no `.env`
- Testar com Facebook Pixel Helper (extensão Chrome)
- Verificar eventos: PageView, Lead

**3. Criar eventos customizados:**
```javascript
// Quando usar calculadora
fbq('trackCustom', 'CalculadoraUsada', {
  valor_conta: valor
});

// Quando enviar formulário
fbq('track', 'Lead', {
  content_name: 'Formulário Lead',
  value: 1497,
  currency: 'BRL'
});
```

### 5.2 Google Analytics 4

**1. Criar propriedade GA4:**
- Acessar https://analytics.google.com
- Admin > Criar Propriedade
- Tipo: Web
- Copiar ID de medição (G-XXXXXXXXXX)

**2. Configurar eventos:**
```javascript
// Evento de lead
gtag('event', 'generate_lead', {
  value: 1497,
  currency: 'BRL',
  lead_source: 'landing_page'
});
```

**3. Criar conversões:**
- GA4 > Eventos > Marcar como conversão
- Evento: `generate_lead`

### 5.3 UTM Tracking

**Ensinar cliente a usar UTMs:**

```
URL base: https://solarcampinas.seudominio.com

Exemplo Facebook Ads:
https://solarcampinas.seudominio.com
  ?utm_source=facebook
  &utm_medium=cpc
  &utm_campaign=lancamento-campinas
  &utm_content=criativo-1

Exemplo Google Ads:
https://solarcampinas.seudominio.com
  ?utm_source=google
  &utm_medium=cpc
  &utm_campaign=pesquisa-generica

Exemplo Instagram Bio:
https://solarcampinas.seudominio.com
  ?utm_source=instagram
  &utm_medium=bio
```

**Template de planilha de UTMs:**
| Canal | Source | Medium | Campaign | URL Completa |
|-------|--------|--------|----------|--------------|
| Facebook Ads | facebook | cpc | lancamento | ... |
| Instagram Bio | instagram | bio | organico | ... |
| Google Ads | google | cpc | pesquisa | ... |

---

## Fase 6: Criação de Campanha Template (30min)

### 6.1 Meta Ads - Campanha Pausada

**1. Estrutura da campanha:**

```
Conta de Anúncios > Criar Campanha

CAMPANHA:
- Objetivo: Leads
- Nome: "Lead Energia Solar - [CIDADE]"
- Orçamento: R$ 100/dia (sugestão inicial)
- Status: PAUSADA ⏸️

CONJUNTO DE ANÚNCIOS:
- Nome: "Proprietários Imóveis - [CIDADE]"
- Localização: [CIDADE] + 20km raio
- Idade: 30-65 anos
- Interesses:
  - Sustentabilidade
  - Energia renovável
  - Proprietários de imóveis
  - Economia doméstica
- Posicionamentos: Automático
- Orçamento: R$ 100/dia

ANÚNCIOS (criar 5-8 variações):
1. Criativo: Foto instalação + economia
   Copy: "Economize até 95% na conta de luz"

2. Criativo: Antes/depois conta de luz
   Copy: "De R$ 800 para R$ 80/mês"

3. Criativo: Painel solar no telhado
   Copy: "Energia solar: ROI em 4-6 anos"

4. Criativo: Video depoimento
   Copy: "Veja como [Nome] economiza R$ 600/mês"

5. Criativo: Infográfico benefícios
   Copy: "5 motivos para ter energia solar"
```

**2. Copys sugeridos:**

```
COPY 1 - Economia Imediata:
"💡 Quanto você paga de luz por mês?

Se for mais de R$ 200, você está jogando dinheiro fora.

Com energia solar, você pode:
✅ Economizar até 95% na conta de luz
✅ ROI em 4-6 anos
✅ Valorizar seu imóvel em 30%
✅ Financiar em até 120 meses

Faça uma simulação GRÁTIS em 2 minutos:
[LINK]"

COPY 2 - Social Proof:
"Mais de 500 famílias em [CIDADE] já economizam com energia solar. 🌞

A conta de luz de Maria era R$ 850/mês.
Hoje? R$ 85.

Quer saber quanto VOCÊ pode economizar?
Simulação grátis em 2 minutos:
[LINK]"

COPY 3 - Urgência:
"⚠️ A conta de luz só aumenta.

Enquanto você lê isso, sua conta está subindo.

Energia solar:
• Pague a mesma conta pelos próximos 25 anos
• Economize até R$ 10.000/ano
• Valorize seu imóvel

Simule grátis:
[LINK]"
```

**3. Criativos (fornecer ao cliente):**

Criar no Canva (templates):
- 5 imagens (1080x1080)
- 3 carrosséis (10 slides cada)
- 2 vídeos curtos (15-30s)

**Temas:**
- Economia na conta de luz
- Antes/depois de instalação
- Depoimentos de clientes
- Explicação simples ("como funciona")
- Benefícios ambientais

### 6.2 Google Ads - Campanhas Sugeridas (Opcional)

**Pesquisa:**
```
Campanha: Energia Solar [CIDADE]
Palavras-chave:
- energia solar [cidade]
- painel solar [cidade]
- instalação energia solar
- quanto custa energia solar
- economia energia solar

Anúncios:
Título 1: Energia Solar em [Cidade]
Título 2: Economize Até 95% na Luz
Título 3: Simulação Grátis em 2min
Descrição: Parcele em até 120x. ROI em 4-6 anos. Valorize seu imóvel.
```

**Display/YouTube (Retargeting):**
- Visitantes da landing page (não converteram)
- 7 dias de janela
- Criativo: Lembrete da economia calculada

---

## Fase 7: Treinamento do Cliente (30min)

### 7.1 Vídeo de Treinamento (Loom)

**Gravar vídeo cobrindo:**

1. **Acesso ao Dashboard** (5min)
   - Login: https://dashboard.seudominio.com
   - Email e senha (temporária)
   - Tour pela interface

2. **Como Gerenciar Leads** (10min)
   - Ver leads novos
   - Filtrar por status
   - Adicionar notas
   - Atualizar status
   - Exportar CSV

3. **Métricas e Relatórios** (5min)
   - Cards de overview
   - Gráfico de leads por dia
   - Leads por origem (Facebook, Google, etc)
   - Como interpretar os dados

4. **Como Rodar Tráfego** (10min)
   - Acessar Meta Ads Manager
   - Encontrar campanha criada
   - Ativar campanha
   - Definir budget inicial (R$ 50-100/dia)
   - Monitorar primeiros resultados
   - Quando ajustar/pausar

### 7.2 Documento de Boas Práticas

**Criar PDF com:**

```markdown
# Boas Práticas - Solar Leads

## ✅ DOs (Faça)
- Responda leads em até 5 minutos
- Atualize status dos leads diariamente
- Rode tráfego consistentemente (30 dias mínimo)
- Teste diferentes criativos a cada 7 dias
- Monitore CPL (custo por lead) - ideal: R$ 20-50
- Use as notas para registrar conversas
- Exporte relatórios semanalmente

## ❌ DON'Ts (Não Faça)
- Deixar leads sem resposta por mais de 1 dia
- Pausar/religar campanha toda hora
- Mudar muitas coisas ao mesmo tempo
- Desistir antes de 30 dias
- Esquecer de adicionar UTMs nas campanhas
- Ignorar leads com conta < R$ 200

## 📞 Suporte
- Email: suporte@seudominio.com
- WhatsApp: (11) 99999-9999
- Horário: Seg-Sex 9h-18h
```

### 7.3 Checklist de Entrega

**Enviar ao cliente:**
- [ ] Email com credenciais de acesso
- [ ] Vídeo de treinamento (Loom link)
- [ ] PDF de boas práticas
- [ ] Link da landing page
- [ ] Status da campanha Meta Ads (pausada)
- [ ] Confirmação WhatsApp conectado
- [ ] Planilha de UTMs
- [ ] Próximos passos

---

## Fase 8: Follow-up Pós-Setup (15min)

### 8.1 Day 1 - Confirmação

**Email automático:**
```
Assunto: ✅ Seu Sistema Solar Leads está no ar!

Olá [NOME],

Parabéns! Seu sistema está 100% configurado e pronto para captar leads.

🎯 O QUE VOCÊ TEM AGORA:
✅ Landing page: https://[subdominio].seudominio.com
✅ Dashboard: https://dashboard.seudominio.com
✅ WhatsApp conectado: [NÚMERO]
✅ Campanha Meta Ads criada (pausada)

📚 MATERIAIS:
- Vídeo de treinamento: [LINK]
- Guia de boas práticas: [LINK]
- Planilha de UTMs: [LINK]

🚀 PRÓXIMOS PASSOS:
1. Ativar campanha no Meta Ads (budget inicial: R$ 100/dia)
2. Monitorar primeiros leads (2-3 dias)
3. Responder leads em até 5 minutos
4. Agendar call de revisão (7 dias)

Dúvidas? Responda este email ou chame no WhatsApp.

Sucesso!
Equipe Solar Leads
```

### 8.2 Day 3 - Check-in

**Mensagem WhatsApp:**
```
Oi [NOME]! Tudo certo por aí?

Só passando pra ver se:
- Conseguiu ativar a campanha?
- Já chegaram os primeiros leads?
- Alguma dúvida?

Tô aqui pra ajudar! 😊
```

### 8.3 Day 7 - Primeira Revisão

**Call de 30min (Google Meet):**

**Agenda:**
1. Como foram os primeiros leads? (10min)
2. Dificuldades encontradas? (5min)
3. Revisar métricas juntos (10min)
   - Quantos leads chegaram?
   - CPL médio?
   - Quantos você contatou?
   - Algum virou orçamento?
4. Próximos passos (5min)

**Métricas a analisar:**
- Total de leads (meta: 10-20 na primeira semana)
- CPL (meta: R$ 20-50)
- Taxa de resposta do cliente (meta: 100%)
- Leads qualificados (meta: 50%+)

---

## 🔁 Processo Contínuo

### Suporte Mensal

**Incluso no plano R$ 997/mês:**
- Suporte técnico ilimitado (email/WhatsApp)
- Atualizações do sistema
- Backup diário
- Monitoramento 24/7

**Consultoria Opcional (+R$ 397/mês):**
- 1 call mensal (1h)
- Análise de métricas
- Sugestões de otimização
- Novos criativos (sugestões)

### Renovação/Cancelamento

**Renovação automática:**
- Cobrança dia 1 de cada mês
- PIX ou cartão de crédito
- Aviso 7 dias antes

**Cancelamento:**
- Aviso prévio 30 dias
- Export de todos os dados
- Desativar serviços ao final do período pago

---

## 📊 KPIs de Onboarding

**Medir por cliente:**
- ⏱️ Tempo total de setup (meta: < 4h)
- ✅ Checklist 100% completo
- 📞 NPS do onboarding (meta: > 9/10)
- 🚀 Tempo até primeiro lead (meta: < 48h após ativar tráfego)
- 💰 Tempo até primeiro orçamento enviado (meta: < 7 dias)

**Qualidade do setup:**
- [ ] Landing page carregando < 3s
- [ ] Formulário testado e funcionando
- [ ] Bot respondendo corretamente
- [ ] Tracking instalado e validado
- [ ] Campanha configurada corretamente
- [ ] Cliente treinado e satisfeito

---

## 🛠️ Ferramentas Necessárias

**Para cada onboarding:**
- [ ] Acesso ao Lovable.dev
- [ ] Acesso ao servidor (SSH)
- [ ] Acesso ao banco de dados (Prisma Studio)
- [ ] Meta Business Manager
- [ ] Google Analytics
- [ ] Canva (criação de criativos)
- [ ] Loom (gravação de vídeos)
- [ ] Google Meet (reuniões)
- [ ] Notion/Trello (checklist)

---

## 📝 Templates Prontos

**Salvar em:** `/templates/`

1. `formulario-coleta-dados.md`
2. `email-boas-vindas.md`
3. `email-credenciais.md`
4. `email-confirmacao-setup.md`
5. `script-reuniao-kickoff.md`
6. `script-treinamento.md`
7. `copys-meta-ads.md`
8. `checklist-onboarding.md`

---

**Última atualização:** 22/11/2024

**Responsável:** Equipe Solar Leads

**Versão:** 1.0
