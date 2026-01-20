# Skill 与 MCP 深度对比

首先，官方文档非常值得细细品味，看完官方文档倒也可以考虑不用看其他的文章了（针对 skill，mcp 这一块感觉描述一般，mcp 太多东西了）：

[\# Agent Skills](https://code.claude.com/docs/zh-CN/skills)

[\# Agent Skills 概览](https://platform.claude.com/docs/zh-CN/agents-and-tools/agent-skills/overview)

\# 通过 MCP 将 Claude Code 连接到工具

---

## 一、Token 占用对比

### 1.1 MCP：全量加载模式

MCP 在会话启动时**全量加载**所有工具定义到上下文：

```plaintext
会话启动 → 加载所有 MCP 服务器 → 注入全部工具定义（JSON-Schema）
```

**就拿我使用的 mcp 来说**：

| **MCP 服务器** | **工具数** | **Token 占用** |
| --- | --- | --- |
| auggie-mcp | 1 | ~1k |
| grok-search | 5 | ~3k |
| memory | 9 | ~5k |
| sequential-thinking | 1 | ~2k |
| **多服务器叠加** | \- | **轻松突破 10k+** |

随便用几个占用就非常大了

### 1.2 Skill：按需加载模式

Skill 采用**渐进式披露**，仅在需要时加载：

| **阶段** | **加载内容** | **Token 占用** |
| --- | --- | --- |
| 启动时 | 仅 `name` + `description` 索引 | ~10-100 tokens/skill |
| 触发时 | 完整 `SKILL.md` 内容 | ~1,000-5,000 tokens/skill |

**我使用的 skill**：90K 的 Skills 目录，`/context` 仅显示 **513 tokens**，和 mcp 对比起来，非常直观。

### 1.3 简单对比

| **维度** | **MCP** | **Skill** |
| --- | --- | --- |
| 启动时占用 | 全量（10k+ tokens） | 索引（~500 tokens） |
| 触发时占用 | 无额外占用 | 按需加载（1k-5k tokens） |
| 总 Token 效率 | ❌ 高占用 | ✅ 高效 |
| 适用场景 | 小规模工具集成 | 大规模工具生态 |

## 二、设计模式对比

### 2.1 MCP：全量注入 + JSON-Schema

#### 什么是 MCP？

MCP (Model Context Protocol) 是 Anthropic 推出的标准化协议，允许 AI 模型与外部工具安全交互。MCP 的核心思想是将外部工具抽象为标准化接口，通过 JSON-RPC 2.0 协议进行通信。

#### MCP Server 目录结构（这里以 Python 为例）

```
mcp-server/
├── pyproject.toml
├── src/
│   └── mcp_server/
│       ├── __init__.py
│       ├── server.py
│       └── tools/
│           ├── __init__.py
│           ├── tool1.py
│           └── tool2.py
```

#### Tool 定义示例

```python
from mcp import Tool
from typing import Any, Dict

@server.tool()
async def search_web(query: str) -> Dict[str, Any]:
    """
    Search the web for information.

    Args:
        query: The search query string

    Returns:
        Dict containing search results
    """
    # Tool implementation
    return {"results": [...]}
```

#### 客户端配置结构（mcpServers）

```json
{
  "mcpServers": {
    "web-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "your-api-key"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/tmp"]
    }
  }
}
```

### 2.2 Skill：渐进式披露 + Markdown

#### 什么是 Skill？

Skill 是 Claude Code 的扩展机制，允许开发者创建可重用的工具和知识库。Skill 使用 Markdown 格式定义，采用渐进式披露的设计理念。

#### Skill 目录结构（双层架构）

```
.claude/
├── skills/
│   ├── search.skill/
│   │   ├── SKILL.md
│   │   └── implementation.js (optional)
│   └── coding.skill/
│       ├── SKILL.md
│       └── utils/
│           └── helpers.js
```

#### 核心设计原则

1. **渐进式披露**：只在需要时显示详细信息
2. **Markdown 优先**：使用人类可读的格式
3. **模块化设计**：每个 Skill 独立封装
4. **版本控制友好**：基于文件系统的版本管理

#### 渐进式披露模式

```markdown
# Skill Name

Brief description of what this skill does.

## Usage

How to use this skill with examples.

## Advanced Features

Detailed documentation for advanced users.
```

## 三、版本管理与更新便利性

**结论先行**：MCP 在版本管理上**绝对优于** Skill。

### 3.1 MCP：成熟的包管理生态

#### 核心机制

MCP 直接复用 npm/PyPI 成熟生态，版本管理由包管理器自动处理。

**工作原理**：

MCP 服务器以 npm 包（js/ts）或 PyPI 包（Python）形式发布

使用 `npx` 或 `uvx` 命令启动时，包管理器会自动处理下载和缓存

版本号定义在 `package.json`（npm）或 `pyproject.toml`（PyPI）中

**更新行为**：

| **模式** | **行为** | **启动速度** | **适用场景** |
| --- | --- | --- | --- |
| **默认** | 使用本地缓存，不查询 registry | 快 | 日常使用 |
| **强制更新** | 每次查询 registry，版本变化时才下载（`@latest` 或 `--refresh`） | 慢 | 需要最新版本时 |

**获取方式对比**：

| **获取方式** | **配置示例** | **更新机制** |
| --- | --- | --- |
| **npx (npm)** | `npx -y @pkg/server` | 默认用缓存，需 `@latest` 或清缓存强制更新 |
| **uvx (pip)** | `uvx mcp-server-fetch` | 默认用缓存，需 `--refresh` 或清缓存强制更新 |
| **本地命令** | `auggie --mcp` | 需手动 `pip install --upgrade` |

**配置示例**：

```json
// ~/.claude.json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}
```

#### 如何更新

**推荐方式：手动清理缓存**

当 MCP 服务器有新版本时，清理缓存即可：

```bash
# 清理 npx 缓存 (Linux/Mac)
rm -rf ~/.npm/_npx

# 清理 uvx 缓存
uv cache clean
```

**工作流程**：
1. 清理缓存
2. 重启 Claude Code
3. 自动下载最新版本

**优点**：日常启动快，需要更新时才清理缓存

### 3.2 Skill：普遍缺乏版本管理

#### 现状：一般来说 Skill 没有版本管理

与 MCP 不同，**一般来说 Skill 没有任何版本管理机制**：

- 没有版本号定义
- 没有版本锁定
- 手动管理

Skill 在某些时候更像可以随意定制的小玩具，在原本的基础上又能随意修改

**Skill 的获取与更新方式**：

| **获取方式** | **更新方式** | **版本控制** |
| --- | --- | --- |
| GitHub 克隆 | `git pull` 手动更新 | 依赖 Git commit hash |
| 下载 ZIP 文件 | 手动替换文件 | **无** |
| CC 直接生成 | 即时生效 | **无** |

**问题**：
- 用户不知道 Skill 是否有新版本
- 无法回滚到特定版本（除非使用 Git）

#### 例外：官方 Marketplace（需登录）

**唯一的版本管理方案**是官方 Marketplace，但有严格限制：

**必须登录**：API Key 用户无法使用

**非标准化**：没有强制的版本号格式

**Marketplace 版本管理示例**：

```json
// marketplace.json
{
  "name": "my-plugins",
  "plugins": [
    {
      "name": "review-plugin",
      "source": "./plugins/review-plugin",
      "version": "2.1.0"  // ← 需要手动维护
    }
  ]
}
```

#### Skill 的独特优势

尽管缺乏版本管理，Skill 还有一个 MCP 无法比拟的优势：

**即时生效**：修改 Skill 文件后无需重启服务，下次触发时自动加载最新内容。

**对比 MCP**：
- **MCP**：修改后需重启 Claude Code 才能生效
- **Skill**：适合快速迭代和调试，改完即用

**适用场景**：
- 个人定制化 Skill（频繁调整）
- 快速原型验证

## 四、推荐使用模式：Skill + Command 组合

### 4.1 Skill 的触发不确定性问题

Skill 依赖 Claude **自动匹配描述**，存在以下问题：

- 该触发时未触发（描述不够精准）
- 不该触发时误触发（描述过于宽泛）

**实际体验**：虽然 Skill 理论上能够自动触发，但实际触发率较低。

**解决方案**：使用 Command 可以 **100% 稳定触发**。

### 4.2 最佳实践：Skill + Command 工作流组合

**为什么需要 Command**：

Skill 可能包含复杂的命令调用和参数配置，这些细节难以通过自然语言稳定触发。例如：
- 外部工具调用：`/home/nobug/.claude/bin/codeagent-wrapper --backend gemini`
- 带参数的指令：`--backend codex`、`--SESSION_ID xxx`
- 多阶段工作流：需要按特定顺序执行多个步骤

这些精确的指令和参数通过语言描述很难稳定触发，而 Command 可以将这些细节明确定义在文件中。

**模式 1 示例**（简单流程）：

```plaintext
场景：应用主题到 Artifact

├── ~/.claude/skills/theme-factory/
│   └── SKILL.md                    # 主题定义、应用指南
└── ~/.claude/commands/
    └── theme-factory.md            # 内容："Execute the theme-factory skill"

用户输入 /theme-factory 应用深色主题
    ↓
Command 触发 → Claude 加载 SKILL.md → 自主执行
```

**模式 2 示例**（复杂流程）：

```plaintext
场景：前端专项开发

└── ~/.claude/commands/ccg/
    └── frontend.md                 # 完整工作流定义

用户输入 /ccg:frontend 实现响应式导航栏
    ↓
Claude 加载 frontend.md 内容
    ↓
按照 Command 中定义的 6 个阶段执行：
  1. Prompt 增强（可选）
  2. 研究（代码检索）
  3. 构思（调用 Gemini 分析）
  4. 计划（调用 Gemini 规划）
  5. 执行（Claude 实施）
  6. 优化（调用 Gemini 审查）
```

**核心原则**：

1. **稳定性优先**：复杂流程用 Command 定义，确保稳定执行
2. **外部工具必须用 Command**：Skill 无法执行外部命令
3. **简单场景用 Skill**：减少维护成本，提高灵活性