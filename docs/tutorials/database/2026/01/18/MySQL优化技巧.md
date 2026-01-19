---
title: MySQL 优化技巧
author: 箫风
date: 2026/01/18 15:00
isTop: true
categories:
 - 开发教程
tags:
 - MySQL
 - 数据库
---

# MySQL 优化技巧

<!-- more -->

## 索引优化

### 创建索引
```sql
CREATE INDEX idx_name ON users(name);
```

### 使用 EXPLAIN
```sql
EXPLAIN SELECT * FROM users WHERE name = 'John';
```

## 查询优化

- 避免 SELECT *
- 使用 LIMIT
- 合理使用 JOIN

## 配置优化

调整 `my.cnf` 中的参数：
- `innodb_buffer_pool_size`
- `max_connections`

## 总结

合理的优化可以大大提高数据库性能。
