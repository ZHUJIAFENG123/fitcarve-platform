<template>
  <div class="wang-editor-container">
    <div ref="editorRef" style="height: 500px;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import { createEditor, createToolbar } from '@wangeditor/editor'
import '@wangeditor/editor/dist/css/style.css'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const editorRef = ref(null)
let editor = null
let toolbar = null

const initEditor = async () => {
  editor = createEditor({
    selector: editorRef.value,
    html: props.modelValue || '<p></p>',
    config: {
      placeholder: '请输入资讯内容...',
      MENU_CONF: {
        uploadImage: {
          server: '/api/upload/image',
          fieldName: 'file',
          maxFileSize: 2 * 1024 * 1024,
          allowedFileTypes: ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'],
          onSuccess: (file, res) => {
            return res.url
          },
          onFailed: (file, res) => {
            console.error('图片上传失败:', res)
            return '上传失败'
          },
          onError: (file, err) => {
            console.error('图片上传错误:', err)
            return '上传错误'
          }
        },
        uploadVideo: {
          server: '/api/upload/video',
          fieldName: 'file',
          maxFileSize: 50 * 1024 * 1024,
          allowedFileTypes: ['video/mp4', 'video/webm', 'video/ogg'],
          onSuccess: (file, res) => {
            return res.url
          }
        }
      }
    }
  })

  toolbar = createToolbar({
    editor,
    selector: '#toolbar-container',
    config: {
      excludeKeys: ['group-video']
    }
  })

  editor.on('change', () => {
    const html = editor.getHtml()
    emit('update:modelValue', html)
  })
}

watch(() => props.modelValue, (newValue) => {
  if (editor && newValue !== editor.getHtml()) {
    editor.setHtml(newValue || '<p></p>')
  }
})

onMounted(() => {
  initEditor()
})

onBeforeUnmount(() => {
  if (editor) {
    editor.destroy()
    editor = null
  }
  if (toolbar) {
    toolbar.destroy()
    toolbar = null
  }
})
</script>

<style scoped>
.wang-editor-container {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  overflow: hidden;
}
</style>
