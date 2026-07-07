<template>
  <div class="profile-page">
    <Navbar :menu-links="menuLinks" />

    <!-- Hero Section -->
    <section class="pf-hero">
      <div class="pf-hero-orb pf-hero-orb--1"></div>
      <div class="pf-hero-orb pf-hero-orb--2"></div>
      <div class="pf-hero-inner">
        <div class="pf-avatar-ring">
          <div class="pf-avatar">
            <span>{{ (userInfo.username || '用').charAt(0) }}</span>
          </div>
        </div>
        <div class="pf-hero-info">
          <h1>{{ userInfo.username || '健身爱好者' }}</h1>
          <p class="pf-signature">{{ userInfo.signature || '热爱健身，享受生活！' }}</p>
          <div class="pf-hero-meta">
            <span class="pf-meta-item"><Mail :size="13" />{{ email || '未设置邮箱' }}</span>
            <span class="pf-meta-item"><Calendar :size="13" />加入于 2025</span>
          </div>
        </div>
        <button class="pf-edit-btn" @click="openEditDialog">
          <Pencil :size="14" />编辑资料
        </button>
      </div>
    </section>

    <!-- Stats Bar -->
    <div class="pf-stats-bar">
      <div class="pf-stat" @click="activeTab = 'favorites'">
        <Bookmark :size="18" />
        <div class="pf-stat-body">
          <span class="pf-stat-num">{{ stats.favorites }}</span>
          <span class="pf-stat-label">收藏</span>
        </div>
      </div>
      <div class="pf-stat" @click="activeTab = 'comments'">
        <MessageCircle :size="18" />
        <div class="pf-stat-body">
          <span class="pf-stat-num">{{ stats.comments }}</span>
          <span class="pf-stat-label">评论</span>
        </div>
      </div>
      <div class="pf-stat" @click="activeTab = 'drafts'">
        <FileText :size="18" />
        <div class="pf-stat-body">
          <span class="pf-stat-num">{{ stats.drafts }}</span>
          <span class="pf-stat-label">草稿</span>
        </div>
      </div>
      <div class="pf-stat">
        <Eye :size="18" />
        <div class="pf-stat-body">
          <span class="pf-stat-num">{{ stats.views }}</span>
          <span class="pf-stat-label">总浏览</span>
        </div>
      </div>
    </div>

    <!-- Tab Navigation -->
    <div class="pf-container">
      <nav class="pf-tabs">
        <button :class="{ active: activeTab === 'overview' }" @click="activeTab = 'overview'">
          <LayoutDashboard :size="15" />概览
        </button>
        <button :class="{ active: activeTab === 'favorites' }" @click="activeTab = 'favorites'">
          <Bookmark :size="15" />我的收藏
        </button>
        <button :class="{ active: activeTab === 'comments' }" @click="activeTab = 'comments'">
          <MessageCircle :size="15" />我的评论
        </button>
        <button :class="{ active: activeTab === 'drafts' }" @click="activeTab = 'drafts'">
          <FileText :size="15" />草稿箱
        </button>
        <button :class="{ active: activeTab === 'settings' }" @click="activeTab = 'settings'">
          <Settings :size="15" />设置
        </button>
      </nav>

      <!-- Overview Tab -->
      <div v-if="activeTab === 'overview'" class="pf-tab-content">
        <div class="pf-overview-grid">
          <div class="pf-overview-card" @click="activeTab = 'favorites'">
            <div class="pf-ov-icon pf-ov-icon--green"><Bookmark :size="20" /></div>
            <div><h3>{{ stats.favorites }}</h3><p>收藏内容</p></div>
            <ChevronRight :size="16" class="pf-ov-arrow" />
          </div>
          <div class="pf-overview-card" @click="activeTab = 'comments'">
            <div class="pf-ov-icon pf-ov-icon--blue"><MessageCircle :size="20" /></div>
            <div><h3>{{ stats.comments }}</h3><p>我的评论</p></div>
            <ChevronRight :size="16" class="pf-ov-arrow" />
          </div>
          <div class="pf-overview-card" @click="activeTab = 'drafts'">
            <div class="pf-ov-icon pf-ov-icon--orange"><FileText :size="20" /></div>
            <div><h3>{{ stats.drafts }}</h3><p>草稿箱</p></div>
            <ChevronRight :size="16" class="pf-ov-arrow" />
          </div>
          <div class="pf-overview-card" @click="$router.push('/creator')">
            <div class="pf-ov-icon pf-ov-icon--purple"><PenTool :size="20" /></div>
            <div><h3>创作者</h3><p>发布资讯</p></div>
            <ChevronRight :size="16" class="pf-ov-arrow" />
          </div>
        </div>
        <div class="pf-quick-actions">
          <h3>快捷操作</h3>
          <div class="pf-actions-grid">
            <router-link to="/fitness" class="pf-action"><Dumbbell :size="18" /><span>训练计划</span></router-link>
            <router-link to="/fitness/diet" class="pf-action"><UtensilsCrossed :size="18" /><span>饮食管理</span></router-link>
            <router-link to="/news/list" class="pf-action"><Newspaper :size="18" /><span>浏览资讯</span></router-link>
            <router-link to="/fitness/calculator" class="pf-action"><Calculator :size="18" /><span>热量计算</span></router-link>
          </div>
        </div>
      </div>

      <!-- Favorites Tab -->
      <div v-if="activeTab === 'favorites'" class="pf-tab-content">
        <div v-if="favoriteItems.length === 0" class="pf-empty">
          <Bookmark :size="40" :stroke-width="1" />
          <h3>暂无收藏</h3>
          <p>浏览资讯时点击收藏按钮，内容会出现在这里</p>
          <router-link to="/news/list" class="pf-empty-btn">去发现内容</router-link>
        </div>
        <div v-else class="pf-fav-grid">
          <article v-for="item in favoriteItems" :key="item.id" class="pf-fav-card" @click="$router.push(`/news/detail/${item.id}`)">
            <div class="pf-fav-card-img">
              <img v-if="item.image" :src="item.image" :alt="item.title" />
              <span class="pf-fav-cat">{{ item.categoryName || '资讯' }}</span>
            </div>
            <div class="pf-fav-card-body">
              <h3>{{ item.title }}</h3>
              <p>{{ (item.summary || '').slice(0, 60) }}</p>
              <div class="pf-fav-card-meta">
                <span><Eye :size="12" />{{ item.views || 0 }}</span>
                <button class="pf-fav-remove" @click.stop="removeFavorite(item.id)"><Trash2 :size="12" />移除</button>
              </div>
            </div>
          </article>
        </div>
      </div>

      <!-- Comments Tab -->
      <div v-if="activeTab === 'comments'" class="pf-tab-content">
        <div v-if="commentItems.length === 0" class="pf-empty">
          <MessageCircle :size="40" :stroke-width="1" />
          <h3>暂无评论</h3>
          <p>在资讯下方发表评论，你的评论记录会显示在这里</p>
        </div>
        <div v-else class="pf-comment-list">
          <div v-for="c in commentItems" :key="c.id" class="pf-comment-item">
            <div class="pf-comment-head">
              <span class="pf-comment-article" @click="$router.push(`/news/detail/${c.newsId}`)">{{ c.articleTitle }}</span>
              <span class="pf-comment-time">{{ c.time }}</span>
            </div>
            <p class="pf-comment-text">{{ c.content }}</p>
          </div>
        </div>
      </div>

      <!-- Drafts Tab -->
      <div v-if="activeTab === 'drafts'" class="pf-tab-content">
        <div v-if="draftItems.length === 0" class="pf-empty">
          <FileText :size="40" :stroke-width="1" />
          <h3>暂无草稿</h3>
          <p>在创作者中心撰写资讯时，可以保存为草稿</p>
          <router-link to="/creator" class="pf-empty-btn">去创作</router-link>
        </div>
        <div v-else class="pf-draft-list">
          <div v-for="d in draftItems" :key="d.title" class="pf-draft-item" @click="$router.push('/creator')">
            <div class="pf-draft-info">
              <h3>{{ d.title || '无标题草稿' }}</h3>
              <div class="pf-draft-meta">
                <span>{{ catLabel(d.category) }}</span>
                <span>{{ (d.summary || '').slice(0, 30) }}</span>
              </div>
            </div>
            <div class="pf-draft-actions">
              <button class="pf-draft-edit"><Pencil :size="13" />编辑</button>
              <button class="pf-draft-del" @click.stop="removeDraft(d.title)"><Trash2 :size="13" /></button>
            </div>
          </div>
        </div>
      </div>

      <!-- Settings Tab -->
      <div v-if="activeTab === 'settings'" class="pf-tab-content">
        <div class="pf-settings-section">
          <h3>账号设置</h3>
          <div class="pf-settings-item">
            <div class="pf-settings-label"><User :size="15" />用户名</div>
            <div class="pf-settings-value">{{ userInfo.username || '—' }}</div>
          </div>
          <div class="pf-settings-item">
            <div class="pf-settings-label"><Mail :size="15" />邮箱</div>
            <div class="pf-settings-value">{{ email || '—' }}</div>
          </div>
          <div class="pf-settings-item">
            <div class="pf-settings-label"><FileText :size="15" />个人签名</div>
            <div class="pf-settings-value">{{ userInfo.signature || '未设置' }}</div>
          </div>
        </div>
        <div class="pf-settings-section">
          <h3>危险操作</h3>
          <button class="pf-logout-btn" @click="handleLogout">
            <LogOut :size="15" />退出登录
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Dialog -->
    <div v-if="editVisible" class="pf-modal-overlay" @click.self="editVisible = false">
      <div class="pf-modal">
        <div class="pf-modal-header">
          <h3>编辑资料</h3>
          <button class="pf-modal-close" @click="editVisible = false"><X :size="18" /></button>
        </div>
        <div class="pf-modal-body">
          <div class="pf-field">
            <label>用户名</label>
            <input v-model="editForm.username" placeholder="你的昵称" maxlength="10" />
          </div>
          <div class="pf-field">
            <label>个人签名</label>
            <textarea v-model="editForm.signature" placeholder="介绍一下自己..." maxlength="50" rows="2"></textarea>
          </div>
        </div>
        <div class="pf-modal-footer">
          <button class="pf-btn pf-btn--ghost" @click="editVisible = false">取消</button>
          <button class="pf-btn pf-btn--primary" @click="saveEdit">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import { CATEGORY_MAP } from '@/utils/constants'
