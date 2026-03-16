<template>
  <div class="rich-text-editor">
    <el-upload
      class="image-uploader"
      action="/api/upload"
      :auto-upload="false"
      :on-change="handleImageUpload"
      :show-file-list="false"
      accept="image/*"
    >
      <el-button type="primary" size="small">上传图片</el-button>
    </el-upload>
    <quill-editor
      v-model="content"
      ref="quillEditor"
      :options="editorOptions"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const content = ref(props.modelValue)
const quillEditor = ref(null)

// 监听内容变化
watch(content, (newValue) => {
  emit('update:modelValue', newValue)
})

// 监听外部值变化
watch(() => props.modelValue, (newValue) => {
  if (newValue !== content.value) {
    content.value = newValue
  }
})

// 编辑器配置
const editorOptions = {
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // 加粗，斜体，下划线，删除线
      ['blockquote', 'code-block'],                    // 引用，代码块
      [{ 'header': 1 }, { 'header': 2 }],              // 标题，键值对形式
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],   // 列表
      [{ 'script': 'sub' }, { 'script': 'super' }],    // 上标，下标
      [{ 'indent': '-1' }, { 'indent': '+1' }],        // 缩进
      [{ 'direction': 'rtl' }],                        // 文本方向
      [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],      // 标题
      [{ 'color': [] }, { 'background': [] }],         // 字体颜色，字体背景颜色
      [{ 'font': [] }],                                // 字体
      [{ 'align': [] }],                               // 对齐方式
      ['clean'],                                       // 清除字体样式
      ['link', 'image', 'video']                       // 链接，图片，视频
    ]
  }
}

// 处理图片上传
const handleImageUpload = (file) => {
  // 模拟图片上传，实际项目中需要调用后端API
  const reader = new FileReader()
  reader.onload = (e) => {
    const imageUrl = e.target.result
    // 在编辑器中插入图片
    const quill = quillEditor.value.getQuill()
    const range = quill.getSelection()
    quill.insertEmbed(range.index, 'image', imageUrl)
    quill.setSelection(range.index + 1)
  }
  reader.readAsDataURL(file.raw)
}
</script>

<style scoped>
.rich-text-editor {
  width: 100%;
}

.image-uploader {
  margin-bottom: 10px;
}

:deep(.ql-container) {
  min-height: 300px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

:deep(.ql-editor) {
  min-height: 300px;
  font-size: 14px;
  line-height: 1.5;
}
</style>
