import { ref, computed } from 'vue'
import { getUsers } from '../api/users'
import type { ApiUser } from '../types'
import router from '../router'

const authUser = ref<ApiUser | null>(readUser())

function readUser(): ApiUser | null {
  const raw = localStorage.getItem('auth_user')
  if (!raw) return null
  try {
    return JSON.parse(raw) as ApiUser
  } catch {
    return null
  }
}

function normalizePhone(p: string): string {
  return (p || '').replace(/[^0-9+]/g, '')
}

export function useAuth() {
  const user = computed(() => authUser.value)

  async function login(username: string, phone: string): Promise<boolean> {
    const res = await getUsers()
    const users: ApiUser[] = await res.json()
    const found = users.find(
      u => u.username.toLowerCase() === username.trim().toLowerCase() && normalizePhone(u.phone) === normalizePhone(phone)
    )
    if (found) {
      localStorage.setItem('auth_user', JSON.stringify(found))
      authUser.value = found
      return true
    }
    return false
  }

  function logout() {
    router.push({ name: 'login' })
    localStorage.removeItem('auth_user')
    authUser.value = null
  }

  return {
    user,
    
    login,
    logout
  }
}


