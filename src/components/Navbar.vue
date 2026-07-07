<template>
  <header class="navbar">
    <div class="nav-content">
      <div class="logo">
        <img src="/logo.png" alt="Logo" class="logo-img" />
        <h1>{{ logoSuffix ? `炼刻 - ${logoSuffix}` : '炼刻' }}</h1>
      </div>

      <nav class="nav-menu">
        <a v-for="link in menuLinks" :key="link.to" :href="link.to" :class="{ active: link.active }">{{ link.label }}</a>
      </nav>

      <div class="nb-search">
        <Search :size="15" />
        <input v-model="searchQuery" placeholder="搜索资讯、课程..." @keyup.enter="handleSearch" />
        <button v-if="searchQuery" class="nb-search-clear" @click="searchQuery = ''"><X :size="13" /></button>
      </div>

      <ThemeToggle />
      <slot name="actions"></slot>

      <!-- 已登录 -->
      <div class="user-info" v-if="loggedIn">
        <div class="nb-notif-wrap">
          <button class="nb-notif-btn" @click.stop="showNotif = !showNotif">
            <Bell :size="20" />
            <span v-if="unreadCount > 0" class="unread-badge">{{ unreadCount }}</span>
          </button>
          <Transition name="drop">
            <div v-if="showNotif" class="nb-notif-panel" @click.stop>
              <div class="nb-notif-hd">
                <span>通知消息</span>
                <button class="nb-link-btn" @click="markAllAsRead">全部已读</button>
              </div>
              <div class="nb-notif-list">
                <div v-for="n in notifications" :key="n.id" class="nb-notif-item" :class="{ unread: !n.read }" @click="onNotifyClick(n)">
                  <div class="nb-notif-content">
                    <div class="nb-notif-top">
                      <span v-if="!n.read" class="nb-notif-dot"></span>
                      <span class="nb-notif-title">{{ n.title }}</span>
                    </div>
                    <div class="nb-notif-desc">{{ n.content }}</div>
                    <div class="nb-notif-time">{{ n.time }}</div>
                  </div>
                </div>
                <div v-if="!notifications.length" class="nb-notif-empty">暂无通知</div>
              </div>
            </div>
          </Transition>
        </div>

        <div class="nb-user-wrap">
          <button class="nb-avatar-btn" @click.stop="showUserMenu = !showUserMenu">
            <div class="nb-avatar">
              <img v-if="userAvatar" :src="userAvatar" class="nb-avatar-img" />
              <span v-else class="nb-avatar-initial">{{ userInitial }}</span>
            </div>
            <ChevronDown :size="14" />
          </button>
          <Transition name="drop">
            <div v-if="showUserMenu" class="nb-user-panel" @click.stop>
              <button class="nb-menu-item" @click="$router.push('/profile')"><User :size="15" />个人中心</button>
              <button class="nb-menu-item" @click="$router.push('/favorites')"><Bookmark :size="15" />我的收藏</button>
              <div class="nb-menu-divider"></div>
              <button class="nb-menu-item" @click="$router.push('/creator')"><Palette :size="15" />创作者中心</button>
              <div class="nb-menu-divider"></div>
              <button class="nb-menu-item nb-menu-danger" @click="doLogout"><LogOut :size="15" />退出登录</button>
            </div>
          </Transition>
        </div>
      </div>

      <!-- 未登录 -->
      <div class="auth-btns" v-else>
        <button class="nb-login-btn" @click="toLogin">登录</button>
        <button class="nb-register-btn" @click="toRegister">免费注册</button>
      </div>

      <!-- 汉堡菜单 -->
      <button class="nb-hamburger" @click="mobileMenuOpen = !mobileMenuOpen">
        <X v-if="mobileMenuOpen" :size="22" />
        <Menu v-else :size="22" />
      </button>
    </div>

    <!-- 移动端菜单 -->
    <Transition name="slide-down">
      <div v-if="mobileMenuOpen" class="nb-mobile-menu">
        <a v-for="link in menuLinks" :key="'m'+link.to" :href="link.to" :class="{ active: link.active }">{{ link.label }}</a>
        <div class="nb-mobile-search">
          <Search :size="15" />
          <input v-model="searchQuery" placeholder="搜索..." @keyup.enter="handleSearch" />
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Search, Bell, ChevronDown, X, Menu, User, Bookmark, Palette, LogOut } from 'lucide-vue-next'
import ThemeToggle from '@/components/news/ThemeToggle.vue'

defineProps({
  logoSuffix: { type: String, default: '' },
  menuLinks: { type: Array, default: () => [] }
})

const notifications = ref([])
const unreadCount = ref(0)
function markAsRead() {}
function markAllAsRead() {}

const username = ref('用户')
const userAvatar = ref('')
const userInitial = computed(() => (username.value || '用').charAt(0))
const searchQuery = ref('')
const loggedIn = ref(false)
const showNotif = ref(false)
const showUserMenu = ref(false)
const mobileMenuOpen = ref(false)

function checkLogin() { loggedIn.value = !!localStorage.getItem('token') }

