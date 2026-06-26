<template>
  <div class="interaction-container">
    <Navbar :menu-links="coachMenuLinks" />
    <div class="interaction-content">
      <el-tabs>
        <el-tab-pane label="评论管理">
          <div class="comments-section">
            <el-table :data="comments" style="width: 100%">
              <el-table-column prop="id" label="评论ID" width="80" />
              <el-table-column prop="course" label="课程名称" />
              <el-table-column prop="user" label="用户" />
              <el-table-column prop="content" label="评论内容" />
              <el-table-column prop="time" label="评论时间" width="180" />
              <el-table-column prop="rating" label="评分" width="90">
                <template #default="scope">
                  <el-rate v-model="scope.row.rating" disabled :max="5" />
                </template>
              </el-table-column>
              <el-table-column label="操作" width="140">
                <template #default="scope">
                  <el-button type="primary" size="small" @click="openReply(scope.row)">回复</el-button>
                  <el-button v-if="scope.row.replied" type="text" size="small" @click="viewReply(scope.row)">已回复</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>

        <el-tab-pane label="粉丝管理">
          <div class="fans-section">
            <el-table :data="fans" style="width: 100%">
              <el-table-column prop="id" label="粉丝ID" width="80" />
              <el-table-column prop="name" label="粉丝名称" />
              <el-table-column prop="followTime" label="关注时间" width="180" />
              <el-table-column prop="courses" label="已购课程" width="120" />
              <el-table-column label="操作" width="120">
                <template #default="scope">
                  <el-button type="primary" size="small" @click="openMessage(scope.row)">私信</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>

        <el-tab-pane label="私信管理">
          <div class="messages-section">
            <el-table :data="messages" style="width: 100%">
              <el-table-column prop="id" label="消息ID" width="80" />
              <el-table-column prop="user" label="用户" />
              <el-table-column prop="content" label="消息内容" />
              <el-table-column prop="time" label="发送时间" width="180" />
              <el-table-column label="操作" width="120">
                <template #default="scope">
                  <el-button type="primary" size="small" @click="openMessageReply(scope.row)">回复</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 回复评论对话框 -->
    <el-dialog v-model="replyDialogVisible" title="回复评论" width="550px">
      <div class="reply-context">
        <div class="context-label">评论内容：</div>
        <div class="context-box">
          <div class="context-user">{{ replyTarget?.user }}</div>
          <div class="context-text">{{ replyTarget?.content }}</div>
        </div>
      </div>
      <el-form label-position="top">
        <el-form-item label="回复内容">
          <el-input v-model="replyText" type="textarea" rows="4" placeholder="输入回复内容..." />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="replyDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitReply" :loading="replySubmitting">发送回复</el-button>
      </template>
    </el-dialog>

    <!-- 私信对话框 -->
    <el-dialog v-model="messageDialogVisible" title="发送私信" width="550px">
      <div class="reply-context">
        <div class="context-label">发送给：<strong>{{ messageTarget?.name }}</strong></div>
      </div>
      <el-form label-position="top">
        <el-form-item label="消息内容">
          <el-input v-model="messageText" type="textarea" rows="5" placeholder="输入私信内容..." />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="messageDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitMessage">发送</el-button>
      </template>
    </el-dialog>

    <!-- 已回复查看对话框 -->
    <el-dialog v-model="viewReplyDialogVisible" title="回复详情" width="500px">
      <div v-if="viewReplyTarget" class="reply-detail">
        <p><strong>用户：</strong>{{ viewReplyTarget.user }}</p>
        <p><strong>评论：</strong>{{ viewReplyTarget.content }}</p>
        <p><strong>您的回复：</strong>{{ viewReplyTarget.replyContent }}</p>
        <p><strong>回复时间：</strong>{{ viewReplyTarget.replyTime }}</p>
      </div>
      <template #footer><el-button @click="viewReplyDialogVisible=false">关闭</el-button></template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import { ElMessage } from 'element-plus'

