---
title: Git 提交规范
author: 箫风
date: 2026/01/15 11:00
isTop: false
categories:
 - 开发工具
tags:
 - Git
 - 提交规范
---

# Git 提交规范

<!-- more -->

## 提交信息格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Type 类型

- `feat` - 新功能
- `fix` - 修复 bug
- `docs` - 文档更新
- `style` - 代码格式调整
- `refactor` - 重构
- `test` - 测试相关
- `chore` - 构建/工具相关

## 示例

```
feat(user): 添加用户登录功能

实现了用户登录、登出功能
支持记住密码选项

Closes #123
```

## 总结

规范的提交信息有助于代码审查和问题追踪。