import {
  User, Mail, Calendar, Pencil, Bookmark, MessageCircle, FileText, Eye,
  LayoutDashboard, Settings, ChevronRight, Dumbbell, UtensilsCrossed,
  Newspaper, Calculator, PenTool, Trash2, LogOut, X
} from 'lucide-vue-next'

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
const activeTab = ref('overview')

const stats = reactive({ favorites: 0, comments: 0, drafts: 0, views: 0 })
const favoriteItems = ref([])
const commentItems = ref([])
const draftItems = ref([])

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

function loadFavorites() {
  try {
    const raw = localStorage.getItem('favoritedNews')
    const ids = raw ? JSON.parse(raw) : []
    stats.favorites = ids.length
    favoriteItems.value = ids.map((id, i) => ({
      id, title: `收藏的资讯 #${id}`, summary: '点击查看详情', views: 0, categoryName: '资讯', image: ''
    }))
  } catch { favoriteItems.value = [] }
}

function loadDrafts() {
  try {
    const raw = localStorage.getItem('newsDraft')
    if (raw) {
      const d = JSON.parse(raw)
      if (d.title || d.content) {
        draftItems.value = [d]
      }
    }
  } catch {}
  stats.drafts = draftItems.value.length
}

function removeFavorite(id) {
  try {
    const raw = localStorage.getItem('favoritedNews')
    let ids = raw ? JSON.parse(raw) : []
    ids = ids.filter(fid => fid !== id)
    localStorage.setItem('favoritedNews', JSON.stringify(ids))
    loadFavorites()
  } catch {}
}

