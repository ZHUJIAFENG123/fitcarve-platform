const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api'

// ── Real API calls ──

async function request(url, options = {}) {
  const token = localStorage.getItem('token')
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${API_BASE}${url}`, { ...options, headers })
  const data = await res.json()

  if (!res.ok) throw new Error(data.message || `请求失败 (${res.status})`)
  return data
}

export const login = (username, password) => {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  })
}

export const loginByEmail = (email, password) => {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username: email, password })
  })
}

export const register = (userInfo) => {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userInfo)
  })
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userInfo')
  localStorage.removeItem('activeRole')
}

export const forgotPassword = (email) => {
  return request('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email })
  })
}

export const resetPassword = (token, newPassword) => {
  return request('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token, newPassword })
  })
}

export const getCurrentUser = () => {
  return request('/auth/me')
}

// ── Session helpers ──

export function saveSession(data) {
  localStorage.setItem('token', data.token)
  localStorage.setItem('userInfo', JSON.stringify(data.user))
  if (data.user.role) {
    localStorage.setItem('activeRole', data.user.role)
  }
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem('userInfo')
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function isLoggedIn() {
  return !!localStorage.getItem('token')
}

// ── Legacy mock (dev fallback) ──

export const mockLogin = async (username, password) => {
  console.warn('[auth] Using mock login — configure backend for production')
  const mockUsers = {
    admin: { password: '123456', role: 'admin' },
    coach: { password: '123456', role: 'user' },
    creator: { password: '123456', role: 'user' },
    user: { password: '123456', role: 'user' }
  }
  const u = mockUsers[username]
  if (!u || u.password !== password) throw new Error('用户名或密码错误')

  const token = 'mock-token-' + Date.now()
  const user = { id: 1, username, role: u.role, email: `${username}@example.com`, avatar: '' }
  saveSession({ token, user })
  return { token, user }
}

export const mockRegister = async (form) => {
  console.warn('[auth] Using mock register — configure backend for production')
  return { message: '注册成功（Mock模式，数据未持久化）' }
}

export const ROLE_DEFINITIONS = {
  user: { label: '健身爱好者', icon: 'User', color: '#1B6B3A', home: '/home' },
  admin: { label: '管理员', icon: 'Setting', color: '#DC2626', home: '/admin/dashboard' }
}
