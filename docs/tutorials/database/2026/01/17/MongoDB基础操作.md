---
title: MongoDB 基础操作
author: 箫风
date: 2026/01/17 15:00
isTop: false
categories:
 - 开发教程
tags:
 - MongoDB
 - 数据库
---

# MongoDB 基础操作

<!-- more -->

## 插入文档

```javascript
db.users.insertOne({
  name: "John",
  age: 30
});
```

## 查询文档

```javascript
db.users.find({ age: { $gt: 25 } });
```

## 更新文档

```javascript
db.users.updateOne(
  { name: "John" },
  { $set: { age: 31 } }
);
```

## 删除文档

```javascript
db.users.deleteOne({ name: "John" });
```

## 总结

MongoDB 是 NoSQL 数据库，适合存储非结构化数据。
