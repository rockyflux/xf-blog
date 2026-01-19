---
title: Cypress 端到端测试
author: 箫风
date: 2026/01/17 12:00
isTop: false
categories:
 - 开发工具
tags:
 - Cypress
 - 测试
---

# Cypress 端到端测试

<!-- more -->

## 安装

```bash
npm install cypress --save-dev
```

## 编写测试

```javascript
describe('登录测试', () => {
  it('应该成功登录', () => {
    cy.visit('/login')
    cy.get('#username').type('user')
    cy.get('#password').type('pass')
    cy.get('button').click()
    cy.url().should('include', '/dashboard')
  })
})
```

## 运行测试

```bash
npx cypress open
```

## 总结

Cypress 提供了强大的端到端测试能力，是前端测试的重要工具。
