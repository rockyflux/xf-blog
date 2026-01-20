# Doubao Downloader：豆包AI无水印资源批量下载工具

## 项目简介

Doubao Downloader 是一个专为豆包AI平台设计的无水印资源批量下载浏览器扩展/油猴脚本，基于React开发，支持一键批量下载豆包AI生成的无水印图片资源。该工具提供了便捷的下载体验，特别适合内容创作者、设计师和豆包AI用户使用。

## 安装使用指南

### 步骤1：安装篡改猴（Tampermonkey）

首先需要在浏览器中安装篡改猴扩展：

#### Chrome浏览器：
1. 打开Chrome浏览器
2. 访问 [Chrome应用商店](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
3. 点击"添加至Chrome"安装扩展
4. 在弹出的确认窗口中点击"添加扩展程序"

#### Firefox浏览器：
1. 打开Firefox浏览器
2. 访问 [Firefox附加组件](https://addons.mozilla.org/zh-CN/firefox/addon/tampermonkey/)
3. 点击"添加到Firefox"安装扩展

#### Edge浏览器：
1. 打开Edge浏览器
2. 访问 [Microsoft Edge加载项](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)
3. 点击"获取"安装扩展

### 步骤2：安装Doubao Downloader脚本

1. 安装完篡改猴后，访问 [Doubao Downloader GitHub页面](https://github.com/LauZzL/doubao-downloader)
2. 点击页面上的"Install"按钮或访问 [releases页面](https://github.com/LauZzL/doubao-downloader/releases)
3. 下载最新的脚本文件（通常是 `.user.js` 格式）
4. 浏览器会自动识别并弹出安装确认窗口
5. 点击"安装"完成脚本安装

### 步骤3：使用方法

1. **访问豆包AI网站**：打开 [豆包AI官网](https://www.doubao.com/)
2. **登录账号**：使用您的豆包AI账号登录
3. **生成图片**：使用豆包AI生成您需要的图片
4. **批量下载**：
   - 在生成结果页面，脚本会自动注入下载按钮
   - 点击页面上的"批量下载"或"下载全部"按钮
   - 选择下载格式和质量
   - 脚本将自动批量下载所有无水印图片

## 主要功能特性

### 🖼️ 无水印批量下载
- **一键下载**：支持一键下载所有生成的图片，无需逐个保存
- **无水印资源**：下载的是豆包AI生成的原始无水印图片
- **批量处理**：支持同时下载多个图片，提高效率
- **格式选择**：支持多种图片格式下载

### 🔧 技术特性
- **版本自动检查**：基于GitHub releases latest API，自动检查更新
- **本地存储优化**：使用IndexDB代替localStorage，提供更好的存储性能
- **并发下载控制**：使用p-limit库实现并发下载，避免浏览器限制
- **虚拟滚动**：针对大量图片渲染进行优化，提升界面流畅度

### 📊 下载管理
- **进度显示**：实时显示下载进度，让用户了解下载状态
- **下载记录**：记录已下载的图片，避免重复下载
- **错误处理**：智能处理下载失败的情况，提供重试机制

## 版本更新历史

### v1.2.6 (最新版)
- 支持捕获手机端分享的视频链接
- 检测捕获的图片是否包含水印

### v1.2.5
- 修复zipWriter关闭导致压缩包图片损坏及缺失的问题
- 移除zip-stream.ts依赖

### v1.2.3
- 修复按顺序下载不生效的问题

### v1.2.2
- 修复实时生成图片时无法正常获取最新无水印图片的问题
- 优化代码结构，移除不必要的依赖

### v1.2.1
- 修复生成图片时无法实时获取无水印图片的错误

### v1.2.0
- 实现顺序下载选项
- 重新设计use-creations，支持获取会话ID及消息ID

### v1.1.1
- 添加基于GitHub releases latest API的版本检查
- 使用IndexDB代替localStorage，提升存储性能

### v1.1.0
- 新增下载进度展示功能
- 修复下载图片过多时blob超出浏览器限制的问题
- 优化界面交互和用户体验

## 使用场景

1. **内容创作者**：批量下载豆包AI生成的图片用于内容创作
2. **设计师**：获取无水印的AI生成图片用于设计项目
3. **素材收集**：批量收集豆包AI的生成结果用于个人素材库
4. **学习研究**：用于AI图像生成效果的研究和分析

## 技术实现

该工具采用现代前端技术栈开发：
- **基于React**：使用React框架构建用户界面
- 使用JavaScript/TypeScript编写
- 采用模块化设计，便于维护和扩展
- 集成多种优化技术，提升用户体验
- 遵循开源项目的最佳实践

## 支持的浏览器

- ✅ Chrome (推荐)
- ✅ Firefox
- ✅ Edge
- ✅ Safari (部分功能)

## 注意事项

1. **脚本更新**：定期检查脚本更新，确保使用最新版本
2. **网络连接**：确保网络连接稳定，避免下载中断
3. **存储空间**：下载大量图片时注意本地存储空间
4. **使用合规**：请遵守豆包AI的使用条款，仅用于个人学习和研究目的
5. **隐私保护**：脚本仅用于下载功能，不会收集或上传您的个人信息

## 常见问题

### Q: 为什么下载按钮不显示？
A: 请确保您已正确安装篡改猴扩展和Doubao Downloader脚本，然后刷新豆包AI页面。

### Q: 下载的文件在哪里？
A: 文件会自动保存到浏览器的默认下载文件夹中。

### Q: 支持哪些图片格式？
A: 支持PNG、JPG、WebP等多种常见图片格式。

### Q: 遇到下载失败怎么办？
A: 检查网络连接，尝试刷新页面重新下载，或联系项目维护者获取帮助。

## 项目地址

GitHub: [https://github.com/LauZzL/doubao-downloader](https://github.com/LauZzL/doubao-downloader)

---

*本文介绍基于项目GitHub主页和Releases信息整理，重点介绍豆包AI无水印资源批量下载功能*。