import { algoliasearch } from 'algoliasearch';

// Algolia 配置
const ALGOLIA_APP_ID = 'JF17SJJSHZ';
const ALGOLIA_API_KEY = '3cb40bb1dec53a952c4c63c515571435'; // 管理 API Key
const ALGOLIA_INDEX_NAME = 'xfblog';

// 初始化客户端
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

async function configureIndex() {
  try {
    console.log('正在配置索引设置...');
    
    // 配置索引设置，使其兼容 VitePress/DocSearch
    await client.setSettings({
      indexName: ALGOLIA_INDEX_NAME,
      indexSettings: {
        // 可搜索的属性（按优先级排序）
        searchableAttributes: [
          'hierarchy.lvl0',
          'hierarchy.lvl1',
          'hierarchy.lvl2',
          'hierarchy.lvl3',
          'hierarchy.lvl4',
          'title',
          'content',
          'tags',
          'description'
        ],
        // 用于显示的属性
        attributesToRetrieve: [
          'hierarchy',
          'content',
          'url',
          'anchor',
          'title',
          'type',
          'tags',
          'description',
          'date',
          'lang'
        ],
        // 用于高亮的属性
        attributesToHighlight: [
          'hierarchy',
          'title',
          'content'
        ],
        // 用于摘要的属性
        attributesToSnippet: [
          'content:50'
        ],
        // 分面过滤（lang 必须是 filterOnly 以支持 VitePress 的语言过滤）
        attributesForFaceting: [
          'type',
          'tags',
          'hierarchy.lvl0',
          'hierarchy.lvl1',
          'filterOnly(lang)'
        ],
        // 自定义排名
        customRanking: [
          'desc(date)'
        ],
        // 高亮设置
        highlightPreTag: '<em>',
        highlightPostTag: '</em>',
        // 允许拼写错误
        minWordSizefor1Typo: 3,
        minWordSizefor2Typos: 7,
        // 语言设置
        queryLanguages: ['zh', 'en'],
        indexLanguages: ['zh', 'en'],
        // 移除停用词
        removeStopWords: false,
        // 忽略复数
        ignorePlurals: false
      }
    });

    console.log('✅ 索引设置配置成功！');
    console.log('\n已配置的 searchableAttributes:');
    console.log('  - hierarchy.lvl0-4');
    console.log('  - title');
    console.log('  - content');
    console.log('  - tags');
    console.log('  - description');
  } catch (error) {
    console.error('❌ 配置失败:', error);
    process.exit(1);
  }
}

configureIndex();
