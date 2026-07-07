<template>
  <div class="coach-list-container">
    <div class="page-header">
      <div>
        <h1>专业教练</h1>
        <p>认证教练团队，助你科学训练</p>
      </div>
      <el-button type="primary" @click="showApplyDialog = true" v-if="userStore.isLoggedIn">
        <el-icon><Plus /></el-icon>
        申请成为教练
      </el-button>
    </div>

    <div v-if="loading" class="loading-state">
      <el-icon class="is-loading"><Loading /></el-icon>
      <span>加载中...</span>
    </div>

    <div v-else-if="!coaches.length" class="empty-state">
      <el-empty description="暂无教练" />
    </div>

    <div v-else class="coach-grid">
      <div v-for="coach in coaches" :key="coach.id" class="coach-card" @click="$router.push(`/fitness/coaches/${coach.id}`)">
        <div class="coach-avatar">
          <el-avatar :size="64" :src="coach.avatar">{{ coach.name[0] }}</el-avatar>
          <span v-if="coach.verified" class="verified-badge">✓ 已认证</span>
        </div>
        <div class="coach-info">
          <h3>{{ coach.name }}</h3>
          <p class="coach-title">{{ coach.title }}</p>
          <p class="coach-specialty">
            <el-tag v-for="s in coach.specialty?.split(',').slice(0, 3)" :key="s" size="small" type="info">{{ s.trim() }}</el-tag>
          </p>
          <p class="coach-bio">{{ coach.bio?.slice(0, 80) }}{{ coach.bio?.length > 80 ? '...' : '' }}</p>
        </div>
        <div class="coach-stats">
          <div class="stars">
            <el-rate v-model="coach.rating" disabled show-score text-color="#F97316" />
          </div>
          <div class="stat-row">
            <span>{{ coach.reviewCount }} 评价</span>
            <span>{{ coach.experienceYears }} 年经验</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 申请成为教练弹窗 -->
    <el-dialog v-model="showApplyDialog" title="申请成为教练" width="560px" :close-on-click-modal="false">
      <el-form :model="applyForm" label-width="100px" label-position="left">
        <el-form-item label="真实姓名" required>
          <el-input v-model="applyForm.name" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item label="职称头衔" required>
          <el-input v-model="applyForm.title" placeholder="如：NSCA-CSCS 认证体能教练" />
        </el-form-item>
        <el-form-item label="个人简介" required>
          <el-input v-model="applyForm.bio" type="textarea" :rows="3" placeholder="介绍您的专业背景和训练理念" />
        </el-form-item>
        <el-form-item label="专业领域" required>
          <el-input v-model="applyForm.specialty" placeholder="用逗号分隔，如：体能训练,增肌塑形" />
        </el-form-item>
        <el-form-item label="认证资质">
          <el-input v-model="applyForm.certifications" placeholder="用逗号分隔，如：NSCA-CSCS, ACE-CPT" />
        </el-form-item>
        <el-form-item label="从业年限">
          <el-input-number v-model="applyForm.experienceYears" :min="0" :max="50" />
        </el-form-item>
        <el-form-item label="教育背景">
          <el-input v-model="applyForm.education" placeholder="如：北京体育大学 运动人体科学" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showApplyDialog = false">取消</el-button>
        <el-button type="primary" @click="submitApply" :loading="applying">提交申请</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCoachStore } from '@/stores/coach'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const coachStore = useCoachStore()
const userStore = useUserStore()
const coaches = computed(() => coachStore.coaches)
const loading = computed(() => coachStore.loading)

const showApplyDialog = ref(false)
const applying = ref(false)
const applyForm = ref({
  name: '', title: '', bio: '', specialty: '', certifications: '', experienceYears: 0, education: ''
})

async function submitApply() {
  if (!applyForm.value.name || !applyForm.value.title || !applyForm.value.bio || !applyForm.value.specialty) {
    ElMessage.warning('请填写必填项')
    return
  }
  applying.value = true
  try {
    const res = await coachStore.apply(applyForm.value)
    if (res.success) {
      ElMessage.success(res.message || '申请已提交')
      showApplyDialog.value = false
    }
  } catch (e) {
    ElMessage.error('申请失败')
  } finally {
    applying.value = false
  }
}

onMounted(() => {
  coachStore.fetchList({ verified: 'true' })
})
</script>

<style scoped>
.coach-list-container { padding: 24px; max-width: 1200px; margin: 0 auto; }
.page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
.page-header h1 { font-size: 24px; color: #1B6B3A; margin: 0 0 4px; }
.page-header p { color: #666; margin: 0; }
.coach-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 20px; }
.coach-card {
  display: flex; flex-direction: column; gap: 12px;
  padding: 20px; border: 1px solid #eee; border-radius: 12px; cursor: pointer;
  transition: all 0.2s; background: #fff;
}
.coach-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); border-color: #1B6B3A; }
.coach-avatar { display: flex; align-items: center; gap: 12px; }
.verified-badge { font-size: 12px; color: #1B6B3A; background: #e8f5e9; padding: 2px 8px; border-radius: 10px; }
.coach-info h3 { margin: 0 0 4px; font-size: 17px; color: #333; }
.coach-title { color: #1B6B3A; font-size: 13px; margin: 0 0 8px; }
.coach-specialty { display: flex; gap: 6px; flex-wrap: wrap; margin: 0 0 8px; }
.coach-bio { color: #888; font-size: 13px; margin: 0; line-height: 1.5; }
.coach-stats { display: flex; justify-content: space-between; align-items: center; padding-top: 8px; border-top: 1px solid #f5f5f5; }
.stat-row { display: flex; gap: 12px; font-size: 12px; color: #999; }
.loading-state, .empty-state { display: flex; align-items: center; justify-content: center; padding: 80px 0; color: #999; gap: 12px; }
</style>
