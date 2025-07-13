<template>
  <div class="p-5 bg-secondary rounded-lg shadow-md">
    <h1 class="text-2xl font-bold text-primary mb-4">首页</h1>
    <p class="mb-4">欢迎来到我的网站！</p>
    
    <!-- 使用element-plus按钮组件 -->
    <el-button type="primary" @click="handleClick">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
    
    <!-- 使用element-plus卡片组件 -->
    <el-card class="mt-4" header="卡片标题">
      <p>这是一张卡片内容</p>
    </el-card>
    
    <router-link to="/about" class="btn mt-4">关于我们</router-link>
  </div>
</template>

<script lang="ts" setup>
// 这里可以添加组件的逻辑
const handleClick = () => {
  console.log('按钮被点击了')
}
</script>