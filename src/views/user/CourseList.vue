<template>
  <div class="course-list-container">
    <Navbar :menu-links="courseMenuLinks" />
    <!-- 搜索和筛选 -->
    <div class="filter-section">
      <div class="filter-content">
        <div class="search-box">
          <el-input
            v-model="searchQuery"
            placeholder="搜索课程"
            prefix-icon="el-icon-search"
            @keyup.enter="search"
          >
            <template #append>
              <el-button type="primary" @click="search">搜索</el-button>
            </template>
          </el-input>
        </div>
        <div class="category-filter">
          <el-select v-model="selectedCategory" placeholder="选择分类" @change="filterCourses">
            <el-option label="全部" value="all"></el-option>
            <el-option label="瑜伽" value="yoga"></el-option>
            <el-option label="力量训练" value="strength"></el-option>
            <el-option label="有氧运动" value="cardio"></el-option>
            <el-option label="普拉提" value="pilates"></el-option>
          </el-select>
        </div>
        <div class="level-filter">
          <el-select v-model="selectedLevel" placeholder="选择难度" @change="filterCourses">
            <el-option label="全部" value="all"></el-option>
            <el-option label="初级" value="beginner"></el-option>
            <el-option label="中级" value="intermediate"></el-option>
            <el-option label="高级" value="advanced"></el-option>
          </el-select>
        </div>
      </div>
    </div>

    <!-- 课程列表 -->
    <div class="course-container">
      <!-- 继续学习区域 -->
      <div class="continue-section" v-if="inProgressCourses.length > 0">
        <div class="section-header">
          <h2><el-icon><VideoPlay /></el-icon> 继续学习</h2>
        </div>
        <div class="course-grid">
          <el-card v-for="course in inProgressCourses" :key="'p-'+course.id" class="course-card in-progress-card">
            <div class="progress-ribbon">学习中</div>
            <img :src="course.image" :alt="course.title" class="course-image">
            <div class="course-content">
              <h3>{{ course.title }}</h3>
              <p class="course-description">{{ course.description }}</p>
              <div class="course-meta">
                <span class="coach">{{ course.coach }}</span>
                <span class="level">{{ course.level }}</span>
              </div>
              <div class="course-progress">
                <el-progress :percentage="course.progress" :stroke-width="8" :color="customColors"></el-progress>
                <span class="progress-text">已完成 {{ course.progress }}%</span>
              </div>
              <el-button type="primary" @click="toCourseDetail(course.id)" class="enroll-btn">
                <el-icon><VideoPlay /></el-icon> 继续学习
              </el-button>
            </div>
          </el-card>
        </div>
      </div>

      <!-- 全部课程 -->
      <div class="section-header">
        <h2>全部课程</h2>
        <span class="course-count">共 {{ totalCourses }} 门课程</span>
      </div>
      <el-skeleton :loading="listLoading" animated :count="4">
        <template #template>
          <div class="course-grid">
            <div v-for="n in 4" :key="n" class="sk-card">
              <el-skeleton-item variant="image" style="width:100%;height:200px" />
              <div style="padding:14px">
                <el-skeleton-item variant="h3" style="width:80%;margin-bottom:10px" />
                <el-skeleton-item variant="text" style="margin-bottom:6px" />
                <el-skeleton-item variant="text" style="width:60%" />
              </div>
            </div>
          </div>
        </template>
        <template #default>
          <div class="course-grid">
            <el-card v-for="course in filteredCourses" :key="course.id" class="course-card">
              <img :src="course.image" :alt="course.title" class="course-image">
              <div class="course-content">
                <h3>{{ course.title }}</h3>
                <p class="course-description">{{ course.description }}</p>
                <div class="course-meta">
                  <span class="coach">{{ course.coach }}</span>
                  <span class="level" :class="levelClass(course.level)">{{ course.level }}</span>
                  <span class="price">{{ course.price }}</span>
                </div>
                <div class="course-progress" v-if="course.progress > 0">
                  <el-progress :percentage="course.progress" :stroke-width="6"></el-progress>
                </div>
                <el-button type="primary" @click="toCourseDetail(course.id)" class="enroll-btn">
                  {{ course.progress > 0 ? '继续学习' : '查看详情' }}
                </el-button>
              </div>
            </el-card>
          </div>
        </template>
      </el-skeleton>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="totalCourses"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { VideoPlay } from '@element-plus/icons-vue'
