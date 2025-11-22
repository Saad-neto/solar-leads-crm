# Decisões Importantes do Projeto

Este documento registra todas as decisões estratégicas e técnicas importantes do projeto Solar Leads.

## 🎯 Decisões Estratégicas

### 1. Nicho: Energia Solar

**Decisão**: Focar exclusivamente em integradores de energia solar.

**Motivos**:
- Mercado crescendo 40% ao ano no Brasil
- Alto ticket médio (R$ 20-80k por projeto)
- Leads valem R$ 200-500 para integradores
- Cliente direto e objetivo (não enrola)
- Ciclo de vendas bem definido
- Mercado aquecido

**Alternativas Rejeitadas**:
- Landing pages genéricas (muito commoditizado)
- Marcenaria/móveis (considerado mas rejeitado)
- Clínicas odontológicas (ticket menor)
- Sistemas ERP (complexo demais, responsabilidade legal)

### 2. Produto, NÃO Serviço

**Decisão**: Vender o SISTEMA completo, mas NÃO gerenciar tráfego dos clientes.

**O que FORNECEMOS**:
- Plataforma completa (landing + bot + dashboard)
- Setup e configuração inicial
- Meta Pixel instalado e testado
- GA4 configurado com eventos
- Campanha template CRIADA (pausada) no Meta Ads
- 5-8 criativos iniciais
- 3-4 variações de copy
- Audiências sugeridas salvas
- Vídeo de treinamento: "Como rodar sua campanha" (10min Loom)
- Suporte técnico

**O que NÃO FAZEMOS**:
- Gestão diária de campanhas
- Teste de criativos
- Otimização de budget
- Garantia de CPL/resultados
- Gerenciamento contínuo

**Serviço Opcional (R$ 397/mês)**:
- 1 reunião mensal (1h)
- Análise de métricas
- Sugestões de ajustes
- **Cliente executa**, nós apenas orientamos

**Motivos desta decisão**:
- Escala melhor (produto vs serviço)
- Sem responsabilidade por resultados
- Cliente mantém autonomia
- Modelo de negócio mais limpo
- Foco no core: software

### 3. Bootstrap Primeiro, Investidores Depois

**Decisão**: Meses 1-9 sem buscar investimento.

**Estratégia de Capital**:
- Negócio leve (baixo overhead)
- Clientes se auto-financiam (setup fees cobrem custos)
- Aprender antes de escalar
- Negociar de posição de força

**Quando Buscar Investimento (Mês 10+)**:
- Somente após 15-20 clientes pagantes
- Com métricas provadas: CAC, LTV, Churn < 10%
- Levantar R$ 300-500k por 15-20% equity
- Usar para contratar time de vendas e escalar

**Projeções de Receita**:
- **Ano 1**: R$ 180-240k (cenário realista)
- **Mês 12**: R$ 25-35k/mês com 25-30 clientes
- **Ano 2**: R$ 400-600k com 40-50 clientes

### 4. Validação Antes de Escalar

**Plano 30 Dias**:
- **Semana 1**: Build MVP (landing + bot + dashboard)
- **Semana 2**: Conseguir 2-3 clientes teste GRÁTIS
- **Semana 3**: Rodar tráfego teste (R$ 50-100/dia)
- **Semana 4**: Converter 1-2 em clientes PAGANTES

**Meta Mês 1**: 2 clientes pagantes + R$ 2-4k de receita

---

## 💻 Decisões Técnicas

### 5. Stack Tecnológico

**Frontend**:
- **Landing Page**: Lovable (no-code) para MVP inicial
- **Dashboard**: Next.js 14 (App Router) + TypeScript
- **CSS**: Tailwind CSS
- **Componentes**: shadcn/ui
- **Formulários**: React Hook Form + Zod
- **Gráficos**: Recharts
- **Tabelas**: TanStack Table

**Backend**:
- **Runtime**: Node.js
- **Framework**: Express ou Fastify (a definir)
- **Linguagem**: TypeScript
- **ORM**: Prisma (recomendado)
- **Banco**: PostgreSQL 15+
- **Auth**: JWT (24h access, 7d refresh)
- **Validação**: Zod

