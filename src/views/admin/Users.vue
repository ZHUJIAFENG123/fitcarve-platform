<template>
  <div class="admin-users">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
          <el-button type="primary" @click="openAddUserDialog">新增用户</el-button>
        </div>
      </template>
      
      <div class="search-bar">
        <el-input
          v-model="searchQuery"
          placeholder="搜索用户名或邮箱"
          prefix-icon="el-icon-search"
          style="width: 300px; margin-right: 10px"
        />
        <el-select v-model="roleFilter" placeholder="按角色筛选" style="width: 150px; margin-right: 10px">
          <el-option label="全部" value="" />
          <el-option label="管理员" value="admin" />
          <el-option label="健身爱好者" value="user" />
          <el-option label="教练" value="coach" />
          <el-option label="内容创作者" value="creator" />
        </el-select>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </div>
      
      <el-table :data="filteredUsers" style="width: 100%" border>
        <el-table-column prop="id" label="用户ID" width="80" />
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column prop="email" label="邮箱" width="200" />
        <el-table-column prop="role" label="角色" width="120">
          <template #default="scope">
            <el-tag :type="getRoleType(scope.row.role)">
              {{ getRoleName(scope.row.role) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="180" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              @change="updateUserStatus(scope.row.id, scope.row.status)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="scope">
            <el-button size="small" @click="editUser(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteUser(scope.row.id)">删除</el-button>
            <el-button size="small" @click="assignRoles(scope.row)">分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="filteredUsers.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    
    <!-- 新增/编辑用户对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑用户' : '新增用户'"
      width="500px"
    >
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" type="email" />
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!isEdit">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="form.role">
            <el-option label="管理员" value="admin" />
            <el-option label="健身爱好者" value="user" />
            <el-option label="教练" value="coach" />
            <el-option label="内容创作者" value="creator" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveUser">保存</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 角色分配对话框 -->
    <el-dialog
      v-model="roleDialogVisible"
      title="分配角色与权限"
      width="600px"
    >
      <el-form :model="roleForm">
        <el-form-item label="用户">
          <el-input v-model="roleForm.username" disabled />
        </el-form-item>
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
            <el-checkbox v-for="permission in permissions" :key="permission.value" :label="permission.value">
              {{ permission.label }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="roleDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveRoleAssignment">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 搜索和筛选
const searchQuery = ref('')
const roleFilter = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

// 对话框状态
const dialogVisible = ref(false)
const roleDialogVisible = ref(false)
const isEdit = ref(false)

// 表单数据
const form = ref({
  id: '',
  username: '',
  email: '',
  password: '',
  role: 'user',
  status: true
})

const roleForm = ref({
  id: '',
  username: '',
  role: '',
  permissions: []
})

// 表单验证规则
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }, { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }]
}

// 权限列表
const permissions = [
  { label: '查看资讯', value: 'view_news' },
  { label: '发布资讯', value: 'publish_news' },
  { label: '审核资讯', value: 'audit_news' },
  { label: '管理用户', value: 'manage_users' },
  { label: '查看课程', value: 'view_courses' },
  { label: '发布课程', value: 'publish_courses' },
  { label: '查看统计', value: 'view_statistics' },
  { label: '系统配置', value: 'system_config' }
]

// 模拟用户数据
const users = ref([
  { id: 1, username: 'admin', email: 'admin@example.com', role: 'admin', status: true, createdAt: '2023-01-01 10:00:00' },
  { id: 2, username: 'user1', email: 'user1@example.com', role: 'user', status: true, createdAt: '2023-01-02 11:00:00' },
  { id: 3, username: 'coach1', email: 'coach1@example.com', role: 'coach', status: true, createdAt: '2023-01-03 12:00:00' },
  { id: 4, username: 'creator1', email: 'creator1@example.com', role: 'creator', status: true, createdAt: '2023-01-04 13:00:00' },
  { id: 5, username: 'user2', email: 'user2@example.com', role: 'user', status: true, createdAt: '2023-01-05 14:00:00' },
  { id: 6, username: 'coach2', email: 'coach2@example.com', role: 'coach', status: true, createdAt: '2023-01-06 15:00:00' },
  { id: 7, username: 'creator2', email: 'creator2@example.com', role: 'creator', status: true, createdAt: '2023-01-07 16:00:00' },
  { id: 8, username: 'user3', email: 'user3@example.com', role: 'user', status: true, createdAt: '2023-01-08 17:00:00' },
  { id: 9, username: 'coach3', email: 'coach3@example.com', role: 'coach', status: true, createdAt: '2023-01-09 18:00:00' },
  { id: 10, username: 'creator3', email: 'creator3@example.com', role: 'creator', status: true, createdAt: '2023-01-10 19:00:00' }
])

