---
title: Cursor Context 工程化对照：Rules、Subagents、Skills、MCP
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
---

# Cursor Context 工程化对照：Rules、Subagents、Skills、MCP

<!-- more -->

把 Cursor 用好，关键不是“把提示词写长”，而是把协作系统工程化：哪些东西应该**持久化**、哪些东西需要**上下文隔离**、哪些东西适合**打包复用**、哪些东西要通过**外部工具/系统**闭环。Cursor 的 Context 体系里，最核心的四块是：

- **Rules**：把团队/项目约束沉淀为长期可管理的指令层
- **Subagents**：把复杂任务拆成可委派、可并行、可恢复的子任务
- **Skills**：把领域知识 + 工作流 + 脚本资源打包成可移植能力
- **MCP**：把 Agent 连接到外部工具与数据源（工单/知识库/DB/云服务等）

本文从“工程化视角”逐一对照这四者的定位、配置入口、适用场景、常见坑与组合策略。

## 1. 一张表先对齐：四件套各解决什么问题

| 能力 | 解决的问题 | 典型产物 | 适合场景 | 主要代价 |
| --- | --- | --- | --- | --- |
| Rules | 让指令“可持续生效、可管理、可共享” | Project/Team/User Rules，AGENTS.md | 代码风格、目录规范、协作约束、输出格式 | 规则写不好会变噪音；Always Apply 过多会增加上下文负担 |
| Subagents | 让任务“可分工、可隔离、可并行、可恢复” | `.cursor/agents/*.md` | 调试/验证/测试/安全审计/并行评估 | token 成本上升，简单任务可能更慢 |
| Skills | 让能力“可移植、可版本化、可执行（脚本）” | `.cursor/skills/<skill>/SKILL.md` + scripts/references/assets | 部署、验收、文档生成、代码检查自动化 | 维护成本，且当前仅 nightly 渠道 |
| MCP | 让 Agent “能用外部工具/访问外部系统” | MCP server 配置（本地或远程） | 工单/知识库同步、DB 查询、云资源管理、扫描工具 | 凭据/权限治理、安全审计与可观测性 |

接下来逐个拆开。

## 2. Rules：把“协作约束”从提示词搬到规则层

### 2.1 三层规则与优先级
Rules 的价值在于**稳定性与一致性**：不用每次对话都重复“请按某某风格、某某目录结构、某某输出格式”。

你需要记住一个优先级：

- **Team Rules → Project Rules → User Rules**

当存在冲突时，靠前的来源优先。

### 2.2 Project Rules：文件化、可版本控制
Project Rules 通常放在项目中（并提交到仓库），适合固化：

- 目录结构与边界（例如：业务逻辑不得写进 UI 层）
- 编码规范（命名、异常处理、日志、测试）
- 输出格式（变更说明模板、PR 描述结构）

Project Rules 的关键是 frontmatter（官方文档中最重要的是“它如何生效”）：

- `description`：用于 **Apply Intelligently** 类型规则。Agent 会读取描述来决定是否把该规则注入当前上下文。
- `alwaysApply`：用于 **Always Apply** 类型规则。
  - `true`：每次对话都会注入
  - `false`：由 Agent 决定是否应用（通常更推荐）

另外，Project Rules 还可以做成“只对特定文件生效”的规则（官方称 **Apply to Specific Files**），通常通过 `globs`（文件匹配模式）来限定生效范围。

**工程化建议**：

- 默认使用 Apply Intelligently（也就是 `alwaysApply: false`），只把真正的“硬约束”设为 Always Apply
- 规则正文尽量短，把长内容拆到独立文件，并在规则里用 `@filename` 的方式按需引入（官方支持用 `@filename.ts` 这类语法把文件内容包含进上下文）

### 2.3 AGENTS.md：更轻量的“项目指令入口”
如果你的需求只是“在根目录放一份清晰的人类可读规则”，AGENTS.md 更轻：

- 纯 Markdown，无复杂元数据
- 支持嵌套：子目录的 AGENTS.md 会与父目录合并，更具体的优先

适合：

- 多栈项目（frontend/backend/components 各自有局部指令）
- 不想引入结构化规则成本的团队

### 2.4 边界与误区

