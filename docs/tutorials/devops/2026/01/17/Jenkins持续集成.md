---
title: Jenkins 持续集成
author: 箫风
date: 2026/01/17 16:00
isTop: false
categories:
 - 开发教程
tags:
 - Jenkins
 - CI/CD
---

# Jenkins 持续集成

<!-- more -->

## 安装

```bash
docker run -p 8080:8080 jenkins/jenkins:lts
```

## 创建任务

1. 新建任务
2. 选择项目类型
3. 配置源码管理
4. 配置构建步骤

## Pipeline

```groovy
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}
```

## 总结

Jenkins 是流行的 CI/CD 工具，功能强大且可扩展。
