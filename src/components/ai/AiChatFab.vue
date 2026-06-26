<template>
  <Teleport to="body">
    <!-- 悬浮按钮 -->
    <button v-if="!open" class="ai-fab" @click="open = true" title="AI健身助手">
      <span class="ai-fab-icon">🤖</span>
    </button>

    <!-- 对话面板 -->
    <Transition name="ai-panel">
      <div v-if="open" class="ai-panel">
        <div class="ai-panel-header">
          <div class="ai-panel-brand">
            <span>🤖</span>
            <div>
              <strong>FitAI 助手</strong>
              <small>{{ mockMode ? '离线模式' : '在线' }}</small>
            </div>
          </div>
          <button class="ai-panel-close" @click="open = false">✕</button>
        </div>

        <!-- 消息列表 -->
        <div class="ai-messages" ref="msgList">
          <div class="ai-msg ai-msg--bot">
            <div class="ai-msg-avatar">🤖</div>
            <div class="ai-msg-bubble">
              你好！我是 FitAI 健身助手 👋<br>
              可以问我训练、饮食、营养相关问题：
            </div>
          </div>

          <div v-for="(m, i) in messages" :key="i" :class="['ai-msg', m.role === 'user' ? 'ai-msg--user' : 'ai-msg--bot']">
            <div v-if="m.role === 'bot'" class="ai-msg-avatar">🤖</div>
            <div class="ai-msg-bubble" v-html="renderMarkdown(m.content)"></div>
            <div v-if="m.role === 'user'" class="ai-msg-avatar">👤</div>
          </div>

          <div v-if="loading" class="ai-msg ai-msg--bot">
            <div class="ai-msg-avatar">🤖</div>
            <div class="ai-msg-bubble ai-thinking">思考中<span class="dots">...</span></div>
          </div>
        </div>

        <!-- 快捷问题 -->
        <div class="ai-quick" v-if="messages.length <= 1">
          <button v-for="q in quickQuestions" :key="q" class="ai-quick-btn" @click="send(q)">{{ q }}</button>
        </div>

        <!-- 输入栏 -->
        <div class="ai-input-area">
          <input
            v-model="input"
            class="ai-input"
            placeholder="输入你的健身问题..."
            @keyup.enter="send()"
            :disabled="loading"
          />
          <button class="ai-send" @click="send()" :disabled="loading || !input.trim()">发送</button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'

const API = import.meta.env.VITE_API_BASE_URL || '/api'
const open = ref(false)
const input = ref('')
const messages = ref([])
const loading = ref(false)
const mockMode = ref(true)
const msgList = ref(null)

const quickQuestions = [
  '如何科学安排每周训练计划？',
  '减脂期应该怎么吃？',
  '新手健身需要注意什么？',
  '训练后肌肉酸痛怎么办？',
  '蛋白质每天吃多少合适？'
]

function renderMarkdown(text) {
  if (!text) return ''
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>')
    .replace(/\|(.+?)\|/g, (m) => '')
    .replace(/---+/g, '<hr>')
    .replace(/- /g, '• ')
}

