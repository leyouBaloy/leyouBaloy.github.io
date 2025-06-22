---
categories:
- 笔记
- 技能分享
date: 2025-06-22 08:49:55
title: 手撕Attention
img: 
---


### 第一重境界
最简单的计算 Attention(Q, K, V) = softmax(Q*K.T/sqrt(hidden_dim))*V
```
import math
import torch
import torch.nn as nn

class SelfAttentionV1(nn.Module):
    def __init__(self, hidden_dim:int= 768) -> None:
        super().__init__()
        self.hidden_dim = hidden_dim
        self.query_proj = nn.Linear(hidden_dim, hidden_dim)
        self.key_proj = nn.Linear(hidden_dim, hidden_dim)
        self.value_proj = nn.Linear(hidden_dim, hidden_dim)

    def forward(self, X):
        # X: (batch_size, seq_len, hidden_dim)
        Q = self.query_proj(X)
        K = self.key_proj(X)
        V = self.value_proj(X) # Q, K, V: (batch_size, seq_len, hidden_dim)
        attention_weight = torch.softmax(Q @ K.transpose(-2, -1) / math.sqrt(self.hidden_dim), dim=-1) # K变成 (batch_size, hidden_dim, seq_len), attention_weight: (batch_size, seq_len, seq_len)
        output = attention_weight @ V # output: (batch_size, seq_len, hidden_dim)
        return output
```

### 第二重境界
用一个大矩阵同时生成Q, K, V
```
# 大投影矩阵
class SelfAttentionV2(nn.Module):
    def __init__(self, hidden_dim:int= 768) -> None:
        super().__init__()
        self.hidden_dim = hidden_dim
        self.proj = nn.Linear(hidden_dim, hidden_dim*3) # 用一个proj,提高速度

    def forward(self, X):
        QKV = self.proj(X) # QKV: (batch_size, seq_len, hidden_dim*3)
        Q, K, V = torch.split(QKV, self.hidden_dim, dim=-1)
        attention_weight = torch.softmax(Q @ K.transpose(-2, -1) / math.sqrt(self.hidden_dim), dim=-1)
        output = attention_weight @ V 
        return output
```

### 第三重境界
attention_mask作用：把短句子多余的部分mask掉

attention_mask作用于Q*K.T/sqrt(hidden_dim)之后

dropout作用于softmax(Q*K.T/sqrt(hidden_dim))之后，因为dropout是对概率进行操作的
```
# 1. drop_out位置
# 2. attention_mask
class SelfAttentionV3(nn.Module):
    def __init__(self, hidden_dim:int= 768, dropout_rate=0.1) -> None:
        super().__init__()
        self.hidden_dim = hidden_dim
        self.proj = nn.Linear(hidden_dim, hidden_dim*3)
        self.attention_dropout = nn.Dropout(dropout_rate)

    def forward(self, X, attention_mask = None): # attention_mask: (batch_size, seq_len, seq_len)
        QKV = self.proj(X)
        Q, K, V = torch.split(QKV, self.hidden_dim, dim=-1)
        attention_weight = Q @ K.transpose(-2, -1) / math.sqrt(self.hidden_dim)
        if attention_mask is not None:
            attention_weight = attention_weight.masked_fill(attention_mask==0, float('-inf')) # 在Q@K.T之后,softmax之前加attention_mask
        attention_weight = torch.softmax(attention_weight, dim=-1)
        attention_weight = self.attention_dropout(attention_weight) # 对softmax之后的attention_weight做dropout
        output = attention_weight @ V 
        return output
```
输出：
```
if __name__ == "__main__":
    X = torch.randn(3, 2, 4)
    net1 = SelfAttentionV1(hidden_dim=4)
    net2 = SelfAttentionV2(hidden_dim=4)
    output1 = net1(X)
    output2 = net2(X)
    print(output1.shape)
    print(output2.shape)

    X = torch.randn(3, 4, 2)
    mask = torch.tensor([
        [1, 1, 1, 0],
        [1, 1, 0, 0],
        [1, 0, 0, 0],
    ]) # (batch_size, seq_len)
    mask = mask.unsqueeze(dim=1).repeat(1, 4, 1) # repeat的参数(重复1次, 重复4次, 重复1次) (batch_size, seq_len, seq_len)
    net3 = SelfAttentionV3(hidden_dim=2)
    output3 = net3(X)
    print(output3.shape)
```

### 第四重境界 Multi-Head Attention

Multi-Head Attention：将hidden_dim分成多个头，每个头独立计算attention，最后合并结果

```
class SelfAttentionV4(nn.Module):
    def __init__(self, hidden_dim:int= 768, num_heads=0, dropout_rate=0.1) -> None:
        super().__init__()
        self.hidden_dim = hidden_dim
        self.num_heads = num_heads
        self.head_dim = hidden_dim // num_heads
        self.proj = nn.Linear(hidden_dim, hidden_dim*3)
        self.out_proj = nn.Linear(hidden_dim, hidden_dim)
        self.attention_dropout = nn.Dropout(dropout_rate)

    def forward(self, X, attention_mask = None):
        batch_size, seq_len, _ = X.shape
        QKV = self.proj(X)
        Q, K, V = torch.split(QKV, self.hidden_dim, dim=-1)

        # 重塑为多头格式: (batch_size, seq_len, num_heads, head_dim)
        Q = Q.view(batch_size, seq_len, self.num_heads, self.head_dim)
        K = K.view(batch_size, seq_len, self.num_heads, self.head_dim)
        V = V.view(batch_size, seq_len, self.num_heads, self.head_dim)

        # 转置为: (batch_size, num_heads, seq_len, head_dim)
        Q = Q.transpose(1, 2)
        K = K.transpose(1, 2)
        V = V.transpose(1, 2)

        attention_weight = Q @ K.transpose(-2, -1) / math.sqrt(self.hidden_dim)
        if attention_mask is not None:
            # 扩展mask维度以匹配多头: (batch_size, 1, seq_len, seq_len)
            attention_mask = attention_mask.unsqueeze(1)
            attention_weight = attention_weight.masked_fill(attention_mask==0, float('-inf')) 
        attention_weight = torch.softmax(attention_weight, dim=-1)
        attention_weight = self.attention_dropout(attention_weight)
        output = attention_weight @ V 

        # 合并多头结果
        output = output.transpose(1, 2)  # (batch_size, seq_len, num_heads, head_dim)
        output = output.contiguous().view(batch_size, seq_len, self.hidden_dim)  # (batch_size, seq_len, hidden_dim)
        return output

# 测试第四重境界：Multi-Head Attention
X = torch.randn(2, 8, 12)  # (batch_size=2, seq_len=8, hidden_dim=12)
mask = torch.ones(2, 8, 8)  # 全1的mask，表示所有位置都有效
net4 = SelfAttentionV4(hidden_dim=12, num_heads=4)  # 12维分成4个头，每个头3维
output4 = net4(X, attention_mask=mask)
print(f"Multi-Head Attention output shape: {output4.shape}")  # torch.Size([2, 8, 12])
```

