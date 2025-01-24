---
categories:
- 技能分享
date: 2025-01-24 01:37:25
title: Vue3实现小红书瀑布流布局任意组件动态更新页面方法实践
img: https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/img/image-20250124101620483.png
---

## 思路

![image-20250124101620483](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/img/image-20250124101620483.png)

1.首先定义一个瀑布流容器，它的高度暂定（后面会更新）。把需要布局的组件（这里叫做waterfall-item）放在瀑布流容器里面渲染出来。使用绝对定位（position: absolute），把它移到屏幕外面，不要占用页面高度，并且设置不可见（visibility:hidden）。

```
<div class="waterfall-container" ref="waterfallWrapper" :style="{ height: wrapperHeight + 'px' }">
    <div
      v-for="(post, index) in posts"
      :key="post.title"
      class="waterfall-item"
    >
      <div class="waterfall-card">
        <PostCard
          :title="post.title"
          :content="post.excerpt"
          :time="new Date(post.date).toLocaleDateString()"
          :tag="post.tags ? post.tags.join(', ') : '未分类'"
          :img="post.img"
          :path="`/post/${post.file}`"
          :id="post.title"
          @imageLoaded="onImageLoaded"
        />
      </div>
    </div>
  </div>

.waterfall-item {
  position: absolute;
  left: 0;
  top: 0;
  transform: translate3d(0, 3000px, 0);
  visibility: hidden;
  /* 让容器不被空白占位的 trick */
}
```

2.渲染出来之后才能计算高度。获取.waterfall-item的dom元素，遍历这些元素，使用getBoundingClientRect()获取高度。

3.开始布局。以2列为例，新建两个变量分别表示2列的高度。遍历第2步获取的dom元素的高度，把dom元素的高度加到最小的高度上。这个过程还可以考虑在组件之间加上留白（gutter）。

4.使用transform样式将waterfall-item移动到对应高度所在的位置。transform将组件移动到指定坐标，横坐标跟列有关，纵坐标跟高度有关。

5.更新瀑布流容器的高度为两列高度中最大者。

```
// 瀑布流容器引用
const waterfallWrapper = ref<HTMLElement | null>(null);
// 瀑布流容器高度
const wrapperHeight = ref(0);

// 一些瀑布流配置属性
const gutter = 20;       // 卡片之间的间距，单位px
const cols = ref(2);     // 列数（可根据响应式需求调整）
const colWidth = ref(0); // 每列宽度，或你可以动态计算
const hasAroundGutter = ref(true);
const animationCancel = ref(false);   // 是否取消动画
const posDuration = ref(300);         // 位置动画时长 (ms)

/** 2、3、4、5步的布局函数 */
const layoutHandle = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    // 初始化 posY
    initY();

    // 获取 .waterfall-item DOM 列表
    const items: HTMLElement[] = [];
    if (waterfallWrapper.value) {
      waterfallWrapper.value.childNodes.forEach((el: any) => {
        if (el.className === 'waterfall-item') items.push(el);
      });
    }
    if (!items.length) return false;

    // 遍历每个卡片
    for (let i = 0; i < items.length; i++) {
      const curItem = items[i] as HTMLElement;
      const style = curItem.style;

      // 最小列
      const minY = Math.min(...posY.value);
      const minYIndex = posY.value.indexOf(minY);

      // 计算 X
      const curX = getX(minYIndex);

      // 设置 transform
      style.transform = `translate3d(${Math.floor(curX)}px, ${Math.floor(minY)}px, 0)`;
      style.width = `${colWidth.value}px`;
      style.visibility = 'visible';

      // 测量高度
      const { height } = curItem.getBoundingClientRect();
      // 输出卡片标题和高度
      // console.log(`Card "${i}" height: ${height}`);
      // 更新列高
      posY.value[minYIndex] += height;

      // 入场动画（可选）
      if (!animationCancel.value) {
        addAnimation(curItem, () => {
          const time = posDuration.value / 1000;
          style.transition = `transform ${time}s`;
        });
      }
    }
    
    // 容器高度 = 最长列
    wrapperHeight.value = Math.max(...posY.value);

    // 等待动画结束
    setTimeout(() => {
      resolve(true);
    }, posDuration.value);
  });
};
    
/** 初始化 posY */
const initY = () => {
  posY.value = new Array(cols.value).fill(hasAroundGutter.value ? gutter : 0);
};

/** 计算给定列的 X 坐标 */
const getX = (index: number): number => {
  const count = hasAroundGutter.value ? index + 1 : index;
  return gutter * count + colWidth.value * index;
};

/** 简单的动画函数，给卡片添加class或行内属性 */
function addAnimation(item: HTMLElement, callback?: () => void) {
  // 也可以从 item.firstChild 取到实际卡片 DOM
  // 并添加动画class
  // 这里为简单演示
  const content = item.firstChild as HTMLElement;
  if (content) {
    // 添加一系列动画class/属性
    content.classList.add('animate__animated', 'animate__fadeIn'); 
    // etc.

    // 回调
    if (callback) {
      setTimeout(() => {
        callback();
      }, 300); // 300ms or 你自己的计算
    }
  }
}
```

## 细节

* 实际场景中图片一般使用懒加载，这会导致在组件计算高度时因为图片还没有被加载出来，所以得到错误的高度。这时候就需要在组件里添加一个onImageLoaded函数，当图片加载完成后调用，重新布局。

```
// 图片加载完成后再次布局（可加防抖）
let timer: number | null = null;
function onImageLoaded() {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    layoutHandle(); // 重新布局
  }, 100); // 防抖 100ms
}
```

* 屏幕尺寸变化时重新布局。设置两个监听器监听屏幕尺寸变化，当屏幕尺寸改变了之后，一个触发宽度重新设置，第二个触发重新布局。

```
// 定义函数: colWidth = containerWidth - 3 * gutter
function updateColWidth() {
  const container = waterfallWrapper.value;
  if (!container) return;

  // 父容器的实际宽度
  const containerWidth = container.clientWidth;
  // 计算后赋值
  colWidth.value = (containerWidth - 3 * gutter)/2;
  console.log('containerWidth:', containerWidth);
  console.log('colWidth:', colWidth.value);
}
```

```
onMounted(() => {
  updateColWidth();
  window.addEventListener('resize', updateColWidth);
  window.addEventListener('resize', layoutHandle);
});
```

* 防抖，意思就是防止频繁触发布局造成性能爆炸。这个问题可能会在图片非常多，或者屏幕宽度频繁变化时出现。解决思路很简单，就是在所有布局操作前加个定时器，使得在规定时间内只能触发有限次数。代码在细节1有体现。



代码参考：https://github.com/heikaimu/vue3-waterfall-plugin

感谢作者开源。

