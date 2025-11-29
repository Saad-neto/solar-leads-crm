# 🔧 INSTRUÇÕES: Atualizar Cloudflare Worker

## ❌ Problema Atual
O Worker está retornando **Error 1003: Direct IP access not allowed**
Por isso o dashboard carrega mas não mostra os dados.

## ✅ Solução
Substituir o código do Worker pela versão corrigida.

---

## 📋 PASSO A PASSO

### 1️⃣ Acesse o Cloudflare Dashboard
```
https://dash.cloudflare.com
```

### 2️⃣ Navegue até o Worker
- Clique em **Workers & Pages** (no menu lateral esquerdo)
- Procure por **solar-leads-api** na lista
- Clique no nome **solar-leads-api**

### 3️⃣ Edite o Worker
- No canto superior direito, clique em **Quick edit**
- Uma tela de código vai abrir

### 4️⃣ Substitua o Código
**IMPORTANTE:** Siga exatamente nesta ordem:

1. **Selecione TODO o código antigo**
   - Windows/Linux: `Ctrl + A`
   - Mac: `Cmd + A`

2. **DELETE tudo** (aperte Delete ou Backspace)

3. **Copie o código novo**
   - Abra o arquivo `CODIGO-WORKER-CORRIGIDO.js`
   - Copie TODO o conteúdo (Ctrl+A, depois Ctrl+C)

4. **Cole no editor do Worker**
   - Cole no editor vazio (Ctrl+V)

### 5️⃣ Salve e Publique
- Clique em **Save and deploy** (botão azul no canto superior direito)
- Aguarde a mensagem de confirmação "Success!"

### 6️⃣ Teste o Dashboard
Após salvar, acesse:
```
https://energiasolar.pages.dev/admin-solar-2024x
```

**Você deverá ver:**
- ✅ Dashboard carregando
- ✅ 7 leads na lista
- ✅ Analytics funcionando

---

## 🎯 O Que o Código Corrigido Faz

O código NOVO:
1. ✅ Remove headers do Cloudflare que causavam bloqueio
2. ✅ Adiciona o header `Host` correto
3. ✅ Permite acesso ao backend sem erro 1003
4. ✅ Mantém CORS configurado corretamente

---

## ❓ Problemas?

Se após atualizar ainda tiver problemas:
1. Limpe o cache do navegador (Ctrl+Shift+Delete)
2. Recarregue a página do dashboard (Ctrl+F5)
3. Aguarde 1-2 minutos para o Worker propagar

---

**Última atualização:** 29/11/2025
