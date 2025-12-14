<!-- CodeBlock.vue -->
<template>
  <div class="code-block-container">
    <!-- 代码块头部，包含语言信息和复制按钮 -->
    <div class="code-header">
      <div class="code-language">
        {{ getLanguageDisplay(language) }}
      </div>
      <div class="code-actions">
        <button
          class="copy-button"
          @click="copyCode"
          :disabled="copied"
          :title="copied ? '已复制!' : '复制代码'"
        >
          <n-icon size="14">
            <CopyOutline v-if="!copied" />
            <CheckmarkOutline v-else />
          </n-icon>
          <span>{{ copied ? '已复制' : '复制' }}</span>
        </button>
      </div>
    </div>

    <!-- 代码内容区域 -->
    <div class="code-content">
      <pre><code ref="codeElement" :class="`language-${language}`">{{ code }}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { NIcon } from 'naive-ui'
import { CopyOutline, CheckmarkOutline } from '@vicons/ionicons5'

const props = defineProps({
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: 'text'
  },
  filename: {
    type: String,
    default: ''
  }
})

const codeElement = ref(null)
const copied = ref(false)

// 语言显示映射
const languageDisplayMap = {
  'javascript': 'JavaScript',
  'typescript': 'TypeScript',
  'python': 'Python',
  'java': 'Java',
  'c': 'C',
  'cpp': 'C++',
  'css': 'CSS',
  'html': 'HTML',
  'json': 'JSON',
  'bash': 'Bash',
  'shell': 'Shell',
  'sql': 'SQL',
  'markdown': 'Markdown',
  'md': 'Markdown',
  'yaml': 'YAML',
  'yml': 'YAML',
  'go': 'Go',
  'rust': 'Rust',
  'php': 'PHP',
  'swift': 'Swift',
  'kotlin': 'Kotlin',
  'dart': 'Dart',
  'ruby': 'Ruby',
  'text': 'Text',
  'plaintext': 'Plain Text'
}

const getLanguageDisplay = (lang) => {
  return languageDisplayMap[lang.toLowerCase()] || lang.toUpperCase()
}

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (error) {
    // 降级方案：使用传统的复制方法
    try {
      const textArea = document.createElement('textarea')
      textArea.value = props.code
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)

      if (successful) {
        copied.value = true
        setTimeout(() => {
          copied.value = false
        }, 2000)
      } else {
        console.error('复制失败')
      }
    } catch (fallbackError) {
      console.error('复制功能失败:', fallbackError)
    }
  }
}

onMounted(() => {
  // 简单的代码显示，不使用复杂的语法高亮
  if (codeElement.value) {
    codeElement.value.textContent = props.code
  }
})
</script>

<style scoped>
/* 清新主题的代码块样式 */
.code-block-container {
  margin: 1.5rem 0;
  border-radius: 12px;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #e3f2fd;
  box-shadow: 0 2px 12px rgba(227, 242, 253, 0.3);
  transition: box-shadow 0.3s ease;
}

.code-block-container:hover {
  box-shadow: 0 4px 20px rgba(227, 242, 253, 0.5);
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-bottom: 1px solid #bae6fd;
  min-height: 44px;
}

.code-language {
  font-size: 0.8rem;
  font-weight: 600;
  color: #0369a1;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.code-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.copy-button {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  background: #ffffff;
  border: 1px solid #7dd3fc;
  border-radius: 8px;
  color: #0369a1;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  box-shadow: 0 1px 3px rgba(125, 211, 252, 0.2);
}

.copy-button:hover:not(:disabled) {
  background: #f0f9ff;
  border-color: #0ea5e9;
  color: #0c4a6e;
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(125, 211, 252, 0.4);
}

.copy-button:disabled {
  color: #059669;
  border-color: #34d399;
  background: #ecfdf5;
  box-shadow: 0 1px 3px rgba(52, 211, 153, 0.2);
}

.code-content {
  position: relative;
  margin: 0;
  overflow-x: auto;
  background: #ffffff;
}

.code-content pre {
  margin: 0 !important;
  padding: 1.5rem !important;
  background: #ffffff !important;
  overflow-x: auto;
  font-size: 0.9rem;
  line-height: 1.6;
  font-family: 'Consolas', 'Monaco', 'Courier New', 'SF Mono', monospace;
  color: #1f2937;
  border: none !important;
}

.code-content code {
  background: transparent !important;
  padding: 0 !important;
  border-radius: 0 !important;
  font-size: inherit !important;
  color: inherit !important;
  border: none !important;
}

/* 简单的语法高亮样式（清新配色） */
.code-content :deep(.token.comment),
.code-content :deep(.token.prolog),
.code-content :deep(.token.doctype),
.code-content :deep(.token.cdata) {
  color: #6b7280;
  font-style: italic;
}

.code-content :deep(.token.punctuation) {
  color: #374151;
}

.code-content :deep(.token.property),
.code-content :deep(.token.tag),
.code-content :deep(.token.boolean),
.code-content :deep(.token.number),
.code-content :deep(.token.constant),
.code-content :deep(.token.symbol) {
  color: #2563eb;
}

.code-content :deep(.token.selector),
.code-content :deep(.token.attr-name),
.code-content :deep(.token.string),
.code-content :deep(.token.char),
.code-content :deep(.token.builtin),
.code-content :deep(.token.inserted) {
  color: #059669;
}

.code-content :deep(.token.operator),
.code-content :deep(.token.entity),
.code-content :deep(.token.url) {
  color: #dc2626;
}

.code-content :deep(.token.atrule),
.code-content :deep(.token.attr-value),
.code-content :deep(.token.keyword) {
  color: #7c3aed;
  font-weight: 600;
}

.code-content :deep(.token.function) {
  color: #ea580c;
}

.code-content :deep(.token.class-name) {
  color: #0891b2;
}

.code-content :deep(.token.regex),
.code-content :deep(.token.important),
.code-content :deep(.token.variable) {
  color: #ca8a04;
}

/* 响应式适配 */
@media (max-width: 768px) {
  .code-header {
    padding: 0.6rem 0.8rem;
    min-height: 40px;
  }

  .code-language {
    font-size: 0.7rem;
  }

  .copy-button {
    padding: 0.3rem 0.6rem;
    font-size: 0.7rem;
  }

  .code-content pre {
    padding: 1rem !important;
    font-size: 0.8rem;
  }
}

/* 滚动条样式（清新配色） */
.code-content::-webkit-scrollbar {
  height: 6px;
}

.code-content::-webkit-scrollbar-track {
  background: #f8fafc;
  border-radius: 3px;
}

.code-content::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
  border: 1px solid #f8fafc;
}

.code-content::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>