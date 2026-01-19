---
title: Webpack 配置详解
author: 箫风
date: 2026/01/17 10:00
isTop: false
categories:
 - 开发工具
tags:
 - Webpack
 - 构建工具
---

# Webpack 配置详解

<!-- more -->

## 入口和输出

```javascript
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}
```

## Loader

处理不同类型的文件：

```javascript
module: {
  rules: [
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
  ]
}
```

## 插件

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')

plugins: [
  new HtmlWebpackPlugin({
    template: './src/index.html'
  })
]
```

## 总结

Webpack 是功能强大的模块打包工具，掌握其配置很重要。
