<template>
  <div class="p-5 bg-secondary rounded-lg shadow-md">
    <h1 class="text-2xl font-bold text-primary mb-4">关于我们</h1>
    <p class="mb-4">这是一个关于我们的页面。</p>
    
    <!-- 使用element-plus表单组件 -->
    <el-form class="mt-4" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="form.age" type="number" placeholder="请输入年龄"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.gender">
          <el-radio label="male">男</el-radio>
          <el-radio label="female">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
    
    <router-link to="/" class="btn mt-4">返回首页</router-link>
  </div>
</template>

<script lang="ts" setup>
// 这里可以添加组件的逻辑
import { ref } from 'vue'

const form = ref({
  name: '',
  age: '',
  gender: 'male'
})

const submitForm = () => {
  console.log('表单提交:', form.value)
}
</script>