# Leetcode39:组合总和——回溯

> 发布于：2022-05-06 | 分类：刷题 | 原文：https://leyoubaloy.github.io/post/leetcode-39-combination-sum-backtracking

## 题目

https://leetcode-cn.com/problems/combination-sum/

做回溯题就像见老同学，你觉得它还像以前一样简单，但是你错了😭

## 题解

### 搜索回溯

思路：对于`candidates`中的每一个数你有两个选项，要么选，要么不选。所以回溯的过程是一颗二叉树，用`idx`表示下标，左子树表示选择第`idx`个数放入路径，右子树不选择。如果不选择，下一次是`idx+1`，如果选择，下一次仍然是`idx`，这样可以做到重复选择一个数，但最终结果不会有数字相同但顺序不同的情况。

先看代码：

```python
class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        path = []
        res = []
        def backtrack(target, idx):
            if idx > len(candidates)-1:
                return
            print("tar",target,"n",candidates[idx],"path",path)
            
            if target == 0:
                res.append(path.copy())
                return
            
            # 不选择
            backtrack(target, idx+1) 
            # 选择
            if target-candidates[idx]>=0:
                path.append(candidates[idx])
                backtrack(target-candidates[idx], idx)
                path.pop()

        backtrack(target, 0)
        return res
```

标准的回溯模板，但又充满了细节：

* return要放在合适的位置
* 不选择的时候idx+1，选择的时候idx不+1

再看这张图就能理解了：

{{< figure src="https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/img/39_fig1.png" >}}
