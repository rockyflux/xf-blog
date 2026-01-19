---
title: Express 框架入门
author: 箫风
date: 2026/01/16 14:00
isTop: false
categories:
 - 开发教程
tags:
 - Express
 - Node.js
---

# Express 框架入门

<!-- more -->

## 安装

```bash
npm install express
```

## 基本使用

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000);
```

## 路由

```javascript
app.get('/users', (req, res) => {
  res.json({ users: [] });
});
```

## 中间件

```javascript
app.use(express.json());
```

## 总结

Express 是 Node.js 最流行的 Web 框架，简单易用。
