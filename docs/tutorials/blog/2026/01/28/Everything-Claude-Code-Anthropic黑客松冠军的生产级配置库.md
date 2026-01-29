---
title: Everything Claude Code：Anthropic黑客松冠军的生产级配置库
author: 箫风
date: 2026/01/28 10:00
isTop: false
categories:
 - 开发教程
tags:
 - Claude Code
 - AI编程
 - Agent
 - Skills
 - Rules
 - MCP
 - 配置库
---

# Everything Claude Code：Anthropic黑客松冠军的生产级配置库

<!-- more -->

**Everything Claude Code** 是一个来自 Anthropic 黑客松冠军的完整 Claude Code 配置集合。这个项目提供了生产级的 Agents、Skills、Commands、Rules、MCP 配置和 Hooks，经过 10+ 个月的密集日常使用，在构建真实产品中不断演进和优化。

复用这套配置，可以快速搭建起一套高水平的 AI 辅助编程环境，提供从 TDD（测试驱动开发）到代码审查的完整自动化流程，通过配置文件强制 AI 遵守团队代码规范，大幅降低 Review 的人工成本。

## 项目背景

这个配置库的作者在 2025 年 9 月赢得了 Anthropic x Forum Ventures 黑客松，使用 Claude Code 构建了 [zenith.chat](https://zenith.chat)。这些配置在多个生产应用中经过实战检验，是真正可用的生产级配置。

**GitHub 仓库**: [https://github.com/affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code)

**项目亮点**:
- ⭐ 32,724+ stars
- 🍴 4k+ forks
- 完整的生产级配置
- 跨平台支持（Windows、macOS、Linux）
- 详细的文档和指南

## 核心模块解析

### 1. Agents（专项智能体）

Agents 是专门处理特定任务的子代理，通过任务委派避免单一大模型处理复杂任务时的能力退化。

**主要 Agents**:

- **planner**：负责需求拆解和功能实现规划
- **architect**：负责系统设计决策
- **tdd-guide**：测试驱动开发指导
- **code-reviewer**：代码质量和可维护性审查
- **security-reviewer**：专注漏洞分析和安全审计
- **build-error-resolver**：构建错误自动解决
- **e2e-runner**：Playwright E2E 测试执行
- **refactor-cleaner**：死代码清理
- **doc-updater**：文档同步更新
- **go-reviewer**：Go 代码审查（新增）
- **go-build-resolver**：Go 构建错误解决（新增）

**使用示例**:

```markdown
---
name: code-reviewer
description: Reviews code for quality, security, and maintainability
tools: ["Read", "Grep", "Glob", "Bash"]
model: opus
---

You are a senior code reviewer...
```

### 2. Skills（技能/知识库）

Skills 是外挂的领域知识，包含最佳实践、工作流和脚本资源，让 AI 生成的代码符合特定技术栈的最佳实践。

**主要 Skills**:

- **coding-standards**：语言最佳实践
- **backend-patterns**：API、数据库、缓存模式
- **frontend-patterns**：React、Next.js 模式
- **continuous-learning**：从会话中自动提取模式
- **continuous-learning-v2**：基于直觉的学习系统（带置信度评分）
- **iterative-retrieval**：子代理的渐进式上下文细化
- **strategic-compact**：手动压缩建议
- **tdd-workflow**：TDD 方法论
- **security-review**：安全检查清单
- **eval-harness**：验证循环评估
- **verification-loop**：持续验证
- **golang-patterns**：Go 语言惯用法和最佳实践（新增）
- **golang-testing**：Go 测试模式、TDD、基准测试（新增）

**Skills 结构**:

```
skills/
  backend-patterns/
    SKILL.md              # 主技能定义
    references/           # 补充文档
    scripts/              # 可执行脚本
    assets/               # 配置模板、图片等
```

### 3. Commands（快捷指令）

Commands 将复杂 Prompt 封装为 Slash 命令，通过简单的命令触发复杂的工作流。

**主要 Commands**:

- **/tdd**：测试驱动开发流程
- **/plan**：实现规划
- **/e2e**：E2E 测试生成
- **/code-review**：代码质量审查
- **/build-fix**：修复构建错误
- **/refactor-clean**：死代码移除
- **/learn**：从会话中提取模式
- **/checkpoint**：保存验证状态
- **/verify**：运行验证循环
- **/setup-pm**：配置包管理器
- **/go-review**：Go 代码审查（新增）
- **/go-test**：Go TDD 工作流（新增）
- **/go-build**：修复 Go 构建错误（新增）
- **/skill-create**：从 git 历史生成技能（新增）
- **/instinct-status**：查看已学习的直觉（新增）
- **/instinct-import**：导入直觉（新增）
- **/instinct-export**：导出直觉（新增）
- **/evolve**：将相关直觉聚类为技能（新增）

**使用示例**:

```bash
# 启动 TDD 工作流
/tdd

# 进行代码审查
/code-review

# 清理死代码
/refactor-clean
```

### 4. Rules（核心准则）

Rules 是 AI 必须遵守的"宪法"，确保输出质量底线。

**主要 Rules**:

- **security.md**：禁止硬编码密钥、强制安全检查
- **coding-style.md**：不可变性、文件组织规范
- **testing.md**：TDD、80% 覆盖率要求
- **git-workflow.md**：提交信息格式、PR 流程规范
- **agents.md**：何时委派给子代理
- **performance.md**：模型选择、上下文管理

**Rules 存放位置**:

```bash
# 用户级规则（应用到所有项目）
~/.claude/rules/

# 项目级规则（仅当前项目）
.claude/rules/
```

**规则优先级**:

- Team Rules → Project Rules → User Rules

### 5. MCP Configs（工具集成）

MCP Configs 预设了常用开发工具的 MCP 连接配置，打通 IDE 与外部服务的连接。

**预设的 MCP 服务器**:

- GitHub：代码托管和 CI/CD
- Supabase：数据库和后端服务
- Vercel：前端部署
- Railway：应用部署
- 其他常用服务

**配置示例**:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_TOKEN_HERE"
      }
    }
  }
}
```

**重要提示**：不要同时启用所有 MCP。200k 的上下文窗口可能会因为工具过多而缩减到 70k。

**最佳实践**:
- 配置 20-30 个 MCP 服务器
- 每个项目保持启用少于 10 个
- 活动工具总数少于 80 个

### 6. Hooks（自动化钩子）

Hooks 是基于事件触发的自动化脚本，在特定事件发生时自动执行。

**主要 Hooks**:

- **PreToolUse**：工具使用前触发
- **PostToolUse**：工具使用后触发
- **Stop**：会话停止时触发
- **memory-persistence**：会话生命周期钩子（保存/加载上下文）
- **strategic-compact**：压缩建议

**Hook 示例**（检查 console.log 残留）:

```json
{
  "matcher": "tool == \"Edit\" && tool_input.file_path matches \"\\\\.(ts|tsx|js|jsx)$\"",
  "hooks": [{
    "type": "command",
    "command": "#!/bin/bash\ngrep -n 'console\\.log' \"$file_path\" && echo '[Hook] Remove console.log' >&2"
  }]
}
```

## 安装方式

### 方式一：作为插件安装（推荐）

最简单的使用方式，直接安装为 Claude Code 插件：

```bash
# 添加市场
/plugin marketplace add affaan-m/everything-claude-code