function removeDraft(title) {
  localStorage.removeItem('newsDraft')
  loadDrafts()
}

function catLabel(c) { return (CATEGORY_MAP)[c] || c || '未分类' }

function openEditDialog() {
  editForm.value = { username: userInfo.value.username, signature: userInfo.value.signature || '' }
  editVisible.value = true
}

function saveEdit() {
  userInfo.value.username = editForm.value.username
  userInfo.value.signature = editForm.value.signature
  localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
  editVisible.value = false
}

function handleLogout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userInfo')
  router.push('/login')
}

onMounted(() => {
  loadUser()
  loadFavorites()
  loadDrafts()
})
</script>

<style scoped>
.profile-page { min-height: 100vh; background: var(--color-bg); }

/* Hero */
.pf-hero {
  position: relative; overflow: hidden;
  background: linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 50%, var(--color-primary-light) 100%);
  padding: var(--space-10) var(--space-4) var(--space-8);
}
.pf-hero-orb {
  position: absolute; border-radius: 50%; filter: blur(60px); opacity: 0.15; pointer-events: none;
}
.pf-hero-orb--1 { width: 300px; height: 300px; background: var(--color-accent); top: -80px; right: -60px; }
.pf-hero-orb--2 { width: 200px; height: 200px; background: #fff; bottom: -60px; left: 10%; }

.pf-hero-inner {
  max-width: 900px; margin: 0 auto; display: flex; align-items: center; gap: var(--space-6);
  position: relative; z-index: 1; color: #fff;
}
.pf-avatar-ring {
  padding: 3px; border-radius: 50%;
  background: linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1));
  flex-shrink: 0;
}
.pf-avatar {
  width: 72px; height: 72px; border-radius: 50%;
  background: rgba(255,255,255,0.2); backdrop-filter: blur(10px);
  display: flex; align-items: center; justify-content: center;
  font-size: 28px; font-weight: 800; font-family: var(--font-display);
}
.pf-hero-info { flex: 1; }
.pf-hero-info h1 { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 800; margin: 0 0 4px; }
.pf-signature { font-size: var(--text-sm); color: rgba(255,255,255,0.75); margin: 0 0 8px; }
.pf-hero-meta { display: flex; gap: var(--space-4); }
.pf-meta-item { display: flex; align-items: center; gap: 4px; font-size: var(--text-xs); color: rgba(255,255,255,0.6); }
.pf-meta-item svg { opacity: 0.7; }

