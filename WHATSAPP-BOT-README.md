# 🤖 Bot WhatsApp - Solar Leads

## ✅ Implementação Completa

### Arquivos Criados

1. **Backend**
   - `src/services/waha.service.ts` - Serviço de integração com WAHA
   - `src/controllers/whatsapp.controller.ts` - Controladores do bot
   - `src/routes/whatsapp.routes.ts` - Rotas do WhatsApp
   - `.env` - Configurações do WAHA adicionadas

### Funcionalidades Implementadas

#### 1. Integração com WAHA
- ✅ Conexão com API WAHA
- ✅ Gerenciamento de sessões
- ✅ Envio e recebimento de mensagens
- ✅ Formatação automática de números de telefone

#### 2. Fluxo Conversacional Automatizado
```
1. Lead recebe mensagem de boas-vindas
2. Bot pergunta tipo de imóvel (Residencial/Comercial/Rural)
3. Bot pergunta valor da conta de luz
4. Bot pergunta cidade
5. Lead é qualificado automaticamente
6. Vendedor é notificado
```

#### 3. Endpoints da API

**Públicos:**
- `POST /api/whatsapp/webhook` - Recebe mensagens do WAHA

**Protegidos (requer autenticação):**
- `GET /api/whatsapp/status` - Status da sessão WhatsApp
- `GET /api/whatsapp/qrcode` - Obtém QR Code para conectar
- `POST /api/whatsapp/send` - Envia mensagem para um lead
- `POST /api/whatsapp/start-conversation` - Inicia conversa com lead

### Configuração

#### 1. Variáveis de Ambiente (já configuradas)
```bash
WAHA_API_URL=http://localhost:3001
WAHA_API_KEY=318c4a2149d24e0ead9f75bdb49817d8
WAHA_SESSION_NAME=solar-leads-bot
```

#### 2. Iniciar WAHA Container
```bash
docker start waha
# Aguardar ~30 segundos para inicialização completa
```

#### 3. Criar Sessão WhatsApp
```bash
# Método 1: Via API Backend
curl http://localhost:3000/api/whatsapp/qrcode \
  -H "Authorization: Bearer SEU_TOKEN"

# Método 2: Diretamente no WAHA
curl -X POST http://localhost:3001/api/sessions \
  -H "X-Api-Key: 318c4a2149d24e0ead9f75bdb49817d8" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "solar-leads-bot",
    "config": {
      "proxy": null,
      "noweb": {
        "store": {
          "enabled": true,
          "fullSync": false
        }
      }
    }
  }'
```

#### 4. Obter QR Code
```bash
curl http://localhost:3001/api/sessions/solar-leads-bot/auth/qr \
  -H "X-Api-Key: 318c4a2149d24e0ead9f75bdb49817d8"
```

Escaneie o QR Code com o WhatsApp para conectar.

#### 5. Configurar Webhook
```bash
curl -X PUT http://localhost:3001/api/sessions/solar-leads-bot \
  -H "X-Api-Key: 318c4a2149d24e0ead9f75bdb49817d8" \
  -H "Content-Type: application/json" \
  -d '{
    "config": {
      "webhooks": [{
        "url": "http://SEU_IP:3000/api/whatsapp/webhook",
        "events": ["message"]
      }]
    }
  }'
```

### Fluxo de Mensagens

#### Exemplo de Conversa Automatizada

**Bot:** Olá! 👋 Obrigado por seu interesse em energia solar!

**Cliente:** Olá!

**Bot:** Qual o tipo do seu imóvel?
(a) Residencial
(b) Comercial  
(c) Rural

**Cliente:** a

**Bot:** Perfeito! Qual o valor médio da sua conta de luz?
(a) Até R$ 200
(b) De R$ 200 a R$ 500
(c) De R$ 500 a R$ 1000
(d) Acima de R$ 1000

**Cliente:** c

**Bot:** Ótimo! Em qual cidade você mora?

**Cliente:** São Paulo

**Bot:** Perfeito! ✅ Nossa equipe está analisando seu perfil e em breve um consultor entrará em contato!

### Integração com CRM

Todas as conversas são salvas automaticamente:
- Campo `conversaCompleta` do Lead contém histórico completo
- Status do lead é atualizado automaticamente
- Campo `contatadoEm` é preenchido ao iniciar conversa

### Envio Manual de Mensagens

Via Dashboard (implementar interface):
```javascript
// Exemplo de chamada da API
api.sendMessageToLead({
  leadId: 'lead-id',
  message: 'Olá! Conseguiu ver nosso orçamento?'
})
```

### Monitoramento

#### Verificar Status da Sessão
```bash
curl http://localhost:3000/api/whatsapp/status \
  -H "Authorization: Bearer SEU_TOKEN"
```

#### Verificar Leads com Conversas
```sql
SELECT id, nome, telefone, status, conversaCompleta 
FROM "Lead" 
WHERE conversaCompleta IS NOT NULL;
```

### Próximos Passos

1. **Interface no Dashboard**
   - [ ] Página para visualizar conversas
   - [ ] Botão "Iniciar Conversa" nos detalhes do lead
   - [ ] Display do QR Code para conectar WhatsApp
   - [ ] Status de conexão (conectado/desconectado)

2. **Melhorias no Bot**
   - [ ] IA para entender mensagens variadas
   - [ ] Respostas a perguntas frequentes
   - [ ] Envio de imagens/documentos
   - [ ] Agendamento de visitas técnicas

3. **Automações Avançadas**
   - [ ] Envio automático ao receber novo lead
   - [ ] Follow-up após X dias sem resposta
   - [ ] Notificações para vendedores via WhatsApp
   - [ ] Relatórios de conversão

### Troubleshooting

**WAHA não conecta:**
```bash
docker restart waha
docker logs waha
```

**QR Code não aparece:**
```bash
# Verificar se sessão existe
curl http://localhost:3001/api/sessions/solar-leads-bot/status \
  -H "X-Api-Key: 318c4a2149d24e0ead9f75bdb49817d8"
```

**Mensagens não chegam:**
```bash
# Verificar webhook configurado
curl http://localhost:3001/api/sessions/solar-leads-bot \
  -H "X-Api-Key: 318c4a2149d24e0ead9f75bdb49817d8"
```

### Referências

- WAHA Docs: https://waha.devlike.pro/docs/
- WAHA GitHub: https://github.com/devlikeapro/waha

---

**Status:** ✅ Implementação Backend Completa
**Próximo:** Interface Dashboard
