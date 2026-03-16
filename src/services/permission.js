// 权限管理服务

// 角色权限映射
const rolePermissions = {
  admin: {
    routes: [
      '/profile',
      '/admin/dashboard',
      '/admin/config',
      '/admin/users',
      '/admin/audit',
      '/admin/logs',
      '/admin/reports'
    ],
    permissions: ['manage_users', 'manage_content', 'audit_content', 'view_statistics', 'system_config']
  },
  coach: {
    routes: [
      '/profile',
      '/home',
      '/news/list',
      '/news/detail/:id',
      '/courses/list',
      '/courses/detail/:id',
      '/recommendation',
      '/coach/publish',
      '/coach/interaction',
      '/coach/statistics'
    ],
    permissions: ['publish_courses', 'manage_courses', 'view_statistics', 'interact_with_users']
  },
  creator: {
    routes: [
      '/profile',
      '/home',
      '/news/list',
      '/news/detail/:id',
      '/courses/list',
      '/courses/detail/:id',
      '/recommendation',
      '/creator/publish',
      '/creator/manage',
      '/creator/fans'
    ],
    permissions: ['publish_news', 'manage_news', 'interact_with_users']
  },
  user: {
    routes: [
      '/profile',
      '/home',
      '/news/list',
      '/news/detail/:id',
      '/courses/list',
      '/courses/detail/:id',
      '/recommendation'
    ],
    permissions: ['view_news', 'view_courses', 'interact_with_content']
  }
}

// 检查用户是否有权限访问路由
export const checkRoutePermission = (routePath, userRole) => {
  if (!userRole || !rolePermissions[userRole]) {
    return false
  }
  
  const roleRoutePermissions = rolePermissions[userRole].routes
  
  // 检查精确匹配
  if (roleRoutePermissions.includes(routePath)) {
    return true
  }
  
  // 检查带参数的路由匹配
  for (const permittedRoute of roleRoutePermissions) {
    if (permittedRoute.includes(':')) {
      const regex = new RegExp(permittedRoute.replace(/:\w+/g, '[^/]+'))
      if (regex.test(routePath)) {
        return true
      }
    }
  }
  
  return false
}

// 检查用户是否有特定权限
export const checkPermission = (permission, userRole) => {
  if (!userRole || !rolePermissions[userRole]) {
    return false
  }
  
  return rolePermissions[userRole].permissions.includes(permission)
}

// 获取用户的所有权限
export const getUserPermissions = (userRole) => {
  if (!userRole || !rolePermissions[userRole]) {
    return []
  }
  
  return rolePermissions[userRole].permissions
}

// 获取用户可访问的路由
export const getUserRoutes = (userRole) => {
  if (!userRole || !rolePermissions[userRole]) {
    return []
  }
  
  return rolePermissions[userRole].routes
}

// 检查用户是否已登录
export const isLoggedIn = () => {
  return !!localStorage.getItem('token')
}

// 获取当前用户信息
export const getCurrentUser = () => {
  const userInfoStr = localStorage.getItem('userInfo')
  return userInfoStr ? JSON.parse(userInfoStr) : null
}

// 获取当前用户角色
export const getCurrentUserRole = () => {
  const userInfo = getCurrentUser()
  return userInfo ? userInfo.role : null
}
