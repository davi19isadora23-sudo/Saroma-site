import fs from 'fs'
import path from 'path'
import type { User } from './user-auth'

const DATA_DIR = path.join(process.cwd(), 'data')
const USERS_FILE = path.join(DATA_DIR, 'users.json')

// Garantir que o diretório existe
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// Carregar usuários do arquivo
export function loadUsers(): Map<string, User> {
  try {
    if (!fs.existsSync(USERS_FILE)) {
      return new Map()
    }

    const data = fs.readFileSync(USERS_FILE, 'utf-8')
    
    // Verificar se o arquivo está vazio ou contém apenas espaços em branco
    if (!data || data.trim().length === 0) {
      return new Map()
    }

    const usersArray = JSON.parse(data) as User[]
    
    // Verificar se é um array válido
    if (!Array.isArray(usersArray)) {
      return new Map()
    }

    const usersMap = new Map<string, User>()

    usersArray.forEach(user => {
      if (user && user.id) {
        usersMap.set(user.id, user)
      }
    })

    return usersMap
  } catch (error) {
    console.error('Erro ao carregar usuários:', error)
    return new Map()
  }
}

// Salvar usuários no arquivo
export function saveUsers(users: Map<string, User>): void {
  try {
    const usersArray = Array.from(users.values())
    fs.writeFileSync(USERS_FILE, JSON.stringify(usersArray, null, 2), 'utf-8')
  } catch (error) {
    console.error('Erro ao salvar usuários:', error)
  }
}

