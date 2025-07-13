---
categories:
- 随笔杂记
- 技能分享
date: 2025-07-13 09:25:50
title: RAG图谱实体和边智能合并
img: 
---

# RAG图谱实体和边智能合并

## 调研

**graphRAG**

方法：精确字符匹配

对具有相同title和type的实体进行合并，直接将description相加

对具有相同source和target的边进行合并，直接将description相加



优点：速度快

缺点：精度低，比如“苹果公司”和“Apple Inc”无法合并



graphrag/index/operations/extract_graph/extract_graph.py => _merge_entities, _merge_relationships



**Graphusion**

![](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com//img1752398862313-32e9ba22-ac09-48bc-a806-3c72d70f97b0.png)

每个候选实体都传给LLM，让 LLM判断跟现有图谱判断是否需要合并。

Prompt

![](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com//img1752398862562-e82e9568-bcf9-4cd0-86f8-6470ca577209.png)

![](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com//img1752398862766-ec4f9694-922c-4b4e-8291-923bfae4e98b.png)



优点：精度高

缺点：速度慢



Yang R, Yang B, Zhao X, et al. Graphusion: A RAG Framework for Scientific Knowledge Graph Construction with a Global Perspective[C]//Companion Proceedings of the ACM on Web Conference 2025. 2025: 2579-2588.



**RagFlow**

实体合并是知识图谱构建的重要环节，重复实体会降低检索准确性。RagFlow 在 graphrag/entity_resolution.py 中实现实体合并，采用两步策略：

初步相似度判断：使用编辑距离等工程手段筛选相似实体，基于 编辑距离（[<font style="color:#003884;">editdistance</font>](https://link.zhihu.com/?target=https%3A//github.com/roy-ht/editdistance)） 实现；阈值：<font style="color:#000000;">要求距离小于等于名称长度的一半；</font>

大模型相似度判断：确定最终的实体合并结果；

初步相似度判断主要用于减少候选实体对的数量。虽然基于大模型的相似度判断准确性更高，但会带来较大的计算开销，这也是 RagFlow 提供手动关闭选项的主要原因。

编辑距离：一个字符串转换为另一个字符串所需的最少编辑次数（编辑包括增加删除和替换）



优点：速度快，精度比精确匹配好一点

缺点：匹配只停留在字符串层面，还是处理不了苹果公司和Apple Inc



[<font style="color:#003884;">https://zhuanlan.zhihu.com/p/1891156928022939096</font>](https://zhuanlan.zhihu.com/p/1891156928022939096)

## 方案



**方案一**

把若干个待插入实体/边和已插入实体/边一次性发给简单大模型，让它直接判断有哪些可以合并。

分析：相比于一次只处理一个待插入节点提升了速度，但速度仍然不快，精度也不一定高。更关键的是很难控制上下文长度，长文档很难处理。



**方案二**

对实体/边做embedding存到向量数据库，新插入实体/边先找最相似的若干个候选（初筛），再对这些候选做rerank(中筛)，最后给简单大模型判断（详筛）。

分析：跟文档检索的逻辑差不多，可行性比较高。

## 实验

**思路**

v1：直接名字匹配，相同名字的合并。节点和边都执行此逻辑。



v2：合并节点：对于名字相同的，直接合并。对于名字不相同的，根据语义合并：

初筛：先通过embedding搜索相关文档，top_k=10，相似度阈值0.6；

中筛：再对初筛结果做rerank，相关性阈值设为0.6；

判定：最后用LLM做判断，看是否能合并，怎么合并。

合并边：跟v1一样，直接名字匹配。因为边的名字是(source_node, target_node)。当(source_node, target_node)不同时，语义肯定不重复。在(source_node, target_node)相同的情况下，v1即可处理。



合并细节：合并在已有节点上进行。假设已有节点A，待合并节点A1，合并结果在A上更新，更新A的description和doc_ids，不更新weight和name。然后要对节点A的节点文档更新，由于存储节点文档索引的faiss不支持更新，需要先删除再添加节点。还需要对A1涉及到的边进行更新。

**实验数据**

准备了两段描述，有中文版和英文版：

|  | 中文版 | 英文版 |
| --- | --- | --- |
| 文案 | 苹果公司作为全球顶尖的科技企业，在产品生态构建上独树一帜。其核心产品 iPhone、Mac 等，在市场中占据着重要地位。英特尔，长期以来是全球半导体行业的重要力量，尤其在 PC 和服务器 CPU 领域，以 x86 架构统治市场多年。曾经，英特尔为苹果的 Mac 系列产品供应 CPU 芯片 ，二者构建起供应关系的连接。但随着苹果自研 M 系列芯片的推出，逐渐降低了对英特尔芯片的依赖，从合作走向一定程度的竞争。<br/><br/>高通，在通信芯片领域实力强劲，特别是在手机基带芯片方面占据领先地位。苹果与高通的关系可谓跌宕起伏。早期，高通是苹果 iPhone 基带芯片的重要供应商 ，二者通过供应协议建立联系。然而，由于高通专利授权费用等问题，双方产生纠纷，在全球多地展开诉讼，诉讼纠纷的边将二者对立起来。后来，苹果为解决基带芯片问题，与高通达成和解，恢复供应合作。同时，苹果收购英特尔手机基带业务，利用其技术专利尝试自研基带芯片，又与高通在基带芯片研发上形成潜在竞争关系。 | As a global leading technology company, Apple stands out in building its product ecosystem. Its core products, such as the iPhone and Mac, hold significant positions in the market. Intel has long been a major force in the global semiconductor industry, especially in the PC and server CPU sectors, dominating the market for years with its x86 architecture. Intel once supplied CPU chips for Apple's Mac series, establishing a supply relationship between the two companies. However, with the introduction of Apple's self-developed M-series chips, its dependence on Intel chips gradually decreased, shifting from cooperation to a certain degree of competition.<br/><br/>Qualcomm is highly competitive in the communication chip field, particularly leading in mobile baseband chips. The relationship between Apple and Qualcomm has been full of ups and downs. In the early days, Qualcomm was an important supplier of baseband chips for Apple's iPhones, connecting the two through supply agreements. However, due to issues such as Qualcomm's patent licensing fees, disputes arose between the two parties, leading to lawsuits in many parts of the world and creating an adversarial relationship. Later, to resolve the baseband chip issue, Apple reached a settlement with Qualcomm and resumed supply cooperation. Meanwhile, Apple acquired Intel's mobile baseband business, leveraging its technical patents to attempt self-development of baseband chips, thus forming a potential competitive relationship with Qualcomm in baseband chip R&D.  |
| 图谱 | ![](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com//img1752399030365-2052e559-2269-497d-90ab-f61c4de49153.png)<br/> | ![](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com//img1752399030557-95a987db-dd45-43f4-9dfd-ffcb490ccfec.png)<br/> |




**实验结果**

llm: deepseek v3

qwen 4b一样

**case1**

待合并节点

```
{'node_name': 'APPLE', 'node_type': 'r', 'node_description': "Intel once supplied CPU chips for Apple's Mac series, but with the introduction of Apple's M-series chips, the relationship shifted from cooperation to competition.", 'node_doc_ids_str': '8a7f10ab57be4a90af17306acf3aba30_0', 'node_id': 'KB227d8e734d484c8a98d098aa97c62a23_240625_node_APPLE', 'node_weight': 4}
```

=> 搜索nodes，top_k=10，阈值0.6

```
[Document(page_content='苹果公司 :: 苹果公司曾使用英特尔的CPU芯片，但随着自研M系列芯片的推出，逐渐降低了对英特尔的依赖。', metadata={'node_name': '苹果公司', 'node_type': 'r', 'node_doc_ids_str': 'f6a81951a15745ed8ca790c170bd9c78_0', 'node_id': 'KB227d8e734d484c8a98d098aa97c62a23_240625_node_苹果公司', 'user_id': '13003010978', 'kb_id': 'KB227d8e734d484c8a98d098aa97c62a23_240625', 'file_id': 'KB227d8e734d484c8a98d098aa97c62a23_240625_node_苹果公司', 'file_name': '苹果公司.node', 'score': 0.4179519}), 

Document(page_content='MAC :: Mac是苹果公司的核心产品之一，曾使用英特尔的CPU芯片。', metadata={'node_name': 'MAC', 'node_type': 'OBJECT', 'node_doc_ids_str': 'f6a81951a15745ed8ca790c170bd9c78_0', 'node_id': 'KB227d8e734d484c8a98d098aa97c62a23_240625_node_MAC', 'user_id': '13003010978', 'kb_id': 'KB227d8e734d484c8a98d098aa97c62a23_240625', 'file_id': 'KB227d8e734d484c8a98d098aa97c62a23_240625_node_MAC', 'file_name': 'MAC.node', 'score': 0.5149536}), 

Document(page_content='M系列芯片 :: M系列芯片是苹果自研的CPU芯片，逐渐降低了对英特尔芯片的依赖。', metadata={'node_name': 'M系列芯片', 'node_type': 'OBJECT', 'node_doc_ids_str': 'f6a81951a15745ed8ca790c170bd9c78_0', 'node_id': 'KB227d8e734d484c8a98d098aa97c62a23_240625_node_M系列芯片', 'user_id': '13003010978', 'kb_id': 'KB227d8e734d484c8a98d098aa97c62a23_240625', 'file_id': 'KB227d8e734d484c8a98d098aa97c62a23_240625_node_M系列芯片', 'file_name': 'M系列芯片.node', 'score': 0.51644546}), 
```

=> rerank，阈值为0.6

```
[Document(page_content='苹果公司 :: 苹果公司曾使用英特尔的CPU芯片，但随着自研M系列芯片的推出，逐渐降低了对英特尔的依赖。', metadata={'node_name': '苹果公司', 'node_type': 'r', 'node_doc_ids_str': 'f6a81951a15745ed8ca790c170bd9c78_0', 'node_id': 'KB227d8e734d484c8a98d098aa97c62a23_240625_node_苹果公司', 'user_id': '13003010978', 'kb_id': 'KB227d8e734d484c8a98d098aa97c62a23_240625', 'file_id': 'KB227d8e734d484c8a98d098aa97c62a23_240625_node_苹果公司', 'file_name': '苹果公司.node', 'score': 0.6208848357200623, 'rerank_index': 0})]
```

LLM判断

```
{'can_merge': True, 

'old_name': '苹果公司', 

'merged_description': 'Apple是全球领先的科技公司，以产品生态系统著称，核心产品包括iPhone和Mac。它在市场中占据重要地位，并曾与Intel和Qualcomm在半导体和通信芯片领域有合作。', 

'merged_name': 'APPLE', 

'merged_type': 'ORGANIZATION', 

'merge_reason': "候选节点'苹果公司'与待处理节点'APPLE'语义一致，均指代同一家全球领先的科技企业，描述内容高度重合，可合并为统一节点。"}
```


**case2**

待处理节点node_data: 

```
{'node_name': 'QUALCOMM', 'node_type': 'ORGANIZATION', 'node_description': 'Qualcomm is highly competitive in the communication chip field, particularly leading in mobile baseband chips, and has had a fluctuating relationship with Apple.', 'node_doc_ids_str': 'a17091b4a8d946a6ad76c14a05e7261a_0', 'node_id': 'KBe969109e75d541a5af10df00850df626_240625_node_QUALCOMM', 'node_weight': 1}
```

=> 搜索nodes，阈值0.6，最多10个：

```
[Document(page_content="BASEBAND_CHIPS :: Baseband chips are a key component in mobile communication, with Qualcomm leading in this field and Apple attempting self-development.Baseband chips are a key component in mobile communication, with Qualcomm leading in this field and Apple attempting self-development after acquiring Intel's mobile baseband business.Baseband chips are communication chips used in mobile devices, with Qualcomm being a leading supplier.Baseband chips are a type of communication chip where Qualcomm leads, and Apple has attempted self-development in this area after acquiring Intel's mobile baseband business.Baseband chips are crucial for mobile communication. Qualcomm leads in this field, and Apple has both collaborated and competed with Qualcomm in this area.", metadata={'node_name': 'BASEBAND_CHIPS', 'node_type': 'OBJECT', 'node_doc_ids_str': 'bc5a3b50ec7849b4b43c5930a6f9b4e5_0', 'node_id': 'KBe969109e75d541a5af10df00850df626_240625_node_BASEBAND_CHIPS', 'user_id': 'user__13003010978', 'kb_id': 'KBe969109e75d541a5af10df00850df626_240625', 'file_id': 'KBe969109e75d541a5af10df00850df626_240625_node_BASEBAND_CHIPS', 'file_name': 'BASEBAND_CHIPS.node', 'score': 0.48072812}), 

Document(page_content="BASEBAND_CHIPS :: Baseband chips are a key component in mobile communication, with Qualcomm leading in this field and Apple attempting self-development.Baseband chips are a key component in mobile communication, with Qualcomm leading in this field and Apple attempting self-development after acquiring Intel's mobile baseband business.Baseband chips are communication chips used in mobile devices, with Qualcomm being a leading supplier.Baseband chips are a type of communication chip where Qualcomm leads, and Apple has attempted self-development in this area after acquiring Intel's mobile baseband business.Baseband chips are crucial for mobile communication. Qualcomm leads in this field, and Apple has both collaborated and competed with Qualcomm in this area.", metadata={'node_name': 'BASEBAND_CHIPS', 'node_type': 'OBJECT', 'node_doc_ids_str': 'bc5a3b50ec7849b4b43c5930a6f9b4e5_0', 'node_id': 'KBe969109e75d541a5af10df00850df626_240625_node_BASEBAND_CHIPS', 'user_id': 'user__13003010978', 'kb_id': 'KBe969109e75d541a5af10df00850df626_240625', 'file_id': 'KBe969109e75d541a5af10df00850df626_240625_node_BASEBAND_CHIPS', 'file_name': 'BASEBAND_CHIPS.node', 'score': 0.48072812}), 
```

rerank，阈值设定为0.6

```
[Document(page_content="BASEBAND_CHIPS :: Baseband chips are a key component in mobile communication, with Qualcomm leading in this field and Apple attempting self-development.Baseband chips are a key component in mobile communication, with Qualcomm leading in this field and Apple attempting self-development after acquiring Intel's mobile baseband business.Baseband chips are communication chips used in mobile devices, with Qualcomm being a leading supplier.Baseband chips are a type of communication chip where Qualcomm leads, and Apple has attempted self-development in this area after acquiring Intel's mobile baseband business.Baseband chips are crucial for mobile communication. Qualcomm leads in this field, and Apple has both collaborated and competed with Qualcomm in this area.", metadata={'node_name': 'BASEBAND_CHIPS', 'node_type': 'OBJECT', 'node_doc_ids_str': 'bc5a3b50ec7849b4b43c5930a6f9b4e5_0', 'node_id': 'KBe969109e75d541a5af10df00850df626_240625_node_BASEBAND_CHIPS', 'user_id': 'user__13003010978', 'kb_id': 'KBe969109e75d541a5af10df00850df626_240625', 'file_id': 'KBe969109e75d541a5af10df00850df626_240625_node_BASEBAND_CHIPS', 'file_name': 'BASEBAND_CHIPS.node', 'score': 0.6926110982894897, 'rerank_index': 1}), 

Document(page_content="BASEBAND_CHIPS :: Baseband chips are a key component in mobile communication, with Qualcomm leading in this field and Apple attempting self-development.Baseband chips are a key component in mobile communication, with Qualcomm leading in this field and Apple attempting self-development after acquiring Intel's mobile baseband business.Baseband chips are communication chips used in mobile devices, with Qualcomm being a leading supplier.Baseband chips are a type of communication chip where Qualcomm leads, and Apple has attempted self-development in this area after acquiring Intel's mobile baseband business.Baseband chips are crucial for mobile communication. Qualcomm leads in this field, and Apple has both collaborated and competed with Qualcomm in this area.", metadata={'node_name': 'BASEBAND_CHIPS', 'node_type': 'OBJECT', 'node_doc_ids_str': 'bc5a3b50ec7849b4b43c5930a6f9b4e5_0', 'node_id': 'KBe969109e75d541a5af10df00850df626_240625_node_BASEBAND_CHIPS', 'user_id': 'user__13003010978', 'kb_id': 'KBe969109e75d541a5af10df00850df626_240625', 'file_id': 'KBe969109e75d541a5af10df00850df626_240625_node_BASEBAND_CHIPS', 'file_name': 'BASEBAND_CHIPS.node', 'score': 0.6926110982894897, 'rerank_index': 1})]
```

llm判定:

```

 {     "can_merge": false

 } 
 ```

**最终结果**

合并前

![](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com//img1752399030721-7fdda6f6-55e1-4840-9464-fe07bad45b2c.png)



![](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com//img1752399030890-d1affdad-704b-4d54-8848-d9213279fcf5.png)

合并后

![](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com//img1752399031083-8321833f-713c-483b-863c-004a3b8c7140.png)

**性能**


总记录数: 731

需要Merge的记录数: 32

不需要Merge的记录数: 699

总Merge时间(f): 319.18s

平均Merge时间: 0.44s

实际Merge平均时间（只统计需要merge的）: 7.73s

















