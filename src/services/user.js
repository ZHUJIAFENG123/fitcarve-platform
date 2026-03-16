// 用户信息管理服务

// 从localStorage读取用户信息
export const loadUserInfo = () => {
  const savedUserInfo = localStorage.getItem('userInfo')
  if (savedUserInfo) {
    return JSON.parse(savedUserInfo)
  }
  return {
    username: '健身爱好者',
    avatar: '',
    role: 'user'
  }
}

// 保存用户信息到localStorage
export const saveUserInfo = (userInfo) => {
  localStorage.setItem('userInfo', JSON.stringify(userInfo))
}

// 获取当前用户信息
export const getCurrentUser = () => {
  return loadUserInfo()
}

// 获取用户名
export const getUsername = () => {
  const userInfo = loadUserInfo()
  return userInfo.username
}

// 获取用户头像
export const getUserAvatar = () => {
  const userInfo = loadUserInfo()
  return userInfo.avatar
}

// 获取用户角色
export const getUserRole = () => {
  const userInfo = loadUserInfo()
  return userInfo.role
}
