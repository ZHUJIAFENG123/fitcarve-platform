import { createRouter, createWebHistory } from 'vue-router'
import { checkRoutePermission, isLoggedIn, getActiveRole, LEGACY_REDIRECTS } from '../services/permission.js'

const routes = [
  // ============ 公共页面 ============
  { path: '/', redirect: '/home' },
  { path: '/login', component: () => import('../views/public/Login.vue') },
  { path: '/register', component: () => import('../views/public/Register.vue') },
  { path: '/forgot-password', component: () => import('../views/public/ForgotPassword.vue') },
  { path: '/404', component: () => import('../views/public/404.vue') },
  { path: '/500', component: () => import('../views/public/500.vue') },

  // ============ 游客可浏览页 ============
  { path: '/home', component: () => import('../views/user/Home.vue') },
  { path: '/news/list', component: () => import('../views/user/NewsList.vue') },
  { path: '/news/detail/:id', component: () => import('../views/user/NewsDetail.vue') },
  { path: '/courses/list', redirect: '/fitness/training' },
  { path: '/courses/detail/:id', redirect: '/fitness/training' },
  { path: '/recommendation', component: () => import('../views/user/Recommendation.vue') },

  // ============ 训练&饮食模块 ============
  { path: '/fitness', component: () => import('../views/fitness/Dashboard.vue') },
  { path: '/fitness/training', component: () => import('../views/fitness/TrainingList.vue') },
  { path: '/fitness/training/:id', component: () => import('../views/fitness/TrainingDetail.vue') },
  { path: '/fitness/diet', component: () => import('../views/fitness/DietList.vue') },
  { path: '/fitness/diet/:id', component: () => import('../views/fitness/DietDetail.vue') },
  { path: '/fitness/diet-log', component: () => import('../views/fitness/DietLog.vue'), meta: { requiresAuth: true } },
  { path: '/fitness/calculator', component: () => import('../views/fitness/Calculator.vue') },
  { path: '/fitness/ai-generator', component: () => import('../views/fitness/AiGenerator.vue') },

  // ============ 需登录的通用页面 ============
  { path: '/profile', component: () => import('../views/public/Profile.vue'), meta: { requiresAuth: true } },
  { path: '/favorites', component: () => import('../views/user/Favorites.vue'), meta: { requiresAuth: true } },
  { path: '/my-comments', component: () => import('../views/user/MyComments.vue'), meta: { requiresAuth: true } },
  { path: '/learning-progress', component: () => import('../views/user/LearningProgress.vue'), meta: { requiresAuth: true } },

  // ============ 用户内容中心（原教练端 + 创作者端功能）============
  { path: '/user/publish-news',   component: () => import('../views/creator/Publish.vue'),     meta: { requiresAuth: true } },
  { path: '/user/publish-course', component: () => import('../views/coach/Publish.vue'),       meta: { requiresAuth: true } },
  { path: '/user/manage-news',    component: () => import('../views/creator/Manage.vue'),      meta: { requiresAuth: true } },
  { path: '/user/manage-courses', component: () => import('../views/coach/Manage.vue'),        meta: { requiresAuth: true } },
  { path: '/user/interaction',    component: () => import('../views/coach/Interaction.vue'),   meta: { requiresAuth: true } },
  { path: '/user/statistics',     component: () => import('../views/coach/Statistics.vue'),    meta: { requiresAuth: true } },

  // ============ 管理员端（不变）============
  { path: '/admin/dashboard', component: () => import('../views/admin/Dashboard.vue'),  meta: { requiresAuth: true } },
  { path: '/admin/config',    component: () => import('../views/admin/Config.vue'),     meta: { requiresAuth: true } },
  { path: '/admin/users',     component: () => import('../views/admin/Users.vue'),     meta: { requiresAuth: true } },
  { path: '/admin/audit',     component: () => import('../views/admin/Audit.vue'),     meta: { requiresAuth: true } },
  { path: '/admin/comments',  component: () => import('../views/admin/Comments.vue'),  meta: { requiresAuth: true } },
  { path: '/admin/logs',      component: () => import('../views/admin/Logs.vue'),      meta: { requiresAuth: true } },
  { path: '/admin/reports',   component: () => import('../views/admin/Reports.vue'),   meta: { requiresAuth: true } },

  // ============ 旧路由兼容重定向 ============
  { path: '/coach/publish',     redirect: '/user/publish-course' },
  { path: '/coach/manage',      redirect: '/user/manage-courses' },
  { path: '/coach/interaction', redirect: '/user/interaction' },
  { path: '/coach/statistics',  redirect: '/user/statistics' },
  { path: '/creator/publish',   redirect: '/user/publish-news' },
  { path: '/creator/manage',    redirect: '/user/manage-news' },
  { path: '/creator/fans',      redirect: '/user/statistics' },

  // 404
  { path: '/:pathMatch(.*)*', redirect: '/404' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 公开页面
  const publicPages = ['/login', '/register', '/forgot-password', '/404', '/500']
  if (publicPages.includes(to.path)) {
    next()
    return
  }

  // 旧路由重定向（已在 routes 中处理，此处作为额外保障）
  if (LEGACY_REDIRECTS[to.path]) {
    next(LEGACY_REDIRECTS[to.path])
    return
  }

  // 需登录的页面
  if (to.meta.requiresAuth) {
    if (!isLoggedIn()) {
      next(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
      return
    }
    const userRole = getActiveRole()
    if (!checkRoutePermission(to.path, userRole)) {
      next('/404')
      return
    }
  }

  next()
})

export default router