function loadUser() {
  checkLogin()
  if (!loggedIn.value) return
  try {
    const info = JSON.parse(localStorage.getItem('userInfo') || '{}')
    username.value = info.username || '用户'
    userAvatar.value = info.avatar || ''
  } catch(e) {}
}

function onNotifyClick(notification) {
  markAsRead(notification.id)
  showNotif.value = false
  if (notification.link) window.location.href = notification.link
}

function doLogout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userInfo')
  window.location.href = '/login'
}

function toLogin() { window.location.href = '/login' }
function toRegister() { window.location.href = '/register' }

function handleSearch() {
  const q = searchQuery.value.trim()
  if (q) window.location.href = `/news/list?search=${encodeURIComponent(q)}`
}

function closeDropdowns(e) {
  if (showNotif.value) showNotif.value = false
  if (showUserMenu.value) showUserMenu.value = false
}

onMounted(() => {
  loadUser()
  document.addEventListener('click', closeDropdowns)
})
onUnmounted(() => { document.removeEventListener('click', closeDropdowns) })
</script>

<style scoped>
.navbar {
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--color-border-light);
  position: sticky; top: 0; z-index: 100;
}
.nav-content {
  max-width: 1400px; margin: 0 auto; padding: 0 24px;
  display: flex; align-items: center; height: 64px; gap: 16px;
}
.logo { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
.logo-img { height: 36px; width: auto; }
.logo h1 {
  font-size: 18px; color: var(--color-primary); margin: 0;
  font-weight: 700; font-family: var(--font-display); white-space: nowrap;
}
.nav-menu { display: flex; gap: 32px; justify-content: center; }
.nav-menu a {
  text-decoration: none; color: var(--color-text-secondary); font-size: 15px;
  font-weight: 500; padding: 6px 0; position: relative; transition: color 0.2s;
  white-space: nowrap; font-family: var(--font-body);
}
.nav-menu a:hover { color: var(--color-primary); }
.nav-menu a.active { color: var(--color-primary); font-weight: 600; }
.nav-menu a.active::after {
  content: ''; position: absolute; bottom: -2px; left: 0; width: 100%;
  height: 3px; background: var(--color-primary); border-radius: 2px;
}

/* Search */
.nb-search {
  display: flex; align-items: center; gap: 8px; padding: 8px 14px;
  border-radius: var(--radius-full); background: var(--color-surface);
  border: 1.5px solid transparent; transition: all 0.25s; max-width: 240px; flex-shrink: 0;
}
.nb-search svg:first-child { color: var(--color-text-tertiary); flex-shrink: 0; }
.nb-search input {
  border: none; background: transparent; font-size: var(--text-sm); color: var(--color-text-primary);
  outline: none; width: 100%; font-family: var(--font-body);
}
.nb-search input::placeholder { color: var(--color-text-tertiary); }
.nb-search:focus-within { border-color: var(--color-primary); background: var(--color-bg-card); box-shadow: 0 0 0 3px rgba(27,107,58,0.08); }
.nb-search-clear { background: none; border: none; cursor: pointer; color: var(--color-text-tertiary); padding: 0; display: flex; }
.nb-search-clear:hover { color: var(--color-text-primary); }

/* Notification */
.nb-notif-wrap { position: relative; flex-shrink: 0; }
.nb-notif-btn {
  position: relative; padding: 4px; background: none; border: none; cursor: pointer;
  color: var(--color-primary); transition: transform 0.2s; display: flex;
}
.nb-notif-btn:hover { transform: scale(1.1); }
.unread-badge {
  position: absolute; top: -4px; right: -4px; background: var(--color-accent); color: #fff;
  border-radius: 50%; min-width: 16px; height: 16px; font-size: 11px;
  display: flex; align-items: center; justify-content: center; padding: 0 3px; font-weight: 600;
}
.nb-notif-panel {
  position: absolute; top: calc(100% + 8px); right: 0; width: 340px; max-height: 400px;
  overflow-y: auto; background: var(--color-bg-card); border-radius: var(--radius-xl);
  box-shadow: 0 12px 40px rgba(0,0,0,0.12); border: 1px solid var(--color-border-light); z-index: 200;
}
.nb-notif-hd {
  display: flex; justify-content: space-between; align-items: center;
  padding: 14px 18px; border-bottom: 1px solid var(--color-border-light);
  font-weight: 600; font-size: var(--text-sm); color: var(--color-text-primary);
}
.nb-link-btn { background: none; border: none; cursor: pointer; font-size: var(--text-xs); color: var(--color-primary); font-weight: 500; }
.nb-notif-list { padding: 4px 0; }
.nb-notif-item { padding: 12px 18px; cursor: pointer; transition: background 0.2s; }
.nb-notif-item:hover { background: var(--color-bg-warm); }
.nb-notif-item.unread { background: var(--color-primary-50); }
.nb-notif-item.unread:hover { background: var(--color-primary-100); }
.nb-notif-content { min-width: 0; }
.nb-notif-top { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; }
.nb-notif-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--color-accent); flex-shrink: 0; }
.nb-notif-title { font-size: 14px; font-weight: 500; color: var(--color-text-primary); }
.nb-notif-desc { font-size: 13px; color: var(--color-text-secondary); margin-bottom: 4px; }
.nb-notif-time { font-size: 12px; color: var(--color-text-tertiary); }
.nb-notif-empty { padding: 24px; text-align: center; color: var(--color-text-tertiary); font-size: var(--text-sm); }

