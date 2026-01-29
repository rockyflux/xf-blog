---
title: Cursor 端到端工作流模板：Rules、Subagents、Skills、MCP（工单与知识库）
author: 箫风
date: 2026/01/22 18:05
isTop: false
categories:
 - 开发教程
tags:
 - Cursor
 - AI编程
 - Agent
 - Subagents
 - Skills
 - MCP
 - 工单
 - 知识库
---

# Cursor 端到端工作流模板：Rules、Subagents、Skills、MCP（工单与知识库）

<!-- more -->

这篇不讲概念对照，直接给你一套**可复制到项目里**的工作流模板（并对齐官方能力边界，避免“看起来能做但实际上不一定配置好了”）：

- 用 **Rules** 固化团队协作约束
- 用 **Subagents** 把“实现/测试/验收/安全审计”拆开并行/串行
- 用 **Skills** 把部署、校验、文档生成做成可执行能力包（注：Skills 目前需 nightly）
- 用 **MCP（工单/知识库类）** 接入 Jira/Confluence（或同类系统），把“交付闭环”同步到系统记录

你可以把它当成一个“Cursor 驱动的交付流水线”。

## 1. 目标：一次需求交付的标准流水线

我建议把一次交付拆为 6 步：

1. **计划**：输出可执行方案（主 agent）
2. **实现**：按计划改代码（主 agent）
3. **测试**：主动跑测试并修复（`test-runner` subagent）
4. **安全审计**：找风险点与硬编码密钥（`security-auditor` subagent，建议 `readonly: true`）
5. **文档**：更新 README / 变更说明 / 复盘模板（`docs-writer` skill）
6. **同步外部系统**：更新工单状态、写入知识库（MCP）

## 2. 你需要放进仓库的文件树（可直接照抄）

> 说明：下面是“目标结构”，你可以按实际项目做增删。

```text
docs/tutorials/blog/（这是你博客文章目录，与项目无关）

.cursor/
  rules/
    00-project-basics.md
    10-testing-policy.md
    20-security-baseline.md
  agents/
    verifier.md
    test-runner.md
    security-auditor.md
  skills/   (nightly 才可用)
    docs-writer/
      SKILL.md
      references/
        DOCS_STYLE.md
    deploy-app/
      SKILL.md
      scripts/
        deploy.sh
        validate.py
      assets/
        config-template.json
```

如果你不想引入 `.cursor/rules/` 的结构化规则，也可以用 `AGENTS.md`（放仓库根目录 + 子目录；官方支持嵌套并自动合并，更具体的指令优先）。

## 3. Rules：最小可用规则集（建议）

Rules 的目标不是“写一部规范圣经”，而是让 Agent 在关键决策点不跑偏。

对齐官方术语，你可以把规则按三种方式组织：

- **Always Apply**：每次对话都注入（`alwaysApply: true`），只放少量硬约束
- **Apply Intelligently**：由 Agent 根据 `description` 判断是否注入（更推荐）
- **Apply to Specific Files**：用 `globs` 只对特定文件范围生效（例如只对 `frontend/**` 生效）

当规则需要引用项目里的长文档或模板时，建议把内容拆成独立文件，并在规则/对话中用 `@filename` 的方式按需包含进上下文。

### 3.1 `00-project-basics`（建议：非 alwaysApply）
内容包含：

- 代码结构边界（业务逻辑/接口层/持久化层分离）
- 变更策略（小步提交、避免大爆炸式重构）
- 输出约束（变更说明必须包含影响范围与回滚方案）

### 3.2 `10-testing-policy`（建议：可以 alwaysApply）
内容包含：

- 何时必须补测试
- 测试命名/目录约定
- 失败处理：先定位根因，再最小修复

### 3.3 `20-security-baseline`（建议：非 alwaysApply）
内容包含：

- 禁止硬编码密钥
- 输入校验与输出编码
- 日志脱敏约定

## 4. Subagents：三类就够用（先别贪多）

### 4.1 verifier：专门做“验收与反证”

用途：解决常见问题——AI 说“完成了”，但功能其实没通。

关键点：

- 让它保持怀疑态度
- 明确要求它：
  - 找到声称完成的点
  - 给出验证步骤
  - 必要时要求运行测试/最小手工验证

