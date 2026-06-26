<template>
  <div class="course-detail-container">
    <Navbar :menu-links="courseMenuLinks" />
    <!-- 课程详情 -->
    <div v-if="Object.keys(course).length > 0" class="course-detail">
      <div class="course-header">
        <div class="course-info">
          <h1>{{ course.title }}</h1>
          <div class="course-meta">
            <span class="coach">{{ course.coach }}</span>
            <span class="level">{{ course.level }}</span>
            <span class="price">{{ course.price }}</span>
          </div>
          <div class="course-description">
            <p>{{ course.description }}</p>
          </div>
          <div class="course-stats">
            <div class="stat-item">
              <el-icon><View /></el-icon>
              <span>{{ course.views }} 浏览</span>
            </div>
            <div class="stat-item">
              <el-icon><StarFilled /></el-icon>
              <span>{{ course.rating }} 评分</span>
            </div>
            <div class="stat-item">
              <el-icon><User /></el-icon>
              <span>{{ course.enrolled }} 人已报名</span>
            </div>
          </div>
          <div class="course-actions">
            <div class="action-item" :class="{ 'action-active': courseLiked }" @click="toggleCourseLike">
              <el-icon :size="22" class="action-icon" :class="{ 'like-animate': courseLiked }"><StarFilled v-if="courseLiked" /><Star v-else /></el-icon>
              <span>{{ courseLiked ? '已点赞' : '点赞' }}</span>
              <span class="action-count">{{ courseLikeCount }}</span>
            </div>
            <div class="action-item" @click="shareCourse">
              <el-icon :size="22" class="action-icon"><Share /></el-icon>
              <span>分享</span>
              <span class="action-count">{{ courseShareCount }}</span>
            </div>
            <div class="action-item" :class="{ 'action-active': courseFavorited }" @click="toggleCourseFavorite">
              <el-icon :size="22" class="action-icon"><FolderOpened v-if="courseFavorited" /><FolderAdd v-else /></el-icon>
              <span>{{ courseFavorited ? '已收藏' : '收藏' }}</span>
            </div>
            <div class="action-item action-enroll" @click="enrollCourse">
              <el-icon :size="22" class="action-icon"><CirclePlus /></el-icon>
              <span>{{ enrolled ? '已报名' : '报名参加' }}</span>
            </div>
          </div>
        </div>
        <div class="course-image">
          <img :src="course.image" :alt="course.title">
        </div>
      </div>

      <!-- 继续学习快捷入口 -->
      <div class="continue-banner" v-if="lastStudiedLesson >= 0 && !isLearning">
        <div class="continue-info">
          <el-icon :size="24"><VideoPlay /></el-icon>
          <div class="continue-text">
            <span class="continue-label">上次学到</span>
            <span class="continue-title">{{ course.syllabus[lastStudiedLesson]?.title }}</span>
          </div>
        </div>
        <el-button type="primary" size="large" @click="continueLearning">
          <el-icon><VideoPlay /></el-icon> 继续学习
        </el-button>
      </div>

      <!-- 目标人群 -->
      <div v-if="course.targetAudience" class="target-audience-section">
        <h3>精准适配人群</h3>
        <ul class="target-audience-list">
          <li v-for="(item, index) in course.targetAudience" :key="index">{{ item }}</li>
        </ul>
      </div>

      <!-- 核心专业亮点 -->
      <div v-if="course.highlights" class="highlights-section">
        <h3>核心专业亮点</h3>
        <ul class="highlights-list">
          <li v-for="(item, index) in course.highlights" :key="index">{{ item }}</li>
        </ul>
      </div>

      <!-- 学员学完交付成果 -->
      <div v-if="course.outcomes" class="outcomes-section">
        <h3>学员学完交付成果</h3>
        <ul class="outcomes-list">
          <li v-for="(item, index) in course.outcomes" :key="index">{{ item }}</li>
        </ul>
      </div>

      <!-- 学习进度 -->
      <div class="progress-section">
        <h3>学习进度</h3>
        <el-progress :percentage="courseProgress" :format="() => `${courseProgress}%`" status="success"></el-progress>
        <div class="progress-text">
          <span>已完成 {{ completedLessons }} / {{ totalLessons }} 课时</span>
        </div>
      </div>

      <!-- 课程大纲 -->
      <div class="syllabus-section">
        <h3>课程大纲</h3>
        <div class="syllabus-list">
          <div 
            v-for="(lesson, index) in course.syllabus" 
            :key="index"
            class="lesson-item"
            :class="{ 'completed': lesson.completed }"
            @click="toggleLesson(index)"
          >
            <div class="lesson-header">
              <div class="lesson-info">
                <el-checkbox v-model="lesson.completed" @change="updateProgress"></el-checkbox>
                <span class="lesson-title">{{ lesson.title }}</span>
              </div>
              <div class="lesson-duration">{{ lesson.duration }}</div>
            </div>
            <div class="lesson-content" v-if="expandedLesson === index">
              <div class="learning-panel" v-if="expandedLesson === index">
                <div class="learning-tabs">
                  <span class="learning-tab active">课程内容</span>
                </div>
                <div class="learning-body">
                  <div class="lesson-overview">
                    <h4><el-icon><Reading /></el-icon> 本节概述</h4>
                    <p>{{ lesson.description }}</p>
                  </div>
                  <div class="lesson-keypoints" v-if="getLessonContent(index).keyPoints">
                    <h4><el-icon><Star /></el-icon> 核心知识点</h4>
                    <ul>
                      <li v-for="(point, i) in getLessonContent(index).keyPoints" :key="i">
                        <span class="point-index">{{ i + 1 }}</span>
                        {{ point }}
                      </li>
                    </ul>
                  </div>
                  <div class="lesson-detail" v-if="getLessonContent(index).detail">
                    <h4><el-icon><Document /></el-icon> 详细讲解</h4>
                    <div class="detail-text" v-html="getLessonContent(index).detail"></div>
                  </div>
                  <div class="lesson-steps" v-if="getLessonContent(index).steps">
                    <h4><el-icon><List /></el-icon> 实操步骤</h4>
                    <div class="step-list">
                      <div class="step-item" v-for="(step, i) in getLessonContent(index).steps" :key="i">
                        <span class="step-number">{{ i + 1 }}</span>
                        <div class="step-content">{{ step }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="lesson-takeaway" v-if="getLessonContent(index).takeaway">
                    <h4><el-icon><CircleCheck /></el-icon> 本节要点</h4>
                    <p>{{ getLessonContent(index).takeaway }}</p>
                  </div>
                </div>
                <div class="learning-actions">
                  <el-button 
                    v-if="index > 0" 
                    @click="goToLesson(index - 1)"
                    class="nav-lesson-btn"
                  >
                    <el-icon><ArrowLeft /></el-icon> 上一课
                  </el-button>
                  <el-button 
                    type="primary" 
                    @click="completeLesson(index)"
                    :disabled="lesson.completed"
                    class="complete-btn"
                  >
                    <el-icon><CircleCheck /></el-icon>
                    {{ lesson.completed ? '已完成' : '标记完成' }}
                  </el-button>
                  <el-button 
                    v-if="index < course.syllabus.length - 1" 
                    type="success"
                    @click="goToLesson(index + 1)"
                    class="nav-lesson-btn"
                  >
                    下一课 <el-icon><ArrowRight /></el-icon>
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 教练信息 -->
      <div class="coach-section">
        <h3>教练信息</h3>
        <div class="coach-info">
          <el-avatar size="80">{{ course.coach.charAt(0) }}</el-avatar>
          <div class="coach-details">
            <h4>{{ course.coach }}</h4>
            <p>{{ coachInfo.description }}</p>
            <div class="coach-stats">
              <span>{{ coachInfo.courses }} 门课程</span>
              <span>{{ coachInfo.students }} 名学生</span>
              <span>{{ coachInfo.years }} 年经验</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 评论区 -->
      <div class="comment-section">
        <h3>学员评价</h3>
        <div class="comments">
          <div class="comment-item" v-for="comment in comments" :key="comment.id">
            <div class="comment-avatar">
              <el-avatar>{{ comment.user.charAt(0) }}</el-avatar>
            </div>
            <div class="comment-content">
              <div class="comment-header">
                <span class="comment-user">{{ comment.user }}</span>
                <span class="comment-time">{{ comment.time }}</span>
                <div class="comment-rating">
                  <el-rate v-model="comment.rating" disabled :max="5"></el-rate>
                </div>
              </div>
              <div class="comment-body">{{ comment.content }}</div>
              <div class="comment-actions">
                <span class="comment-action-item" @click="toggleCommentLike(comment.id)">
                  <el-icon :size="16" :class="{ 'comment-liked': commentLikes[comment.id] }">
                    <StarFilled v-if="commentLikes[comment.id]" /><Star v-else />
                  </el-icon>
                  <span class="comment-action-text">{{ commentLikes[comment.id] ? '已赞' : '点赞' }}</span>
                </span>
                <span class="comment-action-item" @click="startReply(comment)">
                  <el-icon :size="16"><ChatLineRound /></el-icon>
                  <span class="comment-action-text">回复</span>
                </span>
              </div>
              <div class="reply-input" v-if="replyTarget === comment.id">
                <el-input v-model="replyContent" placeholder="写下你的回复..." size="small">
                  <template #append>
                    <el-button type="primary" size="small" @click="submitReply(comment)">回复</el-button>
                  </template>
                </el-input>
                <el-button type="text" size="small" @click="replyTarget = null">取消</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="loading-container">
      <el-skeleton :rows="10" animated />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowDown, View, StarFilled, Star, User, Share, CirclePlus, ChatLineRound, VideoPlay, Reading, Document, List, CircleCheck, ArrowLeft, ArrowRight, FolderAdd, FolderOpened } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useNotifications } from '@/composables/useNotifications'
import Navbar from '@/components/Navbar.vue'
import { useAuthGuard } from '@/composables/useAuthGuard.js'

const router = useRouter()
const route = useRoute()
const { requireAuth } = useAuthGuard()

const courseMenuLinks = [
  { to: '/home', label: '首页', active: false },
  { to: '/news/list', label: '资讯', active: false },
  { to: '/courses/list', label: '课程', active: true },
  { to: '/recommendation', label: '发现', active: false }
]

const username = ref('健身爱好者')
const userAvatar = ref('')

const loadUserInfo = () => {
  try {
    const stored = localStorage.getItem('userInfo')
    if (stored) {
      const info = JSON.parse(stored)
      username.value = info.username || '健身爱好者'
      userAvatar.value = info.avatar || ''
    }
  } catch (e) {}
}

const courseLiked = ref(false)
const courseLikeCount = ref(256)
const courseFavorited = ref(false)
const courseShareCount = ref(89)
const enrolled = ref(false)

const commentLikes = ref({})
const replyTarget = ref(null)
const replyContent = ref('')

const isLearning = ref(false)
const lastStudiedLesson = ref(-1)
const expandedLesson = ref(-1)

