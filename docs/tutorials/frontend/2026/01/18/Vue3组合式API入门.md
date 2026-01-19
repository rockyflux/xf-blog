---
title: Vue3 组合式 API 入门
author: 箫风
date: 2026/01/18 14:00
isTop: false
categories:
 - 开发教程
tags:
 - Vue
 - 前端
 - JavaScript
---

# Vue3 组合式 API 入门

<!-- more -->

## 什么是组合式 API

组合式 API 是 Vue 3 引入的新特性，它提供了更灵活的方式来组织组件逻辑。

## 基础用法

### setup 函数
```javascript
import { ref, reactive } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const state = reactive({
      name: 'Vue 3'
    })
    
    return {
      count,
      state
    }
  }
}
```

### 使用 `<script setup>`
```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">Count: {{ count }}</button>
</template>
```

## 响应式数据

### ref
用于基本类型数据
```javascript
const count = ref(0)
```

### reactive
用于对象类型数据
```javascript
const state = reactive({
  name: 'Vue 3',
  version: '3.0'
})
```

## 生命周期钩子

```javascript
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  console.log('组件已挂载')
})

onUnmounted(() => {
  console.log('组件已卸载')
})
```

## 总结

组合式 API 让代码更加模块化和可复用，是 Vue 3 的重要特性之一。
