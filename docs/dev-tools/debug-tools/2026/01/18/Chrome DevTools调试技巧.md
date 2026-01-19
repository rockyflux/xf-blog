---
title: Chrome DevTools 调试技巧
author: 箫风
date: 2026/01/18 11:00
isTop: true
categories:
 - 开发工具
tags:
 - Chrome DevTools
 - 调试
---

# Chrome DevTools 调试技巧

<!-- more -->

## 断点调试

### 设置断点
- 在代码行号处点击
- 使用 `debugger` 语句

### 条件断点
右键断点，设置条件表达式。

## 控制台技巧

### 查看对象
```javascript
console.table(data)
console.dir(obj)
```

### 性能分析
```javascript
console.time('label')
// 代码
console.timeEnd('label')
```

## Network 面板

- 查看请求详情
- 模拟慢速网络
- 禁用缓存

## 总结

掌握 DevTools 可以大大提高调试效率。
