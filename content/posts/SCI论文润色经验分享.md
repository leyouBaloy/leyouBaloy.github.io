---
title: "SCI论文润色经验分享"
author: 孙百乐
date: 2023-12-23T21:39:08+08:00
draft: false
categories: 
- 经验分享
---

# 变量符号

- 第一次出现的变量符号需要解释，后面不需再解释。
- 文章中所有的变量符号要保持一致，不能前后歧义。解决这个问题最好的办法就是在写作时维护一个符号表。如果文章的公式变量较多，强烈建议这么做，否则后面改起来会很痛苦。
- 所有单字母变量，都要采用斜体。多字母变量和函数，采用正体。对于下标，若下标本身是说明性的文字，不管单字母还是多字母，采用正体。若下标本身是单字母变量，就采用斜体。加粗起强调作用，是否加粗由作者决定，一般都不用加粗。
- 如果变量的下标有意义，那么尽量不要使用单字母。比如宽哥论文中的Im中的m表示的是mask，那么最好使用Imask替换Im。这样更有助于读者明白含义。
- 变量的下标尽量不要太长，可以适当缩减，比如Icomplete可以改成Icomp。但是不要缩太短引起歧义，比如如果缩成Icom就会让读者误以为是Icommon。

# 表格设计

- 表格的设计要规整，不能把几种表达方式混在一起。比如下面的表格将方法和指标混在一起，使用了箭头和数字的表达形式，这是混乱的：

![img](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/img/1703334407939-12f715eb-5be5-4d78-b225-71d00fc6dbc7.png)

修改为：

![img](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/img/1703334508463-afd7123d-db6c-40da-b7a3-798706e32ff3.png)

- 表头要完整，不要省略。如下表第一列缺少表头Module：

![img](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/img/1703334588460-fa073dd9-47bc-4a10-be18-c2a929bde0ea.png)

修改为：

![img](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/img/1703334659522-fa73ab0d-44d5-4518-b55d-818fec8d5d9b.png)



# 缩略语

- 缩略语在文中第一次出现时需要定义，后面统一使用缩略语。

比如gate residual unit (GRU)，在后面出现的时候统一使用GRU。

- 仅在文中出现一次的，不要使用缩略语。同时建议出现次数少于 3 次的，也不要使用缩略语。 这里的第一次，是摘要、正文中分别计算的。如果摘要和正文都符合上面所说使用缩写的规则，那么摘要中需要定义一次，正文中还需要定义一次。
- 对于图表中出现的缩略语，需要单独在图注或表注中定义。
- 对于一些行业共识术语，可以直接使用缩略语，不遵守以上规则。

比如说在人工智能期刊可以直接使用ReLU、 CNN 等。

# 少用 of 短语

- 少用of短语构成的修饰词，这样可以使句子变简单，简单的句子最有说服力。比如：

> As an important carrier of information preservation, **quality of image** directly affects the preservation of information.

修改为

> As an important carrier of information preservation, **image quality** directly affects the preservation of information.

# 错用比较级

- 比较级修饰词或术语通常需要明确比较的对象。当无法提供比较基准时，采用词语的原级形式。这通常是中文思维导致的错误。比如：

> In addition, the positioning accuracy of the mask influences the image restoration quality, and an incorrect mask can lead to **poorer** results.

修改为

> In addition, the positioning accuracy of the mask influences the image restoration quality, and an incorrect mask can lead to **poor** results.

再比如：

> Benefiting from the ringed residual structure to amplify representation differences and prediction category confidence-driven refinement of the prediction mask, the highlights are **more** accurately located and removed by our method

修改为

> 删去more

# 错用significant/significance/significantly

“significant/significance/significantly”有特殊的用法，不能随意使用。

在科学、技术和医学领域中，当提到统计阈值和p值时，使用“significant/significance/significantly”。在没有p值的情况下，最好不要使用，可以使用“considerable/considerably”、“substantial/substantially”、“remarkable/remarkably”或其他类似的词语替代。

例如：

> The aforementioned phenomena can lead to a **significant**  loss in the expression of image content.

修改为

> The aforementioned phenomena can lead to a **remarkable** loss in the expression of image content.

注：这一点是编辑给出的意见，个人觉得有些啰嗦，实际上很多论文都没有遵守。不过严谨的论文确实会回避significant/significance/significantly，所以最好还是注意一下。

# it指代不明

使用“it”可能会导致混淆。为了清晰明确，应在句子开头指明“it”所指代的内容。我们在写论文时难免会由于太过主观而导致出现这类问题，可以在写完之后多读几遍，找到歧义的地方。比如：

> The final RResBlk is structured in a ring by running the residual propagation twice and the residual feedback once, as shown in Fig. 3 (right). This ring structure effectively enhances the learning effect of CNN and avoids gradient degradation as the network deepens. **It** also notably distinguishes essential attribute features between different categories and further reinforces the discrimination between inconsistent patterns and backgrounds.

