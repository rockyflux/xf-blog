import type { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.Config['nav'] = [
  {
    text: 'AI指南',
    activeMatch: '/ai/',
    items: [
      { text: 'AI 总览', link: '/ai/', activeMatch: '^/ai/$' },
      { text: 'AI编程', link: '/ai/coding/', activeMatch: '/ai/coding/|/ai/cursor/|/ai/mcp/' },
      { text: 'AI工具', link: '/ai/tools/', activeMatch: '/ai/tools/|/ai/rag/|/ai/search/|/ai/navigation/|/ai/ui-design/' },
      { text: 'AI模型', link: '/ai/models/', activeMatch: '/ai/models/|/ai/general-models/|/ai/llm-platform/|/ai/llm-mirror/|/ai/token-providers/' },
      { text: 'AI博客', link: '/ai/blog/', activeMatch: '/ai/blog/' },
    ]
  },
  {
    text: '博客文章',
    // 博客文章分散在各模块的 /xxx/blog/ 目录下
    activeMatch: '^/(dev-tools|tutorials|online-tools|computer|browser)/blog/',
    items: [
      { text: '开发工具', link: '/dev-tools/blog/', activeMatch: '/dev-tools/blog/' },
      { text: '开发教程', link: '/tutorials/blog/', activeMatch: '/tutorials/blog/' },
      { text: '在线工具', link: '/online-tools/blog/', activeMatch: '/online-tools/blog/' },
      { text: '折腾电脑', link: '/computer/blog/', activeMatch: '/computer/blog/' },
      { text: '浏览器', link: '/browser/blog/', activeMatch: '/browser/blog/' },
    ]
  },
  {
    text: '工具导航',
    // 工具导航：排除 /xxx/blog/，避免博客页高亮到工具导航
    activeMatch: '^/(dev-tools|tutorials|online-tools|computer|browser)/(?!blog/)',
    items: [
      { text: '开发工具', link: '/dev-tools/index', activeMatch: '/dev-tools/' },
      { text: '开发教程', link: '/tutorials/index', activeMatch: '/tutorials/' },
      { text: '在线工具', link: '/online-tools/index', activeMatch: '/online-tools/' },
      { text: '折腾电脑', link: '/computer/index', activeMatch: '/computer/' },
      { text: '浏览器', link: '/browser/index', activeMatch: '/browser/' },
    ]
  },
  { text: '我的标签', link: '/tags', activeMatch: '/tags' },
  { text: '我的归档', link: '/archives', activeMatch: '/archives' },
];
