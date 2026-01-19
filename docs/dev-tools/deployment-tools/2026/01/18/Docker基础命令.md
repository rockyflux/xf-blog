---
title: Docker 基础命令
author: 箫风
date: 2026/01/18 15:00
isTop: true
categories:
 - 开发工具
tags:
 - Docker
 - 部署工具
---

# Docker 基础命令

<!-- more -->

## 镜像操作

```bash
docker pull nginx
docker images
docker rmi <image-id>
```

## 容器操作

```bash
docker run -d -p 80:80 nginx
docker ps
docker stop <container-id>
docker rm <container-id>
```

## Dockerfile

```dockerfile
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "index.js"]
```

## 总结

Docker 简化了应用的部署和管理，是现代 DevOps 的重要工具。
