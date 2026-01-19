import type { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.Config['nav'] = [
  {
    text: '开发工具',
    items: [
      { text: '代码编辑器', link: '/dev-tools/editor/index', activeMatch: '/dev-tools/editor/' },
      { text: '版本控制', link: '/dev-tools/version-control/index', activeMatch: '/dev-tools/version-control/' },
      { text: '包管理工具', link: '/dev-tools/package-manager/index', activeMatch: '/dev-tools/package-manager/' },
      { text: '构建工具', link: '/dev-tools/build-tools/index', activeMatch: '/dev-tools/build-tools/' },
      { text: '调试工具', link: '/dev-tools/debug-tools/index', activeMatch: '/dev-tools/debug-tools/' },
      { text: '测试工具', link: '/dev-tools/testing-tools/index', activeMatch: '/dev-tools/testing-tools/' },
      { text: '数据库工具', link: '/dev-tools/database-tools/index', activeMatch: '/dev-tools/database-tools/' },
      { text: 'API工具', link: '/dev-tools/api-tools/index', activeMatch: '/dev-tools/api-tools/' },
      { text: '部署工具', link: '/dev-tools/deployment-tools/index', activeMatch: '/dev-tools/deployment-tools/' },
      { text: '性能分析', link: '/dev-tools/performance-tools/index', activeMatch: '/dev-tools/performance-tools/' },
    ],
    activeMatch: '/dev-tools/'
  },
  {
    text: '开发教程',
    items: [
      { text: '前端开发', link: '/tutorials/frontend/index', activeMatch: '/tutorials/frontend/' },
      { text: '后端开发', link: '/tutorials/backend/index', activeMatch: '/tutorials/backend/' },
      { text: '移动开发', link: '/tutorials/mobile/index', activeMatch: '/tutorials/mobile/' },
      { text: '数据库', link: '/tutorials/database/index', activeMatch: '/tutorials/database/' },
      { text: 'DevOps', link: '/tutorials/devops/index', activeMatch: '/tutorials/devops/' },
      { text: '算法与数据结构', link: '/tutorials/algorithm/index', activeMatch: '/tutorials/algorithm/' },
    ],
    activeMatch: '/tutorials/'
  },
  {
    text: 'AI相关',
    items: [
      { text: 'AI工具', link: '/ai/tools/index', activeMatch: '/ai/tools/' },
      { text: 'AI模型', link: '/ai/models/index', activeMatch: '/ai/models/' },
      { text: 'AI应用', link: '/ai/applications/index', activeMatch: '/ai/applications/' },
      { text: 'AI学习', link: '/ai/learning/index', activeMatch: '/ai/learning/' },
    ],
    activeMatch: '/ai/'
  },
  {
    text: '在线工具',
    items: [
      { text: '代码工具', link: '/online-tools/code/index', activeMatch: '/online-tools/code/' },
      { text: '设计工具', link: '/online-tools/design/index', activeMatch: '/online-tools/design/' },
      { text: '转换工具', link: '/online-tools/convert/index', activeMatch: '/online-tools/convert/' },
      { text: '效率工具', link: '/online-tools/productivity/index', activeMatch: '/online-tools/productivity/' },
    ],
    activeMatch: '/online-tools/'
  },
  {
    text: '折腾电脑',
    items: [
      { text: '系统优化', link: '/computer/system-optimization/index', activeMatch: '/computer/system-optimization/' },
      { text: '软件推荐', link: '/computer/software/index', activeMatch: '/computer/software/' },
      { text: '硬件配置', link: '/computer/hardware/index', activeMatch: '/computer/hardware/' },
      { text: '故障排查', link: '/computer/troubleshooting/index', activeMatch: '/computer/troubleshooting/' },
    ],
    activeMatch: '/computer/'
  },
  {
    text: '浏览器',
    items: [
      { text: '浏览器插件', link: '/browser/extensions/index', activeMatch: '/browser/extensions/' },
      { text: '浏览器技巧', link: '/browser/tips/index', activeMatch: '/browser/tips/' },
      { text: '浏览器配置', link: '/browser/config/index', activeMatch: '/browser/config/' },
    ],
    activeMatch: '/browser/'
  },
  {
    text: '我的标签',
    link: '/tags',
    activeMatch: '/tags'
  },
  {
    text: '我的归档',
    link: '/archives',
    activeMatch: '/archives'
  },
];
