<template>
  <div class="admin-users">
    <Navbar :menu-links="adminMenuLinks" :logo-suffix="'管理后台'" />
    <div class="admin-content">
      <div class="page-header">
        <h2>用户管理</h2>
        <el-button type="primary" @click="openAddUserDialog">新增用户</el-button>
      </div>

      <!-- 数据概览 -->
      <div class="overview-cards">
        <el-card shadow="hover" class="overview-card">
          <div class="card-content"><div class="card-title">总用户数</div><div class="card-value">{{ users.length }}</div></div>
        </el-card>
        <el-card shadow="hover" class="overview-card">
          <div class="card-content"><div class="card-title">管理员</div><div class="card-value">{{ users.filter(u=>u.role==='admin').length }}</div></div>
        </el-card>
        <el-card shadow="hover" class="overview-card">
          <div class="card-content"><div class="card-title">教练</div><div class="card-value">{{ users.filter(u=>u.role==='coach').length }}</div></div>
        </el-card>
        <el-card shadow="hover" class="overview-card">
          <div class="card-content"><div class="card-title">创作者</div><div class="card-value">{{ users.filter(u=>u.role==='creator').length }}</div></div>
        </el-card>
        <el-card shadow="hover" class="overview-card">
          <div class="card-content"><div class="card-title">爱好者</div><div class="card-value">{{ users.filter(u=>u.role==='user').length }}</div></div>
        </el-card>
        <el-card shadow="hover" class="overview-card">
          <div class="card-content"><div class="card-title">待审核申请</div><div class="card-value" style="color:#e6a23c">{{ pendingCount }}</div></div>
        </el-card>
      </div>

      <!-- 图表 -->
      <div class="charts-grid">
        <el-card shadow="hover" class="chart-card">
          <template #header><span>用户角色分布</span></template>
          <div ref="userRoleChart" class="chart"></div>
        </el-card>
        <el-card shadow="hover" class="chart-card">
          <template #header><span>月度注册趋势</span></template>
          <div ref="userTrendChart" class="chart"></div>
        </el-card>
      </div>

      <el-tabs v-model="activeAdminTab" style="margin-top: 20px;">
        <el-tab-pane label="用户列表" name="users">
          <div class="search-bar">
            <el-input v-model="searchQuery" placeholder="搜索用户名或邮箱" prefix-icon="el-icon-search" style="width: 300px" />
            <el-select v-model="roleFilter" placeholder="按角色筛选" style="width: 160px">
              <el-option label="全部" value="" />
              <el-option label="管理员" value="admin" />
              <el-option label="健身爱好者" value="user" />
              <el-option label="教练" value="coach" />
              <el-option label="内容创作者" value="creator" />
            </el-select>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
          </div>
          <el-table :data="filteredUsers" style="width: 100%" border stripe>
            <el-table-column prop="id" label="ID" width="70" />
            <el-table-column prop="username" label="用户名" width="120" />
            <el-table-column prop="email" label="邮箱" width="200" />
            <el-table-column prop="role" label="角色" width="120">
              <template #default="scope">
                <el-tag :type="getRoleType(scope.row.role)">{{ getRoleName(scope.row.role) }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="创建时间" width="180" />
            <el-table-column prop="status" label="状态" width="100">
              <template #default="scope">
                <el-switch v-model="scope.row.status" @change="updateUserStatus(scope.row.id, scope.row.status)" />
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" fixed="right">
              <template #default="scope">
                <el-button size="small" @click="editUser(scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="deleteUser(scope.row.id)">删除</el-button>
                <el-button size="small" @click="assignRoles(scope.row)">角色</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="filteredUsers.length" />
          </div>
        </el-tab-pane>

        <el-tab-pane name="applications">
          <template #label>
            <span>角色审核 <el-badge :value="pendingCount" v-if="pendingCount > 0" /></span>
          </template>
          <div class="search-bar">
            <el-select v-model="appFilter" placeholder="按状态筛选" style="width: 160px">
              <el-option label="全部" value="all" />
              <el-option label="待审核" value="pending" />
              <el-option label="已通过" value="approved" />
              <el-option label="已驳回" value="rejected" />
            </el-select>
            <el-button type="primary" @click="refreshApplications">刷新</el-button>
          </div>
          <el-table :data="filteredApplications" style="width: 100%" border stripe>
            <el-table-column prop="username" label="申请人" width="130" />
            <el-table-column prop="currentRole" label="当前身份" width="130">
              <template #default="scope">
                <el-tag size="small">{{ ROLE_DEFINITIONS[scope.row.currentRole]?.label || scope.row.currentRole }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="targetRole" label="申请身份" width="140">
              <template #default="scope">
                <el-tag :color="ROLE_DEFINITIONS[scope.row.targetRole]?.color" effect="dark" size="small">{{ ROLE_DEFINITIONS[scope.row.targetRole]?.label }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="reason" label="申请理由" min-width="200" />
            <el-table-column prop="applyTime" label="申请时间" width="170" />
            <el-table-column prop="status" label="状态" width="100">
              <template #default="scope">
                <el-tag v-if="scope.row.status==='pending'" type="warning">待审核</el-tag>
                <el-tag v-else-if="scope.row.status==='approved'" type="success">已通过</el-tag>
                <el-tag v-else type="danger">已驳回</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="220" fixed="right">
              <template #default="scope">
                <template v-if="scope.row.status==='pending'">
                  <el-button size="small" type="success" @click="approveApp(scope.row)">通过</el-button>
                  <el-button size="small" type="danger" @click="rejectApp(scope.row)">驳回</el-button>
                </template>
                <span v-else style="color:#999">已处理</span>
              </template>
            </el-table-column>
          </el-table>
          <el-empty v-if="filteredApplications.length===0" description="暂无角色申请" />
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 新增/编辑用户对话框 -->
    <el-dialog v-model="dialogVisible" :title="isEdit?'编辑用户':'新增用户'" width="500px">
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item label="用户名" prop="username"><el-input v-model="form.username" /></el-form-item>
        <el-form-item label="邮箱" prop="email"><el-input v-model="form.email" type="email" /></el-form-item>
        <el-form-item label="密码" prop="password" v-if="!isEdit"><el-input v-model="form.password" type="password" /></el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="form.role">
            <el-option label="管理员" value="admin" />
            <el-option label="健身爱好者" value="user" />
            <el-option label="教练" value="coach" />
            <el-option label="内容创作者" value="creator" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer><span class="dialog-footer"><el-button @click="dialogVisible=false">取消</el-button><el-button type="primary" @click="saveUser">保存</el-button></span></template>
    </el-dialog>

    <!-- 角色分配对话框 -->
    <el-dialog v-model="roleDialogVisible" title="分配角色与权限" width="600px">
      <el-form :model="roleForm">
        <el-form-item label="用户"><el-input v-model="roleForm.username" disabled /></el-form-item>
        <el-form-item label="角色">
          <el-select v-model="roleForm.role" @change="handleRoleChange">
            <el-option label="管理员" value="admin" />
            <el-option label="健身爱好者" value="user" />
            <el-option label="教练" value="coach" />
            <el-option label="内容创作者" value="creator" />
          </el-select>
        </el-form-item>
        <el-form-item label="权限">
          <el-checkbox-group v-model="roleForm.permissions">
            <el-checkbox v-for="p in permissions" :key="p.value" :label="p.value">{{ p.label }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer><span class="dialog-footer"><el-button @click="roleDialogVisible=false">取消</el-button><el-button type="primary" @click="saveRoleAssignment">保存</el-button></span></template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ROLE_DEFINITIONS } from '@/services/auth.js'
import Navbar from '@/components/Navbar.vue'
import * as echarts from 'echarts'

const adminMenuLinks = [
  { to: '/admin/dashboard', label: '后台首页', active: false },
  { to: '/admin/config', label: '系统配置', active: false },
  { to: '/admin/users', label: '用户管理', active: true },
  { to: '/admin/audit', label: '资讯审核', active: false },
  { to: '/admin/comments', label: '评论监控', active: false },
  { to: '/admin/logs', label: '操作日志', active: false },
  { to: '/admin/reports', label: '数据报表', active: false }
]

const activeAdminTab = ref('users')
const searchQuery = ref('')
const roleFilter = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const appFilter = ref('all')
const dialogVisible = ref(false)
const roleDialogVisible = ref(false)
const isEdit = ref(false)

const form = ref({ id: '', username: '', email: '', password: '', role: 'user', status: true })
const roleForm = ref({ id: '', username: '', role: '', permissions: [] })

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }, { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }]
}

