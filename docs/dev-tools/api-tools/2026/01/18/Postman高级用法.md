---
title: Postman 高级用法
author: 箫风
date: 2026/01/18 14:00
isTop: true
categories:
 - 开发工具
tags:
 - Postman
 - API工具
---

# Postman 高级用法

<!-- more -->

## 环境变量

### 设置变量
```
{{baseUrl}}/api/users
```

### 使用变量
在 Tests 标签中：
```javascript
pm.environment.set("token", responseData.token);
```

## 测试脚本

```javascript
pm.test("状态码是200", function () {
    pm.response.to.have.status(200);
});
```

## Collection Runner

批量运行请求，适合自动化测试。

## 总结

Postman 的高级功能可以大大提高 API 开发和测试效率。
