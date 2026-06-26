<template>
  <div class="manage-container">
    <Navbar :menu-links="creatorMenuLinks">
      <template #actions>
        <div class="publish-btn-wrap">
          <router-link to="/creator/publish" class="publish-btn">
            <el-icon><Plus /></el-icon>
            发布资讯
          </router-link>
        </div>
      </template>
    </Navbar>

    <div class="stats-cards">
      <div class="stat-card">
        <div class="stat-icon published-icon"><el-icon><Document /></el-icon></div>
        <div class="stat-content">
          <div class="stat-value">{{ publishedList.length }}</div>
          <div class="stat-label">已发布</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon pending-icon"><el-icon><Clock /></el-icon></div>
        <div class="stat-content">
          <div class="stat-value">{{ pendingList.length }}</div>
          <div class="stat-label">待审核</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon rejected-icon"><el-icon><Close /></el-icon></div>
        <div class="stat-content">
          <div class="stat-value">{{ rejectedList.length }}</div>
          <div class="stat-label">已驳回</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon comment-icon"><el-icon><Message /></el-icon></div>
        <div class="stat-content">
          <div class="stat-value">{{ totalCommentCount }}</div>
          <div class="stat-label">总评论</div>
        </div>
      </div>
    </div>

    <div class="manage-content">
      <el-tabs v-model="activeTab" @tab-change="handleTabChange">
        <el-tab-pane label="已发布" name="published">
          <div class="news-list">
            <div class="list-header">
              <span class="list-title">已发布资讯</span>
              <div class="search-bar">
                <el-input v-model="searchKeyword" placeholder="搜索资讯标题" class="search-input" @keyup.enter="handleSearch">
                  <template #append><el-button @click="handleSearch"><el-icon><Search /></el-icon></el-button></template>
                </el-input>
              </div>
            </div>
            <el-table :data="filteredPublished" style="width: 100%" border>
              <el-table-column prop="id" label="ID" width="80" />
              <el-table-column prop="title" label="资讯标题" min-width="200" />
              <el-table-column prop="category" label="分类" width="120">
                <template #default="{ row }"><el-tag :type="getCategoryType(row.category)">{{ getCategoryLabel(row.category) }}</el-tag></template>
              </el-table-column>
              <el-table-column prop="publishDate" label="发布时间" width="180">
                <template #default="{ row }">{{ formatDate(row.publishDate) }}</template>
              </el-table-column>
              <el-table-column label="数据统计" width="250">
                <template #default="{ row }">
                  <div class="stats-row">
                    <span class="stat-item"><el-icon><View /></el-icon>{{ row.views }}</span>
                    <span class="stat-item"><el-icon><Message /></el-icon>{{ row.commentCount || 0 }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="220">
                <template #default="{ row }">
                  <el-button type="primary" size="small" @click="editNews(row)">编辑</el-button>
                  <el-button type="danger" size="small" @click="deleteNews(row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>

        <el-tab-pane label="待审核" name="pending">
          <div class="news-list">
            <div class="list-header">
              <span class="list-title">待审核资讯</span>
              <span class="tip-text">提交后等待管理员审核</span>
            </div>
            <el-table :data="pendingList" style="width: 100%" border>
              <el-table-column prop="id" label="ID" width="80" />
              <el-table-column prop="title" label="资讯标题" min-width="200" />
              <el-table-column prop="category" label="分类" width="120">
                <template #default="{ row }"><el-tag :type="getCategoryType(row.category)">{{ getCategoryLabel(row.category) }}</el-tag></template>
              </el-table-column>
              <el-table-column prop="publishDate" label="提交时间" width="180">
                <template #default="{ row }">{{ formatDate(row.publishDate) }}</template>
              </el-table-column>
              <el-table-column label="审核状态" width="120">
                <template #default><el-tag type="warning">待审核</el-tag></template>
              </el-table-column>
              <el-table-column label="操作" width="150">
                <template #default="{ row }">
                  <el-button type="primary" size="small" @click="viewNews(row)">查看</el-button>
                  <el-button type="text" size="small" @click="cancelSubmit(row)">取消提交</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>

        <el-tab-pane label="已驳回" name="rejected">
          <div class="news-list">
            <div class="list-header">
              <span class="list-title">已驳回资讯</span>
              <span class="tip-text">根据驳回原因修改后可重新提交</span>
            </div>
            <el-table :data="rejectedList" style="width: 100%" border>
              <el-table-column prop="id" label="ID" width="80" />
              <el-table-column prop="title" label="资讯标题" min-width="200" />
              <el-table-column prop="category" label="分类" width="120">
                <template #default="{ row }"><el-tag :type="getCategoryType(row.category)">{{ getCategoryLabel(row.category) }}</el-tag></template>
              </el-table-column>
              <el-table-column prop="publishDate" label="提交时间" width="180">
                <template #default="{ row }">{{ formatDate(row.publishDate) }}</template>
              </el-table-column>
              <el-table-column prop="rejectReason" label="驳回原因" min-width="200">
                <template #default="{ row }">
                  <el-tag type="danger">{{ row.rejectReason || '内容不符合规范' }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="250">
                <template #default="{ row }">
                  <el-button type="primary" size="small" @click="editNews(row)">编辑修改</el-button>
                  <el-button type="success" size="small" @click="resubmitNews(row)">重新提交</el-button>
                  <el-button type="danger" size="small" @click="deleteNews(row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>

        <el-tab-pane label="评论管理" name="comments">
          <div class="news-list">
            <div class="list-header">
              <span class="list-title">评论管理</span>
              <div class="filter-bar">
                <el-select v-model="commentFilter" placeholder="筛选资讯">
                  <el-option label="全部" value="all" />
                  <el-option v-for="n in publishedList" :key="n.id" :label="`#${n.id} ${n.title}`" :value="n.id" />
                </el-select>
              </div>
            </div>
            <el-table :data="filteredComments" style="width: 100%" border>
              <el-table-column prop="id" label="ID" width="80" />
              <el-table-column prop="newsTitle" label="资讯" min-width="150" />
              <el-table-column prop="user" label="用户" width="120" />
              <el-table-column prop="content" label="内容" min-width="250" />
              <el-table-column prop="time" label="时间" width="180" />
              <el-table-column label="操作" width="180">
                <template #default="{ row }">
                  <el-button type="primary" size="small" @click="replyInManage(row)">回复</el-button>
                  <el-button type="danger" size="small" @click="deleteComment(row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog v-model="viewDialogVisible" title="资讯详情" width="800px">
      <div v-if="currentNews" class="news-detail">
        <h3 class="detail-title">{{ currentNews.title }}</h3>
        <div class="detail-meta">
          <span>{{ getCategoryLabel(currentNews.category) }}</span>
          <span class="meta-divider">|</span>
          <span>{{ formatDate(currentNews.publishDate) }}</span>
        </div>
        <div class="detail-content" v-html="currentNews.content"></div>
      </div>
    </el-dialog>

    <el-dialog v-model="replyDialogVisible" title="回复评论" width="500px">
      <div class="reply-context">
        <div class="context-label">用户：<strong>{{ replyCommentTarget?.user }}</strong></div>
        <div class="context-box">{{ replyCommentTarget?.content }}</div>
      </div>
      <el-form label-position="top">
        <el-form-item label="回复内容">
          <el-input v-model="replyCommentText" type="textarea" rows="4" placeholder="输入回复..." />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="replyDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitReplyInManage">发送回复</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Document, Clock, Close, Message, Search, View } from '@element-plus/icons-vue'
import Navbar from '@/components/Navbar.vue'
import { CATEGORY_MAP } from '@/utils/constants'
import type { NewsCategory } from '@/types/common'

const router = useRouter()

const creatorMenuLinks = [
  { to: '/creator/publish', label: '资讯发布', active: false },
  { to: '/creator/manage', label: '内容管理', active: true },
  { to: '/creator/fans', label: '粉丝互动', active: false }
]

const activeTab = ref('published')
const searchKeyword = ref('')
const commentFilter = ref('all')

const publishedList = ref([
  { id: 1, title: '如何科学制定健身计划', category: 'knowledge', publishDate: '2024-01-15 10:00', views: 1234, commentCount: 45, content: '<p>科学制定健身计划...</p>' },
  { id: 2, title: '健身后如何正确恢复', category: 'recovery', publishDate: '2024-01-10 14:30', views: 987, commentCount: 32, content: '<p>恢复非常重要...</p>' },
  { id: 3, title: '不同年龄段的健身建议', category: 'knowledge', publishDate: '2024-01-05 09:00', views: 756, commentCount: 28, content: '<p>不同年龄有不同需求...</p>' }
])

const pendingList = ref([
  { id: 4, title: '健身营养补充指南', category: 'nutrition', publishDate: '2024-01-16 16:00', content: '<p>营养补充是重要环节...</p>' },
  { id: 5, title: '家庭健身器材推荐', category: 'equipment', publishDate: '2024-01-16 15:30', content: '<p>器材选择需考虑空间...</p>' }
])

const rejectedList = ref([
  { id: 6, title: '快速减肥方法', category: 'knowledge', publishDate: '2024-01-14 11:00', rejectReason: '内容夸大其词，缺乏科学依据', content: '<p>快速减肥...</p>' }
])

const mockComments = ref([
  { id: 1, newsId: 1, newsTitle: '如何科学制定健身计划', user: '用户1', content: '写得很详细！', time: '2024-01-15 11:00' },
  { id: 2, newsId: 2, newsTitle: '健身后如何正确恢复', user: '用户2', content: '分享我的恢复经验', time: '2024-01-10 15:00' }
])

const currentNews = ref<any>(null)
const viewDialogVisible = ref(false)
const replyDialogVisible = ref(false)
const replyCommentTarget = ref<any>(null)
const replyCommentText = ref('')

const totalCommentCount = computed(() => publishedList.value.reduce((s, n) => s + (n.commentCount || 0), 0))

const filteredPublished = computed(() => {
  if (!searchKeyword.value) return publishedList.value
  return publishedList.value.filter(n => n.title.includes(searchKeyword.value))
})

const filteredComments = computed(() => {
  if (commentFilter.value === 'all') return mockComments.value
  return mockComments.value.filter(c => c.newsId === Number(commentFilter.value))
})

function getCategoryType(cat: NewsCategory): string {
  const types: Record<string, string> = { knowledge: '', nutrition: 'success', recovery: 'warning', equipment: 'info' }
  return types[cat] || ''
}

function getCategoryLabel(cat: NewsCategory): string {
  return CATEGORY_MAP[cat] || cat
}

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  return d.toLocaleString('zh-CN')
}

