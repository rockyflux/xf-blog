# Skill 与 MCP 深度对比（一）：Token 占用与设计模式

## 概述

首先，官方文档非常值得细细品味，看完官方文档倒也可以考虑不用看其他的文章了：

[\# Agent Skills](https://code.claude.com/docs/zh-CN/skills)

[\# Agent Skills 概览](https://platform.claude.com/docs/zh-CN/agents-and-tools/agent-skills/overview)

[\# 通过 MCP 将 Claude Code 连接到工具](https://docs.anthropic.com/zh-CN/docs/agents-and-tools/mcp)

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

---

*本部分介绍了 Skill 和 MCP 在 Token 占用和设计模式上的核心差异。下一部分将继续探讨版本管理和最佳实践。*