'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react'

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void
          prompt: () => void
          renderButton: (element: HTMLElement, config: any) => void
        }
      }
    }
  }
}

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(null)
  const [lockedUntil, setLockedUntil] = useState<number | null>(null)
  const { loginWithGoogle } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setAttemptsRemaining(null)
    setLockedUntil(null)

    const result = await login(email, password)

    if (result.success) {
      router.push('/')
      router.refresh()
    } else {
      setError(result.error || 'Erro ao fazer login')
      // Verificar se há informações sobre tentativas
      if (result.error?.includes('bloqueado')) {
        const minutesMatch = result.error.match(/(\d+)\s*minuto/)
        if (minutesMatch) {
          setLockedUntil(parseInt(minutesMatch[1]))
        }
      }
    }

    setLoading(false)
  }

  // Carregar script do Google e renderizar botão
  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    
    // Debug: Log do Client ID (apenas os primeiros caracteres por segurança)
    if (clientId) {
      console.log('✅ Google Client ID configurado:', clientId.substring(0, 20) + '...')
    } else {
      console.error('❌ Google Client ID não configurado!')
      console.error('Configure NEXT_PUBLIC_GOOGLE_CLIENT_ID nas variáveis de ambiente do Vercel')
      console.error('Depois faça um redeploy do projeto')
      return
    }
    
    if (!clientId.includes('.apps.googleusercontent.com')) {
      console.error('❌ Google Client ID inválido!')
      console.error('O Client ID deve ter o formato: xxxxxx-xxxxx.apps.googleusercontent.com')
      console.error('Client ID atual:', clientId)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => {
      if (window.google) {
        try {
          console.log('✅ Script do Google carregado, inicializando OAuth...')
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleGoogleSignIn,
          })
          console.log('✅ Google OAuth inicializado com sucesso')
        } catch (error: any) {
          console.error('❌ Erro ao inicializar Google OAuth:', error)
          const errorMessage = error?.message || 'Erro desconhecido'
          setError(`Erro ao configurar login com Google: ${errorMessage}. Verifique se o domínio está autorizado no Google Cloud Console.`)
          return
        }

        // Renderizar botão do Google
        const buttonContainer = document.getElementById('google-signin-button')
        if (buttonContainer) {
          try {
            window.google.accounts.id.renderButton(buttonContainer, {
              type: 'standard',
              theme: 'outline',
              size: 'large',
              text: 'signin_with',
              width: '100%',
            })
            console.log('✅ Botão do Google renderizado com sucesso')
          } catch (error: any) {
            console.error('❌ Erro ao renderizar botão do Google:', error)
            setError('Erro ao renderizar botão do Google. Verifique as configurações.')
          }
        } else {
          console.error('❌ Container do botão Google não encontrado')
        }
      } else {
        console.error('❌ window.google não está disponível')
        setError('Erro ao carregar biblioteca do Google. Verifique sua conexão.')
      }
    }
    
    script.onerror = () => {
      console.error('❌ Erro ao carregar script do Google')
      setError('Erro ao carregar biblioteca do Google. Verifique sua conexão com a internet.')
    }
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const handleGoogleSignIn = async (response: any) => {
    setGoogleLoading(true)
    setError('')

    try {
      // Verificar se response e credential existem
      if (!response || !response.credential) {
        console.error('❌ Resposta do Google inválida:', response)
        setError('Erro: resposta do Google inválida. Verifique as configurações do Google OAuth.')
        setGoogleLoading(false)
        return
      }

      // Decodificar o token JWT do Google (sem verificar, pois vamos verificar no backend)
      let payload
      try {
        payload = JSON.parse(atob(response.credential.split('.')[1]))
      } catch (parseError) {
        console.error('❌ Erro ao decodificar token do Google:', parseError)
        setError('Erro ao processar token do Google. Tente novamente.')
        setGoogleLoading(false)
        return
      }

      console.log('✅ Token do Google recebido, enviando para o servidor...')
      
      const result = await loginWithGoogle(
        response.credential,
        payload.name || 'Usuário',
        payload.email,
        payload.picture
      )

      if (result.success) {
        console.log('✅ Login com Google bem-sucedido')
        router.push('/')
        router.refresh()
      } else {
        console.error('❌ Erro no login com Google:', result.error)
        setError(result.error || 'Erro ao fazer login com Google')
      }
    } catch (error: any) {
      console.error('❌ Erro no login com Google:', error)
      const errorMessage = error?.message || 'Erro desconhecido'
      setError(`Erro ao processar login com Google: ${errorMessage}`)
    } finally {
      setGoogleLoading(false)
    }
  }


  return (
    <main className="flex flex-col min-h-screen bg-background pt-[110px]">
      <Header />
      <div className="flex-grow">
        <section className="w-full bg-white px-6 md:px-20 py-24 flex items-center justify-center">
          <div className="w-full max-w-5xl space-y-12">
            <div className="text-center space-y-4">
              <h1 className="text-[46px] md:text-[54px] font-light tracking-tight text-[#C41E3A] uppercase">
                Entrar
              </h1>
              <p className="text-sm text-[#4d4d4d]">
                Acesse sua conta para continuar
              </p>
            </div>

            <article className="border border-[#F0F0F0] rounded-lg p-8 bg-[#fbfbfb] max-w-md mx-auto">

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#4d4d4d] mb-2 uppercase tracking-wide">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777] w-5 h-5 pointer-events-none z-10" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-[#E8E8E8] rounded-md focus:outline-none focus:border-[#C41E3A] text-[#1a1a1a] bg-white"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              {/* Senha */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#4d4d4d] mb-2 uppercase tracking-wide">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777] w-5 h-5 pointer-events-none z-10" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-12 py-3 border border-[#E8E8E8] rounded-md focus:outline-none focus:border-[#C41E3A] text-[#1a1a1a] bg-white"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777] hover:text-[#C41E3A] transition-colors z-10 p-1"
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Erro */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              {/* Tentativas restantes */}
              {attemptsRemaining !== null && attemptsRemaining > 0 && (
                <p className="text-xs text-[#4d4d4d] text-center">
                  Tentativas restantes: {attemptsRemaining}
                </p>
              )}

              {/* Botão de submit */}
              <button
                type="submit"
                disabled={loading || (lockedUntil !== null)}
                className="w-full bg-[#C41E3A] text-white py-3.5 rounded-md font-medium tracking-wide uppercase text-sm hover:bg-[#A0182E] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>

            {/* Divisor */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E8E8E8]"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#fbfbfb] px-2 text-[#4d4d4d]">Ou</span>
              </div>
            </div>

            {/* Botão Google - Renderizado diretamente */}
            <div 
              id="google-signin-button" 
              className="w-full"
              style={{ minHeight: '40px' }}
            ></div>
            {googleLoading && (
              <p className="text-sm text-center text-[#4d4d4d] mt-2">Entrando com Google...</p>
            )}

              {/* Link para recuperação de senha */}
            <div className="mt-4 text-center">
              <Link href="/esqueci-senha" className="text-sm text-[#C41E3A] hover:underline">
                Esqueci minha senha
              </Link>
            </div>

              {/* Link para cadastro */}
            <div className="mt-6 text-center">
              <p className="text-sm text-[#4d4d4d]">
                Não tem uma conta?{' '}
                <Link href="/cadastro" className="text-[#C41E3A] hover:underline font-medium">
                  Cadastre-se
                </Link>
              </p>
            </div>
            </article>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}