const permissions = [
  { label: '查看资讯', value: 'view_news' },{ label: '发布资讯', value: 'publish_news' },
  { label: '审核资讯', value: 'audit_news' },{ label: '管理用户', value: 'manage_users' },
  { label: '查看课程', value: 'view_courses' },{ label: '发布课程', value: 'publish_courses' },
  { label: '查看统计', value: 'view_statistics' },{ label: '系统配置', value: 'system_config' }
]

const users = ref([
  { id:1, username:'admin', email:'admin@example.com', role:'admin', status:true, createdAt:'2023-01-01' },
  { id:2, username:'user1', email:'u1@example.com', role:'user', status:true, createdAt:'2023-02-15' },
  { id:3, username:'coach1', email:'c1@example.com', role:'coach', status:true, createdAt:'2023-03-10' },
  { id:4, username:'creator1', email:'cr1@example.com', role:'creator', status:true, createdAt:'2023-04-05' },
  { id:5, username:'user2', email:'u2@example.com', role:'user', status:true, createdAt:'2023-05-20' },
  { id:6, username:'coach2', email:'c2@example.com', role:'coach', status:true, createdAt:'2023-06-12' },
  { id:7, username:'creator2', email:'cr2@example.com', role:'creator', status:true, createdAt:'2023-07-08' },
  { id:8, username:'user3', email:'u3@example.com', role:'user', status:true, createdAt:'2023-08-25' },
  { id:9, username:'coach3', email:'c3@example.com', role:'coach', status:true, createdAt:'2023-09-14' },
  { id:10, username:'creator3', email:'cr3@example.com', role:'creator', status:true, createdAt:'2023-10-01' }
])