// 课程数据
const courses = ref({
  '1': {
    id: 1,
    title: '零基础全场景健身入门系统课',
    description: 'ACSM标准认证的新手健身启蒙课，专为0基础人群打造，彻底解决"不敢进健身房、不会做动作、不会定计划、怕练错受伤"的核心痛点，覆盖居家+健身房双场景，建立科学健身的底层逻辑，从0到1搭建完整的健身知识与动作体系。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beginner%20fitness%20course%20ACSM%20certified&image_size=landscape_16_9',
    coach: '健身教练',
    level: '初级',
    price: '¥299',
    views: 3456,
    rating: 4.9,
    enrolled: 1234,
    syllabus: [
      {
        title: '健身认知底层模块（3课时）',
        description: '健身核心原理、增肌减脂的底层逻辑、训练术语全解析、新手避坑红线、健身房器械全认知、居家训练替代方案',
        duration: '45分钟',
        completed: false
      },
      {
        title: '动作模式筑基模块（8课时）',
        description: '人体五大动作模式（推/拉/蹲/髋铰链/核心稳定）全拆解，从呼吸模式、关节活动度、发力感建立，到每个动作的标准细节、错误纠正、退阶/进阶方案，覆盖健身房固定器械、自由重量、居家无器械全动作',
        duration: '120分钟',
        completed: false
      },
      {
        title: '训练计划制定模块（4课时）',
        description: 'ACSM新手训练计划设计原则，每周3练/4练分化计划模板、渐进超负荷的新手友好执行方案、居家/健身房计划适配、训练容量/强度的精准把控',
        duration: '60分钟',
        completed: false
      },
      {
        title: '新手营养核心模块（3课时）',
        description: 'ISSN新手营养指南，三大营养素计算、增肌/减脂饮食模板、外卖/食堂饮食适配、补剂的新手选择（仅推荐循证有效补剂）、无节食的饮食方案',
        duration: '45分钟',
        completed: false
      },
      {
        title: '恢复与安全管理模块（3课时）',
        description: '睡眠对健身的影响、新手疲劳管理、热身/冷身的标准流程、运动损伤的预防与应急处理、训练平台期的初级解决方案',
        duration: '45分钟',
        completed: false
      },
      {
        title: '长期习惯养成模块（3课时）',
        description: '健身目标设定、训练记录方法、新手常见心态问题解决、长期坚持的行为技巧、健身与日常生活的平衡',
        duration: '45分钟',
        completed: false
      }
    ],
    targetAudience: [
      '完全无健身经验，从未进过健身房的纯新手',
      '碎片化练过但动作不标准、无系统体系的入门人群',
      '怕练错受伤、怕练壮、不知道从何开始的健身小白',
      '居家/健身房双场景都有训练需求的人群'
    ],
    highlights: [
      '全程遵循ACSM《新手抗阻训练实践指南》，拒绝"网红动作"，所有动作均有循证支撑，无任何无效训练内容',
      '双场景适配，每一个动作都同步讲解健身房版本+居家无器械版本，无需受场地限制',
      '配套动作纠错库，覆盖新手90%以上的动作错误，一对一式纠正，从根源避免运动损伤'
    ],
    outcomes: [
      '完全掌握健身核心逻辑，能独立看懂所有训练计划，不再被碎片化健身信息误导',
      '熟练掌握20+核心健身动作的标准执行，能精准找到目标肌群发力感，规避错误动作',
      '能根据自身目标，独立制定适配居家/健身房的个性化训练计划与饮食方案',
      '建立科学的健身习惯，顺利度过新手福利期，实现增肌/减脂/体态改善的初始目标'
    ]
  },
  '2': {
    id: 2,
    title: '办公族体态矫正与慢性疼痛缓解系统课',
    description: '国际骨科物理治疗学会（IOPTA）认证的循证体态矫正课，专为久坐办公族打造，针对性解决圆肩驼背、头前伸、高低肩、骨盆前倾/后倾、腰椎曲度异常等上/下交叉综合征，同步缓解颈肩腰慢性疼痛，从根源矫正体态，建立终身受益的姿势管理体系。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=office%20worker%20posture%20correction%20pain%20relief&image_size=landscape_16_9',
    coach: '物理治疗师',
    level: '初级',
    price: '¥199',
    views: 2890,
    rating: 4.8,
    enrolled: 987,
    syllabus: [
      {
        title: '体态评估与根源拆解模块（3课时）',
        description: '全身体态居家自测方法、上/下交叉综合征的病理机制、慢性疼痛的根源诱因、个人体态问题精准定位、个性化矫正目标制定',
        duration: '45分钟',
        completed: false
      },
      {
        title: '关节活动度解锁模块（4课时）',
        description: '胸椎、颈椎、肩关节、髋关节、踝关节的活动度改善训练，针对久坐导致的关节僵硬，配套分阶跟练，打破体态矫正的生理限制',
        duration: '60分钟',
        completed: false
      },
      {
        title: '失衡肌肉精准干预模块（6课时）',
        description: '紧张肌群的科学放松（拒绝无效拉伸）、薄弱肌群的精准激活，针对圆肩驼背/头前伸/高低肩/骨盆问题的专属矫正动作，每一个动作都标注发力要点、退阶/进阶方案、禁忌事项',
        duration: '90分钟',
        completed: false
      },
      {
        title: '核心稳定与姿势整合模块（4课时）',
        description: '功能性核心稳定训练、日常姿势的肌肉记忆建立、办公/居家/行走/睡眠的姿势管理标准、久坐间隙的碎片化矫正跟练',
        duration: '60分钟',
        completed: false
      },
      {
        title: '长效维持与疼痛预防模块（3课时）',
        description: '慢性疼痛的应急缓解方案、体态矫正后的长效维持计划、健身训练中的体态适配、预防体态反弹的日常习惯养成',
        duration: '45分钟',
        completed: false
      }
    ],
    targetAudience: [
      '每日久坐≥6小时的办公族、学生党、低头族',
      '存在圆肩驼背、头前伸、高低肩、骨盆不正等体态问题，影响外观与气质的人群',
      '长期受颈肩僵硬、腰酸背痛、富贵包、手臂麻木等慢性疼痛困扰的人群',
      '健身训练中因体态问题导致发力异常、训练效果差的人群'
    ],
    highlights: [
      '全程遵循IOPTA《上/下交叉综合征临床康复指南》，拒绝"单纯拉伸"的无效矫正，采用"活动度解锁-失衡干预-稳定整合"的循证矫正体系，4周即可看到显著改善',
      '所有动作均可居家完成，无需任何器械，碎片化时间即可跟练，适配办公族的时间特点',
      '针对颈肩腰慢性疼痛，配套专属应急跟练视频，5分钟即可缓解不适，兼顾长期矫正与即时缓解'
    ],
    outcomes: [
      '精准定位自身体态问题，彻底搞懂体态异常的根源，不再被无效矫正方法误导',
      '熟练掌握全身体态矫正的完整体系，实现圆肩驼背、头前伸、骨盆不正等问题的显著改善',
      '从根源缓解颈肩腰慢性疼痛，摆脱僵硬、麻木、酸痛的久坐后遗症',
      '建立终身受益的姿势管理体系，养成健康的日常姿势习惯，杜绝体态问题反弹'
    ]
  },
  '3': {
    id: 3,
    title: '女性全生命周期专属健身系统课',
    description: 'ACSM女性运动分会认证的女性专属健身课，覆盖女性青春期、经期、备孕期、孕产期、产后恢复期、更年期全生命周期，顺应女性生理特点与激素变化，打造适配女性的增肌、减脂、体态、健康管理方案，拒绝"男性化训练"，解决女性健身的专属痛点。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=female%20fitness%20lifecycle%20ACSM%20certified&image_size=landscape_16_9',
    coach: '女性健身专家',
    level: '中级',
    price: '¥399',
    views: 4234,
    rating: 4.9,
    enrolled: 1567,
    syllabus: [
      {
        title: '女性健身底层逻辑模块（3课时）',
        description: '女性生理结构与激素变化规律、女性与男性健身的核心差异、女性增肌不壮、减脂不垮脸的核心原则、女性健身的避坑红线',
        duration: '45分钟',
        completed: false
      },
      {
        title: '月经周期同步训练与营养模块（6课时）',
        description: '月经期/卵泡期/排卵期/黄体期的激素特点、分周期训练计划设计、分周期饮食方案、经期不适的运动改善方案、多囊卵巢综合征（PCOS）的专属运动营养方案',
        duration: '90分钟',
        completed: false
      },
      {
        title: '女性身材雕刻核心模块（7课时）',
        description: '针对女性假胯宽、妈妈臀、臀部扁平、副乳、拜拜肉、腰腹赘肉的专属训练方案，循证有效的蜜桃臀、马甲线、直角肩雕刻体系，拒绝无效网红动作，兼顾塑形与关节健康',
        duration: '105分钟',
        completed: false
      },
      {
        title: '孕产全周期运动管理模块（6课时）',
        description: '备孕期的备孕优化运动方案、孕期分阶段（早/中/晚）安全训练计划、产后42天-6个月黄金恢复期修复方案、产后腹直肌分离/盆底肌松弛的循证康复训练、产后身材恢复的科学方案',
        duration: '90分钟',
        completed: false
      },
      {
        title: '更年期女性健康运动模块（4课时）',
        description: '更年期激素变化特点、抗阻训练对更年期综合征的改善方案、骨密度提升训练、心血管健康优化、潮热失眠的运动干预方案',
        duration: '60分钟',
        completed: false
      },
      {
        title: '女性专属营养与健康模块（4课时）',
        description: '女性全周期营养需求、铁/钙/叶酸等关键营养素的补充方案、减脂期的皮肤与头发保护、女性补剂的循证推荐、乳腺健康/妇科健康的运动适配',
        duration: '60分钟',
        completed: false
      }
    ],
    targetAudience: [
      '全年龄段有健身需求的女性，尤其是关注生理健康、怕练壮、减脂不垮脸、增肌不夸张的女性',
      '经期存在痛经、乏力、情绪波动，想通过运动改善的女性',
      '备孕期、孕产期、产后恢复期，想科学运动的女性',
      '更年期出现潮热、失眠、骨量下降、情绪波动，想通过运动改善的女性',
      '反复减脂反弹、臀部扁平、假胯宽、马甲线难出的女性'
    ],
    highlights: [
      '全程遵循ACSM《女性运动健康指南》与ISSN女性运动营养立场文件，完全适配女性生理特点，拒绝照搬男性训练计划，兼顾塑形效果与女性生理健康',
      '覆盖女性全生命周期，一套课程适配女性不同人生阶段的健身需求，无需重复学习',
      '针对女性最关注的身材痛点，打造循证塑形体系，拒绝"无效卷腹""深蹲伤膝"等网红误区，安全高效打造理想身材'
    ],
    outcomes: [
      '彻底搞懂女性健身的底层逻辑，顺应生理周期科学训练，不再盲目跟风男性化训练计划',
      '熟练掌握适配自身人生阶段的训练与饮食方案，实现身材雕刻、经期不适改善、孕产安全管理、更年期症状缓解的核心目标',
      '解决假胯宽、妈妈臀、拜拜肉、腰腹赘肉等女性专属身材痛点，打造紧致不夸张的女性线条',
      '建立终身受益的女性健康管理体系，通过运动优化激素水平、提升骨密度、改善妇科与乳腺健康'
    ]
  },
  '4': {
    id: 4,
    title: '中老年抗阻健康与机能提升系统课',
    description: '基于《柳叶刀》中老年运动研究与ACSM中老年抗阻训练指南打造的专属课程，专为45岁以上中老年人群设计，以安全为第一原则，核心解决肌少症预防、骨密度提升、三高管控、心肺功能优化、日常活动能力提升，帮助中老年人群通过科学健身延缓衰老、降低慢病风险、提升生活质量。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=senior%20fitness%20resistance%20training%20lancet%20study&image_size=landscape_16_9',
    coach: '老年健康专家',
    level: '初级',
    price: '¥299',
    views: 2567,
    rating: 4.8,
    enrolled: 890,
    syllabus: [
      {
        title: '中老年健身安全筑基模块（4课时）',
        description: '中老年人生理特点、健身的核心获益、安全训练红线、慢病人群的运动禁忌、训练前的健康评估、热身/冷身的专属标准流程',
        duration: '60分钟',
        completed: false
      },
      {
        title: '居家无器械抗阻训练模块（8课时）',
        description: '针对中老年人群的下肢、上肢、核心、肩背肌群的安全抗阻训练，每一个动作都标注标准细节、发力要点、退阶方案、禁忌事项，全程无跳跃、无大负重、无关节压力，居家椅子即可完成',
        duration: '120分钟',
        completed: false
      },
      {
        title: '机能提升专项模块（5课时）',
        description: '平衡能力训练（预防跌倒）、心肺功能优化训练、关节活动度改善训练、柔韧性提升训练、日常生活动作能力强化（爬楼梯、搬东西、抱孩子等）',
        duration: '75分钟',
        completed: false
      },
      {
        title: '中老年慢病运动干预模块（4课时）',
        description: '高血压、高血脂、糖尿病、骨质疏松、膝关节退变的循证运动方案、运动中的风险管控、血糖/血压的监测方法、不同慢病的饮食适配',
        duration: '60分钟',
        completed: false
      },
      {
        title: '长效健康管理模块（4课时）',
        description: '中老年人群的训练计划制定、每周训练安排、疲劳与恢复管理、营养补充方案（蛋白质/钙/维生素D等关键营养素）、长期坚持的习惯养成、家庭互动健身方案',
        duration: '60分钟',
        completed: false
      }
    ],
    targetAudience: [
      '45岁以上，无运动基础或运动经验较少的中老年人群',
      '存在肌肉流失、四肢无力、走路不稳、平衡能力下降的人群',
      '有高血压、高血脂、糖尿病、骨质疏松等慢病，想通过运动科学管控的人群',
      '想预防肌少症、延缓衰老、提升日常活动能力的中老年人群',
      '关节退变、腰腿痛，想通过安全运动改善关节功能的人群'
    ],
    highlights: [
      '全程遵循《柳叶刀》中老年运动研究结论与ACSM《中老年抗阻训练指南》，所有动作均经过临床验证，安全零风险，无任何不适合中老年人群的高难度动作',
      '全程居家可练，无需任何器械，一把椅子即可完成所有训练，适配中老年人群的活动场景',
      '慢动作跟练+语音提示，节奏舒缓，细节讲解清晰，无需担心跟不上，同时配套家属陪护指南，兼顾训练效果与安全'
    ],
    outcomes: [
      '熟练掌握中老年安全健身的完整体系，能独立制定适合自身的训练计划，规避运动风险',
      '有效提升肌肉量、预防肌少症，提升平衡能力与日常活动能力，降低跌倒风险',
      '科学管控高血压、高血脂、糖尿病、骨质疏松等慢病，改善身体机能，降低全因死亡率',
      '建立终身受益的运动习惯，通过科学健身延缓衰老、提升睡眠质量、改善情绪状态，提高生活质量'
    ]
  },
  '5': {
    id: 5,
    title: '自然训练者增肌突破系统课',
    description: 'NSCA抗阻训练分会认证的进阶增肌课，专为有1年以上训练经验、陷入增肌平台期的自然训练者打造，彻底打破"新手福利期后不再长肌肉"的困境，基于自然训练者的生理特点，打造周期化增肌体系，最大化自然极限内的肌肉生长，拒绝药物相关内容，纯自然循证增肌。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=natural%20bodybuilding%20muscle%20growth%20NSCA&image_size=landscape_16_9',
    coach: '健身教练',
    level: '高级',
    price: '¥499',
    views: 3890,
    rating: 4.9,
    enrolled: 1123,
    syllabus: [
      {
        title: '自然增肌底层逻辑重构模块（4课时）',
        description: '自然训练者与用药训练者的核心差异、肌肥大的三大机制（机械张力/代谢压力/肌肉损伤）、自然训练的增肌极限测算、平台期的根源判断、增肌避坑红线',
        duration: '60分钟',
        completed: false
      },
      {
        title: '渐进超负荷的高阶执行体系模块（5课时）',
        description: '自然训练者渐进超负荷的7大核心维度（不止是加重量）、不同进阶阶段的超负荷策略、容量与强度的平衡、避免过度训练的管控方法、平台期的超负荷突破方案',
        duration: '75分钟',
        completed: false
      },
      {
        title: '周期化增肌训练计划设计模块（7课时）',
        description: 'NSCA周期化训练原则、积累期/强化期/减载期的分阶段计划设计、推拉腿/上下肢/全身分化的高阶适配、不同肌群的专项训练安排、弱势肌群的优先强化策略、训练记录与计划动态调整方法',
        duration: '105分钟',
        completed: false
      },
      {
        title: '不同肌群的高阶肌肥大训练模块（6课时）',
        description: '胸/背/肩/手臂/腿/核心六大肌群的解剖特点、肌纤维分布、高阶训练动作选择、发力技巧优化、不同肌群的容量与频率适配、细节雕刻方案，解决胸肌中缝、背阔肌宽度、肩部3D感、腿部分离度等进阶痛点',
        duration: '90分钟',
        completed: false
      },
      {
        title: '自然增肌的循证营养体系模块（4课时）',
        description: 'ISSN自然增肌营养立场文件、增肌期热量与宏量营养素计算、热量盈余的精准把控、围度期与减脂期的营养切换、蛋白质的时序与摄入优化、肌酸等补剂的高阶使用方法、脏增肌的规避方案',
        duration: '60分钟',
        completed: false
      },
      {
        title: '恢复管理与增肌效率优化模块（2课时）',
        description: '自然训练者的恢复核心逻辑、睡眠对肌肥大的影响、疲劳监测与管理、减载周的科学安排、神经疲劳的恢复方案、激素水平的自然优化',
        duration: '30分钟',
        completed: false
      }
    ],
    targetAudience: [
      '有1年以上系统抗阻训练经验，度过新手福利期，陷入增肌平台期的自然训练者',
      '训练计划混乱、渐进超负荷执行不到位，肌肉增长停滞的健身爱好者',
      '想突破自然增肌极限，优化肌肉形态、提升肌肉饱满度与分离度的训练者',
      '拒绝药物，想通过纯自然科学训练实现增肌目标的人群'
    ],
    highlights: [
      '全程基于NSCA《自然训练者抗阻训练共识》，完全适配自然训练者的生理特点，拒绝照搬职业运动员的用药训练计划，所有内容均有循证支撑，最大化自然增肌效率',
      '彻底拆解增肌平台期的根源问题，提供可落地的突破方案，解决90%进阶训练者的增肌停滞困境',
      '配套不同训练年限、不同训练频率的完整周期化训练计划模板，可直接套用，同时支持个性化调整'
    ],
    outcomes: [
      '彻底重构自然增肌的底层认知，不再被碎片化训练信息误导，精准避开自然训练的核心坑点',
      '熟练掌握周期化增肌计划的设计方法，能根据自身情况动态调整训练计划，实现持续的肌肉生长',
      '突破增肌平台期，优化全身肌群的形态与饱满度，补齐弱势肌群，接近自身自然增肌极限',
      '建立完整的增肌训练-营养-恢复体系，实现长期可持续的自然增肌，远离过度训练与运动损伤'
    ]
  },
  '6': {
    id: 6,
    title: '科学减脂不反弹系统课',
    description: 'ISSN减脂立场文件认证的循证减脂课，专为反复减肥反弹、减脂进入平台期、怕减脂掉肌肉、怕极端节食伤身体的人群打造，摒弃"节食减肥""疯狂有氧"的错误方法，以"行为改变+循证营养+科学训练"为核心，实现健康减脂不反弹，建立终身体重管理体系。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=scientific%20fat%20loss%20ISSN%20certified&image_size=landscape_16_9',
    coach: '减脂专家',
    level: '中级',
    price: '¥399',
    views: 4567,
    rating: 4.9,
    enrolled: 1678,
    syllabus: [
      {
        title: '减脂底层逻辑与反弹根源拆解模块（3课时）',
        description: '能量平衡的核心原理、基础代谢的影响因素、减脂反弹的核心机制、体脂率的科学测算、减脂目标的合理制定、减脂避坑红线（极端节食、过度有氧、利尿剂/泻药等）',
        duration: '45分钟',
        completed: false
      },
      {
        title: '循证减脂营养体系模块（7课时）',
        description: 'ISSN减脂营养指南、热量缺口的科学设置（不挨饿的缺口计算）、三大营养素的精准配比、减脂期蛋白质的摄入优化、碳水循环的科学执行、膳食纤维与微量营养素的补充、外卖/聚餐/食堂的减脂饮食适配、欺骗餐的正确用法',
        duration: '105分钟',
        completed: false
      },
      {
        title: '减脂期的科学训练体系模块（6课时）',
        description: '抗阻训练在减脂中的核心作用（保住肌肉、提升代谢）、减脂期抗阻训练计划设计、有氧训练的科学选择（HIIT vs 稳态有氧）、有氧与抗阻的搭配方案、大体重人群的低冲击训练方案、居家/健身房减脂训练计划模板',
        duration: '90分钟',
        completed: false
      },
      {
        title: '减脂平台期突破模块（3课时）',
        description: '平台期的根源判断、代谢适应的解决方案、热量缺口的动态调整、训练计划的优化、减脂停滞的进阶突破方法、体重波动的科学解读',
        duration: '45分钟',
        completed: false
      },
      {
        title: '减脂期的恢复与健康管理模块（3课时）',
        description: '减脂期的睡眠管理、激素水平优化、肠道健康对减脂的影响、皮肤松弛的预防方案、减脂期脱发/姨妈紊乱的解决方法、运动损伤的预防',
        duration: '45分钟',
        completed: false
      },
      {
        title: '体重维持与终身管理模块（4课时）',
        description: '减脂后的热量逆调整、体脂率的长效维持、饮食与训练的长期平衡、暴饮暴食的行为干预、体重反弹的预警与应对、终身体重管理的习惯养成',
        duration: '60分钟',
        completed: false
      }
    ],
    targetAudience: [
      '反复减肥反弹，陷入"减脂-复胖"恶性循环的人群',
      '减脂进入平台期，体重不再下降，不知道如何突破的人群',
      '怕减脂掉肌肉、减脂垮脸、皮肤松弛，想实现紧致减脂的人群',
      '不想极端节食、不想疯狂有氧，想健康可持续减脂的人群',
      '大体重基数，想安全减脂、降低慢病风险的人群'
    ],
    highlights: [
      '全程遵循ISSN《减脂与体重管理立场文件》，摒弃极端减脂方法，以健康可持续为核心，从根源解决减脂反弹的问题',
      '兼顾减脂效果与肌肉保留，实现"减脂不垮脸、减脂不掉肌"，打造紧致有线条的身材，而非单纯的体重下降',
      '融入行为心理学内容，解决减脂中的暴饮暴食、心态崩溃、难以坚持等核心问题，不仅教减脂方法，更教终身体重管理的能力'
    ],
    outcomes: [
      '彻底搞懂减脂的底层逻辑，不再被网红减肥法、极端减脂方案误导，精准避开减脂坑点',
      '熟练掌握循证减脂的营养与训练体系，能根据自身情况制定个性化减脂方案，实现健康可持续的体脂率下降',
      '突破减脂平台期，解决反复减肥反弹的核心痛点，实现减脂后长效维持',
      '建立终身受益的体重管理体系，养成健康的饮食与运动习惯，彻底摆脱"减脂-复胖"的恶性循环'
    ]
  },
  '7': {
    id: 7,
    title: '健身房常见运动损伤循证康复系统课',
    description: '《Journal of Orthopaedic & Sports Physical Therapy》（JOSPT）临床指南认证的运动康复课，专为健身人群打造，针对性解决健身房最高发的肩、膝、腰、肘、踝五大部位运动损伤，采用分阶段循证康复方案，实现从急性期缓解、功能重建到重返训练的全流程管理，同时教授损伤预防方法，从根源降低运动损伤风险。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sports%20injury%20rehabilitation%20JOSPT%20guidelines&image_size=landscape_16_9',
    coach: '物理治疗师',
    level: '中级',
    price: '¥299',
    views: 3210,
    rating: 4.8,
    enrolled: 987,
    syllabus: [
      {
        title: '运动损伤康复底层逻辑模块（3课时）',
        description: '运动损伤的病理机制、炎症反应的科学解读、循证康复的核心原则、康复的禁忌红线、损伤严重程度的居家判断、何时需要就医',
        duration: '45分钟',
        completed: false
      },
      {
        title: '肩关节损伤康复模块（6课时）',
        description: '肩峰下撞击综合征、肩袖损伤、肩关节不稳、肱二头肌长头腱炎的康复方案，分急性期/亚急性期/力量重建期/重返训练期4个阶段，配套专属康复动作、禁忌事项、训练适配方案',
        duration: '90分钟',
        completed: false
      },
      {
        title: '膝关节损伤康复模块（6课时）',
        description: '髌股疼痛综合征、半月板损伤、前后交叉韧带术后康复、髌腱炎的循证康复方案，分阶段康复训练、膝关节稳定肌强化、动作模式重建、深蹲/硬拉等动作的重返适配',
        duration: '90分钟',
        completed: false
      },
      {
        title: '腰椎损伤康复模块（5课时）',
        description: '腰椎间盘突出症、腰肌劳损、腰椎小关节紊乱的康复方案，核心稳定重建、神经张力缓解、分阶段康复训练、日常姿势管理、硬拉/深蹲等负重动作的重返适配',
        duration: '75分钟',
        completed: false
      },
      {
        title: '肘/踝关节损伤康复模块（4课时）',
        description: '网球肘、高尔夫球肘、踝关节扭伤、踝关节不稳的康复方案，分阶段康复训练、关节稳定强化、推拉动作/跳跃动作的重返适配',
        duration: '60分钟',
        completed: false
      },
      {
        title: '重返训练体系模块（4课时）',
        description: '损伤后重返训练的判断标准、训练负荷的渐进回归、动作模式的纠错与重建、二次损伤的预防、不同损伤的训练计划适配',
        duration: '60分钟',
        completed: false
      },
      {
        title: '运动损伤预防体系模块（4课时）',
        description: '健身房常见损伤的根源诱因、热身/冷身的损伤预防方案、训练中的风险管控、动作模式的优化、疲劳管理与损伤预防、关节健康的长期维护',
        duration: '60分钟',
        completed: false
      }
    ],
    targetAudience: [
      '健身训练中出现肩峰下撞击综合征、肩袖损伤、网球肘、髌股疼痛综合征、腰椎间盘突出、踝关节扭伤等常见运动损伤的人群',
      '训练后长期受关节疼痛、肌肉拉伤、发力异常困扰，无法正常训练的人群',
      '损伤后想通过科学康复重返健身房，避免二次损伤的健身爱好者',
      '想学习运动损伤预防知识，降低训练中损伤风险的人群',
      '健身教练、运动康复从业者，想提升循证康复专业能力的人群'
    ],
    highlights: [
      '全程遵循JOSPT骨科与运动物理治疗临床指南，所有康复方案均经过高质量随机对照试验验证，循证等级高，拒绝"偏方式康复"，安全有效',
      '采用"急性期控制-功能重建-力量强化-重返训练"的全流程分阶段方案，适配损伤恢复的不同阶段，避免康复不足或过度康复导致的二次损伤',
      '针对健身人群的核心需求，重点讲解损伤后如何重返健身房、如何调整训练计划、如何避免再次受伤，而非单纯的疼痛缓解，适配健身爱好者的训练需求'
    ],
    outcomes: [
      '精准掌握健身房常见运动损伤的病理机制与康复方法，能根据自身损伤情况制定个性化康复方案',
      '实现损伤部位的疼痛缓解、功能重建，逐步恢复正常训练能力，安全重返健身房',
      '彻底搞懂运动损伤的根源诱因，优化训练动作模式，从根源降低运动损伤风险',
      '建立完整的运动损伤预防与康复管理体系，能应对训练中常见的损伤问题，延长运动寿命'
    ]
  },
  '8': {
    id: 8,
    title: '功能性训练与综合运动表现提升系统课',
    description: 'NSCA功能性训练分会认证的专项提升课，专为球类运动、跑步、滑雪、户外等运动爱好者，以及想提升日常活动能力、身体综合机能的人群打造，摒弃"孤立练肌肉"的传统模式，以"动作模式优化、核心稳定、爆发力、敏捷性、平衡能力、心肺耐力"为核心，全面提升综合运动表现，同时预防运动损伤。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=functional%20training%20sports%20performance%20NSCA&image_size=landscape_16_9',
    coach: '健身教练',
    level: '高级',
    price: '¥399',
    views: 3678,
    rating: 4.9,
    enrolled: 1056,
    syllabus: [
      {
        title: '功能性训练底层逻辑模块（3课时）',
        description: '功能性训练的核心定义、与传统健美训练的差异、人体动作链的原理、运动表现的核心影响因素、功能性训练的避坑红线',
        duration: '45分钟',
        completed: false
      },
      {
        title: '核心稳定与动作模式优化模块（6课时）',
        description: '功能性核心的"抗形变"能力训练（抗伸展/抗旋转/抗侧屈）、呼吸模式重建、人体七大基础动作模式的优化、关节活动度与灵活性平衡、动作链的协同发力训练',
        duration: '90分钟',
        completed: false
      },
      {
        title: '爆发力与力量输出提升模块（5课时）',
        description: '爆发力的生理机制、快速伸缩复合训练（跳箱、波比跳、药球训练）、奥林匹克举的基础变式、下肢/上肢/全身爆发力训练、不同运动项目的爆发力适配',
        duration: '75分钟',
        completed: false
      },
      {
        title: '敏捷性、速度与平衡能力模块（5课时）',
        description: '敏捷梯训练、变向与启动速度训练、反应能力训练、静态/动态平衡能力训练、本体感觉强化、不同运动项目的敏捷性适配',
        duration: '75分钟',
        completed: false
      },
      {
        title: '专项运动表现提升模块（5课时）',
        description: '球类运动（篮球/足球/羽毛球/网球）、耐力运动（跑步/骑行）、冰雪运动（滑雪/滑冰）、户外登山的专属功能性训练计划、专项动作模式优化、专项损伤预防',
        duration: '75分钟',
        completed: false
      },
      {
        title: '周期化功能性训练计划设计模块（4课时）',
        description: '非赛季/赛季前/赛中/赛后的周期化训练安排、功能性训练与力量训练/有氧训练的搭配、训练负荷与恢复管理、训练效果的监测与评估、长期运动表现提升的计划制定',
        duration: '60分钟',
        completed: false
      }
    ],
    targetAudience: [
      '篮球、足球、羽毛球、网球、排球等球类运动爱好者，想提升赛场表现、预防运动损伤的人群',
      '跑步、骑行、滑雪、登山、户外等运动爱好者，想提升运动耐力、爆发力、平衡能力的人群',
      '想提升日常活动能力、身体灵活性、反应速度，摆脱"健身有力气，日常用不上"困境的健身爱好者',
      '想优化动作模式、提升身体控制能力、降低日常与运动中损伤风险的人群'
    ],
    highlights: [
      '全程遵循NSCA《功能性训练与运动表现提升指南》，所有训练内容均针对运动表现提升设计，适配不同专项运动的需求，拒绝"网红功能性动作"，所有训练均有循证支撑',
      '兼顾日常活动能力与专项运动表现，不仅能提升运动赛场表现，还能优化日常生活动作能力，让身体更灵活、更可控',
      '配套不同专项运动的专属训练计划，可直接套用，同时支持个性化调整，适配不同运动爱好者的需求'
    ],
    outcomes: [
      '彻底掌握功能性训练的底层逻辑，优化全身动作模式，提升身体控制能力与协同发力能力',
      '全面提升爆发力、敏捷性、平衡能力、反应速度与心肺耐力，实现综合运动表现的显著提升',
      '熟练掌握适配自身专项运动的功能性训练方案，优化专项动作，预防专项运动损伤',
      '能根据自身运动目标，独立制定周期化功能性训练计划，实现长期可持续的运动表现提升'
    ]
  },
  '9': {
    id: 9,
    title: 'IFBB标准健美健体备赛全周期系统课',
    description: 'IFBB职业联盟运动营养分会认证的竞技备赛课，专为有3年以上系统训练经验、想参加健美/健体/比基尼赛事的自然训练者打造，覆盖非赛季增肌、赛前减脂、脱水充碳、造型训练、赛后恢复的全备赛周期，严格遵循IFBB赛事标准，打造专业级备赛体系，帮助选手在赛场上呈现最佳状态。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bodybuilding%20competition%20prep%20IFBB%20certified&image_size=landscape_16_9',
    coach: 'IFBB教练',
    level: '高级',
    price: '¥599',
    views: 2890,
    rating: 4.9,
    enrolled: 789,
    syllabus: [
      {
        title: '竞技备赛底层逻辑模块（3课时）',
        description: 'IFBB健美/健体/古典/比基尼赛事评分标准、自然选手备赛的核心原则、备赛周期的合理规划、非赛季与赛季的衔接、自然选手备赛的避坑红线（药物、极端脱水、利尿剂等）',
        duration: '45分钟',
        completed: false
      },
      {
        title: '非赛季增肌与基础搭建模块（5课时）',
        description: '竞技选手非赛季周期化增肌计划设计、肌肉形态与比例优化、弱势肌群补齐、非赛季营养体系、体脂率管控、训练痕迹的打磨、非赛季与赛季的过渡方案',
        duration: '75分钟',
        completed: false
      },
      {
        title: '赛前减脂全周期体系模块（8课时）',
        description: '备赛周期的时长规划、热量缺口的渐进设置、宏量营养素的分阶段调整、碳水循环/脂肪循环的科学执行、减脂期的抗阻训练计划设计、有氧训练的精准把控、肌肉保留的核心策略、减脂平台期的突破方案',
        duration: '120分钟',
        completed: false
      },
      {
        title: '赛前末期峰值管理模块（7课时）',
        description: '赛前7天碳水耗竭与钠负荷方案、赛前48小时水钠管理、赛前24小时精准充碳方案、避免"充碳变充水"的核心细节、电解质平衡管理、不同项目选手的充碳差异、峰值状态的精准把控',
        duration: '105分钟',
        completed: false
      },
      {
        title: '赛事造型与舞台表现模块（6课时）',
        description: 'IFBB标准规定动作全拆解、健体/健美/古典/比基尼的专属造型技巧、个人优势展示与弱势遮挡、造型训练计划、音乐与台风把控、赛前热身与状态激活、赛场应急方案',
        duration: '90分钟',
        completed: false
      },
      {
        title: '赛后恢复与反向 dieting 模块（4课时）',
        description: '赛后身体状态评估、饮食的渐进恢复、训练计划的调整、体脂率的长效管控、避免赛后快速复胖的核心策略、肌肉量的保留、下一次备赛的周期规划',
        duration: '60分钟',
        completed: false
      },
      {
        title: '备赛期健康管理与风险防控模块（2课时）',
        description: '备赛期激素水平管理、睡眠优化、心血管健康管控、肠道健康维护、运动损伤的预防与康复、备赛期心理状态调整、极端备赛方法的风险警示',
        duration: '30分钟',
        completed: false
      }
    ],
    targetAudience: [
      '有3年以上系统抗阻训练经验，有一定肌肉量基础，想参加健美/健体/男子古典/女子比基尼赛事的自然训练者',
      '有过备赛经历，但状态不佳、充碳失败、赛场表现不好，想优化备赛体系的参赛选手',
      '想系统学习竞技健美备赛知识，提升专业能力的健身教练、备赛营养师',
      '想了解职业健美备赛逻辑，突破自身训练瓶颈的高阶健身爱好者'
    ],
    highlights: [
      '全程遵循IFBB职业联盟《自然选手备赛共识》，所有内容均针对自然训练者设计，拒绝药物相关内容，规避极端备赛的健康风险，同时最大化赛场状态',
      '覆盖备赛全周期，从非赛季基础搭建到赛后恢复，一套课程搞定完整备赛流程，无需碎片化学习',
      '拆解了备赛中最核心的脱水充碳、造型训练、肌肉保留等难点问题，提供可落地的执行方案，解决新手备赛的核心痛点'
    ],
    outcomes: [
      '彻底掌握IFBB标准竞技备赛的完整体系，能根据自身情况制定全周期备赛计划，精准把控备赛节奏',
      '熟练掌握赛前减脂、峰值管理、脱水充碳的核心技巧，避免充碳失败、状态崩盘，在赛场上呈现最佳状态',
      '精通IFBB赛事标准规定动作，打造专属个人造型，最大化展示自身优势，提升赛场评分',
      '掌握赛后恢复与长效管理方案，避免赛后快速复胖与肌肉流失，实现长期可持续的竞技生涯发展'
    ]
  },
  '10': {
    id: 10,
    title: '居家无器械/轻器械全能健身系统课',
    description: 'ACSM居家训练指南认证的全场景居家健身课，专为没时间去健身房、租房住、出差频繁、无健身器械的人群打造，覆盖零基础到进阶全阶段，仅靠自身体重或弹力带、哑铃等轻器械，实现增肌、减脂、塑形、心肺提升、体态改善的全目标，打造不受场地、器械、时间限制的居家健身体系。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=home%20workout%20no%20equipment%20ACSM%20certified&image_size=landscape_16_9',
    coach: '健身教练',
    level: '初级',
    price: '¥199',
    views: 4123,
    rating: 4.8,
    enrolled: 1456,
    syllabus: [
      {
        title: '居家健身底层逻辑模块（3课时）',
        description: '无器械健身的核心原理、自身体重训练的增肌/减脂逻辑、居家训练的场地与器械准备、居家训练的避坑红线、训练目标的合理制定',
        duration: '45分钟',
        completed: false
      },
      {
        title: '零基础居家动作筑基模块（6课时）',
        description: '居家无器械核心动作全拆解，覆盖推/拉/蹲/髋铰链/核心稳定五大动作模式，每一个动作都标注标准细节、发力要点、退阶/进阶方案、错误纠正，从零基础到进阶全覆盖',
        duration: '90分钟',
        completed: false
      },
      {
        title: '居家增肌塑形系统模块（4课时）',
        description: '无器械/轻器械增肌的渐进超负荷执行方案、全身肌群居家塑形训练、蜜桃臀/马甲线/直角肩/薄背居家雕刻、分阶段增肌训练计划、弹力带/哑铃轻器械进阶方案',
        duration: '60分钟',
        completed: false
      },
      {
        title: '居家减脂燃脂系统模块（4课时）',
        description: '居家HIIT燃脂训练、低冲击稳态有氧训练、无跳跃大体重友好燃脂训练、碎片化燃脂跟练、居家减脂训练计划设计、减脂与塑形的结合方案',
        duration: '60分钟',
        completed: false
      },
      {
        title: '分人群居家专属训练模块（4课时）',
        description: '零基础新手、大体重人群、办公族体态改善、产后恢复、中老年人群的专属居家训练计划、不同训练频率的周计划模板、出差碎片化训练方案',
        duration: '60分钟',
        completed: false
      },
      {
        title: '居家训练长效管理模块（3课时）',
        description: '居家训练的饮食适配、居家训练的恢复管理、训练计划的动态调整、长期坚持的习惯养成、居家训练的氛围打造、家庭互动健身方案',
        duration: '45分钟',
        completed: false
      }
    ],
    targetAudience: [
      '没时间去健身房，想居家碎片化健身的上班族、学生党',
      '租房住、不方便购置大型器械，想靠无器械/轻器械健身的人群',
      '经常出差，想在酒店就能完成训练，不受场地限制的人群',
      '零基础健身小白，想从居家训练开始，建立健身习惯的人群',
      '有一定训练经验，想补充居家训练方案，保持训练状态的健身爱好者'
    ],
    highlights: [
      '全程遵循ACSM《居家抗阻与有氧训练指南》，所有训练内容均适配居家场景，无需大型器械，仅靠自身体重或简单轻器械即可完成，不受场地、时间限制',
      '覆盖零基础到进阶全阶段，每一个动作都有退阶/进阶方案，无论是纯新手还是有训练经验的爱好者，都能找到适配的训练内容',
      '配套完整的跟练视频，从热身到训练到冷身，全程带练，无需自己规划，打开就能练，适配居家健身人群的需求'
    ],
    outcomes: [
      '彻底掌握居家无器械/轻器械健身的核心逻辑，能不受场地、器械、时间限制，随时随地完成训练',
      '熟练掌握20+居家核心训练动作的标准执行，能精准找到发力感，规避错误动作，避免运动损伤',
      '能根据自身目标，独立制定个性化居家训练计划，实现增肌、减脂、塑形、体态改善的核心目标',
      '建立终身受益的居家健身习惯，不再受健身房限制，实现随时随地科学健身'
    ]
  }
})

