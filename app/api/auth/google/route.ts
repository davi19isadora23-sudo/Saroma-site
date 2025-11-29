import { NextResponse } from 'next/server'
import { getUserByEmail, createUser, createSession } from '@/lib/user-auth'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const SESSION_DURATION = 8 * 60 * 60 * 1000 // 8 horas

// Schema de validação
const googleAuthSchema = z.object({
  idToken: z.string().min(1, 'Token do Google é obrigatório'),
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  picture: z.string().url().optional(),
})

// Verificar token do Google
async function verifyGoogleToken(idToken: string): Promise<{ email: string; name: string; picture?: string } | null> {
  try {
    console.log('🔍 Verificando token do Google...')
    // Verificar com a API do Google
    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Erro na resposta do Google tokeninfo:', response.status, errorText)
      return null
    }

    const data = await response.json()
    console.log('📥 Dados do token recebidos do Google')
    
    // Verificar se há erro
    if (data.error) {
      console.error('❌ Erro no token do Google:', data.error)
      return null
    }

    // Verificar se o token é válido e do Google
    if (data.iss !== 'accounts.google.com' && data.iss !== 'https://accounts.google.com') {
      console.error('❌ Token não é do Google. Issuer:', data.iss)
      return null
    }

    // Verificar se o token não expirou
    if (data.exp && parseInt(data.exp) * 1000 < Date.now()) {
      console.error('❌ Token do Google expirado')
      return null
    }

    console.log('✅ Token do Google válido')
    return {
      email: data.email,
      name: data.name || data.given_name || 'Usuário',
      picture: data.picture,
    }
  } catch (error: any) {
    console.error('❌ Erro ao verificar token do Google:', error)
    console.error('Detalhes do erro:', error.message)
    return null
  }
}

export async function POST(req: Request) {
  try {
    console.log('📥 Recebida requisição de autenticação Google')
    const body = await req.json()
    
    // Validar dados
    const validation = googleAuthSchema.safeParse(body)
    if (!validation.success) {
      console.error('❌ Validação falhou:', validation.error.errors)
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    const { idToken, name, email, picture } = validation.data
    console.log('✅ Dados validados, email:', email)

    // Verificar token do Google
    const googleUser = await verifyGoogleToken(idToken)
    
    if (!googleUser) {
      console.error('❌ Token do Google inválido ou não verificado')
      return NextResponse.json(
        { error: 'Token do Google inválido ou expirado. Verifique se o domínio está autorizado no Google Cloud Console.' },
        { status: 401 }
      )
    }

    // Verificar se o email do token corresponde ao email enviado
    if (googleUser.email.toLowerCase() !== email.toLowerCase()) {
      console.error('❌ Email não corresponde:', { tokenEmail: googleUser.email, sentEmail: email })
      return NextResponse.json(
        { error: 'Email não corresponde ao token do Google' },
        { status: 401 }
      )
    }

    // Buscar ou criar usuário
    let user = await getUserByEmail(email.toLowerCase())

    if (!user) {
      // Criar novo usuário (sem senha, pois é login social)
      // Gerar uma senha aleatória que nunca será usada
      const randomPassword = Math.random().toString(36).slice(-16) + Math.random().toString(36).slice(-16)
      user = await createUser(email.toLowerCase(), name, randomPassword)
    }

    // Criar sessão
    const token = await createSession(user.id, SESSION_DURATION)
    const expiresAt = Date.now() + SESSION_DURATION

    // Remover senha do retorno
    const { passwordHash, ...userWithoutPassword } = user

    console.log(`✅ Login com Google bem-sucedido: ${user.email}`)

    return NextResponse.json({
      success: true,
      token,
      expiresAt,
      user: userWithoutPassword,
    })
  } catch (err: any) {
    console.error('❌ Erro no login com Google:', err)
    
    if (err.message === 'Email já cadastrado') {
      return NextResponse.json(
        { error: 'Este email já está cadastrado com outro método de login' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Erro ao processar autenticação com Google' },
      { status: 500 }
    )
  }
}

