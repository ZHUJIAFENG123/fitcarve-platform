<template>
  <div class="news-detail-page">
    <ReadingProgress />

    <Navbar :menu-links="newsMenuLinks" />

    <div v-if="loading" class="detail-container">
      <div class="detail-main">
        <el-skeleton :rows="3" animated />
        <el-skeleton-item variant="image" style="width:100%;height:400px;margin:20px 0" />
        <el-skeleton :count="8" animated />
      </div>
    </div>

    <div v-else-if="!news" class="detail-container empty-detail">
      <el-empty description="资讯不存在或已被删除">
        <template #extra>
          <el-button type="primary" @click="$router.push('/news/list')">返回资讯列表</el-button>
        </template>
      </el-empty>
    </div>

    <div v-else class="detail-layout">
      <!-- 左侧 TOC -->
      <aside class="detail-sidebar">
        <div class="sidebar-sticky">
          <TableOfContents :content="news.content" />
        </div>
      </aside>

      <!-- 中间正文 -->
      <article class="detail-main">
        <!-- 分类 + 标题 -->
        <div class="article-header">
          <span class="article-category">{{ categoryLabel }}</span>
          <h1 class="article-title">{{ news.title }}</h1>
          <div class="article-meta">
            <span class="meta-item"><span class="meta-icon">👤</span>{{ news.author }}</span>
            <span class="meta-item"><span class="meta-icon">📅</span>{{ formatDate(news.publishDate) }}</span>
            <span class="meta-item"><span class="meta-icon">👁</span>{{ formatViews(news.views) }} 浏览</span>
            <span class="meta-item"><span class="meta-icon">💬</span>{{ news.commentCount }} 评论</span>
            <span class="meta-item meta-reading">
              <span class="meta-icon">📖</span>约 {{ readingTime }} 分钟
            </span>
          </div>
          <div class="article-tags" v-if="news.tags && news.tags.length > 0">
            <span v-for="tag in news.tags" :key="tag" class="article-tag">{{ tag }}</span>
          </div>
        </div>

        <!-- 封面图 -->
        <div class="article-cover" v-if="news.image">
          <img :data-src="news.image" :alt="news.title" class="cover-img" />
        </div>

        <!-- 摘要 -->
        <blockquote v-if="news.summary" class="article-summary">
          <p>{{ news.summary }}</p>
        </blockquote>

        <!-- 正文 -->
        <div
          class="article-body"
          v-html="news.content"
        />

        <!-- 文章底部工具栏 -->
        <div class="article-toolbar">
          <div class="toolbar-actions">
            <NewsActions
              :liked="isLiked(news.id)"
              :favorited="isFavorited(news.id)"
              :like-count="news.views"
              :comment-count="news.commentCount"
              @like="toggleLike(news.id)"
              @favorite="toggleFavorite(news.id)"
              @share="shareNews"
              @comment="scrollToComment"
            />
          </div>
          <div class="toolbar-right">
            <FontSizeAdjust v-model="fontSize" />
          </div>
        </div>

        <SharePanel
          v-model:visible="shareDialogVisible"
          :link-copied="shareLinkCopied"
          :share-url="shareUrl"
          @copy-link="copyShareLink"
        />

        <!-- 作者卡片 -->
        <AuthorCard :author="news.author" />

        <!-- 上一篇 / 下一篇 -->
        <ArticleNav
          :prev="prevArticle"
          :next="nextArticle"
          @prev="goToPrev"
          @next="goToNext"
        />

        <!-- 评论区 -->
        <div id="comment-section" class="comment-section">
          <CommentSection
            :comments="comments"
            :loading="commentsLoading"
            :submitting="submitting"
            v-model:text="commentText"
            :reply-target="replyTarget"
            :reply-text="replyText"
            :comment-likes="commentLikes"
            @submit="submitComment(news.id)"
            @like-comment="toggleCommentLike"
            @start-reply="startReply"
            @submit-reply="(cid: number) => {
              const parent = comments.find(c => c.id === cid)
              if (parent) submitReply(news!.id, parent)
            }"
            @update:reply-text="replyText = $event"
            @cancel-reply="replyTarget = null; replyText = ''"
            @remove-comment="removeComment"
          />
        </div>

        <!-- 相关推荐 -->
        <RelatedNews :news-list="relatedList" />
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import Navbar from '@/components/Navbar.vue'
import ReadingProgress from '@/components/news/ReadingProgress.vue'
import TableOfContents from '@/components/news/TableOfContents.vue'
import AuthorCard from '@/components/news/AuthorCard.vue'
import FontSizeAdjust from '@/components/news/FontSizeAdjust.vue'
import NewsActions from '@/components/news/NewsActions.vue'
import SharePanel from '@/components/news/SharePanel.vue'
import CommentSection from '@/components/news/CommentSection.vue'
import ArticleNav from '@/components/news/ArticleNav.vue'
import RelatedNews from '@/components/news/RelatedNews.vue'
import { useNewsStore } from '@/stores/news'
import { useNewsDetail } from '@/composables/useNewsDetail'
import { useInteraction } from '@/composables/useInteraction'
import { useComment } from '@/composables/useComment'
import { addToHistory } from '@/composables/useReadingHistory'
import { CATEGORY_MAP } from '@/utils/constants'
import type { NewsCardData } from '@/types/news'
import { watch } from 'vue'

