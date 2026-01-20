import { algoliasearch } from 'algoliasearch';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import fg from 'fast-glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Algolia 配置
const ALGOLIA_APP_ID = 'JF17SJJSHZ';
const ALGOLIA_API_KEY = '3cb40bb1dec53a952c4c63c515571435'; // 管理 API Key（用于写入）
const ALGOLIA_INDEX_NAME = 'xfblog';

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
  return text
    .replace(/```[\s\S]*?```/g, '') // 移除代码块
    .replace(/`[^`]+`/g, '') // 移除行内代码
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // 移除链接，保留文本
    .replace(/[#*_~`]/g, '') // 移除 markdown 标记
    .replace(/\n+/g, ' ') // 换行符替换为空格
    .trim()
    .substring(0, 5000); // 限制长度
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
      const mainRecord = {
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
      };
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

          allRecords.push({
            objectID: `${relativePath}-${index}`,
            hierarchy: hierarchy,
            content: sectionCleanedContent,
            url: `${url}#${headingId}`,
            anchor: headingId,
            type: 'content',
            title: heading.text,
            lang: 'zh-CN', // VitePress 需要的语言字段（必须与 VitePress 配置的 locale 匹配）
          });
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
