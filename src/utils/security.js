// 安全工具函数

// XSS过滤函数
export const sanitizeHtml = (html) => {
  if (!html) return ''
  
  // 替换危险标签
  let sanitized = html
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
    .replace(/<object[^>]*>.*?<\/object>/gi, '')
    .replace(/<embed[^>]*>.*?<\/embed>/gi, '')
    .replace(/<link[^>]*>.*?<\/link>/gi, '')
  
  // 替换危险属性
  sanitized = sanitized
    .replace(/on\w+\s*=\s*["']?[^"'>]+["']?/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
  
  return sanitized
}

// 密码强度检查
export const checkPasswordStrength = (password) => {
  let strength = 0
  
  // 长度检查
  if (password.length >= 8) strength += 1
  if (password.length >= 12) strength += 1
  
  // 包含数字
  if (/\d/.test(password)) strength += 1
  
  // 包含小写字母
  if (/[a-z]/.test(password)) strength += 1
  
  // 包含大写字母
  if (/[A-Z]/.test(password)) strength += 1
  
  // 包含特殊字符
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1
  
  return strength
}

// 邮箱格式验证
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// 手机号格式验证
export const validatePhone = (phone) => {
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phone)
}

// 生成随机字符串
export const generateRandomString = (length = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// 加密本地存储数据
export const encryptLocalStorage = (key, value) => {
  try {
    const encryptedValue = btoa(JSON.stringify(value))
    localStorage.setItem(key, encryptedValue)
    return true
  } catch (error) {
    console.error('加密本地存储失败:', error)
    return false
  }
}

// 解密本地存储数据
export const decryptLocalStorage = (key) => {
  try {
    const encryptedValue = localStorage.getItem(key)
    if (!encryptedValue) return null
    const decryptedValue = JSON.parse(atob(encryptedValue))
    return decryptedValue
  } catch (error) {
    console.error('解密本地存储失败:', error)
    return null
  }
}