**Infraestrutura**:
- **Containers**: Docker + Docker Compose
- **Orquestração**: Docker Swarm
- **Gestão**: Portainer
- **Reverse Proxy**: Traefik (SSL automático Let's Encrypt)
- **Deploy**: VPS (Ubuntu 22.04)

**Serviços Externos**:
- **WhatsApp**: WAHA (WhatsApp HTTP API)
- **Analytics**: Google Analytics 4 + Meta Pixel
- **Email (Fase 2)**: Resend ou SendGrid
- **Storage (Opcional)**: AWS S3 ou Cloudflare R2
- **Monitoramento**: Uptime Robot
- **Erros (Opcional)**: Sentry

### 6. Arquitetura Multi-Tenant

**DECISÃO PENDENTE**: Duas opções

**Opção A - Subdomínios (RECOMENDADA)**:
- cliente1.seudominio.com
- cliente2.seudominio.com
- Mais profissional
- Melhor para SEO
- Requires wildcard DNS

**Opção B - Path-based**:
- seudominio.com/cliente1
- seudominio.com/cliente2
- Mais simples
- Um certificado SSL

**Implementação Landing**:
- Single container Next.js
- Rendering dinâmico baseado em hostname
- Busca config do cliente no DB
- OU: Um container por cliente (se necessário)

### 7. Armazenamento de Imagens

**DECISÃO PENDENTE**:
- **Opção A**: AWS S3 / Cloudflare R2 (escalável, recomendado)
- **Opção B**: Local no servidor (mais simples, MVP)

**Recomendação**: S3/R2 desde o início (barato e evita migração futura)

### 8. Notificações por Email

**DECISÃO**: Fase 2

**MVP (Fase 1)**:
- Apenas WhatsApp
- Sem emails

**Fase 2**:
- Adicionar Resend/SendGrid
- Notificar integrador quando lead novo chega
- Relatórios semanais

### 9. Testes Automatizados

**DECISÃO**: Manual no MVP, automatizado depois

**MVP**:
- Testes manuais
- Validação com clientes teste

**Depois do Mês 2**:
- Jest + React Testing Library
- Testes unitários em services críticos
- Testes E2E com Playwright (opcional)

---

## 📊 Decisões de Produto

### 10. Precificação

**Setup**: R$ 1.497 (pagamento único)
- Cobre: Configuração, personalização, treinamento
- Pagamento: PIX ou cartão de crédito

**Mensalidade**: R$ 997/mês
- Inclui: Software, suporte técnico, atualizações, backup
- Pagamento: PIX, cartão ou boleto
- Contrato mensal, cancelamento com 30 dias de aviso

**Consultoria (Opcional)**: +R$ 397/mês
- 1 reunião mensal (1h)
- Análise de métricas
- Sugestões de otimização
- Cliente executa as mudanças

**Trial**:
- 30 dias grátis para 2-3 clientes iniciais (validação)
- Depois: Não oferece trial, cobra desde o início

### 11. Fluxo de Onboarding

**Processo de Setup (2-4 horas)**:
1. Coletar informações do cliente:
   - Logo
   - Cores da marca
   - Número WhatsApp Business
   - Fotos de projetos (3-5)
   - Depoimentos (opcional)

2. Configuração técnica:
   - Criar subdomínio
   - Personalizar landing page
   - Conectar WhatsApp (QR code scan)
   - Configurar Meta Pixel
   - Configurar GA4

3. Configuração de tráfego:
   - Criar campanha Meta Ads (pausada)
   - Subir 5-8 criativos
   - Configurar 3-4 variações de copy
   - Salvar audiências sugeridas
   - Deixar tudo pronto para o cliente ativar

4. Treinamento:
   - Vídeo Loom (10min): Como usar o dashboard
   - Vídeo Loom (10min): Como rodar sua campanha
   - PDF: Checklist de lançamento

### 12. Qualificação de Leads

**Fluxo do Bot WhatsApp (5-7 perguntas)**:

1. Mensagem de boas-vindas
2. Valor da conta de luz (4 opções):
   - Menos de R$ 200
   - R$ 200-500
   - R$ 500-1.000
   - Acima de R$ 1.000

3. Tipo de imóvel:
   - Residencial
   - Comercial
   - Industrial
   - Rural
   - Condomínio

4. Nome completo
5. Cidade
6. Interesse:
   - Quero orçamento agora
   - Apenas informações
   - Quero saber sobre financiamento

7. Se escolheu "orçamento": Pedir foto da conta de luz
8. Confirmação final com economia estimada
9. Notificar integrador

**Critérios de Priorização**:
- Conta > R$ 500 = Alta prioridade
- Interesse em orçamento = Lead quente
- Foto da conta enviada = Extra qualificado

### 13. Status de Leads

**Workflow**:
1. NOVO (lead acabou de chegar)
2. CONTATADO (integrador já falou)
3. QUALIFICADO (confirmou interesse real)
4. ORÇAMENTO_ENVIADO (proposta enviada)
5. NEGOCIACAO (em processo de fechamento)
6. FECHADO (ganhou - instalação agendada)
7. PERDIDO (desistiu - marcar motivo)

---

## 🔒 Decisões de Segurança

### 14. Autenticação

- JWT com refresh token
- Access token: 24h
- Refresh token: 7 dias
- Senhas: bcrypt com 10 rounds
- Rate limiting: 100 req/15min (público), 1000 req/15min (autenticado)

### 15. Privacidade e LGPD

**MVP (Fase 1)**:
- Armazenar dados essenciais
- Sem política de privacidade formal (adicionar depois)

**Fase 2 (Mês 3-4)**:
- Página de privacidade
- Termos de uso
- Consent management
- Opção de exportar dados
- Opção de deletar conta

### 16. Backup e Disaster Recovery

**Backup**:
- Frequência: Diário (3h da manhã)
- Método: pg_dump + gzip
- Storage: Local + upload para S3/Backblaze
- Retenção: 30 dias rolling

**Monitoramento**:
- Uptime Robot: Health check a cada 5min
- Alertas: Email/Telegram em caso de downtime
- Logs: Docker logs + Sentry (opcional)

---

## 📈 Decisões de Crescimento

### 17. Estratégia de Aquisição de Clientes (Integradores)

**Canais Principais**:
1. **Outbound LinkedIn**: Mensagens diretas para donos de integradoras
2. **Grupos Facebook/WhatsApp**: Participar de grupos do setor
3. **Indicação**: Pagar R$ 300-500 por indicação que fechar
4. **Conteúdo**: Posts no LinkedIn sobre casos de sucesso

**Não fazer (pelo menos no início)**:
- Google Ads (CAC alto)
- Instagram Ads (audiência errada)
- Cold email (baixa conversão)

### 18. Métricas de Sucesso

**Acompanhar mensalmente**:
- MRR (Monthly Recurring Revenue)
- Churn rate (meta: < 10%)
- CAC (Customer Acquisition Cost)
- LTV (Lifetime Value)
- LTV/CAC ratio (meta: > 3x)
- NPS (Net Promoter Score)

**Metas por Período**:

**Mês 1**:
- 2 clientes pagantes
- R$ 2-4k receita
- Churn: 0%

**Mês 6**:
- 10-12 clientes
- R$ 10-15k/mês
- Churn: < 10%
- CAC: < R$ 500

**Mês 12**:
- 25-30 clientes
- R$ 25-35k/mês
- Equipe: 2-3 pessoas
- LTV/CAC > 5x

---

## ⚠️ Riscos e Mitigações

### 19. Riscos Técnicos

**WAHA pode ser banido pelo WhatsApp**:
- **Risco**: API não oficial, pode ter ban
- **Mitigação**:
  - Educar clientes sobre boas práticas
  - Oferecer upgrade para API oficial se necessário
  - Ter plano B (Twilio, outras APIs)

**Downtime do servidor**:
- **Risco**: VPS cair, perder leads
- **Mitigação**:
  - Backup diário
  - Monitoramento 24/7
  - SLA 99% uptime
  - Documentação para recovery rápido

**Perda de dados**:
- **Risco**: Banco corrupto, dados perdidos
- **Mitigação**:
  - Backup automático para nuvem
  - Testes de restore mensais
  - Replicação (fase 2)

### 20. Riscos de Negócio

**Churn alto**:
- **Risco**: Clientes cancelando após 2-3 meses
- **Mitigação**:
  - Foco em resultados (leads qualificados)
  - Suporte excelente (resposta rápida)
  - Onboarding bem feito
  - Check-ins mensais
  - Melhorias contínuas

**Concorrência**:
- **Risco**: Outros sistemas similares
- **Mitigação**:
  - Foco em nicho (só solar)
  - Qualidade superior
  - Atendimento diferenciado
  - Não competir em preço

**Pressão de preço**:
- **Risco**: Clientes pedindo desconto
- **Mitigação**:
  - Precificação baseada em valor
  - Mostrar ROI claro
  - Não descontar > 10%
  - Se pedir muito desconto = cliente ruim

---

## 🚀 Próximos Passos Imediatos

1. ✅ Estruturar projeto
2. ✅ Criar documentação
3. 🔄 Inicializar backend com TypeScript + Prisma
4. ⏳ Criar schema do banco
5. ⏳ Setup Docker Compose
6. ⏳ Landing page no Lovable
7. ⏳ Fluxo básico do bot WAHA
8. ⏳ Dashboard MVP (login + listagem)

---

**Última atualização**: 22/11/2024
