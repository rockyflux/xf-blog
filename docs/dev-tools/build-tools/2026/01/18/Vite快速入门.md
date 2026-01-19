---
title: Vite 快速入门
author: 箫风
date: 2026/01/18 10:00
isTop: true
categories:
 - 开发工具
tags:
 - Vite
 - 构建工具
---

# Vite 快速入门

<!-- more -->

## 创建项目

```bash
npm create vite@latest my-app
cd my-app
npm install
npm run dev
```

## 项目结构

```
my-app/
├── index.html
├── src/
│   ├── main.js
│   └── App.vue
└── vite.config.js
```

## 配置

在 `vite.config.js` 中配置：

```javascript
export default {
  server: {
    port: 3000
  }
}
```

## 总结

Vite 提供了极快的开发体验，是现代化前端项目的首选。