// 当前课程
const course = ref({})

// 教练信息
const coachInfo = ref({})

// 根据课程ID加载课程信息
const loadCourseInfo = (id) => {
  const courseData = courses.value[id]
  if (courseData) {
    course.value = courseData
    // 根据课程设置教练信息
    if (courseData.coach === '健身教练') {
      coachInfo.value = {
        description: '专业健身教练，拥有8年教学经验，专注于力量训练和体态调整。',
        courses: 8,
        students: 2000,
        years: 8
      }
    } else if (courseData.coach === '瑜伽教练') {
      coachInfo.value = {
        description: '资深瑜伽教练，拥有10年教学经验，专注于初学者瑜伽教学。',
        courses: 12,
        students: 1200,
        years: 10
      }
    } else if (courseData.coach === '减脂专家') {
      coachInfo.value = {
        description: '专业减脂教练，拥有6年教学经验，帮助超过1000名学员成功减脂。',
        courses: 6,
        students: 1500,
        years: 6
      }
    }
  }
}



// 计算已完成课时
const completedLessons = computed(() => {
  return course.value.syllabus ? course.value.syllabus.filter(lesson => lesson.completed).length : 0
})

// 总课时
const totalLessons = computed(() => {
  return course.value.syllabus ? course.value.syllabus.length : 0
})

