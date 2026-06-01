# 数据结构与算法实习第二阶段

> 发布于：2022-07-02 | 分类：刷题, 笔记 | 原文：https://leyoubaloy.github.io/post/dfbba3ac

## 7-1 Table Tennis

**知识点**：模拟，队列

**思路**：把所有玩家按到达顺序排序，逐个处理，分如下情况：

* 找到所有桌子中最早结束当前服务的桌子。判断：如果这个桌子当前服务的结束时间超过9点，那剩下的玩家都不用处理了，不可能被服务。否则再继续下面的过程。
  * 如果这个桌子是为vip预留的：
    * 这个人是普通人，除非他后面没有vip到来，桌子才给他用
    * 如果这个人是vip，这个桌子分配给他。 处理下一个人
  * 如果这个桌子是普通桌子：
    * 如果这个人是普通人，那么这个桌子分配给他。处理下一个人
    * 如果这个人是vip，首先去看在他来之前有没有空下来的vip桌子，如果有，就让他去那个vip桌子，如果没有，就把这个普通桌子给他用。处理下一个人。

**细节**：

* 时间以从0点经过的秒数存储
* 结构体数组`customers[10005]`储存顾客，字段有：到达时间`arriveTime`，开始被服务时间 `startTime`，玩耍时间 `playTime` ，是否VIP`isVip`，是否被服务过 `isServed`
* 结构体数组`table[105]`储存桌子，字段有：结束服务的时间`endTime`，服务顾客数`serveCount`，是否VIP`isVip`
* 排序 —> 借用第一阶段第五题的堆排序，将`cmp`函数作为参数传进去

* 这题细节太多了，看代码注释

