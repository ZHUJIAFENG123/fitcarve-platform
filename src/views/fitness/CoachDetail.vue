<template>
  <div class="coach-detail-container">
    <div v-if="loading" class="loading-state">
      <el-icon class="is-loading"><Loading /></el-icon>
      <span>加载中...</span>
    </div>

    <template v-else-if="coach">
      <div class="coach-profile">
        <div class="profile-main">
          <el-avatar :size="80" :src="coach.avatar">{{ coach.name[0] }}</el-avatar>
          <div class="profile-info">
            <div class="name-row">
              <h1>{{ coach.name }}</h1>
              <span v-if="coach.verified" class="verified-tag">✓ 已认证</span>
            </div>
            <p class="title-text">{{ coach.title }}</p>
            <div class="quick-stats">
              <span><el-icon><StarFilled /></el-icon> {{ coach.rating }} ({{ coach.reviewCount }} 评价)</span>
              <span>{{ coach.experienceYears }} 年经验</span>
              <span>{{ coach.studentCount || 0 }} 学员</span>
            </div>
          </div>
        </div>
      </div>

      <div class="coach-body">
        <div class="body-main">
          <!-- 简介 -->
          <section class="section">
            <h2>个人简介</h2>
            <p>{{ coach.bio }}</p>
          </section>

          <!-- 专业领域 -->
          <section class="section">
            <h2>专业领域</h2>
            <div class="tags">
              <el-tag v-for="s in coach.specialty?.split(',')" :key="s" type="success">{{ s.trim() }}</el-tag>
            </div>
          </section>

          <!-- 评价 -->
          <section class="section">
            <h2>学员评价 ({{ reviews.length }})</h2>

            <!-- 写评价 -->
            <div class="write-review" v-if="userStore.isLoggedIn">
              <div class="rate-row">
                <span>我的评分：</span>
                <el-rate v-model="newRating" />
              </div>
              <el-input v-model="newComment" type="textarea" :rows="2" placeholder="分享你的学习体验..." />
              <el-button type="primary" size="small" style="margin-top:8px" @click="submitReview" :loading="submitting">提交评价</el-button>
            </div>

            <div v-if="!reviews.length" class="no-reviews">
              <el-empty description="暂无评价" :image-size="80" />
            </div>
            <div v-for="r in reviews" :key="r.id" class="review-item">
              <div class="review-header">
                <el-avatar :size="32" :src="r.avatar">{{ r.username?.[0] }}</el-avatar>
                <div>
                  <strong>{{ r.username }}</strong>
                  <el-rate v-model="r.rating" disabled size="small" />
                </div>
                <span class="review-time">{{ formatDate(r.createdAt) }}</span>
              </div>
              <p class="review-comment" v-if="r.comment">{{ r.comment }}</p>
            </div>
          </section>
        </div>

        <aside class="body-sidebar">
          <div class="info-card">
            <h3>资质信息</h3>
            <div class="info-item" v-if="coach.certifications">
              <label>认证资质</label>
              <p>{{ coach.certifications }}</p>
            </div>
            <div class="info-item" v-if="coach.education">
              <label>教育背景</label>
              <p>{{ coach.education }}</p>
            </div>
            <div class="info-item" v-if="coach.hourlyRate">
              <label>课时费</label>
              <p class="price">{{ coach.hourlyRate }} 元/小时</p>
            </div>
          </div>
        </aside>
      </div>
    </template>

    <div v-else class="empty-state">
      <el-empty description="教练不存在" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCoachStore } from '@/stores/coach'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const route = useRoute()
const coachStore = useCoachStore()
const userStore = useUserStore()

const coach = computed(() => coachStore.currentCoach)
const reviews = computed(() => coachStore.reviews)
const loading = computed(() => coachStore.loading)

const newRating = ref(0)
const newComment = ref('')
const submitting = ref(false)

function formatDate(d) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('zh-CN')
}

async function submitReview() {
  if (!newRating.value) {
    ElMessage.warning('请先评分')
    return
  }
  submitting.value = true
  try {
    const res = await coachStore.addReview(Number(route.params.id), newRating.value, newComment.value)
    if (res.success) {
      ElMessage.success('评价成功')
      newRating.value = 0
      newComment.value = ''
      coachStore.fetchDetail(Number(route.params.id))
    }
  } catch (e) {
    ElMessage.error('评价失败')
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  coachStore.fetchDetail(Number(route.params.id))
})
</script>

<style scoped>
.coach-detail-container { max-width: 1100px; margin: 0 auto; padding: 24px; }
.loading-state, .empty-state { display: flex; align-items: center; justify-content: center; padding: 100px 0; color: #999; gap: 12px; }

.coach-profile { background: linear-gradient(135deg, #1B6B3A 0%, #2d8a4e 100%); padding: 32px; border-radius: 16px; color: #fff; margin-bottom: 24px; }
.profile-main { display: flex; gap: 20px; align-items: center; }
.name-row { display: flex; align-items: center; gap: 12px; }
.name-row h1 { margin: 0; font-size: 28px; }
.verified-tag { font-size: 13px; background: #fff; color: #1B6B3A; padding: 2px 10px; border-radius: 12px; }
.title-text { margin: 6px 0; opacity: 0.9; font-size: 15px; }
.quick-stats { display: flex; gap: 16px; font-size: 13px; opacity: 0.85; align-items: center; }

.coach-body { display: grid; grid-template-columns: 1fr 300px; gap: 24px; }
.section { margin-bottom: 24px; }
.section h2 { font-size: 18px; color: #1B6B3A; margin: 0 0 12px; padding-bottom: 8px; border-bottom: 2px solid #e8f5e9; }
.section p { color: #555; line-height: 1.7; }
.tags { display: flex; gap: 8px; flex-wrap: wrap; }

.write-review { background: #f9fafb; padding: 16px; border-radius: 10px; margin-bottom: 16px; }
.rate-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; font-size: 14px; color: #666; }

.review-item { padding: 14px 0; border-bottom: 1px solid #f0f0f0; }
.review-header { display: flex; align-items: center; gap: 10px; }
.review-header strong { font-size: 14px; }
.review-time { margin-left: auto; font-size: 12px; color: #bbb; }
.review-comment { color: #555; margin: 8px 0 0 42px; font-size: 14px; line-height: 1.6; }

.info-card { background: #f9fafb; border-radius: 12px; padding: 20px; }
.info-card h3 { margin: 0 0 14px; font-size: 16px; color: #333; }
.info-item { margin-bottom: 14px; }
.info-item label { font-size: 12px; color: #999; display: block; margin-bottom: 4px; }
.info-item p { margin: 0; color: #333; font-size: 14px; }
.price { color: #F97316 !important; font-weight: 600; font-size: 16px !important; }

.no-reviews { padding: 20px 0; }
</style>
