import type { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.Config['nav'] = [
  {
    text: '博客文章',
    activeMatch: '/blog/',
    items: [
      { text: '开发工具', link: '/dev-tools/blog/', activeMatch: '/dev-tools/blog/' },
      { text: '开发教程', link: '/tutorials/blog/', activeMatch: '/tutorials/blog/' },
      { text: 'AI相关', link: '/ai/blog/', activeMatch: '/ai/blog/' },
      { text: '在线工具', link: '/online-tools/blog/', activeMatch: '/online-tools/blog/' },
      { text: '折腾电脑', link: '/computer/blog/', activeMatch: '/computer/blog/' },
      { text: '浏览器', link: '/browser/blog/', activeMatch: '/browser/blog/' },
    ]
  },
  {
    text: '工具导航',
    activeMatch: '/tools/',
    items: [
      { text: '开发工具', link: '/dev-tools/index', activeMatch: '/dev-tools/' },
      { text: '开发教程', link: '/tutorials/index', activeMatch: '/tutorials/' },
      { text: 'AI相关', link: '/ai/index', activeMatch: '/ai/' },
      { text: '在线工具', link: '/online-tools/index', activeMatch: '/online-tools/' },
      { text: '折腾电脑', link: '/computer/index', activeMatch: '/computer/' },
      { text: '浏览器', link: '/browser/index', activeMatch: '/browser/' },
    ]
  },
  { text: '我的标签', link: '/tags', activeMatch: '/tags' },
  { text: '我的归档', link: '/archives', activeMatch: '/archives' },
];
