<template>
  <div class="learning-progress">
    <div class="progress-header">
      <h2>学习进度</h2>
    </div>
    
    <el-card style="margin-bottom: 20px;">
      <template #header>
        <div class="card-header">
          <span>学习概览</span>
        </div>
      </template>
      
      <div class="overview-stats">
        <div class="stat-item">
          <el-card shadow="hover">
            <div class="stat-value">{{ totalCourses }}</div>
            <div class="stat-label">已学习课程</div>
          </el-card>
        </div>
        <div class="stat-item">
          <el-card shadow="hover">
            <div class="stat-value">{{ totalHours }}</div>
            <div class="stat-label">学习时长 (小时)</div>
          </el-card>
        </div>
        <div class="stat-item">
          <el-card shadow="hover">
            <div class="stat-value">{{ completionRate }}%</div>
            <div class="stat-label">总体完成率</div>
          </el-card>
        </div>
      </div>
    </el-card>
    
    <el-card>
      <template #header>
        <div class="card-header">
          <span>课程学习进度</span>
        </div>
      </template>
      
      <el-table :data="courses" style="width: 100%" border>
        <el-table-column prop="id" label="课程ID" width="80" />
        <el-table-column prop="title" label="课程名称" min-width="300">
          <template #default="scope">
            <a href="javascript:void(0)" @click="viewCourse(scope.row)">{{ scope.row.title }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="totalChapters" label="总章节" width="100" />
        <el-table-column prop="completedChapters" label="已完成" width="100" />
        <el-table-column prop="progress" label="进度" width="200">
          <template #default="scope">
            <el-progress :percentage="scope.row.progress" :color="getProgressColor(scope.row.progress)" />
          </template>
        </el-table-column>
        <el-table-column prop="lastLearned" label="最后学习" width="180" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="scope">
            <el-button size="small" @click="continueLearning(scope.row)">继续学习</el-button>
            <el-button size="small" type="primary" @click="viewDetail(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    
    <!-- 课程详情对话框 -->
    <el-dialog
      v-model="courseDialogVisible"
      :title="currentCourse?.title || '课程详情'"
      width="800px"
    >
      <div v-if="currentCourse">
        <div class="course-info">
          <h3>{{ currentCourse.title }}</h3>
          <p>总章节: {{ currentCourse.totalChapters }}</p>
          <p>已完成: {{ currentCourse.completedChapters }}</p>
          <p>进度: {{ currentCourse.progress }}%</p>
        </div>
        
        <div class="chapter-list">
          <h4>章节学习进度</h4>
          <el-tree
            :data="currentCourse.chapters"
            :props="treeProps"
            node-key="id"
            default-expand-all
          >
            <template #default="{ node, data }">
              <div class="chapter-item">
                <span :class="{ 'completed': data.completed }">
                  {{ node.label }}
                </span>
                <el-tag v-if="data.completed" type="success">已完成</el-tag>
                <el-tag v-else type="warning">未完成</el-tag>
              </div>
            </template>
          </el-tree>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="courseDialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

// 模拟课程学习数据
const courses = ref([
  {
    id: 1,
    title: '力量训练基础',
    totalChapters: 8,
    completedChapters: 3,
    progress: 37.5,
    lastLearned: '2023-01-10 14:30:00',
    chapters: [
      { id: 1, label: '第1章：力量训练概述', completed: true },
      { id: 2, label: '第2章：基本动作要领', completed: true },
      { id: 3, label: '第3章：器械使用方法', completed: true },
      { id: 4, label: '第4章：训练计划制定', completed: false },
      { id: 5, label: '第5章：营养搭配', completed: false },
      { id: 6, label: '第6章：恢复与休息', completed: false },
      { id: 7, label: '第7章：常见错误纠正', completed: false },
      { id: 8, label: '第8章：进阶训练技巧', completed: false }
    ]
  },
  {
    id: 2,
    title: '有氧运动指南',
    totalChapters: 6,
    completedChapters: 4,
    progress: 66.7,
    lastLearned: '2023-01-09 10:15:00',
    chapters: [
      { id: 1, label: '第1章：有氧运动基础', completed: true },
      { id: 2, label: '第2章：心率控制', completed: true },
      { id: 3, label: '第3章：不同有氧运动方式', completed: true },
      { id: 4, label: '第4章：训练强度调整', completed: true },
      { id: 5, label: '第5章：有氧与力量结合', completed: false },
      { id: 6, label: '第6章：长期有氧计划', completed: false }
    ]
  },
  {
    id: 3,
    title: '瑜伽入门',
    totalChapters: 10,
    completedChapters: 1,
    progress: 10,
    lastLearned: '2023-01-08 16:45:00',
    chapters: [
      { id: 1, label: '第1章：瑜伽简介', completed: true },
      { id: 2, label: '第2章：基本呼吸法', completed: false },
      { id: 3, label: '第3章：基础体式', completed: false },
      { id: 4, label: '第4章：拉伸技巧', completed: false },
      { id: 5, label: '第5章：冥想入门', completed: false },
      { id: 6, label: '第6章：瑜伽与压力管理', completed: false },
      { id: 7, label: '第7章：进阶体式', completed: false },
      { id: 8, label: '第8章：瑜伽与睡眠', completed: false },
      { id: 9, label: '第9章：瑜伽与消化', completed: false },
      { id: 10, label: '第10章：建立日常练习', completed: false }
    ]
  }
])

// 计算统计数据
const totalCourses = computed(() => courses.value.length)
const totalHours = computed(() => {
  return courses.value.reduce((total, course) => {
    return total + (course.completedChapters * 0.5) // 假设每章0.5小时
  }, 0).toFixed(1)
})
const completionRate = computed(() => {
  const totalChapters = courses.value.reduce((total, course) => total + course.totalChapters, 0)
  const completedChapters = courses.value.reduce((total, course) => total + course.completedChapters, 0)
  return Math.round((completedChapters / totalChapters) * 100)
})

// 对话框状态
const courseDialogVisible = ref(false)
const currentCourse = ref(null)

// 树形控件属性
const treeProps = {
  children: 'children',
  label: 'label'
}

// 获取进度条颜色
const getProgressColor = (progress) => {
  if (progress < 30) return '#F56C6C'
  if (progress < 70) return '#E6A23C'
  return '#67C23A'
}

// 查看课程
const viewCourse = (course) => {
  // 跳转到课程详情页
  console.log('查看课程:', course.title)
}

// 继续学习
const continueLearning = (course) => {
  // 跳转到课程学习页
  ElMessage.success(`开始学习: ${course.title}`)
}

// 查看详情
const viewDetail = (course) => {
  currentCourse.value = { ...course }
  courseDialogVisible.value = true
}
</script>

<style scoped>
.learning-progress {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.progress-header {
  margin-bottom: 30px;
}

.progress-header h2 {
  font-size: 24px;
  color: #333;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.overview-stats {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.stat-item {
  flex: 1;
}

.stat-value {
  font-size: 36px;
  text-align: center;
  color: #1890ff;
  margin: 20px 0;
}

.stat-label {
  text-align: center;
  color: #666;
  font-size: 14px;
}

.chapter-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.chapter-item .completed {
  color: #67C23A;
  font-weight: 500;
}

.course-info {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.course-info h3 {
  font-size: 18px;
  margin-bottom: 15px;
}

.course-info p {
  margin-bottom: 8px;
  color: #666;
}

.chapter-list {
  margin-top: 20px;
}

.chapter-list h4 {
  margin-bottom: 15px;
  font-size: 16px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .learning-progress {
    padding: 10px;
  }
  
  .overview-stats {
    flex-direction: column;
  }
  
  .el-dialog {
    width: 90% !important;
  }
}
</style>