const filteredUsers = computed(() => {
  let r = users.value
  if (searchQuery.value) r = r.filter(u => u.username.includes(searchQuery.value) || u.email.includes(searchQuery.value))
  if (roleFilter.value) r = r.filter(u => u.role === roleFilter.value)
  return r
})

const getRoleType = (r) => ({ admin:'danger', user:'info', coach:'warning', creator:'success' }[r]||'info')
const getRoleName = (r) => ({ admin:'管理员', user:'健身爱好者', coach:'教练', creator:'内容创作者' }[r]||r)
const handleSearch = () => { currentPage.value = 1 }

const openAddUserDialog = () => { isEdit.value=false; form.value={ id:'', username:'', email:'', password:'', role:'user', status:true }; dialogVisible.value=true }
const editUser = (u) => { isEdit.value=true; form.value={ ...u }; dialogVisible.value=true }
const saveUser = () => {
  if (isEdit.value) { const i = users.value.findIndex(u=>u.id===form.value.id); if(i!==-1) { users.value[i]={...form.value}; ElMessage.success('编辑成功') } }
  else { users.value.push({...form.value, id: users.value.length+1, createdAt: new Date().toISOString().slice(0,10) }); ElMessage.success('新增成功') }
  dialogVisible.value=false
}
const deleteUser = (id) => {
  ElMessageBox.confirm('确定删除该用户吗？','提示',{confirmButtonText:'确定',cancelButtonText:'取消',type:'warning'}).then(()=>{
    const i=users.value.findIndex(u=>u.id===id); if(i!==-1){ users.value.splice(i,1); ElMessage.success('删除成功') }
  }).catch(()=>{})
}
const updateUserStatus = (id,s) => { const u=users.value.find(u=>u.id===id); if(u){ u.status=s; ElMessage.success(`状态已${s?'启用':'禁用'}`) } }
const assignRoles = (u) => { roleForm.value={ id:u.id, username:u.username, role:u.role, permissions:getDefaultPermissions(u.role) }; roleDialogVisible.value=true }
const getDefaultPermissions = (r) => ({
  admin:['view_news','publish_news','audit_news','manage_users','view_courses','publish_courses','view_statistics','system_config'],
  user:['view_news','view_courses'], coach:['view_news','view_courses','publish_courses'], creator:['view_news','publish_news']
}[r]||[])
const handleRoleChange = () => { roleForm.value.permissions=getDefaultPermissions(roleForm.value.role) }
const saveRoleAssignment = () => { const u=users.value.find(u=>u.id===roleForm.value.id); if(u){ u.role=roleForm.value.role; ElMessage.success('分配成功') }; roleDialogVisible.value=false }