- **Rules 不会影响 Cursor Tab**（规则主要用于 Agent/Chat）
- **User Rules 不会应用到 Inline Edit（Cmd/Ctrl+K）**（官方明确：用户规则只用于 Agent/Chat）
- Team Rules 是由团队/企业在 Dashboard 侧创建与管理的组织级规则，它与 Project Rules 不同：Team Rules 更像“组织层的统一指令”，不走 Project Rules 的文件结构与元数据（例如不支持 `globs`、`alwaysApply` 等 Project Rules 的 frontmatter）
- 旧的 `.cursorrules` 仍可用但趋于废弃，建议迁移到 Project Rules 或 AGENTS.md

### 2.5 Context Commands：把高频操作固化为“/命令”

除了 Rules（长期指令）之外，Cursor 还支持 **Context Commands**：在 Agent 聊天输入框中输入 `/` 会弹出可用命令列表，用于把高频操作固化成“一键触发”的工作流。

官方文档：<https://cursor.com/cn/docs/context/commands>

命令以普通 Markdown 文件的形式定义，可以存放在三个位置：

- **项目命令**：放在项目的 `.cursor/commands` 目录
- **全局命令**：放在主目录下的 `~/.cursor/commands` 目录
- **团队命令**：由团队管理员在 Cursor Dashboard 创建并集中管理（Team / Enterprise 方案），创建后会自动对团队成员可用

创建项目命令的最小步骤（官方说明）：

- 在项目根目录创建 `.cursor/commands/`
- 在该目录中添加若干 `.md` 文件（文件名就是命令名，例如 `review-code.md`）
- 用纯 Markdown 写清楚“这个命令应该执行什么”

参数传递方式：在命令名称之后输入的任何内容，都会与命令内容一起包含进提示词中（例如：`/commit and /pr these changes to address DX-523`）。

## 3. Subagents：把“复杂任务”拆成可委派的可执行单元

Subagents 的关键价值是：

- **上下文隔离**：每个子代理可以在自己的上下文里收集信息、执行任务，避免把主对话搅得很“脏”
- **并行**：复杂任务可以拆开并行跑（但 token 成本会随并行数上升）

### 3.1 存放位置与覆盖规则

- 项目级：`.cursor/agents/`（建议提交仓库）
- 用户级：`~/.cursor/agents/`（你个人所有项目可用）
- 同名冲突：项目级优先

### 3.2 文件格式与关键字段
一个 subagent 是“带 YAML frontmatter 的 Markdown 文件”。常用字段：

- `name`：唯一标识（小写+连字符更稳）
- `description`：决定何时被自动委派，**这是最重要的字段**
- `model`：`fast` / `inherit` / 指定模型 ID
- `readonly: true`：让子代理在受限写入权限下运行（适合审计/评审类）
- `is_background: true`：后台执行，不阻塞主对话

### 3.3 触发方式：自动委派 vs 显式调用

- **自动委派**：靠 `description`，建议写清楚触发条件，并可以使用 “use proactively / always use for” 之类短语引导
- **显式调用**：在对话里用 `/name` 调用（例如 `/verifier`）

### 3.4 并行与恢复

- Subagents 可以并行跑：例如“一个跑测试、一个做安全审计、一个更新文档”
- 长任务可以恢复：拿到 agent id 后继续执行（适合跨多轮对话的工作）
- 后台子代理的输出会写入本机目录（官方示例为 `~/.cursor/subagents/`），父代理可以读取这些文件检查进度

### 3.5 成本模型（务实）

- Subagent 会独立消耗 token；并行数越多，总消耗通常越接近线性增长（并行 5 个时，量级上接近 5 倍，但具体取决于每个子代理的上下文与任务长度）
- 简单任务（改一行配置）通常主 agent 更快
- 复杂任务（多文件变更、需要验证/并行）subagent 更稳、更可控

## 4. Skills：把“领域能力”做成可移植包

Skills 的定位是：把某类任务的“最佳实践 + 脚本 + 参考资料”封装成一个包，让 Agent 在合适的时候调用。

### 4.1 可用性与目录
- Agent Skills 当前在 **nightly 渠道**（写作/团队推广时要明确这点）
- Skills 会从这些目录自动发现：
  - `.cursor/skills/`（项目级）
  - `.claude/skills/`（项目级，兼容 Claude）
  - `~/.cursor/skills/`（用户级）
  - `~/.claude/skills/`（用户级）

