---
title: React Native 入门
author: 箫风
date: 2026/01/18 14:00
isTop: true
categories:
 - 开发教程
tags:
 - React Native
 - 移动开发
---

# React Native 入门

<!-- more -->

## 环境搭建

```bash
npm install -g react-native-cli
npx react-native init MyApp
```

## 基本组件

```javascript
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View>
      <Text>Hello React Native</Text>
    </View>
  );
}
```

## 样式

使用 StyleSheet API：

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
```

## 总结

React Native 可以用 JavaScript 开发原生移动应用，是跨平台开发的好选择。
