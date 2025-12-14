#!/usr/bin/env node

const http = require('http');

// 检查开发服务器是否正常运行
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/post/代码块测试',
  method: 'GET',
  timeout: 5000
};

const req = http.request(options, (res) => {
  console.log(`开发服务器响应状态: ${res.statusCode}`);

  if (res.statusCode === 200) {
    console.log('✅ 代码块功能测试页面已准备就绪');
    console.log('🌐 请访问: http://localhost:3000/post/代码块测试');
    console.log('');
    console.log('🧪 测试项目:');
    console.log('  • 语法高亮是否正确显示');
    console.log('  • 复制按钮是否正常工作');
    console.log('  • 不同编程语言的着色是否正确');
    console.log('  • 移动端响应式效果');
    console.log('  • 深色模式适配');
  } else {
    console.log('❌ 页面访问失败');
  }
});

req.on('error', (err) => {
  console.error('❌ 无法连接到开发服务器:', err.message);
  console.log('请确保开发服务器正在运行: npm run dev');
});

req.on('timeout', () => {
  console.error('❌ 请求超时');
  req.destroy();
});

req.end();