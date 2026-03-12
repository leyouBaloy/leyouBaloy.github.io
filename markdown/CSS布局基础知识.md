---
title: "CSS布局基础知识"
author: 孙百乐
date: 2023-03-20T13:32:55+08:00
draft: false
categories: 
- 技能分享
---

## 需求

还是之前的那个需求，我需要做一个静态网页用于展示电子版教材。网页的布局非常重要，我需要一个顶部横向的导航栏，一个能够显示大纲的侧边栏，侧边栏的右边是教材的内容，听起来很简单，不是吗？但我需要再加一个条件，就是这些布局得是响应式的，要能够适应不同尺寸的屏幕，这可就不简单了。举个例子，当屏幕变窄时，顶部导航栏要将选项折叠，侧边栏也应当消失。

该需求跟这个网站刚好吻合，可以抄些代码：

![image-20230320133721981](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/img/image-20230320133721981.png)

由于我并没有系统的学过css，也根本不了解CSS中布局的知识，导致我在解决这个问题的时候手忙脚乱，折腾了好长时间也没能做出一个满意的页面。不过在折腾的过程中，我也在不断的积累，一步步的逼近真相，当我意识到可以把这个问题描述为CSS的布局问题时，我觉得我已经离最终解决问题非常接近了。

## CSS布局基础知识

这个教程讲的非常棒：https://zh.learnlayout.com

大致的布局方法是：顶部的导航栏使用fix布局，下面的侧边栏和教材主体使用flex布局，再用css的媒体，设置当屏幕宽度小于768px的时候设置display属性为none

简单的代码：

