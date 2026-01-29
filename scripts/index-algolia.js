import { algoliasearch } from 'algoliasearch';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import fg from 'fast-glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 尝试从项目根目录加载 .env 文件（如果存在），用于本地开发
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) return;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    if (key && !(key in process.env)) {
      process.env[key] = value;
    }
  });
}

/**
 * 将字符串按 UTF-8 字节数截断（避免 Algolia 单条 record 10KB 限制）
 */
function truncateUtf8(str, maxBytes) {
  if (!str) return '';
  if (maxBytes <= 0) return '';
  if (Buffer.byteLength(str, 'utf8') <= maxBytes) return str;

  // 二分查找：找到最大可容纳的字符长度
  let low = 0;
  let high = str.length;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    const slice = str.slice(0, mid);
    if (Buffer.byteLength(slice, 'utf8') <= maxBytes) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  // low 可能比实际可用长度大 1（或相等），回退一位
  const safeLen = Math.max(0, low - 1);
  return str.slice(0, safeLen);
}

/**
 * 确保单条 Algolia record 不超过指定字节数
 */
function ensureAlgoliaRecordSize(record, maxRecordBytes = 9500) {
  const json = JSON.stringify(record);
  const totalBytes = Buffer.byteLength(json, 'utf8');
  if (totalBytes <= maxRecordBytes) return record;

  const content = typeof record.content === 'string' ? record.content : '';
  const contentBytes = Buffer.byteLength(content, 'utf8');
  const overheadBytes = totalBytes - contentBytes;
  const allowedContentBytes = Math.max(0, maxRecordBytes - overheadBytes);

  record.content = truncateUtf8(content, allowedContentBytes);
  return record;
}

// Algolia 配置
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
// 管理 API Key（用于写入），请通过环境变量注入，避免把密钥提交到仓库
const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY;
const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME;

if (!ALGOLIA_API_KEY) {
  console.error('❌ 缺少环境变量 ALGOLIA_API_KEY（Algolia 管理 API Key，用于写入索引）');
  console.error('   例如（PowerShell）：');
  console.error('   $env:ALGOLIA_API_KEY="xxx"; pnpm index:algolia');
  process.exit(1);
}

// 排除的文件
const excludedFiles = ['index.md', 'tags.md', 'archives.md', 'me.md'];

// 初始化 Algolia 客户端
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

/**
 * 解析 markdown 标题结构
 */
function parseHeadings(content) {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    headings.push({ level, text });
  }
  
  return headings;
}

/**
 * 从文件路径提取分类信息
 */
function extractCategoryFromPath(filePath) {
  const parts = filePath.split(path.sep);
  // 例如: tutorials/frontend/2026/01/16/TypeScript基础.md
  // 返回: tutorials > frontend
  if (parts.length >= 2) {
    return parts.slice(0, 2).join(' > ');
  }
  return '';
}

/**
 * 清理文本内容（移除 markdown 语法）
 */
function cleanContent(text) {
  const cleaned = text
    .replace(/```[\s\S]*?```/g, '') // 移除代码块
    .replace(/`[^`]+`/g, '') // 移除行内代码
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // 移除链接，保留文本
    .replace(/[#*_~`]/g, '') // 移除 markdown 标记
    .replace(/\n+/g, ' ') // 换行符替换为空格
    .trim()
    .substring(0, 8000); // 先按字符粗截断，避免超大输入

  // 再按字节精确截断（中文 UTF-8 会放大字节数）
  return truncateUtf8(cleaned, 7000);
}

/**
 * 读取并解析 markdown 文件
 */
