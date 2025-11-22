# Plano de Execução - 30 Dias

Roadmap detalhado para validar o Solar Leads System em 30 dias.

## 🎯 Objetivo

**Ao final de 30 dias:**
- ✅ MVP funcional (landing + bot + dashboard)
- ✅ 2-3 clientes teste usando o sistema
- ✅ Tráfego rodando (R$ 50-100/dia)
- ✅ 1-2 clientes convertidos em PAGANTES
- ✅ R$ 2-4k de receita

---

## 📅 Semana 1 - Construção do MVP

### Dia 1-2: Backend Base

**Objetivos**:
- [x] Estrutura do projeto
- [ ] Setup TypeScript + Express/Fastify
- [ ] Configuração Prisma
- [ ] Schema do banco de dados
- [ ] Docker Compose funcionando
- [ ] PostgreSQL rodando

**Entregas**:
- Servidor rodando em `localhost:3000`
- Banco de dados conectado
- Migrations funcionando
- Health check endpoint: `GET /health`

**Tempo estimado**: 4-6 horas

---

### Dia 3-4: API Core + Auth

**Objetivos**:
- [ ] Sistema de autenticação JWT
- [ ] CRUD de Clientes (integradores)
- [ ] CRUD de Leads
- [ ] Middleware de autenticação
- [ ] Validação com Zod
- [ ] Rate limiting

**Entregas**:
- `POST /api/auth/login` funcionando
- `POST /api/lead` (criar lead - público)
- `GET /api/leads` (listar - protegido)
- `GET /api/leads/:id` (detalhes - protegido)
- `PATCH /api/leads/:id/status` (atualizar - protegido)

**Tempo estimado**: 6-8 horas

---

### Dia 5: Landing Page no Lovable

**Objetivos**:
- [ ] Criar projeto no Lovable
- [ ] Hero com calculadora
- [ ] Seção "Como Funciona"
- [ ] Seção de Benefícios
- [ ] Formulário de contato
- [ ] Botão WhatsApp
- [ ] Integração com API backend

**Entregas**:
- Landing page responsiva
- Calculadora funcionando
- Formulário enviando para API
- Tracking básico (console.log eventos)

**Tempo estimado**: 4-6 horas

---

### Dia 6: Bot WhatsApp - WAHA

**Objetivos**:
- [ ] Setup WAHA via Docker
- [ ] Conectar número de teste
- [ ] Criar fluxo básico de qualificação
- [ ] Webhook recebendo mensagens
- [ ] Armazenar conversas no banco

**Entregas**:
- Bot respondendo no WhatsApp
- Fluxo completo (5-7 perguntas):
  1. Boas-vindas
  2. Valor da conta
  3. Tipo de imóvel
  4. Nome
  5. Cidade
  6. Interesse
  7. (Opcional) Foto da conta
- Dados salvos no PostgreSQL

**Tempo estimado**: 6-8 horas

---

### Dia 7: Dashboard MVP

**Objetivos**:
- [ ] Setup Next.js 14
- [ ] Tela de login
- [ ] Listagem de leads (tabela)
- [ ] Visualizar detalhes do lead
- [ ] Atualizar status
- [ ] Cards de métricas básicas

**Entregas**:
- Login funcionando (JWT)
- Tabela com leads
- Filtros básicos (status, data)
- Cards: Total de leads, Novos hoje, Taxa de conversão
- Responsivo (mobile-friendly)

**Tempo estimado**: 8-10 horas

---

**Total Semana 1**: 28-38 horas de desenvolvimento

**Checkpoint**:
- [ ] Todos os componentes funcionando localmente
- [ ] Documentação de setup atualizada
- [ ] Demo interna funcionando

---

## 📅 Semana 2 - Validação com Clientes Teste

### Dia 8-9: Deploy em VPS

**Objetivos**:
- [ ] Contratar VPS (4GB RAM, 2 CPU)
- [ ] Configurar Docker + Docker Compose
- [ ] Setup Traefik (SSL automático)
- [ ] Deploy dos containers
- [ ] Configurar domínio e subdomínios
- [ ] Testes de produção

