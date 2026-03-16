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
      // 从localStorage获取注册的用户
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}')
      
      // 预定义的用户
      const mockUsers = {
        admin: { password: 'admin123', role: 'admin' },
        user: { password: 'user123', role: 'user' },
        coach: { password: 'coach123', role: 'coach' },
        creator: { password: 'creator123', role: 'creator' },
        ...registeredUsers
      }
      
      // 验证用户名和密码
      if (mockUsers[username] && mockUsers[username].password === password) {
        // 模拟JWT token
        const token = 'mock-jwt-token-' + Date.now()
        // 模拟用户信息
        const userInfo = {
          id: 1,
          username: username,
          role: mockUsers[username].role,
          email: `${username}@example.com`,
          avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`
        }
        // 存储到localStorage
        localStorage.setItem('token', token)
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        resolve({ data: { token, user: userInfo } })
      } else {
        // 登录失败
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
