<template>
  <div class="home-page">
    <Navbar :menu-links="menuLinks" />

    <!-- Hero 区域 -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <div class="hero-text">
          <h1>科学健身，<br/>从这里开始</h1>
          <p class="hero-sub">专业 · 循证 · 个性化的健身资讯平台，<br/>为您提供权威的训练指导与健康知识</p>
          <div class="hero-actions">
            <el-button type="primary" size="large" round class="hero-btn-primary" @click="goNewsList">探索资讯</el-button>
            <el-button size="large" round class="hero-btn-outline" @click="goFitness">训练&饮食</el-button>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-card c1">💪 力量训练</div>
          <div class="hero-card c2">🧘 瑜伽塑形</div>
          <div class="hero-card c3">🏃 有氧燃脂</div>
          <div class="hero-card c4">🥗 营养指导</div>
        </div>
      </div>
    </section>

    <!-- 数据统计条 -->
    <section class="stats-bar">
      <div class="stat-item">
        <span class="stat-num">{{ formatNum(320) }}</span>
        <span class="stat-label">+ 篇资讯</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-num">{{ formatNum(85) }}</span>
        <span class="stat-label">+ 门课程</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-num">{{ formatNum(2000) }}</span>
        <span class="stat-label">+ 注册用户</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-num">{{ formatNum(30) }}</span>
        <span class="stat-label">+ 认证教练</span>
      </div>
    </section>

    <!-- 热门资讯 -->
    <section class="content-section">
      <div class="section-head">
        <div class="section-title-group">
          <h2>🔥 热门资讯</h2>
          <span class="section-tag">每周精选</span>
        </div>
        <a href="/news/list" class="section-more">查看全部 →</a>
      </div>
      <div class="card-grid">
        <div v-for="item in hotNews" :key="item.id" class="content-card" @click="goToNews(item.id)">
          <div class="card-img-wrap">
            <img :src="item.image" :alt="item.title">
            <div class="card-badge">{{ item.categoryName }}</div>
          </div>
          <div class="card-body">
            <h3>{{ item.title }}</h3>
            <p class="card-desc">{{ item.description }}</p>
            <div class="card-meta">
              <span>✍ {{ item.author }}</span>
              <span>👁 {{ formatNum(item.views) }}</span>
              <span>{{ item.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 推荐课程 -->
    <section class="content-section alt-bg">
      <div class="section-head">
        <div class="section-title-group">
          <h2>📚 训练计划</h2>
          <span class="section-tag">精选计划</span>
        </div>
        <a href="/fitness/training" class="section-more">查看全部 →</a>
      </div>
      <div class="card-grid">
        <div v-for="course in recommendedCourses" :key="course.id" class="content-card" @click="goToCourse(course.id)">
          <div class="card-img-wrap">
            <img :src="course.image" :alt="course.title">
            <div class="card-level" :class="course.level">{{ course.levelName }}</div>
          </div>
          <div class="card-body">
            <h3>{{ course.title }}</h3>
            <p class="card-desc">{{ course.description }}</p>
            <div class="card-meta">
              <span>👨‍🏫 {{ course.coach }}</span>
              <span class="card-price">{{ course.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 特色介绍 -->
    <section class="features-section">
      <h2>为什么选择我们</h2>
      <div class="features-grid">
        <div class="feature-item">
          <div class="feature-icon">📖</div>
          <h3>循证内容</h3>
          <p>所有内容基于ACSM、NSCA、ISSN等国际权威机构的研究成果</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🎯</div>
          <h3>个性化推荐</h3>
          <p>基于您的浏览偏好和学习记录，精准匹配适合您的课程与资讯</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">📊</div>
          <h3>学习追踪</h3>
          <p>记录学习进度，可视化学习统计，激励持续成长</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">👥</div>
          <h3>社区互动</h3>
          <p>与教练、创作者和其他健身爱好者交流心得，共同进步</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'

const router = useRouter()

const menuLinks = [
  { to: '/home', label: '首页', active: true },
  { to: '/news/list', label: '资讯', active: false },
  { to: '/fitness', label: '训练&饮食', active: false },
  { to: '/recommendation', label: '发现', active: false }
]

const formatNum = (n) => {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
  return String(n)
}

const API = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?image_size=square&prompt='

const hotNews = ref([
  { id: 1, title: 'ACSM力量训练共识：渐进超负荷的3个核心细节', description: '渐进超负荷是增肌与力量提升的黄金法则，但90%的训练者都踩了这些坑', image: API + 'ACSM%20strength%20consensus', categoryName: '健身知识', author: 'NSCA专家', time: '2024-01-15', views: 2345 },
  { id: 2, title: '肩峰下撞击综合征的4阶段居家康复方案', description: '肩部损伤占健身房就诊案例的44%-65%，这套方案经NSCA认证治疗师推荐', image: API + 'shoulder%20rehab%20protocol', categoryName: '运动康复', author: '物理治疗师', time: '2024-01-10', views: 1892 },
  { id: 3, title: 'ISSN肌酸补充指南：5个颠覆性新结论', description: '肌酸是研究最充分的补剂，但大众认知仍停留在增肌提升力量层面', image: API + 'creatine%20ISSN%20guide', categoryName: '营养健康', author: '运动营养师', time: '2024-01-05', views: 3210 },
  { id: 4, title: '45岁以上每周2次抗阻训练，全因死亡率降低37%', description: '柳叶刀最新研究：中老年健身的量化证据与零基础入门方案', image: API + 'lancet%20resistance%20training%20elderly', categoryName: '健身知识', author: '老年健康专家', time: '2023-12-28', views: 2156 },
  { id: 5, title: '办公族圆肩驼背的循证矫正：4周见效的3步方案', description: '不是拉伸胸肌就够了——2025年最新的上交叉综合征矫正方案', image: API + 'posture%20correction%20office', categoryName: '运动康复', author: '体态矫正专家', time: '2023-12-20', views: 1789 },
  { id: 6, title: 'HIIT vs 稳态有氧：减脂到底该怎么选？', description: '2025年最新荟萃分析，从减脂、心肺、长期健康三方面全面对比', image: API + 'HIIT%20vs%20steady%20cardio', categoryName: '健身知识', author: '心肺训练专家', time: '2023-12-15', views: 1456 }
])

const recommendedCourses = ref([
  { id: 1, title: '零基础全场景健身入门系统课', description: 'ACSM标准认证，覆盖居家+健身房双场景', image: API + 'beginner%20fitness%20system', coach: '张教练', level: 'beginner', levelName: '初级', price: '¥299' },
  { id: 2, title: '办公族体态矫正与疼痛缓解课', description: 'IOPTA认证，针对性解决圆肩驼背、慢性腰痛', image: API + 'posture%20correction%20course', coach: '李治疗师', level: 'beginner', levelName: '初级', price: '¥199' },
  { id: 3, title: '女性全生命周期健身方案', description: 'ACSM女性分会认证，覆盖各阶段专属方案', image: API + 'female%20fitness%20lifecycle', coach: '王教练', level: 'intermediate', levelName: '中级', price: '¥399' },
  { id: 4, title: 'NSCA力量训练进阶认证课', description: '基于NSCA金字塔模型，逐步进阶', image: API + 'NSCA%20advanced%20strength', coach: '赵教练', level: 'advanced', levelName: '高级', price: '¥499' },
  { id: 5, title: 'HIIT高效燃脂系统训练', description: '20分钟达传统有氧60分钟效果', image: API + 'HIIT%20fat%20burn%20system', coach: '刘教练', level: 'intermediate', levelName: '中级', price: '¥249' },
  { id: 6, title: '从解剖学到瑜伽体式精进', description: '运动解剖学视角的瑜伽矫正', image: API + 'yoga%20anatomy%20course', coach: '陈导师', level: 'advanced', levelName: '高级', price: '¥349' }
])

const goToNews = (id) => router.push(`/news/detail/${id}`)
const goToCourse = (id) => router.push(`/courses/detail/${id}`)
const goNewsList = () => router.push('/news/list')
const goFitness = () => router.push('/fitness')
</script>

<style scoped>
/* ===== Hero ===== */
.hero {
  position: relative;
  min-height: 520px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(160deg, #0a1628 0%, #112240 40%, #0d2137 70%, #0a1628 100%);
}
.hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 60% at 20% 50%, rgba(24,144,255,0.08) 0%, transparent 60%),
    radial-gradient(ellipse 60% 80% at 80% 30%, rgba(24,144,255,0.06) 0%, transparent 50%);
}
.hero-content {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 24px;
  display: flex;
  align-items: center;
  gap: 60px;
  z-index: 1;
}
.hero-text h1 {
  font-size: 48px;
  font-weight: 800;
  color: #e8edf2;
  margin: 0 0 20px 0;
  line-height: 1.15;
  letter-spacing: 2px;
}
.hero-sub {
  font-size: 17px;
  color: rgba(255,255,255,0.55);
  margin: 0 0 36px 0;
  line-height: 1.8;
}
.hero-actions { display: flex; gap: 16px; }
.hero-btn-primary {
  padding: 14px 36px;
  font-size: 15px;
  font-weight: 600;
  background: linear-gradient(135deg, #1890ff, #096dd9);
  border: none;
  box-shadow: 0 4px 20px rgba(24,144,255,0.3);
}
.hero-btn-outline {
  padding: 14px 36px;
  font-size: 15px;
  font-weight: 600;
  background: transparent;
  border: 2px solid rgba(255,255,255,0.25);
  color: rgba(255,255,255,0.85);
}
.hero-visual {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  flex-shrink: 0;
}
.hero-card {
  padding: 18px 22px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  font-size: 15px;
  color: rgba(255,255,255,0.75);
  backdrop-filter: blur(10px);
  transition: all 0.3s;
  cursor: default;
}

/* ===== Stats Bar ===== */
.stats-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 20px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
}
.stat-item { text-align: center; padding: 0 40px; }
.stat-num { font-size: 30px; font-weight: 800; color: #1890ff; display: block; }
.stat-label { font-size: 14px; color: #909399; margin-top: 4px; }
.stat-divider { width: 1px; height: 40px; background: #ebeef5; }

/* ===== Content Sections ===== */
.content-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 24px;
}
.content-section.alt-bg {
  max-width: 100%;
  background: #f8fafc;
}
.content-section.alt-bg .card-grid {
  max-width: 1200px;
  margin: 0 auto;
}
.section-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
}
.section-title-group { display: flex; align-items: center; gap: 14px; }
.section-head h2 { font-size: 22px; color: #1a1a2e; margin: 0; font-weight: 700; }
.section-tag {
  font-size: 12px; color: #1890ff; background: #e6f7ff;
  padding: 3px 12px; border-radius: 12px; font-weight: 500;
}
.section-more { font-size: 14px; color: #1890ff; text-decoration: none; font-weight: 500; }

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;
}
.content-card {
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  border: 1px solid #ebeef5;
  transition: all 0.3s ease;
}
.content-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.08);
  border-color: transparent;
}
.card-img-wrap { position: relative; height: 200px; overflow: hidden; }
.card-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
.content-card:hover .card-img-wrap img { transform: scale(1.05); }
.card-badge {
  position: absolute; top: 12px; left: 12px;
  background: rgba(24,144,255,0.9); color: #fff;
  padding: 3px 12px; border-radius: 6px; font-size: 12px; font-weight: 500;
}
.card-level {
  position: absolute; top: 12px; left: 12px;
  padding: 3px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; color: #fff;
}
.card-level.beginner { background: #52c41a; }
.card-level.intermediate { background: #fa8c16; }
.card-level.advanced { background: #f5222d; }
.card-body { padding: 16px 18px; }
.card-body h3 { font-size: 15px; color: #1a1a2e; margin: 0 0 8px 0; line-height: 1.4; }
.card-desc { font-size: 13px; color: #909399; margin: 0 0 12px 0; line-height: 1.5; }
.card-meta { display: flex; gap: 14px; font-size: 12px; color: #b0b8c1; flex-wrap: wrap; }
.card-price { color: #f5222d; font-weight: 700; margin-left: auto; }

/* ===== Features ===== */
.features-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px 50px;
  text-align: center;
}
.features-section h2 { font-size: 26px; color: #1a1a2e; margin: 0 0 40px 0; font-weight: 700; }
.features-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; }
.feature-item { padding: 30px 20px; border-radius: 14px; background: #fafbfc; transition: all 0.3s; }
.feature-item:hover { background: #fff; box-shadow: 0 8px 30px rgba(0,0,0,0.06); transform: translateY(-4px); }
.feature-icon { font-size: 36px; margin-bottom: 16px; }
.feature-item h3 { font-size: 17px; color: #1a1a2e; margin: 0 0 8px 0; }
.feature-item p { font-size: 14px; color: #909399; margin: 0; line-height: 1.6; }

@media (max-width: 768px) {
  .hero-content { flex-direction: column; padding: 60px 20px; gap: 30px; text-align: center; }
  .hero-text h1 { font-size: 34px; }
  .hero-actions { justify-content: center; flex-wrap: wrap; }
  .hero-visual { grid-template-columns: 1fr 1fr; width: 100%; }
  .card-grid { grid-template-columns: 1fr; }
  .features-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
  .stat-item { padding: 0 20px; }
  .stat-num { font-size: 24px; }
}
</style>
