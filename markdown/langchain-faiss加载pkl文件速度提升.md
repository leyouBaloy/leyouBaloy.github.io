---
categories:
- 技能分享
date: 2025-12-14 06:19:28
title: langchain-faiss加载pkl文件速度提升
img: 
---

# langchain-faiss加载pkl文件速度提升

## 背景

Faiss是一个非常好用的本地向量检索库，它常和langchain一起使用，也被内置于langchain中。

langchain_community.vectorstores中的Faiss写入一个向量库中包含两个文件：index.faiss和index.pkl。前者用来存储索引（或者说向量本身），后者用来存储元数据。Faiss在执行检索操作时，会先把这两个文件加载到内存里，问题出在pkl文件上，当数据量小时，加载时间不显著，而当数据量很大时，pkl加载时间会很长，严重影响使用体验。

举个我实际测试的例子，一个有437,673个向量的向量库，读取时间长达24.26秒。这个向量库是用来做RAG问答的，里面存了2934个文档的切片，每次检索都得等好久，客户想检索速度尽可能快一些，这个需求是真实存在的。

把pkl替换为pyarrow能解决这个问题。PyArrow 比 pickle 快核心原因有三点：一是基于**列式存储**，同类型数据连续存放，适配 CPU 缓存和 SIMD 批量处理，而 pickle 行式序列化无此优化；二是**零拷贝**机制和 C++ 原生实现，避免 Python 解释器开销与多次数据拷贝；三是强类型系统省去动态类型解析，列式压缩也比 pickle 的整流压缩更高效。

## 代码

重写langchain_community.vectorstores中的FAISS类的save_local和load_local方法

```
  def save_local(self, folder_path: str, index_name: str = "index") -> None:
      path = Path(folder_path)
      path.mkdir(exist_ok=True, parents=True)

      faiss = dependable_faiss_import()
      faiss.write_index(self.index, str(path / f"{index_name}.faiss"))

      # 1. docstore → Arrow
      docstore_dict = self.docstore._dict
      ids = list(docstore_dict.keys())
      contents = [doc.page_content for doc in docstore_dict.values()]
      metadatas = [json.dumps(doc.metadata, ensure_ascii=False) for doc in docstore_dict.values()]

      table = pa.table({
          "id": pa.array([str(i) for i in ids], type=pa.string()),
          "page_content": pa.array(contents, type=pa.string()),
          "metadata": pa.array(metadatas, type=pa.string())
      })
      with ipc.RecordBatchFileWriter(str(path / f"{index_name}.arrow"), table.schema) as writer:
          writer.write_table(table)

      # 2. index_to_docstore_id → Parquet
      if isinstance(self.index_to_docstore_id, dict):
          id_list = [str(self.index_to_docstore_id[i]) for i in sorted(self.index_to_docstore_id.keys())]
      else:
          id_list = [str(i) for i in self.index_to_docstore_id]

      pq.write_table(pa.table({"ids": id_list}), str(path / f"{index_name}.parquet"))
```

```
  @classmethod
  def load_local(
      cls,
      folder_path: str,
      embeddings: Embeddings,
      index_name: str = "index",
      *,
      allow_dangerous_deserialization: bool = False,  # 保留参数兼容，但不再使用
      **kwargs: Any,
  ) -> "FAISSArrow":
      path = Path(folder_path)

      # 读取faiss索引文件（跟原版一致）
      faiss = dependable_faiss_import()
      index = faiss.read_index(str(path / f"{index_name}.faiss"))

      arrow_file = path / f"{index_name}.arrow"
      parquet_file = path / f"{index_name}.parquet"
      pkl_file = path / f"{index_name}.pkl"

      # 优先使用 Arrow 格式，不存在则回退到 pkl
      if arrow_file.exists() and parquet_file.exists():
          # 1. Arrow → docstore
          reader = ipc.RecordBatchFileReader(pa.memory_map(str(path / f"{index_name}.arrow"), 'r'))
          table = reader.read_all()

          docs = {}
          for i in range(table.num_rows):
              doc_id = table["id"][i].as_py()
              docs[doc_id] = Document(
                  page_content=table["page_content"][i].as_py(),
                  metadata=json.loads(table["metadata"][i].as_py() or "{}")
              )
          docstore = InMemoryDocstore(docs)

          # 2. Parquet → index_to_docstore_id
          idmap_table = pq.read_table(str(path / f"{index_name}.parquet"), memory_map=True)
          index_to_docstore_id = {i: v for i, v in enumerate(idmap_table["ids"].to_pylist())}
      else:
          with open(path / f"{index_name}.pkl", "rb") as f:
              docstore, index_to_docstore_id = pickle.load(f)

      return cls(embeddings, index, docstore, index_to_docstore_id, **kwargs)
```