async function getMarkdownFiles() {
  const docsPath = path.join(__dirname, '../docs');
  const files = await fg('**/*.md', {
    cwd: docsPath,
    ignore: ['node_modules/**', '.vitepress/**']
  });

  const allRecords = [];

  files
    .filter(file => {
      const filename = path.basename(file);
      return !excludedFiles.includes(filename);
    })
    .forEach(file => {
      const filePath = path.join(docsPath, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data: frontmatter, content: body } = matter(content);
      
      // 计算相对路径（用于 URL）
      const relativePath = file.replace(/\.md$/, '');
      const url = `/xf-blog/${relativePath}`;
      
      const title = frontmatter.title || path.basename(file, '.md');
      const category = extractCategoryFromPath(file);
      const headings = parseHeadings(body);
      const cleanedContent = cleanContent(body);
      
      // 主记录（整个页面）- 这是最重要的记录
      const mainRecord = ensureAlgoliaRecordSize({
        objectID: relativePath,
        hierarchy: {
          lvl0: category || '文档',
          lvl1: title,
        },
        content: cleanedContent,
        url: url,
        type: 'content',
        title: title,
        description: frontmatter.description || '',
        tags: frontmatter.tags || [],
        date: frontmatter.date || '',
        lang: 'zh-CN', // VitePress 需要的语言字段（必须与 VitePress 配置的 locale 匹配）
      });
      allRecords.push(mainRecord);
      
      // 为每个 H2 和 H3 标题创建子记录（用于更精确的搜索）
      headings
        .filter(h => h.level <= 3) // 只处理 H1-H3
        .forEach((heading, index) => {
          const headingId = heading.text.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');

          // 提取该标题下的内容（到下一个同级或更高级标题）
          const startIndex = body.indexOf(heading.text);
          let endIndex = body.length;

          // 找到下一个同级或更高级标题的位置
          for (let i = index + 1; i < headings.length; i++) {
            if (headings[i].level <= heading.level) {
              const nextHeadingText = headings[i].text;
              const nextHeadingIndex = body.indexOf(nextHeadingText, startIndex + heading.text.length);
              if (nextHeadingIndex !== -1) {
                endIndex = nextHeadingIndex;
                break;
              }
            }
          }

          // 提取该标题下的内容并清理
          const sectionContent = body.substring(startIndex, endIndex);
          const sectionCleanedContent = cleanContent(sectionContent);

          const hierarchy = {
            lvl0: category || '文档',
            lvl1: title,
          };

          if (heading.level === 2) {
            hierarchy.lvl2 = heading.text;
          } else if (heading.level === 3) {
            hierarchy.lvl2 = headings.find(h => h.level === 2 && headings.indexOf(h) < index)?.text || title;
            hierarchy.lvl3 = heading.text;
          }

          allRecords.push(ensureAlgoliaRecordSize({
            objectID: `${relativePath}-${index}`,
            hierarchy: hierarchy,
            content: sectionCleanedContent,
            url: `${url}#${headingId}`,
            anchor: headingId,
            type: 'content',
            title: heading.text,
            lang: 'zh-CN', // VitePress 需要的语言字段（必须与 VitePress 配置的 locale 匹配）
          }));
        });
    });

  return allRecords;
}

/**
 * 索引文档到 Algolia
 */
async function indexDocuments() {
  try {
    console.log('开始获取文档...');
    const records = await getMarkdownFiles();
    console.log(`找到 ${records.length} 个搜索记录`);

    // 分批处理，每批最多 1000 条
    const batchSize = 1000;
    let totalIndexed = 0;

    for (let i = 0; i < records.length; i += batchSize) {
      const batch = records.slice(i, i + batchSize);
      console.log(`正在索引第 ${Math.floor(i / batchSize) + 1} 批（${batch.length} 条记录）...`);
      
      const result = await client.saveObjects({
        indexName: ALGOLIA_INDEX_NAME,
        objects: batch
      });

      totalIndexed += batch.length;
      console.log(`  ✅ 已索引 ${totalIndexed}/${records.length} 条记录`);
    }

    console.log('\n✅ 成功索引所有文档！');
    console.log(`总计索引了 ${totalIndexed} 个对象`);
  } catch (error) {
    console.error('❌ 索引失败:', error);
    if (error.response) {
      console.error('错误详情:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

// 执行索引
indexDocuments();
