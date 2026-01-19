---
title: Flutter 开发指南
author: 箫风
date: 2026/01/17 14:00
isTop: false
categories:
 - 开发教程
tags:
 - Flutter
 - 移动开发
---

# Flutter 开发指南

<!-- more -->

## 安装

```bash
flutter create my_app
cd my_app
flutter run
```

## Widget

Flutter 中一切都是 Widget：

```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Text('Hello Flutter'),
        ),
      ),
    );
  }
}
```

## 状态管理

使用 StatefulWidget 管理状态。

## 总结

Flutter 使用 Dart 语言，性能优秀，UI 流畅。
