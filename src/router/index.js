import { createRouter, createWebHistory } from 'vue-router'
import { checkRoutePermission, isLoggedIn, getCurrentUserRole } from '../services/permission.js'

const routes = [
  // 公共页面
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('../views/public/Login.vue') },
  { path: '/register', component: () => import('../views/public/Register.vue') },
  { path: '/forgot-password', component: () => import('../views/public/ForgotPassword.vue') },
  { path: '/404', component: () => import('../views/public/404.vue') },
  { path: '/500', component: () => import('../views/public/500.vue') },
  { path: '/profile', component: () => import('../views/public/Profile.vue') },
  
  // 健身爱好者端
  { path: '/home', component: () => import('../views/user/Home.vue') },
  { path: '/news/list', component: () => import('../views/user/NewsList.vue') },
  { path: '/news/detail/:id', component: () => import('../views/user/NewsDetail.vue') },
  { path: '/courses/list', component: () => import('../views/user/CourseList.vue') },
  { path: '/courses/detail/:id', component: () => import('../views/user/CourseDetail.vue') },
  { path: '/recommendation', component: () => import('../views/user/Recommendation.vue') },
  
  // 教练端
  { path: '/coach/publish', component: () => import('../views/coach/Publish.vue') },
  { path: '/coach/interaction', component: () => import('../views/coach/Interaction.vue') },
  { path: '/coach/statistics', component: () => import('../views/coach/Statistics.vue') },
  
  // 内容创作者端
  { path: '/creator/publish', component: () => import('../views/creator/Publish.vue') },
  { path: '/creator/manage', component: () => import('../views/creator/Manage.vue') },
  { path: '/creator/fans', component: () => import('../views/creator/Fans.vue') },
  
  // 管理员端
  { path: '/admin/dashboard', component: () => import('../views/admin/Dashboard.vue') },
  { path: '/admin/config', component: () => import('../views/admin/Config.vue') },
  { path: '/admin/users', component: () => import('../views/admin/Users.vue') },
  { path: '/admin/audit', component: () => import('../views/admin/Audit.vue') },
  { path: '/admin/logs', component: () => import('../views/admin/Logs.vue') },
  { path: '/admin/reports', component: () => import('../views/admin/Reports.vue') },
  
  // 404页面
  { path: '/:pathMatch(.*)*', redirect: '/404' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 公共页面不需要登录
  const publicPages = ['/login', '/register', '/forgot-password', '/404', '/500']
  const isPublic = publicPages.includes(to.path)
  
  if (isPublic) {
    next()
    return
  }
  
  // 检查是否登录
  if (!isLoggedIn()) {
    next('/login')
    return
  }
  
  // 检查权限
  const userRole = getCurrentUserRole()
  if (!checkRoutePermission(to.path, userRole)) {
    next('/404')
    return
  }
  
  next()
})

export default router