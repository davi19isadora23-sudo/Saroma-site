'use client'

import { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
  createdAt: string
  updatedAt: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  loginWithGoogle: (idToken: string, name: string, email: string, picture?: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const USER_CACHE_KEY = 'saroma_user_cache'
const USER_CACHE_TIMESTAMP_KEY = 'saroma_user_cache_timestamp'
const USER_CACHE_DURATION = 5 * 60 * 1000 // 5 minutos

export function AuthProvider({ children }: { children: ReactNode }) {
  // Carregar estado inicial do cache imediatamente
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null
    
    try {
      const cached = localStorage.getItem(USER_CACHE_KEY)
      const timestamp = localStorage.getItem(USER_CACHE_TIMESTAMP_KEY)
      
      if (cached && timestamp) {
        const age = Date.now() - parseInt(timestamp)
        if (age < USER_CACHE_DURATION) {
          return JSON.parse(cached)
        }
      }
    } catch (error) {
      console.error('Erro ao carregar cache de usuário:', error)
    }
    
    return null
  })
  // Começar como false se tiver cache de usuário, senão true
  const [loading, setLoading] = useState(() => {
    if (typeof window === 'undefined') return true
    
    try {
      const cached = localStorage.getItem(USER_CACHE_KEY)
      const timestamp = localStorage.getItem(USER_CACHE_TIMESTAMP_KEY)
      
      if (cached && timestamp) {
        const age = Date.now() - parseInt(timestamp)
        if (age < USER_CACHE_DURATION) {
          return false // Já temos cache, não precisa mostrar loading
        }
      }
    } catch (error) {
      // Ignorar erro
    }
    
    return true // Sem cache, mostrar loading
  })

  // Verificar autenticação ao carregar (apenas uma vez)
  const checkAuthRef = useRef(false)
  useEffect(() => {
    if (!checkAuthRef.current) {
      checkAuthRef.current = true
      checkAuth()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Executar apenas uma vez na montagem

  const getToken = (): string | null => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('user_token')
  }

  const setToken = (token: string, expiresAt: number) => {
    if (typeof window === 'undefined') return
    localStorage.setItem('user_token', token)
    localStorage.setItem('user_expires', expiresAt.toString())
  }

  const removeToken = () => {
    if (typeof window === 'undefined') return
    localStorage.removeItem('user_token')
    localStorage.removeItem('user_expires')
  }

  const saveUserCache = (userData: User | null) => {
    if (typeof window === 'undefined') return
    
    try {
      if (userData) {
        localStorage.setItem(USER_CACHE_KEY, JSON.stringify(userData))
        localStorage.setItem(USER_CACHE_TIMESTAMP_KEY, Date.now().toString())
      } else {
        localStorage.removeItem(USER_CACHE_KEY)
        localStorage.removeItem(USER_CACHE_TIMESTAMP_KEY)
      }
    } catch (error) {
      console.error('Erro ao salvar cache de usuário:', error)
    }
  }

  const checkAuth = useCallback(async () => {
    try {
      const token = getToken()
      if (!token) {
        setUser(null)
        setLoading(false)
        saveUserCache(null)
        return
      }

      // Verificar se token expirou
      const expiresAt = localStorage.getItem('user_expires')
      if (expiresAt && parseInt(expiresAt) < Date.now()) {
        removeToken()
        setUser(null)
        setLoading(false)
        saveUserCache(null)
        return
      }

      // Buscar dados do usuário em background
      const response = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        saveUserCache(data.user)
      } else {
        removeToken()
        setUser(null)
        saveUserCache(null)
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error)
      const token = getToken()
      if (!token) {
        removeToken()
        setUser(null)
        saveUserCache(null)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setToken(data.token, data.expiresAt)
        setUser(data.user)
        saveUserCache(data.user)
        return { success: true }
      } else {
        return { success: false, error: data.error || 'Erro ao fazer login' }
      }
    } catch (error) {
      console.error('Erro no login:', error)
      return { success: false, error: 'Erro ao conectar com o servidor' }
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Após cadastro, fazer login automaticamente
        return await login(email, password)
      } else {
        return { success: false, error: data.error || 'Erro ao fazer cadastro' }
      }
    } catch (error) {
      console.error('Erro no cadastro:', error)
      return { success: false, error: 'Erro ao conectar com o servidor' }
    }
  }

  const loginWithGoogle = async (idToken: string, name: string, email: string, picture?: string) => {
    try {
      console.log('📤 Enviando requisição para /api/auth/google...')
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken, name, email, picture }),
      })

      const data = await response.json()
      console.log('📥 Resposta do servidor:', { status: response.status, success: data.success, error: data.error })

      if (response.ok && data.success) {
        setToken(data.token, data.expiresAt)
        setUser(data.user)
        saveUserCache(data.user)
        return { success: true }
      } else {
        const errorMessage = data.error || 'Erro ao fazer login com Google'
        console.error('❌ Erro na resposta do servidor:', errorMessage)
        return { success: false, error: errorMessage }
      }
    } catch (error: any) {
      console.error('❌ Erro no login com Google:', error)
      const errorMessage = error?.message || 'Erro ao conectar com o servidor'
      return { success: false, error: `Erro ao conectar com o servidor: ${errorMessage}` }
    }
  }

  const logout = async () => {
    try {
      const token = getToken()
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      }
    } catch (error) {
      console.error('Erro no logout:', error)
    } finally {
      removeToken()
      setUser(null)
      saveUserCache(null)
      // Limpar cache de favoritos
      if (typeof window !== 'undefined') {
        localStorage.removeItem('saroma_favorites_cache')
        localStorage.removeItem('saroma_favorites_cache_timestamp')
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, register, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}

