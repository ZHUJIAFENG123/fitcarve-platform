// 课程推荐服务

// 模拟用户行为数据
const userBehaviorData = {
  // 浏览记录
  views: [1, 2, 3, 5],
  // 收藏记录
  favorites: [1, 3, 4],
  // 点赞记录
  likes: [1, 2, 4],
  // 学习时长（秒）
  studyTime: {
    1: 3600,
    2: 1800,
    3: 5400,
    4: 2700
  }
}

// 模拟课程数据
const courses = [
  {
    id: 1,
    title: '力量训练基础',
    category: '力量训练',
    level: '初级',
    views: 1250,
    likes: 890,
    favorites: 450,
    avgStudyTime: 3600
  },
  {
    id: 2,
    title: '有氧训练指南',
    category: '有氧运动',
    level: '中级',
    views: 980,
    likes: 650,
    favorites: 320,
    avgStudyTime: 2700
  },
  {
    id: 3,
    title: '瑜伽入门',
    category: '瑜伽',
    level: '初级',
    views: 2340,
    likes: 1890,
    favorites: 1200,
    avgStudyTime: 4500
  },
  {
    id: 4,
    title: '高级力量训练技巧',
    category: '力量训练',
    level: '高级',
    views: 750,
    likes: 420,
    favorites: 280,
    avgStudyTime: 5400
  },
  {
    id: 5,
    title: '普拉提基础',
    category: '普拉提',
    level: '初级',
    views: 650,
    likes: 380,
    favorites: 210,
    avgStudyTime: 3000
  },
  {
    id: 6,
    title: '核心训练',
    category: '力量训练',
    level: '中级',
    views: 890,
    likes: 560,
    favorites: 340,
    avgStudyTime: 3900
  },
  {
    id: 7,
    title: '柔韧性训练',
    category: '瑜伽',
    level: '中级',
    views: 1120,
    likes: 780,
    favorites: 480,
    avgStudyTime: 4200
  },
  {
    id: 8,
    title: 'HIIT训练',
    category: '有氧运动',
    level: '高级',
    views: 1560,
    likes: 980,
    favorites: 520,
    avgStudyTime: 3300
  }
]

// 计算课程推荐分数
const calculateRecommendationScore = (course) => {
  // 基础权重
  const weights = {
    view: 0.1,
    like: 0.3,
    favorite: 0.3,
    studyTime: 0.3
  }
  
  // 计算用户行为分数
  let userScore = 0
  
  // 浏览记录
  if (userBehaviorData.views.includes(course.id)) {
    userScore += weights.view
  }
  
  // 收藏记录
  if (userBehaviorData.favorites.includes(course.id)) {
    userScore += weights.favorite
  }
  
  // 点赞记录
  if (userBehaviorData.likes.includes(course.id)) {
    userScore += weights.like
  }
  
  // 学习时长
  if (userBehaviorData.studyTime[course.id]) {
    const studyTimeRatio = userBehaviorData.studyTime[course.id] / course.avgStudyTime
    userScore += weights.studyTime * Math.min(studyTimeRatio, 1)
  }
  
  // 计算热度分数
  const popularityScore = (
    course.views * 0.1 +
    course.likes * 0.3 +
    course.favorites * 0.3 +
    course.avgStudyTime * 0.3
  ) / 1000
  
  // 综合分数
  const finalScore = userScore * 0.7 + popularityScore * 0.3
  
  return finalScore
}

// 获取推荐课程列表
export const getRecommendedCourses = (limit = 10) => {
  // 计算所有课程的推荐分数
  const coursesWithScore = courses.map(course => ({
    ...course,
    score: calculateRecommendationScore(course)
  }))
  
  // 按分数排序
  coursesWithScore.sort((a, b) => b.score - a.score)
  
  // 返回前N个课程
  return coursesWithScore.slice(0, limit)
}

// 获取热门课程列表
export const getHotCourses = (limit = 10) => {
  // 按热度排序
  const hotCourses = [...courses].sort((a, b) => {
    const hotnessA = a.views + a.likes * 2 + a.favorites * 3
    const hotnessB = b.views + b.likes * 2 + b.favorites * 3
    return hotnessB - hotnessA
  })
  
  // 返回前N个课程
  return hotCourses.slice(0, limit)
}

// 获取相关课程（基于分类）
export const getRelatedCourses = (courseId, limit = 5) => {
  // 找到当前课程
  const currentCourse = courses.find(course => course.id === courseId)
  if (!currentCourse) {
    return []
  }
  
  // 找出同分类的课程
  const relatedCourses = courses
    .filter(course => course.category === currentCourse.category && course.id !== courseId)
    .sort((a, b) => {
      const hotnessA = a.views + a.likes * 2 + a.favorites * 3
      const hotnessB = b.views + b.likes * 2 + b.favorites * 3
      return hotnessB - hotnessA
    })
  
  // 返回前N个课程
  return relatedCourses.slice(0, limit)
}
