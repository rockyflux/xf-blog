---
title: VS Code 调试配置
author: 箫风
date: 2026/01/17 11:00
isTop: false
categories:
 - 开发工具
tags:
 - VS Code
 - 调试
---

# VS Code 调试配置

<!-- more -->

## launch.json 配置

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "启动程序",
      "program": "${workspaceFolder}/index.js"
    }
  ]
}
```

## 断点类型

- 行断点
- 条件断点
- 日志断点

## 调试技巧

- F5 开始调试
- F9 切换断点
- F10 单步跳过
- F11 单步进入

## 总结

VS Code 的调试功能非常强大，合理配置可以大大提高开发效率。
