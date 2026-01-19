export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/dev-tools/': [
    {
      text: '开发工具',
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
  ],

  '/tutorials/': [
    {
      text: '开发教程',
      items: [
        { text: 'JAVA教程', link: '/tutorials/java/' },
        { text: 'JAVA框架', link: '/tutorials/java-framework/' },
        { text: '开发源', link: '/tutorials/dev-repo/' },
        { text: '代码托管', link: '/tutorials/code-hosting/' },
        { text: '在线工具', link: '/tutorials/online-tools/' },
        { text: 'AI开发技术', link: '/tutorials/ai-tech/' },
        { text: '开发环境管理', link: '/tutorials/dev-env/' },
        { text: '插件', link: '/tutorials/plugins/' },
        { text: '内外穿透', link: '/tutorials/nat-traversal/' },
      ],
    },
  ],

  '/ai/': [
    {
      text: 'AI相关',
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
  ],

  '/online-tools/': [
    {
      text: '在线工具',
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
  ],

  '/computer/': [
    {
      text: '折腾电脑',
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
      items: [
        { text: '魔法上网', link: '/computer/basics/network/' },
        { text: '鼠标键盘', link: '/computer/basics/peripherals/' },
        { text: '灯桌椅', link: '/computer/basics/desk-setup/' },
        { text: '电脑显示器', link: '/computer/basics/monitor/' },
        { text: '软路由', link: '/computer/basics/router/' },
        { text: '充电头', link: '/computer/basics/charger/' },
      ],
    },
  ],

  '/browser/': [
    {
      text: '浏览器',
      items: [
        { text: '新标签卡插件', link: '/browser/newtab/' },
        { text: '油猴脚本', link: '/browser/userscript/' },
        { text: '浏览器', link: '/browser/recommend/' },
        { text: '开发插件', link: '/browser/dev-extensions/' },
        { text: '自用插件', link: '/browser/extensions/' },
        { text: '指纹浏览器', link: '/browser/fingerprint/' },
      ],
    },
  ],
};