import { loadUserInfo } from '../../services/user.js'
import Navbar from '@/components/Navbar.vue'

const router = useRouter()
const courseMenuLinks = [
  { to: '/home', label: '首页', active: false },
  { to: '/news/list', label: '资讯', active: false },
  { to: '/fitness', label: '训练&饮食', active: true },
  { to: '/recommendation', label: '发现', active: false }
]

// 用户信息
const userInfo = ref(loadUserInfo())
const username = computed(() => userInfo.value.username)
const userAvatar = computed(() => userInfo.value.avatar)

// 监听localStorage变化，实时更新用户信息
const handleStorageChange = () => {
  userInfo.value = loadUserInfo()
}

// 组件挂载时添加监听器
onMounted(() => {
  window.addEventListener('storage', handleStorageChange)
  loadCoursesProgress()
})

// 组件卸载时移除监听器
onUnmounted(() => {
  window.removeEventListener('storage', handleStorageChange)
})

// 进度条渐变色
const customColors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#1B6B3A', percentage: 60 },
  { color: '#238B4D', percentage: 80 },
  { color: '#145230', percentage: 100 }
]

// 难度样式映射
const levelClass = (level) => {
  const map = { '初级': 'level-beginner', '中级': 'level-intermediate', '高级': 'level-advanced' }
  return map[level] || ''
}

// 加载所有课程的学习进度
const loadCoursesProgress = () => {
  coursesData.value.forEach(course => {
    try {
      const saved = localStorage.getItem(`course_progress_${course.id}`)
      if (saved) {
        const data = JSON.parse(saved)
        const total = 6
        const completed = data.completedLessons ? data.completedLessons.length : 0
        course.progress = total > 0 ? Math.round((completed / total) * 100) : 0
      }
    } catch (e) {}
  })
}

// 正在学习中的课程
const inProgressCourses = computed(() => {
  return coursesData.value.filter(c => c.progress > 0 && c.progress < 100)
})

// 搜索和筛选
const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedLevel = ref('all')

// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const listLoading = ref(false)