```c++
    #include<iostream>

    const int intMAX = 0x3f3f3f3f;
    using namespace std;

    // 俱乐部开门时间，以 s 为单位
    const int club_open_time = 3600 * 8;
    // 俱乐部关门时间，以 s 为单位
    const int club_close_time = 3600 * 21;


    struct Customers {
        int arriveTime, startTime, playTime; // 到达时间，开始时间，玩耍时间
        bool isVip, isServed = false; // 是否是 vip，是否被服务过了
    }customer[10005];

    struct Table {
        // 刚开始全是8:00开始服务
        int endTime = club_open_time, serveCount = 0; // 当前服务结束时间，已服务玩家个数
        bool isVip = false; // 是否是为vip预留的桌子
    }table[105];

    // 按到达的先后顺序排队
    bool cmp_by_arrive(Customers a, Customers b) { return a.arriveTime < b.arriveTime; }
    // 输出时，按被服务时间排序
    bool cmp_by_starttime(Customers a, Customers b) { return a.startTime < b.startTime; }

    void Heapify(Customers arr[], int n, int i, bool (*cmp)(Customers a, Customers b)){
        // arr 存储堆的数组，n 数组长度， i 维护节点的下标
        int largest = i; // 假设最大节点
        int lson = 2 * i + 1;
        int rson = 2 * i + 2;

        if (lson < n && cmp(arr[largest], arr[lson])){
            largest = lson;
        }
        if (rson < n && cmp(arr[largest], arr[rson])){
            largest = rson;
        }
        if(largest != i){
            Customers tmp;
            tmp = arr[largest];
            arr[largest] = arr[i];
            arr[i] = tmp;
            Heapify(arr, n, largest, cmp);
        }
    }

// 堆排序入口
    void HeapSort(Customers arr[], int n, bool (*cmp)(Customers a, Customers b)){
        // 建堆，从底往上构建
        int i;
        for(i = n / 2 - 1; i >= 0; i--){ // 从最后一个元素的父节点开始
            Heapify(arr, n, i, cmp);
        }
        // 排序
        for(i = n - 1; i > 0; i--){
            Customers tmp;
            tmp = arr[i];
            arr[i] = arr[0];
            arr[0] = tmp;
            Heapify(arr, i, 0, cmp);
        }
    }


    // 将某个桌子提供给某个顾客
    void AssignTable( int tab_id, int cus_id ) {
    //    cout << "tab_id " << tab_id << " cus_id " <<  cus_id << endl;
        // 玩家来的时候，这个桌子已空闲，玩家可以直接开始玩
        if (table[tab_id].endTime <= customer[cus_id].arriveTime) {
            customer[cus_id].startTime = customer[cus_id].arriveTime;
        } else {
            // 玩家来的时候这个桌子还在服务上一个人，需要等它当前服务结束
            // 所以玩家开始玩的时间应该是这个桌子当前服务结束的时间
            customer[cus_id].startTime = table[tab_id].endTime;
        }
        // 开始新的服务，更新这个桌子当前服务的结束时间
        table[tab_id].endTime = customer[cus_id].startTime + customer[cus_id].playTime;
        // 这个桌子的服务人数增加
        table[tab_id].serveCount++;
    }

    // 找到这个人后面第一个会员未被服务的会员
    // N,总顾客数
    int FindNextVip(int cus_id, int N) {
        cus_id += 1;
        while ( cus_id < N ) {
            // 是会员！且未被服务！
            if ( customer[cus_id].isVip && !customer[cus_id].isServed )
                return cus_id;
            cus_id++;
        }
        return -1;
    }
     // 找到第一个结束服务的桌子，K为桌子数
    int GetMinEndTable(int cus_id, int K){
        int index = -1, min_end = intMAX;
        for (int i = 1; i <= K; i++) {
            if (customer[cus_id].arriveTime > table[i].endTime ){
                index = i;
                break;
            }
            else if (table[i].endTime < min_end) {
                index = i;
                min_end = table[i].endTime;
            }
        }

        return index;
    }

     // 为会员找桌子，K 为桌子总数
    int FindTableForVIP( int K ){
        // 先看所有给会员预留的桌子是否有空闲，有就给他，没有就把这个普通桌子给他
        // 找到所有会员桌中最早结束的那个
        int t_vip = -1, t_vip_min_end = intMAX;
        for (int i = 1; i <= K; ++i) {
            if (table[i].isVip && table[i].endTime < t_vip_min_end) {
                t_vip = i;
                t_vip_min_end = table[i].endTime;
            }
        }
        return t_vip;
    }

		// 自己写的round，四舍五入求整数
    double round(double x)
    {
        return (int)(x+0.5);
    }

    int main() {
        // 输入玩家
        int N; cin >> N;
        int hh,mm,ss,t,vip;
        int cus_cnt = 0; // 在营业时间内的顾客数量，跟 N 不一样！
        while( N-- ){
            scanf("%d:%d:%d %d %d", &hh, &mm, &ss, &t, &vip);
            int arrive = hh * 3600 + mm * 60 + ss;
            if (arrive >= club_close_time) continue; // 玩家来的时候俱乐部关门
            customer[cus_cnt].arriveTime = arrive; // 玩家到达时间，以秒记
            t = t * 60;
            if (t > 7200)
                t = 7200;
            customer[cus_cnt].playTime = t; // 一个玩家最多玩2小时
            customer[cus_cnt].isVip = vip == 1 ? true : false; // 是否是vip
            // 把玩家被服务时间初始化为俱乐部关门时间，便于最后输出时淘汰掉哪些未被服务的玩家
            customer[cus_cnt].startTime = club_close_time;
            cus_cnt ++ ;
        }

        // 输入桌子
        int K, M; cin >> K >> M;
        // 读入M个vip桌子序号
        int tab_id;
        for ( int i=0; i<M; i++ ) {
            cin >> tab_id;
            table[tab_id].isVip = true;
        }

        // 玩家按到达时间排队
        HeapSort(customer, cus_cnt, cmp_by_arrive);
        // 逐个处理玩家
        int i = 0;
        while ( i < cus_cnt ) {
            int index = GetMinEndTable(i, K); // 找到第一个结束服务的桌子，K为桌子数
            // 最早结束的桌子结束当前服务都要等到俱乐部关门了，顾客可以全回家了，没戏了
            if (table[index].endTime >= club_close_time) break;
            // 如果这个桌子是给会员留的
            if ( table[index].isVip ) {
                // 这个人也是会员
                if ( customer[i].isVip ) {
                    // 并且没被服务过，就直接分配给他，
                    if ( !customer[i].isServed ) {
                        AssignTable(index, i);
                        // 标记这个会员被服务
                        customer[i].isServed = true;
                        // 然后处理下一个人，所以 i++
                        i++;
                    } else {
                        // 服务过了就直接下一个
                        i++;
                    }
                    // 他是普通人
                } else {
                    // 找到他后面第一个vip
                    // 如果不存在，或者 存在，但是当前桌子结束服务的时候这个vip还没来，
                    // 他才可以用这个桌子，
                    int next_vip = FindNextVip(i, cus_cnt);
                    if (next_vip == -1 || customer[next_vip].arriveTime > table[index].endTime) {
                        AssignTable(index, i);
                        // 然后处理下一个人，所以 i++
                        i++;
                    } else {
                        // 他后面有会员，而且这个会员的到达时间在这个桌子结束服务之前，
                        // 这个桌子就给会员用
                        AssignTable(index, next_vip);
                        // 标记这个会员被服务
                        customer[next_vip].isServed = true;
                        // 相当于这个人被插队了，下一个还是处理他，所以 i不变
                    }
                }
                // 普通桌子
            } else {
                // 这个人是普通人就分配给他，
                if (!customer[i].isVip) {
                    AssignTable(index, i);
                    // 这个人是会员，并且没被服务过，
                } else if (!customer[i].isServed) {
                    int t_vip = FindTableForVIP( K ); // 为会员找桌子，K 为桌子总数
                    // 最早结束的会员桌在他来之前服务完了，说明有可用的会员桌，分配给他，否则，没有可用的会员桌，把普通桌子分配给这个会员
                    (t_vip != -1 && table[t_vip].endTime <= customer[i].arriveTime) ? AssignTable(t_vip, i) : AssignTable(index, i);
                    customer[i].isServed = true;
                }
                i++; // 下一个
            }
        }
        // 处理完所有玩家，按照被服务的开始时间排序
        HeapSort(customer, cus_cnt, cmp_by_starttime);
        // 输出结果，无法被服务的自动排除
        for (int i=0; i<cus_cnt; i++) {
            if (customer[i].startTime >= club_close_time)
                continue;
            // 到达时间
            printf("%02d:%02d:%02d ", customer[i].arriveTime / 3600,
                   customer[i].arriveTime % 3600 / 60, customer[i].arriveTime % 60);
            // 被服务时间
            printf("%02d:%02d:%02d ", customer[i].startTime / 3600,
                   customer[i].startTime % 3600 / 60, customer[i].startTime % 60);
            // 等待时间
            printf("%.0f\n", round((customer[i].startTime - customer[i].arriveTime) / 60.0));
        }
        // 每个桌子服务了几个人
        for (int i = 1; i <= K; i++)
    //        cout << "i" << i << endl;
            if( i==1 ) cout << table[i].serveCount;
            else cout << " " << table[i].serveCount;
        return 0;
    }
```



