import axios from 'axios'

// 创建axios实例
const authApi = axios.create({
  baseURL: '/api', // 实际项目中替换为真实的API地址
  timeout: 10000
})

// 请求拦截器，添加token
authApi.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器，处理token过期等问题
authApi.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response && error.response.status === 401) {
      // token过期，清除本地存储并跳转到登录页
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// 登录
export const login = (username, password) => {
  return authApi.post('/auth/login', { username, password })
}

// 注册
export const register = (userInfo) => {
  return authApi.post('/auth/register', userInfo)
}

// 登出
export const logout = () => {
  return authApi.post('/auth/logout')
}

// 刷新token
export const refreshToken = () => {
  return authApi.post('/auth/refresh')
}

// 忘记密码
export const forgotPassword = (email) => {
  return authApi.post('/auth/forgot-password', { email })
}

// 重置密码
export const resetPassword = (token, newPassword) => {
  return authApi.post('/auth/reset-password', { token, newPassword })
}

// 发送邮箱验证
export const sendVerificationEmail = () => {
  return authApi.post('/auth/send-verification')
}

// 验证邮箱
export const verifyEmail = (token) => {
  return authApi.get(`/auth/verify-email?token=${token}`)
}

// 获取当前用户信息
export const getCurrentUser = () => {
  return authApi.get('/auth/me')
}

// 模拟登录（用于开发测试）
export const mockLogin = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}')
      
      const mockUsers = {
        admin: { password: '123456', role: 'admin' },
        user001: { password: '123456', role: 'user' },
        coach001: { password: '123456', role: 'coach' },
        creator001: { password: '123456', role: 'creator' },
        ...registeredUsers
      }
      
      if (mockUsers[username] && mockUsers[username].password === password) {
        const token = 'mock-jwt-token-' + Date.now()
        const primaryRole = mockUsers[username].role
        
        // 读取该用户已审批通过的多重角色
        const allRoleApprovals = JSON.parse(localStorage.getItem('roleApprovals') || '{}')
        const userApprovals = allRoleApprovals[username] || []
        const extraRoles = userApprovals
          .filter(a => a.status === 'approved')
          .map(a => a.targetRole)
        
        const allRoles = [primaryRole, ...extraRoles]
        // 去重
        const uniqueRoles = [...new Set(allRoles)]
        
        const userInfo = {
          id: username === 'admin' ? 0 : (username === 'user001' ? 1 : username === 'coach001' ? 2 : 3),
          username: username,
          role: primaryRole,
          roles: uniqueRoles,
          email: `${username}@example.com`,
          avatar: `https://randomuser.me/api/portraits/${username === 'creator001' ? 'women' : 'men'}/${Math.floor(Math.random() * 100)}.jpg`
        }
        localStorage.setItem('token', token)
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        localStorage.setItem('activeRole', primaryRole)
        resolve({ data: { token, user: userInfo } })
      } else {
        reject(new Error('用户名或密码错误'))
      }
    }, 500)
  })
}

// 模拟注册（用于开发测试）
export const mockRegister = (userInfo) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 获取现有的注册用户
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}')
      
      // 添加新用户
      registeredUsers[userInfo.username] = {
        password: userInfo.password,
        role: userInfo.role
      }
      
      // 存储到localStorage
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers))
      
      resolve({ data: { success: true, message: '注册成功' } })
    }, 500)
  })
}

// 模拟发送重置密码邮件（用于开发测试）
export const mockForgotPassword = (email) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { success: true, message: '重置密码邮件已发送' } })
    }, 500)
  })
}

// 模拟验证邮箱（用于开发测试）
export const mockVerifyEmail = (token) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { success: true, message: '邮箱验证成功' } })
    }, 500)
  })
}

// ===== 多重角色管理系统 =====

// 通知存储辅助函数
function addNotificationForUser(username, notification) {
  const key = 'app_notifications_' + username
  const list = JSON.parse(localStorage.getItem(key) || '[]')
  list.unshift(notification)
  localStorage.setItem(key, JSON.stringify(list))
}

// 角色定义
export const ROLE_DEFINITIONS = {
  user: { label: '健身爱好者', icon: 'User', color: '#1890ff', home: '/home' },
  coach: { label: '教练', icon: 'DataBoard', color: '#52c41a', home: '/coach/manage' },
  creator: { label: '内容创作者', icon: 'Edit', color: '#fa8c16', home: '/creator/manage' },
  admin: { label: '管理员', icon: 'Setting', color: '#ff4d4f', home: '/admin/dashboard' }
}

// 允许申请的角色组合规则（哪些角色可以申请哪些额外角色）
export const ROLE_APPLICATION_RULES = {
  user: ['coach', 'creator'],
  coach: ['user', 'creator'],
  creator: ['user', 'coach'],
  admin: [] // 管理员不能再申请其他角色
}

