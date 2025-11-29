# 🔍 Diagnóstico: Erro no Login/Cadastro com Google em Produção

## Problema
O login/cadastro com Google funciona no localhost mas não em produção.

## ✅ Melhorias Implementadas

Adicionei logs detalhados e melhor tratamento de erros para identificar o problema. Agora você verá mensagens mais específicas no console do navegador.

## 🔍 Como Diagnosticar o Problema

### 1. Abra o Console do Navegador (F12)

Acesse a página de login/cadastro em produção e abra o DevTools (F12).

### 2. Verifique as Mensagens no Console

Procure por estas mensagens:

#### ✅ Se estiver funcionando:
- `✅ Google Client ID configurado: xxxxxx...`
- `✅ Script do Google carregado, inicializando OAuth...`
- `✅ Google OAuth inicializado com sucesso`
- `✅ Botão do Google renderizado com sucesso`

#### ❌ Se houver problemas:

**"Google Client ID não configurado!"**
- **Causa:** Variável `NEXT_PUBLIC_GOOGLE_CLIENT_ID` não está configurada no Vercel
- **Solução:** 
  1. Vercel Dashboard > Settings > Environment Variables
  2. Adicione `NEXT_PUBLIC_GOOGLE_CLIENT_ID` com seu Client ID
  3. Marque ✅ Production
  4. Faça um **Redeploy**

**"Erro ao inicializar Google OAuth"**
- **Causa:** Domínio não autorizado no Google Cloud Console
- **Solução:**
  1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
  2. Vá em **APIs & Services** > **Credentials**
  3. Edite seu OAuth 2.0 Client ID
  4. Em **Authorized JavaScript origins**, adicione:
     - `https://seu-dominio.com.br` (sem barra no final)
     - `http://localhost:3000` (desenvolvimento)
  5. Salve e aguarde alguns minutos

**"Erro ao renderizar botão do Google"**
- **Causa:** Problema na inicialização ou domínio não autorizado
- **Solução:** Verifique as configurações acima

**"Token do Google inválido ou expirado"**
- **Causa:** Domínio não autorizado ou Client ID incorreto
- **Solução:** Verifique o Google Cloud Console

### 3. Verifique o Network Tab

1. Abra o DevTools (F12)
2. Vá na aba **Network**
3. Tente fazer login com Google
4. Procure por requisições para `/api/auth/google`
5. Clique na requisição e veja:
   - **Status:** Deve ser 200 (sucesso) ou mostrar o erro específico
   - **Response:** Veja a mensagem de erro retornada pelo servidor

## 📋 Checklist de Verificação

Execute este checklist na ordem:

### ✅ 1. Variável de Ambiente no Vercel
- [ ] Acesse [Vercel Dashboard](https://vercel.com/dashboard)
- [ ] Vá em **Settings** > **Environment Variables**
- [ ] Verifique se existe `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- [ ] Verifique se está marcado para **Production**
- [ ] Verifique se o valor está correto (formato: `xxxxx-xxxxx.apps.googleusercontent.com`)
- [ ] Se não existir ou estiver errado, adicione/edite e faça **Redeploy**

### ✅ 2. Google Cloud Console
- [ ] Acesse [Google Cloud Console](https://console.cloud.google.com/)
- [ ] Vá em **APIs & Services** > **Credentials**
- [ ] Encontre seu **OAuth 2.0 Client ID**
- [ ] Clique para editar
- [ ] Em **Authorized JavaScript origins**, verifique se tem:
  - `https://seu-dominio-exato.com.br` (sem barra, sem www se não usar)
  - `http://localhost:3000`
- [ ] Salve as alterações
- [ ] Aguarde 2-5 minutos para propagar

### ✅ 3. Redeploy no Vercel
- [ ] Após adicionar/editar variáveis de ambiente, faça **Redeploy**
- [ ] Vá em **Deployments**
- [ ] Clique nos 3 pontos (...) do último deployment
- [ ] Selecione **"Redeploy"**
- [ ] Aguarde o deploy terminar

### ✅ 4. Teste em Produção
- [ ] Acesse o site em produção
- [ ] Abra o DevTools (F12) > Console
- [ ] Vá para a página de login/cadastro
- [ ] Verifique as mensagens no console
- [ ] Tente fazer login com Google
- [ ] Veja se aparece algum erro específico

## 🐛 Erros Comuns e Soluções

### Erro: "invalid_client"
**Causa:** Client ID incorreto ou domínio não autorizado
**Solução:** 
1. Verifique se o Client ID no Vercel é exatamente o mesmo do Google Cloud Console
2. Verifique se o domínio está em **Authorized JavaScript origins**

### Erro: "redirect_uri_mismatch"
**Causa:** URL de redirect não autorizada
**Solução:** Adicione a URL em **Authorized redirect URIs** no Google Cloud Console

### Erro: "Token do Google inválido"
**Causa:** Domínio não autorizado ou token expirado
**Solução:** 
1. Verifique **Authorized JavaScript origins** no Google Cloud Console
2. Tente novamente (o token pode ter expirado)

### Botão não aparece
**Causa:** Client ID não configurado ou erro na inicialização
**Solução:**
1. Verifique o console do navegador para ver o erro específico
2. Verifique se `NEXT_PUBLIC_GOOGLE_CLIENT_ID` está configurado
3. Faça redeploy após adicionar a variável

## 📝 Logs Adicionados

Agora o sistema registra logs detalhados em cada etapa:

### No Navegador (Console):
- ✅/❌ Status do Client ID
- ✅/❌ Carregamento do script do Google
- ✅/❌ Inicialização do OAuth
- ✅/❌ Renderização do botão
- ✅/❌ Recebimento do token
- ✅/❌ Envio para o servidor
- ✅/❌ Resposta do servidor

### No Servidor (Logs do Vercel):
- 📥 Recebimento da requisição
- ✅ Validação dos dados
- 🔍 Verificação do token com Google
- ✅/❌ Resultado da autenticação

## 🔄 Próximos Passos

1. **Faça o deploy** das melhorias
2. **Teste em produção** e verifique o console
3. **Compartilhe os logs** do console se ainda houver erro
4. **Verifique o Google Cloud Console** se o domínio está autorizado

## 💡 Dica

Se ainda não funcionar após seguir todos os passos:
1. Copie todas as mensagens do console (F12 > Console)
2. Verifique o Network tab para ver a resposta do servidor
3. Verifique os logs do Vercel (Deployments > Functions)
4. Compartilhe essas informações para diagnóstico mais detalhado

