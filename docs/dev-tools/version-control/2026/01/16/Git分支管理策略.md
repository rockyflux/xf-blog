---
title: Git 分支管理策略
author: 箫风
date: 2026/01/16 11:00
isTop: false
categories:
 - 开发工具
tags:
 - Git
 - 分支管理
---

# Git 分支管理策略

<!-- more -->

## Git Flow

### 主要分支
- `master` - 生产环境代码
- `develop` - 开发环境代码

### 辅助分支
- `feature` - 功能分支
- `release` - 发布分支
- `hotfix` - 热修复分支

## 工作流程

1. 从 `develop` 创建 `feature` 分支
2. 开发完成后合并到 `develop`
3. 发布时从 `develop` 创建 `release` 分支
4. 测试通过后合并到 `master` 和 `develop`

## 总结

合理的分支管理策略可以保证代码质量和发布流程的规范性。