const store = useNewsStore()

const {
  news, loading, relatedList, readingTime,
  hasPrev, hasNext, goToPrev, goToNext, loadDetail
} = useNewsDetail()

const {
  isLiked, isFavorited, toggleLike, toggleFavorite,
  shareNews, copyShareLink, shareDialogVisible, shareLinkCopied, shareUrl
} = useInteraction()

const {
  comments, loading: commentsLoading,
  commentText, replyTarget, replyText, submitting, commentLikes,
  submitComment, submitReply, startReply, toggleCommentLike, removeComment
} = useComment()

const fontSize = ref<'small' | 'normal' | 'large'>(
  (localStorage.getItem('newsFontSize') as 'small' | 'normal' | 'large') || 'normal'
)

const newsMenuLinks = [
  { to: '/home', label: '首页', active: false },
  { to: '/news/list', label: '资讯', active: true },
  { to: '/fitness', label: '训练&饮食', active: false },
  { to: '/recommendation', label: '发现', active: false }
]

const categoryLabel = computed(() => {
  if (!news.value) return ''
  return (CATEGORY_MAP as Record<string, string>)[news.value.category] || news.value.category
})

const prevArticle = computed<NewsCardData | null>(() =>
  store.prevArticleId ? { id: store.prevArticleId, title: '上一篇', summary: '', tags: [], image: '', category: 'knowledge', author: '', views: 0, publishDate: '' } : null
)

const nextArticle = computed<NewsCardData | null>(() =>
  store.nextArticleId ? { id: store.nextArticleId, title: '下一篇', summary: '', tags: [], image: '', category: 'knowledge', author: '', views: 0, publishDate: '' } : null
)

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr.slice(0, 10)
  return d.toISOString().slice(0, 10)
}

function formatViews(v: number): string {
  if (v >= 10000) return (v / 10000).toFixed(1) + 'w'
  if (v >= 1000) return (v / 1000).toFixed(1) + 'k'
  return String(v)
}

function scrollToComment() {
  document.querySelector('#comment-section')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  loadDetail()
})

// Record reading history when news loads
watch(() => news.value, (n) => {
  if (n && n.id && n.title) {
    addToHistory({
      id: n.id,
      title: n.title,
      category: n.category,
      image: n.image
    })
  }
})
</script>

<style scoped>
.news-detail-page {
  min-height: 100vh;
  background: var(--color-bg);
}

