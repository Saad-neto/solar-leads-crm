# 📝 Onboarding Cliente: [NOME DO CLIENTE]

**Status:** 🔄 Em Andamento
**Data Início:** [DD/MM/AAAA]
**Data Prevista Conclusão:** [DD/MM/AAAA]
**Responsável:** [SEU NOME]

---

## 📊 Progresso Geral

```
[█████░░░░░] 50% Completo

✅ Fase 1: Coleta de Informações
✅ Fase 2: Criação de Conta
🔄 Fase 3: Landing Page
⏳ Fase 4: WhatsApp
⏳ Fase 5: Tracking
⏳ Fase 6: Campanha Ads
⏳ Fase 7: Treinamento
⏳ Fase 8: Follow-up
```

---

## Fase 1: Coleta de Informações ✅

**Status:** Concluída em [DD/MM HH:MM]

### Dados do Cliente

```yaml
Empresa:
  nome: [NOME DA EMPRESA]
  email: [EMAIL]
  telefone: [TELEFONE]
  whatsapp: [NÚMERO WHATSAPP]
  cidade: [CIDADE/ESTADO]
  site_atual: [URL ou "Não possui"]

Branding:
  cor_primaria: "#______"
  cor_secundaria: "#______"
  logo_url: "[URL DO ARQUIVO]"

Subdomínio:
  escolhido: "[SUBDOMÍNIO]"
  url_final: "https://[SUBDOMÍNIO].seudominio.com"

Conteúdo:
  fotos_projetos:
    - "[URL FOTO 1]"
    - "[URL FOTO 2]"
    - "[URL FOTO 3]"

  depoimentos:
    - nome: "[NOME]"
      cidade: "[CIDADE]"
      texto: "[DEPOIMENTO]"
    - nome: "[NOME]"
      cidade: "[CIDADE]"
      texto: "[DEPOIMENTO]"

  diferenciais:
    - "[DIFERENCIAL 1]"
    - "[DIFERENCIAL 2]"
    - "[DIFERENCIAL 3]"

Meta_Business:
  possui: [SIM/NÃO]
  id_conta: "[ID ou N/A]"
```

### Reunião Kickoff

- **Data/Hora:** [DD/MM HH:MM]
- **Duração:** [XX minutos]
- **Participantes:** [NOMES]
- **Notas:**
  ```
  [ANOTAÇÕES DA REUNIÃO]
  - Ponto 1
  - Ponto 2
  - Dúvidas levantadas
  ```

**✅ Checklist:**
- [x] Formulário preenchido
- [x] Reunião kickoff realizada
- [x] Materiais recebidos (logo, fotos)
- [x] Subdomínio definido

---

## Fase 2: Criação de Conta ✅

**Status:** Concluída em [DD/MM HH:MM]

### Dados da Conta

```yaml
Database:
  id: "[CLIENTE_ID]"
  email: "[EMAIL]"
  senha_temporaria: "[SENHA]"
  subdominio: "[SUBDOMINIO]"
  status: "TRIAL"
  created_at: "[TIMESTAMP]"

Acesso_Dashboard:
  url: "https://dashboard.seudominio.com"
  email: "[EMAIL]"
  senha: "[SENHA TEMPORÁRIA]"

Verificações:
  - [x] Cliente criado no banco
  - [x] Login testado
  - [x] Subdomínio disponível
```

**Comando executado:**
```bash
# [COPIAR COMANDO SQL/PRISMA USADO]
```

---

## Fase 3: Landing Page 🔄

**Status:** Em Andamento
**Início:** [DD/MM HH:MM]
**Previsão:** [DD/MM]

### Projeto Lovable

```yaml
Lovable:
  project_name: "solar-leads-[SUBDOMINIO]"
  project_url: "[URL DO LOVABLE]"

Deployment:
  url_producao: "https://[SUBDOMINIO].seudominio.com"
  status: "[Draft/Published]"

Customizações:
  - [x] Cores aplicadas
  - [x] Logo inserido
  - [ ] Fotos dos projetos
  - [ ] Depoimentos
  - [ ] Textos personalizados
  - [ ] Calculadora funcionando
  - [ ] Formulário integrado
```