// 申请新角色
export const applyForRole = (targetRole, reason) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
      if (!userInfo.username) {
        reject(new Error('请先登录'))
        return
      }
      
      const currentRole = localStorage.getItem('activeRole') || userInfo.role
      
      // 检查规则
      const allowedTargets = ROLE_APPLICATION_RULES[currentRole] || []
      if (!allowedTargets.includes(targetRole)) {
        reject(new Error(`当前身份「${ROLE_DEFINITIONS[currentRole]?.label || currentRole}」不能申请「${ROLE_DEFINITIONS[targetRole]?.label || targetRole}」身份`))
        return
      }
      
      // 检查是否已有此角色
      const roles = userInfo.roles || [userInfo.role]
      if (roles.includes(targetRole)) {
        reject(new Error('您已拥有此身份，无需重复申请'))
        return
      }
      
      // 检查是否已有待审批的申请
      const allApprovals = JSON.parse(localStorage.getItem('roleApprovals') || '{}')
      const userApprovals = allApprovals[userInfo.username] || []
      const pending = userApprovals.find(a => a.targetRole === targetRole && a.status === 'pending')
      if (pending) {
        reject(new Error('您已提交过此身份的申请，请等待管理员审核'))
        return
      }
      
      // 创建申请
      const application = {
        id: Date.now(),
        username: userInfo.username,
        currentRole: currentRole,
        targetRole: targetRole,
        reason: reason,
        status: 'pending',
        applyTime: new Date().toLocaleString('zh-CN'),
        reviewTime: null,
        reviewComment: ''
      }
      
      userApprovals.push(application)
      allApprovals[userInfo.username] = userApprovals
      localStorage.setItem('roleApprovals', JSON.stringify(allApprovals))
      
      // 添加通知给管理员
      addNotificationForUser('admin', {
        id: Date.now() + 1,
        title: '角色申请',
        content: `${userInfo.username} 申请成为「${ROLE_DEFINITIONS[targetRole]?.label || targetRole}」`,
        time: new Date().toLocaleString('zh-CN'),
        read: false,
        link: '/admin/users',
        type: 'system'
      })
      
      resolve({ success: true, message: '申请已提交，请等待管理员审核' })
    }, 500)
  })
}

// 获取当前用户的所有角色申请
export const getMyApplications = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  const allApprovals = JSON.parse(localStorage.getItem('roleApprovals') || '{}')
  return allApprovals[userInfo.username] || []
}

// 获取所有角色申请（管理员用）
export const getAllApplications = () => {
  const allApprovals = JSON.parse(localStorage.getItem('roleApprovals') || '{}')
  const applications = []
  Object.keys(allApprovals).forEach(username => {
    allApprovals[username].forEach(app => {
      applications.push(app)
    })
  })
  return applications.sort((a, b) => b.id - a.id)
}

// 审核角色申请（管理员用）
export const reviewApplication = (username, applicationId, status, comment) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allApprovals = JSON.parse(localStorage.getItem('roleApprovals') || '{}')
      const userApprovals = allApprovals[username] || []
      const app = userApprovals.find(a => a.id === applicationId)
      
      if (app) {
        app.status = status
        app.reviewTime = new Date().toLocaleString('zh-CN')
        app.reviewComment = comment || ''
        
        allApprovals[username] = userApprovals
        localStorage.setItem('roleApprovals', JSON.stringify(allApprovals))
        
        // 如果审批通过，更新用户的roles列表
        if (status === 'approved') {
          // 尝试更新当前已登录的 userInfo（如果恰好是申请人本人）
          const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
          if (userInfo.username === username) {
            const roles = userInfo.roles || [userInfo.role]
            if (!roles.includes(app.targetRole)) {
              roles.push(app.targetRole)
              userInfo.roles = roles
              localStorage.setItem('userInfo', JSON.stringify(userInfo))
            }
          }
          // 同步更新 activeRole 确保 RoleSwitcher 不显示"未知"
          if (!localStorage.getItem('activeRole') || !ROLE_DEFINITIONS[localStorage.getItem('activeRole')]) {
            localStorage.setItem('activeRole', app.currentRole || userInfo.role || 'user')
          }
        }
        
        // 添加通知给申请人
        const roleLabel = ROLE_DEFINITIONS[app.targetRole]?.label || app.targetRole
        addNotificationForUser(username, {
          id: Date.now() + 1,
          title: status === 'approved' ? '申请通过' : '申请驳回',
          content: status === 'approved'
            ? `您申请「${roleLabel}」身份已通过审核！重新登录后生效`
            : `您申请「${roleLabel}」身份已被驳回。原因：${comment || '未说明'}`,
          time: new Date().toLocaleString('zh-CN'),
          read: false,
          link: '/profile',
          type: 'system'
        })
      }
      
      resolve({ success: true })
    }, 300)
  })
}
