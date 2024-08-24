import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录名（在 ES Module 中 __dirname 是不可用的）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 获取命令行参数中的 filename
const args = process.argv.slice(2);
if (args.length < 1) {
    console.error('请提供文件名参数');
    process.exit(1);
}
const filename = args[0];

// 获取当前时间并格式化为 YYYY-MM-DD HH:mm:ss 格式
const currentDate = new Date();
const formattedDate = currentDate.toISOString().replace('T', ' ').substring(0, 19);

// 设置生成的 markdown 文件路径
const markdownDir = path.join(__dirname, '../../public/markdown/');
const filepath = path.join(markdownDir, `${filename}.md`);

// 检查 public/markdown 目录是否存在，如果不存在则创建
if (!fs.existsSync(markdownDir)) {
    fs.mkdirSync(markdownDir, { recursive: true });
}

// 模板内容
const content = `---
categories:
- 随笔杂记
date: ${formattedDate}
title: ${filename}
img: 
---

# ${filename}

这里是内容的起始点。

`;

// 将内容写入到 markdown 文件
fs.writeFile(filepath, content, (err) => {
    if (err) {
        console.error('文件生成失败:', err);
    } else {
        console.log(`文件已成功生成: ${filepath}`);
    }
});