// 模拟课程数据 - 10个健身系统课程
const coursesData = ref([
  {
    id: 1,
    title: '零基础全场景健身入门系统课',
    description: 'ACSM标准认证的新手健身启蒙课，专为0基础人群打造，彻底解决"不敢进健身房、不会做动作、不会定计划、怕练错受伤"的核心痛点，覆盖居家+健身房双场景。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beginner%20fitness%20course%20ACSM%20certified&image_size=square',
    coach: '健身教练',
    level: '初级',
    price: '¥299',
    category: 'strength',
    progress: 0
  },
  {
    id: 2,
    title: '办公族体态矫正与慢性疼痛缓解系统课',
    description: '国际骨科物理治疗学会（IOPTA）认证的循证体态矫正课，专为久坐办公族打造，针对性解决圆肩驼背、头前伸、高低肩、骨盆前倾/后倾等上/下交叉综合征。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=office%20worker%20posture%20correction%20pain%20relief&image_size=square',
    coach: '物理治疗师',
    level: '初级',
    price: '¥199',
    category: 'pilates',
    progress: 0
  },
  {
    id: 3,
    title: '女性全生命周期专属健身系统课',
    description: 'ACSM女性运动分会认证的女性专属健身课，覆盖女性青春期、经期、备孕期、孕产期、产后恢复期、更年期全生命周期，顺应女性生理特点与激素变化。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=female%20fitness%20lifecycle%20ACSM%20certified&image_size=square',
    coach: '女性健身专家',
    level: '中级',
    price: '¥399',
    category: 'yoga',
    progress: 0
  },
  {
    id: 4,
    title: '中老年抗阻健康与机能提升系统课',
    description: '基于《柳叶刀》中老年运动研究与ACSM中老年抗阻训练指南打造的专属课程，专为45岁以上中老年人群设计，以安全为第一原则，核心解决肌少症预防、骨密度提升、三高管控。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=senior%20fitness%20resistance%20training%20lancet%20study&image_size=square',
    coach: '老年健康专家',
    level: '初级',
    price: '¥299',
    category: 'strength',
    progress: 0
  },
  {
    id: 5,
    title: '自然训练者增肌突破系统课',
    description: 'NSCA抗阻训练分会认证的进阶增肌课，专为有1年以上训练经验、陷入增肌平台期的自然训练者打造，彻底打破"新手福利期后不再长肌肉"的困境。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=natural%20bodybuilding%20muscle%20growth%20NSCA&image_size=square',
    coach: '健身教练',
    level: '高级',
    price: '¥499',
    category: 'strength',
    progress: 0
  },
  {
    id: 6,
    title: '科学减脂不反弹系统课',
    description: 'ISSN减脂立场文件认证的循证减脂课，专为反复减肥反弹、减脂进入平台期、怕减脂掉肌肉、怕极端节食伤身体的人群打造，摒弃"节食减肥""疯狂有氧"的错误方法。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=scientific%20fat%20loss%20ISSN%20certified&image_size=square',
    coach: '减脂专家',
    level: '中级',
    price: '¥399',
    category: 'cardio',
    progress: 0
  },
  {
    id: 7,
    title: '健身房常见运动损伤循证康复系统课',
    description: '《Journal of Orthopaedic & Sports Physical Therapy》（JOSPT）临床指南认证的运动康复课，专为健身人群打造，针对性解决健身房最高发的肩、膝、腰、肘、踝五大部位运动损伤。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sports%20injury%20rehabilitation%20JOSPT%20guidelines&image_size=square',
    coach: '物理治疗师',
    level: '中级',
    price: '¥299',
    category: 'pilates',
    progress: 0
  },
  {
    id: 8,
    title: '功能性训练与综合运动表现提升系统课',
    description: 'NSCA功能性训练分会认证的专项提升课，专为球类运动、跑步、滑雪、户外等运动爱好者，以及想提升日常活动能力、身体综合机能的人群打造。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=functional%20training%20sports%20performance%20NSCA&image_size=square',
    coach: '健身教练',
    level: '高级',
    price: '¥399',
    category: 'cardio',
    progress: 0
  },
  {
    id: 9,
    title: 'IFBB标准健美健体备赛全周期系统课',
    description: 'IFBB职业联盟运动营养分会认证的竞技备赛课，专为有3年以上系统训练经验、想参加健美/健体/比基尼赛事的自然训练者打造，覆盖非赛季增肌、赛前减脂、脱水充碳、造型训练、赛后恢复的全备赛周期。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bodybuilding%20competition%20prep%20IFBB%20certified&image_size=square',
    coach: 'IFBB教练',
    level: '高级',
    price: '¥599',
    category: 'strength',
    progress: 0
  },
  {
    id: 10,
    title: '居家无器械/轻器械全能健身系统课',
    description: 'ACSM居家训练指南认证的全场景居家健身课，专为没时间去健身房、租房住、出差频繁、无健身器械的人群打造，覆盖零基础到进阶全阶段，仅靠自身体重或弹力带、哑铃等轻器械。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=home%20workout%20no%20equipment%20ACSM%20certified&image_size=square',
    coach: '健身教练',
    level: '初级',
    price: '¥199',
    category: 'yoga',
    progress: 0
  }
])

// 计算筛选后的课程
const filteredCourses = computed(() => {
  let result = coursesData.value

  if (selectedCategory.value !== 'all') {
    result = result.filter(course => course.category === selectedCategory.value)
  }

  if (selectedLevel.value !== 'all') {
    const levelMap = {
      beginner: '初级',
      intermediate: '中级',
      advanced: '高级'
    }
    result = result.filter(course => course.level === levelMap[selectedLevel.value])
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(course =>
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query) ||
      course.coach.toLowerCase().includes(query)
    )
  }

  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return result.slice(start, end)
})

