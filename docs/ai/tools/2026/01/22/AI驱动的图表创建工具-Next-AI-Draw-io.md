---
title: AI驱动的图表创建工具 - 对话、绘制、可视化
author: 箫风
date: 2026/01/22 14:56
isTop: false
categories:
 - AI相关
tags:
 - AI
 - 工具
 - 图表
 - 可视化
 - draw.io
 - MCP
---

# AI驱动的图表创建工具 - 对话、绘制、可视化

<!-- more -->

平时画架构图、流程图、概念图时，真正耗时间的往往不是“画”，而是不断沟通需求、对齐概念、反复改动。

Next AI Draw.io 的思路很直接：把 draw.io 图表抽象成可编辑的 XML，让大模型通过对话生成/修改这份 XML，从而把“说清楚”变成“画出来”，并且还能继续通过聊天迭代。

项目链接：

https://github.com/DayuanJiang/next-ai-draw-io/blob/main/docs/cn/README_CN.md

## 它是什么

Next AI Draw.io 是一个基于 Next.js 的 AI 图表应用：

- 你用自然语言描述想要的图表（或让它修改现有图表）
- 应用把 AI 输出转成 draw.io 可渲染的图表 XML
- 你可以继续对话迭代，查看历史版本，随时回滚

如果你把它当成“AI + draw.io 的交互式前端”，就很好理解了：对话是输入，draw.io 图表是输出，中间是可追踪、可回放的修改过程。

## 核心能力：对话、绘制、可视化

### 1) 对话式创建与编辑（LLM 驱动 draw.io）

核心体验是“对话驱动编辑”：

- 从零生成图表（流程图、架构图、示意图）
- 对现有图表做局部修改（补节点、改连接、调整布局/文案）
- 在多轮对话里逐步收敛复杂图

图表以 XML 表示，可在 draw.io 中渲染；AI 负责生成或修改 XML。

### 2) 基于图像/图表的复刻与增强

它支持上传现有图表或图像，让 AI 自动“照着画”，并在复刻基础上进一步增强（例如补缺失组件、统一命名、调整布局）。

### 3) 从 PDF / 文本生成图表

你也可以上传 PDF 或文本文件，让 AI 提取内容后生成图表。这对“把文档结构化成图”特别有用，比如：产品方案、技术方案、论文/报告等。

### 4) 推理过程显示 + 历史版本

对于支持的模型（文档中举例 OpenAI o1/o3、Gemini、Claude 等），可以查看 AI 思考过程。

同时它内置图表历史记录，支持版本回溯：

- 跟踪每次 AI 编辑前后的变化
- 一键恢复到某个历史版本

### 5) 云架构图与动画连接器

项目对云架构图场景做了专门支持：

- AWS / GCP / Azure 架构图
- 支持“动画连接器”，用动态效果强化链路表达

## 示例提示词（可直接复制）

下面这些提示词来自项目文档的示例，你可以直接作为起手式：

- 给我一个带有动画连接器的 Transformer 架构图。
- 使用 GCP 图标生成一个 GCP 架构图。在这个图中，用户连接到托管在实例上的前端。
- 使用 AWS 图标生成一个 AWS 架构图。在这个图中，用户连接到托管在实例上的前端。
- 使用 Azure 图标生成一个 Azure 架构图。在这个图中，用户连接到托管在实例上的前端。
- 给我画一只可爱的猫。

建议用法：先让它生成“粗图”，然后用 3-5 轮对话做“图的增量改动”，例如：

- 把组件命名统一为团队内部术语
- 把关键链路加粗/改颜色
- 补充观测性（日志/指标/追踪）或安全边界（WAF/VPC/鉴权）
- 拆分成多张图（Overview + Data Flow + Failure Handling）

## 快速开始

### 在线试用

官方提供了演示站点，适合快速体验：

https://next-ai-drawio.jiang.jp/

中文预览地址：

https://next-ai-drawio.jiang.jp/zh

文档提到可以使用自己的 API Key 绕过演示站点用量限制：

- 在聊天面板的设置中配置 Provider 和 API Key
- Key 仅保存在浏览器本地，不会被存储在服务器上

### 桌面应用

如果你希望离线/本地更顺手，项目也提供原生桌面应用（Windows / macOS / Linux）：

https://github.com/DayuanJiang/next-ai-draw-io/releases

### 本地安装运行

```bash
git clone https://github.com/DayuanJiang/next-ai-draw-io
cd next-ai-draw-io
npm install
cp env.example .env.local
npm run dev
```

然后打开：

`http://localhost:6002`

Provider 的详细配置参考：

https://github.com/DayuanJiang/next-ai-draw-io/blob/main/docs/cn/ai-providers.md

### Docker

如果你更偏向容器化部署，按项目 Docker 指南走：

https://github.com/DayuanJiang/next-ai-draw-io/blob/main/docs/cn/docker.md

## 多 Provider / 多模型

项目支持多种模型提供商，包含（文档列举）：

- AWS Bedrock（默认）
- OpenAI / Anthropic / Google AI / Google Vertex AI / Azure OpenAI
- Ollama / OpenRouter / DeepSeek / SiliconFlow / ModelScope / SGLang
- Vercel AI Gateway
- 字节跳动豆包

除 AWS Bedrock 和 OpenRouter 外，其他提供商都支持自定义端点。

## MCP Server（预览）：在 AI 代理里直接“画图”

如果你在用 Claude Desktop、Cursor、VS Code 这类 AI 代理工具，可以通过 MCP（模型上下文协议）把 Next AI Draw.io 作为一个“可调用工具”接入。

文档给的配置示例：

```json
{
  "mcpServers": {
    "drawio": {
      "command": "npx",
      "args": ["@next-ai-drawio/mcp-server@latest"]
    }
  }
}
```

这是一个很实用的方向：把“画图”从单独的 Web App，提升成你日常 AI 工作流里的一步（对话->生成图->继续迭代）。

## 注意事项与建议

- 如果用于生产/团队共享，优先考虑 BYOK（自带 Key）+ 配额控制，避免成本失控。
- 对于关键架构图，建议把“结构正确性”作为第一优先级：先让 AI 产出结构，再做视觉优化。
- 图表落地后建议导出为源文件并纳入版本控制（即使工具自带历史，也建议团队层面可审计）。

---

参考文档：

https://github.com/DayuanJiang/next-ai-draw-io/blob/main/docs/cn/README_CN.md