.pf-edit-btn {
  display: flex; align-items: center; gap: 6px; padding: 8px 20px;
  border-radius: var(--radius-full); border: 1px solid rgba(255,255,255,0.3);
  background: rgba(255,255,255,0.1); backdrop-filter: blur(8px);
  color: #fff; cursor: pointer; font-size: var(--text-sm); font-weight: 600;
  font-family: var(--font-body); transition: all 0.2s; margin-left: auto; flex-shrink: 0;
}
.pf-edit-btn:hover { background: rgba(255,255,255,0.2); border-color: rgba(255,255,255,0.5); }

/* Stats Bar */
.pf-stats-bar {
  max-width: 900px; margin: -28px auto 0; position: relative; z-index: 2;
  display: flex; gap: 0; padding: 0;
  background: var(--color-bg-card); border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl); box-shadow: var(--shadow-lg); overflow: hidden;
}
.pf-stat {
  flex: 1; display: flex; align-items: center; gap: var(--space-3);
  padding: var(--space-4) var(--space-5); cursor: pointer; transition: all 0.2s;
  border-right: 1px solid var(--color-border-light);
}
.pf-stat:last-child { border-right: none; }
.pf-stat:hover { background: var(--color-primary-50); }
.pf-stat svg { color: var(--color-primary); opacity: 0.6; flex-shrink: 0; }
.pf-stat-body { display: flex; flex-direction: column; }
.pf-stat-num { font-size: var(--text-lg); font-weight: 800; color: var(--color-text-primary); font-family: var(--font-display); }
.pf-stat-label { font-size: var(--text-xs); color: var(--color-text-tertiary); }

