---
categories:
- 技能分享
date: 2025-05-05 14:36:59
title: 开源PDF解析工具Marker深度解析
img: 
---

# 开源PDF解析工具Marker深度解析

检索增强生成（RAG）系统的第一步就是做 pdf 解析，从复杂多样的 pdf 中提取出干净准确的文本内容。现有的最优秀的开源工具有两个：Marker 和 MinerU。因为 Marker 是个人开发者做的，文档不完善，所以这里基于我个人的理解对它的代码进行解析。

## 深度学习模型

在`marker/models.py`中可以看到，marker 用到了如下的深度学习模型:

```
def create_model_dict(device=None, dtype=None) -> dict:
    return {
        "layout_model": LayoutPredictor(device=device, dtype=dtype),
        "texify_model": TexifyPredictor(device=device, dtype=dtype),
        "recognition_model": RecognitionPredictor(device=device, dtype=dtype),
        "table_rec_model": TableRecPredictor(device=device, dtype=dtype),
        "detection_model": DetectionPredictor(device=device, dtype=dtype),
        "inline_detection_model": InlineDetectionPredictor(device=device, dtype=dtype),
        "ocr_error_model": OCRErrorPredictor(device=device, dtype=dtype)
    }
```

这些模型都来自surya，作者没有直接介绍这些模型的原理，但可推测

像检测相关的 `DetectionPredictor` 和 `InlineDetectionPredictor` 可能用 Faster R - CNN、YOLO 系列等目标检测模型；

* `LayoutPredictor` 或采用 Mask R - CNN 、LayoutLM 等进行布局分析；

* `OCRErrorPredictor` 或许借助 RNN 变体或 BERT 类模型处理 OCR 错误；

* `RecognitionPredictor` 可能使用 CRNN 等做字符识别；

* `TableRecPredictor` 会用到基于 GNN 的模型处理表格；

* `TexifyPredictor` 可能采用 Seq2Seq 或 Transformer - based 的 Seq2Seq 模型来生成 LaTeX 代码。

代码使用 PyTorch 框架，可指定设备和数据类型。 

## 解析流程

因为其它数据类型（docx，pptx，xlsx）都可以转成pdf，所以 pdf 是 marker 处理的主要对象。从`marker/converters/pdf.py`可以看到处理pdf 的所有流程如下。marker 先通过以下流程，把pdf 解析为 document（抽象语法树），然后将document 渲染为json，html 或者markdown 格式。

```
default_processors: Tuple[BaseProcessor, ...] = (
        OrderProcessor,
        LineMergeProcessor,
        BlockquoteProcessor,
        CodeProcessor,
        DocumentTOCProcessor,
        EquationProcessor,
        FootnoteProcessor,
        IgnoreTextProcessor,
        LineNumbersProcessor,
        ListProcessor,
        PageHeaderProcessor,
        SectionHeaderProcessor,
        TableProcessor,
        LLMTableProcessor,
        LLMTableMergeProcessor,
        LLMFormProcessor,
        TextProcessor,
        LLMInlineMathLinesProcessor,
        LLMComplexRegionProcessor,
        LLMImageDescriptionProcessor,
        LLMEquationProcessor,
        LLMHandwritingProcessor,
        LLMMathBlockProcessor,
        ReferenceProcessor,
        DebugProcessor,
    )
```

通用格式处理 

1. **`OrderProcessor`**   - 用于处理文档中元素的顺序，确保各部分内容按照正确的逻辑顺序排列，比如调整段落、列表项等的先后顺序。 
2. **`LineMergeProcessor`**   - 对分割的行进行合并操作。在OCR处理或文档解析过程中，文本可能会被错误地分割成多行，该处理器会将相关的行合并成合理的段落或语句。 
3. **`LineNumbersProcessor`**   - 处理文档中的行号信息。它可以识别、提取或添加行号，也可能对行号的格式和编号规则进行调整，以符合特定的输出要求。


特定元素处理 
1. **`BlockquoteProcessor`**   - 专门处理文档中的块引用内容。它会识别块引用的起始和结束位置，对其进行格式化，例如添加特定的缩进或标记来区分块引用与普通文本。
2. **`CodeProcessor`**   - 处理代码块。会识别代码块的边界，对代码进行语法高亮处理（如果需要），并确保代码的格式在转换过程中保持正确，例如保留缩进、换行等。 
3. **`ListProcessor`**   - 处理列表元素，包括有序列表和无序列表。它会识别列表项的格式，确保列表的编号或标记正确显示，并且处理列表嵌套等复杂情况。 
4. **`PageHeaderProcessor`**   - 处理文档页面的页眉部分。可以识别页眉内容，对其进行提取、格式化或去除不必要的信息，以保证页眉内容在输出中正确显示。 
5. **`SectionHeaderProcessor`**   - 处理文档中的章节标题。它会识别不同级别的章节标题，根据标题的层次结构进行相应的格式化，例如设置不同的字体大小、加粗等，以体现章节的主次关系。 
6. **`TableProcessor`**   - 处理文档中的表格。会识别表格的结构，包括表头、表体、单元格等，对表格进行格式化，确保表格的布局和内容在转换后正确显示，可能还会处理表格的合并单元格等情况。 