# 安装插件
/plugin install everything-claude-code@everything-claude-code
```

或者在 `~/.claude/settings.json` 中直接配置：

```json
{
  "extraKnownMarketplaces": {
    "everything-claude-code": {
      "source": {
        "source": "github",
        "repo": "affaan-m/everything-claude-code"
      }
    }
  },
  "enabledPlugins": {
    "everything-claude-code@everything-claude-code": true
  }
}
```

**注意**：Claude Code 插件系统不支持通过插件分发 `rules`（上游限制），需要手动安装规则：

```bash
# 先克隆仓库
git clone https://github.com/affaan-m/everything-claude-code.git

# 选项 A：用户级规则（应用到所有项目）
cp -r everything-claude-code/rules/* ~/.claude/rules/

# 选项 B：项目级规则（仅当前项目）
mkdir -p .claude/rules
cp -r everything-claude-code/rules/* .claude/rules/
```

### 方式二：手动安装

如果希望手动控制安装内容：

```bash
# 克隆仓库
git clone https://github.com/affaan-m/everything-claude-code.git

# 复制 agents
cp everything-claude-code/agents/*.md ~/.claude/agents/

# 复制 rules
cp everything-claude-code/rules/*.md ~/.claude/rules/

# 复制 commands
cp everything-claude-code/commands/*.md ~/.claude/commands/

# 复制 skills
cp -r everything-claude-code/skills/* ~/.claude/skills/
```

**添加 Hooks**：将 `hooks/hooks.json` 中的内容复制到 `~/.claude/settings.json`。

**配置 MCP**：将所需的 MCP 服务器从 `mcp-configs/mcp-servers.json` 复制到 `~/.claude.json`。

**重要**：替换 `YOUR_*_HERE` 占位符为实际的 API 密钥。

## 跨平台支持

该插件现在完全支持 Windows、macOS 和 Linux。所有 hooks 和脚本都已用 Node.js 重写，以确保最大兼容性。

### 包管理器自动检测

插件会自动检测首选的包管理器（npm、pnpm、yarn 或 bun），优先级如下：

1. 环境变量：`CLAUDE_PACKAGE_MANAGER`
2. 项目配置：`.claude/package-manager.json`
3. package.json：`packageManager` 字段
4. 锁文件：从 package-lock.json、yarn.lock、pnpm-lock.yaml 或 bun.lockb 检测
5. 全局配置：`~/.claude/package-manager.json`
6. 回退：第一个可用的包管理器

设置首选包管理器：

```bash
# 通过环境变量
export CLAUDE_PACKAGE_MANAGER=pnpm

# 通过全局配置
node scripts/setup-package-manager.js --global pnpm

# 通过项目配置
node scripts/setup-package-manager.js --project bun

# 检测当前设置
node scripts/setup-package-manager.js --detect
```

或在 Claude Code 中使用 `/setup-pm` 命令。

## 生态系统工具

### Skill Creator（技能创建器）

两种方式从仓库生成 Claude Code 技能：

#### 选项 A：本地分析（内置）

使用 `/skill-create` 命令进行本地分析，无需外部服务：

```bash
/skill-create                    # 分析当前仓库
/skill-create --instincts        # 同时为 continuous-learning 生成直觉
```

这会分析你的 git 历史并在本地生成 SKILL.md 文件。

#### 选项 B：GitHub App（高级）

适用于高级功能（10k+ 提交、自动 PR、团队共享）：

[安装 GitHub App](https://github.com/apps/skill-creator) | [ecc.tools](https://ecc.tools)

```bash
# 在任何 issue 上评论：
/skill-creator analyze

# 或在推送到默认分支时自动触发
```

两种选项都会创建：

- SKILL.md 文件：可直接使用的 Claude Code 技能
- 直觉集合：用于 continuous-learning-v2
- 模式提取：从提交历史中学习

### Continuous Learning v2

基于直觉的学习系统自动学习你的模式：

```bash
/instinct-status        # 显示已学习的直觉及置信度
/instinct-import        # 从他人导入直觉
/instinct-export        # 导出你的直觉用于共享
/evolve                 # 将相关直觉聚类为技能
```

详见 `skills/continuous-learning-v2/` 的完整文档。

## 使用建议

### 1. 从基础开始

不要一次性启用所有功能，建议：

1. **先安装 Rules**：建立代码规范和安全基线
2. **添加常用 Commands**：如 `/tdd`、`/code-review`
3. **配置必要的 Agents**：如 `code-reviewer`、`security-reviewer`
4. **逐步添加 Skills**：根据项目技术栈选择
5. **最后配置 MCP**：只启用实际需要的服务

### 2. 自定义配置

这些配置适用于作者的工作流，你应该：

- 从与你产生共鸣的部分开始
- 根据你的技术栈进行修改
- 删除你不使用的部分
- 添加你自己的模式

### 3. 上下文窗口管理

**关键**：不要同时启用所有 MCP。200k 的上下文窗口可能会因为工具过多而缩减到 70k。

经验法则：

- 配置 20-30 个 MCP 服务器
- 每个项目保持启用少于 10 个
- 活动工具总数少于 80 个

在项目配置中使用 `disabledMcpServers` 来禁用未使用的服务器。

## 测试套件

插件包含完整的测试套件：

```bash
# 运行所有测试
node tests/run-all.js

# 运行单个测试文件
node tests/lib/utils.test.js
node tests/lib/package-manager.test.js
node tests/hooks/hooks.test.js
```

## 文档资源

项目提供了两份详细的指南：

- **Shorthand Guide（速查指南）**：设置、基础、理念。先读这个。
- **Longform Guide（详细指南）**：Token 优化、内存持久化、评估、并行化。

**主题覆盖**：

- **Token 优化**：模型选择、系统提示词精简、后台进程
- **内存持久化**：自动保存/加载跨会话上下文的 Hooks
- **持续学习**：自动从会话中提取模式到可重用技能
- **验证循环**：检查点 vs 持续评估、评分器类型、pass@k 指标
- **并行化**：Git worktrees、级联方法、何时扩展实例
- **子代理编排**：上下文问题、迭代检索模式

## 贡献指南

欢迎并鼓励贡献！

如果你有：

- 有用的 agents 或 skills
- 巧妙的 hooks
- 更好的 MCP 配置
- 改进的 rules

请贡献！查看 [CONTRIBUTING.md](https://github.com/affaan-m/everything-claude-code/blob/main/CONTRIBUTING.md) 了解指南。

### 贡献想法

- 语言特定技能（Python、Rust 模式）- Go 现已包含！
- 框架特定配置（Django、Rails、Laravel）
- DevOps agents（Kubernetes、Terraform、AWS）
- 测试策略（不同框架）
- 领域特定知识（ML、数据工程、移动开发）

## 延伸阅读：本周 Agent / AI 编程精选

下面几篇文章与本文的主题（Rules / Skills / Agents / MCP / 验证闭环）高度相关，适合在你搭建自己的“生产级配置库”时作为参考。

### 1) FastRender：用数千个并行智能体“造浏览器”

- **看点**：FastRender 是 Cursor 的研究项目，峰值阶段同时跑到约 2000 个智能体、每小时数千次提交，用浏览器渲染引擎这个“高复杂度但规范明确”的目标来验证多智能体协作方法。
- **可复用启示**：
  - 规划层要把工作拆成**低冲突任务块**，否则并行会被合并冲突吞噬。
  - “长跑自治”靠**反馈回路**：编译/测试/截图对比（golden sample）都可以是自动验收信号。
  - 在极高吞吐下，“允许短暂错误、快速修复”往往比“每次提交都绝对正确”更务实。
- **来源**：[Simon Willison：Wilson Lin on FastRender](https://simonwillison.net/2026/Jan/23/fastrender/)

### 2) Kimi K2.5：原生多模态 + Agent 集群

- **看点**：K2.5 强化了视觉理解与代码能力，并引入“Agent 集群”机制：动态生成多个子 Agent 并行分工，支撑长步骤复杂任务。
- **可复用启示**：
  - 能拆解的任务，优先走“并行 + 验收”而不是把上下文堆给单一模型。
  - 截图/录屏类视觉输入对于“复现 UI/交互”的工程任务非常关键（这类任务天然需要文本 + 视觉 + 工具的组合闭环）。
- **来源**：[IT之家：Kimi K2.5 发布并开源](https://www.ithome.com/0/916/842.htm)

### 3) Ralph Loop：把 AI 放进“外部控制”的无限迭代循环

- **看点**：用极简的外部循环（不断重读目标/Spec → 调用工具执行 → 再评估）对抗“模型自我评估不可靠”和“长任务上下文腐烂”。
- **可复用启示**：
  - 与其把 prompt 写得越来越长，不如把“期望终局状态”写进**可版本化的 Spec 文件**，让模型每轮都朝同一个目标收敛。
  - 必须防 “Overbaking（烤糊）”：要有检查点/止损规则（例如迭代次数上限、通过测试才允许继续、变更量阈值等）。
- **来源**：[53AI：从“手搓 Prompt”到“无限循环”：Ralph](https://www.53ai.com/news/tishicijiqiao/2026012129160.html)

### 4) Agent + 工程融合：MCP 落地的“边界感”

- **看点**：用真实业务场景说明“Agent 不该替代工程，而应与工程分工”：让 Agent 做语义/策略/不确定性的部分，让工程做确定性/高准确率/可控性部分；并分享了 MCP（含 StreamableHTTP）的工程落地要点。
- **可复用启示**：
  - 工具调用的价值不在“能调用”，而在“用统一协议把工具生态接进来，并把风险/权限/重试策略工程化”。
  - 把任务先用工程拆小，让 Agent 只负责“它擅长的那一刀”，通常能显著提升稳定性与成本效率。
- **来源**：[CSDN 转载：AI Agent 工程化融合（原文来自公众号）](https://blog.csdn.net/Taobaojishu/article/details/151088221)

## 总结

Everything Claude Code 是一个经过实战检验的生产级配置库，提供了：

✅ **完整的自动化流程**：从 TDD 到代码审查  
✅ **模块化设计**：Agents、Skills、Commands、Rules、MCP、Hooks  
✅ **跨平台支持**：Windows、macOS、Linux  
✅ **详细文档**：速查指南和详细指南  
✅ **持续更新**：社区驱动，不断改进  

通过复用这套配置，你可以快速搭建起一套高水平的 AI 辅助编程环境，大幅提升开发效率和代码质量。

**相关链接**：

- [GitHub 仓库](https://github.com/affaan-m/everything-claude-code)
- [Shorthand Guide](https://x.com/affaanmustafa/status/2012378465664745795)
- [Longform Guide](https://x.com/affaanmustafa/status/2014040193557471352)
- [作者 Twitter](https://x.com/affaanmustafa)
- [zenith.chat](https://zenith.chat)

---

*如果这篇文章对你有帮助，请给项目一个 Star ⭐，阅读两份指南，构建一些伟大的东西！*