### 4.2 Skill 的结构约束
每个 skill 是一个文件夹，必须包含：

- `SKILL.md`

`SKILL.md` 的 frontmatter 至少需要：

- `name`（必须与父文件夹名一致；只允许小写/数字/连字符）
- `description`（写清楚“何时用”）

### 4.3 可选目录：scripts / references / assets

- `scripts/`：可执行脚本（bash/python/node 等）
- `references/`：按需加载的补充文档（规范/流程/模板）
- `assets/`：配置模板、图片、数据文件

**工程化建议**：

- 主 `SKILL.md` 保持短，把长内容放 `references/`，让 Agent 按需加载
- 脚本要自包含、错误信息清晰、能优雅失败（便于 Agent 做重试与诊断）

### 4.4 Skills 与 Rules 的关系
在 Cursor 里，Skills 会出现在 Rules 相关设置里，并且作为“由 Agent 决定是否应用（Agent Decides）”的形态出现。官方也强调：Skills 不能配置为“始终应用（always apply）”或“手动（manual）”规则。

另外，官方提供了从 GitHub 导入（Remote Rule / GitHub）的方式把外部规则/技能同步到项目里：适合团队共享与版本迭代。

## 5. MCP：把 Agent 连接到外部系统（工具与数据）

如果说 Rules/Subagents/Skills 主要解决“对话内与代码库内”的问题，那么 MCP 解决的是：让 Cursor 能通过标准协议连接外部工具与数据源，把 Agent 的能力从“写代码”扩展到“与系统交互”。

- 工单系统（Jira/Linear/ClickUp）
- 知识库（Confluence/Notion 类）
- 代码托管与流水线（GitHub/GitLab/CI/CD）
- 安全/扫描（Semgrep/Snyk/SonarQube）

### 5.1 常见部署形态与传输方式
文档里能看到多种 transport：

- `stdio`：本地启动一个进程作为 MCP server
- `sse` / `http` / `https` / `streamable-http`：远程 MCP server

工程化选型建议：

- 个人使用：优先 `stdio` 或可信的托管服务
- 团队使用：优先可审计、可统一管理的远程服务 + OAuth

### 5.2 鉴权与安全底线
MCP 的最大风险点是“让 Agent 能够对外部系统做真实动作”。建议默认遵循：

- 不要在仓库里硬编码任何 token
- 优先 OAuth，其次环境变量注入的 API Key
- 能只读就只读（尤其是知识库/工单系统）

### 5.3 什么时候该用 MCP、什么时候不该用

- 需要读取/写入外部系统状态（创建工单、更新页面、查部署状态）→ MCP
- 只是要“按模板生成文本”→ Rules/Skills 更合适
- 需要强隔离审计逻辑 → 用 subagent（必要时 readonly），而不是把所有能力都塞给主 agent

## 6. 组合策略：四件套如何协同

一个可复用的组合套路：

- **Rules**：约束输入（风格、目录、测试策略、输出格式）
- **Subagents**：拆分执行与验证（实现/测试/审计/验收）
- **Skills**：沉淀可执行工作流（脚本化、模板化、按需加载资料）
- **MCP**：与外部系统同步（工单/知识库/扫描平台）

例如“修复一个线上 Bug 并更新 Confluence 复盘页”的流程：

- 主 agent 做实现
- `test-runner` subagent 跑测试与修复失败
- `verifier` subagent 验收
- `docs-writer` skill 生成复盘模板
- MCP 更新 Confluence 页面、把 Jira 工单状态从 In Progress → Done

## 7. 反模式清单（建议贴到团队规范里）

- Rules：把所有东西都设成 alwaysApply（上下文污染 + token 浪费）
- Subagents：创建几十个“泛用 helper”，description 模糊导致永远不会触发
- Skills：把长文档都塞进 SKILL.md，导致每次调用都很重
- MCP：默认给写权限、默认用高权限 token（安全风险极高）

## 8. 下一步：把“工程化对照”落地为一套模板

如果你希望“直接抄一套配置”，下一篇文章会给一套端到端工作流模板：

- Rules 管约束
- Subagents 管分工与验收
- Skills 管脚本化与文档化
- MCP 接入工单/知识库（你选的 B 类）