## 7-2 分而治之

**知识点**：图论

**思路**：

* 思路一：记录邻接矩阵，输入时记录每个节点的度数。被摧毁的城市的度置为0，和它相邻的点度也-1。最后检查是否有度大于0的点，有就说明有城市相连通，输出NO，否则输出YES；
* 思路二：记录所有的边(u, v)，和被攻陷城池`lost[i]`。遍历边(u, v)，如果存在u或v没有被攻陷（即不在`lost`里面），说明有城市连通，输出NO，否则YES；

因为这题最多有10005个点，使用邻接矩阵会超内存，所以采用第二种思路；

**细节**：

* 记录边可以使用两个数组`u[10005]`和`v[10005]`，第`i`条边的两个节点是`u[i]`和`v[i]`
* 判断边中是否包含没被攻陷的城池`if( !lost[u[i]] && !lost[v[i]] )`

**代码**：

```c++
#include <iostream>;
using namespace std;

class Citys {
public:
    int N, M;
    int u[10005]={0};
    int v[10005]={0}; // 第 i 条边为 (u[i], v[i])
    void insertPath(); // 输入路径
    bool isValid(); // 输入一个方案，判断是否有效
    Citys(); // 构造函数，输入N, M
};

Citys::Citys() {
    cin >> N >> M;
}

void Citys::insertPath() {
    for(int i=0; i<M; i++){
        cin >> u[i] >> v[i];
    }
}

bool Citys::isValid() {
    // 输入攻破的城池
    int Np; cin >> Np;
    int lost[10005] = {0};
    for( int i=0; i<Np; i++ ){
        int city; cin >> city;
        lost[city] = 1;
    }
    // 判断
    for( int i=0; i<M; i++ ){
        if( !lost[u[i]] && !lost[v[i]] ){ // 如果都不是被攻陷的城池
            return false;
        }
    }
    return true;

}
int main() {
    // 输入数据
    Citys citys = Citys();
    citys.insertPath();
    int K; cin >> K;
    for( int i=0; i<K; i++ ){
        if( citys.isValid() ) cout << "YES" << endl;
        else cout << "NO" << endl;
    }
  
    return 0;
}

```