**Entregas**:
- API: `https://api.seudominio.com`
- Dashboard: `https://dashboard.seudominio.com`
- WAHA: `https://waha.seudominio.com`
- Landing: `https://cliente1.seudominio.com`
- SSL funcionando (Let's Encrypt)

**Custos**:
- VPS: R$ 40-80/mês
- Domínio: R$ 40/ano

**Tempo estimado**: 4-6 horas

---

### Dia 10-11: Preparação para Clientes

**Objetivos**:
- [ ] Script de onboarding
- [ ] Template de personalização
- [ ] Vídeo de treinamento (Loom 5-10min)
- [ ] Checklist de configuração
- [ ] Material de vendas (pitch deck)

**Entregas**:
- Documento: "Como personalizar a landing"
- Vídeo: "Como usar o dashboard"
- Pitch deck: Apresentação de 5-10 slides
- Contrato/proposta template

**Tempo estimado**: 4-6 horas

---

### Dia 12-14: Prospecção de Clientes Teste

**Objetivo**: Conseguir 2-3 integradores para teste GRATUITO

**Estratégia**:
1. **LinkedIn**: Buscar "integrador solar" + cidade
2. **Grupos Facebook**: "Energia Solar Brasil", grupos regionais
3. **WhatsApp**: Entrar em grupos do setor
4. **Indicação**: Pedir a conhecidos

**Pitch**:
> "Olá [Nome], desenvolvemos um sistema completo de captação de leads para integradores de energia solar. Estamos buscando 2-3 parceiros para validação - você teria **30 dias grátis** em troca de feedback. Interessado?"

**Meta**: 20-30 contatos → 5-10 respostas → 2-3 fechamentos

**Entregas**:
- 2-3 integradores confirmados
- Dados coletados (logo, cores, WhatsApp)
- Landing pages configuradas
- Treinamento realizado

**Tempo estimado**: 6-10 horas (prospecção + onboarding)

---

**Total Semana 2**: 14-22 horas

**Checkpoint**:
- [ ] Sistema em produção e estável
- [ ] 2-3 clientes teste onboardados
- [ ] Feedback inicial coletado

---

## 📅 Semana 3 - Tráfego e Tracking

### Dia 15-16: Setup de Tracking

**Objetivos**:
- [ ] Configurar Meta Pixel em todas as landings
- [ ] Configurar Google Analytics 4
- [ ] Testar eventos (PageView, Lead, Conversion)
- [ ] Configurar Tag Manager (opcional)
- [ ] Criar eventos customizados (calculadora, formulário)

**Entregas**:
- Meta Pixel disparando eventos corretamente
- GA4 recebendo dados
- Debug mode validado
- Documentação de eventos

**Tempo estimado**: 3-4 horas

---

### Dia 17-18: Campanhas Meta Ads

**Para cada cliente teste**:
- [ ] Criar conta Business Manager
- [ ] Configurar Pixel
- [ ] Criar campanha de conversão (Lead)
- [ ] 5-8 criativos (imagens + vídeos)
- [ ] 3-4 variações de copy
- [ ] Audiências:
  - Interesse: Energia solar, sustentabilidade
  - Lookalike (se houver base)
  - Proprietários de imóveis
- [ ] Budget: R$ 50-100/dia
- [ ] Deixar campanha PAUSADA

**Entregas**:
- Campanhas criadas e testadas
- Tutorial em vídeo (Loom 10min): "Como ativar sua campanha"
- Documento: "Boas práticas de tráfego"

**Tempo estimado**: 4-6 horas (2h por cliente)

---

### Dia 19-21: Rodando Tráfego

**Objetivos**:
- [ ] Ativar campanhas dos clientes teste
- [ ] Monitorar performance diária
- [ ] Ajustar criativos/copy se necessário
- [ ] Acompanhar CPL (Custo por Lead)
- [ ] Validar qualificação dos leads

**Métricas esperadas**:
- CPL: R$ 20-50 (meta)
- CTR: > 1%
- Conversão LP: 10-20%
- Leads/dia: 2-5 por cliente

**Budget total**: R$ 150-300 (R$ 50-100/dia x 3 dias x cliente)

**Entregas**:
- Relatório diário de performance
- Primeiros leads qualificados chegando
- Ajustes de campanha documentados

**Tempo estimado**: 2-3 horas/dia de monitoramento

---

**Total Semana 3**: 13-19 horas + R$ 300-600 em tráfego

**Checkpoint**:
- [ ] Tráfego rodando
- [ ] Leads chegando no sistema
- [ ] Bot qualificando automaticamente
- [ ] Clientes recebendo leads

---

## 📅 Semana 4 - Conversão e Otimização

### Dia 22-23: Análise de Resultados

**Objetivos**:
- [ ] Reunião com cada cliente teste
- [ ] Analisar métricas:
  - Quantos leads receberam?
  - Qual a qualidade?
  - Quantos viraram orçamento?
  - Feedback do sistema
- [ ] Identificar melhorias

**Perguntas para o cliente**:
1. Os leads são qualificados?
2. O bot ajudou na qualificação?
3. O dashboard é útil?
4. Falta alguma funcionalidade?
5. Vale R$ 997/mês para você?

**Entregas**:
- Documento de feedback
- Lista de melhorias prioritárias
- Casos de sucesso (se houver)

**Tempo estimado**: 3-4 horas

---

### Dia 24-25: Implementar Melhorias

**Baseado no feedback, ajustar**:
- [ ] Fluxo do bot (se necessário)
- [ ] Perguntas da qualificação
- [ ] Layout da landing
- [ ] Funcionalidades do dashboard
- [ ] Relatórios/métricas

**Entregas**:
- Versão 1.1 do sistema
- Changelog documentado
- Clientes notificados das melhorias

**Tempo estimado**: 6-8 horas

---

### Dia 26-28: Conversão em Pagantes

**Objetivo**: Converter 1-2 clientes teste em PAGANTES

**Estratégia**:
1. **Dia 26**: Enviar proposta
   - "Seu trial de 30 dias termina em X dias"
   - Mostrar resultados (leads, economia de tempo)
   - Oferta: R$ 1.497 setup + R$ 997/mês

2. **Dia 27**: Follow-up
   - Tirar dúvidas
   - Oferecer call se necessário
   - Destacar benefícios

3. **Dia 28**: Fechamento
   - Negociar se necessário (10% desconto max)
   - Enviar contrato
   - Receber pagamento (PIX)

**Script de conversão**:
> "[Nome], nos últimos 30 dias você recebeu [X] leads qualificados através do nosso sistema. Economizou [Y] horas de trabalho manual. O que achou da experiência?
>
> Para continuar, o investimento é R$ 1.497 de setup + R$ 997/mês. Considerando que cada lead vale R$ 200-500 para você, basta fechar 2-3 projetos/mês para pagar o sistema. Faz sentido para você?"

**Entregas**:
- 1-2 clientes pagantes confirmados
- R$ 2-4k de receita
- Contratos assinados
- Pagamentos recebidos

**Tempo estimado**: 4-6 horas (negociação + administrativo)

---

### Dia 29-30: Documentação e Próximos Passos

**Objetivos**:
- [ ] Documentar processo completo de onboarding
- [ ] Criar materiais de vendas finais
- [ ] Planejar Mês 2 (escala)
- [ ] Definir próximas funcionalidades
- [ ] Celebrar conquistas! 🎉

**Entregas**:
- Playbook de onboarding (passo a passo)
- Materiais de vendas prontos
- Roadmap Mês 2
- Post-mortem: O que funcionou? O que não?

**Tempo estimado**: 4-6 horas

---

**Total Semana 4**: 17-24 horas

---

## 📊 Resumo do Mês

**Investimento de tempo**: 72-103 horas (~2.5h/dia)
**Investimento financeiro**:
- VPS: R$ 40-80
- Domínio: R$ 40
- Tráfego teste: R$ 300-600
- **Total**: R$ 380-720

**Retorno esperado**:
- 2 clientes pagantes
- R$ 2.994 setup (2 × R$ 1.497)
- R$ 1.994/mês recorrente (2 × R$ 997)
- **Total Mês 1**: R$ 4.988

**ROI**: 600-1.200% no primeiro mês! 🚀

---

## 🎯 Critérios de Sucesso

**MVP Validado se**:
- [x] Sistema funcionando sem bugs críticos
- [ ] 2+ clientes usando ativamente
- [ ] Leads chegando com qualidade
- [ ] Bot qualificando corretamente
- [ ] 1+ cliente pagante confirmado
- [ ] Feedback positivo dos clientes

**Se NÃO validar**:
- Analisar o que deu errado
- Pivotar se necessário (outro nicho? outro modelo?)
- Não escalar sem validação

**Se validar**:
- **Mês 2**: Foco em vendas (buscar 5-8 novos clientes)
- **Mês 3**: Otimização e escala (10-12 clientes total)
- **Mês 4-6**: Crescimento consistente (20+ clientes)

---

## 📋 Checklist de Validação

### Técnico
- [ ] Sistema estável (99% uptime)
- [ ] Performance OK (< 2s load time)
- [ ] Sem bugs críticos
- [ ] Backup funcionando
- [ ] Monitoramento ativo

### Produto
- [ ] Landing converte > 10%
- [ ] Bot qualifica corretamente
- [ ] Dashboard é intuitivo
- [ ] Tracking funcionando (Pixel + GA4)
- [ ] Leads chegam em tempo real

### Negócio
- [ ] 2+ clientes teste satisfeitos
- [ ] 1+ cliente pagante
- [ ] R$ 2k+ de receita
- [ ] Processo de onboarding documentado
- [ ] Materiais de vendas prontos

### Aprendizados
- [ ] Sabemos o CAC (custo para adquirir cliente)
- [ ] Sabemos o CPL médio (custo por lead)
- [ ] Sabemos tempo de onboarding
- [ ] Sabemos principais objeções
- [ ] Sabemos o que precisa melhorar

---

## 🚀 Próximos Passos (Mês 2)

**Se validado**:
1. **Semana 5-6**: Vendas (prospectar 20-30 integradores)
2. **Semana 7**: Onboarding de 3-5 novos clientes
3. **Semana 8**: Melhorias baseadas em feedback

**Meta Mês 2**: 5-8 clientes totais, R$ 5-8k MRR

**Se não validado**:
1. Analisar dados
2. Ajustar proposta de valor
3. Considerar pivotar
4. Não escalar sem validação

---

**Última atualização**: 22/11/2024

**Próxima revisão**: Final da Semana 1