async function send(prefill) {
  const msg = prefill || input.value.trim()
  if (!msg || loading.value) return
  input.value = ''

  messages.value.push({ role: 'user', content: msg })
  loading.value = true
  await scrollBottom()

  try {
    const res = await fetch(`${API}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: msg })
    })
    const data = await res.json()
    messages.value.push({ role: 'bot', content: data.reply || data.error || '抱歉，出了点问题' })
    if (data.mockMode !== undefined) mockMode.value = data.mockMode
  } catch {
    messages.value.push({ role: 'bot', content: '网络错误，请稍后重试' })
  } finally {
    loading.value = false
    await scrollBottom()
  }
}

async function scrollBottom() {
  await nextTick()
  if (msgList.value) {
    msgList.value.scrollTop = msgList.value.scrollHeight
  }
}

watch(open, (val) => {
  if (val) scrollBottom()
})
</script>

<style scoped>
/* FAB */
.ai-fab {
  position: fixed; bottom: 24px; right: 24px; z-index: 999;
  width: 56px; height: 56px; border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  border: none; cursor: pointer; box-shadow: 0 4px 16px rgba(27,107,58,0.3);
  display: flex; align-items: center; justify-content: center;
  transition: all 0.3s; animation: fab-pulse 2s ease-in-out infinite;
}
.ai-fab:hover { transform: scale(1.1); }
.ai-fab-icon { font-size: 1.6rem; }

@keyframes fab-pulse {
  0%,100% { box-shadow: 0 4px 16px rgba(27,107,58,0.3); }
  50% { box-shadow: 0 4px 28px rgba(27,107,58,0.5); }
}

/* Panel */
.ai-panel {
  position: fixed; bottom: 24px; right: 24px; z-index: 1000;
  width: 380px; max-width: calc(100vw - 32px); height: 560px; max-height: calc(100vh - 80px);
  background: var(--color-bg-card); border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl); border: 1px solid var(--color-border-light);
  display: flex; flex-direction: column; overflow: hidden;
}
.ai-panel-enter-active { animation: ai-in 0.3s ease; }
.ai-panel-leave-active { animation: ai-out 0.2s ease; }
@keyframes ai-in { from { opacity:0; transform:translateY(20px) scale(0.95); } to { opacity:1; transform:translateY(0) scale(1); } }
@keyframes ai-out { to { opacity:0; transform:translateY(20px) scale(0.95); } }

.ai-panel-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--space-4); background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: #fff;
}
.ai-panel-brand { display: flex; align-items: center; gap: var(--space-2); }
.ai-panel-brand span { font-size: 1.4rem; }
.ai-panel-brand strong { display: block; font-size: var(--text-base); font-family: var(--font-display); }
.ai-panel-brand small { font-size: 11px; opacity: 0.7; }
.ai-panel-close { background: rgba(255,255,255,0.15); border: none; color: #fff; width: 28px; height: 28px; border-radius: 50%; cursor: pointer; font-size: var(--text-sm); }

/* Messages */
.ai-messages {
  flex: 1; overflow-y: auto; padding: var(--space-4);
  display: flex; flex-direction: column; gap: var(--space-3);
}
.ai-msg { display: flex; gap: var(--space-2); align-items: flex-start; max-width: 90%; }
.ai-msg--user { align-self: flex-end; flex-direction: row-reverse; }
.ai-msg--bot { align-self: flex-start; }
.ai-msg-avatar { width: 30px; height: 30px; border-radius: 50%; background: var(--color-primary-50); display: flex; align-items: center; justify-content: center; font-size: 0.9rem; flex-shrink: 0; }
.ai-msg--user .ai-msg-avatar { background: var(--color-surface); }
.ai-msg-bubble {
  padding: var(--space-2) var(--space-3); border-radius: var(--radius-lg);
  font-size: var(--text-sm); line-height: var(--leading-normal); word-break: break-word;
}
.ai-msg--bot .ai-msg-bubble { background: var(--color-surface); color: var(--color-text-primary); border-top-left-radius: 2px; }
.ai-msg--user .ai-msg-bubble { background: var(--color-primary); color: #fff; border-top-right-radius: 2px; }
.ai-thinking { color: var(--color-text-tertiary); font-style: italic; }
.dots { animation: dot-pulse 1.5s infinite; }
@keyframes dot-pulse { 0%,100%{opacity:0.2}50%{opacity:1} }

/* Quick */
.ai-quick { padding: 0 var(--space-4) var(--space-3); display: flex; flex-wrap: wrap; gap: var(--space-1); }
.ai-quick-btn {
  padding: 6px 12px; border-radius: var(--radius-full); border: 1px solid var(--color-border-light);
  background: var(--color-bg-card); color: var(--color-text-secondary); font-size: 11px;
  cursor: pointer; transition: all 0.15s; font-family: var(--font-body); white-space: nowrap;
}
.ai-quick-btn:hover { border-color: var(--color-primary); color: var(--color-primary); background: var(--color-primary-50); }

/* Input */
.ai-input-area { display: flex; gap: var(--space-2); padding: var(--space-3) var(--space-4); border-top: 1px solid var(--color-border-light); }
.ai-input { flex: 1; padding: 10px 14px; border-radius: var(--radius-full); border: 1px solid var(--color-border-light); background: var(--color-surface); font-size: var(--text-sm); outline: none; font-family: var(--font-body); color: var(--color-text-primary); }
.ai-input:focus { border-color: var(--color-primary); }
.ai-send {
  padding: 10px 18px; border-radius: var(--radius-full); border: none;
  background: var(--color-primary); color: #fff; font-weight: 600; font-size: var(--text-sm);
  cursor: pointer; font-family: var(--font-body); white-space: nowrap;
}
.ai-send:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
