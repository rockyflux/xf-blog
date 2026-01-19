---
title: Node.js 异步编程
author: 箫风
date: 2026/01/17 14:00
isTop: false
categories:
 - 开发教程
tags:
 - Node.js
 - 后端
 - 异步编程
---

# Node.js 异步编程

<!-- more -->

## 回调函数

```javascript
const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
```

## Promise

```javascript
const fs = require('fs').promises;

fs.readFile('file.txt', 'utf8')
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });
```

## async/await

```javascript
const fs = require('fs').promises;

async function readFile() {
  try {
    const data = await fs.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

## 总结

async/await 是处理异步代码最优雅的方式，推荐使用。