## 7-3 那就别担心了

**知识点**：dfs、时间复杂度

**思路**：抽象一下：给定一个有向无环图（DAG），并且给出起点A和终点B，问从A出发的所有路径是否都能到达B，并且求出从A出发到达B的不同路径有多少条。

* 第一个问题非常好解，只要从A开始DFS，如果搜到某个出度为0的点，并且这个点不是题面给出的B点，就说明并不是所有从A出发的路径都能到达B。
* 对于第二个问题，虽然这道题数据比较小，最多只有500个点，但是这题的时间限制是400ms，对于求解不同路径的问题，如果暴力搜索的话是一定会超时的。

考察输入样例（自己编的）:

```
7 8
7 6
8 5
6 5
5 2
5 3
2 1
3 1
7 1
```



![7-3 那就别担心了题解DAG](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/img/7-3%20%E9%82%A3%E5%B0%B1%E5%88%AB%E6%8B%85%E5%BF%83%E4%BA%86%E9%A2%98%E8%A7%A3DAG.jpg)

很明显，从7到1有如下路径：

```
7 -> 6 -> 5 —> 2 -> 1
7 -> 6 -> 5 -> 3 -> 1
7 -> 8 -> 5 -> 2 -> 1
7 -> 8 -> 5 -> 3 -> 1
```

发现，从5到1有两条路径。在搜索时，经过7，6，5，会把这两条路径都搜索一遍；经过7，8，5，又会把这两条路径搜索一遍。这样就造成了时间的浪费。我们考虑，如果在经过6号节点到达5号节点，再到达终点1号节点的所有路径全部搜索完时，5号节点能够储存下“经过该节点有2条路径到达目标节点”这个信息，这样在从8号节点搜索到5号时，就不需要再重复地将接下来的路径全部搜索一遍了，直接从5号节点读到“接下来有2条不同的路径”这个信息。正好，DFS的“走到底再返回”的性质可以做到从尾到头，也就是从终点到起点记录信息，因此我们可以在DFS的过程中进行记忆化操作。

我们定义`step[i]`为“从`i`号节点到达目标节点的路径条数“，求解的目标是`step[A]`，定义`step[B] = 1`，并且标记𝐵B节点已经被访问过。在DFS的过程中，如果将要搜索的节点没有被访问过，就搜索，并记录下路径条数，当前节点直接加上待搜索（其实这时候已经搜索完了）的节点的路径条数。以上图为例，DFS的过程如下：