### Integrações

**Backend API:**
```javascript
// Cliente ID no código
const CLIENTE_ID = '[CLIENTE_ID]';

// Endpoint
const API_URL = 'https://api.seudominio.com/api/lead';

// Status: [✅ Testado / ⏳ Pendente]
```

**Meta Pixel:**
```javascript
// Pixel ID: [PIXEL_ID]
// Status: [✅ Instalado / ⏳ Pendente]
// Testado com Pixel Helper: [SIM/NÃO]
```

**Google Analytics:**
```javascript
// GA4 ID: [GA4_ID]
// Status: [✅ Instalado / ⏳ Pendente]
// Eventos configurados: [SIM/NÃO]
```

### Testes

```yaml
Testes_Realizados:
  calculadora:
    testado: [SIM/NÃO]
    funcionando: [SIM/NÃO]
    notas: "[OBSERVAÇÕES]"

  formulario:
    testado: [SIM/NÃO]
    lead_criado_banco: [SIM/NÃO]
    redirecionamento_whatsapp: [SIM/NÃO]
    notas: "[OBSERVAÇÕES]"

  tracking:
    meta_pixel: [OK/ERRO]
    ga4: [OK/ERRO]
    utm_params: [OK/ERRO]
    notas: "[OBSERVAÇÕES]"

  performance:
    page_speed_score: [0-100]
    mobile_friendly: [SIM/NÃO]
    https: [SIM/NÃO]
    notas: "[OBSERVAÇÕES]"
```

**✅ Checklist Completo:**
- [ ] Landing criada no Lovable
- [ ] Todas as seções personalizadas
- [ ] API integrada e testada
- [ ] Meta Pixel instalado
- [ ] GA4 configurado
- [ ] Mobile responsivo
- [ ] Performance > 80
- [ ] Deploy realizado
- [ ] DNS configurado
- [ ] HTTPS funcionando

---

## Fase 4: WhatsApp ⏳

**Status:** Não Iniciada
**Previsão:** [DD/MM]

### Configuração WAHA

```yaml
WAHA:
  session_name: "[SUBDOMINIO]"
  numero: "[NÚMERO DO CLIENTE]"
  webhook_url: "https://api.seudominio.com/api/webhooks/waha"

Status_Conexão:
  qr_code_gerado: [SIM/NÃO]
  qr_code_escaneado: [SIM/NÃO]
  status: "[STOPPED/WORKING]"
  conectado_em: "[DD/MM HH:MM]"
```

### Teste do Bot

```yaml
Teste_Fluxo:
  data_teste: "[DD/MM HH:MM]"
  numero_teste: "[NÚMERO USADO]"

  resultados:
    mensagem_inicial: [OK/ERRO]
    pergunta_valor_conta: [OK/ERRO]
    pergunta_tipo_imovel: [OK/ERRO]
    pergunta_nome: [OK/ERRO]
    pergunta_cidade: [OK/ERRO]
    pergunta_interesse: [OK/ERRO]
    mensagem_final: [OK/ERRO]
    lead_criado_banco: [OK/ERRO]

  observações: |
    [ANOTAÇÕES DO TESTE]
```

**✅ Checklist:**
- [ ] Sessão WAHA criada
- [ ] QR Code escaneado
- [ ] Status: WORKING
- [ ] Bot respondendo
- [ ] Fluxo completo testado
- [ ] Leads salvos no banco

---

## Fase 5: Tracking ⏳

**Status:** Não Iniciada
**Previsão:** [DD/MM]

### Meta Pixel

```yaml
Pixel_Config:
  pixel_id: "[ID]"
  criado_em: "[DD/MM]"

Eventos:
  PageView:
    configurado: [SIM/NÃO]
    testado: [SIM/NÃO]

  Lead:
    configurado: [SIM/NÃO]
    testado: [SIM/NÃO]

  CalculadoraUsada:
    configurado: [SIM/NÃO]
    testado: [SIM/NÃO]

Verificação:
  pixel_helper: "[OK/COM AVISOS/ERRO]"
  eventos_manager: "[RECEBENDO/NÃO RECEBENDO]"
```

