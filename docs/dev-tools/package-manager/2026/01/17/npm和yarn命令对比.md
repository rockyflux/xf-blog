---
title: npm 和 yarn 命令对比
author: 箫风
date: 2026/01/17 10:00
isTop: false
categories:
 - 开发工具
tags:
 - npm
 - yarn
 - 包管理
---

# npm 和 yarn 命令对比

<!-- more -->

## 安装依赖

### npm
```bash
npm install
npm install <package>
```

### yarn
```bash
yarn install
yarn add <package>
```

## 安装开发依赖

### npm
```bash
npm install --save-dev <package>
```

### yarn
```bash
yarn add --dev <package>
```

## 运行脚本

### npm
```bash
npm run <script>
```

### yarn
```bash
yarn <script>
```

## 更新依赖

### npm
```bash
npm update
```

### yarn
```bash
yarn upgrade
```

## 总结

yarn 在某些场景下速度更快，但 npm 是 Node.js 官方包管理器，两者都是不错的选择。
