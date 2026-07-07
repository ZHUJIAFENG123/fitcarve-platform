import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getCurrentUser } from '@/services/auth.js'

export interface UserInfo {
  id: number
  username: string
  email?: string
  role: 'admin' | 'user'
  avatar?: string
  bio?: string
  signature?: string
  isVerified?: boolean
}

export const useUserStore = defineStore('user', () => {
  // 初始化时从 localStorage 恢复（与 services/auth.js 的 saveSession 配合）
  const token = ref<string>(localStorage.getItem('token') || '')

  const user = ref<UserInfo | null>(loadStoredUser())

  function loadStoredUser(): UserInfo | null {
    try {
      const raw = localStorage.getItem('userInfo')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  }

  const isLoggedIn = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  function setAuth(newToken: string, newUser: UserInfo) {
    token.value = newToken
    user.value = newUser
    localStorage.setItem('token', newToken)
    localStorage.setItem('userInfo', JSON.stringify(newUser))
    if (newUser.role) {
      localStorage.setItem('activeRole', newUser.role)
    }
  }

  function logout() {
    token.value = ''
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('activeRole')
  }

  // 从后端拉取最新用户信息（首次进入应用、token 存在但 user 信息可能过期时调用）
  async function fetchUser() {
    if (!token.value) return
    try {
      const data = await getCurrentUser()
      // 后端 /auth/me 返回字段：id/username/email/role/avatar/bio/signature/isVerified/...
      user.value = {
        id: data.id,
        username: data.username,
        email: data.email,
        role: data.role === 'coach' || data.role === 'creator' ? 'user' : data.role,
        avatar: data.avatar,
        bio: data.bio,
        signature: data.signature,
        isVerified: data.isVerified
      }
      localStorage.setItem('userInfo', JSON.stringify(user.value))
      if (user.value.role) {
        localStorage.setItem('activeRole', user.value.role)
      }
    } catch (e) {
      // token 无效或拉取失败 → 登出
      logout()
    }
  }

  return { token, user, isLoggedIn, isAdmin, setAuth, logout, fetchUser }
})
