import { createRouter, createWebHistory } from 'vue-router'

function isLoggedIn() { return !!localStorage.getItem('token') }

const routes = [
  // 公共页面
  { path: '/', redirect: '/home' },
  { path: '/login', component: () => import('../views/public/Login.vue') },
  { path: '/register', component: () => import('../views/public/Register.vue') },
  { path: '/forgot-password', component: () => import('../views/public/ForgotPassword.vue') },
  { path: '/404', component: () => import('../views/public/404.vue') },
  { path: '/500', component: () => import('../views/public/500.vue') },

  // 游客可浏览
  { path: '/home', component: () => import('../views/user/Home.vue') },
  { path: '/news/list', component: () => import('../views/user/NewsList.vue') },
  { path: '/news/detail/:id', component: () => import('../views/user/NewsDetail.vue') },
  { path: '/recommendation', component: () => import('../views/user/Recommendation.vue') },

  // 训练&饮食
  { path: '/fitness', component: () => import('../views/fitness/Dashboard.vue') },
  { path: '/fitness/training', component: () => import('../views/fitness/TrainingList.vue') },
  { path: '/fitness/training/:id', component: () => import('../views/fitness/TrainingDetail.vue') },
  { path: '/fitness/diet', component: () => import('../views/fitness/DietList.vue') },
  { path: '/fitness/diet/:id', component: () => import('../views/fitness/DietDetail.vue') },
  { path: '/fitness/diet-log', component: () => import('../views/fitness/DietLog.vue'), meta: { requiresAuth: true } },
  { path: '/fitness/calculator', component: () => import('../views/fitness/Calculator.vue') },
  { path: '/fitness/ai-generator', component: () => import('../views/fitness/AiGenerator.vue') },

  // 需登录
  { path: '/profile', component: () => import('../views/public/Profile.vue'), meta: { requiresAuth: true } },
  { path: '/favorites', component: () => import('../views/user/Favorites.vue'), meta: { requiresAuth: true } },
  { path: '/my-comments', component: () => import('../views/user/MyComments.vue'), meta: { requiresAuth: true } },

  // 创作者中心
  { path: '/creator', component: () => import('../views/creator/CreatorCenter.vue'), meta: { requiresAuth: true } },

  // 旧路由重定向
  { path: '/user/publish-news', redirect: '/creator' },
  { path: '/user/publish-course', redirect: '/creator' },
  { path: '/user/manage-news', redirect: '/creator' },
  { path: '/user/manage-courses', redirect: '/creator' },
  { path: '/user/interaction', redirect: '/creator' },
  { path: '/user/statistics', redirect: '/creator' },

  // 管理后台
  { path: '/admin/dashboard', component: () => import('../views/admin/Dashboard.vue'),  meta: { requiresAuth: true } },
  { path: '/admin/config',    component: () => import('../views/admin/Config.vue'),     meta: { requiresAuth: true } },
  { path: '/admin/users',     component: () => import('../views/admin/Users.vue'),     meta: { requiresAuth: true } },
  { path: '/admin/audit',     component: () => import('../views/admin/Audit.vue'),     meta: { requiresAuth: true } },
  { path: '/admin/comments',  component: () => import('../views/admin/Comments.vue'),  meta: { requiresAuth: true } },
  { path: '/admin/logs',      component: () => import('../views/admin/Logs.vue'),      meta: { requiresAuth: true } },
  { path: '/admin/reports',   component: () => import('../views/admin/Reports.vue'),   meta: { requiresAuth: true } },

  // 旧路由重定向
  { path: '/courses/list', redirect: '/fitness/training' },
  { path: '/courses/detail/:id', redirect: '/fitness/training' },

  // 404
  { path: '/:pathMatch(.*)*', redirect: '/404' }
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/forgot-password', '/404', '/500']
  if (publicPages.includes(to.path)) return next()
  if (to.meta.requiresAuth && !isLoggedIn()) return next(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
  next()
})

export default router
