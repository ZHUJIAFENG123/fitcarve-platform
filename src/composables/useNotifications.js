import { ref, computed } from 'vue'

const STORAGE_KEY_PREFIX = 'app_notifications_'

const roleDefaults = {
  admin: [
    { id: 1001, title: '审核通知', content: '有新的资讯需要审核', time: '2024-01-16 15:30', read: false, link: '/admin/audit', type: 'audit' },
    { id: 1002, title: '审核通知', content: '教练发布了新课程待审核', time: '2024-01-16 14:20', read: false, link: '/admin/audit', type: 'audit' },
    { id: 1003, title: '角色申请', content: '有新的身份申请待审核', time: '2024-01-16 10:00', read: false, link: '/admin/users', type: 'system' },
    { id: 1004, title: '系统通知', content: '系统已更新至最新版本', time: '2024-01-14 18:00', read: true, link: '/admin/dashboard', type: 'system' }
  ],
  coach: [
    { id: 2001, title: '课程通知', content: '您发布的课程有新学员报名', time: '2024-01-16 15:30', read: false, link: '/coach/interaction', type: 'interact' },
    { id: 2002, title: '审核通知', content: '您提交的课程已通过审核', time: '2024-01-16 14:20', read: false, link: '/coach/manage', type: 'audit' },
    { id: 2003, title: '互动通知', content: '有人评论了您的课程', time: '2024-01-16 10:00', read: false, link: '/coach/interaction', type: 'interact' },
    { id: 2004, title: '系统通知', content: '欢迎加入教练团队！', time: '2024-01-14 18:00', read: true, link: '/coach/manage', type: 'system' }
  ],
  creator: [
    { id: 3001, title: '审核通知', content: '您的资讯已通过审核', time: '2024-01-16 15:30', read: false, link: '/creator/manage', type: 'audit' },
    { id: 3002, title: '互动通知', content: '有人评论了您的资讯', time: '2024-01-16 14:20', read: false, link: '/creator/fans', type: 'interact' },
    { id: 3003, title: '关注通知', content: '有新的粉丝关注了你', time: '2024-01-15 09:00', read: false, link: '/creator/fans', type: 'follow' },
    { id: 3004, title: '系统通知', content: '资讯发布规则已更新', time: '2024-01-14 18:00', read: true, link: '/creator/manage', type: 'system' }
  ],
  user: [
    { id: 4001, title: '互动通知', content: '有人回复了你的评论', time: '2024-01-16 10:00', read: false, link: '/my-comments', type: 'interact' },
    { id: 4002, title: '收藏通知', content: '您收藏的课程有更新内容', time: '2024-01-15 14:30', read: false, link: '/favorites', type: 'system' },
    { id: 4003, title: '推荐通知', content: '根据你的兴趣推荐了新课程', time: '2024-01-15 09:00', read: false, link: '/recommendation', type: 'system' },
    { id: 4004, title: '系统通知', content: '欢迎加入健身社区！', time: '2024-01-14 18:00', read: true, link: '/home', type: 'system' }
  ]
}

function getStorageKey() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  const username = userInfo.username || 'guest'
  return STORAGE_KEY_PREFIX + username
}

function getRoleDefaults() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  const role = userInfo.role || 'user'
  const defaults = roleDefaults[role] || roleDefaults.user
  return JSON.parse(JSON.stringify(defaults))
}

function loadFromStorage() {
  try {
    const key = getStorageKey()
    const stored = localStorage.getItem(key)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch (e) {}
  return getRoleDefaults()
}

function save() {
  localStorage.setItem(getStorageKey(), JSON.stringify(notifications.value))
}

let _lastUsername = ''

const notifications = ref(loadFromStorage())

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

function ensureCorrectUser() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  const currentUsername = userInfo.username || 'guest'
  if (currentUsername !== _lastUsername) {
    _lastUsername = currentUsername
    notifications.value = loadFromStorage()
    return true
  }
  return false
}

function markAsRead(id) {
  ensureCorrectUser()
  const n = notifications.value.find(item => item.id === id)
  if (n) {
    n.read = true
    save()
  }
}

function markAllAsRead() {
  ensureCorrectUser()
  notifications.value.forEach(n => { n.read = true })
  save()
}

function forceReload() {
  _lastUsername = ''
  ensureCorrectUser()
}

ensureCorrectUser()

export function useNotifications() {
  ensureCorrectUser()
  return { notifications, unreadCount, markAsRead, markAllAsRead, forceReload }
}