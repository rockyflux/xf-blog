/**
 * API 配置 - 不蒜子阅读数统计
 * 
 * 不蒜子会自动统计页面访问量，无需后端配置
 * 只需在 docs/.vitepress/config/head.ts 中引入不蒜子脚本即可
 * 
 * 脚本地址: //cdn.busuanzi.cc/busuanzi/3.6.9/busuanzi.min.js
 * 使用 ID: busuanzi_page_pv (单页面访问量)
 */

// 不蒜子方案，无需实际 API 请求
export const request = {
  defaults: {
    baseURL: 'busuanzi'
  }
};