<template>
  <div class="cc-page">
    <Navbar :menu-links="menuLinks" />

    <!-- Hero -->
    <section class="cc-hero">
      <div class="cc-hero-orb cc-hero-orb--1"></div>
      <div class="cc-hero-orb cc-hero-orb--2"></div>
      <div class="cc-hero-inner">
        <div class="cc-hero-text">
          <h1>创作者中心</h1>
          <p>发布专业健身资讯，帮助更多人科学训练</p>
        </div>
        <div class="cc-hero-stats">
          <div class="cc-hs-item"><span class="cc-hs-num">{{ stats.total }}</span><span class="cc-hs-label">资讯</span></div>
          <div class="cc-hs-item"><span class="cc-hs-num">{{ stats.totalViews }}</span><span class="cc-hs-label">浏览</span></div>
          <div class="cc-hs-item"><span class="cc-hs-num">{{ stats.totalComments }}</span><span class="cc-hs-label">评论</span></div>
        </div>
      </div>
    </section>

    <!-- Tab Nav -->
    <div class="cc-tab-bar">
      <button :class="{ active: tab === 'publish' }" @click="tab = 'publish'">
        <PenTool :size="15" />发布资讯
      </button>
      <button :class="{ active: tab === 'manage' }" @click="tab = 'manage'">
        <FileText :size="15" />资讯管理
      </button>
      <button :class="{ active: tab === 'stats' }" @click="tab = 'stats'">
        <BarChart3 :size="15" />数据统计
      </button>
    </div>

    <div class="cc-container">
      <!-- ====== 发布资讯 ====== -->
      <div v-if="tab === 'publish'" class="cc-publish">
        <div class="cc-form-group">
          <label class="cc-form-label"><Type :size="14" />标题</label>
          <input v-model="form.title" class="cc-input" placeholder="资讯标题（50字以内）" maxlength="50" />
          <span class="cc-char-count">{{ form.title.length }}/50</span>
        </div>

        <div class="cc-form-row">
          <div class="cc-form-group">
            <label class="cc-form-label"><Layers :size="14" />分类</label>
            <div class="cc-cat-select">
              <button v-for="c in categories" :key="c.value"
                :class="['cc-cat-btn', { active: form.category === c.value }]"
                @click="form.category = c.value">
                <component :is="getCatIcon(c.value)" :size="14" />{{ c.label }}
              </button>
            </div>
          </div>
        </div>

        <div class="cc-form-group">
          <label class="cc-form-label"><Tags :size="14" />标签</label>
          <div class="cc-tags">
            <div class="cc-tag-input-wrap">
              <input v-model="tagInput" class="cc-tag-input" placeholder="输入标签回车添加" @keyup.enter="addTag" />
            </div>
            <span v-for="t in form.tags" :key="t" class="cc-tag">
              {{ t }}<button class="cc-tag-close" @click="removeTag(t)"><X :size="12" /></button>
            </span>
            <button v-for="t in quickTags" :key="t" class="cc-quick-tag" @click="addQuickTag(t)">{{ t }}</button>
          </div>
        </div>

        <div class="cc-form-group">
          <label class="cc-form-label"><AlignLeft :size="14" />摘要</label>
          <textarea v-model="form.summary" class="cc-textarea" placeholder="资讯摘要（200字以内）" maxlength="200" rows="2"></textarea>
          <span class="cc-char-count">{{ form.summary.length }}/200</span>
        </div>

        <div class="cc-form-group">
          <label class="cc-form-label"><Image :size="14" />封面图</label>
          <div v-if="form.image" class="cc-cover-preview">
            <img :src="form.image" />
            <button class="cc-cover-remove" @click="form.image = ''"><X :size="14" /></button>
          </div>
          <label v-else class="cc-cover-upload">
            <input type="file" accept="image/*" hidden @change="handleCover" />
            <ImagePlus :size="28" />
            <span>点击上传封面图</span>
          </label>
        </div>

        <div class="cc-form-group">
          <label class="cc-form-label"><FileText :size="14" />正文</label>
          <div class="cc-editor-toolbar">
            <button title="加粗"><Bold :size="14" /></button>
            <button title="斜体"><Italic :size="14" /></button>
            <button title="标题"><Heading :size="14" /></button>
            <button title="链接"><Link :size="14" /></button>
            <button title="图片"><Image :size="14" /></button>
          </div>
          <textarea v-model="form.content" class="cc-editor" placeholder="正文内容（支持HTML）" rows="14"></textarea>
        </div>

        <div class="cc-actions">
          <button class="cc-btn cc-btn--ghost" @click="saveDraft" :disabled="saving">
            <Save :size="14" />保存草稿
          </button>
          <button class="cc-btn cc-btn--primary" @click="submitNews" :disabled="saving">
            <Send :size="14" />{{ saving ? '提交中...' : '提交发布' }}
          </button>
        </div>
      </div>

      <!-- ====== 资讯管理 ====== -->
      <div v-if="tab === 'manage'" class="cc-manage">
        <div class="cc-manage-bar">
          <div class="cc-search-wrap">
            <Search :size="15" />
            <input v-model="searchQuery" class="cc-search" placeholder="搜索标题..." />
          </div>
          <div class="cc-filter-btns">
            <button :class="{ active: statusFilter === 'all' }" @click="statusFilter = 'all'">全部</button>
            <button :class="{ active: statusFilter === 'approved' }" @click="statusFilter = 'approved'">已发布</button>
            <button :class="{ active: statusFilter === 'pending' }" @click="statusFilter = 'pending'">待审核</button>
            <button :class="{ active: statusFilter === 'rejected' }" @click="statusFilter = 'rejected'">已驳回</button>
          </div>
        </div>

        <div v-if="filteredList.length === 0" class="cc-empty">
          <FileX :size="36" :stroke-width="1" />
          <p>暂无资讯</p>
        </div>

        <div v-else class="cc-list">
          <div v-for="item in filteredList" :key="item.id" class="cc-list-item">
            <div class="cc-list-item-img">
              <img v-if="item.image" :src="item.image" :alt="item.title" />
              <div v-else class="cc-list-item-placeholder"><Image :size="16" /></div>
            </div>
            <div class="cc-list-item-info">
              <h3>{{ item.title }}</h3>
              <div class="cc-list-meta">
                <span class="cc-list-cat" :class="`cc-cat--${item.category}`">{{ catLabel(item.category) }}</span>
                <span class="cc-list-status" :class="`cc-status--${item.status}`">{{ statusLabel(item.status) }}</span>
                <span><Eye :size="12" />{{ item.views || 0 }}</span>
                <span><Calendar :size="12" />{{ (item.publishDate || item.createdAt || '').slice(0, 10) }}</span>
              </div>
            </div>
            <div class="cc-list-item-actions">
              <button class="cc-item-btn" @click="editNews(item)"><Pencil :size="13" /></button>
              <button class="cc-item-btn cc-item-btn--danger" @click="deleteNews(item.id)"><Trash2 :size="13" /></button>
            </div>
          </div>
        </div>
      </div>

      <!-- ====== 数据统计 ====== -->
      <div v-if="tab === 'stats'" class="cc-stats">
        <div class="cc-stat-cards">
          <div class="cc-stat-card">
            <div class="cc-sc-icon cc-sc-icon--green"><FileText :size="20" /></div>
            <div><span class="cc-sc-num">{{ stats.total }}</span><span class="cc-sc-label">总资讯</span></div>
          </div>
          <div class="cc-stat-card">
            <div class="cc-sc-icon cc-sc-icon--blue"><Eye :size="20" /></div>
            <div><span class="cc-sc-num">{{ stats.totalViews }}</span><span class="cc-sc-label">总浏览</span></div>
          </div>
          <div class="cc-stat-card">
            <div class="cc-sc-icon cc-sc-icon--orange"><MessageCircle :size="20" /></div>
            <div><span class="cc-sc-num">{{ stats.totalComments }}</span><span class="cc-sc-label">总评论</span></div>
          </div>
        </div>

        <div class="cc-stat-section">
          <h3><Layers :size="16" />分类分布</h3>
          <div v-for="c in stats.categories" :key="c.name" class="cc-stat-bar">
            <span class="cc-sb-label">{{ c.name }}</span>
            <div class="cc-sb-track">
              <div class="cc-sb-fill" :style="{ width: (c.count / Math.max(stats.total, 1) * 100) + '%' }"></div>
            </div>
            <span class="cc-sb-num">{{ c.count }}篇</span>
          </div>
        </div>

        <div class="cc-stat-section">
          <h3><TrendingUp :size="16" />热门资讯 TOP5</h3>
          <div v-if="topNews.length === 0" class="cc-empty-sm"><p>暂无数据</p></div>
          <div v-else class="cc-top-list">
            <div v-for="(n, i) in topNews" :key="n.id" class="cc-top-item">
              <span class="cc-top-rank" :class="{ 'cc-top-rank--gold': i === 0, 'cc-top-rank--silver': i === 1, 'cc-top-rank--bronze': i === 2 }">{{ i + 1 }}</span>
              <span class="cc-top-title">{{ n.title }}</span>
              <span class="cc-top-views"><Eye :size="12" />{{ n.views || 0 }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import { CATEGORY_OPTIONS, COMMON_TAGS, CATEGORY_MAP } from '@/utils/constants'
import {
  PenTool, FileText, BarChart3, Type, Layers, Tags, AlignLeft, Image, ImagePlus,
  Bold, Italic, Heading, Link, Save, Send, Search, Eye, Calendar, Pencil,
  Trash2, MessageCircle, TrendingUp, X, FileX
} from 'lucide-vue-next'
import { BookOpen, Apple, Heart, Wrench } from 'lucide-vue-next'

const router = useRouter()
const API = import.meta.env.VITE_API_BASE_URL || '/api'
const tab = ref('publish')
const menuLinks = [
  { to: '/home', label: '首页' }, { to: '/news/list', label: '资讯' },
  { to: '/fitness', label: '训练&饮食' }, { to: '/recommendation', label: '发现' }
]

const categories = CATEGORY_OPTIONS
const quickTags = COMMON_TAGS.slice(0, 8)
const tagInput = ref('')
const saving = ref(false)
const form = reactive({ title: '', category: '', tags: [] as string[], summary: '', image: '', content: '' })

function getCatIcon(val: string) {
  const map: Record<string, any> = { knowledge: BookOpen, nutrition: Apple, recovery: Heart, equipment: Wrench }
  return map[val] || FileText
}

function addTag() {
  if (tagInput.value && !form.tags.includes(tagInput.value) && form.tags.length < 5) {
    form.tags.push(tagInput.value); tagInput.value = ''
  }
}
function removeTag(t: string) { form.tags = form.tags.filter(tag => tag !== t) }
function addQuickTag(t: string) { if (!form.tags.includes(t) && form.tags.length < 5) form.tags.push(t) }
function handleCover(file: any) {
  const f = file.target?.files?.[0] || file
  if (!f) return
  const reader = new FileReader()
  reader.onload = (e: any) => form.image = e.target.result
  reader.readAsDataURL(f)
}

async function submitNews() {
  if (!form.title || !form.category || !form.content) {
    alert('请填写标题、分类和正文'); return
  }
  saving.value = true
  try {
    const token = localStorage.getItem('token')
    const fd = new FormData()
    fd.append('title', form.title); fd.append('category', form.category); fd.append('content', form.content)
    fd.append('summary', form.summary); fd.append('tags', form.tags.join(','))
    const res = await fetch(`${API}/news`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd })
    if (!res.ok) throw new Error('提交失败')
    alert('提交成功，等待审核')
    Object.assign(form, { title: '', category: '', tags: [], summary: '', image: '', content: '' })
  } catch (e: any) {
    alert(e.message || '提交失败')
  } finally { saving.value = false }
}