function handleSearch() {}
function handleTabChange() { searchKeyword.value = '' }

const editNews = (news: any) => {
  localStorage.setItem('newsEditDraft', JSON.stringify({
    id: news.id, title: news.title, category: news.category,
    tags: [], summary: '', image: '', content: news.content || ''
  }))
  router.push('/creator/publish')
}

const deleteNews = (news: any) => {
  ElMessageBox.confirm(`确定要删除「${news.title}」吗？`, '提示', { type: 'warning' }).then(() => {
    const removeFrom = (arr: any[]) => { const i = arr.findIndex((n: any) => n.id === news.id); if (i > -1) arr.splice(i, 1) }
    removeFrom(publishedList.value)
    removeFrom(pendingList.value)
    removeFrom(rejectedList.value)
    ElMessage.success('已删除')
  }).catch(() => {})
}

const viewNews = (n: any) => { currentNews.value = n; viewDialogVisible.value = true }
const cancelSubmit = (n: any) => {
  const i = pendingList.value.findIndex(item => item.id === n.id)
  if (i > -1) pendingList.value.splice(i, 1)
  ElMessage.success('已取消提交')
}

const resubmitNews = (n: any) => {
  ElMessageBox.confirm(`重新提交「${n.title}」？`, '提示').then(() => {
    const i = rejectedList.value.findIndex(item => item.id === n.id)
    if (i > -1) {
      const item = rejectedList.value.splice(i, 1)[0]
      pendingList.value.push(item)
    }
    ElMessage.success('已重新提交')
  }).catch(() => {})
}