/* User */
.user-info { display: flex; align-items: center; gap: 16px; margin-left: auto; }
.nb-user-wrap { position: relative; flex-shrink: 0; }
.nb-avatar-btn {
  display: flex; align-items: center; gap: 6px; background: none; border: none;
  cursor: pointer; padding: 0; color: var(--color-text-secondary);
}
.nb-avatar-btn:hover .nb-avatar { border-color: var(--color-primary); }
.nb-avatar {
  width: 36px; height: 36px; border-radius: 50%; border: 2px solid var(--color-primary-100);
  overflow: hidden; display: flex; align-items: center; justify-content: center;
  background: var(--color-primary-50); transition: all 0.2s;
}
.nb-avatar:hover { transform: scale(1.05); }
.nb-avatar-img { width: 100%; height: 100%; object-fit: cover; }
.nb-avatar-initial { font-size: 14px; font-weight: 600; color: var(--color-primary); }
.nb-user-panel {
  position: absolute; top: calc(100% + 8px); right: 0; width: 200px;
  background: var(--color-bg-card); border-radius: var(--radius-lg);
  box-shadow: 0 12px 40px rgba(0,0,0,0.12); border: 1px solid var(--color-border-light);
  padding: var(--space-2); z-index: 200;
}
.nb-menu-item {
  display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 14px;
  border-radius: var(--radius-md); color: var(--color-text-secondary); cursor: pointer;
  font-size: var(--text-sm); font-weight: 500; background: none; border: none;
  font-family: var(--font-body); transition: all 0.2s; text-align: left;
}
.nb-menu-item:hover { background: var(--color-bg-warm); color: var(--color-text-primary); }
.nb-menu-divider { height: 1px; background: var(--color-border-light); margin: 4px 8px; }
.nb-menu-danger { color: #ef4444; }
.nb-menu-danger:hover { background: rgba(239,68,68,0.06); color: #ef4444; }

/* Auth */
.auth-btns { display: flex; align-items: center; gap: 10px; flex-shrink: 0; margin-left: auto; }
.nb-login-btn {
  background: none; border: none; cursor: pointer; font-size: 14px;
  color: var(--color-text-secondary); font-weight: 500; padding: 6px 12px;
  font-family: var(--font-body); transition: color 0.2s;
}
.nb-login-btn:hover { color: var(--color-primary); }
.nb-register-btn {
  padding: 8px 20px; border-radius: var(--radius-full); border: none;
  background: var(--color-primary); color: #fff; font-size: var(--text-sm);
  font-weight: 600; cursor: pointer; font-family: var(--font-body); transition: all 0.25s;
}
.nb-register-btn:hover { background: var(--color-primary-light); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(27,107,58,0.25); }

/* Hamburger */
.nb-hamburger {
  display: none; background: none; border: none; cursor: pointer;
  color: var(--color-text-primary); padding: 4px; flex-shrink: 0;
}

/* Mobile menu */
.nb-mobile-menu {
  display: none; flex-direction: column; gap: 4px;
  padding: 16px 24px; background: var(--color-bg-card);
  border-bottom: 1px solid var(--color-border-light);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}
.nb-mobile-menu a {
  text-decoration: none; color: var(--color-text-secondary); font-size: 15px;
  font-weight: 500; padding: 12px 16px; border-radius: var(--radius-md); transition: all 0.2s;
}
.nb-mobile-menu a:hover { background: var(--color-bg-warm); color: var(--color-primary); }
.nb-mobile-menu a.active { color: var(--color-primary); background: var(--color-primary-50); font-weight: 600; }
.nb-mobile-search {
  display: flex; align-items: center; gap: 8px; padding: 10px 14px; margin-top: 8px;
  border-radius: var(--radius-full); background: var(--color-surface); border: 1px solid var(--color-border-light);
}
.nb-mobile-search input {
  border: none; background: transparent; font-size: var(--text-sm); color: var(--color-text-primary);
  outline: none; width: 100%; font-family: var(--font-body);
}
.nb-mobile-search svg { color: var(--color-text-tertiary); flex-shrink: 0; }

/* Dropdown animation */
.drop-enter-active { animation: dropIn 0.2s ease; }
.drop-leave-active { animation: dropIn 0.15s ease reverse; }
@keyframes dropIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }

/* Slide down */
.slide-down-enter-active { animation: slideDown 0.25s ease; }
.slide-down-leave-active { animation: slideDown 0.2s ease reverse; }
@keyframes slideDown { from { opacity: 0; max-height: 0; } to { opacity: 1; max-height: 400px; } }

@media (max-width: 768px) {
  .nav-menu { display: none; }
  .nb-search { display: none; }
  .nb-hamburger { display: flex; }
  .nb-mobile-menu { display: flex; }
  .auth-btns { display: none; }
}
</style>