其中的it指代不清，到底是The final RResBlk还是This ring structure？修改为：

> The final RResBlk is structured in a ring by running the residual propagation twice and the residual feedback once, as shown in Fig. 3 (right). This ring structure effectively enhances the learning effect of CNN and avoids gradient degradation as the network deepens. **The structure** also notably distinguishes essential attribute features between different categories and further reinforces the discrimination between inconsistent patterns and backgrounds.

# 大小写混用

- 标题的实词的首字母需大写。例如，主语、谓语、宾语等实词的第一个字母都需要大写。虚词（如介词、连词）一般应使用小写字母。每一节的标题也应该用大写。
- 有的多词组成的名词不是专业名词，容易大小写误用。比如gate residual unit，不要写成Gate Residual Unit.

# 通用词保持一致

除了专业名词、符号变量要在全文保持一致之外，一些通用词也需要保持一致。比如表示方法的名词有“method”，“approach”，“technique”，选择一个使用即可，不要混用。名词的单复数也要保持一致。咱们都看过不少小说，小说是文学类作品，文学是博大精深的，讲究语言的丰富性，所以同一个事物会用很多种表达形式。而论文不是，论文的语言要简单、严谨、一致。在这一点上要尤其注意调整思维方式。

# 错用the

the的语法比较复杂，有的时候会冗余，比如：

> Considering image quality, our results are comparable to those of SHDR[4], which are considerably similar to **the** ground truths.

修改为

> 删去the

还有的时候的时候缺少，比如下面这句的the表示特指上文提到的last RResBlk，少了the就表示任意last RResBlk 了 ：

> The main framework of IDN comprises seven RResBlk, which are independent of the human visual system and effectively reduce false predictions by maximizing contextual spatial information. Visualization of the feature map of  **last RResBlk** output *xf* with a 1 × 1 convolution obtains the coarsely estimated mask, as shown in Fig. 

修改为

> The main framework of IDN comprises seven RResBlk, which are independent of the human visual system and effectively reduce false predictions by maximizing contextual spatial information. Visualization of the feature map of **the last RResBlk** output *xf* with a 1 × 1 convolution obtains the coarsely estimated mask, as shown in Fig. 

小技巧：名词前用不用the，可以看这个名词是不是可以用复数。如果用复数，写或者不写the都可以。如果不可以用复数，那么一般表达的是特指，需要把the加上。

另外，the的语法本身就比较复杂，咱们毕竟不是native english speaker，自己写的时候难免出错。只能说平时在读论文时多注意一下积累语感。

# 副词置后

副词放在前面是中文的习惯，英文的习惯是副词放在最后，虽然没有语法问题，但是读起来会很奇怪。比如：

> We expect the model to **accurately** remove the contamination.

修改为

> We expect the model to remove the contamination **accurately**.

# 第一人称的使用

- 一定不要在论文中使用"I"。

- 建议避开使用“We”，“Our”，“us”等第一人称。因为这会显得论文不专业。比如将“Our network”修改为“the proposed network”。

- 使用“We”，“Our”，“us”等第一人称也没有错。一些厉害的科学家是倡导使用第一人称的。

  > 比如，在《如何撰写和发表科学论文》中，罗伯特 · 戴和芭芭拉 · 加斯特尔说: 正因为如此(在SCI论文撰写中避免使用第一人称代词) ，科研人员通常使用冗长(且不精确)的陈述，比如“ It was found that” ，而不是简短明确的“ i found” 所以年轻的科学家不要害怕在一句话中指出行动的代理人，即使是“I”或“we”。世界上许多最著名的科学家都使用过第一人称，正如《科学写作技巧》中解释的那样:爱因斯坦偶尔会用第一人称..。 费曼有时也使用第一人称，居里夫人、达尔文、莱尔和弗洛伊德也是如此。 只要把重点放在你的工作上而不是你自己，明智地使用第一人称并没有什么错。

但是咱们又不是这些厉害的科学家，咱们只是无名小卒，最好不要让人挑出毛病，所以还是小心为好。

# 少用短语，多用动词

本来用一个动词就能表达的意思，如果用介词短语表达会让句子变得复杂，这是不符合论文表达原则的。复杂的可以是方法，但不能是语言。西交大的孟德宇教授建议论文中多使用短句子，用最简单的方式，最清晰的表达。例如：

> The main framework of IDN **consists of** seven RResBlk, which are independent of the human visual system and effectively reduce false predictions by **making full use of** contextual spatial information.

修改为

> The main framework of IDN **comprises** seven RResBlk, which are independent of the human visual system and effectively reduce false predictions by **maximizing** contextual spatial information.

# 按顺序引用

对图或表的编号要在正文中引用，要按顺序引用（包括子图、子表）。

> 比如，存在图3，不能在正文中没有引用。再比如，存在图3和图4，不能先引用图4再引用图3。再比如，存在图3a和图3b，不能先引用图3b再引用图3a。
