---
title: "Leetcode451:根据字符出现频率排序——桶排序"
author: 孙百乐
date: 2022-04-15T18:00:29+08:00
draft: false
categories: 
- 刷题
---

## 题目

https://leetcode-cn.com/problems/sort-characters-by-frequency/



## 题解

### 思路

用一个哈希map先统计每个字符出现的次数，然后再排序，最后拼接字符串。排序的方法多种多样，因为字符是有限的（26个小写，26个大写，0-9数字），所以使用桶排序是最好的选择。

### 桶排序

假设你对2，5，3三个数字排序，最大的数字是5，所以你拿来五个桶，从头到尾遍历这三个数字。然后把数字放在相同标号的桶里，比如第一个数字是2，就把它放在标号为2的桶里，5就放在标号为5的桶，3就放在标号为3的桶里。最后再把1号到5号桶遍历，空的跳过，就完成了排序。典型的空间换时间，当已知不会消耗很大的空间时，桶排序无非是效率最高的。

具体做法如下：

* 遍历字符串，统计每个字符出现的频率，同时记录最高频率maxFreq；

* 创建桶，存储从 11 到 maxFreq 的每个出现频率的字符；

* 按照出现频率从大到小的顺序遍历桶，对于每个出现频率，获得对应的字符，然后将每个字符按照出现频率拼接到排序后的字符串。

代码：

```c++
class Solution {
public:
    string frequencySort(string s) {
        unordered_map<char, int> mp;
        int maxFreq = 0;
        int length = s.size();
        for (auto &ch : s) {
            maxFreq = max(maxFreq, ++mp[ch]);
        }
        vector<string> buckets(maxFreq + 1);
        for (auto &[ch, num] : mp) {
            buckets[num].push_back(ch);
        }
        string ret;
        for (int i = maxFreq; i > 0; i--) {
            string &bucket = buckets[i];
            for (auto &ch : bucket) {
                for (int k = 0; k < i; k++) {
                    ret.push_back(ch);
                }
            }
        }
        return ret;
    }
};

```

> 作者：LeetCode-Solution
> 链接：https://leetcode-cn.com/problems/sort-characters-by-frequency/solution/gen-ju-zi-fu-chu-xian-pin-lu-pai-xu-by-l-zmvy/
> 来源：力扣（LeetCode）
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

时间复杂度：O*(*n*+*k)，其中 *n* 是字符串 *s* 的长度，*k* 是字符串 *s* 包含的不同字符的个数。

空间复杂度：O*(*n*+*k)





