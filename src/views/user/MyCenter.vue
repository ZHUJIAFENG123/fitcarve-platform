<template>
  <div class="mc-page">
    <Navbar :menu-links="menuLinks" />
    <div v-if="!userStore.token" class="mc-login">
      <el-empty description="请先登录查看个人数据中心">
        <el-button type="primary" @click="$router.push('/login')">去登录</el-button>
      </el-empty>
    </div>
    <div v-else class="mc-container">
      <!-- 欢迎区 -->
      <div class="mc-welcome">
        <div class="mc-avatar">
          <img :src="profile.avatar || '/images/01.jpg'" alt="avatar" />
        </div>
        <div class="mc-welcome-text">
          <h1>你好，{{ profile.username }}</h1>
          <p>会员 · 加入于 {{ profile.created_at?.slice(0, 10) || '未知' }}</p>
        </div>
        <el-button size="small" @click="$router.push('/profile')">编辑资料</el-button>
      </div>

      <!-- 四宫格数据 -->
      <div class="mc-grid">
        <!-- 身体档案 -->
        <div class="mc-card">
          <div class="mc-card-header">🏋️ 身体档案</div>
          <div class="mc-card-body mc-body-stats">
            <div class="mc-stat-row"><span>身高</span><strong>{{ bodyStats.height || '--' }} cm</strong></div>
            <div class="mc-stat-row"><span>体重</span><strong>{{ bodyStats.weight || '--' }} kg</strong></div>
            <div class="mc-stat-row"><span>BMI</span><strong>{{ bmi }}</strong></div>
            <div class="mc-stat-row"><span>目标</span><strong>{{ goalLabel(bodyStats.goal) }}</strong></div>
          </div>
          <div class="mc-card-foot">
            <el-button size="small" text @click="showBodyDialog = true">✏️ 更新身体数据</el-button>
          </div>
        </div>

        <!-- 训练概览 -->
        <div class="mc-card">
          <div class="mc-card-header">📅 训练概览</div>
          <div class="mc-card-body">
            <div class="mc-stat-row"><span>本周训练</span><strong>{{ trainingStats.thisWeek }} 次</strong></div>
            <div class="mc-stat-row"><span>总训练次数</span><strong>{{ trainingStats.total }} 次</strong></div>
            <div class="mc-stat-row"><span>报名计划</span><strong>{{ trainingStats.enrollments }} 个</strong></div>
            <div class="mc-stat-row"><span>连续训练</span><strong>{{ trainingStats.streak }} 天</strong></div>
          </div>
          <div class="mc-card-foot">
            <el-button size="small" text @click="$router.push('/fitness/my-training')">查看训练详情 →</el-button>
          </div>
        </div>

        <!-- 饮食追踪 -->
        <div class="mc-card">
          <div class="mc-card-header">🍽️ 饮食追踪</div>
          <div class="mc-card-body">
            <div class="mc-stat-row"><span>今日摄入</span><strong>{{ dietStats.todayCal }} kcal</strong></div>
            <div class="mc-stat-row"><span>目标热量</span><strong>{{ dietStats.targetCal }} kcal</strong></div>
            <div class="mc-stat-row"><span>今日饮水</span><strong>{{ waterStats.today }} ml</strong></div>
            <div class="mc-stat-row"><span>目标饮水</span><strong>{{ waterStats.target }} ml</strong></div>
          </div>
          <div class="mc-card-foot">
            <el-button size="small" text @click="$router.push('/fitness/diet-log')">记录饮食 →</el-button>
          </div>
        </div>

        <!-- 学习进度 -->
        <div class="mc-card">
          <div class="mc-card-header">📚 学习进度</div>
          <div class="mc-card-body">
            <div v-if="!learningPaths.length" class="mc-empty-text">尚未加入学习路径</div>
            <div v-else v-for="lp in learningPaths.slice(0, 3)" :key="lp.id" class="mc-lp-item">
              <router-link :to="`/fitness/learning/${lp.id}`" class="mc-lp-link">
                {{ lp.title }}
              </router-link>
              <div class="mc-lp-bar">
                <div class="mc-lp-fill" :style="{ width: (lp.completed_items / Math.max(lp.total_items, 1) * 100) + '%' }"></div>
              </div>
              <span class="mc-lp-count">{{ lp.completed_items }}/{{ lp.total_items }}</span>
            </div>
          </div>
          <div class="mc-card-foot">
            <el-button size="small" text @click="$router.push('/fitness/learning')">浏览学习路径 →</el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 身体数据编辑弹窗 -->
    <el-dialog v-model="showBodyDialog" title="更新身体数据" width="360px">
      <el-form label-width="60px">
        <el-form-item label="身高(cm)"><el-input v-model="bodyStats.height" type="number" /></el-form-item>
        <el-form-item label="体重(kg)"><el-input v-model="bodyStats.weight" type="number" /></el-form-item>
        <el-form-item label="目标">
          <el-select v-model="bodyStats.goal">
            <el-option label="增肌" value="build_muscle" /><el-option label="减脂" value="lose_fat" />
            <el-option label="耐力" value="endurance" /><el-option label="柔韧" value="flexibility" />
            <el-option label="综合" value="general" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showBodyDialog = false">取消</el-button>
        <el-button type="primary" @click="saveBodyData">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import { useUserStore } from '@/stores/user'