// 学习进度百分比
const courseProgress = computed(() => {
  if (totalLessons.value === 0) return 0
  return Math.round((completedLessons.value / totalLessons.value) * 100)
})

// 模拟评论数据
const comments = ref([
  {
    id: 1,
    user: '用户1',
    time: '2024-01-16',
    content: '课程非常好，教练讲解详细，适合初学者。',
    rating: 5
  },
  {
    id: 2,
    user: '用户2',
    time: '2024-01-17',
    content: '跟着练习了几节课，感觉身体明显变得更灵活了。',
    rating: 4
  }
])

// 课程学习内容数据
const lessonContentsData = ref({
  // 课程1：零基础全场景健身入门系统课
  '1-0': {
    keyPoints: ['健身的核心原理与能量系统', '增肌与减脂的底层逻辑区别', '训练术语全解析（组数、次数、RM、容量等）', '新手最容易犯的5条红线错误'],
    detail: '<p>健身的本质是对身体的<strong>渐进超负荷刺激</strong>。人体的能量系统分为ATP-CP系统（爆发力）、糖酵解系统（中高强度）和有氧氧化系统（低强度耐力）。</p><p>增肌的核心在于<strong>机械张力+代谢压力</strong>的双重刺激，而减脂的核心在于<strong>热量缺口+保持肌肉量</strong>。两者并不矛盾，新手完全可以在减脂的同时实现增肌。</p><p>理解RM（最大重复次数）、组数、间歇时间等基础概念，是后续所有训练计划的基础。</p>',
    steps: ['用笔记本记录你当前的身体数据：体重、腰围、臀围、臂围', '确定你的训练目标：增肌/减脂/体能提升', '了解你所在健身房的器械布局，或规划居家训练区域', '学习RM测试方法：找到每个核心动作的10RM重量'],
    takeaway: '健身的核心是渐进超负荷，理解底层逻辑比盲目训练重要100倍。新手福利期是增肌的黄金窗口，科学训练可以让你在前6个月获得最快的进步。'
  },
  '1-1': {
    keyPoints: ['人体五大动作模式深度解析', '每个动作的标准执行细节与呼吸节奏', '固定器械vs自由重量的优缺点对比', '居家无器械替代方案'],
    detail: '<p>人体所有运动都可以归纳为<strong>推、拉、蹲、髋铰链、核心稳定</strong>五大动作模式。掌握这五大模式，就等于掌握了所有训练动作的核心。</p><p><strong>推类动作</strong>（卧推、俯卧撑、肩推）：主要训练胸肌、三角肌前束、肱三头肌。关键在于肩胛骨的稳定与下沉。</p><p><strong>拉类动作</strong>（引体向上、划船、下拉）：主要训练背阔肌、菱形肌、肱二头肌。关键在于肩胛骨的收缩。</p><p><strong>蹲类动作</strong>（深蹲、弓箭步）：主要训练股四头肌、臀大肌。关键在于脊柱中立和膝盖方向。</p>',
    steps: ['对着镜子练习深蹲姿势：双脚与肩同宽，脚尖微外八，下蹲时膝盖朝向脚尖方向', '练习俯卧撑退阶版（跪姿俯卧撑），感受胸部发力', '用弹力带模拟划船动作，找到背部发力感', '练习平板支撑，从30秒开始，逐步增加时间'],
    takeaway: '五大动作模式是健身的基础语言，把每个模式的标准动作练好，比追求花哨动作重要得多。动作质量 > 重量。'
  },
  '1-2': {
    keyPoints: ['ACSM新手训练计划设计原则', '每周3练全身分化计划模板', '渐进超负荷的新手执行方案', '训练容量与强度的把控'],
    detail: '<p>新手阶段最推荐的训练频率是<strong>每周3次全身训练</strong>，每次间隔48小时。这种安排能最大化肌肉蛋白合成反应，并留出充足的恢复时间。</p><p><strong>渐进超负荷</strong>不止是加重量。你可以通过增加次数、增加组数、缩短间歇、增加训练频率、改善动作质量等方式实现渐进超负荷。新手阶段建议每1-2周尝试在某个维度上做小幅提升。</p><p>每次训练应包括：热身（5-10分钟）、主训练（45-60分钟）、冷身拉伸（5-10分钟）。</p>',
    steps: ['选择5-7个核心动作覆盖全身（如深蹲、卧推、划船、肩推、硬拉、卷腹）', '每个动作做3组×8-12次，组间休息90秒', '每周3练，如周一/周三/周五，确保48小时恢复', '记录每次训练的重量和次数，追踪进步'],
    takeaway: '新手最好的训练计划是"能坚持的计划"。不要追求花哨的分化训练，全身训练+渐进超负荷才是新手增肌的最优解。'
  },
  '1-3': {
    keyPoints: ['三大营养素的计算方法', '增肌期与减脂期的热量差异', '外卖/食堂的健身饮食适配方案', '循证有效补剂推荐'],
    detail: '<p><strong>蛋白质</strong>：每公斤体重1.6-2.2克。优先选择鸡胸肉、鸡蛋、鱼、牛肉、乳清蛋白。分散到3-5餐摄入效果更好。</p><p><strong>碳水化合物</strong>：每公斤体重3-5克（增肌期）或2-3克（减脂期）。优先选择燕麦、糙米、红薯、全麦面包等低GI碳水。</p><p><strong>脂肪</strong>：每公斤体重0.8-1.2克。优先选择橄榄油、坚果、牛油果、鱼油等不饱和脂肪。</p><p>新手唯一推荐的补剂只有<strong>乳清蛋白粉和肌酸</strong>，其余补剂缺乏充分的循证支持。</p>',
    steps: ['计算你的每日总热量消耗（TDEE）', '根据目标设定热量盈余（增肌+300kcal）或缺口（减脂-300kcal）', '按比例分配三大营养素：蛋白质25%、碳水50%、脂肪25%', '利用MyFitnessPal等APP记录3天饮食，了解实际摄入量'],
    takeaway: '80%的健身效果来自厨房。不需要极端饮食，学会计算三大营养素，合理安排外卖和食堂餐，才是可持续的健身饮食之道。'
  },
  '1-4': {
    keyPoints: ['睡眠对肌肉恢复的核心作用', '新手疲劳管理策略', '标准热身与冷身流程', '运动损伤的预防与应急处理'],
    detail: '<p><strong>睡眠</strong>是肌肉恢复最重要的环节。深度睡眠时生长激素分泌达到峰值，每晚7-9小时高质量睡眠是增肌的基础保障。</p><p><strong>疲劳管理</strong>：新手容易"训练过度"，表现为持续疲劳、睡眠变差、训练热情下降。解决方案是强制安排减载周（每4-6周安排一周降低训练量50%）。</p><p><strong>标准热身</strong>：5分钟轻度有氧 + 动态拉伸（手臂画圈、髋关节环绕、弓步转体等）+ 目标动作的轻重量热身组。</p>',
    steps: ['每晚固定时间睡觉，保证7-9小时睡眠', '训练前做5分钟跳绳或快走热身', '每个训练动作先用50%目标重量做1组热身', '训练后做5-10分钟静态拉伸放松'],
    takeaway: '训练只是刺激，恢复才是生长的关键。睡好、吃好、管理好疲劳度，比多练两组更重要。'
  },
  '1-5': {
    keyPoints: ['SMART健身目标设定法', '训练记录的科学方法', '新手常见心态问题解决方案', '健身与生活的长期平衡策略'],
    detail: '<p><strong>SMART原则</strong>：目标应该是具体的(Specific)、可衡量的(Measurable)、可达成的(Achievable)、相关的(Relevant)、有时限的(Time-bound)。例如"3个月内深蹲从50kg提升到70kg"就是一个SMART目标。</p><p><strong>训练日志</strong>是进步的证明。每次训练记录日期、动作、组数、次数、重量、感受（RPE）。当你怀疑自己是否在进步时，翻开日志就是最好的答案。</p><p>新手最常见的放弃原因是"看不到效果"。请记住：身体变化以月为单位，不以天为单位。给自己至少3个月的坚持期。</p>',
    steps: ['写下你的3个月SMART健身目标（不超过3个）', '准备一个训练日志本或使用手机APP记录', '每周拍一张正面全身照追踪变化', '找一个健身伙伴或加入健身社群增加坚持动力'],
    takeaway: '健身是马拉松不是短跑。把目标从"快速变壮"调整为"建立终身健身习惯"，你会走得更远。'
  },
  // 课程2：办公族体态矫正
  '2-0': {
    keyPoints: ['全身体态居家自测方法', '上交叉综合征（圆肩驼背头前伸）病理机制', '下交叉综合征（骨盆前倾/后倾）病理机制', '个人体态问题的精准定位'],
    detail: '<p><strong>上交叉综合征</strong>：胸大肌/胸小肌/上斜方肌过紧 + 菱形肌/中下斜方肌/深层颈屈肌过弱 → 圆肩驼背、头前伸、肩胛骨前倾。</p><p><strong>下交叉综合征</strong>：髋屈肌/竖脊肌过紧 + 臀大肌/腹直肌过弱 → 骨盆前倾、腰椎曲度过大、小腹突出。</p><p>居家自测方法：靠墙站立，脚后跟离墙10cm，臀部和上背贴墙。正常状态下后脑勺应该能自然触墙。如果触不到或需要刻意仰头，说明头前伸。</p>',
    steps: ['侧面照镜子检查：耳朵-肩膀-髋关节-膝盖-脚踝是否在一条直线上', '靠墙测试头前伸程度', '仰卧检查骨盆位置：正常腰下可塞入一个手掌厚度', '双手叉腰感受两侧髂嵴高度，检查是否有高低肩'],
    takeaway: '体态问题的根源是肌肉失衡，而非骨骼变形。通过针对性的拉伸+激活训练，绝大多数体态问题都可以显著改善。'
  },
  '2-1': {
    keyPoints: ['久坐导致的胸椎/颈椎/肩关节活动度下降', '髋关节活动度改善训练', '踝关节灵活性对全身的影响', '关节活动度的分阶训练体系'],
    detail: '<p><strong>胸椎活动度</strong>是上半身体态的基础。久坐导致胸椎后凸增加（驼背），限制了肩关节的活动范围，引发肩颈问题。</p><p><strong>髋关节活动度</strong>影响骨盆位置和腰椎受力。紧张的髋屈肌会把骨盆向前拉，导致骨盆前倾和腰痛。</p><p>活动度训练应遵循<strong>无痛原则</strong>：所有动作都不应引起疼痛，只应在感受到"拉伸感"的范围内进行。</p>',
    steps: ['泡沫轴放松胸椎段：仰卧，泡沫轴置于上背部，缓慢上下滚动2分钟', '猫牛式：四足跪姿，交替做脊柱屈伸，10次×3组', '髋屈肌拉伸：弓步姿势，后腿膝盖着地，前推髋部，每侧保持30秒', '踝关节活动度：面对墙壁，脚尖距墙10cm，膝盖前移触碰墙壁'],
    takeaway: '活动度是矫正的第一道门槛。紧张的关节无法做出正确的动作，先解锁活动度，再谈矫正训练。'
  },
  '2-2': {
    keyPoints: ['圆肩驼背的专属矫正动作', '头前伸的矫正方案', '骨盆前倾/后倾的针对性训练', '高低肩的矫正方法'],
    detail: '<p><strong>圆肩矫正核心思路</strong>：拉伸紧张肌群（胸大肌、胸小肌、上斜方肌）+ 激活薄弱肌群（菱形肌、中下斜方肌、肩袖肌群）。</p><p><strong>头前伸矫正</strong>：深层颈屈肌是核心，做"收下巴"（Chin Tuck）动作是矫正头前伸最有效的动作。每天做3组×15次。</p><p><strong>骨盆矫正</strong>：前倾需拉伸髋屈肌+激活臀大肌和腹直肌；后倾需拉伸腘绳肌+激活髋屈肌和竖脊肌。</p>',
    steps: ['收下巴练习：背靠墙站，后脑勺贴墙，下巴水平后收，保持5秒，15次×3组', '胸肌拉伸：门框拉伸法，双手扶门框，身体前倾，保持30秒×3组', '臀桥：激活臀大肌，注意用臀部发力而非腰部，15次×3组', '弹力带面拉：强化菱形肌和中下斜方肌，15次×3组'],
    takeaway: '矫正动作不在于多，而在于精准。每天坚持15分钟的针对性矫正训练，4周就能看到体态的明显改善。'
  },
  '2-3': {
    keyPoints: ['功能性核心抗形变训练', '日常姿势的肌肉记忆建立', '办公/居家/行走/睡眠的姿势标准', '碎片化矫正跟练方案'],
    detail: '<p><strong>功能性核心</strong>不是做卷腹，而是脊柱的"抗形变"能力训练：抗伸展（平板支撑）、抗旋转（Pallof Press）、抗侧屈（侧平板）。</p><p><strong>姿势管理</strong>：办公时屏幕顶端与眼睛平齐、手肘90度、腰部有支撑；站立时重心均匀分布、膝盖微屈；行走时挺胸收腹、下巴微收。</p><p>建立<strong>姿势肌肉记忆</strong>需要21天以上的持续练习，每天花2分钟检查自己的姿势。</p>',
    steps: ['设置办公姿势：屏幕高度调整、椅子腰部加支撑垫', '每隔1小时做30秒收下巴+后缩肩胛', '行走时默念"挺胸收腹下巴收"', '睡前做5分钟泡沫轴放松'],
    takeaway: '矫正训练的效果，80%取决于日常姿势管理。把正确的姿势融入日常生活，比每天练一小时矫正训练更有效。'
  },
  '2-4': {
    keyPoints: ['慢性疼痛的应急缓解方案', '矫正后期的长效维持计划', '健身训练中的体态适配', '预防反弹的每日习惯清单'],
    detail: '<p><strong>应急疼痛缓解</strong>：颈肩僵硬→热敷10分钟+收下巴练习；腰痛→仰卧屈膝腹式呼吸5分钟；手腕不适→手腕环绕+握拳伸展。</p><p><strong>矫正效果维持</strong>：矫正不是一次性的，而是终身管理。矫正达到满意状态后，每周安排2-3次维持训练（每次15-20分钟）即可。</p><p>体态矫正者在健身时应<strong>优先确保动作质量</strong>，重量放在第二位。任何引起疼痛的动作都应立即停止。</p>',
    steps: ['制作每日5分钟的体态维护跟练清单', '每周2次各15分钟的矫正维持训练', '每3个月重新做体态评估，对比基线数据', '在手机上设置姿势提醒闹钟'],
    takeaway: '体态矫正是一生的功课。养成每天关注姿势的习惯，让良好体态成为你的本能。'
  },
  // 课程3：女性全生命周期
  '3-0': {
    keyPoints: ['女性生理结构与激素变化规律', '女性与男性健身的核心差异', '女性增肌不壮、减脂不垮脸的原则', '女性健身避坑清单'],
    detail: '<p>女性睾酮水平仅为男性的1/10-1/15，这意味着<strong>女性不可能"练壮"</strong>。女性增肌的效果是紧致、有线条，而非男性化的肌肉块。</p><p>女性在<strong>月经周期的不同阶段</strong>，由于雌激素和孕激素的波动，力量表现、恢复能力和代谢率都会发生变化。顺应周期安排训练，效果会更好。</p><p>女性<strong>更容易缺铁</strong>（因月经失血），需注意红肉、动物肝脏、菠菜等富铁食物的摄入。</p>',
    steps: ['放下"怕练壮"的顾虑——没有睾酮支撑，女性自然增肌的上限很低', '开始记录月经周期，了解自己的身体规律', '检查是否有缺铁症状（乏力、头晕、面色苍白）', '把训练目标从"减肥"调整为"塑形+健康"'],
    takeaway: '女性的健身逻辑与男性完全不同。顺应自己的生理周期，放弃男性化的训练方式，才能真正实现健康美丽的身材目标。'
  },
  '3-1': {
    keyPoints: ['月经周期四个阶段的激素特点', '分周期训练计划设计', '经期不适的运动改善方案', 'PCOS的专属运动营养方案'],
    detail: '<p><strong>月经期（第1-5天）</strong>：雌激素最低，适合低强度运动如散步、瑜伽拉伸、轻度普拉提。避免高强度训练和倒立动作。</p><p><strong>卵泡期（第6-14天）</strong>：雌激素上升，这是女性力量和耐力的黄金期！适合高强度力量训练、HIIT。此时PR（个人记录）最容易突破。</p><p><strong>排卵期（第14-16天）</strong>：激素高峰后骤降，此阶段前交叉韧带损伤风险增加。建议降低跳跃类动作强度，增加核心稳定训练。</p><p><strong>黄体期（第16-28天）</strong>：孕激素主导，体温升高，耐力增强但爆发力下降。推荐中等强度的稳态训练（慢跑、游泳、中等重量抗阻）。</p>',
    steps: ['下载经期追踪APP，记录至少3个月经周期', '在卵泡期安排力量PR挑战（突破个人记录）', '在黄体期安排稳态有氧+柔韧性训练', '经期前3天以轻度拉伸和散步为主'],
    takeaway: '顺应周期训练，卵泡期冲强度，黄体期保稳定，经期重恢复。尊重身体节奏，训练效果事半功倍。'
  },
  '3-2': {
    keyPoints: ['假胯宽/妈妈臀的专属矫正训练', '蜜桃臀的循证雕刻体系', '马甲线的科学训练方法', '直角肩与薄背的打造方案'],
    detail: '<p><strong>假胯宽</strong>是女性最常见的身材痛点之一，本质是股骨大转子外突+臀部脂肪堆积+臀肌无力，而非真正的"胯宽"。解决方案是臀中肌激活+髋外展训练+减脂。</p><p><strong>蜜桃臀</strong>三大关键动作：臀推（Hip Thrust）、罗马尼亚硬拉、保加利亚分腿蹲。这些动作能精准刺激臀大肌，避免腿部代偿。</p><p><strong>马甲线</strong>的核心是低体脂率（女性约20%以下）+ 腹直肌训练，单靠卷腹无法看到马甲线。</p>',
    steps: ['侧卧髋外展（蚌式开合）：激活臀中肌，每侧20次×3组', '臀推：用沙发或椅子边缘，肩胛骨下缘靠住边缘，臀部发力上推，15次×3组', '真空腹练习：腹横肌训练，每天3组×30秒', '面拉+侧平举：打造肩部线条，15次×3组'],
    takeaway: '身材雕刻的核心是"精准激活+科学减脂"。找到目标肌群的发力感，配合合理的饮食管理，才能打造理想的身材线条。'
  },
  '3-3': {
    keyPoints: ['备孕期的备孕优化运动方案', '孕期分阶段安全训练计划', '产后42天-6个月黄金恢复期方案', '腹直肌分离与盆底肌松弛的康复训练'],
    detail: '',
    steps: [],
    takeaway: ''
  }
})

