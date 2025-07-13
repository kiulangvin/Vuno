# vuno-starter

This template should help get you started developing with Vue 3 in Vite.

## 环境变量配置

项目使用环境变量来配置API基础URL等参数。以下是相关配置文件说明：

- `.env`: 全局默认配置
- `.env.development`: 开发环境配置
- `.env.production`: 生产环境配置
- `.env.example`: 环境变量示例文件

### 自定义API基础URL

1. 复制 `.env.example` 并重命名为 `.env.local`
2. 修改 `VITE_APP_API_BASE_URL` 的值为你的API地址

```
VITE_APP_API_BASE_URL=http://your-custom-api-url.com/api
```

> 注意：`.env.local` 文件已添加到 `.gitignore`，不会被提交到版本控制中。 The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).
