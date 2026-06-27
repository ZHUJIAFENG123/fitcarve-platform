<template>
  <div class="profile-page">
    <Navbar :menu-links="menuLinks" />

    <div class="pf-hero">
      <div class="pf-hero-inner">
        <div class="pf-avatar">{{ (userInfo.username || '用').charAt(0) }}</div>
        <div>
          <h1>{{ userInfo.username || '健身爱好者' }}</h1>
          <p>{{ userInfo.signature || '热爱健身，享受生活！' }}</p>
        </div>
        <button class="pf-edit-btn" @click="openEditDialog">编辑资料</button>
      </div>
    </div>

    <div class="pf-container">
      <!-- 统计卡片 -->
      <div class="pf-stats">
        <div class="pf-stat" @click="goToFavorites">
          <span class="pf-stat-num">12</span>
          <span class="pf-stat-label">收藏</span>
        </div>
        <div class="pf-stat" @click="goToComments">
          <span class="pf-stat-num">8</span>
          <span class="pf-stat-label">评论</span>
        </div>
        <div class="pf-stat">
          <span class="pf-stat-num">{{ email || '—' }}</span>
          <span class="pf-stat-label">邮箱</span>
        </div>
      </div>

      <!-- 快捷入口 -->
      <div class="pf-links">
        <router-link to="/favorites" class="pf-link-card">⭐ 我的收藏</router-link>
        <router-link to="/my-comments" class="pf-link-card">💬 我的评论</router-link>
        <router-link to="/user/publish-news" class="pf-link-card">✍ 发布资讯</router-link>
        <router-link to="/user/manage-news" class="pf-link-card">📋 资讯管理</router-link>
        <button class="pf-link-card pf-logout" @click="handleLogout">🚪 退出登录</button>
      </div>

      <!-- 编辑资料对话框 -->
      <el-dialog v-model="editVisible" title="编辑资料" width="460px">
        <el-form :model="editForm" label-width="80px">
          <el-form-item label="昵称">
            <el-input v-model="editForm.username" placeholder="昵称" maxlength="10" />
          </el-form-item>
          <el-form-item label="签名">
            <el-input v-model="editForm.signature" placeholder="个人签名" maxlength="30" type="textarea" rows="2" />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="editVisible = false">取消</el-button>
          <el-button type="primary" @click="saveEdit">保存</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const menuLinks = [
  { to: '/home', label: '首页' },
  { to: '/news/list', label: '资讯' },
  { to: '/fitness', label: '训练&饮食' },
  { to: '/recommendation', label: '发现' }
]

const userInfo = ref({ username: '', signature: '', avatar: '' })
const email = ref('')
const editVisible = ref(false)
const editForm = ref({ username: '', signature: '' })

function loadUser() {
  try {
    const raw = localStorage.getItem('userInfo')
    if (raw) {
      const u = JSON.parse(raw)
      userInfo.value = u
      email.value = u.email || ''
    }
  } catch {}
}

function openEditDialog() {
  editForm.value = { username: userInfo.value.username, signature: userInfo.value.signature || '' }
  editVisible.value = true
}

function saveEdit() {
  userInfo.value.username = editForm.value.username
  userInfo.value.signature = editForm.value.signature
  localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
  editVisible.value = false
  ElMessage.success('资料已更新')
}

function handleLogout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userInfo')
  router.push('/login')
}

function goToFavorites() { router.push('/favorites') }
function goToComments() { router.push('/my-comments') }

onMounted(loadUser)
</script>

<style scoped>
.profile-page { min-height: 100vh; background: var(--color-bg); }

.pf-hero {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  padding: var(--space-8) var(--space-4);
}
.pf-hero-inner {
  max-width: 700px; margin: 0 auto; display: flex; align-items: center; gap: var(--space-5);
  color: #fff;
}
.pf-avatar {
  width: 64px; height: 64px; border-radius: 50%; background: rgba(255,255,255,0.2);
  display: flex; align-items: center; justify-content: center; font-size: 28px;
  font-weight: 800; flex-shrink: 0; font-family: var(--font-display);
}
.pf-hero-inner h1 { font-family: var(--font-display); font-size: var(--text-2xl); margin: 0; }
.pf-hero-inner p { font-size: var(--text-sm); color: var(--color-primary-100); margin: 4px 0 0; }
.pf-edit-btn {
  margin-left: auto; padding: 8px 20px; border-radius: var(--radius-md);
  border: 1px solid rgba(255,255,255,0.3); background: transparent; color: #fff;
  cursor: pointer; font-family: var(--font-body); font-size: var(--text-sm); transition: all 0.2s;
}
.pf-edit-btn:hover { background: rgba(255,255,255,0.1); border-color: #fff; }

.pf-container { max-width: 700px; margin: 0 auto; padding: var(--space-6) var(--space-4) var(--space-16); }

.pf-stats {
  display: flex; gap: var(--space-4); margin-bottom: var(--space-6);
  background: var(--color-bg-card); border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl); padding: var(--space-5); box-shadow: var(--shadow-sm);
}
.pf-stat { flex: 1; text-align: center; cursor: pointer; transition: all 0.2s; padding: var(--space-2); border-radius: var(--radius-md); }
.pf-stat:hover { background: var(--color-primary-50); }
.pf-stat-num { display: block; font-size: var(--text-xl); font-weight: 800; color: var(--color-primary); font-family: var(--font-display); }
.pf-stat-label { font-size: var(--text-xs); color: var(--color-text-tertiary); margin-top: 2px; }

.pf-links { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); }
.pf-link-card {
  padding: var(--space-4) var(--space-5);
  background: var(--color-bg-card); border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg); font-size: var(--text-sm); font-weight: 600;
  color: var(--color-text-primary); text-decoration: none; cursor: pointer;
  transition: all 0.2s; display: flex; align-items: center; gap: var(--space-2);
  font-family: var(--font-body); box-shadow: var(--shadow-sm);
}
.pf-link-card:hover { border-color: var(--color-primary); background: var(--color-primary-50); transform: translateY(-2px); }
.pf-logout { color: var(--state-error); }
.pf-logout:hover { border-color: var(--state-error); background: #FEF2F2; }

@media (max-width: 500px) {
  .pf-hero-inner { flex-wrap: wrap; }
  .pf-links { grid-template-columns: 1fr; }
  .pf-stats { flex-wrap: wrap; }
}
</style>
