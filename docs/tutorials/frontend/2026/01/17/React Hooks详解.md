---
title: React Hooks 详解
author: 箫风
date: 2026/01/17 14:00
isTop: false
categories:
 - 开发教程
tags:
 - React
 - Hooks
---

# React Hooks 详解

<!-- more -->

## useState

```javascript
const [count, setCount] = useState(0);
```

## useEffect

```javascript
useEffect(() => {
  // 副作用代码
  return () => {
    // 清理函数
  };
}, [dependencies]);
```

## 自定义 Hooks

```javascript
function useCounter(initialValue) {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount(count + 1);
  return { count, increment };
}
```

## 总结

Hooks 让函数组件也能使用状态和生命周期，是 React 的重要特性。