特定内容处理
1. **`DocumentTOCProcessor`**   - 生成文档的目录（TOC）。它会分析文档中的章节标题，根据标题的层次结构生成目录，并为每个目录项添加对应的页码或链接，方便读者快速定位文档内容。 
2. **`EquationProcessor`**   - 处理文档中的数学公式。会识别公式的格式，可能会将公式转换为特定的表示形式，如LaTeX代码，以便在后续的渲染中正确显示数学内容。 
3. **`FootnoteProcessor`**   - 处理文档中的脚注。它会识别脚注的引用标记和脚注内容，将脚注正确地放置在页面底部或文档末尾，并处理脚注与正文的关联。 
4. **`TextProcessor`**   - 对普通文本进行处理，包括文本的清理、替换、大小写转换等操作，以确保文本的质量和一致性。 
5. **`ReferenceProcessor`**   - 处理文档中的参考文献。它会识别参考文献的格式，对其进行整理和格式化，使其符合特定的引用规范，如APA、MLA等。 
基于大语言模型（LLM）的处理 
1. **`LLMTableProcessor`**   - 利用大语言模型对表格进行处理。可以对表格内容进行语义分析、补充缺失信息、优化表格结构等，以提高表格处理的质量和智能化程度。 
2. **`LLMTableMergeProcessor`**   - 使用大语言模型来处理表格合并的情况。当文档中有多个相关表格需要合并时，该处理器借助大语言模型的理解能力，合理地合并表格内容，确保合并后的表格逻辑清晰。 
3. **`LLMFormProcessor`**   - 利用大语言模型处理文档中的表单。可以识别表单的字段、填写要求，甚至可以根据上下文对表单内容进行自动填充或验证。 
4. **`LLMInlineMathLinesProcessor`**   - 借助大语言模型处理行内数学公式。它可以对行内数学公式进行更准确的识别和转换，提高公式处理的准确性和可读性。 
5. **`LLMComplexRegionProcessor`**   - 处理文档中的复杂区域，这些区域可能包含多种类型的元素，如文本、图像、表格等。大语言模型可以帮助理解这些复杂区域的结构和语义，进行更合理的处理和转换。 
6. **`LLMImageDescriptionProcessor`**   - 利用大语言模型为文档中的图像生成描述信息。可以根据图像的内容、上下文等生成准确的图像描述，提高文档的可访问性和信息完整性。 
7. **`LLMEquationProcessor`**   - 结合大语言模型处理数学公式。与普通的 `EquationProcessor` 相比，它可以利用大语言模型的语义理解能力，对公式进行更深入的分析和处理，例如对公式进行解释、推导等。 
8. **`LLMHandwritingProcessor`**   - 使用大语言模型处理手写内容。可以识别手写文字，将其转换为可编辑的文本，并对识别结果进行优化和纠错，提高手写内容处理的准确性。 
9. **`LLMMathBlockProcessor`**   - 借助大语言模型处理独立的数学块。它可以对数学块进行更细致的分析和处理，确保数学块的内容和格式在转换后正确显示，同时可能会对数学块进行语义解释等操作。 


调试相关 
1. **`DebugProcessor`**   - 主要用于调试目的。它可以输出一些调试信息，帮助开发者检查文档处理过程中的中间结果、变量值等，以便发现和解决问题。 这些处理器共同作用，对PDF文档进行全面、细致的解析和处理，以实现将PDF转换为其他格式（如Markdown）的功能。 

其它类型的文件处理方式：

* 对于docx，marker使用mammoth库把docx转换成HTML，然后再用weasyprint库把HTML转成PDF。中间隔了一个HTML，效果很差，亲测不如用 wps 把docx 转pdf。

* 对于pptx，使用python-pptx库解析pptx元素，然后转化成HTML，再用weasyprint 将 HTML 渲染为 PDF。

* 对于xlsx，使用openpyxl库的 load_workbook 加载 XLSX 文件，将每个工作表转换为包含合并单元格处理的 HTML 表格。通过weasyprint 转成pdf。

## Renderers

marker 提供了三种格式的输出：json、html、markdown，它们的代码都在`marker/renderers`。这三种格式包含的信息不是相同的，以下是分析：

* 因为 document 最容易转化为 json（都是树结构可以直接转），所以 json 包含的信息最多（比如包含了caption 的分类结果，还有目标检测bbox 框），但因为过于复杂所以一般用不上。
* html 是可视化效果最好的，尤其是表格，marker 对表格的解析非常惊艳，不仅文本精确识别，而且能识别出复杂的表结构（比如合并单元格），这些都能用 html 很好的渲染。
* markdown 包含的信息量最少，但是胜在简单，在 RAG 任务中适合作为下游 LLM 模型的输入。注意markdown 是从html 转换过来的而不是document，所以一些复杂结构（比如表格）会有失真。

renderers 中的代码可读性不错，可以自己修改得到想要的输出。比如我就修改过 markdown 的输出，让它包含页码、bbox、table html 等信息。

## 总结

marker 是一个非常优秀的基于深度学习的 pdf 解析工具，它可以在大部分场景下得到完美的解析结果，代码可读性和拓展性也很不错，很难想象这是一个人独自开发出来的。

marker 项目地址：https://github.com/VikParuchuri/marker
