import { ElMessageBox } from 'element-plus'

export function useAuthGuard() {
  function requireAuth(actionLabel = '使用此功能') {
    const token = localStorage.getItem('token')
    if (token) return true
    ElMessageBox.confirm(
      `请先登录后再${actionLabel}`,
      '提示',
      { confirmButtonText: '去登录', cancelButtonText: '取消', type: 'info' }
    ).then(() => {
      window.location.href = '/login'
    }).catch(() => {})
    return false
  }
  return { requireAuth }
}

export function isLoggedIn() {
  return !!localStorage.getItem('token')
}