// 获取当前课程的课时学习内容
const getLessonContent = (index) => {
  const courseId = course.value.id
  const key = `${courseId}-${index}`
  const content = lessonContentsData.value[key]
  if (content) return content
  return {
    keyPoints: ['暂无详细学习内容，请关注后续更新'],
    detail: '<p>本节内容正在精心打磨中，敬请期待。</p>',
    steps: ['先阅读课程概述，了解本节要解决的问题', '回顾前几节课的核心知识', '在评论区与其他学员交流讨论'],
    takeaway: '持续学习是进步的唯一途径，保持节奏，每一课都有它的价值。'
  }
}

// 加载学习进度
const loadProgress = () => {
  const courseId = course.value.id
  try {
    const saved = localStorage.getItem(`course_progress_${courseId}`)
    if (saved) {
      const data = JSON.parse(saved)
      if (data.completedLessons && course.value.syllabus) {
        course.value.syllabus.forEach((lesson, i) => {
          lesson.completed = data.completedLessons.includes(i)
        })
      }
      lastStudiedLesson.value = data.lastStudied ?? -1
    }
  } catch (e) {
    console.error('加载学习进度失败:', e)
  }
}

// 保存学习进度
const saveProgress = () => {
  const courseId = course.value.id
  try {
    const completedLessons = []
    if (course.value.syllabus) {
      course.value.syllabus.forEach((lesson, i) => {
        if (lesson.completed) completedLessons.push(i)
      })
    }
    localStorage.setItem(`course_progress_${courseId}`, JSON.stringify({
      lastStudied: lastStudiedLesson.value,
      completedLessons
    }))
  } catch (e) {
    console.error('保存学习进度失败:', e)
  }
}

