---
title: Git 常用命令速查
author: 箫风
date: 2026/01/18 11:00
isTop: true
categories:
 - 开发工具
tags:
 - Git
 - 版本控制
---

# Git 常用命令速查

<!-- more -->

## 基础命令

### 初始化仓库
```bash
git init
```

### 克隆仓库
```bash
git clone <url>
```

### 查看状态
```bash
git status
```

## 提交相关

### 添加文件
```bash
git add .
git add <file>
```

### 提交
```bash
git commit -m "提交信息"
```

### 查看提交历史
```bash
git log
git log --oneline
```

## 分支操作

### 创建分支
```bash
git branch <branch-name>
```

### 切换分支
```bash
git checkout <branch-name>
```

### 合并分支
```bash
git merge <branch-name>
```

## 远程仓库

### 添加远程仓库
```bash
git remote add origin <url>
```

### 推送代码
```bash
git push origin <branch-name>
```

### 拉取代码
```bash
git pull origin <branch-name>
```

## 总结

掌握这些常用命令，可以满足日常开发中的大部分需求。