1. 初始化`step[]`数组为0，初始化`vis[]`数组为**false**，赋值`step[1]=1`, `vis[1]=true`;
2. 从起点7开始DFS，赋值`vis[7]=true`。接下来想搜索6，`vis[6]==false`，进入；
3. 从6节点开始DFS，赋值`vis[6]=true`。接下来想搜索5，`vis[5]==false`，进入；
4. 从5节点开始DFS，赋值`vis[5]=true`。接下来想搜索2，`vis[2]==false`，进入；
5. 从2节点开始DFS，赋值`vis[2]=true`。接下来想搜索1，`vis[1]==true`，不进入；累加路径条数`step[2]=step[2]+step[1]`，这时`step[2]=1`。2节点没有其他的路径，返回，`step[5]=step[5]+step[2]`,此时`step[5]=1`
6. 接下来想搜索3，赋值`vis[1]==true`，不进入；累加路径条数`step[3]=step[3]+step[1]`，这时`step[3]=1`。3节点没有其他的路径，返回,`step[5]=step[5]+step[3]`,此时`step[5]=2`
7. 5节点没有其他的路径，返回，`step[6]=step[6]+step[5]`，此时`step[6]=2`.
8. 6没有其它节点了，返回7，`step[7]=step[7]+step[6]`，此时`step[7]=2`。继续搜索8。
9. 从8开始DFS，赋值`vis[8]=true`，接下来又想搜索5，`vis[5]=true`，不进入，`step[8]=step[8]+step[5]`，此时`step[8]=2`；
10. 没有其它路径了，返回7，`step[7]=step[7]+step[8]`，此时`step[7]=4`。没有其它节点了，递归结束。

**细节**：

* 路径使用邻接矩阵存储（邻接表更节省空间，但因为不能使用`vector`，所以邻接表实现起来会麻烦一点）
* 判断能否“逻辑自洽”：出度为0且该节点不是终点，令全局变量`isLogic`

dfs的过程用代码实现：

```c++
void Propositions::dfs(int node) {
    vis[node] = true; // 标记访问
  // 如果出度为0，且该节点不是终点，说明不是逻辑自洽的
    if ( getOutdegree(node) == 0 && node != end ){
        isLogic = false;
    }
  // 继续dfs没有被访问过的节点，并且记录step
    for( int i=0; i<N+1; i++ ){
        if( path[node][i] ){
            if( !vis[i] ) dfs(i);
            step[node] = step[node] + step[i];
        }
    }
}
```

所有代码：

```c++
#include <iostream>
using namespace std;

class Propositions {
public:
    int N, M;
    int start, end; // 起点和终点
    int isLogic = true; // 是否逻辑自洽
    int path[505][505]; // 邻接矩阵，在构建函数中初始化为0；
    long long step[505] = {0}; // step[i] : 第 i 个点到终点的路径的个数
    bool vis[505] = {0}; // 是否访问过

    Propositions();
    void insertPath(); // 输入路径
    int getOutdegree(int node); // 计算一个节点的出度
    void dfs(int node); // 深度优先搜索
    void detect(); // 入口，初始化，dfs和输出
};

Propositions::Propositions() {
    for( int i=0; i<N+1; i++ ){
        for( int j=0; j<N+1; j++ ){
            path[i][j] = 0;
        }
    }
}

void Propositions::insertPath() {
    cin >> N >> M;
    for( int i=0; i<M; i++ ){
        int from, to; cin >> from >> to;
        path[from][to] = 1;
    }
}

int Propositions::getOutdegree(int node) {
    int sum = 0;
    for( int i=0; i<N+1; i++ ){
        sum += path[node][i];
    }
    return sum;
}

void Propositions::dfs(int node) {
    vis[node] = true;
    if ( getOutdegree(node) == 0 && node != end ){
        isLogic = false;
    }
    for( int i=0; i<N+1; i++ ){
        if( path[node][i] ){
            if( !vis[i] ) dfs(i);
            step[node] = step[node] + step[i];
        }
    }
}

void Propositions::detect() {
    cin >> start >> end;
    step[end] = 1; // 重要初始化
    vis[end] = true; // 重要初始化
    dfs(start);
    cout << step[start] << " " ;
    if( isLogic ) cout << "Yes";
    else cout << "No";
}

int main() {
    Propositions p;
    p.insertPath();
    p.detect();
    return 0;
}

```

## 7-4 森森旅游

**知识点**：最短路径、邻接表

**思路**：用Dijskra最短路算法分别求出

1.使用现金从城市1出发，到达所有城市的最小花费（储存在`oneToOthers`内）
2.使用旅游金从城市n出发，到达所有城市的最小花费（储存在`othersToN`内）

在第i个城市将现金换成旅游金的情况下所需要的现金总额为

