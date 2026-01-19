import { algoliasearch } from 'algoliasearch';

// Algolia 配置
const ALGOLIA_APP_ID = 'JF17SJJSHZ';
const ALGOLIA_API_KEY = '3cb40bb1dec53a952c4c63c515571435'; // 管理 API Key
const ALGOLIA_INDEX_NAME = 'xfblog';

// 初始化客户端
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

async function clearIndex() {
  try {
    console.log('正在清空索引...');
    await client.clearObjects({ indexName: ALGOLIA_INDEX_NAME });
    console.log('✅ 索引已清空');
  } catch (error) {
    console.error('❌ 清空失败:', error);
    process.exit(1);
  }
}

clearIndex();
