// 文件上传工具函数

// 允许的图片类型
const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp'
]

// 允许的视频类型
const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/webm',
  'video/ogg'
]

// 允许的文档类型
const ALLOWED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation'
]

// 最大文件大小（字节）
const MAX_FILE_SIZE = {
  image: 5 * 1024 * 1024, // 5MB
  video: 100 * 1024 * 1024, // 100MB
  document: 20 * 1024 * 1024, // 20MB
  other: 10 * 1024 * 1024 // 10MB
}

// 验证文件类型
export const validateFileType = (file, type = 'image') => {
  if (!file) return false
  
  let allowedTypes
  switch (type) {
    case 'image':
      allowedTypes = ALLOWED_IMAGE_TYPES
      break
    case 'video':
      allowedTypes = ALLOWED_VIDEO_TYPES
      break
    case 'document':
      allowedTypes = ALLOWED_DOCUMENT_TYPES
      break
    default:
      return true
  }
  
  return allowedTypes.includes(file.type)
}

// 验证文件大小
export const validateFileSize = (file, type = 'image') => {
  if (!file) return false
  
  const maxSize = MAX_FILE_SIZE[type] || MAX_FILE_SIZE.other
  return file.size <= maxSize
}

// 验证文件
export const validateFile = (file, type = 'image') => {
  if (!file) {
    return { valid: false, message: '请选择文件' }
  }
  
  if (!validateFileType(file, type)) {
    return { valid: false, message: '文件类型不支持' }
  }
  
  if (!validateFileSize(file, type)) {
    const maxSize = MAX_FILE_SIZE[type] || MAX_FILE_SIZE.other
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1)
    return { valid: false, message: `文件大小不能超过 ${maxSizeMB}MB` }
  }
  
  return { valid: true, message: '' }
}

// 生成文件上传路径
export const generateUploadPath = (file, folder = 'uploads') => {
  if (!file) return ''
  
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substr(2, 9)
  const extension = file.name.split('.').pop()
  const fileName = `${timestamp}_${randomString}.${extension}`
  
  return `${folder}/${fileName}`
}

// 处理文件上传（模拟）
export const handleFileUpload = (file, type = 'image') => {
  return new Promise((resolve, reject) => {
    // 验证文件
    const validation = validateFile(file, type)
    if (!validation.valid) {
      reject(new Error(validation.message))
      return
    }
    
    // 模拟上传
    setTimeout(() => {
      // 生成模拟的文件URL
      const fileUrl = `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fitness%20${file.name}&image_size=square`
      resolve({ url: fileUrl, name: file.name, size: file.size })
    }, 1000)
  })
}

// 批量上传文件
export const uploadFiles = async (files, type = 'image') => {
  const uploadPromises = files.map(file => handleFileUpload(file, type))
  return Promise.all(uploadPromises)
}