`all_cash = oneToOthers[i] + othersToN[i]/a[i]`（a[i]是汇率，注意除不尽要+1） 

（即从城市1到达第i个城市所需要的最小现金数 + 从第i个城市到城市n所需要的最小旅游金数所转换成的现金数量）

然后再通过枚举中转点`i`的方式，得到全局最优解。为了让Dijkstra算法更有效率，可以存储反向路径。

**细节**：

* 路径的存储。
  * 使用邻接表，而不是邻接矩阵，因为1w*1w的二维数组会超内存。
  * 存储路径的数据结构为：`myvector<Mypair> path[100005], rpath[100005]`，其中`myvector`是自己定义的类，实现类似vector的功能，其最大的特点是长度可变；`Mypair`是自己定义的结构体，实现类似pair的功能。
  * `path`存储的是一个城市到另一个城市所需要现金。`rpath`存储的是相反路径所需要的旅游金。
  * 举个例子，对于输入`u v c d`，`path[u].push_back(Mypair(v, c))`，`rpath[v].push_back(Mypair(u,d))`
* Dijkstra有枚举写法，时间复杂度为O(n*2)，n是节点个数。还有基于优先队列的写法，时间复杂度为O(ElogV)。这里使用后者。
* 本题的最后一步是更新汇率，也有两种操作：
  * 每次更新汇率后都枚举一次中转点，找到最少花费，然后输出。时间复杂度高，3个点过不去，只能得21分。
  * 枚举中转点，用一个`multiset`（其特点是有序，能够快速插入和删除）维护。每次更新汇率都删除旧的，插入新的。时间复杂度低，但是很难实现（红黑树）。

**21分代码**（三个测试点超时）：