// 总课程数
const totalCourses = computed(() => {
  let result = coursesData.value

  if (selectedCategory.value !== 'all') {
    result = result.filter(course => course.category === selectedCategory.value)
  }

  if (selectedLevel.value !== 'all') {
    const levelMap = {
      beginner: '初级',
      intermediate: '中级',
      advanced: '高级'
    }
    result = result.filter(course => course.level === levelMap[selectedLevel.value])
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(course =>
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query) ||
      course.coach.toLowerCase().includes(query)
    )
  }

  return result.length
})

// 搜索
const search = () => {
  currentPage.value = 1
}

// 筛选
const filterCourses = () => {
  currentPage.value = 1
}

// 分页处理
const handleSizeChange = (size) => {
  pageSize.value = size
  currentPage.value = 1
}

const handleCurrentChange = (current) => {
  currentPage.value = current
}

// 跳转到课程详情
const toCourseDetail = (id) => {
  router.push(`/courses/detail/${id}`)
}

// 跳转到个人中心
const toProfile = () => {
  router.push('/profile')
}

// 退出登录
const logout = () => {
  router.push('/login')
}
</script>

<style scoped>
.course-list-container {
  min-height: 100vh;
  background-color: var(--color-bg);
}

/* 筛选部分 */
.filter-section {
  background-color: var(--color-bg-card);
  padding: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--color-border-light);
}

.filter-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
}

.search-box {
  flex: 1;
  min-width: 300px;
}

.category-filter,
.level-filter {
  min-width: 200px;
}

/* 课程列表 */
.course-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 10px;
}

.section-header h2 {
  font-size: 20px;
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-family: var(--font-display);
}

.course-count {
  font-size: 14px;
  color: var(--color-text-tertiary);
}

.continue-section {
  margin-bottom: 30px;
}

.continue-section .section-header {
  margin-top: 0;
}

.progress-ribbon {
  position: absolute;
  top: 12px;
  right: -4px;
  background: linear-gradient(135deg, #238B4D, #1B6B3A);
  color: #fff;
  padding: 4px 14px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 3px 0 0 3px;
  box-shadow: 0 2px 6px rgba(27, 107, 58, 0.3);
  z-index: 1;
}

.progress-text {
  font-size: 12px;
  color: var(--color-text-secondary);
  margin-top: 4px;
  display: block;
  text-align: right;
}

.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 30px;
}

.course-card {
  transition: all 0.3s ease;
  position: relative;
  overflow: visible;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border-light);
}

.course-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.05);
  border-color: transparent;
}

.in-progress-card {
  border: 2px solid var(--color-primary-100);
}

.in-progress-card:hover {
  border-color: var(--color-primary);
  box-shadow: 0 4px 16px rgba(27, 107, 58, 0.1);
}

.course-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.course-content h3 {
  font-size: 16px;
  margin-bottom: 10px;
  color: var(--color-text-primary);
  font-family: var(--font-display);
}

.course-description {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-bottom: 10px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.course-meta {
  font-size: 12px;
  color: var(--color-text-tertiary);
  margin-bottom: 10px;
  display: flex;
  gap: 15px;
  align-items: center;
}

.course-meta .level {
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-weight: 500;
  font-size: 11px;
}

.course-meta .level-beginner {
  background: var(--color-primary-50);
  color: var(--color-primary);
}

.course-meta .level-intermediate {
  background: var(--color-accent-50);
  color: var(--color-accent);
}

.course-meta .level-advanced {
  background: #FEF2F2;
  color: #DC2626;
}

.course-meta .price {
  color: var(--color-accent);
  font-weight: 700;
  margin-left: auto;
}

.course-progress {
  margin-bottom: 15px;
}

.enroll-btn {
  width: 100%;
}

/* 分页 */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .filter-content {
    flex-direction: column;
    align-items: stretch;
  }

  .course-grid {
    grid-template-columns: 1fr;
  }
}

.sk-card { background: var(--color-bg-card); border-radius: var(--radius-lg); overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
</style>
