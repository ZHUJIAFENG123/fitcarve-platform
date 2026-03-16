<template>
  <div class="search-bar">
    <el-input
      v-model="searchQuery"
      placeholder="搜索文章、课程..."
      class="search-input"
      @keyup.enter="handleSearch"
    >
      <template #prefix>
        <i class="el-icon-search"></i>
      </template>
      <template #append>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </template>
    </el-input>
    
    <!-- 高级搜索 -->
    <div v-if="showAdvanced" class="advanced-search">
      <el-form :model="searchForm" label-width="80px">
        <el-form-item label="类型">
          <el-select v-model="searchForm.type" placeholder="选择类型">
            <el-option label="全部" value="all"></el-option>
            <el-option label="文章" value="news"></el-option>
            <el-option label="课程" value="course"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="searchForm.category" placeholder="选择分类">
            <el-option label="全部" value="all"></el-option>
            <el-option label="健身知识" value="knowledge"></el-option>
            <el-option label="训练计划" value="plan"></el-option>
            <el-option label="营养饮食" value="nutrition"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdvancedSearch">高级搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <el-button type="text" @click="toggleAdvanced" class="advanced-toggle">
      {{ showAdvanced ? '收起高级搜索' : '高级搜索' }}
    </el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const showAdvanced = ref(false)
const searchForm = ref({
  type: 'all',
  category: 'all',
  dateRange: []
})

// 触发搜索事件
const emit = defineEmits(['search'])

// 处理普通搜索
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    emit('search', {
      keyword: searchQuery.value,
      type: 'all',
      category: 'all',
      dateRange: []
    })
  }
}

// 处理高级搜索
const handleAdvancedSearch = () => {
  emit('search', {
    keyword: searchQuery.value,
    type: searchForm.value.type,
    category: searchForm.value.category,
    dateRange: searchForm.value.dateRange
  })
}

// 切换高级搜索
const toggleAdvanced = () => {
  showAdvanced.value = !showAdvanced.value
}

// 重置搜索
const resetSearch = () => {
  searchQuery.value = ''
  searchForm.value = {
    type: 'all',
    category: 'all',
    dateRange: []
  }
}
</script>

<style scoped>
.search-bar {
  width: 100%;
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  max-width: 600px;
}

.advanced-search {
  margin-top: 15px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
}

.advanced-toggle {
  margin-top: 10px;
}
</style>
