---
title: "Leetcode560:和为K的子数组——前缀和、哈希表"
author: 孙百乐
date: 2022-04-09T12:08:07+08:00
draft: false
categories: 
- 刷题
---

## 题目

https://leetcode-cn.com/problems/subarray-sum-equals-k/

不能用滑动窗口，因为右指针不一定递增。不能用dp，会超时溢出。

## 题解

### 枚举法

枚举法会超时，但可以为我们提供思路。

考虑以`j`结尾和为` k` 的连续子数组个数，我们需要统计符合条件的下标 `i`的个数。在确定了`i`和`j`之后，如果我们再遍历求和，时间复杂度就达到了O(n的3次方)。实际上我们发现`sum([i:j]) = sum([i-1:j])-nums[i-1]`，这样递推地可以直接求和。时间复杂度降到了O(n的2次方)。

代码：

```c++
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        int size = nums.size();
        int cnt = 0;
        int sum = 0;
        for(int i=0;i<size;i++){
            sum = 0;
            for(int j=i;j<size;j++){
                sum += nums[j];
                if(sum==k){
                    cnt+=1;
                }
            }
        }
        return cnt;

    }
};
```

### 前缀和+哈希表

> 我们可以基于方法一利用数据结构进行进一步的优化，我们知道方法一的瓶颈在于对每个 i，我们需要枚举所有的 j 来判断是否符合条件，这一步是否可以优化呢？答案是可以的。
>
> 我们定义 pre[i] 为 0..i 里所有数的和，则 pre[i] 可以由 pre[i−1] 递推而来，即：
> pre[i]=pre[i−1]+nums[i]
>
> 那么 j..i 这个子数组和为 k 这个条件我们可以转化为
> pre[i]−pre[j−1]==k
>
> 简单移项可得符合条件的下标 j 需要满足
> pre[j−1]==pre[i]−k
>
> 所以我们考虑以 i 结尾的和为 k 的连续子数组个数时只要统计有多少个前缀和为 pre[i]−k 的 pre[j] 即可。我们建立哈希表 mp，以和为键，出现次数为对应的值，记录 pre[i] 出现的次数，从左往右边更新 mp 边计算答案，那么以 i 结尾的答案 mp[pre[i]−k] 即可在 O(1) 时间内得到。最后的答案即为所有下标结尾的和为 k 的子数组个数之和。
>
> 需要注意的是，从左往右边更新边计算的时候已经保证了mp[pre[i]−k] 里记录的 pre[j] 的下标范围是 0≤j≤i 。同时，由于 pre[i] 的计算只与前一项的答案有关，因此我们可以不用建立 pre 数组，直接用 pre 变量来记录 pre[i−1] 的答案即可。

AC代码：

```c++
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> mp;
        mp[0] = 1;
        int cnt=0, pre=0;
        for(auto& x:nums){
            pre += x;
            if(mp.find(pre-k)!=mp.end()){
                cnt += mp[pre-k];
            }
            mp[pre]++;
        }
        return cnt;
    }
};
```

实际上这道题的细节我花了很多时间去想，但到现在也没弄懂，先放在这里留个问号吧。
