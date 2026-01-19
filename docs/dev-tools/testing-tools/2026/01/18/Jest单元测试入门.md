---
title: Jest 单元测试入门
author: 箫风
date: 2026/01/18 12:00
isTop: true
categories:
 - 开发工具
tags:
 - Jest
 - 测试
---

# Jest 单元测试入门

<!-- more -->

## 安装

```bash
npm install --save-dev jest
```

## 编写测试

```javascript
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

## 常用断言

- `toBe` - 严格相等
- `toEqual` - 值相等
- `toContain` - 包含
- `toMatch` - 正则匹配

## 运行测试

```bash
npm test
```

## 总结

Jest 是 JavaScript 测试的流行框架，掌握它可以保证代码质量。