### Google Analytics 4

```yaml
GA4_Config:
  measurement_id: "[G-XXXXXXXXXX]"
  property_id: "[ID]"
  criado_em: "[DD/MM]"

Eventos:
  generate_lead:
    configurado: [SIM/NÃO]
    marcado_conversao: [SIM/NÃO]

  page_view:
    configurado: [SIM/NÃO]

Verificação:
  debug_view: "[OK/ERRO]"
  realtime: "[RECEBENDO/NÃO RECEBENDO]"
```

### UTM Tracking

```yaml
UTM_Templates:
  criados: [SIM/NÃO]
  planilha_url: "[URL DA PLANILHA]"

  exemplos:
    facebook: "?utm_source=facebook&utm_medium=cpc&utm_campaign=lancamento"
    instagram: "?utm_source=instagram&utm_medium=bio&utm_campaign=organico"
    google: "?utm_source=google&utm_medium=cpc&utm_campaign=pesquisa"
```

**✅ Checklist:**
- [ ] Meta Pixel instalado e testado
- [ ] GA4 configurado
- [ ] Eventos customizados criados
- [ ] Conversões marcadas
- [ ] Planilha UTMs criada
- [ ] Cliente orientado sobre UTMs

---

## Fase 6: Campanha Ads ⏳

**Status:** Não Iniciada
**Previsão:** [DD/MM]

### Meta Ads

```yaml
Campanha:
  nome: "Lead Energia Solar - [CIDADE]"
  id: "[ID DA CAMPANHA]"
  objetivo: "Leads"
  budget_diario: "R$ 100"
  status: "PAUSADA"
  criada_em: "[DD/MM]"

Conjunto_Anuncios:
  nome: "Proprietários Imóveis - [CIDADE]"
  localizacao: "[CIDADE + RAIO]"
  idade: "30-65"
  interesses:
    - "Sustentabilidade"
    - "Energia renovável"
    - "Proprietários de imóveis"

Anuncios_Criados:
  quantidade: [0-8]
  criativos:
    - tipo: "[Imagem/Vídeo/Carrossel]"
      arquivo: "[URL]"
      copy: "[TEXTO DO ANÚNCIO]"
      status: "[ATIVO/PAUSADO]"
```

### Criativos

```yaml
Criativos_Fornecidos:
  imagens: [0-5]
  videos: [0-3]
  carrosseis: [0-2]

  armazenados_em: "[URL PASTA GOOGLE DRIVE]"

  templates_canva:
    - "[URL TEMPLATE 1]"
    - "[URL TEMPLATE 2]"
```

**✅ Checklist:**
- [ ] Conta Business Manager acessada
- [ ] Campanha criada (pausada)
- [ ] 5-8 anúncios configurados
- [ ] Criativos enviados ao cliente
- [ ] Pixel conectado à campanha
- [ ] Cliente orientado como ativar

---

## Fase 7: Treinamento ⏳

**Status:** Não Iniciado
**Previsão:** [DD/MM]

### Vídeos Gravados

```yaml
Videos_Loom:
  dashboard:
    url: "[URL LOOM]"
    duracao: "[XX min]"
    gravado_em: "[DD/MM]"

  gestao_leads:
    url: "[URL LOOM]"
    duracao: "[XX min]"
    gravado_em: "[DD/MM]"

  rodar_trafego:
    url: "[URL LOOM]"
    duracao: "[XX min]"
    gravado_em: "[DD/MM]"
```

### Materiais Enviados

```yaml
Documentos:
  credenciais_acesso:
    enviado: [SIM/NÃO]
    data: "[DD/MM]"

  guia_boas_praticas:
    enviado: [SIM/NÃO]
    url: "[URL PDF]"

  planilha_utms:
    enviado: [SIM/NÃO]
    url: "[URL PLANILHA]"

  checklist_lancamento:
    enviado: [SIM/NÃO]
    url: "[URL]"
```

### Reunião de Treinamento

