import {DefaultTheme} from "vitepress";

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/dev-tools/': [
    {
      text: '开发工具',
      collapsible: true,
      collapsed: false,
      items: [
        { text: '编辑器', link: '/dev-tools/editor/' },
        { text: '集成开发环境', link: '/dev-tools/ide/' },
        { text: '数据库', link: '/dev-tools/database-tools/' },
        { text: 'SSH工具', link: '/dev-tools/ssh-tools/' },
        { text: '日志查看', link: '/dev-tools/log-tools/' },
        { text: '接口测试', link: '/dev-tools/api-tools/' },
        { text: 'JSON格式化', link: '/dev-tools/json-tools/' },
        { text: '抓包工具', link: '/dev-tools/packet-capture/' },
        { text: '程序员笔记本', link: '/dev-tools/note-tools/' },
        { text: 'AI开发插件', link: '/dev-tools/ai-dev-plugins/' },
        { text: '服务器面板', link: '/dev-tools/server-panel/' },
        { text: '图表工具', link: '/dev-tools/diagram-tools/' },
      ],
    },
    {
      text: '博客文章',
      collapsible: true,
      collapsed: false,
      items: [
        { text: '高效开发工具推荐', link: '/dev-tools/blog/2026/01/18/高效开发工具推荐' },
        { text: '开发工具配置技巧', link: '/dev-tools/blog/2026/01/19/开发工具配置技巧' },
        { text: '开发工具插件推荐', link: '/dev-tools/blog/2026/01/20/开发工具插件推荐' },
        { text: '开发工具使用心得', link: '/dev-tools/blog/2026/01/21/开发工具使用心得' },
      ],
    },
  ],

  '/tutorials/': [
    {
      text: '开发教程',
      collapsible: true,
      collapsed: false,
      items: [
        { text: 'JAVA教程', link: '/tutorials/java/' },
        { text: 'JAVA框架', link: '/tutorials/java-framework/' },
        { text: '开发源', link: '/tutorials/dev-repo/' },
        { text: '代码托管', link: '/tutorials/code-hosting/' },
        { text: '在线工具', link: '/tutorials/online-tools/' },
        { text: 'AI开发技术', link: '/tutorials/ai-tech/' },
        { text: '开发环境管理', link: '/tutorials/dev-env/' },
        { text: '插件', link: '/tutorials/plugins/' },
        { text: '内外穿透', link: '/tutorials/nat-traversal/' }
      ],
    },
    {
      text: '博客文章',
      collapsible: true,
      collapsed: false,
      items: [
        { text: '前端开发入门指南', link: '/tutorials/blog/2026/01/18/前端开发入门指南' },
        { text: '后端开发最佳实践', link: '/tutorials/blog/2026/01/19/后端开发最佳实践' },
        { text: '全栈开发学习路径', link: '/tutorials/blog/2026/01/20/全栈开发学习路径' },
        { text: '代码审查的重要性', link: '/tutorials/blog/2026/01/21/代码审查的重要性' },
        { text: '个人常用Linux命令', link: '/tutorials/devops/2019/12/31/个人常用Linux命令' },
      ],
    },
  ],

  '/ai/': [
    {
      text: 'AI相关',
      collapsible: true,
      collapsed: false,
      items: [
        { text: 'AI客户端', link: '/ai/clients/' },
        { text: 'LLM开放平台', link: '/ai/llm-platform/' },
        { text: 'RAG知识库', link: '/ai/rag/' },
        { text: 'AI导航', link: '/ai/navigation/' },
        { text: 'UI设计', link: '/ai/ui-design/' },
        { text: 'LLM镜像', link: '/ai/llm-mirror/' },
        { text: '提示词', link: '/ai/prompts/' },
        { text: 'AI搜索', link: '/ai/search/' },
        { text: 'AI模型库', link: '/ai/models/' },
        { text: '通用大模型', link: '/ai/general-models/' },
        { text: 'tokens供应商', link: '/ai/token-providers/' },
        { text: 'AI产品', link: '/ai/products/' },
        { text: 'MCP', link: '/ai/mcp/' },
        { text: 'Cursor', link: '/ai/cursor/' },
        { text: 'AI编程插件', link: '/ai/coding/' },
        { text: '教程', link: '/ai/learning/' },
      ],
    },
    {
      text: '博客文章',
      collapsible: true,
      collapsed: false,
      items: [
        { text: 'AI在开发中的应用', link: '/ai/blog/2026/01/18/AI在开发中的应用' },
        { text: '大语言模型使用技巧', link: '/ai/blog/2026/01/19/大语言模型使用技巧' },
        { text: 'AI工具对比分析', link: '/ai/blog/2026/01/20/AI工具对比分析' },
        { text: 'AI辅助学习编程', link: '/ai/blog/2026/01/21/AI辅助学习编程' },
      ],
    },
  ],

  '/online-tools/': [
    {
      text: '在线工具',
      collapsible: true,
      collapsed: false,
      items: [
        { text: '各种工具', link: '/online-tools/various/' },
        { text: '翻译', link: '/online-tools/translate/' },
        { text: 'Markdown', link: '/online-tools/markdown/' },
        { text: '热点资讯', link: '/online-tools/news/' },
        { text: '影视', link: '/online-tools/media/' },
        { text: '在线学习', link: '/online-tools/learning/' },
        { text: '博客分享', link: '/online-tools/blogs/' },
      ],
    },
    {
      text: '博客文章',
      collapsible: true,
      collapsed: false,
      items: [
        { text: '在线工具使用指南', link: '/online-tools/blog/2026/01/18/在线工具使用指南' },
        { text: '在线协作工具推荐', link: '/online-tools/blog/2026/01/19/在线协作工具推荐' },
        { text: '在线学习平台对比', link: '/online-tools/blog/2026/01/20/在线学习平台对比' },
        { text: '在线工具安全使用', link: '/online-tools/blog/2026/01/21/在线工具安全使用' },
      ],
    },
  ],

  '/computer/': [
    {
      text: '折腾电脑',
      collapsible: true,
      collapsed: false,
      items: [
        { text: 'window优化', link: '/computer/system-optimization/' },
        { text: '文件同步', link: '/computer/file-sync/' },
        { text: '桌面和启动', link: '/computer/desktop/' },
        { text: '效率助理', link: '/computer/efficiency/' },
        { text: '高速下载', link: '/computer/download/' },
        { text: '科学上网', link: '/computer/vpn/' },
        { text: 'NAS存储', link: '/computer/nas/' },
        { text: '远程电脑', link: '/computer/remote/' },
        { text: '视频剪辑', link: '/computer/video-edit/' },
      ],
    },
    {
      text: '基础条件',
      collapsible: true,
      collapsed: false,
      items: [
        { text: '魔法上网', link: '/computer/basics/network/' },
        { text: '鼠标键盘', link: '/computer/basics/peripherals/' },
        { text: '灯桌椅', link: '/computer/basics/desk-setup/' },
        { text: '电脑显示器', link: '/computer/basics/monitor/' },
        { text: '软路由', link: '/computer/basics/router/' },
        { text: '充电头', link: '/computer/basics/charger/' },
      ],
    },
    {
      text: '博客文章',
      collapsible: true,
      collapsed: false,
      items: [
        { text: 'Windows系统优化技巧', link: '/computer/blog/2026/01/18/Windows系统优化技巧' },
        { text: '电脑硬件升级指南', link: '/computer/blog/2026/01/19/电脑硬件升级指南' },
        { text: '软件推荐与配置', link: '/computer/blog/2026/01/20/软件推荐与配置' },
        { text: '电脑故障排查方法', link: '/computer/blog/2026/01/21/电脑故障排查方法' },
      ],
    },
  ],

  '/browser/': [
    {
      text: '浏览器',
      collapsible: true,
      collapsed: false,
      items: [
        { text: '新标签卡插件', link: '/browser/newtab/' },
        { text: '油猴脚本', link: '/browser/userscript/' },
        { text: '浏览器', link: '/browser/recommend/' },
        { text: '开发插件', link: '/browser/dev-extensions/' },
        { text: '自用插件', link: '/browser/extensions/' },
        { text: '指纹浏览器', link: '/browser/fingerprint/' },
      ],
    },
    {
      text: '博客文章',
      collapsible: true,
      collapsed: false,
      items: [
        { text: '浏览器性能优化', link: '/browser/blog/2026/01/18/浏览器性能优化' },
        { text: '浏览器插件开发入门', link: '/browser/blog/2026/01/19/浏览器插件开发入门' },
        { text: '浏览器安全设置', link: '/browser/blog/2026/01/20/浏览器安全设置' },
        { text: '浏览器使用技巧', link: '/browser/blog/2026/01/21/浏览器使用技巧' },
      ],
    },
  ],
};
