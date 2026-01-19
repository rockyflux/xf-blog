---
title: TypeScript 基础
author: 箫风
date: 2026/01/16 14:00
isTop: false
categories:
 - 开发教程
tags:
 - TypeScript
 - 前端
---

# TypeScript 基础

<!-- more -->

## 类型注解

```typescript
let name: string = "TypeScript";
let age: number = 10;
let isActive: boolean = true;
```

## 接口

```typescript
interface User {
  name: string;
  age: number;
}
```

## 类

```typescript
class Person {
  constructor(public name: string) {}
}
```

## 总结

TypeScript 提供了类型安全，可以减少运行时错误。
