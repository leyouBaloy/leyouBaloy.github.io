---
title: "Leetcode78:子集——递归、回溯——一道困扰我的题"
author: 孙百乐
date: 2022-03-29T16:46:07+08:00
draft: false
categories: 
- 刷题
---

## 题目

https://leetcode-cn.com/problems/subsets/

一道初中数学题，但是是很难的编程题。

## 题解

### 二进制枚举

​	集合`a={5,2,9}`中任何一个数有两种状态，在子集中或者不在子集中，分别用1和0来表示。所以我们可以进行如下编码：

| 二进制序列 | 子集    | 十进制数 |
| ---------- | ------- | -------- |
| 000        | {}      | 0        |
| 001        | {9}     | 1        |
| 010        | {2}     | 2        |
| 011        | {2,9}   | 3        |
| 100        | {5}     | 4        |
| 101        | {5,9}   | 5        |
| 110        | {5,2}   | 6        |
| 111        | {5,2,9} | 7        |

众所周知，如果一个集合的基数为n，那么它有2**n个子集。照上述列举就可以啦。

ps:这个方法真的很巧妙

代码也很值得学习：

```c++
class Solution {
public:
    vector<int> t;
    vector<vector<int>> ans;

    vector<vector<int>> subsets(vector<int>& nums) {
        int n = nums.size();
        for (int mask = 0; mask < (1 << n); ++mask) {
            t.clear();
            for (int i = 0; i < n; ++i) {
                if (mask & (1 << i)) {
                    t.push_back(nums[i]);
                }
            }
            ans.push_back(t);
        }
        return ans;
    }
};

作者：LeetCode-Solution
链接：https://leetcode-cn.com/problems/subsets/solution/zi-ji-by-leetcode-solution/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

代码讲解：

* 1<<n表示将二进制数0000 0001 左移n位，如果n=2，则结果为 0000 0100，转化成十进制就是2的n次方，在这题中2的n次方是子集的总数，也是需要枚举的次数。
* `mask`表示的就是咱的编码，是从0，1，2，...，到2的n次方，用的时候当然是用它的二进制形式。
* 里面的小循环是依次判断集合中的每个数是否为当前编码所需要的数。比如`mask=110`，`i=1`，那么`(1<<i)=010`，`mask&(1<<i) = 110&010 = 1 = true`所以第`i`个数是符合这个编码的数。这里用到了位运算。

时间复杂度：O(n x 2的n次方)，外循环2的n次方，内循环O(n)。

空间复杂度：O(n)，临时数组t

### dfs、回溯

从这道题开始理解回溯！

画一颗树，数根为`[]`，对于子集中的某个元素，左子树是添加这个元素，右子树是不加这个元素。构造这棵树如图（自己画的图有点丑）：

{{< figure src="https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/img/%E5%AD%90%E9%9B%86%E9%80%92%E5%BD%92%E6%A0%91.jpg" title="子集递归树" >}}

最后叶节点就是所需答案。

代码：

```c++
class Solution {
public:
    vector<int> t;
    vector<vector<int>> ans;

    void dfs(int cur, vector<int>& nums) {
        if (cur == nums.size()) { // 叶节点添加到ans
            ans.push_back(t);
            return;
        }
        t.push_back(nums[cur]); // 取这个元素
        dfs(cur + 1, nums);
        t.pop_back();	// 不取这个元素
        dfs(cur + 1, nums);
    }

    vector<vector<int>> subsets(vector<int>& nums) {
        dfs(0, nums);
        return ans;
    }
};

作者：LeetCode-Solution
链接：https://leetcode-cn.com/problems/subsets/solution/zi-ji-by-leetcode-solution/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

结合上面到图，深度优先搜索，先搜索最左侧的分支，最后到最右边。这个代码其实也是要看一会才能看懂...可能我就是菜。

时间复杂度和空间复杂度和二进制枚举一样。

### 回溯剪枝

上述递归过程可以看到很多节点是不必要的，剪枝就是通过增加一些条件，略过不必要的节点。有点难，不想研究了...