// 过滤后的用户列表
const filteredUsers = computed(() => {
  let result = users.value
  
  if (searchQuery.value) {
    result = result.filter(user => 
      user.username.includes(searchQuery.value) || 
      user.email.includes(searchQuery.value)
    )
  }
  
  if (roleFilter.value) {
    result = result.filter(user => user.role === roleFilter.value)
  }
  
  return result
})

// 角色类型映射
const getRoleType = (role) => {
  const typeMap = {
    admin: 'danger',
    user: 'info',
    coach: 'warning',
    creator: 'success'
  }
  return typeMap[role] || 'info'
}

// 角色名称映射
const getRoleName = (role) => {
  const nameMap = {
    admin: '管理员',
    user: '健身爱好者',
    coach: '教练',
    creator: '内容创作者'
  }
  return nameMap[role] || role
}

// 搜索处理
const handleSearch = () => {
  currentPage.value = 1
}

// 分页处理
const handleSizeChange = (size) => {
  pageSize.value = size
}

const handleCurrentChange = (current) => {
  currentPage.value = current
}

// 打开新增用户对话框
const openAddUserDialog = () => {
  isEdit.value = false
  form.value = {
    id: '',
    username: '',
    email: '',
    password: '',
    role: 'user',
    status: true
  }
  dialogVisible.value = true
}

// 编辑用户
const editUser = (user) => {
  isEdit.value = true
  form.value = { ...user }
  dialogVisible.value = true
}

// 保存用户
const saveUser = () => {
  if (isEdit.value) {
    // 编辑现有用户
    const index = users.value.findIndex(u => u.id === form.value.id)
    if (index !== -1) {
      users.value[index] = { ...form.value }
      ElMessage.success('用户编辑成功')
    }
  } else {
    // 新增用户
    const newUser = {
      ...form.value,
      id: users.value.length + 1,
      createdAt: new Date().toLocaleString()
    }
    users.value.push(newUser)
    ElMessage.success('用户新增成功')
  }
  dialogVisible.value = false
}

// 删除用户
const deleteUser = (id) => {
  ElMessageBox.confirm('确定要删除该用户吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const index = users.value.findIndex(u => u.id === id)
    if (index !== -1) {
      users.value.splice(index, 1)
      ElMessage.success('用户删除成功')
    }
  }).catch(() => {
    // 取消删除
  })
}

// 更新用户状态
const updateUserStatus = (id, status) => {
  const user = users.value.find(u => u.id === id)
  if (user) {
    user.status = status
    ElMessage.success(`用户状态已${status ? '启用' : '禁用'}`)
  }
}

// 分配角色
const assignRoles = (user) => {
  roleForm.value = {
    id: user.id,
    username: user.username,
    role: user.role,
    permissions: getDefaultPermissions(user.role)
  }
  roleDialogVisible.value = true
}

// 根据角色获取默认权限
const getDefaultPermissions = (role) => {
  const permissionMap = {
    admin: ['view_news', 'publish_news', 'audit_news', 'manage_users', 'view_courses', 'publish_courses', 'view_statistics', 'system_config'],
    user: ['view_news', 'view_courses'],
    coach: ['view_news', 'view_courses', 'publish_courses'],
    creator: ['view_news', 'publish_news']
  }
  return permissionMap[role] || []
}

// 角色变更处理
const handleRoleChange = () => {
  roleForm.value.permissions = getDefaultPermissions(roleForm.value.role)
}

// 保存角色分配
const saveRoleAssignment = () => {
  const user = users.value.find(u => u.id === roleForm.value.id)
  if (user) {
    user.role = roleForm.value.role
    ElMessage.success('角色分配成功')
  }
  roleDialogVisible.value = false
}
</script>

<style scoped>
.admin-users {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-bar {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .admin-users {
    padding: 10px;
  }
  
  .search-bar {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .search-bar .el-input,
  .search-bar .el-select {
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
  }
  
  .search-bar .el-button {
    width: 100%;
  }
}
</style>