/* Container */
.pf-container { max-width: 900px; margin: 0 auto; padding: var(--space-6) var(--space-4) var(--space-16); }

/* Tabs */
.pf-tabs {
  display: flex; gap: var(--space-1); margin-bottom: var(--space-6);
  border-bottom: 1px solid var(--color-border-light); padding-bottom: 0;
}
.pf-tabs button {
  display: flex; align-items: center; gap: 6px;
  padding: var(--space-3) var(--space-4); border: none; background: none;
  color: var(--color-text-tertiary); font-size: var(--text-sm); font-weight: 500;
  cursor: pointer; font-family: var(--font-body); transition: all 0.2s;
  border-bottom: 2px solid transparent; margin-bottom: -1px;
}
.pf-tabs button:hover { color: var(--color-text-primary); }
.pf-tabs button.active {
  color: var(--color-primary); border-bottom-color: var(--color-primary); font-weight: 600;
}

/* Tab Content */
.pf-tab-content { animation: fadeUp 0.3s ease; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

/* Overview Grid */
.pf-overview-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); margin-bottom: var(--space-6); }
.pf-overview-card {
  display: flex; align-items: center; gap: var(--space-4); padding: var(--space-5);
  background: var(--color-bg-card); border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg); cursor: pointer; transition: all 0.2s; box-shadow: var(--shadow-sm);
}
.pf-overview-card:hover { border-color: var(--color-primary); transform: var(--hover-lift-sm); box-shadow: var(--shadow-md); }
.pf-ov-icon {
  width: 44px; height: 44px; border-radius: var(--radius-md);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.pf-ov-icon--green { background: var(--color-primary-50); color: var(--color-primary); }
.pf-ov-icon--blue { background: #EFF6FF; color: #2563EB; }
.pf-ov-icon--orange { background: var(--color-accent-50); color: var(--color-accent); }
.pf-ov-icon--purple { background: #F5F3FF; color: #7C3AED; }
.pf-overview-card h3 { font-family: var(--font-display); font-size: var(--text-lg); font-weight: 800; color: var(--color-text-primary); margin: 0; }
.pf-overview-card p { font-size: var(--text-xs); color: var(--color-text-tertiary); margin: 2px 0 0; }
.pf-ov-arrow { margin-left: auto; color: var(--color-text-tertiary); opacity: 0.4; }

/* Quick Actions */
.pf-quick-actions h3 { font-family: var(--font-display); font-size: var(--text-base); font-weight: 700; margin-bottom: var(--space-3); }
.pf-actions-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-3); }
.pf-action {
  display: flex; flex-direction: column; align-items: center; gap: 8px; padding: var(--space-4);
  background: var(--color-bg-card); border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg); text-decoration: none; color: var(--color-text-secondary);
  font-size: var(--text-xs); font-weight: 500; transition: all 0.2s;
}
.pf-action:hover { border-color: var(--color-primary); color: var(--color-primary); transform: var(--hover-lift-sm); }

/* Empty State */
.pf-empty {
  text-align: center; padding: var(--space-12) var(--space-4);
  color: var(--color-text-tertiary);
}
.pf-empty svg { opacity: 0.2; margin-bottom: var(--space-4); }
.pf-empty h3 { font-family: var(--font-display); font-size: var(--text-base); color: var(--color-text-secondary); margin: 0 0 4px; }
.pf-empty p { font-size: var(--text-sm); margin: 0 0 var(--space-4); }
.pf-empty-btn {
  display: inline-flex; align-items: center; padding: 8px 20px;
  border-radius: var(--radius-full); background: var(--color-primary);
  color: #fff; text-decoration: none; font-size: var(--text-sm); font-weight: 600;
  transition: all 0.2s;
}
.pf-empty-btn:hover { background: var(--color-primary-dark); }

