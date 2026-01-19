---
title: Kubernetes 基础
author: 箫风
date: 2026/01/18 16:00
isTop: true
categories:
 - 开发教程
tags:
 - Kubernetes
 - DevOps
---

# Kubernetes 基础

<!-- more -->

## 核心概念

- Pod - 最小部署单元
- Service - 服务发现
- Deployment - 部署管理
- ConfigMap - 配置管理

## 部署应用

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
```

## 总结

Kubernetes 是容器编排的标准工具，适合大规模应用部署。