```yaml
Reunião:
  data: "[DD/MM]"
  hora: "[HH:MM]"
  duracao: "[XX min]"
  link_meet: "[URL]"

  topicos_cobertos:
    - [ ] Acesso ao dashboard
    - [ ] Gestão de leads
    - [ ] Como rodar tráfego
    - [ ] Métricas importantes
    - [ ] Suporte e contato

  duvidas_cliente: |
    [ANOTAR DÚVIDAS E RESPOSTAS]

  nps_treinamento: "[0-10]"
```

**✅ Checklist:**
- [ ] 3 vídeos gravados e enviados
- [ ] PDF de boas práticas criado
- [ ] Reunião de treinamento realizada
- [ ] Dúvidas respondidas
- [ ] Cliente confiante para usar

---

## Fase 8: Follow-up ⏳

**Status:** Não Iniciado

### Day 1 - Confirmação

```yaml
Email_Boas_Vindas:
  enviado: [SIM/NÃO]
  data: "[DD/MM HH:MM]"
  aberto: [SIM/NÃO]
  respondido: [SIM/NÃO]
```

### Day 3 - Check-in

```yaml
WhatsApp_Checkin:
  enviado: [SIM/NÃO]
  data: "[DD/MM HH:MM]"
  respondido: [SIM/NÃO]

  status_cliente:
    campanha_ativada: [SIM/NÃO]
    primeiros_leads: [SIM/NÃO]
    quantidade_leads: [0]
    dificuldades: |
      [ANOTAR]
```

### Day 7 - Primeira Revisão

```yaml
Call_Revisao:
  data: "[DD/MM]"
  hora: "[HH:MM]"
  duracao: "[XX min]"

  metricas_coletadas:
    total_leads: [0]
    cpl_medio: "R$ [0.00]"
    leads_contatados: [0]
    orcamentos_enviados: [0]

  feedback_cliente:
    satisfacao: "[0-10]"
    comentarios: |
      [ANOTAR FEEDBACK]

  ajustes_necessarios: |
    [LISTAR AJUSTES A FAZER]
```

**✅ Checklist:**
- [ ] Email confirmação enviado
- [ ] Check-in day 3 realizado
- [ ] Call revisão day 7 agendada
- [ ] Métricas coletadas
- [ ] Ajustes identificados

---

## 📊 Métricas Finais do Onboarding

```yaml
Timeline:
  data_inicio: "[DD/MM]"
  data_conclusao: "[DD/MM]"
  tempo_total: "[XX horas]"

Qualidade:
  checklist_completo: "[0-100%]"
  nps_cliente: "[0-10]"

Resultados:
  tempo_ate_primeiro_lead: "[XX horas]"
  leads_primeira_semana: [0]
  cpl_primeira_semana: "R$ [0.00]"

Status_Final:
  setup_completo: [SIM/NÃO]
  cliente_satisfeito: [SIM/NÃO]
  sistema_funcionando: [SIM/NÃO]
  pronto_producao: [SIM/NÃO]
```

---

## 📝 Notas e Observações

### Desafios Encontrados

```
[DOCUMENTAR PROBLEMAS E COMO FORAM RESOLVIDOS]

Exemplo:
- Problema: DNS não propagou em 24h
  Solução: Alterado TTL e aguardado 48h
```

### Aprendizados

```
[DOCUMENTAR APRENDIZADOS PARA PRÓXIMOS ONBOARDINGS]

Exemplo:
- Sempre validar se número WhatsApp é Business antes de iniciar
```

### Próximos Passos

```
[LISTAR AÇÕES FUTURAS]

- [ ] Acompanhar primeiros 30 dias
- [ ] Coletar case de sucesso (se aplicável)
- [ ] Solicitar depoimento
- [ ] Pedir indicações
```

---

## 🎯 Status Final

**✅ Onboarding Concluído**
- Data: [DD/MM/AAAA]
- Tempo total: [XX horas]
- NPS: [0-10]
- Cliente em produção: [SIM/NÃO]

**Assinaturas:**
- Responsável Setup: [NOME] - [DD/MM]
- Cliente Aprova: [NOME] - [DD/MM]

---

**Este documento foi iniciado em:** [DD/MM/AAAA HH:MM]
**Última atualização:** [DD/MM/AAAA HH:MM]
**Versão:** 1.0
