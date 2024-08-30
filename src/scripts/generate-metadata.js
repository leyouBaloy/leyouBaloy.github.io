import fs from 'fs';
import path from 'path';
import frontMatter from 'front-matter';
import { fileURLToPath } from 'url';

// 获取当前文件的目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const markdownDir = path.join(__dirname, '../../public/markdown');
const outputDir = path.join(__dirname, '../../public/markdown/metadata');

// 确保路径格式正确
const normalizedMarkdownDir = path.normalize(markdownDir);
const normalizedOutputDir = path.normalize(outputDir);

// 创建输出目录（如果不存在）
if (!fs.existsSync(normalizedOutputDir)) {
  fs.mkdirSync(normalizedOutputDir, { recursive: true });
}

const metadataList = [];

fs.readdirSync(normalizedMarkdownDir).forEach(file => {
  if (path.extname(file) === '.md') {
    const content = fs.readFileSync(path.join(normalizedMarkdownDir, file), 'utf8');
    const metadata = frontMatter(content);

    // 检查 draft 属性是否为 true
    if (metadata.attributes.draft === true) {
      console.log(`Skipping draft file: ${file}`);
      return; // 跳过此文件
    }

    const bodyContent = metadata.body;

    // 获取 tags 和 img 字段，优先级依次为 categories/tags 和 featuredImagePreview/img
    const tags = metadata.attributes.categories || metadata.attributes.tags || [];
    const img = metadata.attributes.featuredImagePreview || metadata.attributes.img || '';

    metadataList.push({
      title: metadata.attributes.title,
      date: metadata.attributes.date,
      file: file,
      excerpt: bodyContent.slice(0, 150).replaceAll('#', '').replaceAll(' ', '').replaceAll('\n', '').replaceAll('*', ''),
      tags: tags, // 优先 categories，其次 tags，否则为空数组
      img: img // 优先 featuredImagePreview，其次 img，否则为空字符串
    });
  }
});

// 按照时间倒序排列
metadataList.sort((a, b) => new Date(b.date) - new Date(a.date));

// 每10个元数据一个文件
const chunkSize = 10;
const totalPages = Math.ceil(metadataList.length / chunkSize);

for (let i = 0; i < metadataList.length; i += chunkSize) {
  const chunk = metadataList.slice(i, i + chunkSize);
  if (chunk.length > 0) {
    chunk[0].totalPages = totalPages; // 在第一个对象中添加总页数字段，用于显示主页下方的页码
  }
  const outputFile = path.join(normalizedOutputDir, `metadata_${Math.floor(i / chunkSize) + 1}.json`);
  fs.writeFileSync(outputFile, JSON.stringify(chunk, null, 2));
  console.log(`Metadata chunk ${Math.floor(i / chunkSize) + 1} generated successfully!`);
}

// 仅保留 title, date, file 字段
const simplifiedMetadataList = metadataList.map(post => ({
  title: post.title,
  date: post.date,
  file: post.file
}));

// 按年份分类
const postsByYear = simplifiedMetadataList.reduce((acc, post) => {
  const year = new Date(post.date).getFullYear();
  if (!acc[year]) {
    acc[year] = [];
  }
  acc[year].push(post);
  return acc;
}, {});

// 按标签分类
const postsByTag = metadataList.reduce((acc, post) => {
  post.tags.forEach(tag => {
    if (!acc[tag]) {
      acc[tag] = [];
    }
    acc[tag].push({
      title: post.title,
      date: post.date,
      file: post.file
    });
  });
  return acc;
}, {});

// 输出按年份分类的 JSON 文件
fs.writeFileSync(path.join(normalizedOutputDir, 'posts_by_year.json'), JSON.stringify(postsByYear, null, 2));
console.log('Posts by year JSON file generated successfully!');

// 输出按标签分类的 JSON 文件
fs.writeFileSync(path.join(normalizedOutputDir, 'posts_by_tag.json'), JSON.stringify(postsByTag, null, 2));
console.log('Posts by tag JSON file generated successfully!');