const allApplications = ref([])
const pendingCount = computed(() => allApplications.value.filter(a=>a.status==='pending').length)
const filteredApplications = computed(() => appFilter.value==='all'?allApplications.value:allApplications.value.filter(a=>a.status===appFilter.value))
const refreshApplications = () => { allApplications.value = [] }
const approveApp = async () => { ElMessage.info('生产环境不支持此操作') }
const rejectApp = async () => { ElMessage.info('生产环境不支持此操作') }

// 图表
const userRoleChart = ref(null)
const userTrendChart = ref(null)
let charts = {}

const initCharts = () => {
  const roleNames = ['管理员','教练','创作者','爱好者']
  const roleValues = [
    users.value.filter(u=>u.role==='admin').length,
    users.value.filter(u=>u.role==='coach').length,
    users.value.filter(u=>u.role==='creator').length,
    users.value.filter(u=>u.role==='user').length
  ]
  if (userRoleChart.value) {
    userRoleChart.value.style.height = '260px'
    charts.userRole = echarts.init(userRoleChart.value)
    charts.userRole.setOption({
      tooltip: { trigger: 'item', formatter: '{b}: {c}人 ({d}%)' },
      series: [{ type: 'pie', radius: ['45%','70%'], center:['50%','55%'], data: roleNames.map((n,i)=>({value:roleValues[i],name:n})), label:{formatter:'{b}\n{d}%'} }]
    })
  }
  if (userTrendChart.value) {
    userTrendChart.value.style.height = '260px'
    charts.userTrend = echarts.init(userTrendChart.value)
    charts.userTrend.setOption({
      tooltip: { trigger: 'axis' },
      grid: { left:'3%',right:'4%',top:15,bottom:5,containLabel:true },
      xAxis: { type:'category', data:['1月','3月','5月','7月','9月','11月'] },
      yAxis: { type:'value', name:'注册数' },
      series: [{ data:[120,280,460,620,810,1000], type:'line', smooth:true, areaStyle:{color:'rgba(24,144,255,0.1)'}, lineStyle:{color:'#1890ff'}, itemStyle:{color:'#1890ff'} }]
    })
  }
  window.addEventListener('resize',()=>Object.values(charts).forEach(c=>c?.resize()))
}

onMounted(() => { refreshApplications(); initCharts() })
</script>

<style scoped>
.admin-users { min-height: 100vh; background: #f5f5f5; }
.admin-content { max-width: 1400px; margin: 0 auto; padding: 20px; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.page-header h2 { font-size: 20px; color: #333; margin: 0; padding-bottom: 10px; border-bottom: 2px solid #1890ff; display: inline-block; }

.overview-cards { display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; margin-bottom: 24px; }
.overview-card { transition: transform 0.3s ease; }
.overview-card:hover { transform: translateY(-4px); }
.card-content { text-align: center; padding: 6px 0; }
.card-title { font-size: 13px; color: #666; margin-bottom: 6px; }
.card-value { font-size: 24px; font-weight: bold; color: #1890ff; }

.charts-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 4px; }
.chart-card { transition: transform 0.3s ease; }
.chart-card:hover { transform: translateY(-4px); }
.chart { width: 100%; }

.search-bar { margin-bottom: 20px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.pagination { margin-top: 20px; display: flex; justify-content: flex-end; }
.dialog-footer { display: flex; justify-content: flex-end; gap: 10px; }

@media (max-width: 1200px) { .overview-cards { grid-template-columns: repeat(3, 1fr); } .charts-grid { grid-template-columns: 1fr; } }
@media (max-width: 768px) { .admin-content { padding: 12px; } .overview-cards { grid-template-columns: repeat(2, 1fr); } .page-header { flex-direction: column; align-items: flex-start; gap: 12px; } .search-bar { flex-direction: column; align-items: stretch; } }
</style>
