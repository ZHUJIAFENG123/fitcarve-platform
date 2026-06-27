<template>
  <div class="cc-page">
    <Navbar :menu-links="menuLinks" />

    <div class="cc-hero">
      <h1>🎨 创作者中心</h1>
      <div class="cc-tabs">
        <button :class="{ active: tab === 'publish' }" @click="tab = 'publish'">📝 发布资讯</button>
        <button :class="{ active: tab === 'manage' }" @click="tab = 'manage'">📋 资讯管理</button>
        <button :class="{ active: tab === 'stats' }" @click="tab = 'stats'">📊 数据统计</button>
      </div>
    </div>

    <div class="cc-container">
      <!-- ====== 发布资讯 ====== -->
      <div v-if="tab === 'publish'" class="cc-publish">
        <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" placeholder="资讯标题（50字以内）" maxlength="50" show-word-limit />
          </el-form-item>

          <div class="cc-row">
            <el-form-item label="分类" prop="category">
              <el-select v-model="form.category" placeholder="选择分类">
                <el-option v-for="c in categories" :key="c.value" :label="c.label" :value="c.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="标签">
              <div class="cc-tags">
                <el-input v-model="tagInput" placeholder="输入标签回车添加" size="small" @keyup.enter="addTag" class="cc-tag-input" />
                <span v-for="t in form.tags" :key="t" class="cc-tag"><el-tag size="small" closable @close="removeTag(t)">{{ t }}</el-tag></span>
                <button v-for="t in quickTags" :key="t" class="cc-quick-tag" @click="addQuickTag(t)">{{ t }}</button>
              </div>
            </el-form-item>
          </div>

          <el-form-item label="摘要" prop="summary">
            <el-input v-model="form.summary" type="textarea" :rows="2" placeholder="资讯摘要（200字以内）" maxlength="200" show-word-limit />
          </el-form-item>

          <el-form-item label="封面图">
            <el-upload :auto-upload="false" :show-file-list="false" @change="handleCover" accept="image/*">
              <div v-if="form.image" class="cc-cover-preview">
                <img :src="form.image" />
                <button class="cc-cover-remove" @click.stop="form.image = ''">✕</button>
              </div>
              <div v-else class="cc-cover-placeholder">📷 上传封面图</div>
            </el-upload>
          </el-form-item>

          <el-form-item label="正文" prop="content">
            <div class="cc-editor-wrapper">
              <el-input v-model="form.content" type="textarea" :rows="12" placeholder="正文内容（支持HTML）" />
            </div>
          </el-form-item>

          <div class="cc-actions">
            <el-button @click="saveDraft" :loading="saving">💾 保存草稿</el-button>
            <el-button type="primary" @click="submitNews" :loading="saving">📤 提交发布</el-button>
          </div>
        </el-form>
      </div>

      <!-- ====== 资讯管理 ====== -->
      <div v-if="tab === 'manage'" class="cc-manage">
        <div class="cc-manage-bar">
          <el-input v-model="searchQuery" placeholder="搜索标题..." class="cc-search" clearable />
          <el-select v-model="statusFilter" placeholder="状态筛选">
            <el-option label="全部" value="all" />
            <el-option label="已发布" value="approved" />
            <el-option label="待审核" value="pending" />
            <el-option label="已驳回" value="rejected" />
          </el-select>
        </div>

        <el-empty v-if="filteredList.length === 0" description="暂无资讯" />
        <el-table v-else :data="filteredList" style="width:100%">
          <el-table-column prop="title" label="标题" min-width="200" show-overflow-tooltip />
          <el-table-column label="分类" width="100">
            <template #default="{ row }">{{ catLabel(row.category) }}</template>
          </el-table-column>
          <el-table-column label="状态" width="90">
            <template #default="{ row }">
              <el-tag :type="statusType(row.status)" size="small">{{ statusLabel(row.status) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="views" label="浏览" width="80" />
          <el-table-column label="日期" width="110">
            <template #default="{ row }">{{ (row.publishDate || row.createdAt || '').slice(0, 10) }}</template>
          </el-table-column>
          <el-table-column label="操作" width="120" fixed="right">
            <template #default="{ row }">
              <el-button size="small" @click="editNews(row)">编辑</el-button>
              <el-popconfirm title="确定删除？" @confirm="deleteNews(row.id)">
                <template #reference><el-button size="small" type="danger">删除</el-button></template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- ====== 数据统计 ====== -->
      <div v-if="tab === 'stats'" class="cc-stats">
        <div class="cc-stat-cards">
          <div class="cc-stat-card"><span class="cc-stat-num">{{ stats.total }}</span><span class="cc-stat-label">总资讯</span></div>
          <div class="cc-stat-card"><span class="cc-stat-num">{{ stats.totalViews }}</span><span class="cc-stat-label">总浏览</span></div>
          <div class="cc-stat-card"><span class="cc-stat-num">{{ stats.totalComments }}</span><span class="cc-stat-label">总评论</span></div>
        </div>
        <div class="cc-stat-section">
          <h3>分类分布</h3>
          <div v-for="c in stats.categories" :key="c.name" class="cc-stat-bar">
            <span class="cc-stat-bar-label">{{ c.name }}</span>
            <div class="cc-stat-bar-track"><div class="cc-stat-bar-fill" :style="{width: (c.count / Math.max(stats.total,1) * 100) + '%'}"></div></div>
            <span class="cc-stat-bar-num">{{ c.count }}篇</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import Navbar from '@/components/Navbar.vue'
import { CATEGORY_OPTIONS, COMMON_TAGS } from '@/utils/constants'
import { CATEGORY_MAP, CATEGORY_REVERSE_MAP } from '@/utils/constants'

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
const form = reactive({ title: '', category: '', tags: [], summary: '', image: '', content: '' })
const rules = {
  title: [{ required: true, message: '请输入标题' }],
  category: [{ required: true, message: '请选择分类' }],
  content: [{ required: true, message: '请输入正文' }]
}

function addTag() { if (tagInput.value && !form.tags.includes(tagInput.value) && form.tags.length < 5) { form.tags.push(tagInput.value); tagInput.value = '' } }
function removeTag(t) { form.tags = form.tags.filter(tag => tag !== t) }
function addQuickTag(t) { if (!form.tags.includes(t) && form.tags.length < 5) form.tags.push(t) }
function handleCover(file) { const reader = new FileReader(); reader.onload = e => form.image = e.target.result; reader.readAsDataURL(file.raw) }

async function submitNews() {
  if (!form.title || !form.category || !form.content) { ElMessage.warning('请填写标题、分类和正文'); return }
  saving.value = true
  try {
    const token = localStorage.getItem('token')
    const fd = new FormData()
    fd.append('title', form.title); fd.append('category', form.category); fd.append('content', form.content)
    fd.append('summary', form.summary); fd.append('tags', form.tags.join(','))
    const res = await fetch(`${API}/news`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd })
    if (!res.ok) throw new Error('提交失败')
    ElMessage.success('提交成功，等待审核')
    Object.assign(form, { title: '', category: '', tags: [], summary: '', image: '', content: '' })
  } catch (e) {
    ElMessage.error(e.message || '提交失败')
  } finally {
    saving.value = false
  }
}
function saveDraft() { localStorage.setItem('newsDraft', JSON.stringify(form)); ElMessage.success('草稿已保存') }
function catLabel(c: string) { return (CATEGORY_MAP as Record<string, string>)[c] || c }
function statusLabel(s) { return { approved: '已发布', pending: '待审核', rejected: '已驳回' }[s] || s }
function statusType(s) { return { approved: 'success', pending: 'warning', rejected: 'danger' }[s] || 'info' }

// --- Manage ---
const searchQuery = ref(''); const statusFilter = ref('all')
const newsList = ref([])
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
    newsList.value = (data.news || data.list || []).map(n => ({
      ...n, tags: typeof n.tags === 'string' ? n.tags.split(',').filter(Boolean) : (n.tags || [])
    }))
  } catch (e) {}
}
function editNews(row) { alert(`编辑功能开发中：${row.title}`) }
async function deleteNews(id) { try { await fetch(`${API}/news/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }); ElMessage.success('已删除'); fetchNews() } catch (e) { ElMessage.error('删除失败') } }

// --- Stats ---
const stats = reactive({ total: 0, totalViews: 0, totalComments: 0, categories: [] })
function calcStats() {
  const list = newsList.value
  stats.total = list.length
  stats.totalViews = list.reduce((s, n) => s + (n.views || 0), 0)
  stats.totalComments = list.reduce((s, n) => s + (n.commentCount || n.comment_count || 0), 0)
  const catMap = {}
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
.cc-hero { background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark)); padding: var(--space-6) var(--space-4); }
.cc-hero h1 { font-family: var(--font-display); font-size: var(--text-2xl); color: #fff; max-width: 800px; margin: 0 auto var(--space-4); }
.cc-tabs { max-width: 800px; margin: 0 auto; display: flex; gap: var(--space-2); }
.cc-tabs button {
  padding: 8px 20px; border-radius: var(--radius-full); border: none; background: rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.7); font-weight: 600; cursor: pointer; font-size: var(--text-sm);
  transition: all 0.2s; font-family: var(--font-body);
}
.cc-tabs button:hover { background: rgba(255,255,255,0.25); color: #fff; }
.cc-tabs button.active { background: #fff; color: var(--color-primary); }

.cc-container { max-width: 800px; margin: 0 auto; padding: var(--space-6) var(--space-4) var(--space-16); }

.cc-row { display: flex; gap: var(--space-4); flex-wrap: wrap; }
.cc-tags { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.cc-tag-input { width: 140px; }
.cc-quick-tag { padding: 2px 10px; border-radius: var(--radius-full); border: 1px solid var(--color-border-light); background: var(--color-surface); font-size: 12px; color: var(--color-text-secondary); cursor: pointer; font-family: var(--font-body); }
.cc-quick-tag:hover { border-color: var(--color-primary); color: var(--color-primary); }

.cc-cover-preview { position: relative; width: 240px; height: 140px; border-radius: var(--radius-md); overflow: hidden; }
.cc-cover-preview img { width: 100%; height: 100%; object-fit: cover; }
.cc-cover-remove { position: absolute; top: 6px; right: 6px; width: 24px; height: 24px; border-radius: 50%; border: none; background: rgba(0,0,0,0.5); color: #fff; cursor: pointer; }
.cc-cover-placeholder { width: 240px; height: 140px; border: 2px dashed var(--color-border); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--color-text-tertiary); font-size: var(--text-sm); }
.cc-cover-placeholder:hover { border-color: var(--color-primary); color: var(--color-primary); }
.cc-editor-wrapper { border: 1px solid var(--color-border); border-radius: var(--radius-md); overflow: hidden; }
.cc-actions { display: flex; gap: var(--space-3); padding-top: var(--space-4); }

.cc-manage-bar { display: flex; gap: var(--space-3); margin-bottom: var(--space-4); }
.cc-search { width: 240px; }

.cc-stat-cards { display: flex; gap: var(--space-4); margin-bottom: var(--space-6); }
.cc-stat-card { flex: 1; background: var(--color-bg-card); border: 1px solid var(--color-border-light); border-radius: var(--radius-lg); padding: var(--space-5); text-align: center; box-shadow: var(--shadow-sm); }
.cc-stat-num { display: block; font-size: var(--text-2xl); font-weight: 800; color: var(--color-primary); font-family: var(--font-display); }
.cc-stat-label { font-size: var(--text-xs); color: var(--color-text-tertiary); }

.cc-stat-section h3 { font-family: var(--font-display); font-size: var(--text-base); margin-bottom: var(--space-3); }
.cc-stat-bar { display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-2); }
.cc-stat-bar-label { width: 80px; font-size: var(--text-sm); color: var(--color-text-secondary); text-align: right; flex-shrink: 0; }
.cc-stat-bar-track { flex: 1; height: 8px; border-radius: 4px; background: var(--color-surface); overflow: hidden; }
.cc-stat-bar-fill { height: 100%; border-radius: 4px; background: var(--color-primary); transition: width 0.5s; }
.cc-stat-bar-num { font-size: var(--text-xs); color: var(--color-text-tertiary); width: 36px; }
</style>
