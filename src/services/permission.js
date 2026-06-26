// 权限管理服务（v2 - 合并教练和创作者至普通用户）

// 角色定义（简化为 user + admin）
export const ROLE_DEFINITIONS = {
  user: {
    label: '会员',
    icon: 'User',
    color: '#1890ff',
    home: '/home',
    permissions: [
      'view_news', 'view_courses',
      'publish_news', 'manage_news',
      'publish_courses', 'manage_courses',
      'interact_with_content', 'interact_with_users',
      'view_learning_progress', 'view_statistics'
    ]
  },
  admin: {
    label: '管理员',
    icon: 'Setting',
    color: '#ff4d4f',
    home: '/admin/dashboard',
    permissions: [
      'manage_users', 'manage_content', 'audit_content',
      'view_statistics', 'system_config', 'manage_comments'
    ]
  }
}

// 兼容旧角色名（coach/creator → user 的映射）
const COMPAT_MAP = { coach: 'user', creator: 'user' }

// 角色权限映射
const rolePermissions = {
  admin: {
    routes: [
      '/profile',
      '/home', '/news/list', '/news/detail/:id',
      '/courses/list', '/courses/detail/:id', '/recommendation',
      '/favorites', '/my-comments', '/learning-progress',
      // 普通用户功能（管理员也拥有）
      '/user/publish-news', '/user/publish-course',
      '/user/manage-news', '/user/manage-courses',
      '/user/interaction', '/user/statistics',
      // 管理员专属
      '/admin/dashboard', '/admin/config', '/admin/users',
      '/admin/audit', '/admin/comments',
      '/admin/logs', '/admin/reports'
    ],
    permissions: ['manage_users', 'manage_content', 'audit_content', 'view_statistics', 'system_config', 'manage_comments']
  },
  user: {
    routes: [
      '/profile',
      '/home', '/news/list', '/news/detail/:id',
      '/courses/list', '/courses/detail/:id', '/recommendation',
      '/favorites', '/my-comments', '/learning-progress',
      // 原教练+创作者功能 → 合并入普通用户
      '/user/publish-news',    // 原 /creator/publish
      '/user/publish-course',  // 原 /coach/publish
      '/user/manage-news',     // 原 /creator/manage
      '/user/manage-courses',  // 原 /coach/manage
      '/user/interaction',     // 原 /coach/interaction
      '/user/statistics'       // 原 /coach/statistics + /creator/fans
    ],
    permissions: [
      'view_news', 'view_courses',
      'publish_news', 'manage_news',
      'publish_courses', 'manage_courses',
      'interact_with_content', 'interact_with_users',
      'view_learning_progress', 'view_statistics'
    ]
  }
}

// 获取当前活跃角色（简化版，兼容旧格式）
export const getActiveRole = () => {
  const active = localStorage.getItem('activeRole')
  if (active && ROLE_DEFINITIONS[active]) return active
  if (active && COMPAT_MAP[active]) return 'user'
  const userInfo = getCurrentUser()
  if (userInfo && userInfo.role) {
    if (ROLE_DEFINITIONS[userInfo.role]) return userInfo.role
    if (COMPAT_MAP[userInfo.role]) return 'user'
  }
  return 'user'
}

// 获取用户所有角色（迁移后只有 user 或 user+admin）
export const getUserRoles = () => {
  const userInfo = getCurrentUser()
  if (!userInfo) return ['user']
  
  const baseRole = userInfo.role
  // 将旧 coach/creator 映射为 user
  const mapped = COMPAT_MAP[baseRole] || baseRole
  
  const roles = [mapped]
  
  // admin 角色保留
  if (baseRole === 'admin' || (userInfo.roles && userInfo.roles.includes('admin'))) {
    if (!roles.includes('admin')) roles.push('admin')
  }
  
  // 兼容旧 roles 数组
  if (userInfo.roles) {
    const legacyRoles = userInfo.roles.map(r => COMPAT_MAP[r] || r)
    legacyRoles.forEach(r => {
      if (r === 'admin' && !roles.includes('admin')) roles.push('admin')
      if (r === 'user' && !roles.includes('user')) roles.push('user')
    })
  }
  
  return [...new Set(roles)]
}

// 切换角色（简化为仅 user/admin 切换）
export const switchRole = (role) => {
  const roles = getUserRoles()
  const mapped = COMPAT_MAP[role] || role
  if (!roles.includes(mapped)) return false
  localStorage.setItem('activeRole', mapped)
  return true
}

// 检查路由权限（支持合并后的多角色）
export const checkRoutePermission = (routePath, userRole) => {
  if (!userRole) userRole = getActiveRole()
  
  const userRoles = getUserRoles()
  let allPermittedRoutes = []
  
  userRoles.forEach(role => {
    if (rolePermissions[role]) {
      allPermittedRoutes = [...allPermittedRoutes, ...rolePermissions[role].routes]
    }
  })
  
  allPermittedRoutes = [...new Set(allPermittedRoutes)]
  
  if (allPermittedRoutes.includes(routePath)) return true
  
  for (const permittedRoute of allPermittedRoutes) {
    if (permittedRoute.includes(':')) {
      const regex = new RegExp(permittedRoute.replace(/:\w+/g, '[^/]+'))
      if (regex.test(routePath)) return true
    }
  }
  
  return false
}

export const checkPermission = (permission, userRole) => {
  if (!userRole) userRole = getActiveRole()
  const mapped = COMPAT_MAP[userRole] || userRole
  if (!rolePermissions[mapped]) return false
  return rolePermissions[mapped].permissions.includes(permission)
}

export const getUserPermissions = (userRole) => {
  if (!userRole) return []
  const mapped = COMPAT_MAP[userRole] || userRole
  if (!rolePermissions[mapped]) return []
  return rolePermissions[mapped].permissions
}

export const isLoggedIn = () => !!localStorage.getItem('token')

export const getCurrentUser = () => {
  const userInfoStr = localStorage.getItem('userInfo')
  if (!userInfoStr) return null
  try {
    const info = JSON.parse(userInfoStr)
    // 自动映射旧角色
    if (info.role && COMPAT_MAP[info.role]) {
      info.role = 'user'
    }
    if (info.roles) {
      info.roles = [...new Set(info.roles.map(r => COMPAT_MAP[r] || r))]
    }
    return info
  } catch (e) { return null }
}

export const getCurrentUserRole = () => {
  const userInfo = getCurrentUser()
  return userInfo ? userInfo.role : null
}

// 旧路由兼容重定向映射
export const LEGACY_REDIRECTS = {
  '/coach/publish': '/user/publish-course',
  '/coach/manage': '/user/manage-courses',
  '/coach/interaction': '/user/interaction',
  '/coach/statistics': '/user/statistics',
  '/creator/publish': '/user/publish-news',
  '/creator/manage': '/user/manage-news',
  '/creator/fans': '/user/statistics'
}