```html
<div class="page-header">1111111111111</div>
<div class="page-body">
<div class="docs-nav">1111111</div>
<div class="docs-body">Introduction
    Overview
    The OpenAI API can be applied to virtually any task that involves understanding or generating natural language, code, or images. We offer a spectrum of models with different levels of power suitable for different tasks, as well as the ability to fine-tune your own custom models. These models can be used for everything from content generation to semantic search and classification.
    
    Key concepts
    We recommend completing our quickstart tutorial to get acquainted with key concepts through a hands-on, interactive example.
    Overview
    The OpenAI API can be applied to virtually any task that involves understanding or generating natural language, code, or images. We offer a spectrum of models with different levels of power suitable for different tasks, as well as the ability to fine-tune your own custom models. These models can be used for everything from content generation to semantic search and classification.
    
    Key concepts
    We recommend completing our quickstart tutorial to get acquainted with key concepts through a hands-on, interactive example.
    Overview
    The OpenAI API can be applied to virtually any task that involves understanding or generating natural language, code, or images. We offer a spectrum of models with different levels of power suitable for different tasks, as well as the ability to fine-tune your own custom models. These models can be used for everything from content generation to semantic search and classification.
    
    Key concepts
    We recommend completing our quickstart tutorial to get acquainted with key concepts through a hands-on, interactive example.
    Overview
    The OpenAI API can be applied to virtually any task that involves understanding or generating natural language, code, or images. We offer a spectrum of models with different levels of power suitable for different tasks, as well as the ability to fine-tune your own custom models. These models can be used for everything from content generation to semantic search and classification.
    
    Key concepts
    We recommend completing our quickstart tutorial to get acquainted with key concepts through a hands-on, interactive example.
    Overview
    The OpenAI API can be applied to virtually any task that involves understanding or generating natural language, code, or images. We offer a spectrum of models with different levels of power suitable for different tasks, as well as the ability to fine-tune your own custom models. These models can be used for everything from content generation to semantic search and classification.
    
    Key concepts
    We recommend completing our quickstart tutorial to get acquainted with key concepts through a hands-on, interactive example.
    Overview
    The OpenAI API can be applied to virtually any task that involves understanding or generating natural language, code, or images. We offer a spectrum of models with different levels of power suitable for different tasks, as well as the ability to fine-tune your own custom models. These models can be used for everything from content generation to semantic search and classification.
    
    Key concepts
    We recommend completing our quickstart tutorial to get acquainted with key concepts through a hands-on, interactive example.
    Overview
    The OpenAI API can be applied to virtually any task that involves understanding or generating natural language, code, or images. We offer a spectrum of models with different levels of power suitable for different tasks, as well as the ability to fine-tune your own custom models. These models can be used for everything from content generation to semantic search and classification.
    
    Key concepts
    We recommend completing our quickstart tutorial to get acquainted with key concepts through a hands-on, interactive example.
    Overview
    The OpenAI API can be applied to virtually any task that involves understanding or generating natural language, code, or images. We offer a spectrum of models with different levels of power suitable for different tasks, as well as the ability to fine-tune your own custom models. These models can be used for everything from content generation to semantic search and classification.
    
    Key concepts
    We recommend completing our quickstart tutorial to get acquainted with key concepts through a hands-on, interactive example.
    Overview
    The OpenAI API can be applied to virtually any task that involves understanding or generating natural language, code, or images. We offer a spectrum of models with different levels of power suitable for different tasks, as well as the ability to fine-tune your own custom models. These models can be used for everything from content generation to semantic search and classification.
    
    Key concepts
    We recommend completing our quickstart tutorial to get acquainted with key concepts through a hands-on, interactive example.
    Overview
    The OpenAI API can be applied to virtually any task that involves understanding or generating natural language, code, or images. We offer a spectrum of models with different levels of power suitable for different tasks, as well as the ability to fine-tune your own custom models. These models can be used for everything from content generation to semantic search and classification.
    
    Key concepts
    We recommend completing our quickstart tutorial to get acquainted with key concepts through a hands-on, interactive example.
    Overview
    The OpenAI API can be applied to virtually any task that involves understanding or generating natural language, code, or images. We offer a spectrum of models with different levels of power suitable for different tasks, as well as the ability to fine-tune your own custom models. These models can be used for everything from content generation to semantic search and classification.
    
    Key concepts
    We recommend completing our quickstart tutorial to get acquainted with key concepts through a hands-on, interactive example.
    Overview
    The OpenAI API can be applied to virtually any task that involves understanding or generating natural language, code, or images. We offer a spectrum of models with different levels of power suitable for different tasks, as well as the ability to fine-tune your own custom models. These models can be used for everything from content generation to semantic search and classification.
    
    Key concepts
    We recommend completing our quickstart tutorial to get acquainted with key concepts through a hands-on, interactive example.
    Overview
    The OpenAI API can be applied to virtually any task that involves understanding or generating natural language, code, or images. We offer a spectrum of models with different levels of power suitable for different tasks, as well as the ability to fine-tune your own custom models. These models can be used for everything from content generation to semantic search and classification.
    
    Key concepts
    We recommend completing our quickstart tutorial to get acquainted with key concepts through a hands-on, interactive example.
    Overview
    The OpenAI API can be applied to virtually any task that involves understanding or generating natural language, code, or images. We offer a spectrum of models with different levels of power suitable for different tasks, as well as the ability to fine-tune your own custom models. These models can be used for everything from content generation to semantic search and classification.
    
    Key concepts
    We recommend completing our quickstart tutorial to get acquainted with key concepts through a hands-on, interactive example.
    Overview
    The OpenAI API can be applied to virtually any task that involves understanding or generating natural language, code, or images. We offer a spectrum of models with different levels of power suitable for different tasks, as well as the ability to fine-tune your own custom models. These models can be used for everything from content generation to semantic search and classification.
    
    Key concepts
    We recommend completing our quickstart tutorial to get acquainted with key concepts through a hands-on, interactive example.
    Overview
    The OpenAI API can be applied to virtually any task that involves understanding or generating natural language, code, or images. We offer a spectrum of models with different levels of power suitable for different tasks, as well as the ability to fine-tune your own custom models. These models can be used for everything from content generation to semantic search and classification.
    
    Key concepts
    We recommend completing our quickstart tutorial to get acquainted with key concepts through a hands-on, interactive example.
    Overview
    The OpenAI API can be applied to virtually any task that involves understanding or generating natural language, code, or images. We offer a spectrum of models with different levels of power suitable for different tasks, as well as the ability to fine-tune your own custom models. These models can be used for everything from content generation to semantic search and classification.
    
    Key concepts
    We recommend completing our quickstart tutorial to get acquainted with key concepts through a hands-on, interactive example.
    Overview
    The OpenAI API can be applied to virtually any task that involves understanding or generating natural language, code, or images. We offer a spectrum of models with different levels of power suitable for different tasks, as well as the ability to fine-tune your own custom models. These models can be used for everything from content generation to semantic search and classification.
    
    Key concepts
    We recommend completing our quickstart tutorial to get acquainted with key concepts through a hands-on, interactive example.
    Overview
    The OpenAI API can be applied to virtually any task that involves understanding or generating natural language, code, or images. We offer a spectrum of models with different levels of power suitable for different tasks, as well as the ability to fine-tune your own custom models. These models can be used for everything from content generation to semantic search and classification.
    
    Key concepts
    We recommend completing our quickstart tutorial to get acquainted with key concepts through a hands-on, interactive example.
    Overview
    The OpenAI API can be applied to virtually any task that involves understanding or generating natural language, code, or images. We offer a spectrum of models with different levels of power suitable for different tasks, as well as the ability to fine-tune your own custom models. These models can be used for everything from content generation to semantic search and classification.
    
    Key concepts
    We recommend completing our quickstart tutorial to get acquainted with key concepts through a hands-on, interactive example.
    Overview
    The OpenAI API can be applied to virtually any task that involves understanding or generating natural language, code, or images. We offer a spectrum of models with different levels of power suitable for different tasks, as well as the ability to fine-tune your own custom models. These models can be used for everything from content generation to semantic search and classification.
    
    Key concepts
    We recommend completing our quickstart tutorial to get acquainted with key concepts through a hands-on, interactive example.
    Overview
    The OpenAI API can be applied to virtually any task that involves understanding or generating natural language, code, or images. We offer a spectrum of models with different levels of power suitable for different tasks, as well as the ability to fine-tune your own custom models. These models can be used for everything from content generation to semantic search and classification.
    
    Key concepts
    We recommend completing our quickstart tutorial to get acquainted with key concepts through a hands-on, interactive example.
    Overview
    The OpenAI API can be applied to virtually any task that involves understanding or generating natural language, code, or images. We offer a spectrum of models with different levels of power suitable for different tasks, as well as the ability to fine-tune your own custom models. These models can be used for everything from content generation to semantic search and classification.
    
    Key concepts
    We recommend completing our quickstart tutorial to get acquainted with key concepts through a hands-on, interactive example.
    Overview
    The OpenAI API can be applied to virtually any task that involves understanding or generating natural language, code, or images. We offer a spectrum of models with different levels of power suitable for different tasks, as well as the ability to fine-tune your own custom models. These models can be used for everything from content generation to semantic search and classification.
    
    Key concepts
    We recommend completing our quickstart tutorial to get acquainted with key concepts through a hands-on, interactive example.
    Overview
    The OpenAI API can be applied to virtually any task that involves understanding or generating natural language, code, or images. We offer a spectrum of models with different levels of power suitable for different tasks, as well as the ability to fine-tune your own custom models. These models can be used for everything from content generation to semantic search and classification.
    
    Key concepts
    We recommend completing our quickstart tutorial to get acquainted with key concepts through a hands-on, interactive example.
    Overview
    The OpenAI API can be applied to virtually any task that involves understanding or generating natural language, code, or images. We offer a spectrum of models with different levels of power suitable for different tasks, as well as the ability to fine-tune your own custom models. These models can be used for everything from content generation to semantic search and classification.
    
    Key concepts
    We recommend completing our quickstart tutorial to get acquainted with key concepts through a hands-on, interactive example.
    </div>

<style>
    *{
        box-sizing: border-box;
    }
    .page-header{
        background-color: #fff;
        border-bottom: 1px solid #ececf1;
        height: 60px;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 1;
        background-color: red;
    }
    .page-body{
        align-items: stretch;
        display: flex;
        height: calc(100% - 60px);
        position: relative;
        flex: 1 0 auto;
        font-size: 16px;
        line-height: 24px;
        margin: 0 auto;
        max-width: 100%;
    }
    .docs-nav{
        /* display: none; */
        border-right: 1px solid #ececf1;
        flex: 0 0 auto;
        overflow: auto;
        padding: 50px 0 20px;
        width: 250px;
        background-color: blue;
    }
    @media screen and (max-width: 768px) {
    .docs-nav{
        display: none;
    }
    }
    .docs-body {
        flex: 1 1 auto;
        height: 100%;
        max-width: 100%;
        min-width: 0;
        overflow: auto;
        background-color: green;
        padding: 50px;
    }
    
</style>

```