// 继续学习
const continueLearning = () => {
  if (lastStudiedLesson.value >= 0) {
    isLearning.value = true
    expandedLesson.value = lastStudiedLesson.value
    setTimeout(() => {
      document.querySelector('.learning-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }
}

// 跳转到指定课时
const goToLesson = (index) => {
  expandedLesson.value = index
  lastStudiedLesson.value = index
  saveProgress()
  setTimeout(() => {
    document.querySelector('.learning-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 100)
}

// 完成课时学习
const completeLesson = (index) => {
  if (course.value.syllabus) {
    course.value.syllabus[index].completed = true
    lastStudiedLesson.value = index
    saveProgress()
    ElMessage.success('恭喜完成本节学习！')
    if (index < course.value.syllabus.length - 1) {
      setTimeout(() => {
        goToLesson(index + 1)
        ElMessage.info('已自动跳转到下一课')
      }, 800)
    } else {
      setTimeout(() => {
        ElMessage({ message: '全部课程已完成！太棒了！', type: 'success', duration: 3000 })
      }, 800)
    }
  }
}

// 生命周期
onMounted(() => {
  loadUserInfo()
  const id = route.params.id || '1'
  console.log('课程ID:', id)
  // 加载课程信息
  loadCourseInfo(id)
  // 加载学习进度
  loadProgress()
  // 检查收藏状态
  const favs = JSON.parse(localStorage.getItem('favoritedCourses') || '[]')
  courseFavorited.value = favs.includes(course.value.id)
})

const toggleCourseLike = () => {
  if (!requireAuth('点赞')) return
  if (courseLiked.value) {
    courseLiked.value = false
    courseLikeCount.value--
    ElMessage({ message: '已取消点赞', type: 'info', duration: 1000 })
  } else {
    courseLiked.value = true
    courseLikeCount.value++
    ElMessage({ message: '点赞成功', type: 'success', duration: 1000 })
  }
}

const toggleCourseFavorite = () => {
  if (!requireAuth('收藏')) return
  const favs = JSON.parse(localStorage.getItem('favoritedCourses') || '[]')
  if (courseFavorited.value) {
    const idx = favs.indexOf(course.value.id)
    if (idx > -1) favs.splice(idx, 1)
    courseFavorited.value = false
    ElMessage({ message: '已取消收藏', type: 'info', duration: 1000 })
  } else {
    favs.push(course.value.id)
    courseFavorited.value = true
    ElMessage({ message: '收藏成功', type: 'success', duration: 1000 })
  }
  localStorage.setItem('favoritedCourses', JSON.stringify(favs))
}

const shareCourse = () => {
  ElMessage({ message: '链接已复制，快去分享给好友吧！', type: 'success', duration: 1500 })
  courseShareCount.value++
  navigator.clipboard.writeText(window.location.href).catch(() => {})
}

const enrollCourse = () => {
  if (!requireAuth('报名课程')) return
  if (enrolled.value) {
    ElMessage({ message: '您已报名该课程', type: 'info', duration: 1000 })
  } else {
    enrolled.value = true
    course.value.enrolled++
    ElMessage({ message: '报名成功！开始你的学习之旅吧', type: 'success', duration: 1500 })
  }
}

const toggleLesson = (index) => {
  if (expandedLesson.value === index) {
    expandedLesson.value = -1
  } else {
    expandedLesson.value = index
    lastStudiedLesson.value = index
    isLearning.value = true
    saveProgress()
  }
}

// 更新学习进度
const updateProgress = () => {
  saveProgress()
  console.log('学习进度更新:', courseProgress.value)
}

const toggleCommentLike = (commentId) => {
  const likes = { ...commentLikes.value }
  if (likes[commentId]) {
    delete likes[commentId]
  } else {
    likes[commentId] = true
  }
  commentLikes.value = likes
}

const startReply = (comment) => {
  if (replyTarget.value === comment.id) {
    replyTarget.value = null
    replyContent.value = ''
  } else {
    replyTarget.value = comment.id
    replyContent.value = ''
  }
}

const submitReply = (comment) => {
  if (replyContent.value.trim()) {
    comments.value.push({
      id: comments.value.length + 1,
      user: username.value,
      time: new Date().toISOString().split('T')[0],
      content: `回复 @${comment.user}: ${replyContent.value}`,
      rating: 5
    })
    replyContent.value = ''
    replyTarget.value = null
    ElMessage({ message: '回复成功', type: 'success', duration: 1000 })
  }
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
.course-detail-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* 导航栏 */
.navbar {
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.logo h1 {
  font-size: 20px;
  color: #1890ff;
  margin: 0;
}

.nav-menu {
  display: flex;
  gap: 30px;
}

.nav-menu a {
  text-decoration: none;
  color: #333;
  font-size: 16px;
  padding: 8px 0;
  position: relative;
}

.nav-menu a.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #1890ff;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.username {
  font-size: 14px;
  color: #333;
}

.notification-btn {
  position: relative;
  margin-right: 10px;
}

.unread-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #ff4d4f;
  color: white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.notification-item {
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.notification-item:hover {
  background-color: #f5f7fa;
}

.unread-item {
  background-color: #f0f9ff;
}

.unread-item:hover {
  background-color: #e6f4ff;
}

.notification-content {
  min-width: 260px;
}

.notification-top {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}

.notification-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #ff4d4f;
  flex-shrink: 0;
}

.notification-title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.notification-desc {
  font-size: 13px;
  color: #666;
  margin-bottom: 4px;
}

.notification-time {
  font-size: 12px;
  color: #999;
}

/* 课程详情 */
.course-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.course-header {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
}

.course-info {
  flex: 1;
}

.course-info h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.course-meta {
  font-size: 14px;
  color: #999;
  margin-bottom: 15px;
  display: flex;
  gap: 15px;
}

.course-description {
  margin-bottom: 20px;
}

.course-description p {
  line-height: 1.6;
  color: #666;
}

.course-stats {
  display: flex;
  gap: 20px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #666;
}

.course-image {
  width: 400px;
  flex-shrink: 0;
}

.course-image img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
}

/* 目标人群 */
.target-audience-section {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.target-audience-section h3 {
  margin-bottom: 15px;
  color: #333;
}

.target-audience-list {
  list-style: none;
  padding: 0;
}

.target-audience-list li {
  margin-bottom: 10px;
  padding-left: 20px;
  position: relative;
  color: #666;
  line-height: 1.5;
}

.target-audience-list li:before {
  content: '•';
  position: absolute;
  left: 0;
  color: #1890ff;
  font-size: 18px;
}

/* 核心专业亮点 */
.highlights-section {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.highlights-section h3 {
  margin-bottom: 15px;
  color: #333;
}

.highlights-list {
  list-style: none;
  padding: 0;
}

.highlights-list li {
  margin-bottom: 10px;
  padding-left: 20px;
  position: relative;
  color: #666;
  line-height: 1.5;
}

.highlights-list li:before {
  content: '•';
  position: absolute;
  left: 0;
  color: #1890ff;
  font-size: 18px;
}

/* 学员学完交付成果 */
.outcomes-section {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.outcomes-section h3 {
  margin-bottom: 15px;
  color: #333;
}

.outcomes-list {
  list-style: none;
  padding: 0;
}

.outcomes-list li {
  margin-bottom: 10px;
  padding-left: 20px;
  position: relative;
  color: #666;
  line-height: 1.5;
}

.outcomes-list li:before {
  content: '•';
  position: absolute;
  left: 0;
  color: #1890ff;
  font-size: 18px;
}

/* 课程互动按钮 */
.course-actions {
  margin-top: 20px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.course-actions .action-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f8f9fa;
  user-select: none;
  font-size: 14px;
}

.course-actions .action-item:hover {
  background: #e8f4fd;
  transform: translateY(-2px);
  box-shadow: 0 3px 10px rgba(24, 144, 255, 0.12);
}

.course-actions .action-active {
  background: #e6f7ff;
}

.course-actions .action-icon {
  transition: transform 0.3s ease, color 0.3s ease;
}

.course-actions .like-animate {
  animation: courseHeartBeat 0.4s ease;
  color: #ff6b6b;
}

@keyframes courseHeartBeat {
  0% { transform: scale(1); }
  25% { transform: scale(1.3); }
  50% { transform: scale(1); }
  75% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.course-actions .action-enroll {
  background: linear-gradient(135deg, #1890ff, #40a9ff);
  color: #fff;
}

.course-actions .action-enroll:hover {
  background: linear-gradient(135deg, #1677cc, #3390e3);
  color: #fff;
}

.course-actions .action-count {
  color: #999;
  font-size: 13px;
}

/* 学习进度 */
.progress-section {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.progress-section h3 {
  margin-bottom: 15px;
  color: #333;
}

.progress-text {
  margin-top: 10px;
  text-align: right;
  color: #666;
}

/* 课程大纲 */
.syllabus-section {
  margin-bottom: 30px;
}

.syllabus-section h3 {
  margin-bottom: 15px;
  color: #333;
}

.lesson-item {
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.lesson-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.lesson-item.completed {
  border-color: #67c23a;
  background-color: #f0f9eb;
}

.lesson-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  cursor: pointer;
}

.lesson-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.lesson-title {
  font-weight: bold;
  color: #333;
}

.lesson-duration {
  color: #999;
  font-size: 14px;
}

.lesson-content {
  padding: 15px;
  border-top: 1px solid #eee;
  background-color: #f9f9f9;
}

.lesson-content p {
  margin-bottom: 15px;
  color: #666;
}

/* 教练信息 */
.coach-section {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.coach-section h3 {
  margin-bottom: 15px;
  color: #333;
}

.coach-info {
  display: flex;
  gap: 20px;
}

.coach-details h4 {
  margin-bottom: 10px;
  color: #333;
}

.coach-details p {
  margin-bottom: 15px;
  color: #666;
  line-height: 1.6;
}

.coach-stats {
  display: flex;
  gap: 20px;
  color: #999;
  font-size: 14px;
}

/* 评论区 */
.comment-section {
  margin-bottom: 30px;
}

.comment-section h3 {
  margin-bottom: 15px;
  color: #333;
}

.comments {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.comment-item {
  display: flex;
  gap: 15px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.comment-avatar {
  flex-shrink: 0;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
}

.comment-user {
  font-weight: bold;
  color: #333;
}

.comment-time {
  color: #999;
  font-size: 14px;
}

.comment-body {
  color: #666;
  line-height: 1.6;
}

.comment-actions {
  display: flex;
  gap: 20px;
  margin-top: 8px;
}

.comment-action-item {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 3px 8px;
  border-radius: 12px;
  transition: all 0.2s ease;
  font-size: 13px;
  color: #999;
}

.comment-action-item:hover {
  background: #f0f2f5;
  color: #1890ff;
}

.comment-action-text {
  font-size: 13px;
}

.comment-liked {
  color: #ff6b6b !important;
}

.reply-input {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 继续学习横幅 */
.continue-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #e6f7ff, #f0f9ff);
  border: 1px solid #b3d8ff;
  border-radius: 12px;
}

.continue-info {
  display: flex;
  align-items: center;
  gap: 14px;
  color: #1890ff;
}

.continue-text {
  display: flex;
  flex-direction: column;
}

.continue-label {
  font-size: 13px;
  color: #999;
}

.continue-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

/* 学习面板 */
.learning-panel {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.learning-tabs {
  display: flex;
  border-bottom: 2px solid #f0f0f0;
  padding: 0 20px;
  background: #fafafa;
}

.learning-tab {
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #1890ff;
  border-bottom: 2px solid #1890ff;
  margin-bottom: -2px;
}

.learning-body {
  padding: 24px;
}

.learning-body h4 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: #333;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f5f5f5;
}

.lesson-overview p {
  color: #555;
  line-height: 1.8;
  font-size: 14px;
}

.lesson-keypoints ul {
  list-style: none;
  padding: 0;
}

.lesson-keypoints li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px dashed #eee;
  color: #555;
  line-height: 1.6;
  font-size: 14px;
}

.point-index {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1890ff, #40a9ff);
  color: #fff;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 600;
}

.detail-text {
  line-height: 1.9;
  color: #444;
  font-size: 14px;
}

.detail-text p {
  margin-bottom: 12px;
}

.step-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.step-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 14px;
  background: #f9fafb;
  border-radius: 10px;
  border-left: 3px solid #1890ff;
}

.step-number {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1890ff;
  color: #fff;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 600;
}

.step-content {
  color: #444;
  line-height: 1.7;
  font-size: 14px;
  padding-top: 3px;
}

.lesson-takeaway {
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 10px;
  padding: 16px;
}

.lesson-takeaway h4 {
  color: #52c41a;
  border-bottom-color: #d9f7be;
}

.lesson-takeaway p {
  color: #555;
  line-height: 1.8;
  font-size: 14px;
}

.learning-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 20px 24px;
  background: #fafafa;
  border-top: 1px solid #f0f0f0;
}

.complete-btn {
  min-width: 140px;
}

.nav-lesson-btn {
  min-width: 100px;
}

/* 加载状态 */
.loading-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: 20px;
  margin-bottom: 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  
  .course-header {
    flex-direction: column;
  }
  
  .course-image {
    width: 100%;
  }
  
  .course-stats {
    flex-wrap: wrap;
  }
  
  .coach-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .loading-container {
    margin: 20px 10px;
  }
}
</style>