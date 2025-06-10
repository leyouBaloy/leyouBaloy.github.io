#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re
import hashlib
import requests
from pathlib import Path
from typing import List, Tuple, Dict
from urllib.parse import urlparse, urljoin
import tempfile
import logging
from qcloud_cos import CosConfig
from qcloud_cos import CosS3Client
import os

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class MarkdownImageUploader:
    """Markdown图片上传到腾讯云COS的处理类"""
    
    def __init__(self, secret_id: str, secret_key: str, region: str, bucket: str, domain: str = None):
        """
        初始化COS客户端
        
        Args:
            secret_id: 腾讯云SecretId
            secret_key: 腾讯云SecretKey  
            region: COS地域
            bucket: COS存储桶名称
            domain: 自定义域名（可选）
        """
        self.region = region
        self.bucket = bucket
        self.domain = domain
        
        # 初始化COS客户端
        config = CosConfig(Region=region, SecretId=secret_id, SecretKey=secret_key)
        self.cos_client = CosS3Client(config)
        
        # 图片链接正则表达式
        self.image_pattern = re.compile(r'!\[([^\]]*)\]\(([^)]+)\)', re.MULTILINE)
        
        # 支持的图片扩展名
        self.image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'}
        
    def is_local_path(self, path: str) -> bool:
        """判断是否为本地路径"""
        return not path.startswith(('http://', 'https://'))
    
    def is_image_url(self, url: str) -> bool:
        """判断URL是否为图片"""
        parsed_url = urlparse(url.lower())
        path = parsed_url.path
        return any(path.endswith(ext) for ext in self.image_extensions)
    
    def generate_cos_key(self, filename: str, content: bytes = None) -> str:
        """生成COS对象键名"""
        # 使用文件内容的MD5作为文件名前缀，避免重复上传
        if content:
            md5_hash = hashlib.md5(content).hexdigest()[:8]
            name, ext = os.path.splitext(filename)
            return f"images/{md5_hash}_{filename}"
        return f"images/{filename}"
    
    def download_image(self, url: str) -> Tuple[str, bytes]:
        """下载在线图片"""
        try:
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
            response = requests.get(url, headers=headers, timeout=30)
            response.raise_for_status()
            
            # 从URL获取文件名
            parsed_url = urlparse(url)
            filename = os.path.basename(parsed_url.path)
            if not filename or '.' not in filename:
                # 如果无法从URL获取文件名，使用content-type推断
                content_type = response.headers.get('content-type', '')
                if 'jpeg' in content_type:
                    filename = 'image.jpg'
                elif 'png' in content_type:
                    filename = 'image.png'
                elif 'gif' in content_type:
                    filename = 'image.gif'
                else:
                    filename = 'image.jpg'
            
            return filename, response.content
            
        except Exception as e:
            logger.error(f"下载图片失败 {url}: {e}")
            raise
    
    def upload_to_cos(self, file_path: str = None, content: bytes = None, filename: str = None) -> str:
        """上传文件到COS"""
        try:
            if file_path:
                # 上传本地文件
                with open(file_path, 'rb') as f:
                    content = f.read()
                filename = os.path.basename(file_path)
            
            cos_key = self.generate_cos_key(filename, content)
            
            # 检查文件是否已存在
            try:
                self.cos_client.head_object(Bucket=self.bucket, Key=cos_key)
                logger.info(f"文件已存在，跳过上传: {cos_key}")
            except:
                # 文件不存在，执行上传
                self.cos_client.put_object(
                    Bucket=self.bucket,
                    Body=content,
                    Key=cos_key,
                    ContentType=self._get_content_type(filename)
                )
                logger.info(f"上传成功: {cos_key}")
            
            # 生成访问URL
            if self.domain:
                return f"https://{self.domain}/{cos_key}"
            else:
                return f"https://{self.bucket}.cos.{self.region}.myqcloud.com/{cos_key}"
                
        except Exception as e:
            logger.error(f"上传失败: {e}")
            raise
    
    def _get_content_type(self, filename: str) -> str:
        """根据文件扩展名获取Content-Type"""
        ext = os.path.splitext(filename)[1].lower()
        content_types = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg', 
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.bmp': 'image/bmp',
            '.webp': 'image/webp',
            '.svg': 'image/svg+xml'
        }
        return content_types.get(ext, 'application/octet-stream')
    
    def extract_images(self, markdown_content: str, markdown_dir: str) -> List[Tuple[str, str, str]]:
        """提取markdown中的图片链接"""
        images = []
        matches = self.image_pattern.findall(markdown_content)
        
        for alt_text, image_path in matches:
            original_link = f"![{alt_text}]({image_path})"
            
            # 过滤非图片链接
            if not self.is_local_path(image_path) and not self.is_image_url(image_path):
                continue
                
            # 处理相对路径
            if self.is_local_path(image_path):
                if not os.path.isabs(image_path):
                    image_path = os.path.join(markdown_dir, image_path)
                    image_path = os.path.normpath(image_path)
                    
                if not os.path.exists(image_path):
                    logger.warning(f"本地图片不存在: {image_path}")
                    continue
                    
            images.append((original_link, image_path, alt_text))
        
        return images
    
    def process_markdown_file(self, markdown_file: str, output_file: str = None) -> bool:
        """处理markdown文件中的图片"""
        try:
            markdown_path = Path(markdown_file)
            markdown_dir = markdown_path.parent
            
            # 读取markdown文件
            with open(markdown_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 提取图片链接
            images = self.extract_images(content, str(markdown_dir))
            
            if not images:
                logger.info("未找到需要处理的图片")
                return True
            
            logger.info(f"找到 {len(images)} 个图片需要处理")
            
            # 处理每个图片
            replacements = {}
            
            with tempfile.TemporaryDirectory() as temp_dir:
                for original_link, image_path, alt_text in images:
                    try:
                        if self.is_local_path(image_path):
                            # 本地图片直接上传
                            cos_url = self.upload_to_cos(file_path=image_path)
                        else:
                            # 在线图片先下载再上传
                            filename, image_content = self.download_image(image_path)
                            cos_url = self.upload_to_cos(content=image_content, filename=filename)
                        
                        # 记录替换映射
                        new_link = f"![{alt_text}]({cos_url})"
                        replacements[original_link] = new_link
                        logger.info(f"处理成功: {image_path} -> {cos_url}")
                        
                    except Exception as e:
                        logger.error(f"处理图片失败 {image_path}: {e}")
                        continue
            
            # 替换内容中的链接
            updated_content = content
            for old_link, new_link in replacements.items():
                updated_content = updated_content.replace(old_link, new_link)
            
            # 保存更新后的文件
            output_path = output_file or markdown_file
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(updated_content)
            
            logger.info(f"处理完成，共替换 {len(replacements)} 个图片链接")
            return True
            
        except Exception as e:
            logger.error(f"处理markdown文件失败: {e}")
            return False


def main():
    """主函数示例"""
    # COS配置
    COS_CONFIG = {
        'secret_id': os.environ['TENCENT_CLOUD_SECRETID'],
        'secret_key': os.environ['TENCENT_CLOUD_SECRETKEY'], 
        'region': os.environ['TENCENT_CLOUD_REGION'],
        'bucket': os.environ['TENCENT_CLOUD_BUCKET'],
    }
    
    # 创建上传器实例
    uploader = MarkdownImageUploader(**COS_CONFIG)
    
    # 处理markdown文件
    markdown_file = '/Users/admiin/leyouBaloy.github.io/public/markdown/图表生成数据（Chart2data）实验——对比ChartVLM和Qwen-Omni.md'
    output_file = ''  # 可选，不指定则覆盖原文件
    
    success = uploader.process_markdown_file(markdown_file, output_file)
    
    if success:
        print("处理完成！")
    else:
        print("处理失败！")


if __name__ == '__main__':
    main()