/* Favorites Grid */
.pf-fav-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: var(--space-4); }
.pf-fav-card {
  background: var(--color-bg-card); border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg); overflow: hidden; cursor: pointer;
  transition: all 0.2s; box-shadow: var(--shadow-sm);
}
.pf-fav-card:hover { transform: var(--hover-lift); box-shadow: var(--shadow-lg); }
.pf-fav-card-img {
  height: 120px; background: var(--color-primary-50); position: relative;
  display: flex; align-items: center; justify-content: center; overflow: hidden;
}
.pf-fav-card-img img { width: 100%; height: 100%; object-fit: cover; }
.pf-fav-cat {
  position: absolute; top: 8px; left: 8px; font-size: 11px; font-weight: 600;
  padding: 2px 10px; border-radius: var(--radius-full);
  background: var(--color-primary); color: #fff;
}
.pf-fav-card-body { padding: var(--space-3); }
.pf-fav-card-body h3 {
  font-family: var(--font-display); font-size: var(--text-sm); font-weight: 700;
  margin: 0 0 4px; color: var(--color-text-primary);
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.pf-fav-card-body p { font-size: 12px; color: var(--color-text-secondary); margin: 0 0 8px; }
.pf-fav-card-meta { display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--color-text-tertiary); }
.pf-fav-card-meta span { display: flex; align-items: center; gap: 3px; }
.pf-fav-remove {
  display: flex; align-items: center; gap: 3px; border: none; background: none;
  color: var(--state-error); cursor: pointer; font-size: 11px; padding: 2px 6px;
  border-radius: var(--radius-sm); transition: all 0.2s;
}
.pf-fav-remove:hover { background: #FEF2F2; }

/* Comments */
.pf-comment-list { display: flex; flex-direction: column; gap: var(--space-3); }
.pf-comment-item {
  padding: var(--space-4); background: var(--color-bg-card);
  border: 1px solid var(--color-border-light); border-radius: var(--radius-lg);
}
.pf-comment-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.pf-comment-article {
  font-size: var(--text-sm); font-weight: 600; color: var(--color-primary); cursor: pointer;
}
.pf-comment-article:hover { text-decoration: underline; }
.pf-comment-time { font-size: var(--text-xs); color: var(--color-text-tertiary); }
.pf-comment-text { font-size: var(--text-sm); color: var(--color-text-secondary); margin: 0; line-height: 1.5; }

/* Drafts */
.pf-draft-list { display: flex; flex-direction: column; gap: var(--space-3); }
.pf-draft-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--space-4) var(--space-5); background: var(--color-bg-card);
  border: 1px solid var(--color-border-light); border-radius: var(--radius-lg);
  cursor: pointer; transition: all 0.2s;
}
.pf-draft-item:hover { border-color: var(--color-primary); }
.pf-draft-info h3 { font-family: var(--font-display); font-size: var(--text-sm); font-weight: 700; margin: 0 0 4px; }
.pf-draft-meta { display: flex; gap: var(--space-3); font-size: var(--text-xs); color: var(--color-text-tertiary); }
.pf-draft-actions { display: flex; gap: var(--space-2); }
.pf-draft-edit {
  display: flex; align-items: center; gap: 4px; padding: 6px 12px;
  border-radius: var(--radius-full); border: 1px solid var(--color-primary);
  background: none; color: var(--color-primary); cursor: pointer; font-size: 12px; font-weight: 600;
}
.pf-draft-edit:hover { background: var(--color-primary-50); }
.pf-draft-del {
  display: flex; align-items: center; padding: 6px 8px;
  border-radius: var(--radius-full); border: 1px solid var(--color-border-light);
  background: none; color: var(--color-text-tertiary); cursor: pointer;
}
.pf-draft-del:hover { border-color: var(--state-error); color: var(--state-error); }

