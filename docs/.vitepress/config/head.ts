import type { HeadConfig } from 'vitepress';
import { metaData } from './constants';

export const head: HeadConfig[] = [
  ['link', { rel: 'icon', href: '/favicon.ico' }],
  ['meta', { name: 'author', content: 'Rocky' }],
  ['meta', { name: 'keywords', content: '箫风的技术知识库, 知识库, 博客, Rocky' }],

  ['meta', { name: 'HandheldFriendly', content: 'True' }],
  ['meta', { name: 'MobileOptimized', content: '320' }],
  ['meta', { name: 'theme-color', content: '#3c8772' }],

  ['meta', { property: 'og:type', content: 'website' }],
  ['meta', { property: 'og:locale', content: metaData.locale }],
  ['meta', { property: 'og:title', content: metaData.title }],
  ['meta', { property: 'og:description', content: metaData.description }],
  ['meta', { property: 'og:site', content: metaData.site }],
  ['meta', { property: 'og:site_name', content: metaData.title }],
  ['meta', { property: 'og:image', content: metaData.image }],

  // 51.la 统计代码（暂时禁用，脚本加载失败会阻止页面功能）
  // ['script', { charset: 'UTF-8', id: 'LA_COLLECT', src: '//sdk.51.la/js-sdk-pro.min.js' }],
  // ['script', {}, `LA.init({id:"L4aKnGXQoGpLqzDP",ck:"L4aKnGXQoGpLqzDP",autoTrack:true,hashMode:true,screenRecord:true})`],
];