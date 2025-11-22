#!/usr/bin/env tsx

/**
 * Script para criar documento de onboarding dinâmico para novo cliente
 *
 * Uso:
 *   npm run onboarding:create
 *   ou
 *   tsx scripts/criar-onboarding.ts
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

interface ClienteOnboarding {
  nome: string;
  email: string;
  telefone: string;
  whatsapp: string;
  cidade: string;
  subdominio: string;
  responsavel: string;
}

async function coletarDados(): Promise<ClienteOnboarding> {
  console.log('\n📝 Iniciando criação de documento de onboarding\n');

  const nome = await question('Nome da empresa: ');
  const email = await question('Email de acesso: ');
  const telefone = await question('Telefone: ');
  const whatsapp = await question('WhatsApp Business: ');
  const cidade = await question('Cidade/Estado: ');
  const subdominio = await question('Subdomínio desejado: ');
  const responsavel = await question('Seu nome (responsável): ');

  return {
    nome,
    email,
    telefone,
    whatsapp,
    cidade,
    subdominio,
    responsavel,
  };
}

function gerarDocumento(dados: ClienteOnboarding): string {
  const dataInicio = new Date();
  const dataConclusao = new Date(dataInicio);
  dataConclusao.setDate(dataConclusao.getDate() + 3); // 3 dias úteis

  const formatarData = (date: Date) => {
    return date.toLocaleDateString('pt-BR');
  };

  const formatarDataHora = (date: Date) => {
    return date.toLocaleString('pt-BR');
  };

  const template = `# 📝 Onboarding Cliente: ${dados.nome}

**Status:** 🔄 Em Andamento
**Data Início:** ${formatarData(dataInicio)}
**Data Prevista Conclusão:** ${formatarData(dataConclusao)}
**Responsável:** ${dados.responsavel}

---

## 📊 Progresso Geral

\`\`\`
[█░░░░░░░░░] 10% Completo

🔄 Fase 1: Coleta de Informações
⏳ Fase 2: Criação de Conta
⏳ Fase 3: Landing Page
⏳ Fase 4: WhatsApp
⏳ Fase 5: Tracking
⏳ Fase 6: Campanha Ads
⏳ Fase 7: Treinamento
⏳ Fase 8: Follow-up
\`\`\`

---

## Fase 1: Coleta de Informações 🔄

**Status:** Em Andamento
**Início:** ${formatarDataHora(dataInicio)}

### Dados do Cliente

\`\`\`yaml
Empresa:
  nome: ${dados.nome}
  email: ${dados.email}
  telefone: ${dados.telefone}
  whatsapp: ${dados.whatsapp}
  cidade: ${dados.cidade}
  site_atual: [PREENCHER]

Branding:
  cor_primaria: "#______"
  cor_secundaria: "#______"
  logo_url: "[PREENCHER]"

Subdomínio:
  escolhido: "${dados.subdominio}"
  url_final: "https://${dados.subdominio}.seudominio.com"

Conteúdo:
  fotos_projetos:
    - "[URL FOTO 1]"
    - "[URL FOTO 2]"
    - "[URL FOTO 3]"

  depoimentos:
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
\`\`\`

### Reunião Kickoff

- **Data/Hora:** [AGENDAR]
- **Duração:** 30 minutos
- **Link Meet:** [CRIAR LINK]
- **Participantes:** ${dados.responsavel}, ${dados.nome}
- **Notas:**
  \`\`\`
  [ANOTAR DURANTE A REUNIÃO]
  \`\`\`

**✅ Checklist:**
- [ ] Formulário preenchido completamente
- [ ] Reunião kickoff agendada
- [ ] Logo recebido (PNG/SVG, 512x512px+)
- [ ] 3-5 fotos de projetos recebidas
- [ ] 2-3 depoimentos coletados
- [ ] Cores da marca definidas
- [ ] Diferenciais da empresa listados
- [ ] Subdomínio validado (disponível)

---

## Fase 2: Criação de Conta ⏳

**Status:** Não Iniciada
**Previsão:** [DD/MM]

### Comandos para Criar Cliente

\`\`\`typescript
// Via Prisma Client
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function criarCliente() {
  const senhaHash = await bcrypt.hash('senha-temp-${Math.random().toString(36).slice(2, 10)}', 10);

  const cliente = await prisma.cliente.create({
    data: {
      nome: '${dados.nome}',
      email: '${dados.email}',
      senha: senhaHash,
      telefone: '${dados.telefone}',
      subdominio: '${dados.subdominio}',
      whatsapp: '${dados.whatsapp}',
      corPrimaria: '#10b981', // Verde padrão
      corSecundaria: '#3b82f6', // Azul padrão
      status: 'TRIAL',
      setupPago: false,
    },
  });

  console.log('Cliente criado:', cliente.id);
  // ANOTAR ID AQUI: ______________
}
\`\`\`

### Dados da Conta

\`\`\`yaml
Database:
  id: "[PREENCHER APÓS CRIAR]"
  email: "${dados.email}"
  senha_temporaria: "[GERAR SENHA SEGURA]"
  subdominio: "${dados.subdominio}"
  status: "TRIAL"
  created_at: "[TIMESTAMP]"

Acesso_Dashboard:
  url: "https://dashboard.seudominio.com"
  email: "${dados.email}"
  senha: "[SENHA TEMPORÁRIA]"
\`\`\`

**✅ Checklist:**
- [ ] Cliente criado no banco de dados
- [ ] ID do cliente anotado
- [ ] Senha temporária gerada
- [ ] Login testado no dashboard
- [ ] Subdomínio validado (único)
- [ ] Email de confirmação enviado

---

## Fase 3: Landing Page ⏳

**Status:** Não Iniciada
**Previsão:** [DD/MM]

### Projeto Lovable

**Link do Projeto:** [CRIAR E ANOTAR]

**Prompt Inicial para Lovable:**
\`\`\`
Crie uma landing page para ${dados.nome}, empresa de energia solar em ${dados.cidade}.

[... usar prompt da documentação ...]

Cliente ID: [ID DO BANCO]
WhatsApp: ${dados.whatsapp}
Subdomínio: ${dados.subdominio}.seudominio.com
\`\`\`

**✅ Checklist:**
- [ ] Projeto criado no Lovable
- [ ] Cores personalizadas aplicadas
- [ ] Logo inserido
- [ ] Fotos dos projetos adicionadas
- [ ] Depoimentos inseridos
- [ ] Calculadora funcionando
- [ ] Formulário integrado com API
- [ ] Meta Pixel instalado
- [ ] GA4 configurado
- [ ] Testado em mobile
- [ ] Performance > 80
- [ ] Deploy realizado
- [ ] HTTPS funcionando

---

## Fase 4: WhatsApp ⏳

**Número:** ${dados.whatsapp}
**Session Name:** ${dados.subdominio}

**✅ Checklist:**
- [ ] Sessão WAHA criada
- [ ] QR Code gerado
- [ ] Cliente escaneou QR Code
- [ ] Status: WORKING
- [ ] Fluxo testado end-to-end
- [ ] Lead de teste criado no banco

---

## Fase 5: Tracking ⏳

### Meta Pixel
- [ ] Pixel criado (ID: _________)
- [ ] Instalado na landing
- [ ] Testado com Pixel Helper
- [ ] Eventos configurados

### Google Analytics 4
- [ ] Propriedade criada (ID: _________)
- [ ] Instalado na landing
- [ ] Eventos configurados
- [ ] Conversões marcadas

### UTMs
- [ ] Planilha criada
- [ ] Templates gerados
- [ ] Cliente orientado

---

## Fase 6: Campanha Ads ⏳

### Meta Ads
- [ ] Conta Business Manager acessada
- [ ] Campanha criada (pausada)
- [ ] Conjunto de anúncios configurado
- [ ] 5-8 anúncios criados
- [ ] Criativos fornecidos
- [ ] Pixel conectado

---

## Fase 7: Treinamento ⏳

- [ ] Vídeo 1: Dashboard (Loom)
- [ ] Vídeo 2: Gestão de Leads (Loom)
- [ ] Vídeo 3: Rodar Tráfego (Loom)
- [ ] PDF Boas Práticas enviado
- [ ] Reunião de treinamento realizada
- [ ] Dúvidas respondidas

---

## Fase 8: Follow-up ⏳

- [ ] Day 1: Email confirmação enviado
- [ ] Day 3: Check-in WhatsApp
- [ ] Day 7: Call de revisão agendada

---

## 📊 Métricas Finais

\`\`\`yaml
Timeline:
  data_inicio: "${formatarData(dataInicio)}"
  data_conclusao: "[PREENCHER]"
  tempo_total: "[XX horas]"

Qualidade:
  checklist_completo: "0%"
  nps_cliente: "[0-10]"

Status_Final:
  setup_completo: NÃO
  cliente_satisfeito: [AVALIAR]
  sistema_funcionando: [AVALIAR]
  pronto_producao: NÃO
\`\`\`

---

## 📝 Notas

\`\`\`
[USAR ESTE ESPAÇO PARA ANOTAÇÕES DURANTE O PROCESSO]
\`\`\`

---

**Documento criado em:** ${formatarDataHora(dataInicio)}
**Última atualização:** ${formatarDataHora(dataInicio)}
**Próxima atualização:** [APÓS CADA FASE]
`;

  return template;
}

async function main() {
  try {
    // Coletar dados
    const dados = await coletarDados();

    // Gerar documento
    const documento = gerarDocumento(dados);

    // Criar diretório se não existir
    const onboardingDir = join(process.cwd(), '..', 'docs', 'onboardings');
    if (!existsSync(onboardingDir)) {
      mkdirSync(onboardingDir, { recursive: true });
    }

    // Salvar arquivo
    const fileName = `onboarding-${dados.subdominio}-${Date.now()}.md`;
    const filePath = join(onboardingDir, fileName);

    writeFileSync(filePath, documento, 'utf-8');

    console.log('\n✅ Documento de onboarding criado com sucesso!');
    console.log(`📁 Arquivo: ${filePath}`);
    console.log(`\n🔗 Links importantes:`);
    console.log(`   Landing: https://${dados.subdominio}.seudominio.com`);
    console.log(`   Dashboard: https://dashboard.seudominio.com`);
    console.log(`   Email: ${dados.email}\n`);

    // Próximos passos
    console.log('📋 Próximos passos:');
    console.log('   1. Agendar reunião kickoff');
    console.log('   2. Enviar formulário de coleta de materiais');
    console.log('   3. Criar cliente no banco de dados');
    console.log('   4. Atualizar o documento conforme progresso\n');

  } catch (error) {
    console.error('❌ Erro ao criar documento:', error);
  } finally {
    rl.close();
  }
}

main();
