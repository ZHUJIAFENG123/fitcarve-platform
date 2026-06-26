const BASE = '/api'

async function request(url, options = {}) {
  const token = localStorage.getItem('token')
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(`${BASE}${url}`, { ...options, headers })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || '请求失败')
  return data
}

function get(url) { return request(url) }
function post(url, body) { return request(url, { method: 'POST', body: JSON.stringify(body) }) }
function put(url, body) { return request(url, { method: 'PUT', body: JSON.stringify(body) }) }
function del(url) { return request(url, { method: 'DELETE' }) }

export const newsApi = {
  list: (params) => get(`/news${params || ''}`),
  detail: (id) => get(`/news/${id}`),
  create: (data) => post('/news', data),
  update: (id, data) => put(`/news/${id}`, data),
  remove: (id) => del(`/news/${id}`),
  search: (keyword) => get(`/news/search?keyword=${encodeURIComponent(keyword)}`),
  stats: () => get('/news/stats/overview')
}

export const courseApi = {
  list: (params) => get(`/courses${params || ''}`),
  detail: (id) => get(`/courses/${id}`),
  create: (data) => post('/courses', data),
  update: (id, data) => put(`/courses/${id}`, data),
  remove: (id) => del(`/courses/${id}`),
  search: (keyword) => get(`/courses/search?keyword=${encodeURIComponent(keyword)}`),
  stats: () => get('/courses/stats/overview')
}

export const commentApi = {
  list: (params) => get(`/comments${params || ''}`),
  create: (data) => post('/comments', data),
  update: (id, data) => put(`/comments/${id}`, data),
  remove: (id) => del(`/comments/${id}`),
  like: (id) => post(`/comments/${id}/like`),
  getUserComments: (userId) => get(`/comments/user/${userId}`)
}

export const interactionApi = {
  toggle: (targetType, targetId, type) => post('/interactions', { targetType, targetId, type }),
  list: () => get('/interactions/user'),
  check: (targetType, targetId) => get(`/interactions/check?targetType=${targetType}&targetId=${targetId}`),
  stats: (targetType, targetId) => get(`/interactions/stats/${targetType}/${targetId}`),
  remove: (id) => del(`/interactions/${id}`)
}

export const userApi = {
  list: () => get('/users'),
  profile: () => get('/users/profile')
}