import { useLearningStore } from '@/stores/learning'
import { httpGet } from '@/utils/request'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const learningStore = useLearningStore()
const showBodyDialog = ref(false)

const menuLinks = [
  { to: '/home', label: '首页', active: false },
  { to: '/news/list', label: '资讯', active: false },
  { to: '/fitness', label: '训练&饮食', active: false },
  { to: '/my-center', label: '我的', active: true }
]

const profile = reactive({
  username: userStore.user?.username || '用户',
  avatar: userStore.user?.avatar_url || '',
  created_at: userStore.user?.created_at || ''
})

const bodyStats = reactive({
  height: localStorage.getItem('body_height') || '',
  weight: localStorage.getItem('body_weight') || '',
  goal: localStorage.getItem('body_goal') || 'general'
})

const bmi = computed(() => {
  const h = parseFloat(bodyStats.height)
  const w = parseFloat(bodyStats.weight)
  if (!h || !w) return '--'
  return (w / ((h / 100) ** 2)).toFixed(1)
})

function goalLabel(g: string) {
  return { build_muscle: '增肌', lose_fat: '减脂', endurance: '耐力', flexibility: '柔韧', general: '综合' }[g] || '未设置'
}

function saveBodyData() {
  localStorage.setItem('body_height', bodyStats.height)
  localStorage.setItem('body_weight', bodyStats.weight)
  localStorage.setItem('body_goal', bodyStats.goal)
  showBodyDialog.value = false
  ElMessage.success('身体数据已保存')
}

const trainingStats = reactive({ thisWeek: 0, total: 0, enrollments: 0, streak: 0 })
const dietStats = reactive({ todayCal: 0, targetCal: 2000 })
const waterStats = reactive({ today: 0, target: 2000 })
const learningPaths = ref<any[]>([])

onMounted(async () => {
  if (!userStore.token) return
  try {
    // 训练统计
    const tData = await httpGet<any>('/training/stats').catch(() => ({}))
    trainingStats.thisWeek = tData.thisWeek || 0
    trainingStats.total = tData.totalWorkouts || tData.total || 0
    trainingStats.enrollments = tData.total_enrollments || 0
    trainingStats.streak = tData.streak || 0
  } catch {}
  try {
    // 饮食数据
    const today = new Date().toISOString().slice(0, 10)
    const dData = await httpGet<any>(`/diet-log?date=${today}`).catch(() => ({}))
    dietStats.todayCal = dData.totalCalories || 0
  } catch {}
  try {
    const wData = await httpGet<any>('/water').catch(() => ({}))
    waterStats.today = wData.total || 0
  } catch {}
  // 学习进度
  await learningStore.fetchEnrolled()
  learningPaths.value = learningStore.enrolled
})
</script>

<style scoped>
.mc-page { min-height: 100vh; background: #f5f6f8; }
.mc-login { padding-top: 120px; }
.mc-container { max-width: 1000px; margin: 0 auto; padding: 32px 20px 80px; }

.mc-welcome {
  background: linear-gradient(135deg, #1B6B3A, #15803d); border-radius: 16px;
  padding: 28px 32px; display: flex; align-items: center; gap: 20px; color: #fff; margin-bottom: 28px;
}
.mc-avatar { width: 64px; height: 64px; border-radius: 50%; overflow: hidden; border: 3px solid rgba(255,255,255,0.3); flex-shrink: 0; }
.mc-avatar img { width: 100%; height: 100%; object-fit: cover; }
.mc-welcome-text { flex: 1; }
.mc-welcome-text h1 { margin: 0 0 4px; font-size: 22px; }
.mc-welcome-text p { margin: 0; font-size: 13px; opacity: 0.8; }

.mc-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.mc-card {
  background: #fff; border-radius: 14px; box-shadow: 0 1px 6px rgba(0,0,0,0.05);
  overflow: hidden;
}
.mc-card-header { padding: 16px 20px 10px; font-weight: 700; font-size: 15px; border-bottom: 1px solid #f0f0f0; }
.mc-card-body { padding: 12px 20px; }
.mc-stat-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 14px; }
.mc-stat-row span { color: #888; }
.mc-stat-row strong { color: var(--color-text-primary); }
.mc-body-stats .mc-stat-row strong { color: var(--color-primary); font-size: 16px; }
.mc-card-foot { padding: 10px 20px; border-top: 1px solid #f0f0f0; text-align: right; }

.mc-empty-text { color: #bbb; font-size: 14px; text-align: center; padding: 16px 0; }
.mc-lp-item { display: flex; align-items: center; gap: 10px; padding: 5px 0; }
.mc-lp-link { flex: 1; min-width: 0; font-size: 14px; color: var(--color-primary); text-decoration: none; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.mc-lp-bar { flex: 1; height: 5px; border-radius: 3px; background: #e5e7eb; overflow: hidden; }
.mc-lp-fill { height: 100%; background: var(--color-primary); border-radius: 3px; transition: width .4s; }
.mc-lp-count { font-size: 12px; color: #888; white-space: nowrap; }

@media (max-width: 640px) { .mc-grid { grid-template-columns: 1fr; } }
</style>
