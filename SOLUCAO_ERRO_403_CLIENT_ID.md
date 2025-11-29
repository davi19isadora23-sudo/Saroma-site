# 🔧 Solução: Erro 403 e "Client ID not found" no Google OAuth

## ❌ Erros Identificados no Console

1. **`Failed to load resource: the server responded with a status of 403`**
2. **`[GSI_LOGGER]: The given client ID is not found.`**

## 🔍 Causa do Problema

O erro **"The given client ID is not found"** ocorre quando:
- O domínio atual **não está autorizado** no Google Cloud Console
- O Client ID **não corresponde** ao domínio que está sendo usado
- O domínio no Google Cloud Console está **incorreto** (com/sem www, com/sem barra, etc.)

## ✅ Solução Passo a Passo

### Passo 1: Identificar o Domínio Exato

1. Abra o site em produção
2. Olhe a URL na barra de endereço
3. Anote o domínio **exatamente como aparece**:
   - Se for `https://lojassaroma.com.br` → use exatamente isso
   - Se for `https://www.lojassaroma.com.br` → use exatamente isso
   - Se for `https://saroma-m4xy212hg-saromas-projects.vercel.app` → use isso também

### Passo 2: Verificar Google Cloud Console

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Vá em **APIs & Services** > **Credentials**
3. Encontre seu **OAuth 2.0 Client ID**
4. Clique para **editar**

### Passo 3: Configurar Authorized JavaScript Origins

Em **Authorized JavaScript origins**, você **DEVE** adicionar **TODOS** os domínios possíveis:

```
https://lojassaroma.com.br
https://www.lojassaroma.com.br
https://saroma-m4xy212hg-saromas-projects.vercel.app
http://localhost:3000
```

**⚠️ IMPORTANTE:**
- ✅ Use `https://` (não `http://`) para produção
- ✅ **SEM barra no final** (`/`)
- ✅ **SEM caminhos** (`/login`, `/cadastro`, etc.)
- ✅ Adicione **tanto com www quanto sem www** (se aplicável)
- ✅ Adicione também a URL do Vercel se estiver usando

### Passo 4: Verificar Client ID no Vercel

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Vá em **Settings** > **Environment Variables**
3. Verifique se `NEXT_PUBLIC_GOOGLE_CLIENT_ID` existe
4. Verifique se o valor está **exatamente igual** ao do Google Cloud Console
5. Verifique se está marcado para **Production**

### Passo 5: Salvar e Aguardar

1. **Salve** as alterações no Google Cloud Console
2. **Aguarde 2-5 minutos** para as mudanças propagarem
3. **Limpe o cache do navegador** (Ctrl+Shift+Delete)
4. **Teste novamente**

## 🔄 Se Ainda Não Funcionar

### Verificação Adicional 1: Client ID Correto

No console do navegador, você vê:
```
✅ Google Client ID configurado: 379585700405-06tlfc4...
```

1. Copie o Client ID completo do console
2. Vá no Google Cloud Console
3. Verifique se o Client ID é **exatamente o mesmo**
4. Se for diferente, atualize no Vercel e faça redeploy

### Verificação Adicional 2: Domínio no Console

1. Abra o DevTools (F12)
2. Vá na aba **Network**
3. Tente fazer login com Google
4. Procure por requisições que falharam (status 403)
5. Veja qual domínio está sendo usado na requisição
6. Adicione esse domínio **exato** no Google Cloud Console

### Verificação Adicional 3: Múltiplos OAuth Clients

Se você tem **múltiplos OAuth Clients** no Google Cloud Console:
1. Verifique qual está sendo usado
2. Certifique-se de que o Client ID no Vercel corresponde ao Client correto
3. Ou use apenas um Client ID e adicione todos os domínios nele

## 📝 Checklist Final

Antes de testar novamente, verifique:

- [ ] Domínio adicionado em **Authorized JavaScript origins** (Google Cloud Console)
- [ ] Domínio está **exatamente** como aparece na URL (sem barra, sem caminhos)
- [ ] Adicionado **com https://** (não http:// para produção)
- [ ] Adicionado tanto **com www quanto sem www** (se aplicável)
- [ ] Adicionada também a **URL do Vercel** (se estiver usando)
- [ ] Client ID no Vercel é **exatamente igual** ao do Google Cloud Console
- [ ] Variável marcada para **Production** no Vercel
- [ ] **Aguardou 2-5 minutos** após salvar no Google Cloud Console
- [ ] **Limpou o cache** do navegador
- [ ] Fez **redeploy** no Vercel (se necessário)

## 🎯 Exemplo de Configuração Correta

**Google Cloud Console > OAuth 2.0 Client ID > Authorized JavaScript origins:**

```
https://lojassaroma.com.br
https://www.lojassaroma.com.br
https://saroma-m4xy212hg-saromas-projects.vercel.app
http://localhost:3000
```

**Vercel > Environment Variables:**

```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=379585700405-06tlfc4xxxxxxxxxxxx.apps.googleusercontent.com
✅ Production marcado
```

## 💡 Dica

Se você estiver testando em um domínio do Vercel (como `saroma-m4xy212hg-saromas-projects.vercel.app`), você **também precisa** adicionar esse domínio no Google Cloud Console, não apenas o domínio customizado.

## 🆘 Ainda com Problemas?

Se após seguir todos os passos ainda não funcionar:

1. **Copie todas as mensagens do console** (F12 > Console)
2. **Verifique o Network tab** para ver as requisições que falharam
3. **Tire um print** da configuração do Google Cloud Console
4. Compartilhe essas informações para diagnóstico mais detalhado