const deleteComment = (c: any) => {
  ElMessageBox.confirm('确定删除这条评论？', '提示', { type: 'warning' }).then(() => {
    const i = mockComments.value.findIndex(item => item.id === c.id)
    if (i > -1) mockComments.value.splice(i, 1)
    ElMessage.success('已删除')
  }).catch(() => {})
}

const replyInManage = (c: any) => { replyCommentTarget.value = c; replyCommentText.value = ''; replyDialogVisible.value = true }
const submitReplyInManage = () => {
  if (!replyCommentText.value.trim()) return ElMessage.warning('请输入回复内容')
  ElMessage.success('回复已发送')
  replyDialogVisible.value = false
}
</script>

<style scoped>
.manage-container { min-height: 100vh; background-color: #f5f7fa; }
.publish-btn-wrap { margin-right: 20px; }
.publish-btn {
  display: flex; align-items: center; gap: 6px; padding: 8px 20px;
  background: linear-gradient(90deg, #52c41a, #389e0d); color: white;
  border-radius: 20px; text-decoration: none; font-size: 14px; font-weight: 500;
}
.publish-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(82,196,26,0.3); }
.stats-cards {
  max-width: 1200px; margin: 0 auto; padding: 30px 20px;
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;
}
.stat-card { background: #fff; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); display: flex; align-items: center; gap: 15px; }
.stat-icon { width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
.published-icon { background: #e6f7ff; color: #1890ff; }
.pending-icon { background: #fff7e6; color: #fa8c16; }
.rejected-icon { background: #fff1f0; color: #ff4d4f; }
.comment-icon { background: #f6ffed; color: #52c41a; }
.stat-value { font-size: 24px; font-weight: 600; color: #333; }
.stat-label { font-size: 13px; color: #999; }
.manage-content {
  max-width: 1200px; margin: 0 auto; padding: 20px; background: #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06); border-radius: 12px; margin-bottom: 30px;
}
.news-list { margin-top: 20px; }
.list-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.list-title { font-size: 16px; font-weight: 600; color: #333; }
.tip-text { font-size: 13px; color: #999; }
.search-bar { width: 300px; }
.stats-row { display: flex; gap: 20px; }
.stat-item { display: flex; align-items: center; gap: 4px; font-size: 13px; color: #666; }
.news-detail { padding: 10px; }
.detail-title { font-size: 18px; font-weight: 600; color: #333; margin-bottom: 15px; }
.detail-meta { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; font-size: 13px; color: #999; }
.meta-divider { color: #ddd; }
.detail-content { font-size: 14px; line-height: 1.8; color: #333; }
.filter-bar { display: flex; gap: 10px; }
.reply-context { margin-bottom: 18px; }
.context-label { font-size: 14px; color: #666; margin-bottom: 8px; }
.context-box { background: #f5f7fa; padding: 12px 16px; border-radius: 8px; font-size: 14px; }

@media (max-width: 992px) { .stats-cards { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 576px) { .stats-cards { grid-template-columns: 1fr; } }
</style>
