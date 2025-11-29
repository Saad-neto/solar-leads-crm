# 🚀 Guia: Configurar Cloudflare Worker API Proxy

Este worker resolve o problema de **Mixed Content** permitindo que o frontend HTTPS acesse o backend HTTP.

## 📋 Passo a Passo

### 1. Acessar Cloudflare Dashboard

1. Acesse: https://dash.cloudflare.com
2. Faça login na sua conta
3. No menu lateral, clique em **"Workers & Pages"**

### 2. Criar Novo Worker

1. Clique no botão **"Create"** ou **"Create application"**
2. Selecione **"Create Worker"**
3. Escolha um nome, exemplo: `solar-leads-api-proxy`
4. Clique em **"Deploy"**

### 3. Editar o Worker

1. Após criar, clique em **"Edit code"** ou **"Quick edit"**
2. **Apague todo** o código que aparece
3. Copie e cole o código do arquivo: `cloudflare-worker-proxy.js`
4. Clique em **"Save and Deploy"**

### 4. Obter a URL do Worker

Após o deploy, você verá a URL do worker, algo como:
```
https://solar-leads-api-proxy.SEU-USUARIO.workers.dev
```

**Copie essa URL!** Você vai usar no próximo passo.

### 5. Testar o Worker

Abra o navegador e teste:
```
https://solar-leads-api-proxy.SEU-USUARIO.workers.dev/health
```

Deve retornar:
```json
{
  "success": true,
  "message": "Solar Leads API is running"
}
```

Se funcionar, está tudo certo! ✅

### 6. Atualizar o Frontend

Após ter a URL do worker, me passe ela e eu atualizo o frontend.

Ou você mesmo pode atualizar:

1. Edite: `frontend/.env`
2. Mude de:
   ```
   VITE_API_URL=http://95.217.158.112:3003
   ```
   Para:
   ```
   VITE_API_URL=https://solar-leads-api-proxy.SEU-USUARIO.workers.dev
   ```

3. Commit e push:
   ```bash
   git add frontend/.env
   git commit -m "feat: Update API URL to use Cloudflare Worker proxy"
   git push
   ```

O Cloudflare Pages vai fazer o redeploy automaticamente!

## ✅ Pronto!

Após o deploy:
- ✅ Dashboard vai funcionar em HTTPS
- ✅ Sem erros de Mixed Content
- ✅ API acessível de qualquer lugar

## 🔒 Segurança (Opcional)

Se quiser restringir o acesso apenas do seu domínio, edite o worker e mude:

```javascript
modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
```

Para:

```javascript
modifiedResponse.headers.set('Access-Control-Allow-Origin', 'https://energiasolar.pages.dev');
```

## 💡 Dica

O worker é **gratuito** para até 100.000 requisições/dia no plano Free do Cloudflare!