/* Settings */
.pf-settings-section { margin-bottom: var(--space-6); }
.pf-settings-section h3 { font-family: var(--font-display); font-size: var(--text-base); font-weight: 700; margin-bottom: var(--space-3); }
.pf-settings-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  background: var(--color-bg-card); border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md); margin-bottom: var(--space-2);
}
.pf-settings-label { display: flex; align-items: center; gap: 8px; font-size: var(--text-sm); color: var(--color-text-secondary); }
.pf-settings-value { font-size: var(--text-sm); font-weight: 600; color: var(--color-text-primary); }
.pf-logout-btn {
  display: flex; align-items: center; gap: 8px; padding: 10px 24px;
  border-radius: var(--radius-full); border: 1px solid var(--state-error);
  background: none; color: var(--state-error); cursor: pointer; font-size: var(--text-sm); font-weight: 600;
  transition: all 0.2s;
}
.pf-logout-btn:hover { background: #FEF2F2; }

/* Modal */
.pf-modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center; z-index: 1000;
  animation: fadeIn 0.2s ease;
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.pf-modal {
  width: 420px; max-width: 90vw; background: var(--color-bg-card);
  border-radius: var(--radius-xl); box-shadow: var(--shadow-xl); overflow: hidden;
  animation: scaleIn 0.2s ease;
}
@keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
.pf-modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--space-5); border-bottom: 1px solid var(--color-border-light);
}
.pf-modal-header h3 { font-family: var(--font-display); font-size: var(--text-base); font-weight: 700; margin: 0; }
.pf-modal-close {
  display: flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; border-radius: var(--radius-full);
  border: none; background: none; color: var(--color-text-tertiary); cursor: pointer;
}
.pf-modal-close:hover { background: var(--color-surface); }
.pf-modal-body { padding: var(--space-5); }
.pf-field { margin-bottom: var(--space-4); }
.pf-field label { display: block; font-size: var(--text-sm); font-weight: 600; color: var(--color-text-secondary); margin-bottom: 6px; }
.pf-field input, .pf-field textarea {
  width: 100%; padding: 10px 14px; border: 1px solid var(--color-border);
  border-radius: var(--radius-md); font-size: var(--text-sm); font-family: var(--font-body);
  color: var(--color-text-primary); background: var(--color-bg); transition: all 0.2s;
}
.pf-field input:focus, .pf-field textarea:focus {
  outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(27,107,58,0.1);
}
.pf-modal-footer {
  display: flex; justify-content: flex-end; gap: var(--space-3);
  padding: var(--space-4) var(--space-5); border-top: 1px solid var(--color-border-light);
}
.pf-btn {
  padding: 8px 20px; border-radius: var(--radius-full); font-size: var(--text-sm);
  font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: var(--font-body);
}
.pf-btn--ghost { border: 1px solid var(--color-border); background: none; color: var(--color-text-secondary); }
.pf-btn--ghost:hover { background: var(--color-surface); }
.pf-btn--primary { border: none; background: var(--color-primary); color: #fff; }
.pf-btn--primary:hover { background: var(--color-primary-dark); }

/* Responsive */
@media (max-width: 700px) {
  .pf-hero-inner { flex-wrap: wrap; }
  .pf-edit-btn { margin-left: 0; }
  .pf-stats-bar { flex-wrap: wrap; margin-top: -20px; }
  .pf-stat { flex: 1 1 45%; border-bottom: 1px solid var(--color-border-light); }
  .pf-overview-grid { grid-template-columns: 1fr; }
  .pf-actions-grid { grid-template-columns: 1fr 1fr; }
  .pf-tabs { overflow-x: auto; }
  .pf-tabs button { white-space: nowrap; font-size: 12px; padding: var(--space-2) var(--space-3); }
}
</style>
