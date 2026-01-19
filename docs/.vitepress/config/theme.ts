import type { DefaultTheme } from 'vitepress';
import { nav } from './nav';
import { sidebar } from './sidebar';
import { algoliaSearchOptions } from './search/algolia-search';
import { localSearchOptions } from './search/local-search';

export const themeConfig: DefaultTheme.Config = {
  nav, // 导航栏配置
  sidebar, // 侧边栏配置

  logo: '/logo.png',
  outline: {
    level: 'deep', // 右侧大纲标题层级
    label: '目录', // 右侧大纲标题文本配置
  },
  darkModeSwitchLabel: '切换日光/暗黑模式',
  sidebarMenuLabel: '文章',
  returnToTopLabel: '返回顶部',
  lastUpdated: {
    text: '最后更新',
    formatOptions:{
      dateStyle:'full',
      timeStyle:'short'
    }
  },
  // 文档页脚文本配置
  docFooter: {
    prev: '上一篇',
    next: '下一篇'
  },
  // 编辑链接配置
  editLink: {
    pattern: 'https://github.com/rockyflux/xf-blog/edit/main/docs/:path',
    text: '不妥之处，敬请雅正'
  },
  // 搜索配置（二选一）
  search: {
    provider: 'algolia',
    options: algoliaSearchOptions,
    // 本地离线搜索
    // provider: 'local',
    // options: localSearchOptions
  },
  // 导航栏右侧社交链接配置
  socialLinks: [
    { icon: 'github', link: 'https://github.com/rockyflux/xf-blog' },
    {
      icon: {
        svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>码云</title><path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296Z"/></svg>'
      },
      link: 'https://github.com/rockyflux/xf-blog'
    },
    {
      icon: {
        svg: `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="90" height="90" rx="15" ry="15" fill="#1E88E5" stroke="#0D47A1" stroke-width="2"/><path d="M30 40 L45 60 L60 40 M30 60 L45 40 L60 60" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" fill="none"/><path d="M65 40 L65 70 Q65 75 60 75 L55 75" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle cx="80" cy="80" r="5" fill="#FFFFFF" opacity="0.8"/></svg>`
      },
      link: 'https://getxf.cn/'
    }
  ],

  // 自定义扩展: 文章元数据配置
  // @ts-ignore
  articleMetadataConfig: {
    author: '箫风', // 文章全局默认作者名称
    authorLink: 'https://rockyflux.github.io/xf-blog', // 点击作者名时默认跳转的链接
    showViewCount: false, // 是否显示文章阅读数, 需要在 docs/.vitepress/theme/api/config.js 及 interface.js 配置好相应 API 接口
  },
  // 自定义扩展: 文章版权配置
  copyrightConfig: {
    license: '署名-相同方式共享 4.0 国际 (CC BY-SA 4.0)',
    licenseLink: 'http://creativecommons.org/licenses/by-sa/4.0/'
  },
  // 自定义扩展: 评论配置
  commentConfig: {
    type: 'gitalk',
    showComment: false // 是否显示评论
  },
  // 自定义扩展: 页脚配置
  footerConfig: {
    showFooter: true, // 是否显示页脚
    icpRecordCode: '湘ICP备20012522号-2', // ICP备案号
    publicSecurityRecordCode: '', // 联网备案号
    copyright: `Copyright © 2026-${new Date().getFullYear()} 箫风` // 版权信息
  }
}
