---
title: GitHub Actions CI/CD
author: 箫风
date: 2026/01/17 15:00
isTop: false
categories:
 - 开发工具
tags:
 - GitHub Actions
 - CI/CD
---

# GitHub Actions CI/CD

<!-- more -->

## 工作流文件

在 `.github/workflows/` 目录下创建 YAML 文件。

## 示例配置

```yaml
name: CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm test
```

## 常用操作

- `actions/checkout` - 检出代码
- `actions/setup-node` - 设置 Node.js
- `actions/deploy` - 部署

## 总结

GitHub Actions 提供了强大的 CI/CD 能力，完全免费。
