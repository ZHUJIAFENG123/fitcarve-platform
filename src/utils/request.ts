import type { ApiResponse, PaginatedResponse, Pagination } from '@/types/common'

const BASE = import.meta.env.VITE_API_BASE_URL || '/api'

const EXCLUDED_PATHS = ['/api/auth/login', '/api/auth/register']

interface RequestOptions extends RequestInit {
  skipAuth?: boolean
  params?: Record<string, string | number | undefined>
}

function buildUrl(url: string, params?: Record<string, string | number | undefined>): string {
  if (!params) return `${BASE}${url}`
  const filtered = Object.entries(params).filter(([, v]) => v !== undefined && v !== '')
  if (filtered.length === 0) return `${BASE}${url}`
  const qs = filtered.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`).join('&')
  return `${BASE}${url}?${qs}`
}

async function request<T = unknown>(url: string, options: RequestOptions = {}): Promise<T> {
  const { skipAuth = false, params, ...fetchOptions } = options

  const token = localStorage.getItem('token')
  const needsAuth = !skipAuth && !EXCLUDED_PATHS.includes(url)
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>)
  }
  if (needsAuth && token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const fullUrl = buildUrl(url, params)
  const res = await fetch(fullUrl, { ...fetchOptions, headers })

  if (res.status === 401) {
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    window.location.href = '/login'
    throw new Error('登录已过期，请重新登录')
  }

  const data: ApiResponse<T> = await res.json()

  if (!res.ok) {
    throw new Error(data.message || `请求失败 (${res.status})`)
  }

  return data.data ?? (data as unknown as T)
}

export async function httpGet<T = unknown>(url: string, params?: Record<string, string | number | undefined>): Promise<T> {
  return request<T>(url, { method: 'GET', params })
}

export async function httpPost<T = unknown>(url: string, body?: unknown): Promise<T> {
  return request<T>(url, {
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined
  })
}

export async function httpPut<T = unknown>(url: string, body?: unknown): Promise<T> {
  return request<T>(url, {
    method: 'PUT',
    body: body ? JSON.stringify(body) : undefined
  })
}

export async function httpDelete<T = unknown>(url: string): Promise<T> {
  return request<T>(url, { method: 'DELETE' })
}

export async function httpPaginated<T>(
  url: string,
  params?: Record<string, string | number | undefined>
): Promise<PaginatedResponse<T>> {
  return httpGet<PaginatedResponse<T>>(url, params)
}