function saveDraft() {
  localStorage.setItem('newsDraft', JSON.stringify(form))
  alert('草稿已保存')
}
function catLabel(c: string) { return (CATEGORY_MAP as Record<string, string>)[c] || c }
function statusLabel(s: string) { return ({ approved: '已发布', pending: '待审核', rejected: '已驳回' } as any)[s] || s }

// --- Manage ---
const searchQuery = ref(''); const statusFilter = ref('all')
const newsList = ref<any[]>([])
const filteredList = computed(() => {
  let list = newsList.value
  if (searchQuery.value) list = list.filter(n => n.title.includes(searchQuery.value))
  if (statusFilter.value !== 'all') list = list.filter(n => n.status === statusFilter.value)
  return list
})
async function fetchNews() {
  try {
    const res = await fetch(`${API}/news?limit=100`)
    const data = await res.json()
    newsList.value = (data.news || data.list || data || []).map((n: any) => ({
      ...n, tags: typeof n.tags === 'string' ? n.tags.split(',').filter(Boolean) : (n.tags || [])
    }))
  } catch (e) {}
}
function editNews(row: any) { alert(`编辑功能开发中：${row.title}`) }
async function deleteNews(id: number) {
  if (!confirm('确定删除？')) return
  try {
    await fetch(`${API}/news/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    alert('已删除'); fetchNews()
  } catch (e) { alert('删除失败') }
}

// --- Stats ---
const stats = reactive({ total: 0, totalViews: 0, totalComments: 0, categories: [] as { name: string; count: number }[] })
const topNews = computed(() => [...newsList.value].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5))

function calcStats() {
  const list = newsList.value
  stats.total = list.length
  stats.totalViews = list.reduce((s, n) => s + (n.views || 0), 0)
  stats.totalComments = list.reduce((s, n) => s + (n.commentCount || n.comment_count || 0), 0)
  const catMap: Record<string, number> = {}
  list.forEach(n => {
    const c = (CATEGORY_MAP as any)[n.category] || n.category
    catMap[c] = (catMap[c] || 0) + 1
  })
  stats.categories = Object.entries(catMap).map(([name, count]) => ({ name, count }))
}

onMounted(async () => { await fetchNews(); calcStats() })
</script>

<style scoped>
.cc-page { min-height: 100vh; background: var(--color-bg); }

/* Hero */
.cc-hero {
  position: relative; overflow: hidden;
  background: linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 50%, var(--color-primary-light) 100%);
  padding: var(--space-10) var(--space-4) var(--space-8);
}
.cc-hero-orb { position: absolute; border-radius: 50%; filter: blur(60px); opacity: 0.12; pointer-events: none; }
.cc-hero-orb--1 { width: 280px; height: 280px; background: var(--color-accent); top: -60px; right: -40px; }
.cc-hero-orb--2 { width: 180px; height: 180px; background: #fff; bottom: -50px; left: 15%; }
.cc-hero-inner {
  max-width: 900px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between;
  position: relative; z-index: 1; color: #fff;
}
.cc-hero-text h1 { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 800; margin: 0 0 4px; }
.cc-hero-text p { font-size: var(--text-sm); color: rgba(255,255,255,0.7); margin: 0; }
.cc-hero-stats { display: flex; gap: var(--space-6); }
.cc-hs-item { text-align: center; }
.cc-hs-num { display: block; font-size: var(--text-2xl); font-weight: 800; font-family: var(--font-display); }
.cc-hs-label { font-size: var(--text-xs); color: rgba(255,255,255,0.6); }

/* Tab Bar */
.cc-tab-bar {
  max-width: 900px; margin: -20px auto 0; position: relative; z-index: 2;
  display: flex; gap: 0; padding: 0;
  background: var(--color-bg-card); border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl); box-shadow: var(--shadow-lg); overflow: hidden;
}
.cc-tab-bar button {
  flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
  padding: var(--space-4); border: none; background: none;
  color: var(--color-text-tertiary); font-size: var(--text-sm); font-weight: 500;
  cursor: pointer; font-family: var(--font-body); transition: all 0.2s;
  border-bottom: 2px solid transparent;
}
.cc-tab-bar button:hover { color: var(--color-text-primary); background: var(--color-primary-50); }
.cc-tab-bar button.active { color: var(--color-primary); border-bottom-color: var(--color-primary); font-weight: 600; }

.cc-container { max-width: 900px; margin: 0 auto; padding: var(--space-6) var(--space-4) var(--space-16); }

/* Form */
.cc-publish { display: flex; flex-direction: column; gap: var(--space-5); }
.cc-form-group { display: flex; flex-direction: column; gap: 6px; position: relative; }
.cc-form-label { display: flex; align-items: center; gap: 6px; font-size: var(--text-sm); font-weight: 600; color: var(--color-text-secondary); }
.cc-input {
  padding: 10px 14px; border: 1px solid var(--color-border); border-radius: var(--radius-md);
  font-size: var(--text-sm); font-family: var(--font-body); color: var(--color-text-primary);
  background: var(--color-bg-card); transition: all 0.2s;
}
.cc-input:focus { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(27,107,58,0.1); }
.cc-textarea {
  padding: 10px 14px; border: 1px solid var(--color-border); border-radius: var(--radius-md);
  font-size: var(--text-sm); font-family: var(--font-body); color: var(--color-text-primary);
  background: var(--color-bg-card); resize: vertical; transition: all 0.2s;
}
.cc-textarea:focus { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(27,107,58,0.1); }
.cc-char-count { position: absolute; right: 8px; bottom: 8px; font-size: 11px; color: var(--color-text-tertiary); }

/* Category Select */
.cc-cat-select { display: flex; flex-wrap: wrap; gap: var(--space-2); }
.cc-cat-btn {
  display: flex; align-items: center; gap: 6px; padding: 8px 16px;
  border-radius: var(--radius-full); border: 1px solid var(--color-border);
  background: var(--color-bg-card); color: var(--color-text-secondary);
  font-size: var(--text-sm); cursor: pointer; font-family: var(--font-body); transition: all 0.2s;
}
.cc-cat-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }
.cc-cat-btn.active { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }

/* Tags */
.cc-tags { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.cc-tag-input-wrap { display: inline-flex; }
.cc-tag-input {
  width: 140px; padding: 6px 12px; border: 1px solid var(--color-border);
  border-radius: var(--radius-full); font-size: 12px; font-family: var(--font-body);
  color: var(--color-text-primary); background: var(--color-bg-card);
}
.cc-tag-input:focus { outline: none; border-color: var(--color-primary); }
.cc-tag {
  display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px;
  border-radius: var(--radius-full); background: var(--color-primary-50);
  color: var(--color-primary); font-size: 12px; font-weight: 500;
}
.cc-tag-close { display: flex; align-items: center; cursor: pointer; opacity: 0.6; }
.cc-tag-close:hover { opacity: 1; }
.cc-quick-tag {
  padding: 4px 12px; border-radius: var(--radius-full);
  border: 1px solid var(--color-border-light); background: var(--color-bg-card);
  font-size: 12px; color: var(--color-text-secondary); cursor: pointer;
  font-family: var(--font-body); transition: all 0.2s;
}
.cc-quick-tag:hover { border-color: var(--color-primary); color: var(--color-primary); }

/* Cover Upload */
.cc-cover-preview {
  position: relative; width: 240px; height: 140px;
  border-radius: var(--radius-md); overflow: hidden;
}
.cc-cover-preview img { width: 100%; height: 100%; object-fit: cover; }
.cc-cover-remove {
  position: absolute; top: 6px; right: 6px; width: 28px; height: 28px;
  border-radius: 50%; border: none; background: rgba(0,0,0,0.5);
  color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center;
}
.cc-cover-upload {
  width: 240px; height: 140px; border: 2px dashed var(--color-border);
  border-radius: var(--radius-md); display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 8px; cursor: pointer;
  color: var(--color-text-tertiary); font-size: var(--text-sm); transition: all 0.2s;
}
.cc-cover-upload:hover { border-color: var(--color-primary); color: var(--color-primary); }

/* Editor */
.cc-editor-toolbar {
  display: flex; gap: 2px; padding: 6px 8px;
  background: var(--color-surface); border: 1px solid var(--color-border);
  border-bottom: none; border-radius: var(--radius-md) var(--radius-md) 0 0;
}
.cc-editor-toolbar button {
  display: flex; align-items: center; justify-content: center;
  width: 32px; height: 28px; border: none; background: none;
  color: var(--color-text-secondary); cursor: pointer; border-radius: var(--radius-sm);
}
.cc-editor-toolbar button:hover { background: var(--color-bg-card); color: var(--color-text-primary); }
.cc-editor {
  width: 100%; padding: 14px; border: 1px solid var(--color-border);
  border-radius: 0 0 var(--radius-md) var(--radius-md);
  font-size: var(--text-sm); font-family: var(--font-mono); color: var(--color-text-primary);
  background: var(--color-bg-card); resize: vertical; line-height: 1.6;
}
.cc-editor:focus { outline: none; border-color: var(--color-primary); }

/* Actions */
.cc-actions { display: flex; gap: var(--space-3); padding-top: var(--space-2); }
.cc-btn {
  display: flex; align-items: center; gap: 6px; padding: 10px 24px;
  border-radius: var(--radius-full); font-size: var(--text-sm); font-weight: 600;
  cursor: pointer; transition: all 0.2s; font-family: var(--font-body);
}
.cc-btn--ghost { border: 1px solid var(--color-border); background: none; color: var(--color-text-secondary); }
.cc-btn--ghost:hover { background: var(--color-surface); }
.cc-btn--primary { border: none; background: var(--color-primary); color: #fff; }
.cc-btn--primary:hover { background: var(--color-primary-dark); }
.cc-btn:disabled { opacity: 0.5; cursor: not-allowed; }

/* Manage */
.cc-manage-bar { display: flex; gap: var(--space-3); margin-bottom: var(--space-4); flex-wrap: wrap; }
.cc-search-wrap {
  display: flex; align-items: center; gap: 8px; padding: 8px 14px;
  border: 1px solid var(--color-border); border-radius: var(--radius-full);
  background: var(--color-bg-card); flex: 1; max-width: 300px;
}
.cc-search-wrap svg { color: var(--color-text-tertiary); flex-shrink: 0; }
.cc-search {
  border: none; background: none; font-size: var(--text-sm); font-family: var(--font-body);
  color: var(--color-text-primary); width: 100%; outline: none;
}
.cc-filter-btns { display: flex; gap: 0; border: 1px solid var(--color-border); border-radius: var(--radius-full); overflow: hidden; }
.cc-filter-btns button {
  padding: 6px 14px; border: none; background: var(--color-bg-card);
  color: var(--color-text-tertiary); font-size: 12px; cursor: pointer;
  font-family: var(--font-body); transition: all 0.2s; border-right: 1px solid var(--color-border);
}
.cc-filter-btns button:last-child { border-right: none; }
.cc-filter-btns button:hover { color: var(--color-text-primary); }
.cc-filter-btns button.active { background: var(--color-primary); color: #fff; }

.cc-empty { text-align: center; padding: var(--space-12); color: var(--color-text-tertiary); }
.cc-empty svg { opacity: 0.2; margin-bottom: var(--space-3); }
.cc-empty p { font-size: var(--text-sm); }
.cc-empty-sm { text-align: center; padding: var(--space-4); color: var(--color-text-tertiary); font-size: var(--text-sm); }

/* List */
.cc-list { display: flex; flex-direction: column; gap: var(--space-2); }
.cc-list-item {
  display: flex; align-items: center; gap: var(--space-4); padding: var(--space-3) var(--space-4);
  background: var(--color-bg-card); border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg); transition: all 0.2s;
}
.cc-list-item:hover { border-color: var(--color-primary); box-shadow: var(--shadow-sm); }
.cc-list-item-img {
  width: 64px; height: 48px; border-radius: var(--radius-md);
  overflow: hidden; flex-shrink: 0; background: var(--color-surface);
}
.cc-list-item-img img { width: 100%; height: 100%; object-fit: cover; }
.cc-list-item-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: var(--color-text-tertiary); }
.cc-list-item-info { flex: 1; min-width: 0; }
.cc-list-item-info h3 {
  font-family: var(--font-display); font-size: var(--text-sm); font-weight: 700;
  margin: 0 0 4px; color: var(--color-text-primary);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.cc-list-meta { display: flex; gap: var(--space-3); align-items: center; font-size: 11px; color: var(--color-text-tertiary); flex-wrap: wrap; }
.cc-list-cat {
  padding: 1px 8px; border-radius: var(--radius-full); font-weight: 600;
  background: var(--color-primary-50); color: var(--color-primary);
}
.cc-list-status { font-weight: 600; }
.cc-status--approved { color: var(--state-success); }
.cc-status--pending { color: var(--state-warning); }
.cc-status--rejected { color: var(--state-error); }
.cc-list-item-actions { display: flex; gap: var(--space-2); flex-shrink: 0; }
.cc-item-btn {
  display: flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; border-radius: var(--radius-full);
  border: 1px solid var(--color-border-light); background: none;
  color: var(--color-text-tertiary); cursor: pointer; transition: all 0.2s;
}
.cc-item-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }
.cc-item-btn--danger:hover { border-color: var(--state-error); color: var(--state-error); }

/* Stats */
.cc-stat-cards { display: flex; gap: var(--space-4); margin-bottom: var(--space-6); }
.cc-stat-card {
  flex: 1; display: flex; align-items: center; gap: var(--space-3);
  padding: var(--space-5); background: var(--color-bg-card);
  border: 1px solid var(--color-border-light); border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}
.cc-sc-icon {
  width: 44px; height: 44px; border-radius: var(--radius-md);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.cc-sc-icon--green { background: var(--color-primary-50); color: var(--color-primary); }
.cc-sc-icon--blue { background: #EFF6FF; color: #2563EB; }
.cc-sc-icon--orange { background: var(--color-accent-50); color: var(--color-accent); }
.cc-sc-num { display: block; font-size: var(--text-xl); font-weight: 800; color: var(--color-text-primary); font-family: var(--font-display); }
.cc-sc-label { font-size: var(--text-xs); color: var(--color-text-tertiary); }

.cc-stat-section { margin-bottom: var(--space-6); }
.cc-stat-section h3 { display: flex; align-items: center; gap: 8px; font-family: var(--font-display); font-size: var(--text-base); font-weight: 700; margin-bottom: var(--space-4); }

.cc-stat-bar { display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-2); }
.cc-sb-label { width: 80px; font-size: var(--text-sm); color: var(--color-text-secondary); text-align: right; flex-shrink: 0; }
.cc-sb-track { flex: 1; height: 8px; border-radius: 4px; background: var(--color-surface); overflow: hidden; }
.cc-sb-fill { height: 100%; border-radius: 4px; background: var(--color-primary); transition: width 0.5s; }
.cc-sb-num { font-size: var(--text-xs); color: var(--color-text-tertiary); width: 36px; }

/* Top List */
.cc-top-list { display: flex; flex-direction: column; gap: var(--space-2); }
.cc-top-item { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-2) var(--space-3); border-radius: var(--radius-md); }
.cc-top-item:hover { background: var(--color-surface); }
.cc-top-rank {
  width: 24px; height: 24px; border-radius: var(--radius-full);
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700; background: var(--color-surface); color: var(--color-text-tertiary);
}
.cc-top-rank--gold { background: #FEF3C7; color: #D97706; }
.cc-top-rank--silver { background: #F3F4F6; color: #6B7280; }
.cc-top-rank--bronze { background: #FED7AA; color: #C2410C; }
.cc-top-title { flex: 1; font-size: var(--text-sm); color: var(--color-text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.cc-top-views { display: flex; align-items: center; gap: 4px; font-size: 11px; color: var(--color-text-tertiary); }

@media (max-width: 700px) {
  .cc-hero-inner { flex-direction: column; gap: var(--space-4); text-align: center; }
  .cc-stat-cards { flex-direction: column; }
  .cc-list-item { flex-wrap: wrap; }
}
</style>
