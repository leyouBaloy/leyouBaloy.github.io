---
title: "Leetcode435:重叠区间——动态规划、贪心"
author: 孙百乐
date: 2022-03-20T17:41:58+08:00
draft: false
categories: 
- 刷题
---

## 题目

https://leetcode-cn.com/problems/non-overlapping-intervals/

这题我竟然一年前做过，第二遍再做的时候一点印象都没有。

看了下提交记录，发现一年前做的时候代码还是自己敲上去的，一年之后咋就什么都不会了呢？难道我的算法水平还不如一年前？？？

## 题解

做的时候思路跑偏了，总想着把有重叠的区间找出来剔除掉。换一个思路，可以去寻找不重叠的最大区间数`n`，然后拿`all-n`就是最小重叠区间的数量。

贪心的解法其实不难理解，只是不太容易想到（因为我是菜鸡qwq）：

思路：可以把这题的情境想象成一个`预定会议`问题，区间的左右两端就是会议的开始时间和结束时间，要求会议时间不能重叠，寻找一个能安排最多会议次数的序列。那么我们先找到最先结束的那个会议，放在最开头。然后从剩下的会议里找到最先结束的，同时开始时间不早于第一个会议结束时间的那个会议，放在第二个。以此类推...就完成啦。

实际做题的时候有个技巧，就是可以先按照会议结束的时间（即区间右端点）进行排序。这样代码会好写很多。

**上不是自己写的代码：**

```c++
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        if (intervals.empty()) {
            return 0;
        }
        
        sort(intervals.begin(), intervals.end(), [](const auto& u, const auto& v) {
            return u[1] < v[1];
        });

        int n = intervals.size();
        int right = intervals[0][1];
        int ans = 1;
        for (int i = 1; i < n; ++i) {
            if (intervals[i][0] >= right) {
                ++ans;
                right = intervals[i][1];
            }
        }
        return n - ans;
    }
};

作者：LeetCode-Solution
链接：https://leetcode-cn.com/problems/non-overlapping-intervals/solution/wu-zhong-die-qu-jian-by-leetcode-solutio-cpsb/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

复杂度分析：排序nlogn+遍历n，因为nlogn的幂次高，所以O(nlogn+n)=O(nlogn)，故时间复杂度O(nlogn)

空间复杂度：O(logn)，排序所需要的栈空间

还有一种**动态规划**的方法，是按照左端点进行排序，然后用`f[i]`表示「以区间 *i* 为最后一个区间，可以选出的区间数量的最大值」来进行状态转移。

代码比贪心复杂，时间复杂度也大一点，懒得去研究了。



