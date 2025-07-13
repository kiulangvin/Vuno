<template>
  <button class="theme-toggle-button" @click="toggleTheme">
    <span v-if="currentTheme === 'light'">{{ lightModeText }}</span>
    <span v-else>{{ darkModeText }}</span>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { themeManager, Theme } from '../utils/theme';

// 组件参数
const props = defineProps({
  lightModeText: {
    type: String,
    default: '切换到暗色模式'
  },
  darkModeText: {
    type: String,
    default: '切换到亮色模式'
  }
});

// 当前主题
const currentTheme = ref<Theme>(themeManager.getCurrentTheme());

// 切换主题
const toggleTheme = () => {
  themeManager.toggleTheme();
};

// 主题变化处理函数
const handleThemeChange = (theme: Theme) => {
  currentTheme.value = theme;
};

// 挂载时添加监听器
onMounted(() => {
  themeManager.addListener(handleThemeChange);
});

// 卸载时移除监听器
onUnmounted(() => {
  themeManager.removeListener(handleThemeChange);
});
</script>

<style scoped>
.theme-toggle-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.theme-toggle-button:hover {
  opacity: 0.9;
}
</style>