/* ── Layout ── */
.detail-layout {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-6) var(--space-4) var(--space-16);
  display: flex;
  gap: var(--space-8);
  align-items: flex-start;
}
.detail-sidebar {
  width: 200px;
  flex-shrink: 0;
}
.sidebar-sticky {
  position: sticky;
  top: 80px;
}
.detail-main {
  flex: 1;
  min-width: 0;
  max-width: 760px;
  margin: 0 auto;
}
.detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-6) var(--space-4);
}
.empty-detail {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

/* ── Article Header ── */
.article-header {
  margin-bottom: var(--space-6);
}
.article-category {
  display: inline-block;
  padding: 4px 14px;
  border-radius: var(--radius-md);
  font-size: var(--text-xs);
  font-weight: 600;
  background: var(--color-primary);
  color: #fff;
  margin-bottom: var(--space-4);
}
.article-title {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: 800;
  line-height: var(--leading-tight);
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
}
.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
  margin-bottom: var(--space-3);
}
.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.meta-icon { font-size: 14px; }
.meta-reading {
  color: var(--color-primary);
  font-weight: 600;
}
.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
.article-tag {
  display: inline-flex;
  padding: 3px 10px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 500;
  background: var(--color-primary-50);
  color: var(--color-primary);
}

/* ── Cover ── */
.article-cover {
  margin-bottom: var(--space-6);
  border-radius: var(--radius-xl);
  overflow: hidden;
}
.cover-img {
  width: 100%;
  max-height: 480px;
  object-fit: cover;
  display: block;
}

/* ── Summary ── */
.article-summary {
  margin-bottom: var(--space-6);
  padding: var(--space-5);
  background: var(--color-primary-50);
  border-left: 4px solid var(--color-primary);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
}
.article-summary p {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0;
}

/* ── Body ── */
.article-body {
  font-size: var(--reading-font-size, 17px);
  line-height: var(--reading-line-height, 1.8);
  color: var(--color-text-primary);
  margin-bottom: var(--space-8);
}
.article-body :deep(p) {
  margin-bottom: 1.2em;
}
.article-body :deep(h2) {
  font-family: var(--font-display);
  font-size: 1.4em;
  font-weight: 700;
  margin: 2em 0 0.8em;
  color: var(--color-text-primary);
  padding-bottom: 0.3em;
  border-bottom: 1px solid var(--color-border-light);
}
.article-body :deep(h3) {
  font-family: var(--font-display);
  font-size: 1.15em;
  font-weight: 600;
  margin: 1.5em 0 0.6em;
  color: var(--color-text-primary);
}
.article-body :deep(img) {
  max-width: 100%;
  border-radius: var(--radius-lg);
  margin: 1.5em 0;
}
.article-body :deep(blockquote) {
  border-left: 3px solid var(--color-primary);
  padding: 0.5em 1em;
  margin: 1.2em 0;
  background: var(--color-primary-50);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  color: var(--color-text-secondary);
}
.article-body :deep(ul), .article-body :deep(ol) {
  padding-left: 1.5em;
  margin-bottom: 1.2em;
}
.article-body :deep(li) {
  margin-bottom: 0.4em;
}
.article-body :deep(a) {
  color: var(--color-primary);
  text-decoration: underline;
}
.article-body :deep(code) {
  background: var(--color-surface);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  font-size: 0.9em;
  font-family: var(--font-mono);
}

/* ── Toolbar ── */
.article-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-4);
  padding: var(--space-5) 0;
  margin-bottom: var(--space-6);
  border-top: 1px solid var(--color-border-light);
  border-bottom: 1px solid var(--color-border-light);
}

/* ── Comment ── */
.comment-section {
  margin-top: var(--space-8);
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .detail-sidebar { display: none; }
}
@media (max-width: 640px) {
  .article-title { font-size: var(--text-xl); }
  .article-body { font-size: 15px; }
}
</style>