### 4.2 test-runner：主动跑测试并修复失败（use proactively）

用途：在出现代码变更后自动拉起测试，并迭代修复。

关键点：

- `description` 里写“Use proactively”
- 强制它“保持测试意图不变”

### 4.3 security-auditor：安全审计（建议 readonly）

用途：在 auth/payments/敏感数据处理、或任何引入外部依赖时做一次审计。

关键点：

- 建议 `readonly: true`
- 输出要按严重程度分级：Critical/High/Medium

## 5. Skills：把“重复流程”做成可复用能力包

> 提醒：Agent Skills 需要 nightly 渠道。

我建议先做两类 skill：

- `docs-writer`：把文档更新标准化
- `deploy-app`：把部署/校验脚本化

### 5.1 docs-writer 的写法建议

- `SKILL.md` 只写“什么时候用 + 输出结构”
- 长的文档规范放 `references/`，让 Agent 需要时再加载

### 5.2 deploy-app 的写法建议

- `scripts/validate.py`：部署前校验（配置、环境、依赖）
- `scripts/deploy.sh`：真正部署动作
- 脚本要：
  - 输出明确错误信息
  - 可重复执行（幂等）
  - 能在失败时给出下一步建议

## 6. MCP（工单/知识库类）：让交付闭环到“系统记录”

本模板里，MCP 的目标不是“替代工程师”，而是把交付闭环自动化：

- **工单系统**：把任务状态、关键结论、风险点沉淀到 Jira/Linear/ClickUp
- **知识库**：把复盘、发布说明、操作手册同步到 Confluence/Notion 类系统

### 6.1 典型接入方式与注意事项
你会遇到两类 MCP server：

- 本地 `stdio`（CLI 启动）
- 远程 `sse/http/https`（托管服务）

工程建议：

- 团队协作系统优先 **OAuth**
- 默认只读；需要写入时再显式开写入工具（最小权限）
- 不要把 token 写进仓库，统一通过环境变量或密钥管理注入

另外，子代理会继承父代理的工具（包括已配置的 MCP 工具）。但内置的某些子代理（例如文档里提到的 `computerUse`）会显式排除 Task 工具；自定义子代理通常会继承父代理的工具集。

### 6.2 你在工作流里怎么用（建议固定 3 个动作）
把 MCP 的使用约束为固定动作，最不容易失控：

1. **开始任务**：把工单切到 In Progress，并写入“计划链接/分支名”
2. **完成实现**：写入“变更摘要 + 风险点 + 回滚方案”
3. **交付完成**：把工单切到 Done，并在知识库创建/更新复盘页（包含测试结果与关键决策）

在落地时，建议把“可写入的 MCP 操作”限制在这三个动作里（而不是让 Agent 任意写 Confluence/Jira），这样更符合团队审计与最小权限原则。

## 7. 一次完整执行脚本（你可以直接照抄到对话里）

下面是一段“对话模板”，目的是让主 agent 主动调度 subagent/skill/mcp（你只需要替换工单链接和项目实际的测试命令即可）：

```text
目标：完成工单 XXX（链接）

约束：
- 遵循项目 Rules
- 变更必须有测试与回滚说明

步骤：
1) 你先给出计划（含文件清单与验证步骤）
2) 实现完成后，启动 /test-runner 跑相关测试并修复失败
3) 再启动 /security-auditor 做一次安全审计（只读）
4) 再启动 /verifier 验收端到端功能是否真的可用
5) 用 docs-writer skill 生成变更说明与知识库更新草稿
6) 通过 MCP：
   - 更新工单状态与结论
   - 更新知识库页面
```

## 8. 常见坑与修正

- Subagents 太多：先从 verifier/test-runner/security-auditor 三个开始
- description 太空：导致永远不会自动委派
- 把所有规则设为 alwaysApply：上下文变噪音，反而变慢
- MCP 默认给写权限：容易误写；团队环境必须最小权限

补充一点务实提醒：Subagent 并行时 token 消耗会随并行数上升，简单任务不一定要拆子代理。

## 9. 下一步建议（团队化）

- 把 `.cursor/agents/` 提交仓库，全员复用
- 把 Rules 拆成“少量强约束 + 多量智能应用”
- MCP 统一由团队维护与审计（尤其是写入能力）