```c++
#include <iostream>
#define int long long 
const int N = 100005; // 最大节点数
using namespace std;

// 实现Mypair
struct Mypair
{
    int first;
    int second;

    // 默认构造函数
    Mypair()
            :first(0),second(0) {}  //用0,0初始化
    //构造函数
    Mypair(const int&a,const int&b)
            :first(a),second(b) {}
};
// 为了加入优先队列，对操作符重载
bool operator==(const Mypair&s1,const Mypair&s2)
{
    return s1.first==s2.first&&s1.second==s2.second;
}

bool operator>(const Mypair&s1,const Mypair&s2)
{
    return (s1.first>s2.first)||(!(s1.first<s2.first)&&s1.second>s2.second);
}

bool operator<(const Mypair&s1, const Mypair&s2)
{
    return (s1.first<s2.first)||(!(s1.first>s2.first)&&s1.second<s2.second);
}

// 实现优先队列（大顶堆）
class PriorityQueue
{
private:
    Mypair* pArray;
    int m_length;
public:
    PriorityQueue(int N) {
        // 为后续根节点直接从1开始作准备
        pArray = new Mypair[N];
        m_length = 0;
    }
// 返回堆顶
    Mypair Top(){
        return pArray[1];
    }
// 删除堆顶
    Mypair delMax() {
        // 大根堆第一个元素为最大
        Mypair max = pArray[1];
        // 将第一个元素和最后一个元素交换,并使长度减一，即删除最大的元素
        swap(pArray[1], pArray[m_length--]);
        // 防止对象游离
        pArray[m_length + 1] = Mypair();
        // 下沉恢复堆的有序性
        sink(1);
        // 返回最大的节点值
        return max;

    }
// 插入元素
    void insert(Mypair v) {
        // 将值v插入到pArray[1]位置处，所以这里用的前置++
        pArray[++m_length] = v;
        // 新加入的元素上浮
        swim(m_length);
    }

// 判断是否为空
    bool isEmpty() {
        return m_length == 0;
    }
// 队列元素个数
    int size() {
        return m_length;
    }

    // 向上浮
    void swim(int k) {
        // 判断最下层的叶子节点值如果大于其父节点则进入循环上浮
        while (k > 1 && pArray[k] > pArray[k / 2]) {
            // 交换父节点和子节点
            swap(pArray[k / 2], pArray[k]);
            // k数值减小继续向上浮
            k /= 2;
        }
    }
    // 向下沉
    void sink(int k) {
        while (2 * k <= m_length)
        {
            // 由于堆的性质父节点为k则其左子树为2*k即j
            int j = 2 * k;
            // 这里先比较左子树和右子树的大小，将最大的那个键记录下来再和父节点比较
            if (j < m_length && (pArray[j] < pArray[j + 1])) j++;
            // 和父节点比较如果父节点比最大的子节点还要大，则直接退出循环
            if (pArray[k] > pArray[j]) break;
            // 如果父节点比子节点小则交换
            swap(pArray[k], pArray[j]);
            // k值变大继续下沉
            k = j;
        }
    }
};


// 实现myvector
template<typename T>
class myvector{
public:
    typedef T value_type;
    typedef T* iterator;
private:
    value_type* _data;
    size_t _size;
    size_t _capacity;

public:
    myvector():_data(NULL),_size(0),_capacity(0){}
    ~myvector(){
        delete [] _data;
        _data = NULL;
        _size = 0;
        _capacity = 0;
    }
    myvector(const myvector& vec){
        _size = vec._size;
        _capacity = vec._capacity;
        _data = new value_type[_capacity];
        for(int i=0;i<_size;++i){
            _data[i] = vec._data[i];
        }
    }
    myvector& operator=(const myvector& vec){
        if(this == &vec) return *this;
        value_type* temp = new value_type[vec._capacity];
        for(int i=0;i<vec._size;++i){
            temp[i] = vec._data[i];
        }
        delete [] _data;
        _data = temp;
        _size = vec._size;
        _capacity = vec._capacity;
        return *this;
    }
    void push_back(value_type val){
        if(0 == _capacity){
            _capacity = 1;
            _data = new value_type[1];
        }else if(_size+1 > _capacity){
            _capacity *= 2;
            value_type* temp = new value_type[_capacity];
            for(int i=0;i<_size;++i){
                temp[i] = _data[i];
            }
            delete [] _data;
            _data = temp;
        }
        _data[_size] = val;
        ++_size;
    }

    size_t size()const{ return _size;}
== 0;}
    value_type& operator[](size_t index){
        return _data[index];
    }

    void erase(iterator it){
        size_t index = it - _data;
        for(int i=index;i<_size-1;++i){
            _data[i] = _data[i+1];
        }
        --_size;
    }

    iterator begin(){ return _data; }
    iterator end(){ return _data + _size; }
};


// 找到最短路
void dijkstra( int from, bool vis[], myvector<Mypair> (&path)[N], int dist[], int n ){
    PriorityQueue que(100005); // 大顶堆
    Mypair tmp(0, from);
    que.insert(tmp);
    while(!que.isEmpty()){
        int x, w;
        w = que.Top().first; x = que.Top().second;
        que.delMax();
        if( vis[x] ) continue;
        vis[x] = true;
        dist[x] = -w;
        for( int i=0; i<path[x].size(); i++ ){
            int y, w;
            y = path[x][i].first;
            w = path[x][i].second;
            if( vis[y] ) continue;
            que.insert({-dist[x]-w, y});
        }
    }
}
// 确定中转点i，求花费。不能整除的要+1
int TurnToCash(int othersToN[], int oneToOthers[], int a[], int i){
    int dToC = othersToN[i] % a[i] ? othersToN[i] / a[i] + 1 : othersToN[i] / a[i];
    return oneToOthers[i] + dToC;
}


signed main() {
  // 输入路径
    int n, m, q; cin >> n >> m >> q;
    myvector<Mypair> path[N], rpath[N];
    while( m-- ){
        int u, v, c, d; cin >> u >> v >> c >> d;
        Mypair v_c(v, c);
        Mypair u_d(u, d);
        path[u].push_back(v_c);
        rpath[v].push_back(u_d);
    }
  // 输入汇率
    int a[N];
    for( int i=1; i<=n; i++ ) cin >> a[i];
    int oneToOthers[N];
    int othersToN[N];
    bool vis[N] = {false};
    bool rvis[N] = {false};
  // 求最短路，和反向最短路
    dijkstra(1, vis, path, oneToOthers, n);
    dijkstra(n, rvis, rpath, othersToN, n);

//    multiset<int> ms;
// 枚举中转点
    while( q-- ){
        int node, d; cin >> node >> d;
        if( vis[node] && rvis[node] ) a[node] = d;
      // 用min值维护最小的花费
        int min = 9223372036854775807;
        for( int i=1; i<=n; i++ ){
            if( vis[i] && rvis[i] ){
                if( min > TurnToCash(othersToN, oneToOthers, a, i))
                    min = TurnToCash(othersToN, oneToOthers, a, i);
            }

        }
        cout << min << endl;
    }
    return 0;
}

```