const coachMenuLinks = [
  { to: '/coach/publish', label: '内容发布', active: false },
  { to: '/coach/interaction', label: '用户互动', active: true },
  { to: '/coach/statistics', label: '数据统计', active: false },
  { to: '/coach/manage', label: '课程管理', active: false }
]

const comments = ref([
  { id: 1, course: '初级瑜伽入门', user: 'user1', content: '课程非常好，教练讲解详细，适合初学者。', time: '2024-01-16 10:30', rating: 5, replied: false, replyContent: '', replyTime: '' },
  { id: 2, course: '力量训练基础', user: 'user2', content: '跟着练习了几节课，感觉进步很大。', time: '2024-01-15 15:45', rating: 4, replied: true, replyContent: '感谢反馈！继续加油！', replyTime: '2024-01-15 16:00' },
  { id: 3, course: '有氧运动减脂', user: 'user3', content: '课程强度适中，减脂效果明显。', time: '2024-01-14 09:20', rating: 5, replied: false, replyContent: '', replyTime: '' }
])

const fans = ref([
  { id: 1, name: 'user1', followTime: '2024-01-10', courses: 3 },
  { id: 2, name: 'user2', followTime: '2024-01-05', courses: 2 },
  { id: 3, name: 'user3', followTime: '2023-12-28', courses: 5 }
])

const messages = ref([
  { id: 1, user: 'user1', content: '教练，请问这个动作怎么做才正确？', time: '2024-01-16 11:00' },
  { id: 2, user: 'user2', content: '教练，我想咨询一下如何制定个人健身计划。', time: '2024-01-15 16:30' }
])

const replyDialogVisible = ref(false)
const replyTarget = ref(null)
const replyText = ref('')
const replySubmitting = ref(false)

const messageDialogVisible = ref(false)
const messageTarget = ref(null)
const messageText = ref('')

const viewReplyDialogVisible = ref(false)
const viewReplyTarget = ref(null)

const openReply = (comment) => {
  replyTarget.value = comment
  replyText.value = ''
  replyDialogVisible.value = true
}

const submitReply = () => {
  if (!replyText.value.trim()) {
    ElMessage.warning('请输入回复内容')
    return
  }
  replySubmitting.value = true
  setTimeout(() => {
    const c = comments.value.find(c => c.id === replyTarget.value.id)
    if (c) {
      c.replied = true
      c.replyContent = replyText.value
      c.replyTime = new Date().toLocaleString()
    }
    ElMessage.success('回复已发送')
    replyDialogVisible.value = false
    replySubmitting.value = false
  }, 500)
}

const viewReply = (comment) => {
  viewReplyTarget.value = comment
  viewReplyDialogVisible.value = true
}

const openMessage = (fan) => {
  messageTarget.value = fan
  messageText.value = ''
  messageDialogVisible.value = true
}

const submitMessage = () => {
  if (!messageText.value.trim()) {
    ElMessage.warning('请输入消息内容')
    return
  }
  ElMessage.success('私信已发送')
  messageDialogVisible.value = false
}

const openMessageReply = (msg) => {
  messageTarget.value = { name: msg.user }
  messageText.value = ''
  messageDialogVisible.value = true
}
</script>

<style scoped>
.interaction-container { min-height: 100vh; background: var(--color-bg); }
.interaction-content { max-width: 1200px; margin: 0 auto; padding: 20px; background: var(--color-bg-card); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); border: 1px solid var(--color-border-light); margin-top: 20px; margin-bottom: 20px; }

.reply-context { margin-bottom: 18px; }
.context-label { font-size: 14px; color: var(--color-text-secondary); margin-bottom: 8px; }
.context-box { background: var(--color-bg-warm); padding: 12px 16px; border-radius: var(--radius-md); }
.context-user { font-weight: 600; margin-bottom: 4px; }
.context-text { font-size: 14px; color: var(--color-text-primary); }
.reply-detail p { margin: 8px 0; font-size: 14px; }
</style>