**满分但是用了multiset的代码**：

把枚举中转点那一部分改成：

```c++
#include <set>

multiset<int> ms;
// 先插入
for( int i=1; i<=n; i++ ){
  if( vis[i] && rvis[i] ){
    ms.insert(TurnToCash(othersToN, oneToOthers, a, i) );
  }
}
while( q-- ){
  int node, d; cin >> node >> d;
  if( vis[node] && rvis[node] ){
    // 每次更新汇率，先删除旧汇率，再插入新的
    ms.erase(ms.find(TurnToCash(othersToN, oneToOthers, a, node)) );
    a[node] = d;
    ms.insert( TurnToCash(othersToN, oneToOthers, a, node) );
  }
  // 返回顶部元素就可以啦
  cout << *ms.begin() << endl;
}
```

**简单描述Dijkstra算法**：

`dist[i]`表示从初始节点到第i个节点的最短路径，初始为无穷大，每次从`dist[]`里选取未搜索过的最小的节点，用它继续更新`dist[]`。可以用`vis[]`记录已搜索节点，用`pre[]`记录每个节点的前面节点，用priority_queue优化时间复杂度。

## 7-5 Hand-made Cream

**知识点**：动态规划

**思路**：考察从第1个面包`bread[1]`，选到第i个面包`bread[i]`和从`cream[1]`到`cream[j]`，乘积最大的搭配`dp[i][j]`，有如下情况：

* 如果将第i个面包和第j个面包搭配，那么`dp[i][j] = dp[i-1][j-1] + bread[i]*cream[j]`；
* 如果不搭配，那么等于前一个面包，或者前一个冰淇淋的结论，即`dp[i][j] = dp[i-1][j]`或者`dp[i][j] = dp[i][j-1]`

因为要求最大的值，所以综合一下：`dp[i][j] = max(dp[i-1][j-1]+bread[i]*cream[j],dp[i-1][j],dp[i][j-1])`

初始化`dp[0][0]=0`,`dp[1][0]=0`,`dp[0][1]=0`，用两个循环，动态更新一下`dp`表就可以啦，下面是题目样例最终得到的dp表：

| bread\cream | 10   | 8    | 11   | 9    |
| ----------- | ---- | ---- | ---- | ---- |
| -1          | 0    | 0    | 0    | 0    |
| 10          | 100  | 100  | 110  | 110  |
| 8           | 100  | 164  | 188  | 188  |

**代码**：

```c++
#include <iostream>
using namespace std;

int max(int a, int b, int c){
    if(a >= b && a >= c) return a;
    else{
        if(b >= c)return b;
        else return c;
    }
}

int max(int a, int b){
    if(a >= b) return a;
    else return b;
}

int main() {
    int N, M; cin >> N >> M;
    int a[1005], b[1005];
    for( int i=0; i<N; i++ ) cin >> a[i+1];
    for( int i=0; i<M; i++ ) cin >> b[i+1];

    int dp[1005][1005], res = 0;
    for( int i=1; i<=N; i++ ){
        for( int j=1; j<=M; j++ ){
            dp[i][j] = max(dp[i-1][j-1]+a[i]*b[j], dp[i-1][j], dp[i][j-1]);
            cout << dp[i][j] << " " ;
            res = max(res, dp[i][j]);
        }
        cout << endl;
    }
    cout << res;
    return 0;
}

```

## *工欲善其事 必先利其器*

*有一说一，Clion真的很好用，非常智能的代码提示和代码补全是应付语法复杂的c++语言的有力工具。*
